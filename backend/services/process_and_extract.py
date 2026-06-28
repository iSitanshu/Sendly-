import csv
import io

def process_and_extract(file_content: bytes) -> dict:
    # 1. Decode the binary CSV file to text
    text_content = file_content.decode('utf-8')
    csv_file = io.StringIO(text_content)
    
    # 2. Use csv.DictReader to easily parse headers and rows
    reader = csv.DictReader(csv_file)
    
    # Extract original raw headers and sanitize whitespace
    raw_headers = [h.strip() for h in reader.fieldnames] if reader.fieldnames else []
    
    # 3. Find the email column dynamically (handles 'email', 'mail', 'Email Address', etc.)
    email_key = None
    for header in raw_headers:
        if 'mail' in header.lower():
            email_key = header
            break
            
    if not email_key:
        raise ValueError("Could not find an email or mail column in the uploaded CSV.")

    # 4. Separate email from the rest of the parameters (placeholders)
    # This ensures your placeholders list stays clean (matching ['Name', 'Company'])
    placeholders = [h for h in raw_headers if h != email_key]
    
    # 5. Build the recipients list matching your React `RecipientRow` interface structure
    recipients_list = []
    for row in reader:
        formatted_row = {
            "email": row.get(email_key, "").strip()
        }
        # Add remaining dynamic placeholder parameters to the object
        for p in placeholders:
            formatted_row[p] = row.get(p, "").strip() if row.get(p) else ""
            
        recipients_list.append(formatted_row)

    return {
        "placeholders": placeholders,
        "recipientsList": recipients_list
    }
