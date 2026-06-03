// Tile the photo source folders into viewable contact sheets so picks for the
// 29 interior/exterior SUB-SERVICE pages can be made by actually viewing photos.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join("C:", "Users", "Chris", "Downloads", "proudpaintbrush-photos");
const OUT = path.join("C:", "Users", "Chris", "Documents", "SEO", "tmp", "service-sheets");
fs.mkdirSync(OUT, { recursive: true });

const FOLDERS = ["exterior", "interior", "cabinets", "door-refinishing", "fences", "drywall"];
const COLS = 6, TW = 260, TH = 195, GAP = 6, PER = 36; // 36 imgs / sheet page

const legend = {};
for (const folder of FOLDERS) {
  const dir = path.join(SRC, folder);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).sort();
  legend[folder] = files;
  for (let page = 0; page * PER < files.length; page++) {
    const slice = files.slice(page * PER, page * PER + PER);
    const rows = Math.ceil(slice.length / COLS);
    const W = COLS * TW + (COLS + 1) * GAP, H = rows * TH + (rows + 1) * GAP;
    const comps = [];
    for (let i = 0; i < slice.length; i++) {
      const gi = page * PER + i; // global index in folder
      const buf = await sharp(path.join(dir, slice[i])).resize(TW, TH, { fit: "cover" }).toBuffer();
      const svg = Buffer.from(
        `<svg width="${TW}" height="${TH}"><rect x="0" y="0" width="64" height="24" fill="black" opacity="0.72"/><text x="6" y="18" font-size="17" font-family="Arial" fill="white" font-weight="bold">#${gi}</text></svg>`
      );
      const labeled = await sharp(buf).composite([{ input: svg, top: 0, left: 0 }]).toBuffer();
      const r = Math.floor(i / COLS), c = i % COLS;
      comps.push({ input: labeled, top: GAP + r * (TH + GAP), left: GAP + c * (TW + GAP) });
    }
    const outFile = path.join(OUT, `${folder}-${page}.png`);
    await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite(comps).png().toFile(outFile);
    console.log(`WROTE ${path.basename(outFile)} (${slice.length} imgs, #${page * PER}-#${page * PER + slice.length - 1})`);
  }
}
fs.writeFileSync(path.join(OUT, "legend.json"), JSON.stringify(legend, null, 0));
console.log("legend written:", Object.fromEntries(Object.entries(legend).map(([k, v]) => [k, v.length])));
