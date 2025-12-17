# ResumeScreener

## System Dependencies 🔧

- This project uses Tesseract OCR (via `pytesseract`) to extract text from images and scanned PDFs.
- On Debian/Ubuntu you can install it with:

```bash
sudo apt update && sudo apt install -y tesseract-ocr libtesseract-dev tesseract-ocr-eng
```

- Verify installation with:

```bash
which tesseract && tesseract --version
```

## Configuration 💡

- You can set the `TESSERACT_CMD` environment variable if Tesseract is installed in a custom location, otherwise the app defaults to `/usr/bin/tesseract`.
- For local development, add a `.env` file in `bc/` (or set environment variables in your shell):

```
TESSERACT_CMD=/usr/bin/tesseract
GOOGLE_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
MONGO_URI=your_mongo_uri_here
```

Then install Python dependencies and run the app:

```bash
cd bc
pip install -r requirements.txt
python app.py
```
