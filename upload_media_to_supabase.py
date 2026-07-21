import os
import boto3
from pathlib import Path

# Media directory path
MEDIA_DIR = Path(__file__).resolve().parent / "media"

# Supabase S3 Credentials
KEY_ID = os.getenv("SUPABASE_STORAGE_KEY_ID", "ca18e034da59073297b83f249a23d6ef")
SECRET_KEY = os.getenv("SUPABASE_STORAGE_SECRET_KEY")
BUCKET = os.getenv("SUPABASE_STORAGE_BUCKET", "media")
ENDPOINT = os.getenv("SUPABASE_STORAGE_ENDPOINT", "https://ubwcepuiuspdrykpqgqt.storage.supabase.co/storage/v1/s3")
REGION = os.getenv("SUPABASE_STORAGE_REGION", "ap-southeast-2")

def upload_media_files():
    if not SECRET_KEY or SECRET_KEY == "PASTE_YOUR_SUPABASE_SECRET_KEY_HERE":
        print("Error: SUPABASE_STORAGE_SECRET_KEY is missing in your .env file.")
        print("Please replace PASTE_YOUR_SUPABASE_SECRET_KEY_HERE with your secret key in .env first.")
        return

    s3_client = boto3.client(
        's3',
        aws_access_key_id=KEY_ID,
        aws_secret_access_key=SECRET_KEY,
        endpoint_url=ENDPOINT,
        region_name=REGION
    )

    print(f"Starting upload to bucket '{BUCKET}'...")

    for root, _, files in os.walk(MEDIA_DIR):
        for file in files:
            full_path = Path(root) / file
            relative_path = full_path.relative_to(MEDIA_DIR).as_posix()

            print(f"Uploading: {relative_path} -> s3://{BUCKET}/{relative_path} ...")
            try:
                s3_client.upload_file(
                    Filename=str(full_path),
                    Bucket=BUCKET,
                    Key=relative_path
                )
                print(f"✅ Success: {relative_path}")
            except Exception as e:
                print(f"❌ Failed to upload {relative_path}: {e}")

if __name__ == "__main__":
    upload_media_files()
