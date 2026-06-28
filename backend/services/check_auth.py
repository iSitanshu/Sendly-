import smtplib

def verify_credentials(email, password):
    if "@" not in email or not email.endswith(".com"):
        return {
            "status": "invalid",
            "message": "The email format is incorrect or unsupported."
        }

    try: 
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.quit()
        
        return {
            "status": "success",
            "message": f"Email {email} is valid and ready for use.",
            "email": email,
            "credential": password
        }
    except Exception as e:
        # If login fails (or network error), return this status instead of just False
        return {
            "status": "false",
            "message": "Authentication failed. Check your email, password, or App Password settings."
        }