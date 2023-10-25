import fs from 'fs-extra'

import { getManifest } from '../src/manifest'
import { log, r } from './utils'

export async function writeManifest() {
  await fs.writeJSON(r('extension/manifest.json'), await getManifest(), {
    spaces: 2,
  })
  log('PRE', 'write manifest.json')
}

// eslint-disable-next-line unicorn/prefer-top-level-await
writeManifest()
