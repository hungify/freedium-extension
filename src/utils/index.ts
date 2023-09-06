import { AVAILABLE_PROTOCOLS, PROXY_URL } from './constants'
import type { Mode } from './types'

export * from './constants'
export * from './types'

export const isSiteBlocked = async (tabUrl: URL): Promise<boolean> => {
  const { href, protocol } = tabUrl
  if (!AVAILABLE_PROTOCOLS.includes(protocol)) return false
  try {
    const res = await fetch(href)

    return !res.ok
  } catch (error) {
    return true
  }
}

export const isSiteProxy = (tabUrl: URL): boolean => {
  const { href } = tabUrl

  return href.startsWith(PROXY_URL)
}

export const setIcon = (mode: Mode, tabId: number): void => {
  browser.action.setIcon({
    tabId,
    path: {
      32: `/assets/32-${mode}.png`,
      48: `/assets/48-${mode}.png`,
      64: `/assets/64-${mode}.png`,
      128: `/assets/128-${mode}.png`,
    },
  })
}
