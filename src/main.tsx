import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/* Theme pour prime react */
import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'

/* Ma feuille de style principale */
import './styles/globals.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
