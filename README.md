# CURRICULUM ANALYTICS – PROJECT 03
## Hệ thống Phân tích & So sánh Chương trình Giáo dục Tiểu học: Việt Nam và Ba Quốc gia (Phần Lan, Singapore, Nhật Bản)

> **Mã đề tài:** Đề 03 – Giáo dục học So sánh (Comparative Education)  
> **Phiên bản:** v3.2.0-Academic  
> **Phong cách thiết kế:** Modern Education Analytics (Linear, Notion & Stripe Dashboard aesthetic)  

---

## 1. Giới thiệu Tổng quan

**CURRICULUM ANALYTICS – PROJECT 03** là một hệ thống web phân tích dữ liệu giáo dục chuyên nghiệp, trực quan hóa và đối chiếu chương trình giáo dục tiểu học giữa **Việt Nam** và 3 hệ thống giáo dục tiêu biểu trên thế giới: **Phần Lan**, **Singapore**, và **Nhật Bản**.

Dự án được xây dựng trên nền tảng phương pháp luận giáo dục so sánh chuẩn mực (theo mô hình George Bereday & Bray & Thomas), phục vụ mục đích trình bày và bảo vệ đề tài trước hội đồng khoa học và giảng viên.

### 4 Hệ thống Giáo dục Đối sánh:
1. 🇻🇳 **Việt Nam:** Chương trình Giáo dục Phổ thông 2018 (Thông tư 32/2018/TT-BGDĐT) – Chuyển đổi từ truyền thụ kiến thức sang phát triển phẩm chất và năng lực.
2. 🇫🇮 **Phần Lan:** National Core Curriculum for Basic Education 2014 (OPS 2014) – Triết lý bình đẳng, tôn trọng sự phát triển tự nhiên của trẻ em và học tập theo hiện tượng (Phenomenon-Based Learning).
3. 🇸🇬 **Singapore:** Primary Curriculum Framework & sáng kiến "Learn for Life" – Khung năng lực thế kỷ 21 (21CC), giáo dục song ngữ và phương pháp tiếp cận CPA trong Toán học.
4. 🇯🇵 **Nhật Bản:** Courses of Study for Elementary Schools (MEXT 2017/2020) – Triết lý "Ikiru Chikara" (Nghị lực sống) kết hợp hài hòa Trí tuệ (Chi) - Đạo đức (Toku) - Thể lực (Tai) qua hoạt động Tokkatsu.

---

## 2. Khung 8 Tiêu chí So sánh Học thuật

Mỗi tiêu chí được phân tích đa chiều (Mô tả, Tương đồng, Khác biệt, Ưu điểm, Thách thức) và chuẩn hóa bằng **Rubric thang điểm 1.0 – 5.0**:

- **C1: Mục tiêu giáo dục** (*Educational Objectives & Philosophy*)
- **C2: Cấu trúc môn học** (*Subject Structure & Curricular Organization*)
- **C3: Thời lượng học tập** (*Instructional Time & Calendar*)
- **C4: Năng lực học sinh** (*Core Competencies & Student Literacies*)
- **C5: Nội dung chương trình** (*Curriculum Content & Real-World Integration*)
- **C6: Phương pháp dạy học** (*Pedagogical Approaches & Student Agency*)
- **C7: Đánh giá học sinh** (*Assessment & Feedback Practices*)
- **C8: Quản lý và triển khai chương trình** (*Governance, School & Teacher Autonomy*)

---

## 3. Các Phân hệ Tính năng Chính

1. **Dashboard Tổng quan:** 6 thẻ chỉ số đo lường, 4 biểu đồ phân tích (Country Comparison, Scores Distribution, Data Coverage, Curriculum Overview).
2. **Hồ sơ 4 Quốc gia:** Thẻ thông tin và cửa sổ chi tiết (Modal 10 điểm nội dung).
3. **Ma trận So sánh 8 Tiêu chí:** Bảng ma trận đối chiếu khoa học, bộ lọc động, tìm kiếm, mở rộng hàng để xem rubric, xuất file **CSV** và **Excel (.xls)**.
4. **Phân tích Tiêu chí:** Tab chuyển đổi 8 tiêu chí, thẻ so sánh 4 nước, phân tích ưu/nhược điểm và biểu đồ cột ngữ cảnh.
5. **Biểu đồ Radar Năng lực:** Radar Chart 8 trục, bật/tắt từng quốc gia độc lập, bảng giải trình thang đo rubric 1-5.
6. **Khuyến nghị Có Điều kiện:** 5 giải pháp thích ứng cho Việt Nam (Vấn đề, Căn cứ dữ liệu, Điều kiện áp dụng, Yếu tố điều chỉnh, Khó khăn, Giải pháp, Độ khả thi, Ưu tiên) + Form thêm đề xuất mới.
7. **Quản lý Nguồn Dữ liệu (Source Manager):** Quản lý 20+ văn bản chính thức với đầy đủ chức năng CRUD (Thêm, Sửa, Xóa, Lọc, Tìm kiếm, Đổi trạng thái xác minh) lưu trữ trên LocalStorage.
8. **AI Trợ lý Nghiên cứu (AI Research Assistant):** Bộ máy phân tích thông minh trích xuất nội dung theo 8 tiêu chí, rà soát phát hiện dữ liệu thiếu (Gap Analysis), gợi ý bản nháp khuyến nghị và hiển thị citation kiểm chứng nguồn.
9. **Phương pháp Nghiên cứu 8 Bước:** Sơ đồ quy trình nghiên cứu giáo dục so sánh trực quan.
10. **Chế độ Giao diện:** Hỗ trợ đầy đủ **Chế độ Sáng / Tối (Light & Dark Mode)** và **CSS Print** tối ưu in ấn xuất báo cáo PDF.

---

## 4. Cấu trúc Thư mục

```text
d:\Web CURRICULUM ANALYTICS\
├── index.html                  # Ứng dụng chính (Single Page Application container)
├── dashboard.html              # Đường dẫn nhanh vào Dashboard
├── countries.html              # Đường dẫn nhanh vào Hồ sơ Quốc gia
├── comparison.html             # Đường dẫn nhanh vào Ma trận So sánh
├── analysis.html               # Đường dẫn nhanh vào Phân tích Tiêu chí
├── radar.html                  # Đường dẫn nhanh vào Biểu đồ Radar
├── recommendations.html        # Đường dẫn nhanh vào Khuyến nghị
├── sources.html                # Đường dẫn nhanh vào Nguồn Dữ liệu
├── methodology.html            # Đường dẫn nhanh vào Phương pháp Nghiên cứu
├── css/
│   ├── style.css              # Hệ thống thiết kế (Design Tokens, Dark Mode, Responsive)
│   └── print.css              # Tối ưu in ấn xuất báo cáo PDF học thuật
└── js/
    ├── data.js                # Cơ sở dữ liệu chuẩn hóa 4 quốc gia, 8 tiêu chí, 20 nguồn
    ├── main.js                # Điều hướng, bộ lọc, tìm kiếm, Dark Mode, Toast, Router
    ├── dashboard.js           # Xử lý thống kê và 4 biểu đồ Chart.js
    ├── countries.js           # Hồ sơ quốc gia & Modal 10 điểm nội dung
    ├── comparison.js          # Ma trận so sánh, mở rộng hàng, xuất CSV & Excel
    ├── analysis.js            # Phân tích chuyên sâu từng tiêu chí
    ├── radar.js               # Biểu đồ mạng nhện 8 trục & bảng rubric
    ├── recommendations.js     # Khuyến nghị ứng dụng & Form thêm đề xuất
    ├── sources.js             # Quản lý nguồn dữ liệu (CRUD + LocalStorage)
    ├── ai-assistant.js        # AI Research Assistant (Trích xuất & Gap Analysis)
    ├── methodology.js         # Sơ đồ phương pháp nghiên cứu 8 bước
    └── chart-fallback.js      # Bộ vẽ biểu đồ Canvas tích hợp sẵn (Offline & Fallback)
```

---

## 5. Hướng dẫn Chạy Website

### Cách 1: Mở trực tiếp bằng trình duyệt (Khuyến nghị đơn giản nhất)
- Nhấp đúp chuột vào file `index.html` để mở ngay trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari).
- Toàn bộ tính năng tương tác, biểu đồ và lưu trữ LocalStorage hoạt động độc lập không cần cài đặt thêm phần mềm.

### Cách 2: Chạy qua Python HTTP Server (Nếu muốn mở qua localhost)
Mở PowerShell hoặc Command Prompt tại thư mục dự án và chạy:
```powershell
python -m http.server 8000
```
Sau đó truy cập: `http://localhost:8000` trên trình duyệt.

---

## 6. Cam kết Tính xác thực và Chuẩn mực Khoa học

- **Gắn nhãn dữ liệu minh bạch:** Mọi nhận định đối chiếu đều ghi rõ nguồn trích từ văn bản chương trình chính thức của các Bộ/Cơ quan quản lý (MOET, OPH, MOE Singapore, MEXT, OECD).
- **Không phán xét chủ quan:** Không xếp hạng quốc gia nào "tốt hơn", mà đánh giá sự phù hợp trong bối cảnh văn hóa, kinh tế, xã hội đặc thù của từng nước.
- **Tính khả thi thực tiễn:** Khuyến nghị cho Việt Nam không áp đặt cơ học mà có các điều kiện thích ứng và lộ trình thí điểm rõ ràng.
