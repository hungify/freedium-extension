import { Mode, PROXY_URL } from './constants'

export * from './constants'
export * from './types'

export const isMediumSite = (tabUrl: URL): boolean => {
  const { protocol, hostname } = tabUrl
  if (protocol !== 'https:' || !hostname.includes('medium.com')) return false

  return true
}

export const isConnectedProxy = (url: string): boolean => {
  return url.startsWith(PROXY_URL)
}

export const getCurrentMode = (tabUrl: URL): Mode => {
  if (isMediumSite(tabUrl)) {
    return Mode.BLOCKED
  }

  if (isConnectedProxy(tabUrl.href)) {
    return Mode.PROXY
  }

  return Mode.NORMAL
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
