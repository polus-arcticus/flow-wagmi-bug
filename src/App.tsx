import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useCounter } from './useCounter'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { count, setCounter, error: counterError } = useCounter()
  const [newNumber, setNewNumber] = useState(0)
  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      { account.status === 'connected' && (
        <form onSubmit={(e) => {
          e.preventDefault()
          setCounter(newNumber)}}>
          <input type="text"  onChange={(e) => setNewNumber(Number(e.target.value))} />
          <button type="submit">Submit</button>
        {(counterError.length > 0 )&& <div>{counterError}</div>}
        </form>
      )

      }
    </>
  )
}

export default App
