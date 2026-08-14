/**
 * Launch gate: fails the build when .ph markers remain and placeholders are not explicitly allowed.
 *
 * Allow WIP builds: CX_ALLOW_PLACEHOLDERS=true npm run build
 * Or set cxAllowPlaceholders: true in environment.prod.ts (temporary only).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesRoot = path.join(__dirname, '../..');
const scanRoots = [
  path.join(pagesRoot, 'cx'),
  path.join(pagesRoot, 'cx-solutions')
];
const envProdPath = path.join(pagesRoot, '../../environments/environment.prod.ts');

const CLASS_PH =
  /\bclass\s*=\s*("([^"]*\bph\b[^"]*)"|'([^']*\bph\b[^']*)')/g;

function envAllowsPlaceholders() {
  if (process.env.CX_ALLOW_PLACEHOLDERS === 'true') {
    return true;
  }
  if (!fs.existsSync(envProdPath)) {
    return false;
  }
  const source = fs.readFileSync(envProdPath, 'utf8');
  return /cxAllowPlaceholders:\s*true/.test(source);
}

function walkHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function findMarkers(filePath, rootDir) {
  const rel = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const hits = [];
  for (const line of content.split('\n')) {
    if (!/\bph\b/.test(line)) {
      continue;
    }
    CLASS_PH.lastIndex = 0;
    if (CLASS_PH.test(line)) {
      hits.push({ file: rel, line: line.trim() });
    }
  }
  return hits;
}

const allHits = scanRoots.flatMap((rootDir) => {
  if (!fs.existsSync(rootDir)) {
    return [];
  }
  return walkHtmlFiles(rootDir).flatMap((file) => findMarkers(file, rootDir));
});
const allowed = envAllowsPlaceholders();

if (allHits.length === 0) {
  console.log('OK: no CX .ph placeholder markers in templates.');
  process.exit(0);
}

console.log(`CX placeholder markers found: ${allHits.length}`);
for (const hit of allHits) {
  console.log(`  ${hit.file}: ${hit.line.slice(0, 140)}`);
}

if (allowed) {
  console.warn('CX_ALLOW_PLACEHOLDERS / cxAllowPlaceholders allows build to continue (WIP).');
  process.exit(0);
}

console.error(
  '\nCX launch gate FAILED: remove all .ph markers or set CX_ALLOW_PLACEHOLDERS=true for WIP builds only.\n'
);
process.exit(1);
