import { Mode, getCurrentMode, setIcon } from '~/utils'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./content-script-hmr')
}

const setExtensionIcon = async (tabId: number) => {
  const tab = await browser.tabs.get(tabId)
  if (tab.url) {
    const tabUrl = new URL(tab.url)
    const mode = getCurrentMode(tabUrl)

    setIcon(mode, tabId)
  } else {
    setIcon(Mode.NORMAL, tabId)
  }
}

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed')
})

browser.tabs.onActivated.addListener(({ tabId }) => {
  setExtensionIcon(tabId)
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.active) {
    setExtensionIcon(tabId)
  }
})

browser.tabs.onRemoved.addListener(() => {
  chrome.storage.session.remove('currentTab')
})
