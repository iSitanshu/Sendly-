import smtplib

def verify_credentials(email, password):
    
    if "@" not in email or not email.endswith(".com"):
        return {
            "status": "invalid",
            "message": "Invalid email format"
        }

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587, timeout=5)

        server.starttls()

        server.login(email, password)  

        server.quit()

        return {
            "status": "success",
            "message": "Credentials verified",
            "email": email,
            "credential": password
        }

    except Exception as e:
        print("SMTP ERROR:", str(e))

        return {
            "status": "false",
            "message": str(e)   # show actual error
        }