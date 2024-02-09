
import {useState} from "react";

const useLocalStorage = (key = '', initial) => {

    const [ data, setData ] = useState(() => {
        if(localStorage.getItem(key))
            return JSON.parse(localStorage.getItem(key))
        return initial
    })

    return [
        data,
        (v) => {
            localStorage.setItem(key, JSON.stringify(v))
            setData(v)
        }
    ]
}

export { useLocalStorage }