import os
from markdown_pdf import MarkdownPdf
from markdown_pdf import Section

# Path to the markdown report
md_file_path = "C:/Users/Dhana/.gemini/antigravity-ide/brain/48cc8b57-274e-4ed7-9a6c-0fcd0f74b1ee/security_audit_results.md"
pdf_file_path = "d:/Joshi/FarmScheduler/security_audit_results.pdf"

with open(md_file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace emoji with text if necessary, but pymupdf might handle it, let's leave it.
pdf = MarkdownPdf(toc_level=2)
pdf.add_section(Section(content))
pdf.save(pdf_file_path)

print(f"PDF saved to {pdf_file_path}")
