// Dữ liệu Kho tư liệu (tab "Kho tư liệu Bảo tàng"): 5 giai đoạn, mỗi giai đoạn có danh sách hiện vật (museumArtifacts).
// - featured: true  → thẻ nổi bật, chiếm trọn một hàng.
// - images[].source: "internet" | "sinhvien" → nội dung hiển thị ở "Nguồn ảnh" (Internet / Ảnh nhóm sinh viên chụp).
// - images[].credit: tác giả, trang gốc, giấy phép; KHÔNG hiển thị, giữ lại để ghi nguồn đầy đủ khi cần (vd ảnh CC BY-SA).
const historicalStages = [
  {
    id: 1,
    period: "1954 - 1960",
    museumArtifacts: [
      {
        id: "gd1-may-chem",
        name: "Máy chém thời Ngô Đình Diệm (gắn với Đạo luật 10/59)",
        area: "Khu trưng bày về hệ thống nhà tù và chuồng cọp / “Tội ác chiến tranh”",
        desc: "Máy chém tại bảo tàng là chứng tích về chính sách trấn áp và hành hình trong thời kỳ chiến tranh; theo tư liệu lịch sử, chính quyền Diệm cho đem máy chém đi các tỉnh để uy hiếp tinh thần quần chúng.",
        detail: "Máy chém tại bảo tàng là chứng tích về chính sách trấn áp và hành hình trong thời kỳ chiến tranh; theo tư liệu lịch sử, chính quyền Diệm cho đem máy chém đi các tỉnh để uy hiếp tinh thần quần chúng. Hiện vật phản ánh một khía cạnh của chính sách đàn áp dưới chế độ Ngô Đình Diệm (bản thân hiện vật không cho biết cụ thể số người đã bị hành quyết bằng chính chiếc máy này). Hiện vật là bằng chứng về bối cảnh lịch sử dẫn đến việc Đảng chuyển hướng phương pháp cách mạng ở miền Nam năm 1959, chứ không tự nó chứng minh tính đúng đắn của Nghị quyết 15.",
        image: "assets/images/artifacts/gd1-may-chem.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd1-may-chem.jpg",
            source: "sinhvien",
            w: 719,
            h: 961,
            credit: null
          }
        ]
      },
      {
        id: "gd1-dong-khoi",
        name: "Tư liệu, tranh ảnh về phong trào Đồng Khởi Bến Tre và Đội quân tóc dài",
        area: "Khu trưng bày tư liệu về các giai đoạn kháng chiến",
        desc: "Tư liệu ghi lại cảnh quần chúng nổi dậy, hình ảnh lực lượng phụ nữ xuống đường đấu tranh.",
        detail: "Tư liệu ghi lại cảnh quần chúng nổi dậy, hình ảnh lực lượng phụ nữ xuống đường đấu tranh. Qua đó thấy sức mạnh của nhân dân khi được Đảng định hướng đúng đường lối, và vai trò của lực lượng chính trị quần chúng bên cạnh lực lượng vũ trang.",
        image: "assets/images/artifacts/gd1-dong-khoi.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd1-dong-khoi.jpg",
            source: "internet",
            w: 665,
            h: 485,
            credit: null
          }
        ]
      }
    ]
  },
  {
    id: 2,
    period: "1961 - 1965",
    museumArtifacts: [
      {
        id: "gd2-ap-chien-luoc",
        name: "Mô hình Ấp chiến lược",
        area: "Phòng tội ác chiến tranh xâm lược",
        desc: "Bức ảnh ghi lại hình ảnh hàng rào tre/nứa vót nhọn kết hợp bờ đất đắp cao — đây là cấu trúc phòng thủ điển hình của hệ thống ấp chiến lược mà Mỹ và chính quyền Sài Gòn triển khai rầm rộ theo kế hoạch Staley-Taylor (1961-1963), với mục tiêu lập tới 17.000 ấp trên toàn miền Nam.",
        detail: "Bức ảnh ghi lại hình ảnh hàng rào tre/nứa vót nhọn kết hợp bờ đất đắp cao — đây là cấu trúc phòng thủ điển hình của hệ thống ấp chiến lược mà Mỹ và chính quyền Sài Gòn triển khai rầm rộ theo kế hoạch Staley-Taylor (1961-1963), với mục tiêu lập tới 17.000 ấp trên toàn miền Nam. Ấp chiến lược được xây dựng nhằm cô lập nhân dân khỏi lực lượng cách mạng, biến làng xã thành nhà tù kiểm soát dân chúng. Tuy nhiên, dưới sự lãnh đạo của Đảng, quân và dân miền Nam đã kiên trì bám đất, bám làng, đứng lên phá bỏ từng hàng rào, giành lại quyền làm chủ. Đến cuối giai đoạn 1961-1965, “quốc sách” ấp chiến lược đã hoàn toàn thất bại — một trong ba trụ cột cốt lõi của chiến lược “Chiến tranh đặc biệt” bị đánh sập.",
        image: "assets/images/artifacts/gd2-ap-chien-luoc.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd2-ap-chien-luoc.jpg",
            source: "internet",
            w: 400,
            h: 354,
            credit: {
              author: "Quân đội Hoa Kỳ (US Army)",
              site: "Wikimedia Commons",
              url: "https://commons.wikimedia.org/wiki/File:Gvnhamlet.jpg",
              license: "Phạm vi công cộng",
              note: "in trong ấn phẩm số 7724 của Bộ Ngoại giao Hoa Kỳ, tháng 8/1964"
            }
          }
        ]
      },
      {
        id: "gd2-uh1-huey",
        featured: true,
        name: "Trực thăng UH-1 Huey",
        area: "Sân ngoài trời",
        desc: "Chiếc trực thăng Bell UH-1 Iroquois (thường được gọi là “Huey”), mang dòng chữ “UNITED STATES ARMY”, đang được trưng bày nguyên trạng tại sân ngoài trời Bảo tàng.",
        detail: "Chiếc trực thăng Bell UH-1 Iroquois (thường được gọi là “Huey”), mang dòng chữ “UNITED STATES ARMY”, đang được trưng bày nguyên trạng tại sân ngoài trời Bảo tàng. Đây là loại trực thăng chủ lực trong chiến thuật “trực thăng vận” — phương thức cơ động tốc độ cao mà quân đội Mỹ kỳ vọng sẽ tạo ra lợi thế quyết định. Phía trước thân máy bay vẫn còn nguyên cụm bệ phóng rocket, minh chứng cho hỏa lực tối tân mà địch triển khai. Trong Trận Ấp Bắc (2/1/1963), quân giải phóng đã bắn rơi nhiều trực thăng UH-1 khi địch huy động chúng để đổ bộ quân, chứng minh rằng ý chí và trí tuệ của chiến tranh nhân dân hoàn toàn có thể đánh bại ưu thế vũ khí tối tân của đế quốc.",
        image: "assets/images/artifacts/gd2-uh1-huey.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd2-uh1-huey.jpg",
            source: "sinhvien",
            w: 1425,
            h: 927,
            credit: null
          }
        ]
      }
    ]
  },
  {
    id: 3,
    period: "1965 - 1968",
    museumArtifacts: [
      {
        id: "gd3-nha-ga-nam-dinh",
        name: "Ảnh tư liệu “Nhà ga thành phố Nam Định bị ném bom”",
        area: "Bộ sưu tập Miền Bắc Việt Nam năm 1965, qua ảnh của Felix Greene trên website bảo tàng",
        desc: "Nhà ga Nam Định bị tàn phá và thành phố bị ném bom bốn lần trong khoảng tháng 7–9/1965.",
        detail: "Nhà ga Nam Định bị tàn phá và thành phố bị ném bom bốn lần trong khoảng tháng 7–9/1965. Ảnh cho thấy chiến tranh phá hoại tác động tới hạ tầng dân sự miền Bắc, làm rõ yêu cầu vừa bảo vệ hậu phương vừa duy trì chi viện cho miền Nam.",
        image: "assets/images/artifacts/gd3-nha-ga-nam-dinh.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd3-nha-ga-nam-dinh.jpg",
            source: "internet",
            w: 394,
            h: 259,
            credit: {
              author: "Felix Greene",
              site: "Website Bảo tàng Chứng tích Chiến tranh",
              url: "https://www.baotangchungtichchientranh.vn/vi"
            }
          }
        ]
      },
      {
        id: "gd3-a37b",
        name: "Máy bay A-37B",
        area: "Bộ sưu tập hiện vật Máy bay trên website bảo tàng",
        desc: "A-37B là máy bay cường kích phản lực hạng nhẹ; dòng A-37 được đưa tới miền Nam tham chiến từ tháng 8/1967.",
        detail: "A-37B là máy bay cường kích phản lực hạng nhẹ; dòng A-37 được đưa tới miền Nam tham chiến từ tháng 8/1967. Hiện vật minh họa phương tiện và hỏa lực không quân trong bối cảnh “Chiến tranh cục bộ”.",
        image: "assets/images/artifacts/gd3-a37.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd3-a37.jpg",
            source: "internet",
            w: 1280,
            h: 853,
            credit: {
              site: "Website Bảo tàng Chứng tích Chiến tranh, Bộ sưu tập Máy bay (Máy bay A-37B)",
              url: "https://www.baotangchungtichchientranh.vn/vi/kham-pha/bo-suu-tap/may-bay"
            }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    period: "1969 - 1973",
    museumArtifacts: [
      {
        id: "gd4-da-cam",
        name: "Góc trưng bày hình ảnh nạn nhân chịu hậu quả chất độc da cam / Dioxin",
        area: "Lầu 1 - Phòng 7 - Hậu quả chất độc da cam trong Chiến tranh xâm lược của Mỹ ở Việt Nam",
        desc: "Tại Bảo tàng, có một không gian trưng bày với điểm nhấn màu da cam mang tên “Hậu quả chất độc da cam trong chiến tranh xâm lược của Mỹ ở Việt Nam”.",
        detail: "Tại Bảo tàng, có một không gian trưng bày với điểm nhấn màu da cam mang tên “Hậu quả chất độc da cam trong chiến tranh xâm lược của Mỹ ở Việt Nam”. Khách tham quan sẽ được nhìn thấy hậu quả lên môi trường và sức khỏe con người qua nhiều thế hệ ở hai phía của cuộc chiến do chất da cam/dioxin gây ra. Hiện vật là một khoảng không gian nhỏ trong khu trưng bày, kể về sự hỗ trợ của gia đình và xã hội dành cho các nạn nhân da cam, sự đồng cảm và tương trợ của cộng đồng, “lá lành đùm lá rách”, mang bài học ý nghĩa về con người, các nạn nhân không phải đối tượng miệt thị hoặc xa lánh, họ còn là những con người có thể có năng lực, tài giỏi như bao người khác.",
        image: "assets/images/artifacts/gd4-da-cam.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd4-da-cam.jpg",
            source: "internet",
            w: 600,
            h: 369,
            credit: null
          }
        ]
      },
      {
        id: "gd4-ky-hiep-dinh-paris",
        name: "Ảnh tư liệu Bộ trưởng Ngoại giao Nguyễn Thị Bình đặt bút ký Hiệp định Paris (27-1-1973)",
        area: "Lầu 1 - Khu trưng bày chuyên đề “Nguyễn Thị Bình – Trí tuệ, Bản lĩnh và Nhân cách phụ nữ Việt Nam thời đại Hồ Chí Minh”, Bảo tàng Chứng tích Chiến tranh",
        desc: "Bức ảnh đen trắng ghi lại khoảnh khắc lịch sử ngày 27-1-1973 tại Paris: Bộ trưởng Ngoại giao Nguyễn Thị Bình trong tà áo dài truyền thống đang đặt bút ký Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam.",
        detail: "Bức ảnh đen trắng ghi lại khoảnh khắc lịch sử ngày 27-1-1973 tại Paris: Bộ trưởng Ngoại giao Nguyễn Thị Bình trong tà áo dài truyền thống đang đặt bút ký Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam. Trước mặt bà là tấm biển tên tiếng Pháp của Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam, xung quanh có các thành viên đoàn và quan chức lễ tân chứng kiến. Là người phụ nữ duy nhất trực tiếp ký Hiệp định, bà trở thành biểu tượng cho trí tuệ, bản lĩnh ngoại giao Việt Nam và tinh thần kiên định hòa bình trong thế trận “vừa đánh, vừa đàm” của Đảng. Tư liệu khẳng định thắng lợi buộc Mỹ rút hết quân viễn chinh, hoàn thành mục tiêu “đánh cho Mỹ cút”.",
        image: "assets/images/artifacts/gd4-ky-hiep-dinh-paris.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd4-ky-hiep-dinh-paris.jpg",
            source: "internet",
            w: 660,
            h: 434,
            credit: {
              author: "Thông tấn xã Việt Nam (TTXVN)",
              note: "theo dấu bản quyền in trên ảnh"
            }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    period: "1973 - 1975",
    museumArtifacts: [
      {
        id: "gd5-phao-m107",
        name: "Pháo tự hành 175mm M107 (mệnh danh “Vua chiến trường”)",
        area: "Sân trưng bày hiện vật hạng nặng ngoài trời, Bảo tàng Chứng tích Chiến tranh",
        desc: "Pháo tự hành M107 cỡ nòng 175mm là loại hỏa lực pháo binh tầm xa hiện đại nhất mà quân đội Mỹ trang bị cho chiến trường miền Nam.",
        detail: "Pháo tự hành M107 cỡ nòng 175mm là loại hỏa lực pháo binh tầm xa hiện đại nhất mà quân đội Mỹ trang bị cho chiến trường miền Nam. Với tầm bắn tối đa lên tới hơn 34 km, nặng gần 28 tấn, M107 từng được mệnh danh là “Vua chiến trường” (King of the Battlefield).\n\nTrong cuộc Tổng tiến công mùa Xuân 1975, hàng chục khẩu pháo M107 đã bị quân ta bắt sống nguyên vẹn tại Tây Nguyên, Huế, Đà Nẵng và Đồng Dù. Bộ đội pháo binh ta đã nhanh chóng làm chủ kỹ thuật, quay nòng pháo dội bão lửa trừng trị chính các căn cứ đối phương trong Chiến dịch Hồ Chí Minh. Khẩu pháo sừng sững tại sân bảo tàng là minh chứng đanh thép: vũ khí tối tân đến đâu cũng phải khuất phục trước ý chí và trí tuệ của con người Việt Nam.",
        image: "assets/images/artifacts/gd5-phao-m107.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd5-phao-m107.jpg",
            source: "internet",
            w: 1400,
            h: 933,
            credit: {
              author: "Vyacheslav Argenberg",
              site: "Wikimedia Commons",
              url: "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_City,_Vietnam,_M107_175_mm_self-propelled_gun.jpg",
              license: "CC BY 4.0",
              licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
              note: "đã thu nhỏ"
            }
          }
        ]
      },
      {
        id: "gd5-xe-tang-390",
        name: "Xe tăng lịch sử 390 — Biểu tượng Ngày Toàn thắng 30/4/1975",
        area: "Bản sao đồng dạng 1:1 tại bãi cỏ trước Hội trường Thống Nhất (Dinh Độc Lập)",
        areaFull: "Bản gốc chiếc xe tăng 390 hiện được lưu giữ trang trọng tại Bảo tàng Lực lượng Tăng thiết giáp (Hà Nội) và đã được công nhận là Bảo vật Quốc gia. Phiên bản đồng dạng kích thước 1:1 được trưng bày tại bãi cỏ phía trước Hội trường Thống Nhất (Dinh Độc Lập, 135 Nam Kỳ Khởi Nghĩa, Thành phố Hồ Chí Minh) và hệ thống tư liệu ảnh được trưng bày tại Bảo tàng Chứng tích Chiến tranh.",
        desc: "Chiếc xe tăng T-59 mang số hiệu 390 (thuộc Đại đội 4, Tiểu đoàn 1, Lữ đoàn Tăng thiết giáp 203, Quân đoàn 2) do Trung úy Chính trị viên Vũ Đăng Toàn chỉ huy cùng kíp lái gồm Nguyễn Văn Tập (lái xe), Ngô Sĩ Nguyên (pháo thủ số 1) và Lê Văn Phượng (pháo thủ số 2).",
        detail: "Chiếc xe tăng T-59 mang số hiệu 390 (thuộc Đại đội 4, Tiểu đoàn 1, Lữ đoàn Tăng thiết giáp 203, Quân đoàn 2) do Trung úy Chính trị viên Vũ Đăng Toàn chỉ huy cùng kíp lái gồm Nguyễn Văn Tập (lái xe), Ngô Sĩ Nguyên (pháo thủ số 1) và Lê Văn Phượng (pháo thủ số 2). Đúng 10 giờ 45 phút ngày 30/4/1975, chiếc xe tăng 390 đã dũng mãnh húc đổ cổng chính Dinh Độc Lập, mở toang sào huyệt cuối cùng của chính quyền ngụy Sài Gòn. Khoảnh khắc lịch sử này đã trở thành biểu tượng thị giác bất hủ của thế kỷ XX, đánh dấu mốc non sông thu về một mối.",
        image: "assets/images/artifacts/gd5-xe-tang-390.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd5-xe-tang-390.jpg",
            source: "internet",
            w: 1400,
            h: 1050,
            credit: {
              author: "TDA (Wikipedia tiếng Việt)",
              site: "Wikimedia Commons",
              url: "https://commons.wikimedia.org/wiki/File:Dinh_%C4%90%E1%BB%99c_l%E1%BA%ADp.JPG",
              license: "Phạm vi công cộng",
              note: "đã thu nhỏ; ảnh chụp bản sao xe 390 tại Hội trường Thống Nhất"
            }
          }
        ]
      },
      {
        id: "gd5-m48-ch47",
        name: "Xe tăng chiến đấu chủ lực M48 Patton và trực thăng hạng nặng CH-47 Chinook",
        area: "Sân trưng bày phương tiện chiến tranh ngoài trời, Bảo tàng Chứng tích Chiến tranh",
        desc: "Xe tăng M48 Patton là dòng xe tăng chiến đấu chủ lực tối tân nhất của Mỹ tại Việt Nam, nặng gần 50 tấn, trang bị vỏ giáp đúc dày kiên cố và pháo 90mm uy lực, từng được coi là “lá chắn thép” bảo vệ Sài Gòn trong chiến lược “Việt Nam hóa chiến tranh”.",
        detail: "Xe tăng M48 Patton là dòng xe tăng chiến đấu chủ lực tối tân nhất của Mỹ tại Việt Nam, nặng gần 50 tấn, trang bị vỏ giáp đúc dày kiên cố và pháo 90mm uy lực, từng được coi là “lá chắn thép” bảo vệ Sài Gòn trong chiến lược “Việt Nam hóa chiến tranh”. Bên cạnh là trực thăng vận tải CH-47 Chinook dùng để cơ động binh lính và pháo binh.\n\nTrong cuộc Tổng tiến công 1975, trước đòn hiệp đồng thần tốc của quân ta, các thiết đoàn M48 ngụy đã tan vỡ, bỏ lại hàng trăm xe nguyên vẹn trên khắp các chiến trường. Hiện vật tại bảo tàng nhắc nhở về sự phá sản hoàn toàn của học thuyết quân sự Mỹ dùng sắt thép đè bẹp lòng yêu nước.",
        image: "assets/images/artifacts/gd5-m48-ch47.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd5-m48-ch47.jpg",
            source: "internet",
            w: 1400,
            h: 1050,
            credit: {
              author: "RG72",
              site: "Wikimedia Commons",
              url: "https://commons.wikimedia.org/wiki/File:Usonaj_tanko_M48_Patton_kaj_helikoptero_CH%E2%80%9147_Chinook_en_la_Muzeo_de_Viktimoj_de_la_Milito_01.jpg",
              license: "CC BY-SA 4.0",
              licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
              note: "đã thu nhỏ"
            }
          }
        ]
      },
      {
        id: "gd5-a37-dragonfly",
        name: "Máy bay cường kích A-37 Dragonfly — Nhân chứng chiến công Phi đội Quyết Thắng",
        area: "Khu trưng bày không quân ngoài trời, Bảo tàng Chứng tích Chiến tranh",
        desc: "Máy bay cường kích hạng nhẹ A-37 Dragonfly do hãng Cessna (Mỹ) sản xuất, trang bị động cơ phản lực kép, súng máy 6 nòng minigun và có khả năng mang tới gần 2 tấn bom.",
        detail: "Máy bay cường kích hạng nhẹ A-37 Dragonfly do hãng Cessna (Mỹ) sản xuất, trang bị động cơ phản lực kép, súng máy 6 nòng minigun và có khả năng mang tới gần 2 tấn bom. Đây là dòng máy bay chiến thuật chủ lực mà không lực Việt Nam Cộng hòa sử dụng phổ biến nhất.\n\nChiếc A-37 tại bảo tàng gắn liền với kỳ tích của Phi đội Quyết Thắng chiều ngày 28/4/1975: các phi công ta đã dùng chính loại máy bay chiến lợi phẩm này tập kích bất ngờ sân bay Tân Sơn Nhất, phá tan giấc mộng di tản của đối phương, ghi một mốc son chói lọi trong lịch sử Không quân nhân dân Việt Nam.",
        image: "assets/images/artifacts/gd5-a37-dragonfly.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd5-a37-dragonfly.jpg",
            source: "internet",
            w: 1280,
            h: 853,
            credit: {
              author: "Balon Greyjoy",
              site: "Wikimedia Commons",
              url: "https://commons.wikimedia.org/wiki/File:20190923_A-37_War_Remnants_Museum-5.jpg",
              license: "CC0 1.0",
              licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
              note: "đã thu nhỏ"
            }
          }
        ]
      },
      {
        id: "gd5-bom-blu82",
        name: "Quả bom khổng lồ BLU-82 “Daisy Cutter” và trực thăng cứu thương UH-1 Huey",
        area: "Khu trưng bày vũ khí bom đạn ngoài trời, Bảo tàng Chứng tích Chiến tranh",
        desc: "Khối kim loại khổng lồ trưng bày tại sân bảo tàng là vỏ quả bom BLU-82 “Daisy Cutter” nặng tới 15.000 pound (gần 7 tấn), chứa đầy thuốc nổ GSX có sức hủy diệt khủng khiếp trên bán kính hàng trăm mét.",
        detail: "Khối kim loại khổng lồ trưng bày tại sân bảo tàng là vỏ quả bom BLU-82 “Daisy Cutter” nặng tới 15.000 pound (gần 7 tấn), chứa đầy thuốc nổ GSX có sức hủy diệt khủng khiếp trên bán kính hàng trăm mét. Trong trận tử thủ tuyệt vọng tại phòng tuyến Xuân Lộc (tháng 4/1975), quân đội Sài Gòn đã ném quả bom này cùng bom ngạt CBU-55 hòng chặn đứng bước tiến của quân Giải phóng. Cạnh đó là chiếc trực thăng UH-1 Iroquois (Huey) — biểu tượng của chiến thuật “Trực thăng vận” từng tràn ngập bầu trời miền Nam, nay nằm yên lặng làm chứng tích cho sự sụp đổ hoàn toàn của cỗ máy chiến tranh xâm lược.",
        image: "assets/images/artifacts/gd5-bom-blu82.jpg",
        images: [
          {
            src: "assets/images/artifacts/gd5-bom-blu82.jpg",
            source: "internet",
            w: 1400,
            h: 914,
            caption: "Vỏ bom BLU-82",
            credit: {
              author: "Peter van der Sluijs",
              site: "Wikimedia Commons",
              url: "https://commons.wikimedia.org/wiki/File:Vietnam_war_museum_Ho_Chinh_Vietnamwar_City_bombs.jpg",
              license: "CC BY-SA 3.0",
              licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
              note: "đã thu nhỏ"
            }
          },
          {
            src: "assets/images/artifacts/gd5-uh1-huey.jpg",
            source: "internet",
            w: 1400,
            h: 1050,
            caption: "Trực thăng UH-1 (bên phải ảnh)",
            alt: "Trực thăng UH-1 Huey (phía sau, bên phải) cạnh một máy bay phản lực trưng bày ngoài trời tại Bảo tàng Chứng tích Chiến tranh",
            credit: {
              author: "KenWalker",
              site: "Wikimedia Commons",
              url: "https://commons.wikimedia.org/wiki/File:War_remnants_museum_3.jpg",
              license: "CC BY-SA 3.0",
              licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
              note: "đã thu nhỏ"
            }
          }
        ]
      }
    ]
  }
];

// Dữ liệu tổng kết toàn diện (Quang phụ trách)
// Tổng kết (tab "Tổng kết & Bài học"): nguyên văn từ docs/tong-ket-va-on-tap/tong-ket.md (Quang).
// Câu hỏi ôn tập (phần 05) do summary.js dựng, lấy số câu thật từ quizData.
const summaryContent = {
  title: "Tổng kết cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)",
  sections: [
    {
      id: "vai-tro",
      title: "Đánh giá vai trò lãnh đạo của Đảng",
      paragraphs: [
        "Trong cuộc kháng chiến chống Mỹ, cứu nước (1954 - 1975), Đảng Cộng sản Việt Nam là lực lượng lãnh đạo, đề ra đường lối và tổ chức nhân dân cả nước thực hiện mục tiêu độc lập dân tộc, thống nhất đất nước. Vai trò đó thể hiện trước hết ở năng lực xác định mục tiêu chiến lược và xử lý đúng đắn mối quan hệ giữa hai miền. Đại hội III của Đảng (1960) xác định cách mạng xã hội chủ nghĩa ở miền Bắc giữ vai trò quyết định nhất đối với sự phát triển của cách mạng cả nước; cách mạng dân tộc dân chủ nhân dân ở miền Nam giữ vai trò quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam. Hai nhiệm vụ chiến lược được tiến hành đồng thời, gắn bó và hỗ trợ lẫn nhau.",
        "Đường lối của Đảng được hình thành và phát triển trên cơ sở phân tích tình hình cụ thể, giữ vững tính độc lập, tự chủ, đồng thời có bước đi và phương thức đấu tranh phù hợp. Dưới sự lãnh đạo của Đảng, quân và dân ta đã kiên cường, sáng tạo lần lượt đánh bại 4 chiến lược chiến tranh của đế quốc Mỹ: đánh bại chiến lược 'Chiến tranh đơn phương' (1954 - 1960) qua phong trào Đồng Khởi; đánh bại chiến lược 'Chiến tranh đặc biệt' (1961 - 1965) với các chiến thắng Ấp Bắc, Bình Giã, Ba Gia, Đồng Xoài; đánh bại chiến lược 'Chiến tranh cục bộ' (1965 - 1968) với đỉnh cao là cuộc Tổng tiến công Tết Mậu Thân 1968; và đánh bại chiến lược 'Việt Nam hóa chiến tranh' (1969 - 1973) với thắng lợi 'Điện Biên Phủ trên không', buộc Mỹ phải ký Hiệp định Paris rút toàn bộ quân viễn chinh về nước.",
        "Đặc biệt, sự lãnh đạo chiến lược còn thể hiện ở khả năng đánh giá tương quan lực lượng, xây dựng thế và lực, kiên quyết nhưng linh hoạt trong chỉ đạo. Sau Hiệp định Paris, Nghị quyết Trung ương 21 (1973) khẳng định con đường cách mạng miền Nam vẫn là bạo lực cách mạng. Bộ Chính trị đề ra kế hoạch giải phóng miền Nam trong hai năm 1975 - 1976, đồng thời chủ trương tranh thủ thời cơ nếu xuất hiện. Thắng lợi Phước Long và sự phát triển nhanh chóng của cuộc Tổng tiến công mùa Xuân 1975 đã giúp Đảng kịp thời điều chỉnh quyết tâm, tập trung lực lượng và chỉ đạo chiến dịch Hồ Chí Minh, kết thúc chiến tranh.",
        "Nhìn chung, vai trò lãnh đạo của Đảng là nhân tố quyết định hàng đầu đối với thắng lợi. Đảng đã quy tụ sức mạnh toàn dân tộc, phát huy hậu phương miền Bắc, tranh thủ sự ủng hộ quốc tế và tổ chức các lực lượng thành một thế trận thống nhất. Thắng lợi được tạo nên bởi sự lãnh đạo và sức chiến đấu của toàn dân, toàn quân; không tách rời những hy sinh to lớn của nhân dân Việt Nam."
      ]
    },
    {
      id: "nguyen-nhan",
      title: "Bốn nguyên nhân thắng lợi",
      items: [
        {
          title: "Sự lãnh đạo đúng đắn của Đảng Cộng sản Việt Nam",
          body: "Đảng xác định mục tiêu độc lập dân tộc và thống nhất đất nước, đề ra đường lối kháng chiến phù hợp với từng giai đoạn, xử lý mối quan hệ giữa đấu tranh quân sự, chính trị và ngoại giao. Năng lực tổ chức, đoàn kết lực lượng và nắm bắt thời cơ chiến lược là nhân tố hàng đầu đưa cuộc kháng chiến đến thắng lợi."
        },
        {
          title: "Lòng yêu nước, ý chí chiến đấu và sức mạnh đại đoàn kết toàn dân tộc",
          body: "Nhân dân hai miền đã kiên cường chiến đấu, lao động và chi viện cho tiền tuyến; các lực lượng vũ trang phối hợp với đấu tranh chính trị của quần chúng. Sự đoàn kết giữa các tầng lớp, dân tộc, tôn giáo và các lực lượng yêu nước tạo nên sức mạnh rộng khắp của chiến tranh nhân dân."
        },
        {
          title: "Hậu phương miền Bắc xã hội chủ nghĩa vững chắc",
          body: "Miền Bắc vừa xây dựng chủ nghĩa xã hội, vừa chống chiến tranh phá hoại, bảo vệ hậu phương và liên tục chi viện sức người, sức của cho miền Nam qua các tuyến chiến lược, trong đó có đường Trường Sơn. Sự chi viện ấy góp phần duy trì thế chiến lược và tăng cường lực lượng cho tiền tuyến."
        },
        {
          title: "Sự đoàn kết và ủng hộ quốc tế",
          body: "Nhân dân Việt Nam nhận được sự giúp đỡ quan trọng của nhân dân Lào, Campuchia, sự hỗ trợ của Liên Xô, Trung Quốc và các nước xã hội chủ nghĩa, cùng sự đồng tình, ủng hộ của phong trào giải phóng dân tộc, phong trào hòa bình và nhân dân tiến bộ trên thế giới, trong đó có nhân dân Mỹ. Đây là nguồn cổ vũ và hỗ trợ quý báu; thắng lợi trước hết bắt nguồn từ đường lối đúng đắn và sức mạnh của nhân dân Việt Nam."
        }
      ]
    },
    {
      id: "y-nghia",
      title: "Ý nghĩa lịch sử",
      paragraphs: [
        "Đối với Việt Nam, thắng lợi năm 1975 kết thúc cuộc kháng chiến chống Mỹ, cứu nước kéo dài 21 năm, đánh bại hoàn toàn 4 chiến lược chiến tranh của đế quốc Mỹ, chấm dứt ách thống trị của chủ nghĩa thực dân mới ở miền Nam và hoàn thành cách mạng dân tộc dân chủ nhân dân trong cả nước. Đất nước được thống nhất, mở ra kỷ nguyên độc lập, thống nhất và cả nước đi lên chủ nghĩa xã hội. Thắng lợi này cũng khẳng định ý chí kiên cường, khát vọng hòa bình và quyền tự quyết của nhân dân Việt Nam.",
        "Đối với thế giới, thắng lợi của Việt Nam là sự kiện có tầm vóc quốc tế, có ảnh hưởng sâu sắc đến cục diện và phong trào giải phóng dân tộc. Cuộc kháng chiến trở thành nguồn cổ vũ đối với các dân tộc đang đấu tranh vì độc lập, đồng thời cho thấy một dân tộc có quyết tâm và đường lối phù hợp có thể chống lại một cuộc chiến tranh xâm lược có ưu thế lớn về vật chất. Thắng lợi cũng góp phần thúc đẩy phong trào hòa bình và phản chiến trên thế giới."
      ]
    },
    {
      id: "bai-hoc",
      title: "Năm bài học kinh nghiệm",
      items: [
        {
          title: "Kiên định mục tiêu độc lập dân tộc gắn liền với thống nhất đất nước",
          body: "Xác định rõ mục tiêu lâu dài giúp giữ vững ý chí và định hướng hành động trước khó khăn, biến động. Với sinh viên, bài học này gợi nhắc trách nhiệm học tập, sống có lý tưởng và đóng góp thiết thực cho cộng đồng, đất nước."
        },
        {
          title: "Phát huy sức mạnh đại đoàn kết toàn dân tộc",
          body: "Tôn trọng sự khác biệt, củng cố đồng thuận và đặt lợi ích chung lên trên lợi ích cục bộ là điều kiện để tập hợp nguồn lực xã hội. Trong môi trường học tập, sinh viên có thể thực hành bài học ấy qua hợp tác, lắng nghe và cùng chịu trách nhiệm trong các hoạt động chung."
        },
        {
          title: "Kết hợp nhiều hình thức, mặt trận và nguồn lực một cách linh hoạt",
          body: "Kinh nghiệm phối hợp quân sự, chính trị, ngoại giao và kết hợp sức mạnh trong nước với sự ủng hộ quốc tế cho thấy cần lựa chọn phương thức phù hợp với mục tiêu và hoàn cảnh. Ngày nay, giải quyết vấn đề cần phối hợp kiến thức liên ngành, đối thoại và hợp tác trong nước, quốc tế."
        },
        {
          title: "Xây dựng tổ chức lãnh đạo có năng lực, gắn bó với nhân dân và biết tự đổi mới",
          body: "Đường lối đúng cần đi cùng năng lực tổ chức, thực tiễn và tinh thần trách nhiệm. Bài học này đặt ra yêu cầu về sự liêm chính, kỷ luật, năng lực chuyên môn và thái độ phục vụ trong các tổ chức; với sinh viên là chủ động rèn luyện đạo đức, chuyên môn và tinh thần phụng sự."
        },
        {
          title: "Chủ động chuẩn bị lực lượng, nắm chắc tình hình và kịp thời tận dụng thời cơ",
          body: "Thời cơ chỉ có thể chuyển thành kết quả khi đã có sự chuẩn bị lâu dài và đánh giá sát thực tế. Trong học tập và nghiên cứu, sinh viên cần trang bị kiến thức, kỹ năng khoa học - công nghệ, năng lực số và tư duy phản biện để sẵn sàng giải quyết những yêu cầu mới."
        }
      ]
    },
    {
      id: "on-tap",
      title: "Câu hỏi ôn tập"
    }
  ]
};

// Dữ liệu nhóm thực hiện đề tài
const teamMembers = [
  { name: "Lê Nguyễn Nhật Trường", studentId: "23127136", photo: "truong.jpeg", role: "Nhóm trưởng", task: "Điều phối tiến độ và tổng hợp báo cáo." },
  { name: "Đoàn Lê Gia Bảo", studentId: "23127025", photo: "bao.jpg", role: "Nội dung giai đoạn 1", task: "Nghiên cứu giai đoạn 1954–1960 và phong trào Đồng Khởi." },
  { name: "Vương Khải Phong", studentId: "23127453", photo: "phong.jpg", role: "Nội dung giai đoạn 2", task: "Nghiên cứu giai đoạn 1961–1965 và chiến lược Chiến tranh đặc biệt." },
  { name: "Nguyễn Văn An", studentId: "23127317", photo: "van.jpg", role: "Nội dung giai đoạn 3", task: "Nghiên cứu giai đoạn 1965–1968 và Tết Mậu Thân." },
  { name: "Biện Xuân An", studentId: "23127020", photo: "xan.jpg", role: "Nội dung giai đoạn 4", task: "Nghiên cứu giai đoạn 1969–1973 và Hiệp định Paris." },
  { name: "Mạch Quốc Tấn", studentId: "23127115", photo: "tan.jpg", role: "Nội dung giai đoạn 5", task: "Nghiên cứu giai đoạn 1973–1975 và Chiến dịch Hồ Chí Minh." },
  { name: "Lê Hữu Minh Quang", studentId: "23127108", photo: "quang.jpg", role: "Tổng kết và hiệu đính", task: "Biên soạn bài tổng kết và bộ câu hỏi ôn tập." },
  { name: "Hoàng Minh Giang", studentId: "23127043", photo: "giang.jpg", role: "Giao diện và dòng thời gian", task: "Xây dựng giao diện chung và slide thuyết trình tương tác." },
  { name: "Văn Ngọc Quý", studentId: "23127114", photo: "quy.jpg", role: "Kho tư liệu", task: "Xây dựng Kho tư liệu và giao diện xem chi tiết hiện vật." },
  { name: "Vũ Hoàng Minh", studentId: "23127427", photo: "minh.jpg", role: "Đố vui và trang nhóm", task: "Xây dựng phần trắc nghiệm và trang nhóm tác giả, cảm nghĩ." }
];
