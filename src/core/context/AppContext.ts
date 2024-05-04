import {createContext, useContext} from "react";
import { Mutator, MutatorFactory } from "../types/mutator/Mutator";
import { User } from "../types/User";
import { Cart } from "../types/Cart";


interface AppContextItemType
{
    user: User,
    token: string,
    onlineStatus: boolean,
    cart: Cart,
    setOnlineStatus: Mutator<boolean>,
    setToken: Mutator<string>,
    setUser: Mutator<User>
    updateCart: Mutator<Cart>
}

const defaultValue: AppContextItemType = {
    user: {id: 0},
    onlineStatus: true,
    token: '',
    cart: new Cart(),
    setOnlineStatus: MutatorFactory.createEmpty<boolean>(),
    setToken: MutatorFactory.createEmpty<string>(),
    setUser: MutatorFactory.createEmpty<User>(),
    updateCart: MutatorFactory.createEmpty<Cart>()
}

const AppContext = createContext<AppContextItemType>(defaultValue)

const useAppContext = () => useContext(AppContext)

export { AppContext, useAppContext }