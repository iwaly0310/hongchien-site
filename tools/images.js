// 由 _source/media 產生網站用圖（多尺寸 WebP + 必要的 PNG）
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const SRC = path.join(__dirname, "..", "_source", "media");
const FL = "C:/MYproject/宏謙官網/脂肪肝篩檢/images";
const OUT = path.join(__dirname, "..", "docs", "assets", "img");
fs.mkdirSync(OUT, { recursive: true });
const jobs = [
  ["dr-lin", SRC + "/3ae07339f007d946b1c9285c53213863.jpg", [480, 960]],
  ["dr-chen", SRC + "/21418da59f051d62d6114c663358958e.png", [480, 960]],
  ["dr-li", SRC + "/a7919ebed942907214db1e263d1bb1db.jpg", [480, 672]],
  ["dr-chang", SRC + "/2e11225cce0f5380caa3b5a51df5a76a.png", [480, 632]],
  ["clinic", SRC + "/872917e9eebbcd66eef7ff6f265f59b0.jpg", [800, 1400, 2200]],
  ["consult", SRC + "/3ae07339f007d946b1c9285c53213863.jpg", [640, 1000]],
  ["toon-a", SRC + "/25ce2fb0a77dd56131980470ba74d748.png", [240, 433], true],
  ["toon-b", SRC + "/c67a5c4d64e6ceeaaf9219aa5ced25e3.png", [240, 464], true],
  ["fl-scan", FL + "/fibroscan-scan.jpg", [800, 1400]],
  ["fl-explain", FL + "/doctor-explain.jpg", [800, 1400]],
  ["fl-report", FL + "/report-card.jpg", [800, 1400]],
];
(async () => {
  for (const [name, src, widths, alpha] of jobs) {
    if (!fs.existsSync(src)) { console.log("missing", src); continue; }
    const meta = await sharp(src).metadata();
    for (const w of widths) {
      const ww = Math.min(w, meta.width);
      const out = path.join(OUT, `${name}-${w}.webp`);
      await sharp(src).resize({ width: ww }).webp({ quality: alpha ? 88 : 78, alphaQuality: 90, effort: 6 }).toFile(out);
      console.log(name, w, fs.statSync(out).size, `${meta.width}x${meta.height}`);
    }
  }
  await sharp(SRC + "/bc839631cc4a4d7a8d1870798077e792.png").resize(360).png({ palette: true }).toFile(path.join(OUT, "line-qr.png"));
  const logo = SRC + "/44e505c9a1c02b4af5fd190a99d65494.png";
  await sharp(logo).trim().resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(OUT, "logo-160.png"));
  await sharp(logo).trim().resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(OUT, "..", "..", "favicon.png"));
  await sharp(logo).trim().resize(180, 180, { fit: "contain", background: "#f8f3ea" }).png().toFile(path.join(OUT, "..", "..", "apple-touch-icon.png"));
  console.log("done");
})();
