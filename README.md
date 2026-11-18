# Website Học Liệu Lịch Sử Đảng Cộng Sản Việt Nam (1954 - 1975)

## 📌 Đề tài
> **"Từ đường lối đến thực tiễn: Tìm hiểu sự lãnh đạo của Đảng trong kháng chiến chống Mỹ, cứu nước (1954 - 1975), góc nhìn từ chứng tích lịch sử tại Bảo tàng Chứng tích Chiến tranh"**  
> *Học phần: Lịch sử Đảng Cộng sản Việt Nam (LSD) - Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM (HCMUS)*

🎨 **Thiết kế giao diện UI/UX:** [Figma Design Link](https://www.figma.com/design/DDidnAihQLmJ2UeVcnvA7R/LSD-web?node-id=4-3&t=8j3aYzIykb9vdsjh-1)

---

## 📅 Các mốc Deadline quan trọng

| Giai đoạn | Hạn chót (Deadline) | Nhiệm vụ chính | Đầu ra (Deliverables) | Người phụ trách |
| :---: | :---: | :--- | :--- | :--- |
| **Giai đoạn 1** | **23:59 - 20/11** | Hoàn thành nội dung học liệu 5 giai đoạn, hình ảnh chứng tích Bảo tàng, bộ câu hỏi trắc nghiệm & bài tổng kết | Các file markdown tại [docs/](./docs/) & ảnh chụp thực tế | Bảo, Phong, Văn An, Xuân An, Tấn, Quang |
| **Giai đoạn 2** | **23:59 - 22/11** | Nhóm Vibecode hoàn thiện mã nguồn website theo mẫu Figma, tích hợp toàn bộ dữ liệu thực tế | Source code hoàn chỉnh tại [src/](./src/) | Giang, Quý, Minh |
| **Giai đoạn 3** | **23:59 - 23/11** | Nghiệm thu sản phẩm, hoàn thiện Báo cáo tổng kết (Report Word/PDF) và nộp bài | Báo cáo hoàn chỉnh tại [docs/bao-cao/](./docs/bao-cao/) | Trường (Nhóm trưởng) |

> 📄 Xem chi tiết kế hoạch làm việc tại: [PHAN_CONG.md](./PHAN_CONG.md)

---

## 📂 Cấu trúc thư mục dự án

```text
lsd-web/
├── PHAN_CONG.md                        # Kế hoạch phân công & tiêu chuẩn dữ liệu
├── README.md                           # Giới thiệu dự án & link thiết kế Figma
│
├── src/                                # TOÀN BỘ MÃ NGUỒN WEBSITE (Vibecode phụ trách)
│   ├── index.html                      # Giao diện chính của website
│   └── assets/                         # Tài nguyên web tĩnh
│       ├── css/
│       │   ├── style.css               # Giao diện tổng thể, bảng màu, typography, navbar
│       │   ├── timeline.css            # Chế độ Slide thuyết trình & Interactive Timeline ở đáy
│       │   ├── gallery.css             # Kho tư liệu chứng tích Bảo tàng & Lightbox modal
│       │   └── quiz.css                # Ứng dụng trắc nghiệm đố vui ôn tập
│       ├── js/
│       │   ├── data.js                 # Cơ sở dữ liệu học liệu 5 giai đoạn & nhóm
│       │   ├── quiz-data.js            # Ngân hàng 12 câu hỏi trắc nghiệm ôn tập
│       │   ├── timeline.js             # Xử lý slide, mốc timeline đáy, phím mũi tên ← →
│       │   ├── gallery.js              # Lọc tư liệu theo giai đoạn, phóng to hiện vật
│       │   ├── quiz.js                 # Xử lý làm quiz, tính điểm, hiện giải thích
│       │   └── main.js                 # Quản trị điều hướng menu và màn hình
│       └── images/
│           └── placeholders/           # 12 ảnh vector SVG placeholder chuẩn bị sẵn
│
└── docs/                               # TOÀN BỘ TÀI LIỆU & NỘI DUNG (Nhóm nội dung phụ trách)
    ├── giai-doan-1_1954-1960/          # Phụ trách: Bảo (noi-dung.md & images/)
    ├── giai-doan-2_1961-1965/          # Phụ trách: Phong (noi-dung.md & images/)
    ├── giai-doan-3_1965-1968/          # Phụ trách: Văn An (noi-dung.md & images/)
    ├── giai-doan-4_1969-1973/          # Phụ trách: Xuân An (noi-dung.md & images/)
    ├── giai-doan-5_1973-1975/          # Phụ trách: Tấn (noi-dung.md & images/)
    ├── tong-ket-va-on-tap/             # Phụ trách: Quang (tong-ket.md & cau-hoi-quiz.json)
    └── bao-cao/                        # Phụ trách: Trường (report_outline.md)
```

---

## 👥 Danh sách phân công nhiệm vụ

| Thành viên | Vai trò | Nhiệm vụ chính | Thư mục làm việc |
| :--- | :--- | :--- | :--- |
| **Bảo** | Nội dung | Giai đoạn 1 (1954 - 1960): Giữ gìn lực lượng & Phong trào Đồng Khởi | [docs/giai-doan-1_1954-1960/](./docs/giai-doan-1_1954-1960/) |
| **Phong** | Nội dung | Giai đoạn 2 (1961 - 1965): Đánh bại chiến lược "Chiến tranh đặc biệt" | [docs/giai-doan-2_1961-1965/](./docs/giai-doan-2_1961-1965/) |
| **Văn An** | Nội dung | Giai đoạn 3 (1965 - 1968): Đánh bại "Chiến tranh cục bộ" & Mậu Thân 1968 | [docs/giai-doan-3_1965-1968/](./docs/giai-doan-3_1965-1968/) |
| **Xuân An** | Nội dung | Giai đoạn 4 (1969 - 1973): Đánh bại "Việt Nam hóa chiến tranh" & Hiệp định Paris | [docs/giai-doan-4_1969-1973/](./docs/giai-doan-4_1969-1973/) |
| **Tấn** | Nội dung | Giai đoạn 5 (1973 - 1975): Giải phóng hoàn toàn miền Nam, thống nhất đất nước | [docs/giai-doan-5_1973-1975/](./docs/giai-doan-5_1973-1975/) |
| **Quang** | Học thuật | Bài tổng kết toàn diện + Ngân hàng câu hỏi đố vui ôn tập (Quiz) + Hiệu đính | [docs/tong-ket-va-on-tap/](./docs/tong-ket-va-on-tap/) |
| **Giang** | Vibecode | UI tổng thể, Slide thuyết trình & Interactive Timeline bar | [src/assets/](./src/assets/) |
| **Quý** | Vibecode | Kho tư liệu chứng tích bảo tàng (Gallery), Modal chi tiết & Responsive | [src/assets/](./src/assets/) |
| **Minh** | Vibecode | Hệ thống Đố vui trắc nghiệm (Interactive Quiz) & Trang cảm nghĩ/nhóm | [src/assets/](./src/assets/) |
| **Trường** | Nhóm trưởng | Quản lý tiến độ, tổng hợp đề tài, viết Báo cáo tổng kết & Nộp bài | [docs/bao-cao/](./docs/bao-cao/) |

---

## 🚀 Hướng dẫn mở và kiểm tra Website
1. Mở file [src/index.html](./src/index.html) bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Cốc Cốc, Safari) hoặc mở qua tiện ích **Live Server** trong VS Code.
2. Tại màn hình **Dòng thời gian & Slide**, bạn có thể bấm vào các mốc thời gian trên thanh Timeline ở dưới hoặc nhấn phím `←` / `→` trên bàn phím để chuyển đổi giữa các giai đoạn lịch sử.
