import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ContextDataProvider } from './Services/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
<ContextDataProvider>
<App />
</ContextDataProvider>
</BrowserRouter>

)
