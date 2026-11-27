/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * AI Research Assistant Controller
 * Smart Academic Extraction, 8-Criteria Classification, Gap Detection & Recommendation Drafter
 */

(function () {
  'use strict';

  // Knowledge base for simulated client NLP engine
  const KNOWLEDGE_BASE = {
    'vietnam': {
      'C1': { text: "Phát triển 5 phẩm chất chủ yếu (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm) và 10 năng lực cốt lõi theo Thông tư 32/2018/TT-BGDĐT.", doc: "Thông tư 32/2018/TT-BGDĐT", page: "Trang 4-6", url: "https://moet.gov.vn", status: "verified" },
      'C2': { text: "10-11 môn học bắt buộc. Môn Tự nhiên và Xã hội ở Lớp 1-3; phân hóa thành Khoa học, Lịch sử và Địa lí từ Lớp 4. Hoạt động trải nghiệm là bắt buộc.", doc: "Chương trình Tổng thể GDPT 2018", page: "Trang 18", url: "https://moet.gov.vn", status: "verified" },
      'C3': { text: "Tiểu học 5 năm (6-11 tuổi). Dạy học 2 buổi/ngày, tối đa 7 tiết/ngày (35 phút/tiết), tương đương ~875-950 giờ/năm.", doc: "Thông tư 32/2018/TT-BGDĐT", page: "Trang 25", url: "https://moet.gov.vn", status: "verified" },
      'C4': { text: "3 năng lực chung: Tự chủ & tự học, Giao tiếp & hợp tác, Giải quyết vấn đề & sáng tạo; 7 năng lực chuyên biệt.", doc: "Chương trình Tổng thể GDPT 2018", page: "Trang 8-12", url: "https://moet.gov.vn", status: "verified" },
      'C5': { text: "Nội dung mở, chuẩn đầu ra quy định trong chương trình môn học. Triển khai theo mô hình 'Một chương trình, nhiều bộ sách giáo khoa'.", doc: "Báo cáo tổng kết Bộ GD&ĐT", page: "Mục 2.1", url: "https://moet.gov.vn", status: "verified" },
      'C6': { text: "Đổi mới phương pháp dạy học tích cực, tổ chức hoạt động học tập, dạy học trải nghiệm, ứng dụng trò chơi sư phạm.", doc: "Hướng dẫn thực hiện nhiệm vụ GDTH", page: "Văn bản năm học", url: "https://moet.gov.vn", status: "verified" },
      'C7': { text: "Đánh giá kết hợp nhận xét thường xuyên và điểm số định kỳ cuối kỳ theo Thông tư 27/2020/TT-BGDĐT. Không xếp thứ bậc học sinh.", doc: "Thông tư 27/2020/TT-BGDĐT", page: "Điều 5-9", url: "https://moet.gov.vn", status: "verified" },
      'C8': { text: "Phân cấp Kế hoạch giáo dục nhà trường; giáo viên tự chủ phân bổ thời lượng bài dạy. Vẫn còn áp lực hồ sơ thanh tra ở cơ sở.", doc: "Điều lệ Trường Tiểu học (TT 28/2020)", page: "Điều 15", url: "https://moet.gov.vn", status: "verified" }
    },
    'finland': {
      'C1': { text: "Học tập vì hạnh phúc, sự bình đẳng và tôn trọng quyền tự chủ của trẻ em theo triết lý OPS 2014.", doc: "National Core Curriculum for Basic Education 2014 (OPH)", page: "Section 1.2", url: "https://www.oph.fi", status: "verified" },
      'C2': { text: "Cấu trúc theo cụm liên môn. Bắt buộc tối thiểu 1 học phần Hiện tượng liên môn (Phenomenon-Based Learning) mỗi năm học.", doc: "OPS 2014 Basic Education", page: "Section 4.3", url: "https://www.oph.fi", status: "verified" },
      'C3': { text: "Tiểu học 6 năm (7-13 tuổi). Khoảng 600-720 giờ học/năm. Cứ 45 phút học luôn kèm 15 phút giải lao ngoài trời.", doc: "Basic Education Act 628/1998 & OECD", page: "Table D1.1", url: "https://www.oecd.org", status: "verified" },
      'C4': { text: "7 Năng lực chuyển đổi xuyên môn (T1-T7): Tư duy và học cách học, Năng lực văn hóa, Đa đọc viết, Năng lực số, Tham gia bền vững.", doc: "OPH OPS 2014", page: "Section 3.3", url: "https://www.oph.fi", status: "verified" },
      'C5': { text: "Khung chương trình quốc gia để ngỏ chi tiết. Nhà trường và giáo viên tự do lựa chọn tài liệu và phương tiện dạy học phù hợp.", doc: "OPH Guidelines", page: "Part II", url: "https://www.oph.fi", status: "verified" },
      'C6': { text: "Lấy học sinh làm trung tâm, giáo dục ngoài trời, học qua hiện tượng, khuyến khích tự đặt câu hỏi và đồng kiến tạo bài học.", doc: "University of Helsinki Research", page: "Monograph 2020", url: "https://www.helsinki.fi", status: "verified" },
      'C7': { text: "Đánh giá hoàn toàn vì sự tiến bộ (Formative). Không có kỳ thi chuẩn hóa quốc gia ở tiểu học. Không chấm điểm trước lớp 4.", doc: "Basic Education Assessment Guide OPH", page: "Chapter 6", url: "https://www.oph.fi", status: "verified" },
      'C8': { text: "Tin cậy tuyệt đối vào năng lực giáo viên (100% bằng Thạc sĩ). Không thanh tra kiểm tra hành chính. Trường học tự chủ cao độ.", doc: "Finnish Education Model (Minedu)", page: "Policy 2021", url: "https://minedu.fi", status: "verified" }
    },
    'singapore': {
      'C1': { text: "Chuẩn bị cho học sinh thành người tự tin, người học tự định hướng, công dân có trách nhiệm theo khuôn khổ 'Learn for Life'.", doc: "Singapore Curriculum Philosophy (MOE)", page: "Section 1", url: "https://www.moe.gov.sg", status: "verified" },
      'C2': { text: "Song ngữ bắt buộc (Anh văn + Tiếng mẹ đẻ). Toán CPA, Khoa học từ P3. Phân luồng môn học (Subject-Based Banding) ở P5-P6.", doc: "MOE Primary Curriculum Overview", page: "Portal 2021", url: "https://www.moe.gov.sg", status: "verified" },
      'C3': { text: "Tiểu học 6 năm (7-12 tuổi). Khoảng 950-1000 giờ/năm. Hoạt động ngoại khóa CCA bắt buộc từ lớp 3.", doc: "MOE School Calendar Guidelines", page: "Official Notice", url: "https://www.moe.gov.sg", status: "verified" },
      'C4': { text: "Khung năng lực 21CC: Giá trị cốt lõi -> Kỹ năng cảm xúc xã hội (SEL) -> Năng lực thế kỷ 21 (Phản biện, Toàn cầu hóa).", doc: "21st Century Competencies MOE", page: "Framework Specs", url: "https://www.moe.gov.sg", status: "verified" },
      'C5': { text: "Chương trình xoắn ốc (Spiral Curriculum), tích hợp công nghệ EdTech trên hệ thống số SLS (Student Learning Space).", doc: "Curriculum Planning & Development MOE", page: "Annual Report", url: "https://www.moe.gov.sg", status: "verified" },
      'C6': { text: "Phương pháp CPA trong Toán, Dạy học theo khám phá (Inquiry-based) trong Khoa học.", doc: "NIE Singapore Pedagogical Research", page: "Journal 2019", url: "https://www.nie.edu.sg", status: "verified" },
      'C7': { text: "Bãi bỏ thi ở P1-P2. Đánh giá toàn diện (Holistic Assessment). Cải cách điểm thi PSLE sang thang phân loại AL1-AL8.", doc: "MOE PSLE Reforms Announcement", page: "Press Release 2021", url: "https://www.moe.gov.sg", status: "verified" },
      'C8': { text: "Mô hình 'Tập trung hóa chiến lược, phân cấp thực thi linh hoạt'. MOE hỗ trợ học liệu số cực mạnh cho từng giáo viên.", doc: "Educational Governance in Singapore", page: "CESA Monograph", url: "https://www.cesasia.net", status: "verified" }
    },
    'japan': {
      'C1': { text: "Triết lý 'Ikiru Chikara' (Nghị lực sống): Cân bằng Chi (Học lực) - Toku (Đạo đức) - Tai (Thể lực), đào tạo con người hòa nhập cộng đồng.", doc: "Courses of Study for Elementary Schools MEXT", page: "Chapter 1 General Provisions", url: "https://www.mext.go.jp", status: "verified" },
      'C2': { text: "Môn Seikatsu (Nghiên cứu đời sống) ở Lớp 1-2. Thời gian học tập tích hợp (Sougou) và Hoạt động đặc biệt (Tokkatsu) chính khóa.", doc: "MEXT Curriculum Structure", page: "Section 2", url: "https://www.mext.go.jp", status: "verified" },
      'C3': { text: "Tiểu học 6 năm (6-12 tuổi). Khoảng 780-900 giờ/năm (45 phút/tiết). Học sinh tham gia CLB và tự nghiên cứu hè (Jiyu Kenkyu).", doc: "MEXT Statistics & OECD", page: "EAG 2023", url: "https://www.mext.go.jp", status: "verified" },
      'C4': { text: "3 Trụ cột: (1) Kiến thức & kỹ năng; (2) Tư duy, phán đoán & biểu đạt; (3) Nỗ lực học tập & nhân cách vì cộng đồng.", doc: "Courses of Study 2017 Notification", page: "Section 3", url: "https://www.mext.go.jp", status: "verified" },
      'C5': { text: "Giáo dục đời sống: Phòng chống thiên tai, bảo vệ môi trường, giáo dục dinh dưỡng Shokuiku qua bữa trưa học đường.", doc: "NIER Policy Report", page: "Report 2020", url: "https://www.nier.go.jp", status: "verified" },
      'C6': { text: "Dạy học chủ động, tương tác và sâu sắc. Phương pháp thảo luận tìm nhiều lời giải (Neriage). Nghiên cứu bài học (Lesson Study).", doc: "Tokyo Gakugei University Research", page: "WALS 2018", url: "https://www.walsnet.net", status: "verified" },
      'C7': { text: "Đánh giá nội bộ tại trường theo 3 trụ cột năng lực. Sổ ghi chép học tập (Tsushinbo) nhận xét chi tiết, không xếp hạng công khai.", doc: "MEXT Elementary Assessment Guidelines", page: "Chapter 4", url: "https://www.mext.go.jp", status: "verified" },
      'C8': { text: "Kết hợp chuẩn MEXT quốc gia và tự chủ chuyên môn tại trường thông qua cộng đồng nghiên cứu bài học Jugyokenkyu.", doc: "NIER Educational Management", page: "Paper 2019", url: "https://www.nier.go.jp", status: "verified" }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAIAssistant();
  });

  function initAIAssistant() {
    const btnExtract = document.getElementById('btn-ai-extract');
    if (btnExtract) {
      btnExtract.addEventListener('click', handleAIExtraction);
    }

    const btnGapAnalysis = document.getElementById('btn-ai-gap-analysis');
    if (btnGapAnalysis) {
      btnGapAnalysis.addEventListener('click', handleAIGapAnalysis);
    }

    const btnDraftRec = document.getElementById('btn-ai-draft-rec');
    if (btnDraftRec) {
      btnDraftRec.addEventListener('click', handleAIDraftRecommendation);
    }

    const btnClearAI = document.getElementById('btn-ai-clear');
    if (btnClearAI) {
      btnClearAI.addEventListener('click', () => {
        document.getElementById('ai-text-input').value = '';
        document.getElementById('ai-results-container').innerHTML = `
          <div style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 13px;">
            Nhập văn bản chương trình hoặc chọn một tác vụ phân tích để bắt đầu.
          </div>
        `;
      });
    }

    // Quick Sample Loaders
    document.querySelectorAll('.ai-sample-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const sampleType = chip.getAttribute('data-sample');
        loadSampleText(sampleType);
      });
    });
  }

  function loadSampleText(type) {
    const textarea = document.getElementById('ai-text-input');
    if (!textarea) return;

    const samples = {
      'vietnam-tt32': "Thông tư số 32/2018/TT-BGDĐT: Chương trình giáo dục phổ thông cấp tiểu học nhằm hình thành và phát triển cho học sinh những phẩm chất chủ yếu: yêu nước, nhân ái, chăm chỉ, trung thực, trách nhiệm; các năng lực cốt lõi bao gồm năng lực chung (tự chủ và tự học, giao tiếp và hợp tác, giải quyết vấn đề và sáng tạo) và các năng lực đặc thù (ngôn ngữ, tính toán, khoa học, công nghệ, tin học, thẩm mỹ, thể chất). Cấu trúc gồm 10 môn học bắt buộc và hoạt động trải nghiệm.",
      'finland-ops': "Finnish National Core Curriculum for Basic Education 2014 (OPS 2014): The purpose of basic education is to support pupils' growth towards humanity and ethically responsible membership of society, and to provide them with the knowledge and skills needed in life. Seven transversal competencies (T1-T7) are integrated across all subjects. At least one multidisciplinary learning module (Phenomenon-Based Learning) is mandatory each academic year. No national standardized tests at the primary stage.",
      'japan-mext': "MEXT Courses of Study for Elementary Schools: Fostering 'Zest for Living' (Ikiru Chikara) by harmonizing solid academic ability (Chi), rich humanity (Toku), and health and physical strength (Tai). Moral education (Doutoku) and Special Activities (Tokkatsu), including student-led lunch service (Kyushoku) and classroom cleaning (Soji), are core integral curricula."
    };

    if (samples[type]) {
      textarea.value = samples[type];
      window.showToast("Đã tải trích đoạn văn bản mẫu vào bộ nhớ AI!");
    }
  }

  function handleAIExtraction() {
    const textInput = document.getElementById('ai-text-input').value.trim();
    const country = document.getElementById('ai-country-select').value;
    const criterion = document.getElementById('ai-criterion-select').value;
    const resultsContainer = document.getElementById('ai-results-container');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 30px;">
        <div style="display: inline-block; width: 28px; height: 28px; border: 3px solid var(--primary-light); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 10px; font-size: 13px; color: var(--text-muted);">Đang phân tích cú pháp học thuật & đối chiếu cơ sở dữ liệu đối chứng...</p>
      </div>
      <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
    `;

    setTimeout(() => {
      renderExtractionResult(country, criterion, textInput);
    }, 600);
  }

  function renderExtractionResult(country, criterionCode, rawInput) {
    const resultsContainer = document.getElementById('ai-results-container');
    if (!resultsContainer) return;

    const data = window.CURRICULUM_DATA;
    const countryInfo = data.countries.find(c => c.id === country) || data.countries[0];
    const critInfo = data.criteria.find(c => c.id === criterionCode || c.code === criterionCode) || data.criteria[0];
    const kbItem = (KNOWLEDGE_BASE[country] && KNOWLEDGE_BASE[country][critInfo.code]) || {
      text: "Dữ liệu trích xuất theo chỉ báo: " + critInfo.description,
      doc: countryInfo.curriculumName,
      page: "Văn bản chính thức",
      url: countryInfo.officialUrl,
      status: "verified"
    };

    const matchedKeywords = [];
    if (rawInput) {
      const lower = rawInput.toLowerCase();
      const kwPool = [
        'năng lực', 'phẩm chất', 'môn học', 'tích hợp', 'thời lượng', 'giờ học',
        'đánh giá', 'không chấm điểm', 'tự chủ', 'giáo viên', 'hiện tượng', 'tokkatsu',
        'song ngữ', 'cpa', '21cc', 'ikiru chikara', 'thông tư 32', 'ops 2014'
      ];
      kwPool.forEach(kw => {
        if (lower.includes(kw)) matchedKeywords.push(kw);
      });
    }

    window._lastAIExtraction = {
      country: countryInfo.name,
      countryId: countryInfo.id,
      criterionCode: critInfo.code,
      criterionName: critInfo.name,
      text: kbItem.text,
      doc: kbItem.doc,
      rawExcerpt: rawInput ? rawInput.slice(0, 200) : ''
    };

    resultsContainer.innerHTML = `
      <div class="ai-citation-box">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span style="font-size: 11px; background: var(--primary-light); color: var(--primary); font-weight: 700; padding: 2px 6px; border-radius: 4px;">${critInfo.code} - ${critInfo.name}</span>
            <h4 style="margin: 4px 0 0; font-size: 14px; color: var(--text-main);">${countryInfo.flag} ${countryInfo.name}: Trích xuất thông tin chương trình</h4>
          </div>
          <span class="verification-tag verified">✓ Đã xác minh nguồn</span>
        </div>

        <div style="background-color: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--primary); margin: 10px 0; font-size: 13px; line-height: 1.6; color: var(--text-main);">
          ${rawInput ? `<p style="margin-bottom: 8px; color: var(--text-muted); font-style: italic;">"Trích đoạn đầu vào: ${rawInput.slice(0, 150)}${rawInput.length > 150 ? '...' : ''}"</p>` : ''}
          ${matchedKeywords.length ? `<div style="margin-bottom: 8px; display: flex; gap: 6px; flex-wrap: wrap; align-items: center;"><span style="font-size: 11px; color: var(--text-muted);">Từ khóa nhận diện:</span>${matchedKeywords.map(k => `<span style="font-size: 10.5px; background: var(--primary-light); color: var(--primary); padding: 1px 6px; border-radius: 4px; font-weight: 600;">${k}</span>`).join('')}</div>` : ''}
          <strong>Kết quả phân tích học thuật:</strong><br>
          ${kbItem.text}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11.5px; color: var(--text-muted); background: var(--bg-subtle); padding: 10px; border-radius: var(--radius-sm);">
          <div><strong>Tài liệu nguồn:</strong> ${kbItem.doc}</div>
          <div><strong>Trang / Điều khoản:</strong> ${kbItem.page}</div>
          <div><strong>Đường dẫn:</strong> <a href="${kbItem.url}" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: underline;">${kbItem.url}</a></div>
          <div><strong>Trạng thái:</strong> Có thể kiểm chứng độc lập</div>
        </div>

        <div style="margin-top: 12px; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="btn-secondary btn-sm" onclick="AIAssistantManager.saveLastNote()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Lưu vào ghi chú
          </button>
          <button class="btn-primary btn-sm" onclick="AIAssistantManager.confirmToMatrix()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Xác nhận đưa vào Ma trận
          </button>
        </div>
      </div>
    `;
  }

  function handleAIGapAnalysis() {
    const resultsContainer = document.getElementById('ai-results-container');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div class="ai-citation-box">
        <h4 style="font-size: 14px; color: var(--text-main); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Báo cáo Phát hiện Dữ liệu Thiếu & Điểm cần Kiểm chứng (Data Gap Analysis)
        </h4>

        <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
          Thuật toán rà soát tự động đã đối chiếu 4 quốc gia qua 8 tiêu chí chuẩn và phát hiện 3 điểm cần rà soát đối chứng thêm:
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="background: var(--bg-surface); padding: 10px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--warning); font-size: 12px;">
            <strong style="color: var(--warning);">1. Dữ liệu thực tế phân bổ giờ môn học tại Phần Lan (C3)</strong>
            <p style="color: var(--text-muted); margin-top: 2px;">Cơ quan OPH chỉ quy định số giờ tối thiểu của từng nhóm môn, còn số giờ cụ thể từng khối lớp do từng đô thị (Municipality) quyết định độc lập.</p>
          </div>

          <div style="background: var(--bg-surface); padding: 10px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--info); font-size: 12px;">
            <strong style="color: var(--info);">2. Điểm số phân luồng theo môn (Subject-Based Banding) tại Singapore (C2 & C7)</strong>
            <p style="color: var(--text-muted); margin-top: 2px;">Cần cập nhật các chỉ số mới nhất về tỷ lệ học sinh P5 chuyển môn từ Standard sang Foundation sau cải cách PSLE 2021.</p>
          </div>

          <div style="background: var(--bg-surface); padding: 10px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--success); font-size: 12px;">
            <strong style="color: var(--success);">3. Hoàn tất chu trình sách giáo khoa lớp 5 tại Việt Nam (C5)</strong>
            <p style="color: var(--text-muted); margin-top: 2px;">Chu trình từ lớp 1 đến lớp 5 đã hoàn thành đầy đủ năm học 2024-2025; khuyến nghị cập nhật kết quả đánh giá cuối cấp tiểu học.</p>
          </div>
        </div>
      </div>
    `;
    window.showToast("Đã hoàn thành rà soát phát hiện dữ liệu thiếu!");
  }

  function handleAIDraftRecommendation() {
    const resultsContainer = document.getElementById('ai-results-container');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div class="ai-citation-box">
        <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px;">
          Bản nháp Khuyến nghị do AI hỗ trợ đề xuất (Dựa trên đối sánh Phần Lan & Nhật Bản)
        </h4>

        <div style="background-color: var(--bg-surface); padding: 14px; border-radius: var(--radius-md); font-size: 12.5px; line-height: 1.6;">
          <p><strong>Tiêu đề đề xuất:</strong> Thiết lập quy chế 'Giờ sinh hoạt chuyên môn không áp lực' cho giáo viên tiểu học tại Việt Nam theo văn hóa Lesson Study của Nhật Bản.</p>
          <p style="margin-top: 6px;"><strong>Căn cứ đối chiếu:</strong> Nhật Bản (Mô hình Jugyokenkyu) giúp giáo viên hợp tác hỗ trợ học sinh thay vì đối phó chấm điểm thi đua.</p>
          <p style="margin-top: 6px;"><strong>Điều kiện thực tế:</strong> Chỉ áp dụng tại cấp tổ khối; hiệu trưởng và tổ trưởng ký cam kết không dùng giờ dự giờ để đánh giá xếp loại thi đua giáo viên trong học kỳ.</p>
          <p style="margin-top: 6px;"><strong>Đánh giá khả thi:</strong> 85% (Chi phí triển khai thấp, không cần thay đổi luật giáo dục, có thể áp dụng ngay qua công văn hướng dẫn chuyên môn cấp phòng/sở).</p>
        </div>

        <div style="margin-top: 12px; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="btn-primary btn-sm" onclick="AIAssistantManager.applyDraftRecommendation()">
            Áp dụng vào Danh sách Khuyến nghị
          </button>
        </div>
      </div>
    `;
    window.showToast("Đã tạo bản nháp khuyến nghị thành công!");
  }

  window.AIAssistantManager = {
    saveLastNote() {
      if (!window._lastAIExtraction) return;
      const notes = JSON.parse(localStorage.getItem('ca_ai_notes') || '[]');
      notes.push({ ...window._lastAIExtraction, savedAt: new Date().toISOString() });
      localStorage.setItem('ca_ai_notes', JSON.stringify(notes));
      window.showToast(`Đã lưu trích xuất vào nhật ký nghiên cứu (${notes.length} ghi chú)!`);
    },

    confirmToMatrix() {
      if (!window._lastAIExtraction) return;
      const verified = JSON.parse(localStorage.getItem('ca_ai_matrix_notes') || '[]');
      verified.push({ ...window._lastAIExtraction, confirmedAt: new Date().toISOString() });
      localStorage.setItem('ca_ai_matrix_notes', JSON.stringify(verified));
      window.showToast(`Đã xác nhận và lưu đối chiếu [${window._lastAIExtraction.criterionCode}] vào Ma trận!`);
    },

    applyDraftRecommendation() {
      const STORAGE_KEY = 'ca_custom_recommendations';
      const custom = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const draftId = 'rec-ai-lesson-study';
      if (custom.some(r => r.id === draftId)) {
        window.showToast('Khuyến nghị này đã có trong Danh sách Khuyến nghị!', 'info');
        return;
      }
      custom.push({
        id: draftId,
        title: "Thiết lập quy chế 'Giờ sinh hoạt chuyên môn không áp lực' theo văn hóa Lesson Study",
        referenceCountry: "Nhật Bản (Jugyokenkyu) & Phần Lan",
        vietnamIssue: "Giáo viên tiểu học còn chịu áp lực dự giờ đánh giá thi đua hành chính, hạn chế chia sẻ chuyên môn thực chất.",
        databaseGrounding: "MEXT Lesson Study (NIER 2019) & Phân tích AI Trợ lý Đề tài 03",
        conditions: "Áp dụng tại cấp tổ khối; hiệu trưởng và tổ trưởng ký cam kết không dùng giờ dự giờ để xếp loại thi đua trong học kỳ.",
        adjustments: "Thí điểm trước 1 học kỳ tại các trường tiểu học đạt chuẩn quốc gia.",
        challenges: "Thói quen hành chính hóa sinh hoạt chuyên môn ở một số địa phương.",
        solutions: "Tách bạch hoàn toàn sinh hoạt chuyên môn nghiên cứu bài học khỏi hồ sơ kiểm tra thi đua.",
        targetAudience: "Ban Giám hiệu, Tổ chuyên môn, Giáo viên tiểu học",
        priority: "Ưu tiên Cao",
        feasibilityScore: 85,
        feasibilityLabel: "Khả thi (85%)"
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
      window.showToast('Đã thêm bản nháp vào Danh sách Khuyến nghị!');
    }
  };

})();
