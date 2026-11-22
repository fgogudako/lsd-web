/**
 * TIMELINE-DATA.JS – Dữ liệu cô đọng cho tab "Dòng thời gian" (index.html #viewTimeline)
 *
 * Nguồn: docs/giai-doan-1..5/noi-dung.md, docs/tong-ket-va-on-tap/tong-ket.md.
 * Khi nhóm nội dung sửa docs, cập nhật lại các mốc tương ứng ở đây.
 *
 * Quy ước mỗi mốc (event):
 *   date  : "YYYY-MM-DD" | "YYYY-MM" | "YYYY"   (dùng cho tờ lịch & thước năm)
 *   label : cách hiển thị ngày trên thẻ
 *   type  : "ctx" (Bối cảnh) | "line" (Đường lối) | "prac" (Thực tiễn)
 *   key   : true = mốc trọng tâm ôn thi (hiện cả khi bật "Chỉ mốc trọng tâm")
 *   place : khóa trong TL_DATA.places (ghim trên dải đất 3D)
 *   from  : id của mốc Đường lối mà mốc Thực tiễn này hiện thực hóa
 *   module: hoạt họa minh họa nhỏ đi kèm
 *   liberate: vùng được tô sáng trên dải đất khi tới mốc (chỉ dùng cho 1975)
 *   detail  : diễn giải đầy đủ (các đoạn cách nhau bằng \n\n) – có thì thẻ hiện nút "Xem chi tiết"
 *   meaning : ý nghĩa (tùy chọn) · refs: danh sách nguồn tham khảo
 *
 * Quy ước mỗi hiện vật (artifacts) – bấm vào ảnh sẽ mở hộp chi tiết:
 *   img, title, where (vị trí trưng bày), text (tóm tắt dưới ảnh),
 *   detail (mô tả đầy đủ, các đoạn cách nhau bằng \n\n),
 *   source: { author?, site, url?, license?, licenseUrl?, changes? } | null (null = chưa có nguồn)
 */
window.TL_DATA = {
  places: {
    hanoi: { name: "Hà Nội", lat: 21.03, lon: 105.85 },
    v17: { name: "Vĩ tuyến 17 · Sông Bến Hải", lat: 17.0, lon: 107.05 },
    saigon: { name: "Sài Gòn", lat: 10.78, lon: 106.7 },
    bentre: { name: "Bến Tre", lat: 10.15, lon: 106.35 },
    tayninh: { name: "Tân Lập, Tây Ninh", lat: 11.55, lon: 106.1 },
    apbac: { name: "Ấp Bắc, Mỹ Tho", lat: 10.42, lon: 106.1 },
    binhgia: { name: "Bình Giã, Bà Rịa", lat: 10.63, lon: 107.27 },
    vantuong: { name: "Núi Thành – Vạn Tường", lat: 15.35, lon: 108.72 },
    duong9: { name: "Đường 9 – Nam Lào", lat: 16.63, lon: 106.65 },
    quangtri: { name: "Quảng Trị", lat: 16.75, lon: 107.19 },
    phuoclong: { name: "Phước Long", lat: 11.8, lon: 106.95 },
    bmt: { name: "Buôn Ma Thuột", lat: 12.67, lon: 108.04 },
    danang: { name: "Huế – Đà Nẵng", lat: 16.05, lon: 108.15 },
    hoangsa: { name: "Quần đảo Hoàng Sa", lat: 16.45, lon: 111.95 },
    xuanloc: { name: "Xuân Lộc", lat: 10.93, lon: 107.24 },
    paris: { name: "Paris, Pháp", offmap: true }
  },

  stages: [
    {
      id: "gd-1",
      years: "1954 – 1960",
      short: "Đồng Khởi",
      title: "Đánh bại “Chiến tranh đơn phương”, tiến lên Đồng Khởi",
      lede: "Sau Hiệp định Giơ-ne-vơ, đất nước tạm chia cắt. Miền Bắc đi lên chủ nghĩa xã hội; miền Nam kiên cường đấu tranh giữ gìn lực lượng, đánh bại chiến lược “Chiến tranh đơn phương” của Mỹ – Diệm, tiến lên Đồng Khởi.",
      owner: "Bảo",
      opp: {
        name: "“Chiến tranh đơn phương”",
        parts: ["Chính quyền Ngô Đình Diệm", "Viện trợ & cố vấn Mỹ"],
        note: "Chiến lược “Chiến tranh đơn phương” (1954 – 1960): Mỹ dựng chính quyền Ngô Đình Diệm, viện trợ quân sự, ban hành Luật 10/59 lê máy chém khắp miền Nam nhằm biến miền Nam thành thuộc địa kiểu mới và căn cứ quân sự."
      },
      events: [
        {
          id: "geneva", date: "1954-07-21", label: "21/7/1954", type: "ctx", key: true,
          detail: "Chiến thắng Điện Biên Phủ (7/5/1954) buộc Pháp phải ký Hiệp định Giơ-ne-vơ, công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, Lào, Campuchia. Việt Nam tạm thời chia làm hai vùng tập kết quân sự ở hai bên vĩ tuyến 17 (sông Bến Hải), chờ tổng tuyển cử tự do thống nhất đất nước vào tháng 7/1956 – đây chỉ là ranh giới quân sự, không phải biên giới quốc gia.\n\nMiền Bắc hoàn toàn giải phóng, bước vào hàn gắn vết thương chiến tranh, khôi phục kinh tế và cải tạo xã hội chủ nghĩa. Ở miền Nam, Mỹ từng bước thay chân Pháp, dựng lên chính quyền Ngô Đình Diệm, biến miền Nam thành thuộc địa kiểu mới; chính quyền Diệm tuyên bố không thực hiện tổng tuyển cử năm 1956.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 89 – 93", "Hiệp định Giơ-ne-vơ về đình chỉ chiến sự ở Việt Nam, 21/7/1954"],
          title: "Hiệp định Giơ-ne-vơ",
          text: "Tạm chia hai miền tại vĩ tuyến 17 – ranh giới quân sự tạm thời, hẹn tổng tuyển cử thống nhất vào 7/1956.",
          place: "v17"
        },
        {
          id: "mydiem", date: "1955", label: "1955 – 1956", type: "ctx",
          title: "Mỹ thay chân Pháp",
          text: "Dựng chính quyền Ngô Đình Diệm, khước từ tổng tuyển cử 1956, mở chiến dịch “tố cộng, diệt cộng”.",
          place: "saigon"
        },
        {
          id: "nq15", date: "1959-01", label: "1/1959", type: "line", key: true,
          detail: "Nghị quyết xác định nhiệm vụ cơ bản của cách mạng miền Nam là giải phóng miền Nam khỏi ách thống trị của đế quốc và phong kiến, thực hiện độc lập dân tộc và người cày có ruộng. Con đường cơ bản là khởi nghĩa giành chính quyền về tay nhân dân, dựa vào lực lượng chính trị của quần chúng là chủ yếu, kết hợp với lực lượng vũ trang.\n\nPhương pháp: sử dụng bạo lực cách mạng của quần chúng, kết hợp đấu tranh chính trị với đấu tranh vũ trang tùy tình hình cụ thể.\n\nLưu ý trình tự: chính sách đàn áp diễn ra liên tục từ 1955; Hội nghị Trung ương 15 họp từ tháng 1/1959, còn Luật 10/59 ban hành sau đó (6/5/1959) – Luật 10/59 không phải nguyên nhân trực tiếp của Nghị quyết 15.",
          meaning: "Đáp ứng đúng yêu cầu bức thiết của thực tiễn, tháo gỡ sự ức chế trong cán bộ, nhân dân miền Nam, mở đường cho cách mạng miền Nam tiến lên.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 89 – 93", "Chi tiết “lực lượng chính trị của quần chúng là chủ yếu” theo góp ý review – cần đối chiếu văn kiện gốc"],
          title: "Nghị quyết Trung ương 15",
          text: "Bước ngoặt: con đường cơ bản là khởi nghĩa giành chính quyền về tay nhân dân bằng bạo lực cách mạng – lực lượng chính trị quần chúng là chủ yếu, kết hợp lực lượng vũ trang.",
          place: "hanoi"
        },
        {
          id: "luat1059", date: "1959-05-06", label: "6/5/1959", type: "ctx",
          title: "Đạo luật 10/59",
          text: "Đặt người yêu nước ra ngoài vòng pháp luật; khủng bố bằng súng đạn và máy chém.",
          place: "saigon"
        },
        {
          id: "dongkhoi", date: "1960-01-17", label: "17/1/1960", type: "prac", key: true,
          detail: "Tiếp thu tinh thần Nghị quyết 15, nhân dân nhiều nơi nổi dậy phá thế kìm kẹp từ giữa năm 1959 (Tà Lốc, Tà Léc – Bình Định; Bắc Ái – Ninh Thuận; Trà Bồng – Quảng Ngãi; Gò Quảng Cung – Đồng Tháp). Tiêu biểu nhất là Bến Tre: ngày 17/1/1960, đồng khởi bùng nổ ở Mỏ Cày do bà Nguyễn Thị Định lãnh đạo, lan ra Minh Tân, Giồng Trôm, Châu Thành, Ba Tri, Thạnh Phú, rồi mở rộng ra đồng bằng sông Cửu Long, Tây Nguyên và một số nơi ở Trung Bộ.\n\nĐến cuối năm 1960, nhân dân giành quyền tự quản ở 1.383/2.627 xã; bộ máy kìm kẹp của Mỹ – Diệm ở nhiều vùng nông thôn bị phá vỡ hoặc suy yếu nghiêm trọng. “Đội quân tóc dài” – lực lượng phụ nữ – làm nòng cốt biểu tình, đấu tranh chính trị trực diện và binh vận.",
          meaning: "Bước nhảy vọt của cách mạng miền Nam: chuyển từ thế giữ gìn lực lượng sang thế tiến công, làm thất bại về cơ bản chính sách “Chiến tranh đơn phương” của Mỹ – Diệm, tạo tiền đề đối phó “Chiến tranh đặc biệt” từ năm 1961.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 89 – 93"],
          title: "Đồng Khởi Bến Tre",
          text: "Bùng nổ ở Mỏ Cày do bà Nguyễn Thị Định lãnh đạo, lan khắp Nam Bộ, Tây Nguyên, Trung Bộ – “Đội quân tóc dài” làm nòng cốt.",
          place: "bentre", from: "nq15",
          module: { type: "waffle", value: 1383, total: 2627, unit: "xã", caption: "giành quyền tự quản đến cuối năm 1960" }
        },
        {
          id: "daihoi3", date: "1960-09-05", label: "5 – 10/9/1960", type: "line", key: true,
          detail: "Đại hội họp tại Hà Nội (5 – 10/9/1960), hoàn chỉnh đường lối chiến lược chung của cách mạng cả nước: hai chiến lược khác nhau ở hai miền nhưng cùng một mục tiêu – cách mạng xã hội chủ nghĩa ở miền Bắc và cách mạng dân tộc dân chủ nhân dân ở miền Nam.\n\nMiền Bắc là hậu phương lớn, giữ vai trò quyết định nhất đối với sự nghiệp cách mạng cả nước; miền Nam là tiền tuyến lớn, giữ vai trò quyết định trực tiếp trong việc đánh đổ Mỹ – Diệm, thống nhất đất nước. Hai cuộc cách mạng thuộc một cuộc cách mạng chung, quan hệ mật thiết, tác động qua lại. Đại hội bầu đồng chí Lê Duẩn làm Bí thư thứ nhất.",
          meaning: "Thể hiện năng lực xác định mục tiêu chiến lược và xử lý đúng đắn mối quan hệ giữa hai miền – nền tảng cho sự lãnh đạo của Đảng suốt cuộc kháng chiến.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 89 – 93"],
          title: "Đại hội đại biểu toàn quốc lần thứ III",
          text: "Hai chiến lược, một mục tiêu: miền Bắc giữ vai trò quyết định nhất, miền Nam giữ vai trò quyết định trực tiếp.",
          place: "hanoi"
        },
        {
          id: "mtdtgp", date: "1960-12-20", label: "20/12/1960", type: "prac",
          title: "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
          text: "Ra đời tại Tân Lập (Tây Ninh), đoàn kết mọi tầng lớp, dân tộc, tôn giáo chống Mỹ – Diệm.",
          place: "tayninh", from: "nq15"
        }
      ],
      artifacts: [
        {
          img: "assets/images/artifacts/gd1-may-chem.jpg",
          title: "Máy chém thời Ngô Đình Diệm",
          where: "Khu trưng bày hệ thống nhà tù, chuồng cọp / “Tội ác chiến tranh” (vị trí đang đối chiếu)",
          text: "Chứng tích chính sách đàn áp gắn với Luật 10/59 – bối cảnh để hiểu vì sao cách mạng miền Nam chuyển hướng năm 1959.",
          detail: "Máy chém tại bảo tàng là chứng tích về chính sách trấn áp và hành hình trong thời kỳ chiến tranh; theo tư liệu lịch sử, chính quyền Diệm cho đem máy chém đi các tỉnh để uy hiếp tinh thần quần chúng.\n\nHiện vật phản ánh một khía cạnh của chính sách đàn áp dưới chế độ Ngô Đình Diệm (bản thân hiện vật không cho biết cụ thể số người đã bị hành quyết bằng chính chiếc máy này). Đây là bằng chứng về bối cảnh lịch sử dẫn đến việc Đảng chuyển hướng phương pháp cách mạng ở miền Nam năm 1959, chứ không tự nó chứng minh tính đúng đắn của Nghị quyết 15.",
          source: null
        },
        {
          img: "assets/images/artifacts/gd1-dong-khoi.jpg",
          title: "Tư liệu Đồng Khởi & “Đội quân tóc dài”",
          where: "Khu tư liệu các giai đoạn kháng chiến (vị trí đang đối chiếu)",
          text: "Quần chúng nổi dậy, phụ nữ xuống đường – sức mạnh của lực lượng chính trị khi có đường lối đúng.",
          detail: "Tư liệu ghi lại cảnh quần chúng nổi dậy, hình ảnh lực lượng phụ nữ xuống đường đấu tranh.\n\nQua đó thấy sức mạnh của nhân dân khi được Đảng định hướng đúng đường lối, và vai trò của lực lượng chính trị quần chúng bên cạnh lực lượng vũ trang.",
          source: null
        }
      ],
      takeaway: "Nghị quyết 15 mở đường → Đồng Khởi đưa cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công."
    },

    {
      id: "gd-2",
      years: "1961 – 1965",
      short: "Chiến tranh đặc biệt",
      title: "Đánh bại “Chiến tranh đặc biệt”",
      lede: "Mỹ dùng “Chiến tranh đặc biệt” – người Việt đánh người Việt. Đảng chỉ đạo đánh địch bằng hai chân, ba mũi, trên cả ba vùng chiến lược.",
      owner: "Phong",
      opp: {
        name: "“Chiến tranh đặc biệt”",
        parts: ["Cố vấn Mỹ", "Vũ khí Mỹ", "Quân đội Sài Gòn"],
        note: "Kế hoạch Staley – Taylor (1961 – 1963), Johnson – McNamara (1964 – 1965); dự kiến 17.000 ấp chiến lược, “trực thăng vận”, “thiết xa vận”."
      },
      events: [
        {
          id: "bct6162", date: "1961-01", label: "1/1961 & 2/1962", type: "line", key: true,
          detail: "Trong hai hội nghị tháng 1/1961 và 2/1962, Bộ Chính trị phân tích tình hình sau Đồng Khởi và ra chỉ thị về “Phương hướng và nhiệm vụ công tác trước mắt của cách mạng miền Nam”: giữ vững thế tiến công chiến lược, đưa đấu tranh vũ trang phát triển song song với đấu tranh chính trị – chuyển từ khởi nghĩa từng phần sang chiến tranh cách mạng.\n\nTiến công địch trên ba vùng chiến lược: rừng núi (đấu tranh vũ trang là chủ yếu), nông thôn đồng bằng (kết hợp vũ trang và chính trị), đô thị (đấu tranh chính trị là chủ yếu) – bằng ba mũi giáp công: quân sự, chính trị, binh vận.\n\nĐể tăng cường lãnh đạo trực tiếp, ngày 15/2/1961 các lực lượng vũ trang miền Nam thống nhất thành Quân Giải phóng miền Nam Việt Nam; tháng 10/1961 Trung ương Cục miền Nam được thành lập do đồng chí Nguyễn Văn Linh làm Bí thư.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 201 – 202"],
          title: "Hội nghị Bộ Chính trị",
          text: "Giữ vững thế tiến công, chuyển từ khởi nghĩa từng phần sang chiến tranh cách mạng.",
          place: "hanoi",
          module: {
            type: "triad",
            rows: [
              ["2", "chân", "Chính trị · Vũ trang"],
              ["3", "mũi", "Quân sự · Chính trị · Binh vận"],
              ["3", "vùng", "Rừng núi · Nông thôn đồng bằng · Đô thị"]
            ]
          }
        },
        {
          id: "dacam", date: "1961-08-10", label: "10/8/1961", type: "ctx",
          title: "Mỹ bắt đầu rải chất độc da cam",
          text: "Khởi đầu thảm họa dioxin kéo dài nhiều thế hệ – một trong những chứng tích lớn tại Bảo tàng.",
          place: null
        },
        {
          id: "apbac", date: "1963-01-02", label: "2/1/1963", type: "prac", key: true,
          detail: "Thắng lợi quân sự vang dội đầu tiên của quân và dân miền Nam, diễn ra tại Mỹ Tho. Trận đánh thể hiện sức mạnh tổng hợp của đấu tranh vũ trang kết hợp đấu tranh chính trị và binh vận, bác bỏ trên thực tế hiệu quả của “trực thăng vận” và “thiết xa vận” – những chiến thuật mà địch đặt nhiều kỳ vọng.\n\nSau trận này, phong trào “Thi đua Ấp Bắc, giết giặc lập công” lan rộng trên toàn chiến trường miền Nam.",
          meaning: "Lần đầu tiên đánh bại chiến thuật trực thăng vận và thiết xa vận trên thực địa – mốc mang tính bước ngoặt của giai đoạn 1961 – 1965.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 202 – 205"],
          title: "Chiến thắng Ấp Bắc",
          text: "Đánh bại “trực thăng vận”, “thiết xa vận” trên thực địa; dấy lên phong trào “Thi đua Ấp Bắc, giết giặc lập công”.",
          place: "apbac", from: "bct6162"
        },
        {
          id: "phaap", date: "1963", label: "1963", type: "prac",
          title: "Phá “Ấp chiến lược”",
          text: "“Bám đất, bám làng”; ở đô thị bùng nổ đấu tranh của học sinh, sinh viên, Phật tử.",
          place: null, from: "bct6162",
          module: { type: "fence", planned: "17.000" }
        },
        {
          id: "tw9", date: "1963-12", label: "12/1963", type: "line", key: true,
          detail: "Tháng 12/1963, Trung ương Đảng họp Hội nghị lần thứ 9, xác định những vấn đề quan trọng về đường lối cách mạng miền Nam.\n\nNghị quyết khẳng định đấu tranh vũ trang “đóng vai trò quyết định trực tiếp” thắng lợi trên chiến trường – văn kiện thể hiện rõ nhất quyết tâm đánh thắng đế quốc Mỹ trong giai đoạn này.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 203 – 205"],
          title: "Hội nghị Trung ương 9",
          text: "Khẳng định quyết tâm đánh Mỹ; đấu tranh vũ trang đóng vai trò quyết định trực tiếp.",
          place: "hanoi"
        },
        {
          id: "binhgia", date: "1964-12-02", label: "12/1964 → 6/1965", type: "prac", key: true,
          detail: "Được sự chi viện tích cực từ miền Bắc, quân và dân miền Nam tiến hành hàng loạt chiến dịch: Bình Giã (12/1964), Ba Gia (5/1965), Đồng Xoài (6/1965), khẳng định vững chắc phương châm tác chiến “2 chân, 3 mũi, 3 vùng”.\n\nCả ba trụ cột của “Chiến tranh đặc biệt” – quân đội và chính quyền Sài Gòn, hệ thống ấp chiến lược, sự ổn định ở đô thị – đều bị lung lay tận gốc.",
          meaning: "Đến giữa năm 1965, “Chiến tranh đặc biệt” phá sản hoàn toàn, buộc Mỹ chuyển sang chiến lược “Chiến tranh cục bộ”.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 203 – 204"],
          title: "Bình Giã · Ba Gia · Đồng Xoài",
          text: "Chuỗi chiến dịch làm “Chiến tranh đặc biệt” phá sản hoàn toàn, buộc Mỹ chuyển sang chiến lược mới.",
          place: "binhgia", from: "tw9"
        }
      ],
      artifacts: [
        {
          img: "assets/images/artifacts/gd2-ap-chien-luoc.jpg",
          title: "Mô hình Ấp chiến lược",
          where: "Phòng Tội ác chiến tranh xâm lược",
          text: "Hàng rào tre vót nhọn, bờ đất đắp cao – “quốc sách” biến làng xã thành nhà tù, bị quân dân phá bỏ từng hàng rào.",
          detail: "Bức ảnh ghi lại hàng rào tre/nứa vót nhọn kết hợp bờ đất đắp cao – cấu trúc phòng thủ điển hình của hệ thống ấp chiến lược mà Mỹ và chính quyền Sài Gòn triển khai theo kế hoạch Staley – Taylor (1961 – 1963), với mục tiêu lập tới 17.000 ấp trên toàn miền Nam.\n\nẤp chiến lược nhằm cô lập nhân dân khỏi lực lượng cách mạng, biến làng xã thành nhà tù kiểm soát dân chúng. Dưới sự lãnh đạo của Đảng, quân và dân miền Nam kiên trì bám đất, bám làng, phá bỏ từng hàng rào, giành lại quyền làm chủ. Đến cuối giai đoạn 1961 – 1965, “quốc sách” này hoàn toàn thất bại – một trong ba trụ cột của “Chiến tranh đặc biệt” bị đánh sập.",
          source: null
        },
        {
          img: "assets/images/artifacts/gd2-uh1-huey.jpg",
          title: "Trực thăng UH-1 “Huey”",
          where: "Sân trưng bày ngoài trời",
          text: "Phương tiện chủ lực của “trực thăng vận” – chiến thuật bị đánh bại ngay trên thực địa tại Ấp Bắc.",
          detail: "Chiếc trực thăng Bell UH-1 Iroquois (thường gọi là “Huey”), mang dòng chữ “UNITED STATES ARMY”, được trưng bày nguyên trạng tại sân ngoài trời Bảo tàng. Đây là loại trực thăng chủ lực trong chiến thuật “trực thăng vận”; phía trước thân máy bay vẫn còn cụm bệ phóng rocket.\n\nTrong trận Ấp Bắc (2/1/1963), quân giải phóng đã bắn rơi nhiều trực thăng UH-1 khi địch huy động chúng để đổ bộ quân, chứng minh chiến tranh nhân dân có thể đánh bại ưu thế vũ khí tối tân.",
          source: null
        }
      ],
      takeaway: "“Hai chân, ba mũi, ba vùng” → Ấp Bắc 1963 → “Chiến tranh đặc biệt” phá sản (1965)."
    },

    {
      id: "gd-3",
      years: "1965 – 1968",
      short: "Mậu Thân 1968",
      title: "Đánh bại “Chiến tranh cục bộ”",
      lede: "Quân Mỹ trực tiếp tham chiến, miền Bắc bị đánh phá. Cả nước chống Mỹ, cứu nước; Tết Mậu Thân 1968 buộc Mỹ xuống thang.",
      owner: "Văn An",
      quote: { text: "Không có gì quý hơn độc lập, tự do.", by: "Chủ tịch Hồ Chí Minh, Lời kêu gọi 17/7/1966" },
      opp: {
        name: "“Chiến tranh cục bộ”",
        parts: ["Quân viễn chinh Mỹ", "Quân đồng minh", "Quân đội Sài Gòn"],
        note: "“Tìm và diệt”, “bình định” ở miền Nam; chiến tranh phá hoại miền Bắc bằng không quân, hải quân."
      },
      events: [
        {
          id: "tw1112", date: "1965-03", label: "3/1965 & 12/1965", type: "line", key: true,
          detail: "Hội nghị Trung ương 11 (3/1965) và Trung ương 12 (12/1965) phát triển đường lối kháng chiến chống Mỹ, cứu nước khi cả hai miền đều trong tình trạng chiến tranh: chống Mỹ, cứu nước là nhiệm vụ thiêng liêng của cả dân tộc; kiên quyết đánh bại cuộc chiến tranh xâm lược trong mọi tình huống.\n\nMiền Nam là tiền tuyến lớn, miền Bắc là hậu phương lớn; kết hợp đấu tranh quân sự với đấu tranh chính trị, phát huy chiến tranh nhân dân trên cả nước. Mục tiêu không phải tiêu diệt toàn bộ quân Mỹ bằng một trận quyết chiến, mà làm thất bại chính sách xâm lược và ý chí tiếp tục chiến tranh của Mỹ.\n\nLời kêu gọi ngày 17/7/1966 của Chủ tịch Hồ Chí Minh với chân lý “Không có gì quý hơn độc lập, tự do” củng cố ý chí của nhân dân cả nước trước sự leo thang của Mỹ.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 205 – 207"],
          title: "Hội nghị Trung ương 11 & 12",
          text: "Chống Mỹ, cứu nước là nhiệm vụ thiêng liêng của cả dân tộc: miền Nam là tiền tuyến lớn, miền Bắc là hậu phương lớn.",
          place: "hanoi"
        },
        {
          id: "vantuong", date: "1965-08-18", label: "26/5 & 18/8/1965", type: "prac", key: true,
          detail: "Trận Núi Thành (đêm 25 rạng 26/5/1965) và trận Vạn Tường (18/8/1965) chứng minh quân và dân ta có thể chủ động đánh, đánh thắng những đơn vị Mỹ trực tiếp tham chiến.",
          meaning: "Góp phần củng cố quyết tâm chiến đấu và tìm ra cách đánh phù hợp trước ưu thế hỏa lực của đối phương.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 205 – 207"],
          title: "Núi Thành – Vạn Tường",
          text: "Chứng minh có thể đánh thắng quân Mỹ; mở đầu cao trào “Tìm Mỹ mà đánh, lùng ngụy mà diệt”.",
          place: "vantuong", from: "tw1112"
        },
        {
          id: "muakho", date: "1967", label: "1965 – 1967", type: "prac",
          title: "Bẻ gãy hai cuộc phản công mùa khô",
          text: "Mỹ không giành được quyền chủ động; miền Bắc vừa chống chiến tranh phá hoại, vừa chi viện tiền tuyến.",
          place: null, from: "tw1112"
        },
        {
          id: "tw14", date: "1968-01", label: "1/1968", type: "line", key: true,
          detail: "Sau hai mùa khô 1965 – 1966 và 1966 – 1967, Bộ Chính trị và Hội nghị Trung ương 14 (1/1968) quyết định mở cuộc Tổng tiến công và nổi dậy vào dịp Tết Mậu Thân, tập trung đánh vào các đô thị và cơ quan đầu não của đối phương.\n\nChủ trương nhằm tạo chuyển biến lớn về cục diện chiến tranh, kết hợp tác động quân sự, chính trị với mặt trận ngoại giao.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2"],
          title: "Nghị quyết Trung ương 14",
          text: "Mở cuộc Tổng tiến công và nổi dậy Tết Mậu Thân, đánh vào đô thị và cơ quan đầu não của đối phương.",
          place: "hanoi"
        },
        {
          id: "mauthan", date: "1968-01-31", label: "Đêm 30 rạng 31/1/1968", type: "prac", key: true,
          detail: "Đêm 30 rạng 31/1/1968, lực lượng cách mạng đồng loạt tiến công nhiều đô thị, căn cứ và cơ quan trọng yếu ở miền Nam. Tại Sài Gòn, các mục tiêu gồm Tòa Đại sứ Mỹ, Dinh Độc Lập, Đài Phát thanh và Bộ Tổng tham mưu quân đội Sài Gòn. Cuộc tiến công gây chấn động dư luận Mỹ và thế giới.\n\nNgày 31/3/1968, Tổng thống Johnson tuyên bố hạn chế ném bom miền Bắc và sẵn sàng đàm phán; đàm phán Việt Nam Dân chủ Cộng hòa – Hoa Kỳ bắt đầu tại Paris ngày 13/5/1968; từ ngày 1/11/1968, Mỹ ngừng toàn bộ ném bom miền Bắc, kết thúc chiến tranh phá hoại lần thứ nhất.",
          meaning: "Bước ngoặt quan trọng về chiến lược và ngoại giao, góp phần buộc Mỹ xuống thang chiến tranh. Tuy nhiên, mục tiêu tổng khởi nghĩa, làm tan rã bộ máy chính quyền Sài Gòn chưa đạt được như dự kiến; lực lượng và cơ sở cách mạng chịu tổn thất nặng.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2"],
          title: "Tổng tiến công và nổi dậy Tết Mậu Thân",
          text: "Đồng loạt tiến công các đô thị; chấn động dư luận Mỹ và thế giới, làm lung lay “Chiến tranh cục bộ”.",
          place: "saigon", from: "tw14",
          module: { type: "targets", items: ["Tòa Đại sứ Mỹ", "Dinh Độc Lập", "Đài Phát thanh", "Bộ Tổng tham mưu"] },
          note: "Mục tiêu tổng khởi nghĩa, làm tan rã bộ máy chính quyền Sài Gòn chưa đạt được như dự kiến; lực lượng và cơ sở cách mạng chịu tổn thất nặng trong các đợt tiến công."
        },
        {
          id: "xuongthang", date: "1968-03-31", label: "31/3 → 1/11/1968", type: "prac",
          title: "Mỹ buộc phải xuống thang",
          text: "Từ hạn chế ném bom đến ngồi vào bàn đàm phán Paris.",
          place: null, from: "tw14",
          module: {
            type: "steps",
            items: [["31/3", "Hạn chế ném bom miền Bắc"], ["13/5", "Đàm phán Paris bắt đầu"], ["1/11", "Ngừng hẳn ném bom – kết thúc chiến tranh phá hoại lần thứ nhất"]]
          }
        }
      ],
      artifacts: [
        {
          img: "assets/images/artifacts/gd3-nha-ga-nam-dinh.jpg",
          title: "Nhà ga Nam Định bị ném bom (1965)",
          where: "Bộ ảnh “Miền Bắc Việt Nam năm 1965” – Felix Greene",
          text: "Chiến tranh phá hoại đánh vào hạ tầng dân sự miền Bắc – hậu phương vừa chiến đấu, vừa chi viện.",
          detail: "Nhà ga Nam Định bị tàn phá và thành phố bị ném bom bốn lần trong khoảng tháng 7 – 9/1965.\n\nẢnh cho thấy chiến tranh phá hoại tác động tới hạ tầng dân sự miền Bắc, làm rõ yêu cầu vừa bảo vệ hậu phương vừa duy trì chi viện cho miền Nam.",
          source: {
            author: "Felix Greene",
            site: "Website Bảo tàng Chứng tích Chiến tranh",
            url: "https://www.baotangchungtichchientranh.vn/vi"
          }
        },
        {
          img: "assets/images/artifacts/gd3-a37.jpg",
          title: "Máy bay cường kích A-37B",
          where: "Khu trưng bày không quân ngoài trời",
          text: "Dòng A-37 tham chiến ở miền Nam từ 8/1967 – minh họa ưu thế hỏa lực không quân trong “Chiến tranh cục bộ”.",
          detail: "A-37B là máy bay cường kích phản lực hạng nhẹ; dòng A-37 được đưa tới miền Nam tham chiến từ tháng 8/1967.\n\nHiện vật minh họa phương tiện và hỏa lực không quân trong bối cảnh “Chiến tranh cục bộ”.",
          source: {
            author: "Balon Greyjoy",
            site: "Wikimedia Commons",
            url: "https://commons.wikimedia.org/wiki/File:20190923_A-37_War_Remnants_Museum-5.jpg",
            license: "CC0 1.0",
            licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
          }
        }
      ],
      takeaway: "Dám đánh và thắng quân Mỹ → Mậu Thân 1968 buộc Mỹ xuống thang, ngồi vào bàn đàm phán."
    },

    {
      id: "gd-4",
      years: "1969 – 1973",
      short: "Hiệp định Paris",
      title: "Đánh bại “Việt Nam hóa chiến tranh”",
      lede: "Mỹ rút dần quân nhưng mở rộng chiến tranh ra cả Đông Dương. Đảng kết hợp quân sự – chính trị – ngoại giao, “vừa đánh, vừa đàm”, buộc Mỹ ký Hiệp định Paris.",
      owner: "Xuân An",
      quote: { text: "Đánh cho Mỹ cút, đánh cho ngụy nhào.", by: "Chủ tịch Hồ Chí Minh, thơ chúc Tết Xuân Kỷ Dậu (1/1/1969)" },
      opp: {
        name: "“Việt Nam hóa chiến tranh”",
        parts: ["Quân đội Sài Gòn", "Hỏa lực, không quân Mỹ", "Cố vấn Mỹ"],
        note: "Học thuyết Nixon (7/1969): rút dần quân Mỹ, “dùng người Việt đánh người Việt”, mở rộng thành “Đông Dương hóa chiến tranh”; hòa hoãn với Trung Quốc, Liên Xô hòng cắt giảm viện trợ cho Việt Nam."
      },
      events: [
        {
          id: "bacho", date: "1969-09-02", label: "2/9/1969", type: "ctx", key: true,
          detail: "Ngày 2/9/1969, Chủ tịch Hồ Chí Minh qua đời, để lại bản Di chúc lịch sử chứa đựng những tư tưởng lớn về các vấn đề căn bản và bức thiết của cách mạng Việt Nam.\n\nTrong lễ truy điệu tại Ba Đình, đồng chí Lê Duẩn, Bí thư thứ nhất Ban Chấp hành Trung ương Đảng, đọc Điếu văn, bày tỏ quyết tâm thực hiện đầy đủ những điều căn dặn trong Di chúc. Toàn Đảng, toàn dân quán triệt chủ trương chiến lược hai bước nêu trong thơ chúc Tết Kỷ Dậu (1/1/1969): “Đánh cho Mỹ cút, đánh cho ngụy nhào”.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 220 – 226"],
          title: "Chủ tịch Hồ Chí Minh qua đời",
          text: "Người để lại bản Di chúc lịch sử; toàn Đảng, toàn dân biến đau thương thành hành động cách mạng.",
          place: "hanoi"
        },
        {
          id: "tw1819", date: "1970-01", label: "Trung ương 18 (1/1970) · Trung ương 19 (2/1971)", type: "line", key: true,
          detail: "Hội nghị Trung ương 18 (1/1970) chỉ đạo kiên trì đẩy mạnh chiến lược tiến công toàn diện, lấy nông thôn làm hướng chính để đánh bại kế hoạch “bình định”, kết hợp tác chiến chính quy với chiến tranh nhân dân địa phương.\n\nHội nghị Trung ương 19 (2/1971) quán triệt thực hiện Di chúc Bác Hồ, huy động nỗ lực cao nhất trên hai miền đẩy mạnh kháng chiến, đồng thời khôi phục kinh tế miền Bắc để củng cố hậu phương lớn và làm tròn nghĩa vụ quốc tế.\n\nĐảng kết hợp ba mặt trận quân sự, chính trị và ngoại giao theo phương châm “vừa đánh, vừa đàm”.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 220 – 228", "Nghị quyết 196-NQ/TW (10/3/1970)", "Nghị quyết 214-NQ/TW (1/3/1971)"],
          title: "Nghị quyết Trung ương 18 & 19",
          text: "Hội nghị Trung ương 18: tiến công toàn diện, lấy nông thôn làm hướng chính để phá “bình định”. Hội nghị Trung ương 19: dồn sức hai miền, khôi phục kinh tế miền Bắc. Phối hợp ba mặt trận, “vừa đánh, vừa đàm”.",
          place: "hanoi",
          module: { type: "fronts", items: ["Quân sự", "Chính trị", "Ngoại giao"], center: "Vừa đánh, vừa đàm" }
        },
        {
          id: "dongduong", date: "1970-04", label: "4/1970", type: "line",
          title: "Hội nghị cấp cao ba nước Đông Dương",
          text: "Việt Nam – Lào – Campuchia thống nhất chiến lược trước việc Mỹ mở rộng chiến tranh; phối hợp thắng lớn ở Cánh Đồng Chum (1970).",
          place: null
        },
        {
          id: "duong9", date: "1971-02", label: "2 – 3/1971", type: "prac", key: true,
          detail: "Quân dân Việt Nam phối hợp với quân dân Lào chủ động đánh bại cuộc hành quân quy mô lớn “Lam Sơn 719” nhằm cắt đứt đường mòn Hồ Chí Minh, cùng với việc đập tan cuộc hành quân “Toàn thắng 1-71” ở Đông Bắc Campuchia.",
          meaning: "Làm quân đội Sài Gòn – “xương sống” của “Việt Nam hóa chiến tranh” – suy yếu nghiêm trọng, mở ra khả năng thực tế đánh bại chiến lược này.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 220 – 228"],
          title: "Chiến thắng Đường 9 – Nam Lào",
          text: "Cùng quân dân Lào đập tan cuộc hành quân “Lam Sơn 719” (và “Toàn thắng 1-71” ở Đông Bắc Campuchia), làm suy yếu nghiêm trọng quân đội Sài Gòn – “xương sống” của “Việt Nam hóa chiến tranh”.",
          place: "duong9", from: "dongduong"
        },
        {
          id: "tc1972", date: "1972-03-30", label: "Xuân – Hè 1972", type: "prac", key: true,
          detail: "Mùa Xuân – Hè 1972, quân ta tiến công quy mô lớn trên các hướng Trị – Thiên, Tây Nguyên, Đông Nam Bộ, đồng bằng Khu V và đồng bằng sông Cửu Long, tiêu biểu là 81 ngày đêm chiến đấu tại Thành cổ Quảng Trị (28/6 – 16/9/1972).",
          meaning: "Phá vỡ ba tuyến phòng ngự mạnh nhất ở Quảng Trị, Tây Nguyên, Đông Nam Bộ, giáng đòn nặng vào chủ lực quân đội Sài Gòn, đánh bại một phần quan trọng chương trình “bình định”, buộc Mỹ “Mỹ hóa” trở lại cuộc chiến.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 220 – 228"],
          title: "Cuộc tiến công chiến lược 1972",
          text: "Phá vỡ ba tuyến phòng ngự mạnh nhất ở Quảng Trị, Tây Nguyên, Đông Nam Bộ, buộc Mỹ phải “Mỹ hóa” trở lại cuộc chiến.",
          place: "quangtri", from: "tw1819",
          module: { type: "duration", parts: [[81, "ngày đêm"]], caption: "chiến đấu bảo vệ Thành cổ Quảng Trị · 28/6 → 16/9/1972" }
        },
        {
          id: "dbpk", date: "1972-12-18", label: "18 – 29/12/1972", type: "prac", key: true,
          detail: "Nhằm ngăn chặn tiến công của ta và ép ta trên bàn đàm phán, từ ngày 18 đến 29/12/1972 Mỹ mở cuộc tập kích chiến lược bằng máy bay B-52 vào Hà Nội, Hải Phòng.\n\nPhát huy cao độ thế trận chiến tranh nhân dân, quân dân miền Bắc bắn rơi 84 máy bay (gồm 34 chiếc B-52 và 5 chiếc F-111A), bắt sống 43 giặc lái.",
          meaning: "Đập tan cuộc chiến tranh phá hoại lần thứ hai, bảo vệ vững chắc hậu phương lớn, buộc Mỹ nối lại đàm phán tại Paris (8/1/1973) và ngừng toàn bộ hoạt động tiến công quân sự chống miền Bắc (15/1/1973).",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 220 – 228"],
          title: "“Hà Nội – Điện Biên Phủ trên không”",
          text: "12 ngày đêm đánh bại tập kích chiến lược bằng B-52 vào Hà Nội, Hải Phòng; buộc Mỹ trở lại đàm phán (8/1/1973) và ngừng mọi hoạt động tiến công miền Bắc (15/1/1973).",
          place: "hanoi",
          module: { type: "twelve", start: 18, stats: [[84, "máy bay bị bắn rơi"], [34, "trong đó là B-52"], [43, "giặc lái bị bắt sống"]] }
        },
        {
          id: "paris", date: "1973-01-27", label: "27/1/1973", type: "prac", key: true,
          detail: "Sau 4 năm 8 tháng 14 ngày đấu tranh ngoại giao, Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết ngày 27/1/1973.\n\nCác điều khoản then chốt: Hoa Kỳ và các nước khác tôn trọng độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ của Việt Nam (Điều 1); Hoa Kỳ chấm dứt dính líu quân sự, can thiệp vào nội bộ miền Nam (Điều 4); rút hoàn toàn quân đội, cố vấn quân sự ra khỏi miền Nam trong thời hạn 60 ngày (Điều 5).",
          meaning: "Đè bẹp ý chí xâm lược của Mỹ, hoàn thành bước đi chiến lược “Đánh cho Mỹ cút”, tạo cơ hội quyết định để tiến lên “Đánh cho ngụy nhào”.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 220 – 228", "Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam (27/1/1973), Điều 1, 4, 5"],
          title: "Hiệp định Paris",
          text: "Mỹ cam kết tôn trọng độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ Việt Nam (Điều 1), rút hết quân trong 60 ngày (Điều 5) – hoàn thành “Đánh cho Mỹ cút”.",
          place: "paris", from: "tw1819",
          module: { type: "duration", parts: [[4, "năm"], [8, "tháng"], [14, "ngày"]], caption: "đấu tranh ngoại giao · 13/5/1968 → 27/1/1973" }
        }
      ],
      artifacts: [
        {
          img: "assets/images/artifacts/gd4-da-cam.jpg",
          title: "Hậu quả chất độc da cam",
          where: "Lầu 1 – Phòng 7 “Hậu quả chất độc da cam trong chiến tranh xâm lược của Mỹ ở Việt Nam”",
          text: "Những cánh rừng trơ trụi sau khi bị rải chất độc hóa học – di chứng kéo dài nhiều thế hệ lên môi trường và con người.",
          detail: "Ảnh tư liệu trong không gian trưng bày “Hậu quả chất độc da cam”: những cánh rừng trơ trụi, chỉ còn thân cây chết khô sau khi bị rải chất độc hóa học.\n\nPhòng trưng bày cho thấy hậu quả của chất độc da cam lên môi trường và sức khỏe con người qua nhiều thế hệ, ở cả hai phía của cuộc chiến – đồng thời kể về sự hỗ trợ của gia đình, xã hội và cộng đồng quốc tế dành cho các nạn nhân, những con người vẫn nỗ lực vươn lên như bao người khác.",
          source: null
        },
        {
          img: "assets/images/artifacts/gd4-ky-hiep-dinh-paris.jpg",
          title: "Bộ trưởng Nguyễn Thị Bình ký Hiệp định Paris",
          where: "Lầu 1 – chuyên đề “Nguyễn Thị Bình – Trí tuệ, Bản lĩnh và Nhân cách phụ nữ Việt Nam thời đại Hồ Chí Minh”",
          text: "27/1/1973: người phụ nữ duy nhất trực tiếp ký Hiệp định – biểu tượng của bản lĩnh ngoại giao “vừa đánh, vừa đàm”.",
          detail: "Bức ảnh đen trắng ghi lại khoảnh khắc ngày 27/1/1973 tại Paris: Bộ trưởng Ngoại giao Nguyễn Thị Bình trong tà áo dài đặt bút ký Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam. Trước mặt bà là biển tên tiếng Pháp của Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam.\n\nLà người phụ nữ duy nhất trực tiếp ký Hiệp định, bà trở thành biểu tượng cho trí tuệ, bản lĩnh ngoại giao Việt Nam trong thế trận “vừa đánh, vừa đàm” của Đảng. Thắng lợi này buộc Mỹ rút hết quân viễn chinh, hoàn thành mục tiêu “Đánh cho Mỹ cút”.",
          source: null
        }
      ],
      takeaway: "Ba mặt trận, “vừa đánh, vừa đàm” → Hiệp định Paris 1973: “Đánh cho Mỹ cút”."
    },

    {
      id: "gd-5",
      years: "1973 – 1975",
      short: "Toàn thắng 1975",
      title: "Giải phóng miền Nam, thống nhất đất nước",
      lede: "Quân Mỹ đã rút, viện trợ bị cắt giảm, thời cơ chín muồi. Đảng chớp thời cơ, rút kế hoạch hai năm xuống 55 ngày đêm, thống nhất non sông.",
      owner: "Tấn",
      quote: { text: "Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa.", by: "Đại tướng Võ Nguyên Giáp, bức điện ngày 7/4/1975" },
      opp: {
        name: "Phá hoại Hiệp định Paris",
        parts: ["Chính quyền Nguyễn Văn Thiệu", "Viện trợ & gần 20.000 cố vấn Mỹ"],
        note: "Chính sách “Bốn không”, kế hoạch “tràn ngập lãnh thổ”, lấn chiếm vùng giải phóng – trong khi viện trợ Mỹ giảm mạnh và Nixon phải từ chức (9/8/1974) sau vụ Watergate."
      },
      events: [
        {
          id: "myrut", date: "1973-03-29", label: "29/3/1973", type: "ctx",
          title: "Quân Mỹ rút hết khỏi miền Nam",
          text: "Bộ chỉ huy quân sự Mỹ cuốn cờ về nước – hoàn thành “Đánh cho Mỹ cút”; so sánh lực lượng thay đổi căn bản có lợi cho cách mạng.",
          place: "saigon"
        },
        {
          id: "tw21", date: "1973-07", label: "7/1973", type: "line", key: true,
          detail: "Sau Hiệp định Paris, trong cán bộ và nhân dân từng xuất hiện tâm lý ngập ngừng, ảo tưởng về khả năng hòa bình, thiếu cảnh giác trước các đòn lấn chiếm của địch. Tháng 7/1973, Hội nghị Trung ương lần thứ 21 (khóa III) khẳng định: “Con đường cách mạng của nhân dân miền Nam là con đường bạo lực cách mạng”.\n\nBất luận trong tình huống nào cũng phải nắm vững thời cơ, giữ vững đường lối chiến lược tiến công; kiên quyết phản công và tiến công địch, giữ vững và mở rộng vùng giải phóng, chuẩn bị tiến lên giải phóng hoàn toàn miền Nam.",
          meaning: "Quyết sách bản lề, giải tỏa băn khoăn tư tưởng, thống nhất ý chí toàn Đảng, toàn quân trên các chiến trường.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 229 – 235", "Nghị quyết 227-NQ/TW (13/10/1973)", "Văn kiện Đảng toàn tập, Tập 34"],
          title: "Nghị quyết Trung ương 21",
          text: "“Con đường cách mạng của nhân dân miền Nam là con đường bạo lực cách mạng”; nắm vững thời cơ, giữ vững chiến lược tiến công.",
          place: "hanoi"
        },
        {
          id: "quandoan", date: "1973-10-24", label: "10/1973 → 3/1975", type: "line",
          title: "Xây dựng “quả đấm thép”",
          text: "Thành lập 4 quân đoàn chủ lực cơ động – từ Quân đoàn 1 (24/10/1973) đến Quân đoàn 3 (26/3/1975) – để tác chiến hiệp đồng quân binh chủng quy mô lớn.",
          place: null
        },
        {
          id: "hoangsa", date: "1974-01-20", label: "20/1/1974", type: "ctx",
          title: "Trung Quốc đánh chiếm Hoàng Sa",
          text: "Trung Quốc dùng vũ lực đánh chiếm trái phép quần đảo Hoàng Sa; Nhà nước Việt Nam luôn khẳng định chủ quyền bất khả xâm phạm đối với quần đảo này.",
          place: "hoangsa"
        },
        {
          id: "bct7475", date: "1974-09-30", label: "9/1974 → 1/1975", type: "line", key: true,
          detail: "Hội nghị Bộ Chính trị mở rộng họp hai đợt (30/9 – 8/10/1974 và 8/12/1974 – 7/1/1975) nhận định: “Chưa bao giờ ta có điều kiện đầy đủ về quân sự, chính trị, có thời cơ chiến lược to lớn như hiện nay”.\n\nKế hoạch hai năm: năm 1975 tranh thủ thời cơ, bất ngờ mở các đòn tiến công lớn và rộng khắp; năm 1976 tổng công kích – tổng khởi nghĩa, giải phóng hoàn toàn miền Nam. Kèm phương án dự phòng: “Nếu thời cơ đến vào đầu hoặc cuối năm 1975 thì lập tức giải phóng miền Nam ngay trong năm 1975”.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 229 – 235", "Văn kiện Đảng toàn tập, Tập 35"],
          title: "Hội nghị Bộ Chính trị",
          text: "Kế hoạch giải phóng miền Nam trong hai năm 1975 – 1976; “nếu thời cơ đến vào đầu hoặc cuối năm 1975 thì lập tức giải phóng miền Nam ngay trong năm 1975”.",
          place: "hanoi"
        },
        {
          id: "phuoclong", date: "1975-01-06", label: "13/12/1974 → 6/1/1975", type: "prac", key: true,
          detail: "Chiến dịch Đường 14 – Phước Long (13/12/1974 – 6/1/1975) do Quân đoàn 4 cùng lực lượng vũ trang địa phương thực hiện, tiêu diệt chi khu Đồng Xoài, giải phóng thị xã và toàn tỉnh Phước Long – tỉnh đầu tiên ở miền Nam được giải phóng hoàn toàn, cách Sài Gòn hơn 100 km.",
          meaning: "Đòn “trinh sát chiến lược”: chứng minh quân đội Sài Gòn mất khả năng tái chiếm, còn Mỹ không thể can thiệp quân sự trở lại – cơ sở để Bộ Chính trị hạ quyết tâm.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 231 – 234"],
          title: "Giải phóng Phước Long",
          text: "Tỉnh đầu tiên ở miền Nam được giải phóng hoàn toàn; đòn “trinh sát chiến lược” cho thấy Mỹ không thể quay lại can thiệp.",
          place: "phuoclong", from: "tw21", liberate: "phuoclong"
        },
        {
          id: "taynguyen", date: "1975-03-10", label: "4/3 – 24/3/1975", type: "prac", key: true,
          detail: "Ta nghi binh rầm rộ ở Pleiku và Kon Tum, buộc đối phương dồn chủ lực lên phía Bắc Tây Nguyên. Rạng sáng 10/3/1975, quân ta bất ngờ hiệp đồng binh chủng đánh thẳng vào thị xã Buôn Ma Thuột, giải phóng hoàn toàn sau hơn 30 giờ chiến đấu.\n\nNguyễn Văn Thiệu ra lệnh rút bỏ Tây Nguyên để co cụm giữ duyên hải; cuộc rút chạy trên Đường số 7 biến thành thảm họa, Quân đoàn 2 quân đội Sài Gòn tan rã. Tây Nguyên hoàn toàn giải phóng (24/3/1975).",
          meaning: "Đòn điểm huyệt mở màn Tổng tiến công và nổi dậy mùa Xuân 1975 – nghệ thuật nghi binh tạo bất ngờ tuyệt đối về chiến lược.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 231 – 234"],
          title: "Chiến dịch Tây Nguyên",
          text: "Nghi binh ở Pleiku – Kon Tum, bất ngờ đánh Buôn Ma Thuột (10/3); địch rút chạy hỗn loạn, Tây Nguyên hoàn toàn giải phóng.",
          place: "bmt", from: "bct7475", liberate: "taynguyen"
        },
        {
          id: "rutngan", date: "1975-03-18", label: "8/1 → 14/4/1975", type: "line", key: true,
          detail: "8/1/1975: thông qua kế hoạch 2 năm (1975 – 1976), dự kiến phương án 1 năm nếu có thời cơ. 18/3: quyết định giải phóng miền Nam ngay trong năm 1975. 25/3: giải phóng miền Nam trước mùa mưa (trước tháng 5/1975). 7/4: Đại tướng Võ Nguyên Giáp phát bức điện “Thần tốc, thần tốc hơn nữa…”. 14/4: đặt tên chiến dịch giải phóng Sài Gòn là “Chiến dịch Hồ Chí Minh”.\n\nBộ Chính trị đồng thời chỉ thị về việc tiếp quản Sài Gòn – Gia Định: bảo toàn tính mạng, tài sản của hơn 3 triệu đồng bào nội đô; nghiêm cấm pháo kích bừa bãi vào khu dân cư; bảo vệ nguyên vẹn nhà máy điện, nước, bệnh viện, trường học, cầu cống.",
          meaning: "Nghệ thuật tạo thời cơ, đón thời cơ và chớp thời cơ: từ kế hoạch 2 năm rút xuống còn 55 ngày đêm.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 229 – 235", "Văn kiện Đảng toàn tập, Tập 36 (quyết nghị 18/3 và 25/3/1975)"],
          title: "Bộ Chính trị rút ngắn kế hoạch",
          text: "Chớp thời cơ liên tục, từ kế hoạch hai năm rút xuống còn 55 ngày đêm.",
          place: "hanoi",
          module: {
            type: "steps",
            items: [["8/1", "Thông qua kế hoạch 2 năm"], ["18/3", "Giải phóng miền Nam ngay trong năm 1975"], ["25/3", "Giải phóng trước mùa mưa"], ["14/4", "Đặt tên “Chiến dịch Hồ Chí Minh”"]]
          }
        },
        {
          id: "huedanang", date: "1975-03-29", label: "21/3 – 29/3/1975", type: "prac",
          title: "Chiến dịch Huế – Đà Nẵng",
          text: "Giải phóng Huế (26/3), Đà Nẵng (29/3) sau 32 giờ tiến công; Quân đoàn I quân đội Sài Gòn bị quét sạch.",
          place: "danang", from: "rutngan", liberate: "huedanang"
        },
        {
          id: "xuanloc", date: "1975-04-21", label: "9/4 – 21/4/1975", type: "prac",
          title: "Chọc thủng “cánh cửa thép” Xuân Lộc",
          text: "Sau 12 ngày đêm, mở toang cửa ngõ phía Đông Sài Gòn; Nguyễn Văn Thiệu từ chức và tháo chạy.",
          place: "xuanloc", from: "rutngan"
        },
        {
          id: "hcm", date: "1975-04-30", label: "26/4 – 30/4/1975", type: "prac", key: true,
          detail: "Sau khi chọc thủng “cánh cửa thép” Xuân Lộc (9 – 21/4), 17 giờ ngày 26/4 năm cánh quân (hơn 280.000 quân) đồng loạt tiến công: Quân đoàn 1 hướng Bắc, Quân đoàn 3 hướng Tây Bắc, Đoàn 232 hướng Tây và Tây Nam, Quân đoàn 4 hướng Đông, Quân đoàn 2 hướng Đông Nam. Chiều 28/4, Phi đội Quyết Thắng dùng 5 máy bay A-37 thu được ném bom sân bay Tân Sơn Nhất.\n\n10 giờ 45 ngày 30/4, xe tăng 843 húc nghiêng cổng phụ, xe tăng 390 húc tung cổng chính Dinh Độc Lập; 11 giờ 30, Đại đội trưởng Bùi Quang Thận cắm cờ Mặt trận Dân tộc Giải phóng trên nóc Dinh. Tổng thống Dương Văn Minh đầu hàng không điều kiện. Đến ngày 2/5/1975, các tỉnh đồng bằng sông Cửu Long và các đảo, quần đảo ở Biển Đông, trong đó có quần đảo Trường Sa, được hoàn toàn giải phóng.",
          meaning: "Kết thúc thắng lợi 21 năm kháng chiến chống Mỹ, cứu nước – non sông thu về một mối.",
          refs: ["Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ Giáo dục và Đào tạo, 2021), Chương 2, trang 231 – 234", "Văn Tiến Dũng, Đại thắng mùa Xuân, Nhà xuất bản Quân đội nhân dân, 1977"],
          title: "Chiến dịch Hồ Chí Minh",
          text: "17 giờ 26/4, năm cánh quân đồng loạt tiến công Sài Gòn. Trưa 30/4, xe tăng 390 húc đổ cổng chính Dinh Độc Lập, cờ Mặt trận tung bay trên nóc Dinh; Dương Văn Minh đầu hàng không điều kiện. Đến 2/5/1975, các tỉnh còn lại và quần đảo Trường Sa được giải phóng.",
          place: "saigon", from: "rutngan", liberate: "all",
          module: { type: "gate", hit: "10:45", time: "11:30" }
        }
      ],
      artifacts: [
        {
          img: "assets/images/artifacts/gd5-phao-m107.jpg",
          title: "Pháo tự hành 175mm M107 – “Vua chiến trường”",
          where: "Sân trưng bày hiện vật hạng nặng ngoài trời",
          text: "Tầm bắn hơn 34 km; năm 1975 bị ta thu nguyên vẹn hàng chục khẩu và quay nòng đánh lại chính đối phương.",
          detail: "Pháo tự hành M107 cỡ nòng 175mm là hỏa lực pháo binh tầm xa hiện đại nhất mà quân đội Mỹ trang bị cho chiến trường miền Nam: tầm bắn hơn 34 km, nặng gần 28 tấn, từng được mệnh danh là “Vua chiến trường”.\n\nTrong cuộc Tổng tiến công mùa Xuân 1975, hàng chục khẩu M107 bị quân ta thu nguyên vẹn tại Tây Nguyên, Huế, Đà Nẵng và Đồng Dù. Bộ đội pháo binh nhanh chóng làm chủ kỹ thuật, quay nòng pháo đánh vào chính các căn cứ đối phương trong Chiến dịch Hồ Chí Minh.",
          source: null
        },
        {
          img: "assets/images/artifacts/gd5-xe-tang-390.jpg",
          title: "Xe tăng 390 – biểu tượng ngày toàn thắng",
          where: "Phiên bản 1:1 tại Hội trường Thống Nhất (Dinh Độc Lập); bản gốc là Bảo vật Quốc gia tại Bảo tàng Tăng thiết giáp (Hà Nội)",
          text: "10 giờ 45 ngày 30/4/1975 húc đổ cổng chính Dinh Độc Lập, mở toang sào huyệt cuối cùng của chính quyền Sài Gòn.",
          detail: "Xe tăng T-59 số hiệu 390 (Đại đội 4, Tiểu đoàn 1, Lữ đoàn Tăng thiết giáp 203, Quân đoàn 2) do Chính trị viên Vũ Đăng Toàn chỉ huy, kíp lái gồm Nguyễn Văn Tập, Ngô Sĩ Nguyên và Lê Văn Phượng.\n\nĐúng 10 giờ 45 ngày 30/4/1975, xe tăng 390 húc đổ cổng chính Dinh Độc Lập. Khoảnh khắc này trở thành biểu tượng của ngày non sông thu về một mối.",
          source: null
        },
        {
          img: "assets/images/artifacts/gd5-m48-ch47.jpg",
          title: "Xe tăng M48 Patton & trực thăng CH-47 Chinook",
          where: "Sân trưng bày phương tiện chiến tranh ngoài trời",
          text: "“Lá chắn thép” của “Việt Nam hóa chiến tranh” – tan vỡ trước đòn hiệp đồng thần tốc mùa Xuân 1975.",
          detail: "M48 Patton là dòng xe tăng chiến đấu chủ lực của Mỹ tại Việt Nam, nặng gần 50 tấn, giáp đúc dày và pháo 90mm, từng được coi là “lá chắn thép” bảo vệ Sài Gòn trong “Việt Nam hóa chiến tranh”. Bên cạnh là trực thăng vận tải CH-47 Chinook dùng để cơ động binh lính và pháo binh.\n\nTrước đòn hiệp đồng thần tốc mùa Xuân 1975, các thiết đoàn M48 của quân đội Sài Gòn tan vỡ, bỏ lại hàng trăm xe trên khắp các chiến trường.",
          source: null
        },
        {
          img: "assets/images/artifacts/gd5-bom-blu82.jpg",
          title: "Bom BLU-82 “Daisy Cutter”",
          where: "Khu trưng bày vũ khí bom đạn ngoài trời",
          text: "Gần 7 tấn, được ném xuống Xuân Lộc (4/1975) hòng chặn bước tiến của Quân Giải phóng – nhưng không cứu nổi “cánh cửa thép”.",
          detail: "Vỏ quả bom BLU-82 “Daisy Cutter” nặng khoảng 15.000 pound (gần 7 tấn), có sức hủy diệt trên bán kính hàng trăm mét.\n\nTrong trận tử thủ tuyệt vọng ở Xuân Lộc (tháng 4/1975), quân đội Sài Gòn đã ném loại bom này hòng chặn bước tiến của Quân Giải phóng – nhưng “cánh cửa thép” vẫn bị chọc thủng sau 12 ngày đêm.",
          source: {
            author: "Peter van der Sluijs",
            site: "Wikimedia Commons",
            url: "https://commons.wikimedia.org/wiki/File:Vietnam_war_museum_Ho_Chinh_Vietnamwar_City_bombs.jpg",
            license: "CC BY-SA 3.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
            changes: "đã thu nhỏ kích thước"
          }
        }
      ],
      takeaway: "Bạo lực cách mạng (Nghị quyết Trung ương 21) + chớp thời cơ (2 năm → 55 ngày đêm) → 30/4/1975 non sông thu về một mối."
    }
  ],

  finale: {
    reasons: [
      "Sự lãnh đạo đúng đắn của Đảng",
      "Lòng yêu nước & đại đoàn kết toàn dân tộc",
      "Hậu phương miền Bắc vững chắc",
      "Đoàn kết & ủng hộ quốc tế"
    ]
  }
};
