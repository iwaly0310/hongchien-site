// 宏謙聯合診所官網內容資料（文字以現行 Canva 官網為準）
module.exports = {
  site: {
    name: "宏謙聯合診所",
    url: "https://hongchienclinic.com.tw",
    phone: "(02) 2987-7666",
    tel: "+886229877666",
    address: "241 新北市三重區仁愛街 517 號 1、2 樓",
    addressShort: "新北市三重區仁愛街 517 號",
    line: "https://line.me/R/ti/p/@h29877666",
    lineId: "@h29877666",
    ig: "https://www.instagram.com/joe29877666/",
    igId: "@joe29877666",
    fb: "https://www.facebook.com/JoeLinClinic/",
    fbId: "@JoeLinClinic",
    slim: "https://slim.hongchienclinic.com.tw",
    mapPlace: "https://www.google.com/maps?q=place_id:ChIJBaJBsWypQjQRiKp4drRhDl4",
    mapMrt: "https://www.google.com/maps/dir/247%E6%96%B0%E5%8C%97%E5%B8%82%E8%98%86%E6%B4%B2%E5%8D%80%E4%B8%AD%E5%B1%B1%E4%B8%80%E8%B7%AF3%E8%99%9F%E6%8D%B7%E9%81%8B%E5%BE%90%E5%8C%AF%E4%B8%AD%E5%AD%B8%E7%AB%99B1%E6%A8%93/@25.0810913,121.4772936,17z/data=!4m18!1m8!3m7!1s0x3442a8cfd4dab5e3:0xe7586187952016c!2z5o236YGL5b6Q5Yyv5Lit5a2456uZ!8m2!3d25.080729!4d121.479673!15sCh_lvpDljK_kuK3lrbjmjbfpgYvnq5kx6Jmf5Ye65Y-jWigiJuW-kOWMryDkuK3lrbgg5o23IOmBiyDnq5kgMSDomZ8g5Ye65Y-jkgESdG91cmlzdF9hdHRyYWN0aW9umgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVF0TXpkaGFFMTNFQUXgAQA!16s%2Fg%2F11rcss6h1l!4m8!1m0!1m5!1m1!1s0x3442a8cfd4dab5e3:0xe7586187952016c!2m2!1d121.479673!2d25.080729!3e2",
    mapEmbed: "https://www.google.com/maps?q=%E5%AE%8F%E8%AC%99%E8%81%AF%E5%90%88%E8%A8%BA%E6%89%80+%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%89%E9%87%8D%E5%8D%80%E4%BB%81%E6%84%9B%E8%A1%97517%E8%99%9F&hl=zh-TW&z=16&output=embed",
  },

  // 門診表：d = 看診醫師（兩位以斜線呈現）、derm = 皮膚科陳律安醫師同時段看診
  doctorsKey: {
    "林": { name: "林禹喬醫師", tone: "lin" },
    "張": { name: "張宇辰醫師", tone: "chang" },
    "李": { name: "李修甫醫師", tone: "li" },
  },
  sessions: [
    { id: "am", name: "早診", start: "08:30", end: "12:00" },
    { id: "pm", name: "午診", start: "14:30", end: "17:30" },
    { id: "ev", name: "晚診", start: "18:30", end: "21:30" },
  ],
  days: ["一", "二", "三", "四", "五", "六", "日"],
  grid: {
    am: [
      { d: ["林", "張"], derm: true },
      { d: ["李", "林"], note: "減重" },
      { d: ["張"] },
      { d: ["張"], derm: true },
      { d: ["林"] },
      { rot: true },
      { d: ["李"] },
    ],
    pm: [
      { d: ["李"], derm: true },
      { d: ["張"], derm: true },
      { d: ["林", "李"], derm: true },
      { d: ["林"], derm: true },
      { d: ["李"], derm: true },
      { rot: true },
      { closed: true },
    ],
    ev: [
      { d: ["李"], derm: true },
      { d: ["張"] },
      { d: ["李"], derm: true },
      { d: ["林"] },
      { d: ["李"], derm: true },
      { line: true },
      { line: true },
    ],
  },
  scheduleNotes: [
    "全時段提供健康檢查、成人自費疫苗、急慢性病治療、健康減重諮詢",
    "超音波每日時段不同，需預約。<small>初診患者請先至家醫科看診，經醫師評估後，再預約超音波。</small>",
    "國定假日門診 08:30–12:00",
  ],

  doctors: [
    {
      key: "林", name: "林禹喬", role: "家醫科／院長", img: "dr-lin", pos: "50% 25%",
      // 另有：中心診所主治醫師、中華民國國防部陸軍少尉醫官、超音波醫學會會員（院長要求精簡，暫不顯示）
      creds: ["國立台灣大學醫學系畢業", "馬偕紀念醫院家庭醫學科總醫師", "肥胖症專科認證", "肥胖與代謝醫學論壇受邀講者", "糖尿病、腎臟病、代謝症候群照護網責任醫師"],
      life: "半程馬拉松跑者",
    },
    {
      key: "張", name: "張宇辰", role: "家醫科", img: "dr-chang", pos: "50% 20%",
      creds: ["國立陽明大學醫學系畢業", "馬偕紀念醫院家庭醫學科主治醫師", "肥胖症專科認證", "ACSM-CPT 美國運動醫學會私人教練", "教育部部定講師（馬偕醫學院）"],
      life: "全程馬拉松跑者",
    },
    {
      key: "陳", name: "陳律安", role: "皮膚科主治醫師", img: "dr-chen", pos: "50% 18%",
      creds: ["國立台灣大學醫學系畢業", "亞東醫院皮膚科醫師", "恩主公醫院皮膚科主任"],
    },
    {
      key: "李", name: "李修甫", role: "家醫科", img: "dr-li", pos: "50% 22%",
      creds: ["國立台灣大學醫學系畢業", "台大家庭醫學科總醫師", "糖尿病共照網、腎臟病、代謝症候群照護網責任醫師", "超音波醫學會會員"],
      life: "森林系暖醫", lifeIcon: "leaf",
    },
  ],

  awards: [
    { name: "國健署代謝症候群照護績優診所", by: "國民健康署" },
    { name: "糖心胖三合照護全國特優診所", by: "全國特優" },
    { name: "糖尿病共同照護網認證", by: "認證診所" },
    { name: "慢性腎病照護識能友善診所", by: "友善診所" },
    { name: "糖尿病及慢性腎臟病照護品質獎勵", by: "品質獎勵" },
    { name: "帶狀皰疹疫苗衛教友善診所", by: "友善診所" },
  ],

  services: [
    { id: "chronic", name: "三高慢性病", desc: "高血脂、高血壓、高血糖、痛風" },
    { id: "weight", name: "健康減重門診", desc: "健康減重門診、體重管理", feature: true },
    { id: "echo", name: "超音波檢查", desc: "全腹部、甲狀腺、頸動脈超音波檢查" },
    { id: "cold", name: "感冒", desc: "急性症狀如感冒與腸胃炎" },
    { id: "checkup", name: "成人健檢", desc: "成人健檢、癌症篩檢" },
  ],

  environment: [
    "「舒適與專業並重」，是我們對就診環境的堅持。",
    "候診空間寬敞明亮，柔和燈光與舒適座椅，讓等待也能放鬆。",
    "檢查設備完整：心電圖、血氧機、腹部、甲狀腺與頸動脈超音波、多槍式耳鼻喉治療台與自動血壓計；二樓另設醫美中心，備有多種美療與雷射設備。",
    "診療空間重視隱私與便利，環境每日以紫外線消毒燈清潔，為每一位患者與醫護人員守護安心、安全的就診環境。",
  ],
  equipment: ["心電圖", "血氧機", "腹部超音波", "甲狀腺超音波", "頸動脈超音波", "多槍式耳鼻喉治療台", "自動血壓計", "紫外線消毒燈", "二樓醫美中心"],
};
