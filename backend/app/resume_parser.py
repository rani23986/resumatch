
import fitz  # PyMuPDF


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract readable text from a PDF resume."""
    with fitz.open(stream=file_bytes, filetype="pdf") as pdf:
        pages = [page.get_text("text") for page in pdf]

    text = "\n".join(pages).strip()

    if not text:
        raise ValueError(
            "No readable text found. The PDF may contain scanned images."
        )

    return text
