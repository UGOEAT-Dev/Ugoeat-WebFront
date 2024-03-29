import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import App from './App.jsx'

/* Theme pour prime react */
import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <PrimeReactProvider>
          <App />
      </PrimeReactProvider>
  </React.StrictMode>
)
