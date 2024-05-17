import { Toaster } from "react-hot-toast"
import {PrimeReactProvider} from "primereact/api"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { Provider } from "react-redux"
import store from "./features/store/store"

function App()
{
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
      <Toaster />
    </Provider>
  )
}

export default App