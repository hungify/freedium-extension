declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $app: {
      proxyUrl: string
    }
  }
}

// https://stackoverflow.com/a/64189046/479957
export {}
