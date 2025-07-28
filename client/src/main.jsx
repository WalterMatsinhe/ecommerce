import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './store/store.js'
import './index.css'
import { Toaster} from 'sonner';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store = {store}>
    <App />
    <Toaster/>
  </Provider>
  </BrowserRouter>
)
