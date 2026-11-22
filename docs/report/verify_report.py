"""Verify the built report, screenshot evidence and requested formatting.

Run after build.ps1: py docs/report/verify_report.py
Requires pypdf. This checks artifacts; it does not rerun the browser tests.
"""
import ast
from hashlib import sha256
import json
from pathlib import Path
import re

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
REPORTS = ROOT.parent / "bao-cao"


def main():
    assert not (REPORTS / "BAO_CAO.pdf").exists(), "Obsolete BAO_CAO.pdf still exists"
    pdf = PdfReader(REPORTS / "bao-cao-nhom-3.pdf")
    assert len(pdf.pages) == 34
    texts = [page.extract_text() for page in pdf.pages]
    text = "\n".join(texts)
    assert all(len(t.strip()) > 300 for t in texts), "Near-empty page"
    assert "Nhóm 3 - Lớp 23C02" in texts[0]
    assert "Giảng viên: ThS. Trần Thị Châu" in texts[0]
    assert "THÀNH VIÊN NHÓM 3" in texts[1]
    ids = re.findall(r"\b231\d{5}\b", texts[1])
    assert len(ids) == len(set(ids)) == 10
    assert ids[0] == "23127136" and ids[1:] == sorted(ids[1:])
    assert all(f"PHẦN {i}" in text for i in range(1, 6))
    assert all(f"Hình 4.{i}." in text for i in range(1, 13))
    assert "22/11/2026" not in text and "23/11/2026" in text
    assert "bộ lọc" not in text.lower()
    assert "Xem chi tiết & nguồn" not in text
    assert not re.search(r"390\s*[×x]\s*844", text)
    phone = [p for p in pdf.pages if "Hình 4.12." in p.extract_text()]
    assert len(phone) == 1 and "Hình 4.11." in phone[0].extract_text()
    assert len(phone[0].images) == 3  # Team screenshot + two phone screenshots.
    assert sum(len(page.images) for page in pdf.pages) == 14  # 13 screenshots + logo.

    for filename in ["members.tex", "part-4.tex"]:
        source = (ROOT / "content" / filename).read_text(encoding="utf-8-sig")
        for table in re.findall(r"\\begin\{table\}.*?\\end\{table\}", source, re.S):
            assert "|L|" in table
            assert table.index(r"\caption") > table.index(r"\end{tabularx}")

    manifest = json.loads((ROOT / "img/screenshots/screenshot-manifest.json").read_text(encoding="utf-8"))
    assert manifest["http_status"] == 200 and not manifest["errors"]
    assert not manifest["mobile_overflow"]
    assert manifest["artifact_count"] == 13 and manifest["quiz_count"] == 19
    assert manifest["team_count"] == 10
    assert manifest["artifact_counts_by_stage"] == [2, 2, 2, 2, 5]
    assert len(manifest["checks"]) == 15 and all(c["result"] for c in manifest["checks"])
    assert len(manifest["captures"]) == 13
    for capture in manifest["captures"]:
        path = ROOT / "img/screenshots" / capture["file"]
        assert sha256(path.read_bytes()).hexdigest() == capture["sha256"], path

    markdown = (REPORTS / "bao-cao-hoan-chinh.md").read_text(encoding="utf-8")
    images = re.findall(r"!\[.*?\]\((.*?)\)", markdown)
    assert len(images) == 12 and all((REPORTS / path).is_file() for path in images)
    for name in ["prepare_content.py", "capture_screenshots.py", "verify_report.py"]:
        ast.parse((ROOT / name).read_text(encoding="utf-8"))
    logpath = ROOT / "build/main.log"
    if logpath.exists():
        log = logpath.read_text(encoding="utf-8", errors="replace")
        assert not any(t in log for t in ["Overfull \\hbox", "Overfull \\vbox",
                                         "Missing character:", "LaTeX Warning:"])
    print("PASS: 34 PDF pages; 12 figures/13 screenshots; 15 browser checks recorded; "
          "member order, table grid/captions, phone pair, current dates and source links valid; "
          "obsolete BAO_CAO.pdf absent.")


if __name__ == "__main__":
    main()
