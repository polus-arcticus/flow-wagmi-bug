import { http, createConfig } from 'wagmi'
import { flowMainnet, flowTestnet  } from 'wagmi/chains'
import { injected  } from 'wagmi/connectors'
import { unstable_connector, fallback  } from '@wagmi/core'
import { custom  } from 'viem'

export const config = createConfig({
  chains: [flowMainnet, flowTestnet],
  connectors: [
  ],
  transports: {
    [flowMainnet.id]: fallback([custom(window.ethereum), unstable_connector(injected)]),
    [flowTestnet.id]: fallback([custom(window.ethereum), unstable_connector(injected)]),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
