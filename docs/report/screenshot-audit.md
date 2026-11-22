# Đối chiếu hình minh họa với website triển khai

**Nguồn:** https://nhom03-lsd-23c02.vercel.app/
**Ngày đối chiếu và chụp lại:** 23/11/2026

**Lần chụp mới nhất:** 2026-11-23T01:11:19.691213+07:00
**Bản PDF:** `docs/bao-cao/bao-cao-nhom-3.pdf`

Đợt làm mới này phản ánh phiên bản website mới nhất: font chi tiết giao diện đổi sang Roboto Mono, trang mở đầu bỏ danh sách liên kết nhanh, dòng thời gian và tổng kết được điều chỉnh bố cục. Toàn bộ 13 ảnh dùng trong báo cáo đã được chụp lại trực tiếp bằng trình duyệt, không ghép hoặc sửa giao diện bằng công cụ ảnh. Hash của ảnh hiện tại và ảnh trước được lưu trong manifest để đối chiếu.

| Hình | Đối chiếu và cập nhật |
| --- | --- |
| 4.1 | Trang mở đầu hiện không còn danh sách liên kết nhanh; chụp lại chủ đề và sơ đồ Việt Nam, sửa chú thích để không mô tả tính năng đã bỏ. |
| 4.2 | Chụp lại giai đoạn 1961–1965 với điều hướng và bố cục hiện tại. |
| 4.3 | Chụp lại hộp chi tiết Chiến thắng Ấp Bắc trong giao diện hiện tại. |
| 4.4 | Kho tư liệu hiện trình bày toàn bộ 13 mục, không còn hàng bộ lọc giai đoạn; thẻ ảnh và tiêu đề đã thay đổi bố cục. |
| 4.5 | **Thay nội dung minh họa:** bỏ ảnh bộ lọc cũ, chụp thẻ trực thăng UH-1 Huey nổi bật và nút Xem trên dòng thời gian. Tệp mới là `hinh-4-05-tu-lieu-noi-bat.png`. |
| 4.6 | Hộp chi tiết tư liệu hiện dùng nút Xem chi tiết, nhãn nguồn ảnh và vị trí 4/13 trong kho; không còn danh mục liên kết nguồn tham khảo của bản trước. |
| 4.7 | Nội dung bộ 19 câu không đổi; chụp lại để cập nhật thanh điều hướng và kiểu trình bày hiện tại. |
| 4.8 | Chụp lại phản hồi sai, đáp án đúng và giải thích. Kiểm tra khóa bốn lựa chọn sau khi trả lời. |
| 4.9 | Chụp lại kết quả 18/19 bằng lượt kiểm tra minh họa và giao diện chân trang hiện tại. |
| 4.10 | Chụp lại bố cục tổng kết mới và mục lục; nội dung trang web đã đồng bộ cách trình bày bốn chiến lược chiến tranh. |
| 4.11 | Tên và MSSV của 10 thành viên không đổi; chụp lại trang tác giả với thanh điều hướng hiện tại. |
| 4.12a, 4.12b | Chụp lại giao diện điện thoại ở đầu bài ôn tập và sau khi cuộn; giữ hai ảnh song song, cùng trang với Hình 4.11. |

## Mô tả được chỉnh cùng ảnh

- Bỏ mô tả tính năng lọc giai đoạn vì phiên bản hiện tại không có bộ lọc gallery.
- Thay mô tả và hàng kiểm tra bộ lọc bằng duyệt 13 mục, nhãn giai đoạn và thẻ UH-1 nổi bật.
- Đổi tên nút thành **Xem chi tiết**; phân biệt nhãn nguồn ảnh với danh mục tài liệu tham khảo.
- Làm rõ `data.js` chứa dữ liệu tư liệu, tổng kết, nhóm; `timeline-data.js` cung cấp nội dung dòng thời gian qua `TL_DATA`.
- Cập nhật ngày truy cập/chụp và nguồn hình thành 23/11/2026. Giữ nguyên số liệu đã xác nhận: 5 giai đoạn, 13 tư liệu, 19 câu hỏi, 10 thành viên.

## Bằng chứng

`img/screenshots/screenshot-manifest.json` ghi nhận HTTP 200, 13 ảnh chụp có hash SHA-256 và 15 kiểm tra đạt; không ghi nhận lỗi JavaScript dạng `pageerror` hay tràn ngang ở khung nhìn điện thoại đã kiểm tra. Kết quả này chỉ áp dụng cho các thao tác và môi trường được ghi lại, không phải kiểm thử toàn diện mọi thiết bị.

Bản PDF đã được biên dịch lại từ nguồn LaTeX với 34 trang, 13 ảnh tính năng và logo trường; không có cảnh báo LaTeX, khung chữ tràn hoặc trang gần như trống. Các thông tin về viewport vẫn được giữ trong manifest phục vụ tái tạo, còn báo cáo dùng cách gọi giao diện điện thoại theo yêu cầu.
