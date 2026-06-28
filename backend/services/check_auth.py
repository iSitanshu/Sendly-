def verify_credentials(email, password):
    if "@" not in email or not email.endswith(".com"):
        return {
            "status": "invalid",
            "message": "The email format is incorrect or unsupported."
        }

    try: 
        pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

        if re.match(pattern, email):
            return {
                "status": "success",
                "email": data.email
            }

        return {
            "status": "invalid",
            "message": "Invalid email"
        }
    except Exception as e:
        # If login fails (or network error), return this status instead of just False
        return {
            "status": "false",
            "message": "Authentication failed. Check your email, password, or App Password settings."
        }