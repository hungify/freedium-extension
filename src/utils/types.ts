export type Mode = 'normal' | 'blocked' | 'proxy'

export interface CurrentTab {
  url: string
  originalUrl: string
  mode: Mode
  tabId: number
}
