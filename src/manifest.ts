import fs from 'fs-extra'
import { isDev, isFirefox, port, r } from '../scripts/utils'
import type { Manifest } from 'webextension-polyfill'

import type PkgType from '../package.json'

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_popup: './dist/popup/index.html',
    },
    background: isFirefox
      ? {
          scripts: ['dist/background/index.mjs'],
          type: 'module',
        }
      : {
          service_worker: './dist/background/index.mjs',
        },
    icons: {
      32: './assets/32-normal.png',
      48: './assets/48-normal.png',
      64: './assets/64-normal.png',
      128: './assets/128-normal.png',
    },
    permissions: ['activeTab', 'storage', 'webNavigation'],
    host_permissions: ['<all_urls>'],
    content_security_policy: {
      extension_pages: isDev
        ? // this is required on dev for Vite script to load
          `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : "script-src 'self'; object-src 'self'",
    },
  }

  // FIXME: not work in MV3
  // eslint-disable-next-line no-constant-condition
  if (isDev && false) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('webNavigation')
  }

  return manifest
}
