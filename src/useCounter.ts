import { useState, useEffect, useCallback } from 'react'
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'
import Counter from './Counter.json'

import { useAccount } from 'wagmi'

import { config } from './wagmi'

export const useCounter = () => {
  const { address, chain } = useAccount()
  const [count, setCount] = useState(0)
  const [error, setError] = useState('')
  const setCounter = useCallback(async (newNumber: number) => {
    console.log('address', address, 'chain', chain)
    if (address && chain) {
      try {
        const hash = await writeContract(config, {
          address: Counter.address as `0x${string}`,
          abi: Counter.abi,
          functionName: 'setNumber',
          args: [newNumber],
        })

        console.log('hash', hash)
        const receipt = await waitForTransactionReceipt(config, {
          hash,
        })

        console.log('receipt', receipt)
        setCount(newNumber)

      } catch (e) {
        console.error(e)
        setError(e.message)
      }
    } else {
      console.log('not connected')
    }
  }, [address, chain])


  return {
    count,
    setCounter,
    error
  }
}
