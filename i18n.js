/* =========================================================
   다국어 설정 (안전순찰 페이지 공통)
   - 언어 추가: LANGS에 한 줄 추가하고, 아래 각 줄 끝에 번역을 추가하세요.
   - 번역 순서는 LANGS 순서와 같습니다: 한국어, English, Tiếng Việt, नेपाली, Indonesia, ไทย, 中文
   - 번역이 비어 있으면 한국어가 표시됩니다.
   ========================================================= */
const LANGS = [
  { code: "ko", name: "한국어",       locale: "ko-KR" },
  { code: "en", name: "English",      locale: "en-US" },
  { code: "vi", name: "Tiếng Việt",   locale: "vi-VN" },
  { code: "ne", name: "नेपाली",        locale: "ne-NP" },
  { code: "id", name: "Indonesia",    locale: "id-ID" },
  { code: "th", name: "ไทย",          locale: "th-TH" },
  { code: "zh", name: "中文",          locale: "zh-CN" }
];

/* 화면 고정 문구 */
const UI = {
  title:     ["장항공장 안전순찰", "Janghang Mill Safety Patrol", "Tuần tra an toàn Nhà máy Janghang", "जाङहाङ कारखाना सुरक्षा निरीक्षण", "Patroli Keselamatan Pabrik Janghang", "การตรวจความปลอดภัย โรงงานจังฮัง", "长项工厂安全巡查"],
  demo:      ["※ 시안용 예시 데이터입니다", "※ Sample data for preview", "※ Dữ liệu mẫu", "※ नमुना डाटा", "※ Data contoh", "※ ข้อมูลตัวอย่าง", "※ 示例数据"],
  placeNote: ["", "Place names are shown in Korean, as on site signs.", "Tên địa điểm được ghi bằng tiếng Hàn giống biển báo tại hiện trường.", "स्थानका नामहरू साइटको साइनबोर्ड जस्तै कोरियालीमा देखाइएका छन्।", "Nama lokasi ditulis dalam bahasa Korea seperti papan di lokasi.", "ชื่อสถานที่แสดงเป็นภาษาเกาหลีตามป้ายในพื้นที่", "地点名称与现场标识一致，以韩文显示。"],
  noAccident:["무재해", "Accident-free", "Không tai nạn", "दुर्घटनारहित", "Tanpa kecelakaan", "ไม่มีอุบัติเหตุ", "无事故"],
  uDay:      ["일", "days", "ngày", "दिन", "hari", "วัน", "天"],
  patrols:   ["이번 달 순찰", "Patrols this month", "Lượt tuần tra tháng này", "यो महिनाको निरीक्षण", "Patroli bulan ini", "การตรวจเดือนนี้", "本月巡查"],
  uTimes:    ["회", "times", "lần", "पटक", "kali", "ครั้ง", "次"],
  findings:  ["지적사항", "Issues found", "Vấn đề phát hiện", "भेटिएका समस्या", "Temuan", "ข้อบกพร่องที่พบ", "发现问题"],
  uCases:    ["건", "cases", "vụ", "वटा", "kasus", "รายการ", "项"],
  doneRate:  ["조치 완료율", "Fixed rate", "Tỷ lệ đã khắc phục", "सुधार दर", "Tingkat perbaikan", "อัตราแก้ไขแล้ว", "整改完成率"],
  schedule:  ["이번 주 순찰 일정", "This week's patrol schedule", "Lịch tuần tra tuần này", "यस हप्ताको निरीक्षण तालिका", "Jadwal patroli minggu ini", "ตารางตรวจสัปดาห์นี้", "本周巡查日程"],
  results:   ["최근 순찰 결과", "Recent patrol results", "Kết quả tuần tra gần đây", "हालका निरीक्षण नतिजा", "Hasil patroli terbaru", "ผลการตรวจล่าสุด", "最近巡查结果"],
  recentN:   ["최근 {n}건", "Latest {n}", "{n} mục gần đây", "पछिल्ला {n}", "{n} terbaru", "ล่าสุด {n} รายการ", "最近{n}项"],
  all:       ["전체", "All", "Tất cả", "सबै", "Semua", "ทั้งหมด", "全部"],
  open:      ["미조치", "Not fixed", "Chưa xử lý", "सुधार भएको छैन", "Belum diperbaiki", "ยังไม่แก้ไข", "未整改"],
  prog:      ["조치중", "In progress", "Đang xử lý", "सुधार हुँदैछ", "Sedang diperbaiki", "กำลังแก้ไข", "整改中"],
  done:      ["조치완료", "Fixed", "Đã xử lý", "सुधार भयो", "Selesai diperbaiki", "แก้ไขแล้ว", "已整改"],
  risk:      ["위험", "Risk", "Mức nguy hiểm", "जोखिम", "Risiko", "ความเสี่ยง", "风险"],
  high:      ["상", "High", "Cao", "उच्च", "Tinggi", "สูง", "高"],
  mid:       ["중", "Medium", "Trung bình", "मध्यम", "Sedang", "กลาง", "中"],
  low:       ["하", "Low", "Thấp", "न्यून", "Rendah", "ต่ำ", "低"],
  none:      ["해당 항목이 없습니다", "No items", "Không có mục nào", "कुनै वस्तु छैन", "Tidak ada data", "ไม่มีรายการ", "暂无项目"],
  golink:    ["📋 시정조치 요구 · 완료 현황 전체 보기 →", "📋 View all corrective actions →", "📋 Xem tất cả biện pháp khắc phục →", "📋 सबै सुधार कार्य हेर्नुहोस् →", "📋 Lihat semua tindakan perbaikan →", "📋 ดูการแก้ไขทั้งหมด →", "📋 查看全部整改情况 →"],
  top5:      ["반복 지적 TOP 5", "Top 5 repeated issues", "5 lỗi lặp lại nhiều nhất", "बारम्बार दोहोरिने ५ समस्या", "5 temuan paling sering", "5 อันดับปัญหาที่พบซ้ำ", "重复问题 TOP 5"],
  last3m:    ["최근 3개월", "Last 3 months", "3 tháng gần đây", "पछिल्लो ३ महिना", "3 bulan terakhir", "3 เดือนล่าสุด", "近3个月"],
  zones:     ["위험구역 안내", "Danger zones", "Khu vực nguy hiểm", "खतरनाक क्षेत्र", "Area berbahaya", "พื้นที่อันตราย", "危险区域"],
  good:      ["이달의 우수 사례", "Good practice of the month", "Điển hình tốt trong tháng", "यस महिनाको राम्रो अभ्यास", "Praktik terbaik bulan ini", "ตัวอย่างที่ดีประจำเดือน", "本月优秀案例"],
  contact:   ["문의: 안전환경팀 (내선 0000)", "Contact: Safety & Environment Team (ext. 0000)", "Liên hệ: Phòng An toàn - Môi trường (số nội bộ 0000)", "सम्पर्क: सुरक्षा तथा वातावरण टोली (एक्सटेन्सन 0000)", "Kontak: Tim K3 & Lingkungan (ext. 0000)", "ติดต่อ: ทีมความปลอดภัยและสิ่งแวดล้อม (ต่อ 0000)", "咨询：安全环境组（分机 0000）"],
  stopWork:  ["작업 중 위험을 발견하면 즉시 작업을 멈추고 관리감독자에게 알리세요.", "If you see danger while working, stop work immediately and tell your supervisor.", "Khi phát hiện nguy hiểm trong lúc làm việc, hãy dừng ngay và báo cho người quản lý.", "काम गर्दा खतरा देख्नुभयो भने तुरुन्तै काम रोकेर सुपरभाइजरलाई जानकारी दिनुहोस्।", "Jika melihat bahaya saat bekerja, segera hentikan pekerjaan dan beri tahu atasan.", "หากพบอันตรายระหว่างทำงาน ให้หยุดงานทันทีและแจ้งหัวหน้างาน", "工作中发现危险时，请立即停止作业并告知管理人员。"],
  reportBtn: ["🚨 위험요소 · 아차사고 제보하기", "🚨 Report a hazard / near miss", "🚨 Báo cáo nguy hiểm / sự cố suýt xảy ra", "🚨 खतरा / नजिकको दुर्घटना रिपोर्ट", "🚨 Laporkan bahaya / nyaris celaka", "🚨 แจ้งอันตราย / เหตุเกือบเกิดอุบัติเหตุ", "🚨 举报危险 / 未遂事故"],
  dlgTitle:  ["🚨 위험요소 제보", "🚨 Report a hazard", "🚨 Báo cáo nguy hiểm", "🚨 खतरा रिपोर्ट", "🚨 Laporkan bahaya", "🚨 แจ้งอันตราย", "🚨 举报危险"],
  dlgSub:    ["로그인 없이 제보할 수 있습니다. 이름은 적지 않아도 됩니다.", "No login needed. Your name is optional.", "Không cần đăng nhập. Không bắt buộc ghi tên.", "लगइन चाहिँदैन। नाम लेख्नु अनिवार्य छैन।", "Tanpa login. Nama tidak wajib diisi.", "ไม่ต้องเข้าสู่ระบบ ไม่ต้องใส่ชื่อก็ได้", "无需登录，可不填写姓名。"],
  place:     ["장소", "Location", "Địa điểm", "स्थान", "Lokasi", "สถานที่", "地点"],
  what:      ["무엇이 위험한가요?", "What is dangerous?", "Điều gì nguy hiểm?", "के खतरनाक छ?", "Apa yang berbahaya?", "อะไรเป็นอันตราย?", "有什么危险？"],
  whatPh:    ["예) 2호기 와인더 옆 바닥에 기름이 흘러 미끄럽습니다", "e.g. Oil on the floor next to the No.2 winder — slippery", "VD: Sàn cạnh máy cuộn số 2 có dầu, rất trơn", "उदाहरण: नं. २ वाइन्डर छेउको भुइँमा तेल छ, चिप्लो छ", "Contoh: Ada oli di lantai dekat winder No.2, licin", "เช่น มีน้ำมันบนพื้นข้างเครื่องม้วนหมายเลข 2 ลื่น", "例：2号复卷机旁地面有油，很滑"],
  photo:     ["사진", "Photo", "Ảnh", "फोटो", "Foto", "รูปภาพ", "照片"],
  optional:  ["(선택)", "(optional)", "(không bắt buộc)", "(ऐच्छिक)", "(opsional)", "(ไม่บังคับ)", "（选填）"],
  who:       ["소속 업체 / 이름", "Company / Name", "Công ty / Tên", "कम्पनी / नाम", "Perusahaan / Nama", "บริษัท / ชื่อ", "所属公司 / 姓名"],
  whoPh:     ["예) ○○기공 홍길동", "e.g. ABC Co. / Name", "VD: Công ty ABC / Tên", "उदाहरण: ABC कम्पनी / नाम", "Contoh: PT ABC / Nama", "เช่น บริษัท ABC / ชื่อ", "例：ABC公司 / 姓名"],
  cancel:    ["취소", "Cancel", "Hủy", "रद्द", "Batal", "ยกเลิก", "取消"],
  submit:    ["제보하기", "Submit", "Gửi", "पठाउनुहोस्", "Kirim", "ส่ง", "提交"],
  select:    ["선택하세요", "Select", "Chọn", "छान्नुहोस्", "Pilih", "เลือก", "请选择"],
  other:     ["기타", "Other", "Khác", "अन्य", "Lainnya", "อื่นๆ", "其他"],
  thanks:    ["제보가 접수되었습니다. 감사합니다!", "Your report has been received. Thank you!", "Đã nhận báo cáo. Cảm ơn bạn!", "तपाईंको रिपोर्ट प्राप्त भयो। धन्यवाद!", "Laporan diterima. Terima kasih!", "ได้รับรายงานแล้ว ขอบคุณ!", "已收到您的举报，谢谢！"],

  monthStatus:["이번 달 순찰 현황", "This month's patrol status", "Tình hình tuần tra tháng này", "यो महिनाको निरीक्षण स्थिति", "Status patroli bulan ini", "สถานะการตรวจเดือนนี้", "本月巡查情况"],
  navCorrective:["시정조치", "Corrective actions", "Khắc phục", "सुधार कार्य", "Perbaikan", "การแก้ไข", "整改"],
  navReport: ["제보", "Report", "Báo cáo", "रिपोर्ट", "Lapor", "แจ้ง", "举报"],

  /* 근무표 페이지 */
  navRoster: ["근무표", "Work schedule", "Lịch làm việc", "काम तालिका", "Jadwal kerja", "ตารางงาน", "排班表"],
  rTitle:    ["🗓️ 근무표", "🗓️ Work schedule", "🗓️ Lịch làm việc", "🗓️ काम तालिका", "🗓️ Jadwal kerja", "🗓️ ตารางงาน", "🗓️ 排班表"],
  rSub:      ["교대 근무 일정을 확인하세요", "Check your shift schedule", "Xem lịch ca làm việc của bạn", "आफ्नो सिफ्ट तालिका हेर्नुहोस्", "Lihat jadwal shift Anda", "ตรวจสอบตารางกะของคุณ", "查看您的倒班安排"],
  rSearch:   ["이름 또는 조 검색", "Search name or team", "Tìm tên hoặc tổ", "नाम वा टोली खोज्नुहोस्", "Cari nama atau regu", "ค้นหาชื่อหรือทีม", "搜索姓名或班组"],
  rTodayShift:["오늘 근무", "Today's shifts", "Ca làm hôm nay", "आजको सिफ्ट", "Shift hari ini", "กะวันนี้", "今日班次"],
  rPreview:  ["📂 내 파일로 미리보기", "📂 Preview my file", "📂 Xem trước tệp của tôi", "📂 मेरो फाइल हेर्नुहोस्", "📂 Pratinjau file saya", "📂 ดูตัวอย่างไฟล์ของฉัน", "📂 预览我的文件"],
  rPreviewOn:["미리보기 중입니다 — 이 화면에만 보이고 다른 사람에게는 보이지 않습니다.", "Preview mode — only shown on this screen, not to others.", "Đang xem trước — chỉ hiển thị trên màn hình này.", "पूर्वावलोकन — यो स्क्रिनमा मात्र देखिन्छ।", "Mode pratinjau — hanya tampil di layar ini.", "โหมดดูตัวอย่าง — แสดงเฉพาะหน้าจอนี้", "预览模式——仅在此屏幕显示，他人看不到。"],
  rBack:     ["원래 근무표로", "Back to published", "Quay lại bản chính", "मूल तालिकामा फर्कनुहोस्", "Kembali ke jadwal resmi", "กลับไปตารางจริง", "返回正式排班表"],
  rFail:     ["근무표 파일을 불러오지 못했습니다.", "Could not load the schedule file.", "Không tải được tệp lịch làm việc.", "तालिका फाइल लोड गर्न सकिएन।", "Gagal memuat file jadwal.", "ไม่สามารถโหลดไฟล์ตารางงานได้", "无法加载排班文件。"],
  rSlide:    ["슬라이드", "Slide", "Trang", "स्लाइड", "Slide", "สไลด์", "幻灯片"],
  rSearchName:["이름 검색 (예: 홍길동)", "Search a name", "Tìm theo tên", "नाम खोज्नुहोस्", "Cari nama", "ค้นหาชื่อ", "搜索姓名"],
  rToday:    ["오늘", "Today", "Hôm nay", "आज", "Hari ini", "วันนี้", "今天"],
  rTomorrow: ["내일", "Tomorrow", "Ngày mai", "भोलि", "Besok", "พรุ่งนี้", "明天"],
  rShowPast: ["지난 근무 {n}주 보기", "Show {n} past weeks", "Xem {n} tuần trước", "अघिल्ला {n} हप्ता हेर्नुहोस्", "Lihat {n} minggu lalu", "ดู {n} สัปดาห์ที่ผ่านมา", "查看过去{n}周"],
  rHidePast: ["지난 근무 숨기기", "Hide past weeks", "Ẩn các tuần trước", "अघिल्ला हप्ता लुकाउनुहोस्", "Sembunyikan minggu lalu", "ซ่อนสัปดาห์ที่ผ่านมา", "隐藏过去的周"],
  sh_day:    ["주간", "Day shift", "Ca ngày", "दिन सिफ्ट", "Shift pagi", "กะกลางวัน", "白班"],
  sh_eve:    ["오후·중간", "Evening shift", "Ca chiều", "साँझ सिफ्ट", "Shift sore", "กะบ่าย", "中班"],
  sh_night:  ["야간", "Night shift", "Ca đêm", "रात सिफ्ट", "Shift malam", "กะกลางคืน", "夜班"],
  sh_rest:   ["비번", "Off after night", "Nghỉ sau ca đêm", "रात सिफ्टपछि बिदा", "Libur setelah malam", "หยุดหลังกะดึก", "下夜休"],
  sh_off:    ["휴무", "Day off", "Ngày nghỉ", "बिदा", "Libur", "วันหยุด", "休息"],
  sh_leave:  ["연차·휴가", "Leave", "Nghỉ phép", "छुट्टी", "Cuti", "ลาพักร้อน", "休假"],
  sh_edu:    ["교육", "Training", "Đào tạo", "तालिम", "Pelatihan", "อบรม", "培训"],

  focus:     ["이번 주 중점 점검:", "Focus this week:", "Trọng tâm tuần này:", "यस हप्ताको मुख्य जाँच:", "Fokus minggu ini:", "จุดตรวจหลักสัปดาห์นี้:", "本周重点检查："],

  /* 시정조치 페이지 */
  back:      ["← 안전순찰 메인", "← Safety patrol home", "← Trang chính", "← मुख्य पृष्ठ", "← Beranda", "← หน้าหลัก", "← 返回首页"],
  cTitle:    ["📋 시정조치 요구 · 완료 현황", "📋 Corrective actions", "📋 Biện pháp khắc phục", "📋 सुधार कार्य", "📋 Tindakan perbaikan", "📋 การแก้ไขข้อบกพร่อง", "📋 整改要求及完成情况"],
  cSub:      ["순찰 지적사항에 대한 조치 요구 내용과 완료 결과입니다", "Requested fixes for patrol findings and their results", "Yêu cầu khắc phục và kết quả cho các vấn đề phát hiện khi tuần tra", "निरीक्षणमा भेटिएका समस्याको सुधार माग र नतिजा", "Permintaan perbaikan atas temuan patroli dan hasilnya", "ข้อกำหนดการแก้ไขจากผลการตรวจและผลลัพธ์", "巡查问题的整改要求与完成结果"],
  wait:      ["확인대기", "Awaiting check", "Chờ xác nhận", "जाँच बाँकी", "Menunggu cek", "รอตรวจสอบ", "待确认"],
  over:      ["기한초과", "Overdue", "Quá hạn", "म्याद नाघेको", "Lewat batas", "เกินกำหนด", "已逾期"],
  completed: ["완료", "Completed", "Hoàn thành", "पूरा", "Selesai", "เสร็จสิ้น", "完成"],
  printAll:  ["🖨️ 전체 양식 인쇄", "🖨️ Print all forms", "🖨️ In tất cả", "🖨️ सबै प्रिन्ट", "🖨️ Cetak semua", "🖨️ พิมพ์ทั้งหมด", "🖨️ 全部打印"],
  printBlank:["📄 빈 양식 인쇄", "📄 Print blank form", "📄 In mẫu trống", "📄 खाली फारम प्रिन्ट", "📄 Cetak formulir kosong", "📄 พิมพ์แบบฟอร์มเปล่า", "📄 打印空白表格"],
  printOne:  ["🖨️ 양식 인쇄", "🖨️ Print form", "🖨️ In mẫu", "🖨️ प्रिन्ट", "🖨️ Cetak", "🖨️ พิมพ์", "🖨️ 打印"],
  req:       ["① 시정조치 요구사항", "① Required action", "① Yêu cầu khắc phục", "① आवश्यक सुधार", "① Tindakan yang diminta", "① สิ่งที่ต้องแก้ไข", "① 整改要求"],
  fin:       ["② 시정조치 완료사항", "② Action taken", "② Kết quả khắc phục", "② गरिएको सुधार", "② Tindakan yang dilakukan", "② การแก้ไขที่ทำแล้ว", "② 整改完成情况"],
  dRequest:  ["요구조치", "Request", "Yêu cầu", "माग", "Permintaan", "ข้อกำหนด", "要求"],
  dOwner:    ["조치대상", "Assigned to", "Phụ trách", "जिम्मेवार", "Penanggung jawab", "ผู้รับผิดชอบ", "负责方"],
  dDue:      ["조치기한", "Due date", "Hạn chót", "अन्तिम मिति", "Batas waktu", "กำหนดเสร็จ", "期限"],
  dAction:   ["조치내용", "Action", "Nội dung xử lý", "गरिएको काम", "Tindakan", "การแก้ไข", "整改内容"],
  dPrevent:  ["재발방지", "Prevention", "Phòng ngừa tái phát", "पुनरावृत्ति रोकथाम", "Pencegahan", "การป้องกันซ้ำ", "防止再发"],
  dDone:     ["완료일", "Completed on", "Ngày hoàn thành", "पूरा मिति", "Tanggal selesai", "วันที่เสร็จ", "完成日期"],
  notYet:    ["아직 조치 결과가 등록되지 않았습니다", "No result registered yet", "Chưa có kết quả khắc phục", "अहिलेसम्म नतिजा दर्ता भएको छैन", "Belum ada hasil", "ยังไม่มีผลการแก้ไข", "尚未登记整改结果"],
  chk:       ["③ 확인", "③ Check", "③ Xác nhận", "③ जाँच", "③ Verifikasi", "③ ตรวจสอบ", "③ 确认"],
  chkNone:   ["확인 전", "Not checked yet", "Chưa xác nhận", "जाँच भएको छैन", "Belum dicek", "ยังไม่ตรวจ", "未确认"],
  chkDone:   ["{who} {date} 확인 완료", "Checked by {who} on {date}", "{who} đã xác nhận ngày {date}", "{who} द्वारा {date} मा जाँच गरियो", "Dicek oleh {who} pada {date}", "{who} ตรวจแล้ว {date}", "{who} 于 {date} 确认"]
};

/* 데이터에 자주 나오는 단어 (위험유형, 순찰구분 등) — 데이터에 이 단어를 그대로 쓰면 자동 번역됩니다 */
const TERMS = {
  "끼임":         ["끼임", "Caught in machine", "Kẹt máy", "मेसिनमा च्यापिने", "Terjepit", "ถูกหนีบ", "夹伤"],
  "넘어짐":       ["넘어짐", "Slip / trip", "Trượt ngã", "चिप्लिएर लड्ने", "Terpeleset", "ลื่นล้ม", "滑倒绊倒"],
  "충돌":         ["충돌", "Collision", "Va chạm", "ठोक्किने", "Tertabrak", "ชน", "碰撞"],
  "화재":         ["화재", "Fire", "Cháy", "आगलागी", "Kebakaran", "ไฟไหม้", "火灾"],
  "떨어짐":       ["떨어짐", "Fall from height", "Ngã từ trên cao", "उचाइबाट खस्ने", "Jatuh dari ketinggian", "ตกจากที่สูง", "高处坠落"],
  "보호구":       ["보호구", "PPE", "Đồ bảo hộ", "सुरक्षा उपकरण", "APD", "อุปกรณ์ป้องกัน", "防护用品"],
  "감전":         ["감전", "Electric shock", "Điện giật", "करेन्ट लाग्ने", "Tersengat listrik", "ไฟฟ้าดูด", "触电"],
  "밀폐공간":     ["밀폐공간", "Confined space", "Không gian kín", "बन्द ठाउँ", "Ruang terbatas", "ที่อับอากาศ", "密闭空间"],
  "정기순찰":     ["정기순찰", "Regular patrol", "Tuần tra định kỳ", "नियमित निरीक्षण", "Patroli rutin", "ตรวจตามปกติ", "定期巡查"],
  "합동순찰":     ["합동순찰", "Joint patrol", "Tuần tra liên hợp", "संयुक्त निरीक्षण", "Patroli gabungan", "ตรวจร่วม", "联合巡查"],
  "지게차 특별점검": ["지게차 특별점검", "Forklift special check", "Kiểm tra đặc biệt xe nâng", "फोर्कलिफ्ट विशेष जाँच", "Inspeksi khusus forklift", "ตรวจพิเศษรถยก", "叉车专项检查"]
};

/* ---------------- 동작 부분 (수정 불필요) ---------------- */
const I18N = (() => {
  const codes = LANGS.map(l => l.code);
  const idx = () => codes.indexOf(lang);
  let lang = (() => {
    const q = new URLSearchParams(location.search).get("lang");
    if (codes.includes(q)) return q;
    try { const s = localStorage.getItem("lang"); if (codes.includes(s)) return s; } catch (e) {}
    const nav = (navigator.language || "ko").slice(0, 2);
    return codes.includes(nav) ? nav : "ko";
  })();
  const pick = arr => (arr && (arr[idx()] || arr[0])) || "";
  return {
    get lang() { return lang; },
    get locale() { return LANGS[idx()].locale; },
    /* 고정 문구 */
    t(key, vars) {
      let s = UI[key] ? pick(UI[key]) : key;
      for (const k in vars || {}) s = s.replace("{" + k + "}", vars[k]);
      return s;
    },
    /* 데이터 값: {ko:"..", en:".."} 형태 또는 TERMS에 있는 단어 */
    tr(x) {
      if (x && typeof x === "object") return x[lang] || x.ko || "";
      return TERMS[x] ? pick(TERMS[x]) : (x ?? "");
    },
    applyStatic() {
      document.documentElement.lang = lang;
      document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = this.t(el.dataset.i18n));
      document.querySelectorAll("[data-i18n-ph]").forEach(el => el.placeholder = this.t(el.dataset.i18nPh));
    },
    mountPicker(sel, onChange) {
      sel.innerHTML = LANGS.map(l => `<option value="${l.code}">${l.name}</option>`).join("");
      sel.value = lang;
      sel.onchange = () => {
        lang = sel.value;
        try { localStorage.setItem("lang", lang); } catch (e) {}
        const u = new URL(location.href); u.searchParams.set("lang", lang);
        history.replaceState(null, "", u);
        this.applyStatic(); onChange();
      };
      this.applyStatic();
    }
  };
})();
