import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'PWA Router',
    short_name: 'PWA Router',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'logo192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'logo512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    start_url: "/index.html",
    scope: ".",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#fff",
    description: "Kris+ merchant portal",
    dir: "ltr",
    lang: "en-US"
  },
  devOptions: {
    enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = true
const reload = true
const selfDestroying = true

pwaOptions.srcDir = 'src'
pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
pwaOptions.strategies = 'injectManifest'
  ; (pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  ; (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying

export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  build: {
    sourcemap: true
  },
  plugins: [
    react(),
    VitePWA(pwaOptions),
  ],
})
