import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from './Redux/Store.js'
import axios from "axios";
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
<Provider store={store}>
  <App></App>
</Provider> 



 
)
