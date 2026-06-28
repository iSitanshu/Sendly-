import re

def verify_credentials(email, password):
    
    pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

    if re.match(pattern, email):
        return {
            "status": "success",
            "message": "Valid email format",
            "email": email,
            "credential": password
        }

    return {
        "status": "invalid",
        "message": "Invalid email format"
    }