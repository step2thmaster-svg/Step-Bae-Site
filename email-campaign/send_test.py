"""Send test emails from info@stepbae.com through Gmail.

The Gmail app password is read from the macOS Keychain (service "stepbae-gmail-smtp"),
never from this file. One-time setup, run in Terminal:
    security add-generic-password -U -a info@stepbae.com -s stepbae-gmail-smtp -w 'APP_PASSWORD'

Usage:
    python3 email-campaign/send_test.py TO_ADDRESS "Subject" path/to/email.html [LastName]
Merge tags are filled for the test: {{LastName}} (default "Bae"), {{UnsubscribeURL}} -> stepbae.com.
"""
import html
import os
import re
import smtplib
import ssl
import subprocess
import sys
from email.message import EmailMessage
from email.utils import formatdate, make_msgid

SENDER = "info@stepbae.com"


def app_password():
    if os.environ.get("APP_PW"):
        return os.environ["APP_PW"].replace(" ", "")
    out = subprocess.run(
        ["security", "find-generic-password", "-a", SENDER, "-s", "stepbae-gmail-smtp", "-w"],
        capture_output=True, text=True,
    )
    if out.returncode != 0:
        sys.exit("No app password in Keychain. See the setup line at the top of this file.")
    return out.stdout.strip().replace(" ", "")


def main():
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    to, subject, path = sys.argv[1:4]
    last = sys.argv[4] if len(sys.argv) > 4 else "Bae"
    body = open(path, encoding="utf-8").read()
    body = body.replace("{{LastName}}", last).replace("{{UnsubscribeURL}}", "https://stepbae.com")
    subject = subject.replace("{{LastName}}", last)

    text = re.sub(r"(?is)<(style|head)[^>]*>.*?</\1>", "", body)
    text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    text = "\n".join(line.strip() for line in text.splitlines() if line.strip())

    msg = EmailMessage()
    msg["From"] = f"Step Bae <{SENDER}>"
    msg["To"] = to
    msg["Subject"] = subject
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain="stepbae.com")
    msg.set_content(text)
    msg.add_alternative(body, subtype="html")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=ssl.create_default_context()) as s:
        s.login(SENDER, app_password())
        s.send_message(msg)
    print(f"sent to {to}: {subject}")


if __name__ == "__main__":
    main()
