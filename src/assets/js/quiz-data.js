// Dữ liệu ngân hàng câu hỏi đố vui ôn tập Lịch sử Đảng (1954 - 1975)
// Biên soạn bởi Quang - Phục vụ chức năng Interactive Quiz trên web

const quizData = [
  {
    id: 1,
    stage: "1954 - 1960",
    question: "Nghị quyết nào của Trung ương Đảng (khóa II) đã xác định con đường cơ bản của cách mạng miền Nam là dùng bạo lực cách mạng?",
    options: [
      "Hội nghị Trung ương 6 (7/1954)",
      "Hội nghị Trung ương 15 (1/1959)",
      "Hội nghị Trung ương 8 (8/1955)",
      "Đại hội đại biểu toàn quốc lần III (9/1960)"
    ],
    answer: 1,
    explanation: "Nghị quyết Hội nghị Trung ương 15 (tháng 1/1959) đã chỉ rõ con đường bạo lực cách mạng, khởi nghĩa vũ trang kết hợp đấu tranh chính trị, dẫn đến cao trào Đồng Khởi."
  },
  {
    id: 2,
    stage: "1954 - 1960",
    question: "Theo đường lối Đại hội III của Đảng (9/1960), cách mạng xã hội chủ nghĩa ở miền Bắc giữ vai trò gì?",
    options: [
      "Quyết định trực tiếp",
      "Hỗ trợ tiền phương",
      "Quyết định nhất",
      "Tiên phong tạm thời"
    ],
    answer: 2,
    explanation: "Đại hội III khẳng định miền Bắc là hậu phương chiến lược chung, giữ vai trò quyết định nhất đối với sự phát triển của toàn bộ cách mạng Việt Nam."
  },
  {
    id: 3,
    stage: "1961 - 1965",
    question: "Yếu tố được coi là 'xương sống' trong chiến lược 'Chiến tranh đặc biệt' của Mỹ ở miền Nam là gì?",
    options: [
      "Hàng rào điện tử McNamara",
      "Quốc sách lập 'Ấp chiến lược'",
      "Các căn cứ quân sự liên hợp duyên hải",
      "Chiến dịch rải chất độc da cam"
    ],
    answer: 1,
    explanation: "Ấp chiến lược là quốc sách hàng đầu của Mỹ - Diệm nhằm dồn dân, gom quân và cô lập lực lượng cách mạng khỏi quần chúng nhân dân."
  },
  {
    id: 4,
    stage: "1961 - 1965",
    question: "Chiến thắng quân sự nào đầu năm 1963 đã mở đầu cho sự sụp đổ của chiến thuật 'trực thăng vận' và 'thiết xa vận'?",
    options: [
      "Chiến thắng Ấp Bắc",
      "Chiến thắng Bình Giã",
      "Chiến thắng Ba Gia",
      "Chiến thắng Đồng Xoài"
    ],
    answer: 0,
    explanation: "Chiến thắng Ấp Bắc (2/1/1963) là mốc son chứng minh quân và dân ta hoàn toàn có thể khắc chế các phương tiện vũ khí cơ động tối tân của đối phương."
  },
  {
    id: 5,
    stage: "1965 - 1968",
    question: "Đặc điểm nhận diện rõ nhất của chiến lược 'Chiến tranh cục bộ' so với giai đoạn trước là gì?",
    options: [
      "Chỉ tiến hành trên không phận miền Bắc",
      "Đưa trực tiếp quân đội viễn chinh Mỹ ồ ạt vào tham chiến trên bộ",
      "Rút hết cố vấn quân sự Mỹ về nước",
      "Chỉ sử dụng vũ khí công nghệ cao tầm xa"
    ],
    answer: 1,
    explanation: "Trong 'Chiến tranh cục bộ' (1965 - 1968), quân viễn chinh Mỹ và đồng minh trực tiếp nhảy vào tham chiến quy mô lớn tại chiến trường miền Nam."
  },
  {
    id: 6,
    stage: "1965 - 1968",
    question: "Sự kiện nào buộc chính quyền Mỹ phải tuyên bố ngừng ném bom miền Bắc và chấp thuận ngồi vào bàn đàm phán Paris?",
    options: [
      "Chiến thắng Núi Thành (1965)",
      "Trận Vạn Tường (1965)",
      "Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968",
      "Chiến dịch Đường 9 - Khe Sanh"
    ],
    answer: 2,
    explanation: "Đòn tiến công Tết Mậu Thân 1968 giáng đòn quyết định vào ý chí xâm lược của đối phương, làm phá sản hoàn toàn chiến lược Chiến tranh cục bộ."
  },
  {
    id: 7,
    stage: "1969 - 1973",
    question: "Bản chất của chiến lược 'Việt Nam hóa chiến tranh' của Mỹ là gì?",
    options: [
      "Tăng cường tối đa quân viễn chinh Mỹ",
      "Dùng người Việt đánh người Việt, giảm thiểu thương vong lính Mỹ",
      "Đưa chiến tranh hạt nhân vào thử nghiệm",
      "Chuyển toàn bộ quyền lực cho Liên Hợp Quốc"
    ],
    answer: 1,
    explanation: "Học thuyết Nixon rút dần quân bộ chiến Mỹ về nước nhưng cung cấp tiền bạc và hỏa lực tối tân để quân đội Sài Gòn làm lá chắn thay lính Mỹ."
  },
  {
    id: 8,
    stage: "1969 - 1973",
    question: "Chiến thắng 'Hà Nội - Điện Biên Phủ trên không' đã đập tan cuộc tập kích chiến lược bằng loại máy bay nào của Mỹ?",
    options: [
      "Tiêm kích F-4 Phantom",
      "Trực thăng AH-1 Cobra",
      "Pháo đài bay chiến lược B-52",
      "Cường kích A-37 Dragonfly"
    ],
    answer: 2,
    explanation: "12 ngày đêm cuối năm 1972, lực lượng phòng không - không quân ta đã đánh bại chiến dịch ném bom rải thảm bằng pháo đài bay B-52 trên bầu trời miền Bắc."
  },
  {
    id: 9,
    stage: "1969 - 1973",
    question: "Hiệp định Paris được ký kết ngày 27/01/1973 đã hoàn thành mục tiêu chiến lược nào của cách mạng Việt Nam?",
    options: [
      "Đánh cho Mỹ cút",
      "Đánh cho ngụy nhào",
      "Giải phóng hoàn toàn biên giới Tây Nam",
      "Hoàn thành hiện đại hóa quân đội"
    ],
    answer: 0,
    explanation: "Hiệp định Paris buộc quân đội Mỹ phải rút hoàn toàn khỏi lãnh thổ Việt Nam, thực hiện trọn vẹn lời căn dặn bước đầu 'Đánh cho Mỹ cút'."
  },
  {
    id: 10,
    stage: "1973 - 1975",
    question: "Hội nghị Ban Chấp hành Trung ương nào đã khẳng định con đường cách mạng miền Nam sau năm 1973 vẫn là bạo lực cách mạng?",
    options: [
      "Hội nghị Trung ương 19",
      "Hội nghị Trung ương 21 (7/1973)",
      "Hội nghị Trung ương 23",
      "Đại hội Đảng toàn quốc lần thứ IV"
    ],
    answer: 1,
    explanation: "Nghị quyết Hội nghị Trung ương 21 (tháng 7/1973) nêu rõ trong mọi tình huống con đường cách mạng miền Nam vẫn là con đường bạo lực cách mạng phản công và tiến công."
  },
  {
    id: 11,
    stage: "1973 - 1975",
    question: "Chiến thắng nào vào tháng 1/1975 được coi là 'đòn trinh sát chiến lược', khẳng định khả năng giải phóng hoàn toàn miền Nam?",
    options: [
      "Chiến thắng Đường 14 - Phước Long",
      "Chiến thắng Buôn Ma Thuột",
      "Chiến thắng Pleiku",
      "Chiến thắng Xuân Lộc"
    ],
    answer: 0,
    explanation: "Chiến thắng Phước Long đã thăm dò được sự bất lực can thiệp lại của Mỹ và sự tan rã của đối phương, tạo tiền đề để Bộ Chính trị chớp thời cơ giải phóng trong năm 1975."
  },
  {
    id: 12,
    stage: "1973 - 1975",
    question: "Chiến dịch quyết định cuối cùng mang tên ai đã kết thúc toàn thắng cuộc kháng chiến chống Mỹ cứu nước ngày 30/4/1975?",
    options: [
      "Chiến dịch Điện Biên Phủ",
      "Chiến dịch Tây Nguyên",
      "Chiến dịch Huế - Đà Nẵng",
      "Chiến dịch Hồ Chí Minh"
    ],
    answer: 3,
    explanation: "Chiến dịch Hồ Chí Minh lịch sử diễn ra từ 26/4 đến trưa 30/4/1975 với khí thế thần tốc đã giải phóng Sài Gòn - Gia Định, thống nhất đất nước trọn vẹn."
  }
];
