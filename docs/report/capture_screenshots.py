"""Capture the deployed website and verify the report's interactive examples.

Run: py docs/report/capture_screenshots.py
Requires Python Playwright and Microsoft Edge. No website data is modified.
"""
from datetime import datetime, timedelta, timezone
from hashlib import sha256
import json
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "img" / "screenshots"
URL = "https://nhom03-lsd-23c02.vercel.app/"
VIEWPORT = {"width": 1440, "height": 1080}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {
        "url": URL,
        "captured_at": datetime.now(timezone(timedelta(hours=7))).isoformat(),
        "browser": "Microsoft Edge (Chromium), headless",
        "viewport": VIEWPORT,
        "captures": [], "checks": [], "errors": [],
    }
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel="msedge", headless=True)
        page = browser.new_page(viewport=VIEWPORT, device_scale_factor=1)
        page.on("pageerror", lambda error: manifest["errors"].append(str(error)))
        response = page.goto(URL, wait_until="networkidle", timeout=60000)
        assert response.status == 200
        manifest["http_status"] = response.status
        manifest["page_title"] = page.title()
        manifest["html_sha256"] = sha256(response.body()).hexdigest()
        manifest["script_urls"] = page.locator("script[src]").evaluate_all(
            "es=>es.map(e=>e.src)")
        page.evaluate("document.fonts.ready")

        def check(name, passed):
            assert passed, name
            manifest["checks"].append({"feature": name, "result": True})

        def capture(target, name, figure, caption):
            target.wait_for_timeout(900)
            path = OUT / name
            target.screenshot(path=str(path), full_page=False)
            manifest["captures"].append({
                "file": name, "figure": figure, "caption": caption,
                "viewport": target.viewport_size,
                "scrollY": target.evaluate("window.scrollY"),
                "sha256": sha256(path.read_bytes()).hexdigest(),
            })
            print("Captured", figure, name, flush=True)

        def navigate(view):
            page.locator(f'.nav-link[data-view="{view}"]').click()
            page.wait_for_timeout(1000)

        def align(selector, offset=100):
            page.locator(selector).evaluate(
                '(e,y)=>window.scrollTo({top:e.getBoundingClientRect().top+scrollY-y,behavior:"instant"})',
                offset)
            page.wait_for_timeout(900)

        capture(page, "hinh-4-01-trang-chu.png", "4.1", "Trang mở đầu hiện hành")
        page.locator('.ruler-seg[data-goto="gd-2"]').click()
        page.wait_for_timeout(1500)
        align("#gd-2")
        capture(page, "hinh-4-02-dong-thoi-gian.png", "4.2", "Giai đoạn 1961–1965")
        check("Chọn giai đoạn bằng thước thời gian",
              page.locator('.ruler-seg[data-goto="gd-2"]').get_attribute("class").find("is-on") >= 0)
        page.locator('[data-ev="apbac"]').click()
        page.locator("#evDetail").wait_for(state="visible")
        capture(page, "hinh-4-03-chi-tiet-su-kien.png", "4.3", "Chi tiết Chiến thắng Ấp Bắc")
        page.keyboard.press("Escape")
        check("Mở chi tiết sự kiện và đóng bằng Escape", not page.locator("#evDetail").is_visible())

        navigate("viewGallery")
        manifest["artifact_count"] = page.locator(".g-art").count()
        manifest["artifact_counts_by_stage"] = page.evaluate(
            "historicalStages.map(s=>s.museumArtifacts.length)")
        check("Kho tư liệu có 13 thẻ, phân bố giai đoạn 2/2/2/2/5",
              manifest["artifact_count"] == 13 and manifest["artifact_counts_by_stage"] == [2, 2, 2, 2, 5])
        check("Phiên bản hiện tại không có bộ lọc giai đoạn", page.locator(".g-filter").count() == 0)
        capture(page, "hinh-4-04-kho-tu-lieu.png", "4.4", "Bố cục kho tư liệu hiện hành")
        featured = '.g-art--lead[data-id="gd2-uh1-huey"]'
        check("Trực thăng UH-1 là thẻ tư liệu nổi bật", page.locator(featured).count() == 1)
        align(featured)
        capture(page, "hinh-4-05-tu-lieu-noi-bat.png", "4.5", "Thẻ UH-1 nổi bật và liên kết dòng thời gian")
        page.locator('.g-more[data-gallery-art="gd2-uh1-huey"]').click()
        page.locator("#galleryLightbox").wait_for(state="visible")
        check("Chi tiết tư liệu hiển thị nguồn ảnh", "Ảnh nhóm sinh viên chụp" in page.locator("#glbSource").inner_text())
        capture(page, "hinh-4-06-chi-tiet-tu-lieu.png", "4.6", "Chi tiết UH-1 và nhãn nguồn ảnh")
        title = page.locator("#glbTitle").inner_text()
        page.locator('#galleryLightbox [data-step="1"]').click()
        check("Chuyển hiện vật trong hộp chi tiết", page.locator("#glbTitle").inner_text() != title)
        page.keyboard.press("Escape")
        check("Đóng chi tiết tư liệu bằng Escape", not page.locator("#galleryLightbox").is_visible())
        page.locator('.g-lesson[data-gallery-lesson="gd2-uh1-huey"]').click()
        page.wait_for_timeout(1200)
        check("Xem trên dòng thời gian chuyển về giai đoạn liên quan", page.locator("#viewTimeline").is_visible())

        navigate("viewQuiz")
        manifest["quiz_count"] = page.evaluate("quizData.length")
        assert manifest["quiz_count"] == 19
        capture(page, "hinh-4-07-cau-hoi-on-tap.png", "4.7", "Câu hỏi và bốn lựa chọn")
        answers = page.evaluate("quizData.map(q=>q.answer)")
        page.locator(".quiz-option-btn").nth((answers[0] + 1) % 4).click()
        check("Giải thích và khóa lựa chọn sau khi trả lời",
              page.locator("#quizExplanationBox").is_visible()
              and page.locator(".quiz-option-btn:disabled").count() == 4)
        capture(page, "hinh-4-08-phan-hoi-dap-an.png", "4.8", "Phản hồi sai, đáp án đúng và giải thích")
        page.locator("#quizNextBtn").click()
        for answer in answers[1:]:
            page.locator(".quiz-option-btn").nth(answer).click()
            page.locator("#quizNextBtn").click()
        check("Lượt minh họa 1 sai và 18 đúng trả về 18/19",
              page.locator("#resultScoreHighlight").inner_text() == "18 / 19")
        capture(page, "hinh-4-09-ket-qua-on-tap.png", "4.9", "Kết quả chạy minh họa, không phải khảo sát người học")

        navigate("viewSummary")
        capture(page, "hinh-4-10-tong-ket-bai-hoc.png", "4.10", "Tổng kết và mục lục")
        page.locator('.s-toc a[href="#s-bai-hoc"]').click()
        page.wait_for_timeout(1200)
        check("Điều hướng mục Năm bài học kinh nghiệm", page.locator("#s-bai-hoc").is_visible())
        navigate("viewTeam")
        manifest["team_count"] = page.locator(".team-card").count()
        check("Trang nhóm có 10 thành viên", manifest["team_count"] == 10)
        capture(page, "hinh-4-12-nhom-thuc-hien.png", "4.11", "Trang nhóm tác giả hiện hành")

        mobile = browser.new_page(viewport={"width": 390, "height": 844},
                                  device_scale_factor=1, is_mobile=True, has_touch=True)
        mobile.on("pageerror", lambda error: manifest["errors"].append(str(error)))
        mobile.goto(URL, wait_until="networkidle")
        mobile.locator("#mobileMenuBtn").click()
        mobile.locator('.nav-link[data-view="viewQuiz"]').click()
        mobile.wait_for_timeout(1000)
        check("Menu điện thoại mở và chuyển được sang bài ôn tập", mobile.locator("#viewQuiz").is_visible())
        capture(mobile, "hinh-4-13-giao-dien-di-dong.png", "4.12a", "Phần đầu bài ôn tập trên điện thoại")
        mobile.evaluate('window.scrollTo({top:scrollY+430,behavior:"instant"})')
        capture(mobile, "hinh-4-14-giao-dien-di-dong-cuon.png", "4.12b", "Phần dưới bài ôn tập sau khi cuộn")
        manifest["mobile_overflow"] = mobile.evaluate("document.documentElement.scrollWidth>innerWidth")
        check("Giao diện điện thoại không tràn ngang", not manifest["mobile_overflow"])
        assert not manifest["errors"], manifest["errors"]
        (OUT / "screenshot-manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        browser.close()
    print(f"Saved {len(manifest['captures'])} screenshots; {len(manifest['checks'])} checks passed.")


if __name__ == "__main__":
    main()
