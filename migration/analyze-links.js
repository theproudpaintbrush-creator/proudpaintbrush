const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

const VALID = [
  '/interior-painting', '/exterior-painting', '/cabinet-painting',
  '/interior-painting/drywall-repair', '/interior-painting/kitchen-painting',
  '/exterior-painting/fence-staining', '/exterior-painting/pressure-washing', '/exterior-painting/stucco-painting',
  '/pricing', '/budget', '/warranty', '/preparation-process', '/color-consultation', '/contact'
];

function isContextual(h) {
  if (!h.startsWith('/')) return false;
  if (h.startsWith('/blog?')) return false;       // tag/author filter
  if (h.startsWith('/blog/tag')) return false;    // tag pages
  if (h === '/blog') return false;                // blog listing
  return true;
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.json'));
const rows = [];
for (const f of files) {
  const data = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8'));
  const content = data.content || '';
  const hrefs = [...content.matchAll(/<a\s+href="([^"]+)"/gi)].map(m => m[1]);
  const contextual = hrefs.filter(isContextual);
  const validPresent = [...new Set(contextual.map(h => h.split('#')[0].split('?')[0]))].filter(h => VALID.includes(h));
  rows.push({
    slug: f.replace('.json', ''),
    ctx: contextual.length,
    valid: validPresent,
    targetsPresent: [...new Set(contextual.map(h => h.split('#')[0].split('?')[0]))]
  });
}
rows.sort((a,b) => a.ctx - b.ctx);
for (const r of rows) {
  const flag = r.ctx < 3 ? 'UNDER' : (r.ctx < 4 ? 'NEAR' : 'OK');
  console.log(`${flag}\tctx=${r.ctx}\t${r.slug}`);
}
console.log('---');
console.log('ctx<3:', rows.filter(r=>r.ctx<3).length, '| ctx<4:', rows.filter(r=>r.ctx<4).length, '| total:', rows.length);
