/**
 * Copies runtime data files from public/ to dist/ after build.
 *
 * Vite normally copies public/ to dist/ automatically, but this script
 * provides defense-in-depth to ensure the data files that are fetched
 * at runtime (not bundled at compile time) are always present in dist/.
 *
 * Usage: node scripts/copy-data.mjs
 * (Called automatically via "prebuild" in package.json)
 */
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const files = [
  'public/data/processed/initiatives.json',
  'public/data/processed/sensors.json',
];

let copied = 0;
let failed = 0;

for (const file of files) {
  const src = join(root, file);
  const dest = join(root, 'dist', file);

  if (existsSync(src)) {
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    console.log(`✅ Copied ${file} to dist/`);
    copied++;
  } else {
    console.error(`❌ Missing source: ${src}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`⚠️  ${failed} data file(s) missing from source.`);
  process.exit(1);
} else {
  console.log(`✅ All ${copied} data file(s) copied successfully.`);
}
