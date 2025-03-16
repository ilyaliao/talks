import MarkdownItMagicLink from 'markdown-it-magic-link'
import { defineConfig } from 'vite'
import '@slidev/cli'

export default defineConfig({
  slidev: {
    markdown: {
      markdownItSetup(md) {
        md.use(MarkdownItMagicLink, {
          linksMap: {
            'VueUse': 'https://github.com/vueuse/vueuse',
            'maru': 'https://maru.re',
            'aira': 'https://www.aira.com.tw',
            'Anthony Fu': 'https://antfu.me',
            'Threads': 'https://www.threads.net',
          },
          imageOverrides: [
            ['https://maru.re', 'https://maru.re/favicon.svg'],
            ['https://antfu.me', 'https://avatars.githubusercontent.com/u/11247099'],
          ],
        })
      },
    },
  },
})
