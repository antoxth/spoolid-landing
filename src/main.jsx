import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App lang="en" />} />
        <Route path="/it" element={<App lang="it" />} />
        <Route path="/de" element={<App lang="de" />} />
        <Route path="/fr" element={<App lang="fr" />} />
        <Route path="/es" element={<App lang="es" />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
