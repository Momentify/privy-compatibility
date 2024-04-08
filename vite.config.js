/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from 'vite-plugin-static-copy';
// import federation from "@originjs/vite-plugin-federation";
import 'dotenv/config';

// let cinnyRemote = "http://localhost:5001/assets/remoteEntry.js"
// if (process.env.NODE_ENV === 'dev') {
//   cinnyRemote = "http://localhost:5001/assets/remoteEntry.js"
// } else if (process.env.NODE_ENV === 'staging') {
//   cinnyRemote = "https://staging-chat.momentify.xyz/assets/remoteEntry.js"
// } else if (process.env.NODE_ENV === 'prod') {
//   cinnyRemote = "https://chat.momentify.xyz/assets/remoteEntry.js"
// }

const copyFiles = {
  targets: [
    // {
    //   src: 'node_modules/@matrix-org/olm/olm.wasm',
    //   dest: 'profile',
    // },
    // {
    //   src: 'node_modules/@matrix-org/olm/olm.wasm',
    //   dest: '',
    // }
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy(copyFiles),
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 5000000,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        "short_name": "React App",
        "name": "Create React App Sample",
        "icons": [
          {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "logo192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "logo512.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
      },
    }),
  ],
  resolve: {
    alias: {
      crypto: "empty-module",
      assert: "empty-module",
      http: "empty-module",
      https: "empty-module",
      os: "empty-module",
      url: "empty-module",
      zlib: "empty-module",
      stream: "empty-module",
      _stream_duplex: "empty-module",
      _stream_passthrough: "empty-module",
      _stream_readable: "empty-module",
      _stream_writable: "empty-module",
      _stream_transform: "empty-module",
    },
  },
  define: {
    global: "globalThis",
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true
    }
  },
  server: {
    cors: true,
    host: true,
    strictPort: true,
    port: 5173
  }
});