const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'api');

function fixFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      fixFiles(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes("('api::") && !content.includes(" as any)")) {
        content = content.replace(/('api::[^']+')/g, "$1 as any");
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}

fixFiles(baseDir);
console.log('Done fixing TS files');
