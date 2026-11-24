/* =========================================================
   사이트 내용 불러오기 (사이트내용.xlsx)
   - 안전팀은 이 파일을 고칠 필요가 없습니다. 엑셀 파일만 고쳐서 올리세요.
   - 엑셀 파일이 없거나 읽지 못하면 각 페이지에 들어 있는 기본 내용이 보입니다.
   ========================================================= */
const SiteContent = (() => {
  const FILE = "사이트내용.xlsx";
  const LEVEL = { "상": "high", "중": "mid", "하": "low", high: "high", mid: "mid", low: "low" };
  const norm = s => String(s ?? "").replace(/\s+/g, "").toLowerCase();
  const str = v => String(v ?? "").trim();

  function toISO(v) {
    if (v === "" || v == null) return "";
    if (typeof v === "number" && v > 20000) {
      const d = XLSX.SSF.parse_date_code(v);
      return `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
    }
    const s = str(v);
    let m = s.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
    m = s.match(/^(\d{1,2})\D+(\d{1,2})\D*$/);
    if (m) return `${new Date().getFullYear()}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
    return "";
  }

  /* 시트 → [{머리글: 값}] (머리글 줄은 두 칸 이상 채워진 첫 줄) */
  function rows(wb, name) {
    const sn = wb.SheetNames.find(n => norm(n) === norm(name));
    if (!sn) return null;
    const arr = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, raw: true, defval: "" });
    const h = arr.findIndex(r => r.filter(c => str(c)).length >= 2);
    if (h < 0) return [];
    const head = arr[h].map(norm);
    return arr.slice(h + 1).filter(r => r.some(c => str(c)))
      .map(r => { const o = {}; head.forEach((k, i) => { if (k) o[k] = r[i]; }); return o; });
  }
  const get = (o, ...keys) => { for (const k of keys) { const v = o[norm(k)]; if (v !== undefined && str(v) !== "") return v; } return ""; };
  /* 언어별 열 → { ko, en, … }  예: "한국어", "English" 또는 "이름 (한국어)" */
  const multi = (o, prefix = "") => {
    const r = {};
    LANGS.forEach(l => { const v = get(o, prefix ? `${prefix}(${l.name})` : l.name); if (str(v)) r[l.code] = str(v); });
    return r.ko ? r : (Object.keys(r).length ? r : "");
  };

  async function load() {
    try {
      const res = await fetch(encodeURI(FILE), { cache: "no-cache" });
      if (!res.ok) return null;
      const wb = XLSX.read(new Uint8Array(await res.arrayBuffer()), { type: "array" });
      const c = {};

      const info = rows(wb, "기본정보");
      if (info) { c.info = {}; info.forEach(o => c.info[norm(get(o, "항목"))] = get(o, "값")); }

      const phr = rows(wb, "문구");
      if (phr) { c.phrases = {}; phr.forEach(o => c.phrases[norm(get(o, "항목"))] = multi(o)); }

      const sch = rows(wb, "순찰일정");
      if (sch) c.schedule = sch.map(o => ({ date: toISO(get(o, "날짜")), area: str(get(o, "장소")), by: str(get(o, "순찰자")), type: str(get(o, "구분")) }))
        .filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date));

      const it = rows(wb, "지적사항");
      if (it) c.items = it.map(o => ({
        no: str(get(o, "관리번호")), patrolDate: toISO(get(o, "순찰일")), patrolType: str(get(o, "순찰구분")),
        area: str(get(o, "장소")), type: str(get(o, "위험유형")), level: LEVEL[str(get(o, "위험등급"))] || "mid",
        finding: str(get(o, "지적내용")), request: str(get(o, "요구조치")), owner: str(get(o, "조치대상")),
        due: toISO(get(o, "조치기한")), photoBefore: str(get(o, "조치전사진")),
        action: str(get(o, "조치내용")), prevent: str(get(o, "재발방지대책")), doneDate: toISO(get(o, "완료일")),
        photoAfter: str(get(o, "조치후사진")), checker: str(get(o, "확인부서")), checkDate: toISO(get(o, "확인일"))
      })).filter(x => x.finding).sort((a, b) => b.patrolDate.localeCompare(a.patrolDate));

      const top = rows(wb, "반복지적");
      if (top) c.top5 = top.map(o => ({ n: +get(o, "건수") || 0, name: multi(o) })).filter(x => x.name).slice(0, 5);

      const z = rows(wb, "위험구역");
      if (z) c.zones = z.map(o => ({ icon: str(get(o, "아이콘")) || "⚠️", name: multi(o, "이름"), desc: multi(o, "설명") })).filter(x => x.name);

      return c;
    } catch (e) { console.warn("사이트내용.xlsx 읽기 실패", e); return null; }
  }

  /* 지적사항 진행 상태: done 조치완료 / prog 확인대기 / over 기한초과 / open 조치중 */
  function itemStatus(it, todayISO) {
    if (it.doneDate && it.checkDate) return "done";
    if (it.doneDate) return "prog";
    if (it.due && it.due < todayISO) return "over";
    return "open";
  }

  return { load, itemStatus, toISO, norm };
})();
