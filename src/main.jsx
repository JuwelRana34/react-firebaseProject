import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProfileContextProvider  from "./usercontext/ProfileContextProvider.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode> 
    <ProfileContextProvider> 
       <App /> 
    </ProfileContextProvider> 
  </React.StrictMode>,

)
