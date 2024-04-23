import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const assetDir = 'assets'
const mainJsFile = 'app-ugoeatonline.js'
const mainCssFile = 'app-ugoeatonline.css'

function generatePathFromFilename(name: string)
{
  const fileTypes = new Map<string, Array<string>>()
  fileTypes.set('fonts', ['ttf', 'woff', 'eot'])
  fileTypes.set('images', ['png', 'jpeg', 'jpg', 'bmp', 'ico', 'gif'])
  fileTypes.set('js', ['js', 'mjs'])
  fileTypes.set('css', ['css'])

  for(const [k, v] of fileTypes.entries())
  {
    for(const pattern of v){
      if (name.match(`.*\.${pattern}`))
          return `${k}/${name}`
    }
  }
  return name
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: true,
    rollupOptions: {
      /* To fix problems during export primereact */
      external: ['chart.js/auto', 'quill'],
      output: {
        compact: true,
        preserveModules: false,
        entryFileNames: `${assetDir}/${mainJsFile}`,
        assetFileNames: (assetInfo) => {
          if(assetInfo?.name?.match('index.css'))
            return `${assetDir}/${mainCssFile}`
          return `${assetDir}/${generatePathFromFilename(`${assetInfo?.name}`)}`
        },
        manualChunks:{
          primereact: ['primereact'],
        }
      }
    }
  }
})
