from fastapi import APIRouter, UploadFile, File, HTTPException

from services.process_and_extract import process_and_extract

router = APIRouter()

@router.post("/attach")
async def analyse_file(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        result = process_and_extract(file_content)
        return {
            "success": True,
            "placeholders": result["placeholders"],
            "recipientsList": result["recipientsList"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
