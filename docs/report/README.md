# Báo cáo LaTeX của Nhóm 3

[PDF hoàn chỉnh trong thư mục báo cáo](../bao-cao/bao-cao-nhom-3.pdf)

## Nội dung và bố cục

Báo cáo sử dụng template `hcmus-report-template-book.sty` và logo có sẵn. Nội dung nguồn nằm ở `../bao-cao/bao-cao-hoan-chinh.md`; năm phần nội dung LaTeX và ba tài liệu tham khảo được sinh từ nguồn này.

- Bìa ghi **Nhóm 3 - Lớp 23C02**, bên dưới là **Giảng viên: ThS. Trần Thị Châu**. Logo rộng 9 cm; đã giảm khoảng trống trên và dưới logo.
- Trang thứ hai gồm 10 thành viên. Nhóm trưởng giữ dòng đầu; chín thành viên còn lại xếp theo MSSV tăng dần.
- Bảng thành viên, Bảng 4.1 và Bảng 4.2 có đường kẻ dọc, ngang và khoảng đệm; tiêu đề nằm dưới bảng.
- Chữ, tiêu đề, đường kẻ và liên kết màu đen; logo và ảnh minh họa giữ màu gốc.
- Font Times New Roman, khổ A4, giãn dòng 1.25. Phần đầu đánh số La Mã; phần nội dung đánh số Ả Rập.
- Có mục lục, danh mục hình và danh mục bảng. Hình 4.12 gồm hai ảnh điện thoại song song, đã thu gọn để nằm cùng trang với Hình 4.11.

Bản cập nhật ngày **23/11/2026** có **34 trang**, 12 hình dùng 13 ảnh chụp tính năng. [Bảng đối chiếu ảnh](screenshot-audit.md) ghi thay đổi so với bản trước. `img/screenshots/screenshot-manifest.json` lưu nguồn, thời điểm, hash từng ảnh, số lượng dữ liệu và 15 kiểm tra trình duyệt đã đạt.

## Biên dịch

Tệp chính là [`main.tex`](main.tex). Cần TeX Live có XeLaTeX/latexmk và font Times New Roman, Arial, Consolas.

```powershell
# Từ thư mục gốc repository
./docs/report/build.ps1
```

PDF cuối được ghi vào **`docs/bao-cao/bao-cao-nhom-3.pdf`**. `BAO_CAO.pdf` cũ không còn được sử dụng. Tệp trung gian nằm trong `build/`, không đưa vào Git. Tất cả ảnh cần cho LaTeX đã có trong thư mục này; biên dịch không cần truy cập website.

Trên hệ điều hành khác có thể chạy trong `docs/report`:

```sh
latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir=build main.tex
```

Nếu máy thiếu các font Windows, thay các lệnh `setmainfont`, `setsansfont`, `setmonofont` bằng font Unicode hỗ trợ tiếng Việt phù hợp và dùng XeLaTeX.

## Cập nhật và kiểm tra

Các thư viện Python chỉ phục vụ tạo báo cáo, không phải dependency của website: `markdown` cho chuyển đổi nội dung; `playwright` và Microsoft Edge cho chụp/kiểm tra website; `pypdf` cho xác minh PDF.

```powershell
py docs/report/capture_screenshots.py
py docs/report/prepare_content.py
./docs/report/build.ps1
py docs/report/verify_report.py
```

Script chụp truy cập website công khai và thao tác giao diện, không sửa dữ liệu website. Lượt quiz cố ý sai câu đầu, đúng 18 câu còn lại để kiểm tra kết quả 18/19; đây không phải khảo sát hiệu quả học tập. Khi website thay đổi, cần đối chiếu lại mô tả trong Markdown, không chỉ thay ảnh.

`prepare_content.py` sinh lại `content/part-1.tex` đến `part-5.tex` và `ref/ref.tex`, không sửa Markdown nguồn. Bìa và bảng thành viên được quản lý riêng trong `content/title.tex`, `content/members.tex`. Không chạy sinh lại nội dung nếu muốn giữ chỉnh sửa thủ công chỉ có trong các tệp được sinh tự động.

Đã kiểm tra biên dịch không có cảnh báo LaTeX, khung chữ tràn hoặc ký tự thiếu; toàn bộ ảnh nhúng đủ, không có trang gần như trống. Đã xem trước bố cục PDF, đặc biệt các trang hình cập nhật và hai ảnh điện thoại.

## Template

Template gốc giữ tại `hcmus-report-template-book.sty`. Thông tin xuất xứ và giấy phép được giữ trong `appendix/appendix.tex`; template không phải mẫu chính thức của nhà trường. Các tệp ví dụ lập trình của template không cần cho báo cáo và không nằm trong bộ tệp của PR.
