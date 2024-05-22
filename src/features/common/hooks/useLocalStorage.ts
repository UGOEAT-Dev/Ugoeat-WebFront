
import {useState} from "react";

const useLocalStorage = <T>(key:string = '', initial: T | null) => {

    const [ data, setData ] = useState<T>(() => {
        if(localStorage.getItem(key))
            return JSON.parse(localStorage.getItem(key) ?? '')
        return initial
    })

    return [
        data as T,
        (v: T) => {
            localStorage.setItem(key, JSON.stringify(v))
            setData(v)
        }
    ]
}

export default useLocalStorage