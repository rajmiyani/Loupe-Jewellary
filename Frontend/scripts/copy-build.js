import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.resolve(__dirname, '../dist');
const target = path.resolve(__dirname, '../../server/dist');

try {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
  if (fs.existsSync(source)) {
    fs.cpSync(source, target, { recursive: true });
    console.log(`[copy-build] Successfully copied build to ${target}`);
  } else {
    console.error(`[copy-build] Source directory ${source} does not exist.`);
    process.exit(1);
  }
} catch (err) {
  console.error('[copy-build] Error copying build:', err.message);
  process.exit(1);
}
