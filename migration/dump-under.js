const fs = require('fs');
const path = require('path');
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

const slugs = process.argv.slice(2);
for (const s of slugs) {
  const data = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, s + '.json'), 'utf8'));
  console.log('\n========== ' + s + ' ==========');
  console.log('TITLE:', data.title);
  console.log('CONTENT:\n' + data.content);
}
