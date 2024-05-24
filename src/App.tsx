import { Toaster } from "react-hot-toast"
import {PrimeReactProvider} from "primereact/api"
import { RouterProvider } from "react-router-dom"
import router from "@/router/router"
import { Provider } from "react-redux"
import store from "./features/store/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


const queryClient = new QueryClient()

function App()
{
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PrimeReactProvider>
      <Toaster />
    </Provider>
  )
}

export default App