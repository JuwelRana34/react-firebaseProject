import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProfileContextProvider  from "./usercontext/ProfileContextProvider.jsx"

// Import the PWA service worker
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content is available. Reload?')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode> 
    <ProfileContextProvider> 
       <App /> 
    </ProfileContextProvider> 
  </React.StrictMode>,

)
