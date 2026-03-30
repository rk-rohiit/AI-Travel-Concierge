from fastapi import APIRouter, UploadFile, File
import shutil
import os
from app.services.rag_service import process_pdf

router = APIRouter()

@router.post("/upload")
def upload_pdf(file: UploadFile = File(...)):
    try:
        file_path = f"temp_{file.filename.replace(' ', '_')}"

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print("✅ File saved:", file_path)

        # Process PDF
        result = process_pdf(file_path)

        # Safe delete
        if os.path.exists(file_path):
            os.remove(file_path)

        return {"message": result}

    except Exception as e:
        print("🔥 UPLOAD ERROR:", e)
        return {"error": str(e)}