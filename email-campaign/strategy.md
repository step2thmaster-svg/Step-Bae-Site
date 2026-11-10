# November campaign strategy (draft for team review)

**Goal:** 10 new practices by Nov 30, 2026. A practice counts when its **first case arrives**.
**Time left:** 26 days (from Wed Nov 4). Thanksgiving is Thu Nov 26.

## The honest math

These are industry ballparks, not STEPBAE data. We'll replace them with real numbers after the first batch.

| | Cold email | Warm contacts |
|---|---|---|
| Positive replies | 1–3% of people emailed | 15–30% |
| Positive reply → first case | ~30% | ~40–50% |
| People needed for 10 practices | ~1,100–3,300 | ~70–150 |

A new sending domain has to warm up at 20–50 emails a day, which caps cold email at roughly **1,000 sends before Nov 30**. **Cold email alone is unlikely to reach 10.** It works as the second channel, behind warm contacts.

## The plan: three channels, warm first

**1. Warm network (starts now, no warm-up needed)**
- Dentists Step has met through courses, lectures, study clubs and events, plus past clients.
- Personal emails from Step's own inbox, written one by one (not the template), about 10–20 a day.
- A follow-up call or text 3 days later if there's no reply.

**2. Referrals from current clients (this week)**
- Ask the dentists who already trust STEPBAE (Dr. Bylis, Dr. O'Neal, Dr. Lim and others) for one or two colleague introductions.
- An introduction from a colleague converts better than any cold email.

**3. Targeted cold email (starts once the domain is warmed and the list is verified)**
- Only high-fit practices: cosmetic and esthetic focus, AACD members, implant-heavy for the All-on-X email.
- A small, verified list beats a big one. Every address goes through Mailman's fabricated-data check plus a bounce checker.
- The four themed emails, about 5 days apart so each batch gets the whole series before Nov 30.
- Stop on reply. Mailman flags hot replies within the hour.

## The offer

The special is the strongest lever in the whole campaign. The best kind for a new lab is one that **removes the risk of trying us**: the dentist's worry is "what if the first case doesn't fit?" Options, from strongest to lightest:
1. **Risk-free first case:** remake or refund if they're not satisfied. *(STEPBAE's call: only if the lab can honor it.)*
2. **Discount on the first case** of that type.
3. **A free add-on:** shade match, design review, wax-up with 4+ units, return shipping.

## Timeline

| Week | Warm + referrals | Cold email | Setup |
|---|---|---|---|
| **Nov 4–10** | Start personal emails; ask current clients for referrals | Warm up the sending inboxes | Specials decided · site live · sending domain set up (SPF/DKIM/DMARC) · list verified |
| **Nov 11–17** | Follow-up calls | Batch 1: anterior → posterior | First hourly reports from Mailman |
| **Nov 18–24** | Follow-ups | Batch 1: All-on-X → wax-up · Batch 2 starts | Review real reply rates, adjust |
| **Nov 25–30** | Final personal nudges | Nov 30 last call to everyone who hasn't replied | Wrap-up report |

## Who does what

- **Step:** personal warm emails and calls, referral asks, answering hot replies, deciding the specials.
- **Mailman:** checking lists, preparing emails and merge fields, schedule, stop-on-reply, flagging hot replies, hourly reports. *Never sends without approval.*
- **Claude:** strategy, copy, coordinating Mailman, relaying reports to Step.

## Step's decisions (Nov 4)

1. **Channels:** warm network + referrals + cold email.
2. **Offer:** 15% off the first case, for every theme.
3. **Target:** both esthetic practices nationwide and Charlotte-area practices.
4. **Schedule:** cold emails shift one week: anterior Wed Nov 11, posterior Mon Nov 16, All-on-X Fri Nov 20, wax-up Tue Nov 24, last call Mon Nov 30.
5. **Sender:** info@stepbae.com.
6. **CSV:** Step shares it after approving the email drafts.

stepbae.com is live (checked Nov 4): all email images and links load.

Sending: Gmail (Google Workspace, info@stepbae.com); GMass recommended for scheduling and merge. SPF, DKIM and DMARC are live.

Still open: Step's approval of the drafts · the CSV · the site's physical-impressions copy.

*Applied to `build.mjs` and `campaign.md` on Nov 4. The meeting is on hold while the team grows (Strategist, Mark, Concierge).*
