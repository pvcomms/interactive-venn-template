// Writes docs/img/venn.png at 1400x900 from headless Chromium.
// Playwright is loaded from a sibling project rather than installed here: this repo has no
// dependencies, and a screenshot tool is not a reason to give it one. Point PLAYWRIGHT_DIR
// somewhere else if yours lives elsewhere.
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pw = process.env.PLAYWRIGHT_DIR || join(homedir(), "Code/shosai/node_modules/playwright");
const { chromium } = await import(pathToFileURL(join(pw, "index.mjs")).href);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(pathToFileURL(join(root, "index.html")).href);
await page.waitForTimeout(2600); // the circles draw themselves over the first ~2.1s
await page.locator(".hero").scrollIntoViewIfNeeded();
const box = await page.locator("#vennSvg").boundingBox(); // viewBox is 900x640
await page.mouse.move(box.x + box.width * (230 / 900), box.y + box.height * (200 / 640));
await page.waitForTimeout(700); // let the flood, the bloom and the readout settle
await page.screenshot({ path: join(root, "docs/img/venn.png") });
await browser.close();
console.log("docs/img/venn.png");
