// Dữ liệu học liệu 5 giai đoạn lịch sử kháng chiến chống Mỹ (1954 - 1975)
// Thiết kế phục vụ hiển thị dạng slide tương tác và kho tư liệu bảo tàng

const historicalStages = [
  {
    id: 1,
    period: "1954 - 1960",
    shortTitle: "Giữ gìn lực lượng & Đồng Khởi",
    title: "Xây dựng CNXH ở miền Bắc và đấu tranh giữ gìn lực lượng ở miền Nam (1954 - 1960)",
    assignee: "Bảo",
    context: [
      "Sau Hiệp định Giơ-ne-vơ 1954, đất nước tạm thời chia làm hai miền tại vĩ tuyến 17.",
      "Miền Bắc hoàn toàn giải phóng, bắt tay vào khôi phục kinh tế và cải tạo xã hội chủ nghĩa.",
      "Ở miền Nam, đế quốc Mỹ hậu thuẫn chính quyền Ngô Đình Diệm thi hành chính sách đàn áp, ban hành đạo luật 10/59 hòng dập tắt phong trào yêu nước."
    ],
    partyGuidelines: [
      "Nghị quyết Trung ương 15 (1/1959): Xác định con đường giải phóng miền Nam là khởi nghĩa vũ trang giành chính quyền về tay nhân dân, kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
      "Đại hội đại biểu toàn quốc lần thứ III của Đảng (9/1960): Đề ra đường lối tiến hành đồng thời hai chiến lược cách mạng: miền Bắc giữ vai trò quyết định nhất, miền Nam giữ vai trò quyết định trực tiếp."
    ],
    practicalValues: [
      "Phong trào Đồng Khởi (cuối năm 1959 - 1960) bùng nổ từ Bến Tre, lan rộng khắp Nam Bộ và Tây Nguyên, làm tan rã bộ máy kìm kẹp của địch ở cơ sở.",
      "Chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.",
      "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam thành lập ngày 20/12/1960, tập hợp rộng rãi các tầng lớp nhân dân kháng chiến."
    ],
    museumArtifacts: [
      {
        id: "art-1",
        name: "Máy chém theo Luật 10/59",
        area: "Khu tội ác chiến tranh - Sân bảo tàng",
        desc: "Hiện vật tố cáo chính sách khủng bố dã man của chính quyền tay sai đối với cán bộ và nhân dân yêu nước.",
        image: "assets/images/placeholders/stage1_guillotine.svg"
      },
      {
        id: "art-2",
        name: "Tư liệu phong trào Đồng Khởi Bến Tre",
        area: "Phòng trưng bày Kháng chiến chống Mỹ",
        desc: "Hình ảnh ngọn cờ khởi nghĩa và phong trào Đội quân tóc dài dưới sự lãnh đạo của bà Nguyễn Thị Định.",
        image: "assets/images/placeholders/stage1_dongkhoi.svg"
      }
    ],
    keyNotes: [
      "Hội nghị TW 15 (1959) mở lối cho phong trào vũ trang cách mạng miền Nam.",
      "Đồng Khởi 1960 chuyển cách mạng miền Nam sang thế tiến công.",
      "Đại hội III xác định rõ vai trò cách mạng của hai miền Nam - Bắc."
    ]
  },
  {
    id: 2,
    period: "1961 - 1965",
    shortTitle: "Đánh bại Chiến tranh đặc biệt",
    title: "Đánh bại chiến lược 'Chiến tranh đặc biệt' của đế quốc Mỹ (1961 - 1965)",
    assignee: "Phong",
    context: [
      "Mỹ áp dụng chiến lược 'Chiến tranh đặc biệt', kết hợp quân đội Sài Gòn với vũ khí và cố vấn chỉ huy Mỹ.",
      "Địch triển khai quốc sách dồn dân lập 'Ấp chiến lược' nhằm cô lập lực lượng cách mạng khỏi nhân dân.",
      "Quân đội Mỹ trang bị các chiến thuật cơ động mới như 'trực thăng vận' và 'thiết xa vận'."
    ],
    partyGuidelines: [
      "Trung ương Đảng chủ trương kết hợp chặt chẽ đấu tranh chính trị với đấu tranh quân sự.",
      "Chỉ đạo tác chiến toàn diện trên 3 vùng chiến lược: rừng núi, nông thôn đồng bằng và đô thị.",
      "Đẩy mạnh thế trận đánh địch bằng 'ba mũi giáp công': quân sự, chính trị và binh vận."
    ],
    practicalValues: [
      "Phong trào phá ấp chiến lược diễn ra sôi nổi, biến ấp chiến lược thành làng chiến đấu kiên cố.",
      "Chiến thắng Ấp Bắc (1/1963) khẳng định khả năng đánh bại chiến thuật cơ động tối tân của đối phương.",
      "Các chiến dịch Bình Giã, Ba Gia, Đồng Xoài (1964 - 1965) làm sụp đổ hoàn toàn chiến lược 'Chiến tranh đặc biệt'."
    ],
    museumArtifacts: [
      {
        id: "art-3",
        name: "Hàng rào kẽm gai & Mô hình Ấp chiến lược",
        area: "Khu trưng bày Tội ác xâm lược",
        desc: "Mô hình và kỷ vật phản ánh nỗ lực dồn dân vào trại quản thúc và sự quật khởi phá ấp của người dân.",
        image: "assets/images/placeholders/stage2_apchienluoc.svg"
      },
      {
        id: "art-4",
        name: "Xác máy bay trực thăng UH-1 & Xe M113",
        area: "Sân trưng bày hiện vật ngoài trời",
        desc: "Phương tiện tác chiến tiêu biểu cho chiến thuật trực thăng vận và thiết xa vận bị quân ta khắc chế.",
        image: "assets/images/placeholders/stage2_apbac.svg"
      }
    ],
    keyNotes: [
      "Công thức: Quân đội Sài Gòn + Cố vấn/vũ khí Mỹ + Ấp chiến lược.",
      "Phương châm: 3 vùng chiến lược, 3 mũi giáp công.",
      "Chiến thắng Ấp Bắc 1963 đánh dấu bước ngoặt đánh bại chiến thuật mới của Mỹ."
    ]
  },
  {
    id: 3,
    period: "1965 - 1968",
    shortTitle: "Đánh bại Chiến tranh cục bộ",
    title: "Đánh bại chiến lược 'Chiến tranh cục bộ' và đòn Tổng tiến công Mậu Thân 1968",
    assignee: "Văn An",
    context: [
      "Mỹ trực tiếp đưa ồ ạt quân viễn chinh Mỹ và quân đồng minh vào chiến trường miền Nam.",
      "Mở rộng chiến tranh leo thang ném bom phá hoại miền Bắc bằng hải quân và không quân.",
      "Mỹ tiến hành các cuộc phản công mùa khô với chiến lược 'tìm và diệt' kết hợp 'bình định'."
    ],
    partyGuidelines: [
      "Hội nghị Trung ương 11 và 12 (1965): Quyết tâm động viên sức người, sức của cả nước đánh thắng giặc Mỹ xâm lược.",
      "Khẳng định miền Bắc là hậu phương lớn, miền Nam là tiền tuyến lớn, giữ vững quyền chủ động chiến lược.",
      "Nghị quyết Trung ương 14 (1/1968): Quyết định mở cuộc Tổng tiến công và nổi dậy đồng loạt trên chiến trường miền Nam, trọng tâm là các đô thị."
    ],
    practicalValues: [
      "Chiến thắng Núi Thành, Vạn Tường (1965) mở ra phong trào thi đua đánh đuổi quân viễn chinh Mỹ.",
      "Đập tan hai cuộc phản công chiến lược mùa khô (1965 - 1966 và 1966 - 1967).",
      "Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968 giáng đòn bất ngờ vào đầu não đối phương, làm lung lay ý chí xâm lược của chính giới Mỹ, buộc Mỹ chấm dứt ném bom miền Bắc và chấp nhận đàm phán tại Paris."
    ],
    museumArtifacts: [
      {
        id: "art-5",
        name: "Bộ sưu tập bom đạn & Bom Napalm",
        area: "Phòng trưng bày Tội ác chiến tranh",
        desc: "Hiện vật bom chùm, bom cháy gây thương vong lớn đối với dân thường, minh chứng mức độ tàn phá của cuộc chiến.",
        image: "assets/images/placeholders/stage3_napalm_bomb.svg"
      },
      {
        id: "art-6",
        name: "Tư liệu Tổng tiến công Tết Mậu Thân 1968",
        area: "Phòng phóng sự ảnh tư liệu quốc tế",
        desc: "Loạt phóng sự ảnh về cuộc đột kích vào Tòa Đại sứ Mỹ, Dinh Độc Lập và các mục tiêu quân sự đô thị.",
        image: "assets/images/placeholders/stage3_mauthan.svg"
      }
    ],
    keyNotes: [
      "Chiến tranh cục bộ đưa quân viễn chinh Mỹ trực tiếp tham chiến trên bộ.",
      "Chiến thắng Vạn Tường khẳng định bộ đội ta đủ sức đánh thắng quân Mỹ.",
      "Tết Mậu Thân 1968 làm sụp đổ chiến lược Chiến tranh cục bộ và mở ra cục diện đàm phán."
    ]
  },
  {
    id: 4,
    period: "1969 - 1973",
    shortTitle: "Đánh bại Việt Nam hóa chiến tranh",
    title: "Đánh bại chiến lược 'Việt Nam hóa chiến tranh' và ký kết Hiệp định Paris (1969 - 1973)",
    assignee: "Xuân An",
    context: [
      "Mỹ rút dần quân viễn chinh để giảm thương vong, chuyển gánh nặng quân sự sang quân đội Sài Gòn.",
      "Thực hiện thủ đoạn 'dùng người Việt đánh người Việt' và mở rộng chiến tranh sang Lào và Campuchia.",
      "Tăng cường ném bom rải thảm bằng pháo đài bay B-52 nhằm gây sức ép trên bàn đàm phán."
    ],
    partyGuidelines: [
      "Biến quyết tâm thiêng liêng thành hành động, kiên trì kháng chiến trên cả nước.",
      "Chỉ đạo nghệ thuật kết hợp chặt chẽ ba mặt trận: Quân sự, Chính trị và Ngoại giao.",
      "Chủ trương vừa đánh vừa đàm, củng cố liên minh đoàn kết chiến đấu 3 nước Đông Dương."
    ],
    practicalValues: [
      "Chiến thắng Đường 9 - Nam Lào (1971) đánh bại thử nghiệm lớn của học thuyết Nixon.",
      "Chiến dịch tiến công chiến lược năm 1972 giải phóng nhiều địa bàn then chốt.",
      "Chiến thắng 12 ngày đêm Điện Biên Phủ trên không (12/1972) đập tan uy thế của không lực Mỹ tại Hà Nội và Hải Phòng.",
      "Buộc Mỹ phải ký Hiệp định Paris (27/1/1973), rút toàn bộ quân đội về nước, hoàn thành bước 'Đánh cho Mỹ cút'."
    ],
    museumArtifacts: [
      {
        id: "art-7",
        name: "Chứng tích Dioxin & Mảnh vỡ pháo đài bay B-52",
        area: "Phòng Hậu quả chất độc da cam & Sân bảo tàng",
        desc: "Hiện vật ghi dấu nỗi đau hóa chất diệt cỏ rải thảm và mảnh xác phi cơ ném bom chiến lược bị bắn rơi.",
        image: "assets/images/placeholders/stage4_dacam.svg"
      },
      {
        id: "art-8",
        name: "Tư liệu về lễ ký kết Hiệp định Paris 1973",
        area: "Phòng Hòa bình và đoàn kết quốc tế",
        desc: "Hình ảnh và văn bản ngoại giao khẳng định cam kết tôn trọng độc lập, chủ quyền của Việt Nam.",
        image: "assets/images/placeholders/stage4_paris.svg"
      }
    ],
    keyNotes: [
      "Việt Nam hóa chiến tranh là âm mưu giảm thương vong quân Mỹ bằng hỏa lực tối tân.",
      "Nghệ thuật kết hợp tài tình giữa quân sự, chính trị và ngoại giao.",
      "Điện Biên Phủ trên không và Hiệp định Paris 1973 buộc quân Mỹ rút sạch về nước."
    ]
  },
  {
    id: 5,
    period: "1973 - 1975",
    shortTitle: "Đại thắng mùa Xuân 1975",
    title: "Tạo thời cơ và mở Cuộc Tổng tiến công mùa Xuân 1975 giải phóng miền Nam",
    assignee: "Tấn",
    context: [
      "Quân viễn chinh Mỹ rút về nước, so sánh lực lượng trên chiến trường thay đổi căn bản có lợi cho cách mạng.",
      "Chính quyền đối phương vi phạm hiệp định, tiếp tục lấn chiếm lãnh thổ.",
      "Miền Bắc tăng cường xây dựng và chi viện thần tốc sức người, sức của qua tuyến đường Trường Sơn huyền thoại."
    ],
    partyGuidelines: [
      "Hội nghị Trung ương 21 (7/1973): Khẳng định cách mạng miền Nam tiếp tục con đường bạo lực cách mạng, kiên quyết phản công và tiến công.",
      "Hội nghị Bộ Chính trị (cuối 1974 - đầu 1975): Đề ra kế hoạch giải phóng hoàn toàn miền Nam trong hai năm 1975 - 1976, đồng thời sẵn sàng giải phóng ngay trong năm 1975 khi thời cơ chiến lược xuất hiện."
    ],
    practicalValues: [
      "Chiến thắng Phước Long (1/1975) chứng minh thế và lực đã chín muồi cho đòn quyết định.",
      "Chiến dịch Tây Nguyên (tháng 3/1975) mở đầu thắng lợi với đòn đánh hiểm Buôn Ma Thuột.",
      "Chiến dịch Huế - Đà Nẵng giải phóng toàn bộ dải duyên hải miền Trung.",
      "Chiến dịch Hồ Chí Minh lịch sử (26/4 - 30/4/1975): 5 cánh quân tiến công thần tốc, 11h30 trưa 30/4 giải phóng Sài Gòn, đất nước thống nhất trọn vẹn."
    ],
    museumArtifacts: [
      {
        id: "art-9",
        name: "Xe tăng T-54 & Đại bác chiến lợi phẩm",
        area: "Sân trưng bày hiện vật hạng nặng ngoài trời",
        desc: "Xe tăng biểu trưng cho mũi đột kích dũng mãnh húc tung cánh cổng Dinh Độc Lập trưa ngày 30/4/1975.",
        image: "assets/images/placeholders/stage5_xetang.svg"
      },
      {
        id: "art-10",
        name: "Tư liệu Ngày toàn thắng & Cờ Mặt trận",
        area: "Phòng trưng bày Thắng lợi lịch sử",
        desc: "Khoảnh khắc lá cờ cách mạng tung bay trên nóc Dinh Độc Lập, đánh dấu non sông thu về một mối.",
        image: "assets/images/placeholders/stage5_chienthang.svg"
      }
    ],
    keyNotes: [
      "Nghị quyết 21 (1973) định hướng phản công và tiến công kiên quyết.",
      "Nghệ thuật chớp thời cơ chiến lược giải phóng miền Nam trong mùa khô 1975.",
      "Ba chiến dịch thần tốc đỉnh cao là Chiến dịch Hồ Chí Minh kết thúc toàn thắng 30/4/1975."
    ]
  }
];

// Dữ liệu tổng kết toàn diện (Quang phụ trách)
const summaryContent = {
  title: "Tổng kết: Bản lĩnh lãnh đạo của Đảng và Thắng lợi vĩ đại 1954 - 1975",
  editor: "Quang",
  keyTakeaways: [
    {
      heading: "Đường lối chiến lược độc lập, tự chủ và sáng tạo",
      body: "Đảng ta đã giương cao đồng thời hai ngọn cờ: Độc lập dân tộc và Chủ nghĩa xã hội, phát huy sức mạnh hậu phương miền Bắc vững mạnh với tiền tuyến miền Nam anh dũng."
    },
    {
      heading: "Sức mạnh đại đoàn kết toàn dân tộc",
      body: "Quy tụ mọi tầng lớp nhân dân, kết hợp sức mạnh quân sự, chính trị và ngoại giao tạo nên thế trận chiến tranh nhân dân rộng khắp, đánh bại mọi chiến lược của đối phương."
    },
    {
      heading: "Ý nghĩa lịch sử trường tồn",
      body: "Chấm dứt hơn một thế kỷ thống trị của chủ nghĩa thực dân, mở ra kỷ nguyên độc lập thống nhất và cả nước vững bước tiến lên Chủ nghĩa xã hội."
    },
    {
      heading: "Bài học kinh nghiệm quý báu cho hiện tại",
      body: "Kiên định mục tiêu độc lập dân tộc gắn liền với CNXH; củng cố niềm tin của nhân dân; kết hợp hài hòa sức mạnh dân tộc với thời đại trong sự nghiệp Đổi mới."
    }
  ],
  museumReflection: {
    title: "Góc nhìn từ Bảo tàng Chứng tích Chiến tranh",
    body: "Từng mảnh bom đạn, máy chém, xác phi cơ và hình ảnh nạn nhân chất độc da cam tại số 28 Võ Văn Tần không chỉ là bằng chứng về tội ác chiến tranh tàn khốc, mà còn là minh chứng sống động cho cái giá đắt của hòa bình và ý chí quật cường của một dân tộc dưới sự soi đường của Đảng quang vinh."
  }
};

// Dữ liệu nhóm thực hiện đề tài
const teamMembers = [
  { name: "Trường", photo: "truong.jpeg", role: "Nhóm trưởng", task: "Điều phối tiến độ và tổng hợp báo cáo." },
  { name: "Bảo", photo: "bao.jpg", role: "Nội dung giai đoạn 1", task: "Nghiên cứu giai đoạn 1954–1960 và phong trào Đồng Khởi." },
  { name: "Phong", photo: "phong.jpg", role: "Nội dung giai đoạn 2", task: "Nghiên cứu giai đoạn 1961–1965 và chiến lược Chiến tranh đặc biệt." },
  { name: "Văn An", photo: "van.jpg", role: "Nội dung giai đoạn 3", task: "Nghiên cứu giai đoạn 1965–1968 và Tết Mậu Thân." },
  { name: "Xuân An", photo: "xan.jpg", role: "Nội dung giai đoạn 4", task: "Nghiên cứu giai đoạn 1969–1973 và Hiệp định Paris." },
  { name: "Tấn", photo: "tan.jpg", role: "Nội dung giai đoạn 5", task: "Nghiên cứu giai đoạn 1973–1975 và Chiến dịch Hồ Chí Minh." },
  { name: "Quang", photo: "quang.jpg", role: "Tổng kết và hiệu đính", task: "Biên soạn bài tổng kết và bộ câu hỏi ôn tập." },
  { name: "Giang", photo: "giang.jpg", role: "Giao diện và dòng thời gian", task: "Xây dựng giao diện chung và slide thuyết trình tương tác." },
  { name: "Quý", photo: "quy.jpg", role: "Kho tư liệu", task: "Xây dựng bộ lọc và giao diện xem chi tiết hiện vật trên các thiết bị." },
  { name: "Minh", photo: "minh.jpg", role: "Đố vui và trang nhóm", task: "Lập trình phần trắc nghiệm và xây dựng trang nhóm tác giả, cảm nghĩ tập thể." }
];
