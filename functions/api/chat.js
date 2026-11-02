import Anthropic from '@anthropic-ai/sdk'
import { systemPrompt } from '../../src/components/chatKnowledge.js'

// POST /api/chat: the Mini Steps' AI answer for a typed question the scripted chat can't match. Runs on Cloudflare
// Pages Functions, where the API key lives as a secret (ANTHROPIC_API_KEY), never in the browser. Kept small and
// cheap on purpose: Claude Haiku 5.5 at low effort, the site knowledge cached, short questions and a short history.
// The browser falls back to the scripted "we're simple guides" answer whenever this returns anything but an answer.

const MODEL = 'claude-haiku-5-5'
const MAX_QUESTION = 500 // characters in one question
const MAX_HISTORY = 6 // earlier AI turns sent along for context (three questions and their answers)
const MAX_TURN = 1200 // characters in each earlier turn

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

// only the site's own pages may call this, so other websites can't spend STEPBAE's credits from their visitors' browsers
const sameSite = (request) => {
  const origin = request.headers.get('Origin')
  return !origin || new URL(origin).host === new URL(request.url).host
}

// the visitor's question plus a few earlier AI turns, checked and trimmed; null if it doesn't look like a chat
const readConversation = async (request) => {
  let body
  try {
    body = await request.json()
  } catch {
    return null
  }
  const question = typeof body?.question === 'string' ? body.question.trim() : ''
  if (!question || question.length > MAX_QUESTION) return null
  const history = (Array.isArray(body.history) ? body.history : [])
    .filter((t) => (t?.role === 'user' || t?.role === 'assistant') && typeof t.text === 'string' && t.text.trim())
    .slice(-MAX_HISTORY)
    .map((t) => ({ role: t.role, content: t.text.slice(0, MAX_TURN) }))
  // the API expects the conversation to start with the visitor and alternate
  while (history.length && history[0].role !== 'user') history.shift()
  const messages = []
  for (const turn of [...history, { role: 'user', content: question }]) {
    if (messages.at(-1)?.role === turn.role) messages[messages.length - 1] = turn
    else messages.push(turn)
  }
  return messages
}

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'not configured' }, 503)
  if (!sameSite(request)) return json({ error: 'forbidden' }, 403)
  const messages = await readConversation(request)
  if (!messages) return json({ error: 'bad request' }, 400)

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 25_000 })
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      output_config: { effort: 'low' },
      // the rules and articles are the same for every visitor, so they're cached and re-read at a fraction of the price
      system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
      messages,
    })
    // a declined question gets the scripted answer instead
    if (response.stop_reason === 'refusal') return json({ error: 'declined' }, 422)
    const answer = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()
    if (!answer) return json({ error: 'empty' }, 502)
    return json({ answer })
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return json({ error: 'busy' }, 429)
    if (error instanceof Anthropic.APIError) return json({ error: 'unavailable' }, 502)
    return json({ error: 'unavailable' }, 502)
  }
}
