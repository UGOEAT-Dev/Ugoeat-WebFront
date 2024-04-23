import { Toaster } from "react-hot-toast"
import { AppContext } from "./core/context/AppContext"
import {PrimeReactProvider} from "primereact/api"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { useLocalStorage } from "./core/hooks/useLocalStorage"
import { User } from "./core/types/User"
import { Mutator } from "./core/types/mutator/Mutator"
import { Order } from "./core/types/Order"


function App()
{
  const [user, setUser] = useLocalStorage<User>('user', {id: 0})
  const [order, setOrder] = useLocalStorage<Order>('order', { products: [] })
  const [token, setToken] = useLocalStorage<string>('token', '')
  const [onlineStatus, setOnlineStatus] = useLocalStorage<boolean>('onlineStatus', true)

  return (
    <AppContext.Provider value={{
      user: user as User,
      onlineStatus: onlineStatus as boolean,
      token: token as string,
      order: order as Order,
      setOnlineStatus: setOnlineStatus as Mutator<boolean>,
      setOrder: setOrder as Mutator<Order>,
      setToken: setToken as Mutator<string>,
      setUser: setUser as Mutator<User>
    }}>
      
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
      <Toaster />
    </AppContext.Provider>
  )
}

export default App