import os

svg_template = '''<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="grad_{idx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{c1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{c2};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow_{idx}" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>
  <rect width="800" height="500" fill="url(#grad_{idx})" rx="12"/>
  <rect x="25" y="25" width="750" height="450" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="8 6" rx="8" opacity="0.6"/>
  
  <g transform="translate(400, 150)" filter="url(#shadow_{idx})">
    <circle cx="0" cy="0" r="50" fill="#D4AF37" opacity="0.15"/>
    <circle cx="0" cy="0" r="40" fill="#D4AF37" opacity="0.9"/>
    <path d="M-22 14 L22 14 L22 9 L-22 9 Z M-18 7 L-12 -14 L-7 7 Z M-5 7 L0 -14 L5 7 Z M7 7 L12 -14 L18 7 Z M-22 -16 L0 -30 L22 -16 Z" fill="#8B1E1E"/>
  </g>

  <rect x="250" y="220" width="300" height="34" rx="17" fill="#D4AF37" opacity="0.2" />
  <text x="400" y="243" fill="#D4AF37" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1.5">{badge}</text>

  <text x="400" y="295" fill="#FFFFFF" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="bold" text-anchor="middle">{title}</text>
  
  <text x="400" y="335" fill="#E5E7EB" font-family="'Segoe UI', sans-serif" font-size="15" text-anchor="middle">{sub}</text>

  <rect x="180" y="380" width="440" height="36" rx="6" fill="#000000" opacity="0.35"/>
  <text x="400" y="403" fill="#D1D5DB" font-family="'Segoe UI', sans-serif" font-size="13" font-style="italic" text-anchor="middle">[Vị trí placeholder ảnh - Sẽ thay bằng ảnh hiện vật Bảo tàng sau]</text>
</svg>'''

items = [
  ('stage1_guillotine.svg', '#2C1810', '#1A0C08', 'GIAI ĐOẠN 1954 - 1960', 'Hiện vật Máy chém theo Luật 10/59', 'Tội ác chính quyền Ngô Đình Diệm & Sự chuyển hướng của Đảng'),
  ('stage1_dongkhoi.svg', '#3B1812', '#1C0D0A', 'GIAI ĐOẠN 1954 - 1960', 'Phong trào Đồng Khởi Bến Tre 1960', 'Đội quân tóc dài & Mặt trận Dân tộc Giải phóng ra đời'),
  ('stage2_apchienluoc.svg', '#1E252B', '#111827', 'GIAI ĐOẠN 1961 - 1965', 'Kẽm gai & Mô hình Ấp Chiến Lược', 'Quốc sách bình định của Mỹ bị nhân dân ta phá vỡ'),
  ('stage2_apbac.svg', '#282C1E', '#141810', 'GIAI ĐOẠN 1961 - 1965', 'Chiến thắng Ấp Bắc 1963', 'Vô hiệu hóa chiến thuật Trực thăng vận & Thiết xa vận'),
  ('stage3_napalm_bomb.svg', '#381616', '#200A0A', 'GIAI ĐOẠN 1965 - 1968', 'Bộ sưu tập Bom đạn & Bom Napalm', 'Tội ác hủy diệt trong chiến lược Chiến tranh cục bộ'),
  ('stage3_mauthan.svg', '#3A1E14', '#1F0F08', 'GIAI ĐOẠN 1965 - 1968', 'Tổng tiến công Tết Mậu Thân 1968', 'Đòn bất ngờ đánh thẳng vào cơ quan đầu não đối phương'),
  ('stage4_dacam.svg', '#2C2B18', '#16160A', 'GIAI ĐOẠN 1969 - 1973', 'Chứng tích Da cam / Dioxin & Xác B-52', 'Hậu quả tàn khốc của chiến tranh & Tinh thần bất khuất'),
  ('stage4_paris.svg', '#1C2938', '#0C1724', 'GIAI ĐOẠN 1969 - 1973', 'Ký kết Hiệp định Paris 27/01/1973', 'Hoàn thành mục tiêu chiến lược Đánh cho Mỹ cút'),
  ('stage5_xetang.svg', '#341A1A', '#1C0B0B', 'GIAI ĐOẠN 1973 - 1975', 'Xe tăng T-54 tiến vào Dinh Độc Lập', 'Thời khắc lịch sử 11h30 ngày 30/04/1975 toàn thắng'),
  ('stage5_chienthang.svg', '#3B2414', '#1E1208', 'GIAI ĐOẠN 1973 - 1975', 'Non sông liền một dải (30/04/1975)', 'Sài Gòn rực rỡ cờ hoa mừng ngày non sông thống nhất'),
  ('baotang_overview.svg', '#2E1C2B', '#170B16', 'BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH', 'Góc nhìn từ chứng tích lịch sử', '28 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP.HCM'),
  ('team_photo.svg', '#1D2D2E', '#0D1718', 'NHÓM THỰC HIỆN ĐỀ TÀI', 'Ảnh kỷ niệm chuyến đi thực tế Bảo tàng', 'Tập thể sinh viên môn Lịch sử Đảng Cộng sản Việt Nam')
]

out_dir = os.path.join(os.path.dirname(__file__), 'placeholders')
os.makedirs(out_dir, exist_ok=True)
for idx, (fname, c1, c2, badge, title, sub) in enumerate(items):
    content = svg_template.format(idx=idx, c1=c1, c2=c2, badge=badge, title=title, sub=sub)
    target = os.path.join(out_dir, fname)
    with open(target, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Generated {len(items)} SVG placeholder files in {out_dir}")
