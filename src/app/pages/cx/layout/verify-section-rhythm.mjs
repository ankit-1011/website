/**
 * Asserts CX section shell: alternating dark/light, valid modifiers, no duplicate collapse-prone layout.
 * Run: node src/app/pages/cx/layout/verify-section-rhythm.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, '../cx.component.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const sectionRe = /<section[^>]*class="([^"]*)"[^>]*>/g;
const sections = [];
let match;
while ((match = sectionRe.exec(html)) !== null) {
  sections.push(match[1].split(/\s+/).filter(Boolean));
}

const expectedCount = 15;
if (sections.length !== expectedCount) {
  throw new Error(`Expected ${expectedCount} sections, found ${sections.length}`);
}

sections.forEach((classes, index) => {
  const n = index + 1;
  if (!classes.includes('sec')) {
    throw new Error(`Section ${n}: missing .sec`);
  }
  if (!classes.includes('wrap')) {
    /* wrap is on child div — checked below */
  }
  const isDark = classes.includes('sec--dark');
  const isLight = classes.includes('sec--light');
  if (isDark === isLight) {
    throw new Error(`Section ${n}: must have exactly one of sec--dark or sec--light`);
  }
  const expectDark = n % 2 === 1;
  if (expectDark && !isDark) {
    throw new Error(`Section ${n}: expected sec--dark for alternating rhythm`);
  }
  if (!expectDark && !isLight) {
    throw new Error(`Section ${n}: expected sec--light for alternating rhythm`);
  }
});

const wrapCount = (html.match(/class="wrap"/g) || []).length;
if (wrapCount !== expectedCount) {
  throw new Error(`Expected ${expectedCount} .wrap containers, found ${wrapCount}`);
}

console.log(
  `OK: ${expectedCount} sections alternate dark/light; ${wrapCount} .wrap; tight:`,
  sections.filter((c) => c.includes('sec--tight')).length
);
