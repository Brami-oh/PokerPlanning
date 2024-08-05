import React from 'react'
import ReactDOM from 'react-dom/client'
import FetchProvider from './App/FetchProvider';

import App from './App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FetchProvider>
            <App />
        </FetchProvider>
    </React.StrictMode>,
)
