import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from '@slidev/parser/fs'

const root = new URL('..', import.meta.url)
const rootPath = fileURLToPath(root)
const distDir = path.join(rootPath, 'dist')

// Find talk folders (same pattern as picker.ts)
const folders = (await fs.readdir(rootPath, { withFileTypes: true }))
  .filter(d => d.isDirectory() && d.name.match(/^\d{4}-/))
  .sort((a, b) => -a.name.localeCompare(b.name))

// Extract title and dist folder name from each talk
const talks = await Promise.all(folders.map(async (f) => {
  // Get title from slides.md frontmatter
  const userRoot = path.join(rootPath, f.name, 'src')
  const slidesPath = path.join(userRoot, 'slides.md')
  const content = await fs.readFile(slidesPath, 'utf-8')
  const titleMatch = content.match(/^title:\s*(.+)/m)
  const title = titleMatch?.[1]?.trim() || f.name
  const { slides } = await load(userRoot, slidesPath)

  // Get dist folder name from package.json --out flag
  const pkgPath = path.join(rootPath, f.name, 'src', 'package.json')
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
  const buildScript: string = pkg.scripts?.build || ''
  const outFlag = buildScript.split('--out')[1]?.trim() || ''
  const distName = outFlag.split('/').pop() || f.name

  return { folder: f.name, distName, title, slideCount: slides.length }
}))

// Generate index.html
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Index of /</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem;
      color: #111;
    }
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
    .info {
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      color: #0969da;
      font-size: 0.875rem;
      text-decoration: none;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1rem;
    }
    a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: #111;
      border-radius: 6px;
    }
    a:hover { background: #f6f8fa; }
    .icon { font-size: 1.5rem; opacity: 0.6; }
    .name { font-size: 0.9375rem; }
  </style>
</head>
<body>
  <h1>Index of /</h1>
  <div class="grid">
    ${talks.map(t => `<a href="/${t.distName}/"><span class="icon">\uD83D\uDCC1</span><span class="name">${t.distName}</span></a>`).join('\n    ')}
  </div>
</body>
</html>
`

await fs.mkdir(distDir, { recursive: true })
await fs.writeFile(path.join(distDir, 'index.html'), html)

const staticRoutes = [
  'entry',
  'overview',
  'notes',
  'presenter',
  'print',
  'presenter/print',
  'export',
]

let shells = 0
for (const talk of talks) {
  const deckDir = path.join(distDir, talk.distName)
  const shell = path.join(deckDir, 'index.html')
  const routes = [
    ...staticRoutes,
    ...Array.from({ length: talk.slideCount }, (_, i) => {
      const no = String(i + 1)
      return [no, `presenter/${no}`, `export/${no}`]
    }).flat(),
  ]
  for (const route of routes) {
    const dest = path.join(deckDir, `${route}.html`)
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(shell, dest)
    shells++
  }
}

console.log(`Generated index.html and ${shells} slide shells for ${talks.length} talks`)
