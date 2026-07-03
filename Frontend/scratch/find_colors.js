const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
const foundColors = new Set();

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      let match;
      while ((match = hexRegex.exec(content)) !== null) {
        foundColors.add(match[0].toLowerCase());
      }
    }
  }
}

walk(srcDir);
console.log('Unique hex colors found:');
console.log(Array.from(foundColors).sort());
