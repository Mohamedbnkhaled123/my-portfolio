const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Replace component usages
  if (content.match(/useLanguage\(\)/) || content.match(/useTheme\(\)/)) {
    const depth = f.split(path.sep).length - 2; 
    let upDir = "";
    if (depth === 0) upDir = "./";
    else upDir = '../'.repeat(depth);
    
    // Normalize string replace up path
    upDir = upDir + "store/useAppStore";

    content = content.replace(/import\s*\{\s*useLanguage\s*\}\s*from\s*['"][^'"]+['"];/g, "");
    content = content.replace(/import\s*\{\s*useTheme\s*\}\s*from\s*['"][^'"]+['"];/g, "");
    
    // Add unified Zustand store import at top after React
    const importStr = `import { useAppStore } from '${upDir}';\n`;
    content = content.replace(/import React[^;]+;/g, match => match + "\n" + importStr);
    if (!content.includes(importStr) && !content.includes('import React')) {
      content = importStr + content;
    }

    content = content.replace(/useLanguage\(\)/g, "useAppStore()");
    content = content.replace(/useTheme\(\)/g, "useAppStore()");

    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
  }
});
console.log("Migration complete!");
