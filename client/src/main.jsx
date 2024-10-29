import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/resetStyles.css'
import './assets/css/index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// const data = await axios.get('/api/test')
// console.log(data)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </React.StrictMode>
)
