import config from '@slidev/client/uno.config'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    presets: [
      presetWebFonts({
        fonts: {
          mono: 'DM Mono',
          sans: 'Noto Sans TC',
        },
        processors: createLocalFontProcessor(),
      }),
    ],
  },
])
