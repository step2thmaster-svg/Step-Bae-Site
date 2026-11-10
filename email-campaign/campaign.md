# STEPBAE dentist campaign: 10 new practices by Nov 30

A general introduction, then one theme per email, each with **15% off the first case**. Sent from **info@stepbae.com** (From name: Step Bae).
The design is in `templates.mjs` and the content in `build.mjs`. Run `node email-campaign/build.mjs` to regenerate `emails/`.

| Send | File (in `emails/`) | Theme | Subject A / Subject B | Quote |
|---|---|---|---|---|
| Wed Nov 11 | `campaign-1-november.html` | New Practice Special (general intro, 15% off the first case) | Your cases deserve more than a production lab / Dr. {{LastName}}, 15% off your first case with STEPBAE | Dr. Bylis |
| Mon Nov 16 | `campaign-2-posterior.html` | Posterior Special | Posterior crowns that seat the first time / Dr. {{LastName}}, how much chair time goes to adjusting crowns? | Dr. Lim |
| Fri Nov 20 | `campaign-3-all-on-x.html` | All-on-X Special | All-on-X that doesn't look like plastic / Dr. {{LastName}}, your next full-arch case | Dr. O'Neal |
| Tue Nov 24 | `campaign-4-wax-up.html` | Diagnostic Wax-up Special | Let your patient see the smile before they say yes / Dr. {{LastName}}, a tool for case acceptance | none |
| Mon Nov 30 | plain text, below | Last call | Last day for November specials | none |

## Brand templates (for later emails)

| Layout | Sample | Use it for |
|---|---|---|
| `special` | the four campaign emails | Any themed offer |
| `letter` | `template-letter-welcome.html`, `template-letter-warm.html` | Personal notes from Step: warm outreach (Mark), welcome and follow-ups (Concierge) |
| `insights` | `template-insights.html` | A monthly digest of Insights articles |
| `event` | `template-event.html` | Courses, lectures and trade shows |

## Before sending

- [ ] Step approves the drafts
- [x] Mailing address in every footer: 14315 Country Lake Dr, Pineville, NC 28134
- [x] Email authentication: SPF, DKIM and DMARC live on stepbae.com; DKIM signing started in Google Admin (Nov 4)
- [x] Test email from info@stepbae.com shows SPF, DKIM and DMARC PASS (Nov 4)
- [ ] Merge tags converted to the sending tool's syntax (`{{LastName}}`, `{{UnsubscribeURL}}`)
- [ ] List checked by Mailman, then run through a bounce checker
- [x] Test send from info@stepbae.com: all four emails landed in the inbox at step@toothlab.ai (Nov 4)
- [ ] Test send through GMass to Gmail, Outlook and a phone

## Sending tips

- Send the whole list every theme. A dentist who skips the anterior email may be planning an All-on-X case.
- Remove anyone who replies or sends a case, so they don't get the next special.
- Send from info@stepbae.com with "Step Bae" as the From name.
- For cold lists, warm up slowly (20–50 a day at first), and use a separate sending domain if you can.
- Send at 7–8 am local time on Tue–Thu, before patients arrive.
- When someone replies "yes," answer within the hour.

---

## Nov 30 last call (plain text)

**Subject:** Last day for November specials

Hi Dr. {{LastName}},

Quick note: today is the last day for this month's specials for new practices.

15% off your first case, whichever you send:
- Anterior crowns and veneers
- Posterior crowns and bridges
- All-on-X
- Diagnostic wax-ups

If you have a case coming up, reply "yes" and we'll set up your account and connect your scanner today.

Step Bae, CDT, DTG
STEPBAE Dental Lab · info@stepbae.com

14315 Country Lake Dr, Pineville, NC 28134 · Unsubscribe: {{UnsubscribeURL}}
