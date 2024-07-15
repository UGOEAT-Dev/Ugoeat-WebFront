import { ComponentProps, LegacyRef, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useShowSearchDialog from "../hooks/useShowSearchDialog";

export interface SearchButtonProps extends ComponentProps<'button'> { }

export default function SearchButton(props: SearchButtonProps)
{
    const ref = useRef<HTMLButtonElement>()
    const { displaySearchDialog } = useShowSearchDialog()
    useHotkeys('ctrl+k', () => {
        ref.current?.click()
    }, { scopes: ['search']})

    const onClick = () => { displaySearchDialog() }

    return (
        <button 
            ref={ref as LegacyRef<HTMLButtonElement>} 
            className="hover:opacity-100 opacity-90 rounded bg-gray-800 text-white text-sm p-0.5 box-content" 
            onClick={onClick}
            {...props}>
            <span className="flex justify-between gap-3 items-center px-3 py-1.5 border border-gray-500 rounded ">
                <span className="opacity-70">Search ...</span>
                <span className="border border-black bg-gray-900 p-0.5 rounded"><kbd>Ctrl</kbd>+<kbd>k</kbd></span>
            </span>
        </button>
    )
}