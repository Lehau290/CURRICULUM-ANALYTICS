/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Dữ liệu nghiên cứu so sánh chương trình giáo dục tiểu học
 * 4 Quốc gia: Việt Nam, Phần Lan, Singapore, Nhật Bản
 * 8 Tiêu chí so sánh học thuật chuẩn mực
 * Ghi chú: Dữ liệu phân tích học thuật được trích xuất và tổng hợp từ các văn bản chính thức của MOET, OPH, MOE Singapore, MEXT, OECD và UNESCO.
 */

const CURRICULUM_DATA = {
  projectMeta: {
    title: "CURRICULUM ANALYTICS – PROJECT 03",
    subtitle: "Hệ thống Phân tích & So sánh Chương trình Giáo dục Tiểu học: Việt Nam và Ba Quốc gia (Phần Lan, Singapore, Nhật Bản)",
    academicField: "Giáo dục học so sánh (Comparative Education)",
    version: "v3.2.0-Academic",
    lastUpdated: "2026-11-25",
    disclaimer: "Dữ liệu phục vụ phân tích học thuật và nghiên cứu đối chiếu. Các chỉ số định lượng dựa trên khung chuẩn hóa quy ước (thang điểm 1-5 có rubric giải trình rõ ràng)."
  },

  // 1. DỮ LIỆU 4 QUỐC GIA
  countries: [
    {
      id: "vietnam",
      code: "VN",
      name: "Việt Nam",
      englishName: "Vietnam",
      flag: "🇻🇳",
      curriculumName: "Chương trình Giáo dục Phổ thông 2018 (Cấp Tiểu học)",
      officialCode: "Thông tư số 32/2018/TT-BGDĐT",
      promulgationYear: "2018 (Áp dụng từ năm học 2020-2021 đến 2024-2025)",
      governingBody: "Bộ Giáo dục và Đào tạo (MOET)",
      primaryYears: 5,
      gradeRange: "Lớp 1 đến Lớp 5",
      ageRange: "6 – 11 tuổi",
      schoolYearWeeks: "35 tuần thực học (2 học kỳ)",
      periodsPerWeek: "Lớp 1, 2: 25-31 tiết/tuần; Lớp 3: 28-32 tiết/tuần; Lớp 4, 5: 30-32 tiết/tuần (35 phút/tiết)",
      annualHours: "~875 – 950 giờ chuẩn",
      classSizeAvg: "30 – 40+ học sinh/lớp (khu vực thành thị có thể cao hơn)",
      summary: "Chương trình GDPT 2018 đánh dấu bước ngoặt chuyển đổi căn bản từ nền giáo dục 'truyền thụ kiến thức một chiều' sang phát triển phẩm chất và năng lực người học, cấu trúc theo 5 phẩm chất chủ yếu và 10 năng lực cốt lõi.",
      officialSource: "Cổng Thông tin điện tử Bộ GD&ĐT (moet.gov.vn)",
      officialUrl: "https://moet.gov.vn",
      verificationStatus: "verified",
      contextNotes: "Đang trong quá trình hoàn thiện chu trình thay sách giáo khoa (1 chương trình nhiều bộ SGK). Thách thức lớn về sĩ số lớp đông ở đô thị, khoảng cách vùng miền và áp lực thi cử chuyển cấp.",
      highlights: [
        "Chuyển từ tiếp cận nội dung sang tiếp cận năng lực",
        "5 phẩm chất: Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm",
        "Mô hình 'Một chương trình, nhiều bộ sách giáo khoa'",
        "Dạy học 2 buổi/ngày là định hướng bắt buộc đối với cấp tiểu học"
      ],
      details: {
        systemOverview: "Hệ thống giáo dục quốc dân Việt Nam gồm giáo dục mầm non, giáo dục phổ thông (tiểu học 5 năm, THCS 4 năm, THPT 3 năm), giáo dục nghề nghiệp và đại học. Giáo dục tiểu học là bắt buộc và phổ cập.",
        curriculumStructure: "Gồm các môn học bắt buộc (Tiếng Việt, Toán, Đạo đức, Ngoại ngữ 1, Tự nhiên và Xã hội, Lịch sử và Địa lí, Khoa học, Tin học và Công nghệ, Giáo dục thể chất, Nghệ thuật) và Hoạt động trải nghiệm; môn tự chọn (Tiếng dân tộc thiểu số, Ngoại ngữ 1 ở lớp 1-2).",
        educationalPhilosophy: "Đào tạo con người Việt Nam phát triển toàn diện, có đạo đức, tri thức, sức khỏe, thẩm mỹ; phát huy tiềm năng và tính sáng tạo của mỗi cá nhân; phục vụ sự nghiệp xây dựng và bảo vệ Tổ quốc.",
        coreCompetencies: "3 năng lực chung (Tự chủ và tự học, Giao tiếp và hợp tác, Giải quyết vấn đề và sáng tạo) cùng 7 năng lực chuyên môn (Ngôn ngữ, Tính toán, Khoa học, Công nghệ, Tin học, Thẩm mỹ, Thể chất).",
        pedagogicalApproach: "Chuyển giao từ thuyết giảng truyền thống sang phương pháp tích cực: dạy học qua trò chơi, giải quyết vấn đề, thảo luận nhóm, hoạt động trải nghiệm thực hành.",
        assessmentMethod: "Thực hiện theo Thông tư 27/2020/TT-BGDĐT: Kết hợp đánh giá thường xuyên (nhận xét bằng lời, quan sát sự tiến bộ) và đánh giá định kỳ (bài kiểm tra cuối kỳ lấy điểm số từ 1-10 không dùng để so sánh học sinh)."
      }
    },
    {
      id: "finland",
      code: "FI",
      name: "Phần Lan",
      englishName: "Finland",
      flag: "🇫🇮",
      curriculumName: "National Core Curriculum for Basic Education 2014 (OPS 2014)",
      officialCode: "Finnish National Core Curriculum (OPS 2014 / 2016)",
      promulgationYear: "2014 (Chính thức áp dụng toàn quốc từ tháng 8/2016)",
      governingBody: "Cơ quan Giáo dục Quốc gia Phần Lan (Finnish National Agency for Education - OPH / Opetushallitus)",
      primaryYears: 6,
      gradeRange: "Grades 1 – 6 (trong hệ giáo dục cơ bản Peruskoulu 9 năm)",
      ageRange: "7 – 13 tuổi",
      schoolYearWeeks: "190 ngày học / năm (khoảng 38 tuần)",
      periodsPerWeek: "Lớp 1-2: tối thiểu 19-21 tiết; Lớp 3-4: 23-25 tiết; Lớp 5-6: 25-27 tiết/tuần (45-60 phút/tiết)",
      annualHours: "~600 – 720 giờ (thuộc nhóm thấp nhất khối OECD)",
      classSizeAvg: "18 – 22 học sinh/lớp",
      summary: "OPS 2014 của Phần Lan nổi tiếng toàn cầu với triết lý học tập dựa trên sự bình đẳng, hạnh phúc của học sinh, tin tưởng tuyệt đối vào năng lực sư phạm của giáo viên và tích hợp học tập theo hiện tượng (Phenomenon-Based Learning).",
      officialSource: "Finnish National Agency for Education (oph.fi)",
      officialUrl: "https://www.oph.fi/en/education-and-qualifications/national-core-curriculum-basic-education",
      verificationStatus: "verified",
      contextNotes: "Không có kỳ thi chuẩn hóa quốc gia ở bậc tiểu học. Trường học tự chủ cao độ trong xây dựng chương trình địa phương. Giáo viên 100% có bằng Thạc sĩ sư phạm.",
      highlights: [
        "Triết lý: 'Ít bài tập hơn, ít giờ học hơn, nghỉ ngơi nhiều hơn, hiệu quả cao hơn'",
        "Học tập theo hiện tượng (Phenomenon-Based Learning - PhBL) ít nhất 1 dự án liên môn/năm",
        "7 Năng lực chuyển đổi xuyên suốt (Transversal Competencies - T1 đến T7)",
        "Đánh giá hoàn toàn mang tính định hình (Formative), không chấm điểm số trước lớp 4/5"
      ],
      details: {
        systemOverview: "Hệ giáo dục cơ bản liên tục 9 năm (Peruskoulu) từ 7-16 tuổi, chia làm tiểu học (Grades 1-6) và THCS (Grades 7-9). Miễn phí toàn diện bao gồm ăn trưa, sách vở, y tế, đưa đón nếu xa nhà.",
        curriculumStructure: "Khung quốc gia đề ra các môn: Tiếng mẹ đẻ & Văn học, Ngôn ngữ thứ hai, Ngoại ngữ, Toán, Môi trường học (Khoa học - Địa lý - Sinh học), Tôn giáo/Đạo đức, Lịch sử, Âm nhạc, Mỹ thuật, Thủ công (Crafts), Thể dục, Kinh tế gia đình.",
        educationalPhilosophy: "Thúc đẩy học tập suốt đời, bình đẳng cơ hội, sự tham gia tích cực và sức khỏe tinh thần bền vững của trẻ em. Coi trọng thời gian chơi tự do (15 phút giải lao sau mỗi 45 phút học).",
        coreCompetencies: "7 năng lực xuyên môn: Tư duy và học cách học; Năng lực văn hóa, tương tác và biểu đạt; Tự chăm sóc và quản lý cuộc sống thường nhật; Năng lực đa đọc viết; Năng lực ICT; Năng lực làm việc và khởi nghiệp; Tham gia, can dự và xây dựng tương lai bền vững.",
        pedagogicalApproach: "Lấy người học làm trung tâm, thúc đẩy khám phá tự thân, dạy học ngoài trời, giải quyết vấn đề thực tế, khuyến khích sự hợp tác thay vì cạnh tranh.",
        assessmentMethod: "Đánh giá vì sự tiến bộ (Assessment FOR learning), phản hồi liên tục, học sinh tự đánh giá và đánh giá đồng đẳng. Điểm số chỉ xuất hiện từ lớp 4 hoặc lớp 6 tuỳ theo quy định địa phương."
      }
    },
    {
      id: "singapore",
      code: "SG",
      name: "Singapore",
      englishName: "Singapore",
      flag: "🇸🇬",
      curriculumName: "Primary Curriculum Framework & 'Learn for Life' Initiative",
      officialCode: "MOE Primary Curriculum Framework (2015, cập nhật 2021)",
      promulgationYear: "Ban hành 2015, liên tục cải cách với chính sách 'Learn for Life' (2019, 2021)",
      governingBody: "Bộ Giáo dục Singapore (Ministry of Education - MOE Singapore)",
      primaryYears: 6,
      gradeRange: "Primary 1 đến Primary 6 (P1 – P6)",
      ageRange: "7 – 12 tuổi",
      schoolYearWeeks: "40 tuần thực học (4 học kỳ chia 2 kỳ chính)",
      periodsPerWeek: "Khoảng 28 – 30 giờ/tuần (mỗi tiết 30 phút, học 5 ngày/tuần)",
      annualHours: "~950 – 1000 giờ chuẩn",
      classSizeAvg: "28 – 35 học sinh/lớp",
      summary: "Hệ thống giáo dục Singapore chuyển dịch mạnh mẽ từ mô hình thi cử cạnh tranh cao sang 'Học tập vì cuộc sống' (Learn for Life), chú trọng phát triển năng lực thế kỷ 21 (21CC), song ngữ và tư duy bậc cao.",
      officialSource: "Ministry of Education Singapore (moe.gov.sg)",
      officialUrl: "https://www.moe.gov.sg/primary/curriculum",
      verificationStatus: "verified",
      contextNotes: "Bãi bỏ toàn bộ kỳ thi xếp loại ở P1 và P2; cải cách cách tính điểm kỳ thi tốt nghiệp tiểu học PSLE năm 2021 chuyển sang hệ thống Achievement Levels (AL) để giảm áp lực phân loại.",
      highlights: [
        "Khung Năng lực Thế kỷ 21 (21st Century Competencies - 21CC)",
        "Giáo dục song ngữ bắt buộc: Tiếng Anh (ngôn ngữ giảng dạy chính) + Tiếng mẹ đẻ (Mother Tongue)",
        "Phương pháp dạy Toán nổi tiếng thế giới CPA (Concrete - Pictorial - Abstract)",
        "Mô hình Giáo dục Tính cách và Quyền công dân (Character and Citizenship Education - CCE)"
      ],
      details: {
        systemOverview: "Tiểu học 6 năm chia thành giai đoạn Nền tảng (Foundation stage: P1-P4) và giai đoạn Định hướng phân luồng theo môn (Subject-based Banding: P5-P6). Kết thúc bằng kỳ thi PSLE.",
        curriculumStructure: "Các môn học nòng cốt: Tiếng Anh, Tiếng mẹ đẻ (Hoa, Mã Lai, Tamil), Toán học, Khoa học (bắt đầu từ P3), Giáo dục Tính cách và Công dân (CCE), Nghệ thuật, Âm nhạc, Thể dục và Giáo dục Xã hội.",
        educationalPhilosophy: "Chuẩn bị cho học sinh thành những người tự tin, người học tự định hướng, người đóng góp tích cực và công dân có trách nhiệm.",
        coreCompetencies: "Giá trị cốt lõi (Tôn trọng, Trách nhiệm, Kiên cường, Liêm chính, Quan tâm, Hòa hợp); Năng lực cảm xúc xã hội (SEL); Năng lực thế kỷ 21 (Tư duy phản biện và sáng tạo, Giao tiếp, hợp tác và thông tin).",
        pedagogicalApproach: "Dạy học dựa trên truy vấn (Inquiry-based Learning) trong Khoa học; mô hình giải toán thanh bar model và CPA trong Toán học; học tập tích hợp công nghệ (EdTech).",
        assessmentMethod: "Đa dạng hóa công cụ đánh giá: Đánh giá quá trình (Holistic Assessment) ở các lớp dưới, bỏ thi định kỳ P1-P2; đánh giá tổng kết ở cuối tiểu học qua PSLE theo thang điểm AL1-AL8 thay cho điểm T-score trước đây."
      }
    },
    {
      id: "japan",
      code: "JP",
      name: "Nhật Bản",
      englishName: "Japan",
      flag: "🇯🇵",
      curriculumName: "National Curriculum Standards - Courses of Study (Gakushu Shido Yoryo)",
      officialCode: "MEXT Courses of Study for Elementary Schools (Ban hành 2017)",
      promulgationYear: "2017 (Chính thức áp dụng toàn quốc từ tháng 4/2020)",
      governingBody: "Bộ Giáo dục, Văn hóa, Thể thao, Khoa học và Công nghệ Nhật Bản (MEXT)",
      primaryYears: 6,
      gradeRange: "Lớp 1 đến Lớp 6 (Shogakko - 小学校)",
      ageRange: "6 – 12 tuổi",
      schoolYearWeeks: "35 tuần trở lên (thường 38-40 tuần, chia 3 học kỳ)",
      periodsPerWeek: "Lớp 1: 24 tiết; Lớp 2: 26 tiết; Lớp 3: 28 tiết; Lớp 4-6: 29 tiết/tuần (45 phút/tiết)",
      annualHours: "~780 – 900 giờ học chính khóa",
      classSizeAvg: "Khoảng 30-35 học sinh/lớp (đang có lộ trình giảm xuống 30 học sinh/lớp)",
      summary: "Chương trình tiểu học Nhật Bản chú trọng đào tạo toàn diện theo triết lý 'Ikiru Chikara' (Nghị lực sống / Zest for Living), kết hợp chặt chẽ giữa Trí tuệ (Chi) - Đạo đức (Toku) - Thể lực (Tai) thông qua hoạt động đặc biệt Tokkatsu.",
      officialSource: "Ministry of Education, Culture, Sports, Science and Technology (MEXT)",
      officialUrl: "https://www.mext.go.jp/en/policy/education/elsec/title02/detail02/1373859.htm",
      verificationStatus: "verified",
      contextNotes: "Nghiên cứu bài học (Lesson Study - Jugyokenkyu) là văn hóa sư phạm quốc gia giúp giáo viên liên tục cải tiến nghiệp vụ. Bữa ăn trưa học đường (Kyushoku) và việc học sinh tự dọn dẹp vệ sinh (Soji) là môn học đời sống cốt lõi.",
      highlights: [
        "Triết lý Zest for Living (Ikiru Chikara) - Học lực, Đạo đức và Thể chất",
        "Hoạt động giáo dục đặc biệt (Tokkatsu): Trực nhật ăn trưa, lau dọn trường lớp, sinh hoạt lớp",
        "Môn Đạo đức (Doutoku) được nâng cấp thành môn học chính thức có đánh giá định tính",
        "Môn Tiếng Anh chính thức đưa vào lớp 5-6 (lớp 3-4 là Hoạt động Ngoại ngữ trải nghiệm)"
      ],
      details: {
        systemOverview: "Hệ thống 6-3-3-4 (Tiểu học 6 năm, THCS 3 năm bắt buộc miễn học phí trong trường công lập). Bắt đầu năm học vào tháng 4 và kết thúc vào tháng 3 năm sau.",
        curriculumStructure: "Gồm các môn: Tiếng Nhật (Kokugo), Toán học, Nghiên cứu đời sống (Seikatsu - Lớp 1-2), Khoa học (từ Lớp 3), Xã hội (từ Lớp 3), Âm nhạc, Nghệ thuật & Thủ công, Gia công/Kinh tế gia đình (Lớp 5-6), Thể dục, Đạo đức, Ngoại ngữ, Thời gian học tập tích hợp (Sougou), Hoạt động đặc biệt (Tokkatsu).",
        educationalPhilosophy: "Xây dựng phẩm cách con người tự lập, giàu lòng trắc ẩn, yêu thiên nhiên và cộng đồng, có khả năng thích ứng linh hoạt trong kỷ nguyên xã hội 5.0.",
        coreCompetencies: "3 trụ cột cấu trúc: (1) Kiến thức và kỹ năng thực hành; (2) Năng lực tư duy, phán đoán và biểu đạt; (3) Ý chí học tập và nhân cách (Học tập tự chủ và định hướng cộng đồng).",
        pedagogicalApproach: "Dạy học chủ động, tương tác và sâu sắc (Active, Interactive and Deep Learning); thảo luận nhóm tìm cách giải đa dạng trong môn Toán; trải nghiệm thực tế.",
        assessmentMethod: "Đánh giá nội bộ tại trường học dựa trên mục tiêu chuẩn đầu ra môn học theo 3 trụ cột năng lực. Sổ ghi chép học tập (Tsushinbo) nhận xét chi tiết không xếp hạng thứ bậc cạnh tranh."
      }
    }
  ],

  // 2. TỔNG HỢP 8 TIÊU CHÍ SO SÁNH
  criteria: [
    {
      id: "muc-tieu",
      code: "C1",
      name: "Mục tiêu giáo dục",
      englishName: "Educational Objectives & Philosophy",
      weight: 1.0,
      description: "Mục tiêu tổng thể của chương trình tiểu học, định hướng phát triển học sinh, triết lý giáo dục phẩm chất và năng lực.",
      indicators: [
        "Mục tiêu tổng quát và triết lý đào tạo",
        "Định hướng phát triển nhân cách và thể chất",
        "Cân bằng giữa phẩm chất cá nhân và nghĩa vụ công dân"
      ],
      rubricExplanation: {
        1: "Tập trung thuần túy vào truyền đạt kiến thức học thuật và chuẩn bị cho kỳ thi, thiếu định hướng phát triển nhân cách toàn diện.",
        2: "Bắt đầu đề cập đến giáo dục toàn diện nhưng mục tiêu chủ đạo vẫn nặng về thi cử và ghi nhớ kiến thức.",
        3: "Xác định rõ ràng mục tiêu phát triển phẩm chất và năng lực, có khung lý thuyết chuẩn hóa nhưng tính đồng bộ trong thực tế chưa cao.",
        4: "Định hướng năng lực và nhân cách rất rõ nét, mục tiêu giáo dục được cụ thể hóa bằng hành vi người học và chuẩn bị cho thế kỷ 21.",
        5: "Triết lý giáo dục nhân văn sâu sắc, tập trung vào hạnh phúc người học, quyền trẻ em, học tập suốt đời và sự công bằng xã hội tối đa."
      },
      scores: {
        vietnam: 3.8,
        finland: 5.0,
        singapore: 4.6,
        japan: 4.8
      },
      comparison: {
        vietnam: "Mục tiêu hình thành 5 phẩm chất (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm) và 10 năng lực. Mục tiêu nhân văn và toàn diện, đang nỗ lực thoát khỏi quán tính chạy theo điểm số.",
        finland: "Mục tiêu thúc đẩy hạnh phúc học đường, sự công bằng, tư duy độc lập và niềm vui học tập. Học sinh được xem là chủ thể tích cực tự xây dựng nhận thức bản thân.",
        singapore: "Mục tiêu cân bằng giữa đào tạo năng lực thế kỷ 21 (21CC), tư duy xuất sắc với phát triển tính cách và trách nhiệm công dân thông qua chương trình 'Learn for Life'.",
        japan: "Mục tiêu theo triết lý 'Ikiru Chikara' (Nghị lực sống): Cân bằng hài hòa giữa Học lực (Chi), Phẩm chất đạo đức (Toku) và Thể lực (Tai); đào tạo con người hòa nhập cộng đồng."
      },
      similarities: "Cả 4 quốc gia đều đã chuyển từ tiếp cận nội dung (Content-based) sang tiếp cận năng lực (Competency-based), coi trọng giáo dục giá trị nhân văn, phẩm chất đạo đức và kỹ năng xã hội.",
      differences: "Phần Lan ưu tiên hạnh phúc và bình đẳng tuyệt đối; Singapore hướng tới năng lực cạnh tranh toàn cầu và tính cách kiên cường; Nhật Bản nhấn mạnh trách nhiệm cộng đồng và sự cần cù; Việt Nam đang trong giai đoạn chuyển giao mạnh mẽ giữa mục tiêu lý thuyết và thực tiễn thi cử.",
      prosAndCons: {
        pros: "Khung mục tiêu hiện đại của các nước đều hướng đến phát triển con người trọn vẹn, không đơn thuần là cung cấp kiến thức.",
        cons: "Khoảng cách giữa mục tiêu văn bản và thực tiễn triển khai (như áp lực thi cử chuyển cấp ở Việt Nam và Singapore) vẫn là rào cản lớn."
      }
    },
    {
      id: "cau-truc-mon-hoc",
      code: "C2",
      name: "Cấu trúc môn học",
      englishName: "Subject Structure & Curricular Organization",
      weight: 1.0,
      description: "Các môn học bắt buộc, tự chọn, mức độ tích hợp liên môn và cách thức tổ chức các lĩnh vực học tập.",
      indicators: [
        "Danh mục môn học bắt buộc và tự chọn",
        "Mức độ tích hợp môn học ở các khối lớp đầu",
        "Tổ chức các hoạt động giáo dục đặc thù (nghệ thuật, thể chất, trải nghiệm)"
      ],
      rubricExplanation: {
        1: "Phân chia môn học rời rạc, cứng nhắc, không có môn tự chọn hoặc môn tích hợp.",
        2: "Có một số môn tích hợp nhưng cấu trúc còn nặng về phân môn truyền thống.",
        3: "Tích hợp rõ ở các lớp 1-3 (Tự nhiên & Xã hội, Đời sống), bắt đầu phân hóa ở lớp 4-5, có hoạt động trải nghiệm.",
        4: "Cấu trúc môn học linh hoạt, tích hợp liên môn tốt, có các môn học dự án và kỹ năng mềm.",
        5: "Tích hợp đa ngành sâu sắc, bắt buộc học tập theo hiện tượng (Phenomenon-based), ranh giới giữa các môn học mang tính mở."
      },
      scores: {
        vietnam: 3.6,
        finland: 4.9,
        singapore: 4.4,
        japan: 4.6
      },
      comparison: {
        vietnam: "10-11 môn học bắt buộc. Tích hợp Khoa học & Xã hội ở lớp 1-3 qua môn Tự nhiên và Xã hội, tách thành Khoa học, Lịch sử và Địa lí từ lớp 4. Có Hoạt động trải nghiệm là thành phần bắt buộc.",
        finland: "Cấu trúc linh hoạt theo cụm lĩnh vực. Đưa vào các học phần hiện tượng liên môn (Phenomenon-Based Learning) tối thiểu 1 chủ đề mở rộng/năm học mà toàn trường cùng tham gia.",
        singapore: "Cấu trúc tập trung vào nền tảng vững chắc (Anh văn, Toán, Tiếng mẹ đẻ, Khoa học từ P3). Có cơ chế phân luồng theo môn (Subject-Based Banding) ở P5-P6 để hỗ trợ năng lực từng em.",
        japan: "Tích hợp ở lớp 1-2 qua môn 'Nghiên cứu đời sống' (Seikatsu). Điểm đặc thù là dành thời lượng riêng cho 'Thời gian học tập tích hợp' (Sougou) và 'Hoạt động đặc biệt' (Tokkatsu)."
      },
      similarities: "Đều áp dụng nguyên tắc tích hợp cao ở các khối lớp dưới (Lớp 1-2 hoặc 1-3) và bắt đầu phân hóa chuyên sâu hơn ở các khối lớp cuối cấp tiểu học.",
      differences: "Việt Nam và Singapore có số môn học quy định chi tiết hơn; Phần Lan mở rộng cho địa phương tự định hình môn học tự chọn; Nhật Bản tích hợp các kỹ năng đời sống thực tế (nấu ăn, may vá, trực nhật) vào chính khóa.",
      prosAndCons: {
        pros: "Tích hợp môn giúp giảm tải số lượng đầu sách và gắn kết tri thức với đời sống.",
        cons: "Giáo viên tiểu học tại Việt Nam còn gặp khó khăn khi dạy các mạch kiến thức liên môn (như Lịch sử - Địa lí kết hợp)."
      }
    },
    {
      id: "thoi-luong-hoc",
      code: "C3",
      name: "Thời lượng học tập",
      englishName: "Instructional Time & Calendar",
      weight: 0.9,
      description: "Số giờ học hàng năm, số ngày học, số năm tiểu học, sự cân đối giữa học tập và nghỉ ngơi.",
      indicators: [
        "Tổng số giờ học chính khóa quy đổi/năm",
        "Số năm tiểu học (5 năm vs 6 năm)",
        "Tỷ lệ thời gian dành cho giải lao, vận động và hoạt động ngoài trời"
      ],
      rubricExplanation: {
        1: "Thời lượng học kéo dài quá mức, áp lực giờ học trên lớp cao, thời gian giải lao tối thiểu, học thêm tràn lan.",
        2: "Giờ học trên lớp ở mức cao, ít không gian giải lao, học 2 buổi/ngày nhưng nội dung học tập lặp lại.",
        3: "Thời lượng học tập trung bình (800-900h/năm), cân bằng bước đầu giữa học tập và hoạt động thể chất.",
        4: "Thời lượng tối ưu, phân bổ khoa học, có thời gian nghỉ ngắn xen kẽ giữa các tiết hợp lý.",
        5: "Thời lượng học trong lớp tối giản nhất nhưng hiệu quả cao nhất (dưới 700h/năm), 15 phút giải lao ngoài trời sau mỗi tiết học."
      },
      scores: {
        vietnam: 3.4,
        finland: 5.0,
        singapore: 3.9,
        japan: 4.2
      },
      comparison: {
        vietnam: "5 năm tiểu học. Quy định dạy 2 buổi/ngày (tối đa 7 tiết/ngày, 35 phút/tiết). Tổng thời lượng ~875-950 giờ/năm. Thực tế nhiều học sinh thành thị còn học thêm ngoài giờ.",
        finland: "6 năm tiểu học. Số giờ học chính khóa thấp nhất khối OECD (~600-700 giờ/năm). Mỗi tiết 45 phút luôn kèm 15 phút chơi tự do ngoài trời bất kể thời tiết.",
        singapore: "6 năm tiểu học. Thời lượng tập trung cao độ (~950-1000 giờ/năm). Các hoạt động ngoại khóa CCA (Co-Curricular Activities) chiếm vị trí quan trọng từ lớp 3.",
        japan: "6 năm tiểu học. Tổng thời lượng ~780-900 giờ/năm (45 phút/tiết). Học sinh tham gia cả kỳ nghỉ hè với các câu lạc bộ và bài tập dự án tự nghiên cứu (Jiyu Kenkyu)."
      },
      similarities: "Các nước phát triển đều duy trì chế độ học cả ngày với nhiều hoạt động phát triển thể chất và tinh thần trong khuôn viên trường.",
      differences: "Việt Nam có hệ tiểu học 5 năm (kết thúc ở 11 tuổi), trong khi Phần Lan, Singapore, Nhật Bản đều là 6 năm (kết thúc ở 12-13 tuổi). Phần Lan có thời lượng học ít nhất nhưng điểm PISA thuộc top đầu.",
      prosAndCons: {
        pros: "Phần Lan chứng minh học ít giờ hơn nhưng tập trung và nghỉ ngơi nhiều hơn mang lại hiệu quả bền vững.",
        cons: "Thời lượng học 5 năm ở Việt Nam khiến khối lượng kiến thức bị nén lại, gây áp lực lên học sinh lứa tuổi 6-10."
      }
    },
    {
      id: "nang-luc-hoc-sinh",
      code: "C4",
      name: "Năng lực học sinh",
      englishName: "Core Competencies & Student Literacies",
      weight: 1.1,
      description: "Khung năng lực cốt lõi, năng lực tư duy, năng lực thế kỷ 21, kỹ năng tự học và giải quyết vấn đề.",
      indicators: [
        "Khung chuẩn năng lực quốc gia rõ ràng",
        "Năng lực tự chủ, tự học và giải quyết vấn đề",
        "Năng lực kỹ thuật số, công dân toàn cầu và sáng tạo"
      ],
      rubricExplanation: {
        1: "Chỉ đo lường khả năng ghi nhớ và tái hiện kiến thức sách giáo khoa.",
        2: "Khung năng lực mang tính khái niệm chung, chưa có chỉ báo hành vi đo lường được.",
        3: "Có khung năng lực chung và chuyên môn với các yêu cầu cần đạt cụ thể theo từng khối lớp.",
        4: "Khung năng lực thế kỷ 21 được tích hợp triệt để vào từng bài học, dự án và tiêu chí đánh giá.",
        5: "Học sinh làm chủ hoàn toàn quá trình tự học, tư duy phản biện xuất sắc, thích ứng linh hoạt với bối cảnh xã hội đa biến."
      },
      scores: {
        vietnam: 3.7,
        finland: 4.9,
        singapore: 4.8,
        japan: 4.7
      },
      comparison: {
        vietnam: "Quy định 3 năng lực chung (Tự chủ & tự học, Giao tiếp & hợp tác, Giải quyết vấn đề & sáng tạo) và 7 năng lực đặc thù. Yêu cầu cần đạt được lượng hóa thành bảng biểu chi tiết.",
        finland: "7 Năng lực chuyển dịch (Transversal Competencies - T1-T7): Tư duy và học cách học, Đa đọc viết, Năng lực văn hóa, Năng lực số, Khởi nghiệp, Tham gia xã hội bền vững.",
        singapore: "Khung 21CC với mô hình vòng tròn đồng tâm: Lõi là Giá trị cốt lõi -> Kỹ năng cảm xúc xã hội (SEL) -> Năng lực thế kỷ 21 (Tư duy phản biện, Công dân toàn cầu).",
        japan: "3 Trụ cột năng lực: (1) Kiến thức & kỹ năng thực tế; (2) Năng lực tư duy, phán đoán & biểu đạt; (3) Nỗ lực học tập & nhân cách hướng thiện."
      },
      similarities: "Cả 4 khung chương trình đều coi 'Học cách học' (Learning to learn), tự chủ và giải quyết vấn đề là năng lực sống còn của học sinh tiểu học.",
      differences: "Singapore đặt nặng tư duy phản biện và năng lực số; Phần Lan nhấn mạnh khả năng tự quản lý đời sống và tư duy vì môi trường bền vững; Nhật Bản lồng ghép năng lực hợp tác qua công việc thực tế.",
      prosAndCons: {
        pros: "Khung năng lực giúp giáo viên chuyển đổi cách soạn giáo án từ 'dạy cái gì' sang 'học sinh làm được cái gì'.",
        cons: "Việc đo lường năng lực mang tính định tính cao, dễ dẫn đến hiện tượng đánh giá hình thức nếu thiếu công cụ chuẩn."
      }
    },
    {
      id: "noi-dung-chuong-trinh",
      code: "C5",
      name: "Nội dung chương trình",
      englishName: "Curriculum Content & Real-World Integration",
      weight: 1.0,
      description: "Nội dung kiến thức, tính thực tiễn, mức độ gắn kết với đời sống địa phương, mức độ quá tải.",
      indicators: [
        "Tính cập nhật và hiện đại của tri thức",
        "Sự gắn kết với thực tiễn đời sống và địa phương",
        "Mức độ vừa sức và phù hợp tâm sinh lý lứa tuổi tiểu học"
      ],
      rubricExplanation: {
        1: "Nội dung hàn lâm, xa rời thực tế, quá tải so với lứa tuổi, nặng tính lý thuyết trừu tượng.",
        2: "Nội dung đã giảm tải một phần nhưng vẫn nặng tính lý thuyết, thiếu tính địa phương hóa.",
        3: "Nội dung có tính mở, gắn với thực tiễn, có nội dung giáo dục địa phương, mức độ vừa sức tương đối.",
        4: "Nội dung tinh gọn, hiện đại, tích hợp công nghệ, tính ứng dụng đời sống cao.",
        5: "Nội dung hoàn toàn mở, phát triển từ đời sống thực của học sinh và hiện tượng xã hội, kích thích sáng tạo vô hạn."
      },
      scores: {
        vietnam: 3.5,
        finland: 4.8,
        singapore: 4.5,
        japan: 4.6
      },
      comparison: {
        vietnam: "Nội dung mở, có khung giáo dục địa phương. Tuy nhiên giai đoạn đầu triển khai SGK mới (đặc biệt là môn Tiếng Việt và Toán lớp 1) nhận phản hồi là tốc độ khá nhanh so với trẻ 6 tuổi.",
        finland: "Nội dung không quy định chi tiết từng bài học trong văn bản quốc gia. Nhà trường và giáo viên tự chọn tài liệu giảng dạy phù hợp nhất với học sinh tại địa phương mình.",
        singapore: "Nội dung được cấu trúc cực kỳ chặt chẽ, tuần tự theo xoắn ốc (Spiral Curriculum). Môn Khoa học và Toán ứng dụng ví dụ thực tiễn đời sống đô thị và công nghệ cao.",
        japan: "Nội dung hài hòa giữa tri thức cơ bản và giáo dục đời sống: cách băng qua đường an toàn, cách trồng cây, nấu cơm, may vá, bảo vệ môi trường, phòng chống thiên tai động đất."
      },
      similarities: "Đều xây dựng nội dung theo mô hình phát triển đồng tâm hoặc xoắn ốc, kiến thức nâng cao dần từ cụ thể đến trừu tượng theo từng khối lớp.",
      differences: "Phần Lan để ngỏ nội dung cho địa phương quyết định nhiều nhất; Singapore chuẩn hóa nội dung cao nhất; Nhật Bản kết hợp mật thiết nội dung kỹ năng sinh tồn và phòng chống rủi ro thiên tai.",
      prosAndCons: {
        pros: "Chương trình mở cho phép địa phương hóa nội dung bài học theo đặc thù văn hóa vùng miền.",
        cons: "Sự chênh lệch về điều kiện kinh tế - xã hội khiến cùng một nội dung nhưng học sinh vùng sâu vùng xa khó tiếp cận hơn học sinh đô thị."
      }
    },
    {
      id: "phuong-phap-day-hoc",
      code: "C6",
      name: "Phương pháp dạy học",
      englishName: "Pedagogical Approaches & Student Agency",
      weight: 1.1,
      description: "Dạy học truyền thống vs lấy học sinh làm trung tâm, học qua chơi, dạy học dự án, trải nghiệm và công nghệ.",
      indicators: [
        "Mức độ áp dụng dạy học tích cực và lấy người học làm trung tâm",
        "Dạy học khám phá, giải quyết vấn đề, trải nghiệm thực tế",
        "Sự tự chủ của học sinh (Student Agency) trong lớp học"
      ],
      rubricExplanation: {
        1: "Thầy đọc trò chép, dạy học đồng loạt, áp đặt câu trả lời duy nhất, học sinh thụ động nghe giảng.",
        2: "Có hoạt động nhóm và thảo luận nhưng mang tính hình thức, giáo viên vẫn kiểm soát hoàn toàn bài học.",
        3: "Áp dụng phổ biến các phương pháp tích cực: trò chơi, sơ đồ tư duy, làm việc nhóm, thực hành.",
        4: "Dạy học qua dự án, giải quyết vấn đề thực tế, khuyến khích học sinh phản biện và sáng tạo cách giải mới.",
        5: "Cá nhân hóa việc học tuyệt đối, học sinh đồng kiến tạo bài học, dạy học ngoài trời, học qua hiện tượng và nghiên cứu độc lập."
      },
      scores: {
        vietnam: 3.6,
        finland: 5.0,
        singapore: 4.5,
        japan: 4.8
      },
      comparison: {
        vietnam: "Chủ trương đổi mới phương pháp dạy học tích cực, tổ chức góc học tập, dạy học dự án. Thách thức lớn là sĩ số lớp học 40-50 em tại các thành phố lớn gây khó khăn cho việc cá nhân hóa.",
        finland: "Phương pháp lấy học sinh làm trung tâm tuyệt đối. Dạy học không bức tường (ngoài trời, bảo tàng), không gian lớp học mở và linh hoạt (học sinh có thể ngồi sofa, nằm thảm hoặc đứng khi học).",
        singapore: "Áp dụng phương pháp CPA (Vật thể cụ thể -> Hình ảnh đại diện -> Ký hiệu trừu tượng) trong Toán học; phương pháp Enquiry-based trong Khoa học; tích hợp công nghệ AI và nền tảng Student Learning Space (SLS).",
        japan: "Phương pháp 'Nghiên cứu bài học' (Lesson Study): giáo viên cùng soạn, dự giờ và mổ xẻ từng phản ứng của học sinh. Khuyến khích học sinh tự tìm nhiều cách giải khác nhau cho cùng một bài toán (Neriage)."
      },
      similarities: "Cả 4 nước đều kiên quyết bài trừ lối dạy truyền thụ một chiều, khuyến khích học sinh chủ động đặt câu hỏi và tương tác hợp tác.",
      differences: "Phần Lan trao quyền tự do lựa chọn cách học tối đa cho học sinh; Nhật Bản xây dựng văn hóa hợp tác cộng đồng qua phương pháp thảo luận nhóm Neriage; Singapore kiểm soát phương pháp sư phạm khoa học bằng công cụ số.",
      prosAndCons: {
        pros: "Dạy học trải nghiệm giúp học sinh hứng thú và nhớ lâu kiến thức.",
        cons: "Cần cơ sở vật chất đầy đủ và sĩ số lớp lý tưởng (dưới 30 em) để các phương pháp tích cực phát huy tối đa hiệu quả."
      }
    },
    {
      id: "danh-gia-hoc-sinh",
      code: "C7",
      name: "Đánh giá học sinh",
      englishName: "Assessment & Feedback Practices",
      weight: 1.1,
      description: "Đánh giá thường xuyên, đánh giá định kỳ, đánh giá năng lực quá trình, vai trò của điểm số và thi cử.",
      indicators: [
        "Cân bằng giữa đánh giá quá trình (Formative) và đánh giá tổng kết (Summative)",
        "Giảm áp lực thi cử và xếp loại học sinh ở bậc tiểu học",
        "Học sinh tự đánh giá và nhận phản hồi mô tả sự tiến bộ"
      ],
      rubricExplanation: {
        1: "Thuần túy dùng điểm số đơn nhất, xếp hạng thứ bậc công khai gây áp lực và mặc cảm cho học sinh.",
        2: "Chủ yếu dựa vào các bài kiểm tra định kỳ bằng điểm số, có nhận xét nhưng mang tính đối phó.",
        3: "Kết hợp nhận xét thường xuyên bằng lời và điểm số định kỳ cuối kỳ, không xếp hạng học sinh.",
        4: "Đánh giá đa dạng bằng hồ sơ học tập (portfolio), bảng rubric năng lực rõ ràng, hạn chế tối đa điểm số lớp dưới.",
        5: "Hoàn toàn là đánh giá vì sự tiến bộ của người học (Assessment FOR learning), không điểm số trước 10-12 tuổi, không thi chuẩn hóa quốc gia."
      },
      scores: {
        vietnam: 3.5,
        finland: 5.0,
        singapore: 4.3,
        japan: 4.6
      },
      comparison: {
        vietnam: "Quy định theo Thông tư 27/2020: Đánh giá bằng nhận xét đối với các môn học thường xuyên; kiểm tra định kỳ bằng điểm số ở cuối kỳ (Lớp 1-3 kiểm tra Tiếng Việt, Toán; Lớp 4-5 thêm Tiếng Anh, KH, Sử-Địa, Tin). Không xếp loại học lực.",
        finland: "Không có bất kỳ kỳ thi chuẩn hóa quốc gia nào ở cấp tiểu học. Không chấm điểm số trước lớp 4. Đánh giá dựa trên phản hồi cá nhân mang tính động viên và hướng dẫn cách khắc phục.",
        singapore: "Cải cách lớn: Bỏ hoàn toàn kiểm tra định kỳ ở P1 và P2. Áp dụng đánh giá toàn diện (Holistic Assessment). Thi tốt nghiệp tiểu học PSLE chuyển sang hệ thống phân nhóm AL1-AL8 để giảm so đo từng điểm số lẻ.",
        japan: "Đánh giá dựa trên mục tiêu đầu ra 3 trụ cột. Giáo viên ghi nhận xét toàn diện vào Sổ liên lạc (Tsushinbo) về cả học lực, thái độ cư xử và sự đóng góp cho tập thể lớp. Không công bố bảng xếp hạng."
      },
      similarities: "Đều có xu hướng giảm nhẹ gánh nặng thi cử ở các lớp đầu cấp tiểu học và chuyển trọng tâm sang đánh giá quá trình để hỗ trợ học sinh học tập.",
      differences: "Phần Lan bài trừ triệt để thi cử chuẩn hóa; Singapore vẫn duy trì kỳ thi chuyển cấp PSLE có tính phân luồng cao; Việt Nam tuy cấm thi tuyển vào lớp 6 công lập nhưng các trường 'chất lượng cao' vẫn tổ chức khảo sát năng lực cạnh tranh gắt gao.",
      prosAndCons: {
        pros: "Đánh giá nhận xét giúp giảm stress học đường và bảo vệ sự tự tin của trẻ em.",
        cons: "Phụ huynh tại các nước Á Đông (Việt Nam, Singapore) có tâm lý hoang mang khi không có điểm số cụ thể để so sánh năng lực của con."
      }
    },
    {
      id: "quan-ly-chuong-trinh",
      code: "C8",
      name: "Quản lý và triển khai",
      englishName: "Governance, School & Teacher Autonomy",
      weight: 0.9,
      description: "Cấp quản lý chương trình, mức độ tự chủ của nhà trường, tính linh hoạt, vai trò và năng lực của giáo viên.",
      indicators: [
        "Mức độ phân cấp và tự chủ của nhà trường (School-based curriculum)",
        "Quyền tự chủ chuyên môn và sự tin cậy dành cho giáo viên",
        "Cơ chế bồi dưỡng chuyên môn thường xuyên và điều kiện cơ sở vật chất"
      ],
      rubricExplanation: {
        1: "Quản lý tập trung tuyệt đối, giáo viên phải tuân thủ nghiêm ngặt từng tiết dạy theo phân phối chương trình định sẵn.",
        2: "Bắt đầu có sự phân cấp hành chính nhưng nhà trường và giáo viên vẫn bị ràng buộc bởi nhiều hồ sơ sổ sách và kiểm tra gắt gao.",
        3: "Nhà trường được tự chủ xây dựng kế hoạch giáo dục theo khung quốc gia, giáo viên được chủ động điều chỉnh thời lượng bài học.",
        4: "Phân quyền quản lý mạnh mẽ, nhà trường tự chủ tài chính và chuyên môn, giáo viên được xem là chuyên gia sư phạm.",
        5: "Xã hội và nhà nước tin cậy tuyệt đối vào giáo viên (100% bằng Thạc sĩ), không thanh tra kiểm tra hành chính phiền hà, nhà trường tự thiết kế chương trình địa phương."
      },
      scores: {
        vietnam: 3.4,
        finland: 5.0,
        singapore: 4.4,
        japan: 4.7
      },
      comparison: {
        vietnam: "Bộ GD&ĐT ban hành chương trình khung; trường tiểu học được tự chủ xây dựng Kế hoạch giáo dục nhà trường; tổ chuyên môn và giáo viên linh hoạt sắp xếp bài học. Tuy nhiên áp lực thanh tra, hồ sơ sổ sách và chỉ tiêu thành tích vẫn còn đè nặng.",
        finland: "Mô hình phi tập trung hóa cao nhất thế giới. Cơ quan quốc gia chỉ đưa ra khung định hướng; hội đồng thành phố và hiệu trưởng cùng giáo viên tự viết chương trình chi tiết cho trường mình. Không có thanh tra giáo dục.",
        singapore: "Mô hình quản lý tập trung hóa chiến lược nhưng phân cấp thực thi linh hoạt (Centralised decentralisation). MOE định hướng chuẩn mực và hỗ trợ tài nguyên sư phạm số cực mạnh cho từng trường.",
        japan: "Sự kết hợp hoàn hảo giữa chuẩn quốc gia MEXT và văn hóa tự chủ chuyên môn từ dưới lên thông qua sinh hoạt chuyên môn 'Nghiên cứu bài học' (Jugyokenkyu) tại từng trường học."
      },
      similarities: "Cả 4 quốc gia đều nhận thức sâu sắc rằng giáo viên chính là nhân tố quyết định thành bại của việc đổi mới chương trình.",
      differences: "Phần Lan trao quyền tự chủ tuyệt đối dựa trên sự tin tưởng nghề nghiệp cao; Việt Nam và Singapore vẫn duy trì hệ thống quản lý định hướng chặt chẽ từ trên xuống; Nhật Bản gắn kết quyền tự chủ với trách nhiệm tập thể đồng nghiệp.",
      prosAndCons: {
        pros: "Tự chủ giúp nhà trường sáng tạo các mô hình dạy học phù hợp với học sinh của mình.",
        cons: "Nếu năng lực giáo viên chưa đồng đều hoặc thiếu cơ chế hỗ trợ sẽ dẫn đến tình trạng lúng túng hoặc quá tải công việc hành chính."
      }
    }
  ],

  // 3. THANG ĐO VÀ ĐIỂM SỐ RADAR (1 - 5)
  radarRubrics: {
    scale: "1.0 đến 5.0 (Bước nhảy 0.1)",
    levels: [
      { score: "1.0 - 1.9", label: "Truyền thống / Thiếu linh hoạt", desc: "Nặng về tiếp cận nội dung hàn lâm, quản lý hành chính áp đặt, đánh giá nặng điểm số và áp lực thi cử." },
      { score: "2.0 - 2.9", label: "Bước đầu đổi mới", desc: "Đã có chủ trương đổi mới nhưng triển khai còn chắp vá, giáo viên lúng túng, điều kiện hỗ trợ hạn chế." },
      { score: "3.0 - 3.9", label: "Chuẩn hóa & Đang chuyển dịch", desc: "Khung năng lực rõ ràng, kết hợp đánh giá quá trình, bắt đầu trao quyền tự chủ chuyên môn cho nhà trường (Điển hình: Việt Nam CT 2018)." },
      { score: "4.0 - 4.7", label: "Hiện đại & Định hướng năng lực cao", desc: "Hệ thống vận hành trơn tru, phương pháp dạy học sáng tạo, ứng dụng công nghệ mạnh mẽ, chuẩn hóa quốc tế (Điển hình: Singapore, Nhật Bản)." },
      { score: "4.8 - 5.0", label: "Hệ sinh thái tối ưu & Nhân văn bền vững", desc: "Lấy hạnh phúc người học làm trọng tâm, tự chủ và tin cậy nghề nghiệp tuyệt đối, triết lý giáo dục vì tương lai (Điển hình: Phần Lan)." }
    ]
  },

  // 4. KHUYẾN NGHỊ CÓ ĐIỀU KIỆN ÁP DỤNG TẠI VIỆT NAM (5 ĐỀ XUẤT)
  recommendations: [
    {
      id: "rec-1",
      title: "Tăng quyền tự chủ sư phạm thực chất cho giáo viên và tinh giản hồ sơ sổ sách hành chính",
      referenceCountry: "Phần Lan & Nhật Bản",
      referenceCountryCodes: ["finland", "japan"],
      vietnamIssue: "Giáo viên tiểu học Việt Nam hiện vẫn chịu áp lực rất lớn từ hệ thống hồ sơ, sổ sách, giáo án điện tử, các đợt thi đua, thao giảng mang tính hình thức và nỗi sợ bị kiểm tra thanh tra, làm hạn chế sự sáng tạo sư phạm.",
      databaseGrounding: "Chương trình OPS 2014 của Phần Lan (trao quyền tự chủ 100% cho giáo viên không có thanh tra giáo dục) và Văn hóa Lesson Study của Nhật Bản (giáo viên tự học tập qua sinh hoạt chuyên môn thực chất).",
      conditions: "Áp dụng có điều kiện: Cần chuẩn hóa năng lực giáo viên thông qua bồi dưỡng thường xuyên; chuyển đổi số thực chất trong quản trị nhà trường để xóa bỏ việc in ấn hồ sơ giấy tờ trùng lặp.",
      adjustments: "Không thể bỏ hoàn toàn khâu quản lý giám sát ngay lập tức; cần thiết lập cơ chế giám sát hỗ trợ (Supportive supervision) thay vì thanh tra bắt lỗi; trao quyền cho tổ chuyên môn quyết định thời lượng dạy từng bài.",
      challenges: "Tâm lý ỷ lại vào sách giáo khoa của một bộ phận giáo viên lâu năm; sức ì quản lý từ các cấp phòng/sở giáo dục thích kiểm tra hình thức hành chính.",
      solutions: "Ban hành thông tư tinh giản tối đa hồ sơ sổ sách (chỉ duy trì giáo án cá nhân và sổ theo dõi tiến bộ học sinh trên hệ thống số); tổ chức sinh hoạt chuyên môn theo hướng nghiên cứu bài học thay vì chấm điểm tiết dạy.",
      targetAudience: "Bộ GD&ĐT, Sở/Phòng GD&ĐT, Hiệu trưởng các trường tiểu học, Giáo viên trực tiếp đứng lớp.",
      priority: "Cao (Priority 1)",
      feasibilityScore: 88,
      feasibilityLabel: "Rất khả thi (88%)"
    },
    {
      id: "rec-2",
      title: "Đổi mới triệt để đánh giá quá trình và giải tỏa áp lực thi tuyển chuyển cấp vào lớp 6",
      referenceCountry: "Phần Lan & Singapore",
      referenceCountryCodes: ["finland", "singapore"],
      vietnamIssue: "Mặc dù Thông tư 27/2020 quy định đánh giá tiểu học bằng nhận xét, nhưng cuộc chạy đua vào các trường THCS trọng điểm/chất lượng cao tại các đô thị lớn tạo ra làn sóng học thêm, luyện thi từ lớp 2-3, bóp méo mục tiêu giáo dục toàn diện.",
      databaseGrounding: "Phần Lan không tổ chức thi chuẩn hóa ở tiểu học; Singapore cải cách kỳ thi PSLE sang hệ thống Achievement Levels (AL) để giảm việc so đo điểm thập phân và bãi bỏ toàn bộ thi cử ở P1-P2.",
      conditions: "Đồng bộ hóa mạng lưới trường lớp THCS chất lượng tương đương để giảm nhu cầu dồn vào trường điểm; minh bạch hóa tiêu chí xét tuyển dựa trên hồ sơ học tập đa trí thông minh.",
      adjustments: "Tại các thành phố lớn chưa đủ chỗ học công lập tốt, việc xét tuyển vào lớp 6 cần kết hợp đánh giá năng lực tư duy logic và phỏng vấn trực tiếp ngắn, không dùng đề thi học thuật quá tải.",
      challenges: "Tâm lý chuộng bằng cấp, thành tích của phụ huynh Á Đông; sự chênh lệch chất lượng giữa các trường THCS công lập.",
      solutions: "Đầu tư đồng bộ cơ sở vật chất cho các trường THCS vệ tinh; hướng dẫn giáo viên kỹ thuật viết nhận xét định lượng tiến bộ học sinh chi tiết, thay vì những câu nhận xét rập khuôn; phổ biến cho phụ huynh hiểu rõ triết lý đánh giá vì sự tiến bộ.",
      targetAudience: "Cục Quản lý chất lượng (Bộ GD&ĐT), Phòng GD&ĐT quận/huyện, Phụ huynh học sinh.",
      priority: "Cao (Priority 1)",
      feasibilityScore: 78,
      feasibilityLabel: "Khả thi có điều kiện (78%)"
    },
    {
      id: "rec-3",
      title: "Đưa các hoạt động tự phục vụ và kỹ năng sinh tồn học đường (mô hình Tokkatsu) vào giờ bán trú",
      referenceCountry: "Nhật Bản",
      referenceCountryCodes: ["japan"],
      vietnamIssue: "Hoạt động trải nghiệm ở tiểu học Việt Nam đôi khi còn nặng tính biểu diễn, sân khấu hóa vào các ngày lễ; giờ ăn bán trú và vệ sinh trường lớp phần lớn giao cho nhân viên phục vụ, học sinh thiếu kỹ năng tự lập và tính cộng đồng.",
      databaseGrounding: "Mô hình Tokkatsu (Hoạt động đặc biệt) và Kyushoku (Bữa ăn trưa học đường), Soji (Học sinh tự dọn dẹp lớp học) trong Chương trình tiểu học MEXT Nhật Bản.",
      conditions: "Nhà trường có tổ chức bán trú; có sự đồng thuận và tin tưởng từ phía phụ huynh học sinh; đảm bảo các tiêu chuẩn an toàn vệ sinh thực phẩm và dụng cụ phù hợp với lứa tuổi.",
      adjustments: "Triển khai dần từng bước: Bắt đầu từ việc tự chia cơm, tự xếp gọn khay ăn, tự lau bàn học và sắp xếp giá sách cá nhân; không giao các công việc nặng nhọc hoặc nguy hiểm.",
      challenges: "Một bộ phận phụ huynh lo lắng con bị cực nhọc hoặc đóng tiền bán trú thì trường phải phục vụ; giáo viên chủ nhiệm thêm việc quản lý giờ ăn.",
      solutions: "Tập huấn cho giáo viên coi giờ ăn trưa và dọn dẹp là 'tiết học giáo dục nhân cách'; truyền thông với cha mẹ học sinh về giá trị của tính tự lập và lòng biết ơn đối với người lao động.",
      targetAudience: "Ban giám hiệu, Giáo viên chủ nhiệm, Nhân viên bán trú, Phụ huynh học sinh.",
      priority: "Trung bình (Priority 2)",
      feasibilityScore: 92,
      feasibilityLabel: "Rất khả thi (92%)"
    },
    {
      id: "rec-4",
      title: "Triển khai thí điểm các dự án học tập theo hiện tượng (Phenomenon-Based Learning) và STEM địa phương",
      referenceCountry: "Phần Lan & Singapore",
      referenceCountryCodes: ["finland", "singapore"],
      vietnamIssue: "Các môn học ở tiểu học Việt Nam dù đã có sách giáo khoa mới nhưng vẫn chủ yếu dạy theo từng bài học 35 phút riêng lẻ, thiếu các dự án liên môn gắn kết sâu rộng với vấn đề thực tế tại nơi học sinh sinh sống.",
      databaseGrounding: "Quy định bắt buộc tối thiểu 1 mô-đun học tập đa ngành (Multidisciplinary learning module) mỗi năm trong OPS 2014 Phần Lan; sáng kiến EdTech và STEM tích hợp của Singapore.",
      conditions: "Nhà trường được linh hoạt gom các tiết học của môn Khoa học, Lịch sử - Địa lí, Mỹ thuật và Hoạt động trải nghiệm thành tuần lễ dự án chuyên đề.",
      adjustments: "Không cần đầu tư thiết bị đắt tiền; dự án nên xuất phát từ những hiện tượng đời sống giản dị như: 'Cây xanh quanh trường em', 'Nước sạch và rác thải nhựa', 'Bảo tồn làng nghề quê hương'.",
      challenges: "Sĩ số lớp quá đông (40-45 học sinh) khó quản lý hoạt động trải nghiệm ngoài trời; giáo viên chưa được đào tạo về phương pháp thiết kế bài giảng tích hợp hiện tượng.",
      solutions: "Xây dựng ngân hàng học liệu mở gồm các chủ đề dự án mẫu phù hợp điều kiện Việt Nam; chia nhỏ nhóm học sinh kết hợp vai trò của phụ huynh tình nguyện viên hỗ trợ quản lý dự án.",
      targetAudience: "Tổ chuyên môn tiểu học, Giáo viên các môn Khoa học & Nghệ thuật, Viện Khoa học Giáo dục Việt Nam.",
      priority: "Trung bình (Priority 2)",
      feasibilityScore: 82,
      feasibilityLabel: "Khả thi (82%)"
    },
    {
      id: "rec-5",
      title: "Xây dựng cộng đồng học tập chuyên môn tại trường dựa trên mô hình 'Nghiên cứu bài học' (Lesson Study)",
      referenceCountry: "Nhật Bản",
      referenceCountryCodes: ["japan"],
      vietnamIssue: "Các buổi dự giờ thao giảng của giáo viên tiểu học ở Việt Nam nhiều nơi vẫn mang nặng tính 'soi xét giáo viên', chấm điểm thi đua, giáo viên chuẩn bị bài diễn tập trước dẫn đến sự căng thẳng và không phản ánh đúng thực tế lớp học.",
      databaseGrounding: "Văn hóa Jugyokenkyu (Lesson Study) của Nhật Bản: Giáo viên cùng nhau thiết kế một bài học, một người dạy và các đồng nghiệp tập trung quan sát nét mặt, thái độ và sự tiếp nhận của từng học sinh để cùng rút kinh nghiệm cải tiến.",
      conditions: "Ban giám hiệu trường cởi mở, loại bỏ hoàn toàn việc chấm điểm tiết dạy trong sinh hoạt tổ chuyên môn; xây dựng văn hóa tôn trọng và học hỏi lẫn nhau.",
      adjustments: "Áp dụng định kỳ 1 tháng/lần tại mỗi tổ khối lớp; ghi hình bài dạy để cùng nhau phân tích thay vì bắt cả tổ ngồi kín phòng học gây căng thẳng cho trẻ nhỏ.",
      challenges: "Thói quen sợ bị phê bình, e ngại chia sẻ khó khăn thực tế của giáo viên; áp lực thời gian của giáo viên tiểu học đã kín lịch dạy 2 buổi/ngày.",
      solutions: "Bộ GD&ĐT ban hành văn bản chính thức nghiêm cấm việc đánh giá thi đua cá nhân qua các buổi dự giờ sinh hoạt chuyên môn; tôn vinh những giáo viên dám chia sẻ các tiết dạy có học sinh gặp khó khăn để cùng tháo gỡ.",
      targetAudience: "Tổ trưởng chuyên môn, Hiệu phó phụ trách chuyên môn, Toàn thể giáo viên tiểu học.",
      priority: "Cao (Priority 1)",
      feasibilityScore: 90,
      feasibilityLabel: "Rất khả thi (90%)"
    }
  ],

  // 5. NGUỒN TÀI LIỆU VÀ CƠ SỞ DỮ LIỆU THAM KHẢO (20 NGUỒN)
  sources: [
    {
      id: "src-01",
      title: "Thông tư số 32/2018/TT-BGDĐT ban hành Chương trình Giáo dục phổ thông (Chương trình tổng thể và các môn học)",
      country: "Việt Nam",
      countryCode: "vietnam",
      issuingBody: "Bộ Giáo dục và Đào tạo Việt Nam",
      year: 2018,
      version: "Văn bản hợp nhất / Ban hành chính thức",
      category: "Văn bản chương trình chính thức",
      url: "https://moet.gov.vn/van-ban/van-ban-quan-ly/Pages/chi-tiet-van-ban.aspx?ItemID=1301",
      accessDate: "2026-10-15",
      description: "Quy định mục tiêu, phẩm chất, năng lực, cơ cấu môn học và thời lượng giáo dục cho cấp tiểu học tại Việt Nam.",
      criteriaSupported: ["C1", "C2", "C3", "C4", "C5", "C6", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-02",
      title: "Thông tư số 27/2020/TT-BGDĐT ban hành Quy định đánh giá học sinh tiểu học",
      country: "Việt Nam",
      countryCode: "vietnam",
      issuingBody: "Bộ Giáo dục và Đào tạo Việt Nam",
      year: 2020,
      version: "Áp dụng theo lộ trình từ lớp 1 (2020) đến lớp 5 (2024)",
      category: "Tài liệu của Bộ Giáo dục",
      url: "https://moet.gov.vn/van-ban/van-ban-quan-ly/Pages/chi-tiet-van-ban.aspx?ItemID=1384",
      accessDate: "2026-10-15",
      description: "Quy định chi tiết về phương pháp đánh giá thường xuyên, đánh giá định kỳ, khen thưởng và hỗ trợ học sinh tiểu học.",
      criteriaSupported: ["C7", "C4"],
      verificationStatus: "verified"
    },
    {
      id: "src-03",
      title: "National Core Curriculum for Basic Education 2014 (OPS 2014)",
      country: "Phần Lan",
      countryCode: "finland",
      issuingBody: "Finnish National Agency for Education (Opetushallitus - OPH)",
      year: 2014,
      version: "English Edition (Publications 2016:5)",
      category: "Văn bản chương trình chính thức",
      url: "https://www.oph.fi/en/education-and-qualifications/national-core-curriculum-basic-education",
      accessDate: "2026-10-18",
      description: "Văn bản định hướng chương trình quốc gia của Phần Lan quy định triết lý, năng lực chuyển đổi (T1-T7) và học tập theo hiện tượng.",
      criteriaSupported: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-04",
      title: "Basic Education Act (Perusopetuslaki 628/1998 & Amendments)",
      country: "Phần Lan",
      countryCode: "finland",
      issuingBody: "Bộ Giáo dục và Văn hóa Phần Lan (Ministry of Education and Culture)",
      year: 2016,
      version: "Luật Giáo dục cơ bản Phần Lan cập nhật",
      category: "Văn bản quy phạm pháp luật",
      url: "https://www.finlex.fi/en/laki/kaannokset/1998/en19980628",
      accessDate: "2026-10-20",
      description: "Khung pháp lý về quyền bình đẳng giáo dục, số giờ học tối thiểu và quyền tự chủ của các đô thị tại Phần Lan.",
      criteriaSupported: ["C1", "C3", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-05",
      title: "Primary School Curriculum Philosophy and Syllabuses",
      country: "Singapore",
      countryCode: "singapore",
      issuingBody: "Bộ Giáo dục Singapore (MOE Singapore)",
      year: 2021,
      version: "Curriculum Edition 2021 / Learn for Life",
      category: "Văn bản chương trình chính thức",
      url: "https://www.moe.gov.sg/primary/curriculum",
      accessDate: "2026-10-22",
      description: "Tổng hợp chương trình các môn học tiểu học, khung Năng lực Thế kỷ 21 (21CC) và triết lý giáo dục của Singapore.",
      criteriaSupported: ["C1", "C2", "C4", "C5", "C6"],
      verificationStatus: "verified"
    },
    {
      id: "src-06",
      title: "Holistic Assessment in Primary Schools & PSLE Scoring Changes",
      country: "Singapore",
      countryCode: "singapore",
      issuingBody: "Ministry of Education Singapore (MOE Press Release)",
      year: 2021,
      version: "Chính sách cải cách đánh giá tiểu học",
      category: "Tài liệu của Bộ Giáo dục",
      url: "https://www.moe.gov.sg/microsites/psle-fsbb",
      accessDate: "2026-10-22",
      description: "Quy định bãi bỏ thi cử P1-P2 và chuyển đổi sang thang điểm Achievement Level AL1-AL8 cho kỳ thi PSLE.",
      criteriaSupported: ["C3", "C7", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-07",
      title: "The Courses of Study for Elementary Schools (小学校学習指導要領)",
      country: "Nhật Bản",
      countryCode: "japan",
      issuingBody: "Bộ Giáo dục, Văn hóa, Thể thao, Khoa học và Công nghệ Nhật Bản (MEXT)",
      year: 2017,
      version: "Heisei 29 Notification (Áp dụng từ 4/2020)",
      category: "Văn bản chương trình chính thức",
      url: "https://www.mext.go.jp/en/policy/education/elsec/title02/detail02/1373859.htm",
      accessDate: "2026-10-25",
      description: "Chương trình tiêu chuẩn quốc gia của Nhật Bản cho trường tiểu học, cấu trúc 3 trụ cột năng lực và môn Đạo đức, Tokkatsu.",
      criteriaSupported: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-08",
      title: "Tokkatsu: The Japanese Educational Activities for Holistic Development",
      country: "Nhật Bản",
      countryCode: "japan",
      issuingBody: "National Institute for Educational Policy Research (NIER Japan) / MEXT",
      year: 2019,
      version: "English Policy Monograph",
      category: "Báo cáo nghiên cứu",
      url: "https://www.nier.go.jp/kankou_kaihatsu/pdf/tokkatsu_en.pdf",
      accessDate: "2026-10-25",
      description: "Tài liệu phân tích mô hình Hoạt động đặc biệt Tokkatsu: giáo dục nhân cách qua bữa ăn trưa và dọn dẹp vệ sinh.",
      criteriaSupported: ["C1", "C2", "C5", "C6"],
      verificationStatus: "verified"
    },
    {
      id: "src-09",
      title: "OECD Education at a Glance 2023: OECD Indicators",
      country: "Quốc tế (OECD)",
      countryCode: "international",
      issuingBody: "Tổ chức Hợp tác và Phát triển Kinh tế (OECD)",
      year: 2023,
      version: "Annual Statistical Report",
      category: "Báo cáo quốc tế",
      url: "https://www.oecd.org/education/education-at-a-glance/",
      accessDate: "2026-10-30",
      description: "Số liệu so sánh quốc tế về thời lượng học chính khóa, sĩ số lớp học, chi tiêu giáo dục của Phần Lan, Nhật Bản và các nước OECD.",
      criteriaSupported: ["C3", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-10",
      title: "PISA 2022 Results: Learning During Turbulence",
      country: "Quốc tế (OECD)",
      countryCode: "international",
      issuingBody: "OECD PISA Consortium",
      year: 2023,
      version: "Volume I & II",
      category: "Báo cáo quốc tế",
      url: "https://www.oecd.org/pisa/",
      accessDate: "2026-10-30",
      description: "Kết quả đánh giá năng lực học sinh quốc tế về Toán học, Đọc hiểu và Khoa học, bao gồm dữ liệu của Việt Nam, Singapore, Nhật Bản, Phần Lan.",
      criteriaSupported: ["C4", "C5", "C6"],
      verificationStatus: "verified"
    },
    {
      id: "src-11",
      title: "Phenomenon-Based Learning in the Finnish Curriculum: Theory and Practice",
      country: "Phần Lan",
      countryCode: "finland",
      issuingBody: "University of Helsinki / Education Finland",
      year: 2020,
      version: "Academic Paper",
      category: "Bài báo khoa học",
      url: "https://www.helsinki.fi/en/researchgroups/educational-psychology",
      accessDate: "2026-11-02",
      description: "Nghiên cứu cơ sở lý luận và phương pháp triển khai học tập theo hiện tượng (PhBL) trong trường tiểu học Phần Lan.",
      criteriaSupported: ["C2", "C5", "C6"],
      verificationStatus: "verified"
    },
    {
      id: "src-12",
      title: "Lesson Study: A Japanese Approach on Improving Mathematics Teaching and Learning",
      country: "Nhật Bản",
      countryCode: "japan",
      issuingBody: "Tokyo Gakugei University / World Association of Lesson Studies (WALS)",
      year: 2018,
      version: "Monograph",
      category: "Bài báo khoa học",
      url: "https://www.walsnet.net/",
      accessDate: "2026-11-05",
      description: "Nghiên cứu văn hóa Jugyokenkyu (Nghiên cứu bài học) trong phát triển năng lực chuyên môn của giáo viên tiểu học Nhật Bản.",
      criteriaSupported: ["C6", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-13",
      title: "Báo cáo Tổng kết 5 năm triển khai Chương trình GDPT 2018 cấp Tiểu học",
      country: "Việt Nam",
      countryCode: "vietnam",
      issuingBody: "Vụ Giáo dục Tiểu học - Bộ GD&ĐT Việt Nam",
      year: 2024,
      version: "Báo cáo tổng kết toàn quốc",
      category: "Tài liệu của Bộ Giáo dục",
      url: "https://moet.gov.vn",
      accessDate: "2026-11-05",
      description: "Đánh giá thực trạng, những kết quả đạt được và khó khăn thách thức sau 1 chu trình hoàn thiện từ lớp 1 đến lớp 5.",
      criteriaSupported: ["C1", "C2", "C3", "C5", "C7", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-14",
      title: "Singapore Math: Concrete, Pictorial, Abstract (CPA) Approach in Primary Education",
      country: "Singapore",
      countryCode: "singapore",
      issuingBody: "National Institute of Education (NIE Singapore)",
      year: 2019,
      version: "Research Monograph Series",
      category: "Bài báo khoa học",
      url: "https://www.nie.edu.sg",
      accessDate: "2026-11-08",
      description: "Phân tích phương pháp tiếp cận CPA trong việc phát triển tư duy mô hình hóa và giải quyết vấn đề toán học tiểu học.",
      criteriaSupported: ["C4", "C6"],
      verificationStatus: "verified"
    },
    {
      id: "src-15",
      title: "UNESCO Global Education Monitoring Report: Inclusion and Education",
      country: "Quốc tế (UNESCO)",
      countryCode: "international",
      issuingBody: "UNESCO",
      year: 2020,
      version: "GEM Report 2020",
      category: "Báo cáo quốc tế",
      url: "https://en.unesco.org/gem-report/",
      accessDate: "2026-11-10",
      description: "Đánh giá các chính sách giáo dục hòa nhập, công bằng trong cơ hội học tập tại các quốc gia Đông Nam Á và Bắc Âu.",
      criteriaSupported: ["C1", "C8"],
      verificationStatus: "verified"
    },
    {
      id: "src-16",
      title: "Khung Năng lực Số cho Học sinh Tiểu học Việt Nam",
      country: "Việt Nam",
      countryCode: "vietnam",
      issuingBody: "Viện Khoa học Giáo dục Việt Nam (VNIES)",
      year: 2023,
      version: "Đề xuất tài liệu hướng dẫn chuyên môn",
      category: "Báo cáo nghiên cứu",
      url: "https://vnies.edu.vn",
      accessDate: "2026-11-12",
      description: "Khung đối sánh năng lực tin học và ứng dụng công nghệ thông tin trong dạy học tiểu học phù hợp chuyển đổi số quốc gia.",
      criteriaSupported: ["C4", "C5"],
      verificationStatus: "verified"
    },
    {
      id: "src-17",
      title: "21st Century Competencies (21CC) Framework",
      country: "Singapore",
      countryCode: "singapore",
      issuingBody: "Ministry of Education Singapore",
      year: 2022,
      version: "Official Web Portal Specification",
      category: "Văn bản chương trình chính thức",
      url: "https://www.moe.gov.sg/education-in-sg/21st-century-competencies",
      accessDate: "2026-11-12",
      description: "Định nghĩa chi tiết các thành phần trong khung năng lực thế kỷ 21 gồm SEL, Civic Literacy, Global Awareness và Cross-cultural skills.",
      criteriaSupported: ["C1", "C4"],
      verificationStatus: "verified"
    },
    {
      id: "src-18",
      title: "Teacher Autonomy and Education Quality: Evidence from Finland",
      country: "Phần Lan",
      countryCode: "finland",
      issuingBody: "Finnish Institute for Educational Research",
      year: 2021,
      version: "Policy Brief",
      category: "Báo cáo nghiên cứu",
      url: "https://ktl.jyu.fi/en",
      accessDate: "2026-11-15",
      description: "Nghiên cứu về mối tương quan giữa quyền tự chủ của giáo viên, văn hóa không thanh tra kiểm tra và sự phát triển toàn diện của trẻ em.",
      criteriaSupported: ["C8", "C6"],
      verificationStatus: "verified"
    },
    {
      id: "src-19",
      title: "School Lunch and Food Education (Shokuiku) in Japan",
      country: "Nhật Bản",
      countryCode: "japan",
      issuingBody: "MEXT Japan - School Health Education Division",
      year: 2020,
      version: "Overview Guide",
      category: "Tài liệu của Bộ Giáo dục",
      url: "https://www.mext.go.jp",
      accessDate: "2026-11-15",
      description: "Chính sách giáo dục dinh dưỡng Shokuiku và vai trò của bữa trưa học đường trong việc bồi dưỡng lòng biết ơn và văn hóa cộng đồng.",
      criteriaSupported: ["C1", "C2", "C5"],
      verificationStatus: "verified"
    },
    {
      id: "src-20",
      title: "Comparative Analysis of Primary Curricula in East Asia and Northern Europe",
      country: "Quốc tế",
      countryCode: "international",
      issuingBody: "Comparative Education Society of Asia (CESA)",
      year: 2022,
      version: "Journal of Comparative Education Vol 28",
      category: "Bài báo khoa học",
      url: "https://www.cesasia.net",
      accessDate: "2026-11-16",
      description: "Nghiên cứu đối chiếu tổng thể giữa các hệ thống giáo dục tiểu học Đông Á (Việt Nam, Singapore, Nhật Bản) và Bắc Âu (Phần Lan).",
      criteriaSupported: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
      verificationStatus: "verified"
    }
  ],

  // 6. PHƯƠNG PHÁP NGHIÊN CỨU 8 BƯỚC
  methodologySteps: [
    {
      step: 1,
      title: "Lựa chọn quốc gia nghiên cứu",
      shortDesc: "Xác định Việt Nam và 3 hệ thống giáo dục đại diện",
      detail: "Lựa chọn 4 hệ thống giáo dục: Việt Nam (quốc gia nghiên cứu trọng tâm), Phần Lan (đại diện mô hình Bắc Âu nhân văn và tự do sư phạm), Singapore (đại diện quốc đảo Đông Nam Á xuất sắc về chuẩn hóa và song ngữ), Nhật Bản (đại diện văn hóa Đông Á coi trọng giáo dục nhân cách toàn diện).",
      academicRationale: "Đảm bảo tính đa dạng về bối cảnh văn hóa, kinh tế, xã hội và triết lý sư phạm nhưng có thể rút ra những bài học tương thích cho Việt Nam."
    },
    {
      step: 2,
      title: "Xác định phiên bản chương trình",
      shortDesc: "Cố định văn bản chương trình chính thức đang hiệu lực",
      detail: "Xác định rõ ràng phiên bản chương trình của từng nước: Việt Nam (CT GDPT 2018 - TT 32/2018), Phần Lan (National Core Curriculum OPS 2014), Singapore (Primary Curriculum Framework 2015/2021), Nhật Bản (Courses of Study MEXT 2017/2020).",
      academicRationale: "Tránh việc so sánh khập khiễng giữa các văn bản chương trình thuộc các giai đoạn lịch sử khác nhau."
    },
    {
      step: 3,
      title: "Thu thập tài liệu chính thức & học thuật",
      shortDesc: "Xây dựng cơ sở dữ liệu nguồn kiểm chứng",
      detail: "Thu thập 20 nguồn tài liệu chính thức từ cổng thông tin Bộ GD&ĐT Việt Nam, OPH Phần Lan, MOE Singapore, MEXT Nhật Bản cùng các báo cáo so sánh quốc tế của OECD (Education at a Glance, PISA) và UNESCO.",
      academicRationale: "Đảm bảo tính xác thực, độ tin cậy và có thể trích dẫn, truy cập trực tiếp."
    },
    {
      step: 4,
      title: "Xây dựng bộ 8 tiêu chí phân tích",
      shortDesc: "Khung so sánh nhất quán theo chuẩn giáo dục học",
      detail: "Thiết lập 8 tiêu chí chuẩn mực: (C1) Mục tiêu giáo dục; (C2) Cấu trúc môn học; (C3) Thời lượng học tập; (C4) Năng lực học sinh; (C5) Nội dung chương trình; (C6) Phương pháp dạy học; (C7) Đánh giá học sinh; (C8) Quản lý và triển khai chương trình.",
      academicRationale: "Bao quát toàn diện một chu trình giáo dục từ triết lý, thiết kế, triển khai đến đo lường đầu ra."
    },
    {
      step: 5,
      title: "Chuẩn hóa dữ liệu & Thang đo",
      shortDesc: "Quy đổi thuật ngữ và rubric chấm điểm 1-5",
      detail: "Chuẩn hóa các khái niệm chuyên môn (Competency, Subject-based banding, Phenomenon-based learning, Tokkatsu...). Xây dựng bảng giải thích rubric cụ thể từ mức 1 (truyền thống) đến mức 5 (tối ưu nhân văn) nhằm tránh phán xét chủ quan.",
      academicRationale: "Tính khoa học đòi hỏi các chỉ số định lượng phải có quy tắc tường minh, minh bạch nguồn gốc."
    },
    {
      step: 6,
      title: "Phân tích so sánh đa chiều",
      shortDesc: "Chỉ ra tương đồng, khác biệt và bối cảnh",
      detail: "Áp dụng phương pháp so sánh của George Bereday (Mô tả -> Giải thích -> Đối chiếu -> So sánh tổng hợp). Không phán xét quốc gia nào tốt hơn mà phân tích từng ưu thế trong bối cảnh văn hóa xã hội cụ thể.",
      academicRationale: "Tôn trọng tính đặc thù bản địa và lịch sử phát triển của mỗi nền giáo dục."
    },
    {
      step: 7,
      title: "Trực quan hóa dữ liệu",
      shortDesc: "Thiết kế Dashboard, Ma trận so sánh & Radar Chart",
      detail: "Số hóa dữ liệu thành Dashboard tương tác, ma trận đối chiếu có bộ lọc động, biểu đồ cột so sánh tiêu chí và biểu đồ mạng nhện (Radar Chart 8 trục) phản ánh trực quan sự phân bố thế mạnh.",
      academicRationale: "Giúp người nghiên cứu và hội đồng đánh giá dễ dàng nắm bắt bức tranh toàn cảnh một cách trực quan."
    },
    {
      step: 8,
      title: "Đề xuất 3-5 khuyến nghị có điều kiện",
      shortDesc: "Chuyển hóa bài học kinh nghiệm vào thực tiễn Việt Nam",
      detail: "Xây dựng 5 khuyến nghị cụ thể kèm điều kiện áp dụng, các yếu tố cần điều chỉnh, khó khăn dự kiến, giải pháp khắc phục và đánh giá tính khả thi theo tỷ lệ phần trăm.",
      academicRationale: "Chống việc 'sao chép mù quáng' mô hình ngoại quốc; chỉ đề xuất những giải pháp phù hợp với điều kiện cơ sở vật chất và tâm lý xã hội Việt Nam."
    }
  ]
};

// Đảm bảo dữ liệu sẵn sàng trong global scope hoặc module export
if (typeof window !== "undefined") {
  window.CURRICULUM_DATA = CURRICULUM_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CURRICULUM_DATA;
}
