import { Toaster } from "react-hot-toast"
import { AppContext } from "./core/context/AppContext"
import {PrimeReactProvider} from "primereact/api"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { useLocalStorage } from "./core/hooks/useLocalStorage"
import { User } from "./core/types/User"
import { Mutator } from "./core/types/mutator/Mutator"
import { Cart } from "./core/types/Cart"
import useCart from "./core/hooks/useCart"


function App()
{
  const [user, setUser] = useLocalStorage<User>('user', {id: 0})
  const [token, setToken] = useLocalStorage<string>('token', '')
  const [cart, setCart] = useCart()
  const [onlineStatus, setOnlineStatus] = useLocalStorage<boolean>('onlineStatus', true)
  
  return (
    <AppContext.Provider value={{
      user: user as User,
      onlineStatus: onlineStatus as boolean,
      token: token as string,
      cart: cart as Cart,
      updateCart: setCart as Mutator<Cart>,
      setOnlineStatus: setOnlineStatus as Mutator<boolean>,
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