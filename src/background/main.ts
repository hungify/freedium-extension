import {
  isSiteBlocked,
  isSiteProxy,
  setIcon,
  type CurrentTab,
  type Mode,
} from '~/utils'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

const setExtensionIcon = async (tabId: number) => {
  const tab = await browser.tabs.get(tabId)
  if (tab.url) {
    const tabUrl = new URL(tab.url)
    const isBlocked = await isSiteBlocked(tabUrl)
    const isProxy = isSiteProxy(tabUrl)

    let status: Mode = 'normal'
    if (isBlocked) {
      status = 'blocked'
    } else if (isProxy) {
      status = 'proxy'
    }

    setIcon(status, tabId)

    const { currentTab } = (await chrome.storage.session.get('currentTab')) as {
      currentTab: CurrentTab
    }

    currentTab?.tabId !== tabId || !currentTab?.tabId
      ? await chrome.storage.session.set({
          currentTab: {
            tabId,
            url: tabUrl.href,
            originalUrl: tabUrl.href,
            mode: status,
          },
        })
      : await chrome.storage.session.set({
          currentTab: {
            ...currentTab,
            url: tabUrl.href,
            mode: status,
          },
        })
  } else {
    setIcon('normal', tabId)
  }
}

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed')
})

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  setExtensionIcon(tabId)
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.active) {
    setExtensionIcon(tabId)
  }
})

browser.tabs.onRemoved.addListener(async () => {
  chrome.storage.session.remove('currentTab')
})
