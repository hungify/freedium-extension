import { PROXY_URL } from '~/utils'
import type { App } from 'vue'

export function setupApp(app: App) {
  // Inject a globally available `$app` object in template
  app.config.globalProperties.$app = {
    proxyUrl: `${PROXY_URL}`,
  }
}
