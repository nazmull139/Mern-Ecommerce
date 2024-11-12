import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import 'sweetalert2/dist/sweetalert2.js'
import './index.css'
import { store } from './redux/store.js'
import router from './routers/router.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <RouterProvider router={router} />
  </Provider>,
)
