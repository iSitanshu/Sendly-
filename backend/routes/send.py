import smtplib
import json

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List

router = APIRouter()

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


def replace_placeholders(text, recipient):

    recipient = {
        key.lower(): value
        for key, value in recipient.items()
    }

    for key, value in recipient.items():

        text = text.replace(
            f"[{key}]",
            str(value)
        )

    return text


@router.post("/send")
async def send_emails(

    emailCredentials: str = Form(...),
    emailContent: str = Form(...),
    placeholdersStore: str = Form(...),
    recipientsList: str = Form(...),

    attachments: List[UploadFile] = File(None)   # optional
    
):

    try:

        # Convert JSON string → Python objects
        emailCredentials = json.loads(emailCredentials)
        emailContent = json.loads(emailContent)
        placeholdersStore = json.loads(placeholdersStore)
        recipientsList = json.loads(recipientsList)

        sender_email = emailCredentials["email"]
        sender_password = emailCredentials["credentail"]

        results = []

        # Read files once only
        attachment_data = []

        if attachments:

            for file in attachments:

                content = await file.read()

                attachment_data.append({
                    "filename": file.filename,
                    "content": content
                })

        with smtplib.SMTP(
            SMTP_SERVER,
            SMTP_PORT
        ) as server:

            server.starttls()

            server.login(
                sender_email,
                sender_password
            )

            for recipient in recipientsList:

                subject = replace_placeholders(
                    emailContent["subject"],
                    recipient
                )

                body = replace_placeholders(
                    emailContent["body"],
                    recipient
                )

                msg = MIMEMultipart()

                msg["From"] = sender_email
                msg["To"] = recipient["email"]
                msg["Subject"] = subject

                msg.attach(
                    MIMEText(body, "plain")
                )

                # Attach documents if any
                if attachment_data:

                    for file in attachment_data:

                        part = MIMEBase(
                            "application",
                            "octet-stream"
                        )

                        part.set_payload(
                            file["content"]
                        )

                        encoders.encode_base64(
                            part
                        )

                        part.add_header(
                            "Content-Disposition",
                            f'attachment; filename="{file["filename"]}"'
                        )

                        msg.attach(part)

                try:

                    server.sendmail(
                        sender_email,
                        recipient["email"],
                        msg.as_string()
                    )

                    results.append({

                        "email": recipient["email"],
                        "status": "success"
                    })

                except Exception as e:

                    results.append({

                        "email": recipient["email"],
                        "status": "failed",
                        "error": str(e)
                    })

        return {

            "message": "Done",
            "results": results
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )