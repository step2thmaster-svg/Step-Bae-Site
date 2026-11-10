MAILMAN REPORT · Wed Nov 4, 2026 (test run)
Progress: 0 / 10 · 26 days to Nov 30
Since last report: first report. Rebuilt all four HTML emails (anterior, posterior, all-on-x, wax-up) with no errors. Merge tags, mailing address and unsubscribe link are present in all four. No CSV read, nothing sent.
Next send: Anterior Special · Wed Nov 4 (today) · blocked
Blocked on: (1) the real anterior special, still a highlighted placeholder (the other three specials are also unfilled); (2) the CSV file name, so I can check the list before use; (3) stepbae.com isn't live, so images and buttons point nowhere; (4) {{MailingAddress}} and {{UnsubscribeURL}} must be set in the sending tool's syntax, and the real mailing address supplied.
Hot replies: none


LIST CHECK · Wed Nov 4, 2026 · stepbae_prospects_100_VERIFIED.csv
Result: REJECTED. Do not send to this list.
- Every phone number is a fictional 555-01xx number.
- Sampled 33 domains: 22 can't receive email (no mail server, a null MX, or the domain doesn't exist).
- Typo domains (wynwoodental, malibismile, sohomile), unrelated domains (somerville.com, rittenhouse.com), duplicate domains (arlingtoncosmetic.com for MA and TX), and "Dr. [Practice Name]" rows.
- Even where a domain receives mail, nothing ties the dentist's name or address to that practice.
- No Charlotte-area practices, which were half of the target.
Next: build a real list from sources (AACD directory, state dental board lookups, practice websites), then run it through a bounce checker.

TEST SEND · Wed Nov 4, 2026
All four campaign emails sent from info@stepbae.com (Gmail SMTP) to step@toothlab.ai. All delivered to the inbox (not spam or Promotions). Images and links load.
Still to do: GMass test to Gmail, Outlook and a phone; verified prospect list (in progress).

LIST BUILT · Wed Nov 4, 2026 · email-campaign/prospects-verified.csv
103 practices: 47 Charlotte area (27 with email, 20 call/visit), 56 nationwide (all with email). 83 emails total.
Every email was copied from the practice's own website, and every email domain has a working mail server. No duplicates.
Next: bounce checker (NeverBounce/ZeroBounce) before the first send; remove anyone Mark contacts personally.

PAUSED · Wed Nov 4, 2026 · Step paused all email work
Where it stands:
- Four campaign emails built and tested: inbox delivery from info@stepbae.com confirmed. "Predictable posterior work" applied to the November email.
- Prospect list ready: prospects-verified.csv (103 practices, 83 emails, 20 website contact forms). Contact-form note: contact-form-note.md.
- Test sending: app password saved in Keychain (stepbae-gmail-smtp), but Gmail now rejects it (likely revoked). Needs a new app password before any more test sends.
Still open when resumed: Step approves drafts · new app password · GMass setup and test · bounce check · first send was planned for Wed Nov 11 (will need to move).
