import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PrivyProvider } from '@privy-io/react-auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID} // Use environment variable for Privy app ID
      config={{
        loginMethods: ["google", "discord", "sms"], // Set login methods based on environment
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>,
)
