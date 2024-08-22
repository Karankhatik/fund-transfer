import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup, Signin, Dashboard, SendMoney } from './pages/index';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
