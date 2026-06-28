import re

def detect_placeholder(subject, body):
    # Fixed alignment: search subject variables in subject, body in body
    subject_matches = re.findall(r'\[(.*?)\]', subject)
    body_matches = re.findall(r'\[(.*?)\]', body)

    # 1. Combine lists and wrap in set() to completely strip duplicates
    # 2. Convert it back to a list so it remains JSON serializable for FastAPI
    combined_matches = list(set(subject_matches + body_matches))
    
    if len(combined_matches) == 0:
        return {
            "status": "false",
            "message": "No placeholders found in the subject or body.",
            "placeholders": []
        }
        
    # Return a structured success message alongside the unique placeholders found
    return {
        "status": "success",
        "message": f"Successfully detected {len(combined_matches)} unique placeholder(s).",
        "placeholders": combined_matches
    }