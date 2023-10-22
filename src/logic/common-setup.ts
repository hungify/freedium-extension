import type { App } from 'vue'

import { PROXY_URL } from '~/utils'

export function setupApp(app: App) {
  // Inject a globally available `$app` object in template
  app.config.globalProperties.$app = {
    proxyUrl: `${PROXY_URL}`,
  }
}
