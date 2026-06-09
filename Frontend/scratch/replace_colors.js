const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const replacements = [
  { pattern: /#402d43/gi, replacement: '#a9cee5' },
  { pattern: /#755970/gi, replacement: '#3c7399' },
  { pattern: /#2c1e2f/gi, replacement: '#1e3545' },
  { pattern: /#5a4255/gi, replacement: '#2b526d' },
  { pattern: /#2b1c2e/gi, replacement: '#152635' },
  { pattern: /\bpalevioletred\b/gi, replacement: '#3c7399' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const rep of replacements) {
        if (rep.pattern.test(content)) {
          content = content.replace(rep.pattern, rep.replacement);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${path.relative(srcDir, fullPath)}`);
      }
    }
  }
}

console.log('Starting global color replacements...');
processDirectory(srcDir);
console.log('Global replacements completed.');
