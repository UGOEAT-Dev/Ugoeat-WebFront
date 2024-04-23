import {createContext, useContext} from "react";
import { Mutator, MutatorFactory } from "../types/mutator/Mutator";
import { User } from "../types/User";
import { Order } from "../types/Order";


interface AppContextItemType
{
    user: User,
    token: string,
    order: Order,
    onlineStatus: boolean, 
    setOnlineStatus: Mutator<boolean>,
    setToken: Mutator<string>,
    setOrder: Mutator<Order>,
    setUser: Mutator<User>
}

const defaultValue: AppContextItemType = {
    user: {id: 0},
    onlineStatus: true,
    token: '',
    order: {},
    setOnlineStatus: MutatorFactory.createEmpty<boolean>(),
    setToken: MutatorFactory.createEmpty<string>(),
    setOrder: MutatorFactory.createEmpty<Order>(),
    setUser: MutatorFactory.createEmpty<User>()
}

const AppContext = createContext<AppContextItemType>(defaultValue)

const useAppContext = () => useContext(AppContext)

export { AppContext, useAppContext }