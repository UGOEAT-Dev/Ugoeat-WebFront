import { Dialog } from "primereact/dialog"
import useApiSearch from "../hooks/useApiSearch"
import useShowSearchDialog from "../hooks/useShowSearchDialog"
import { useState } from "react"
import { Input } from "@/features/common/components/elements/input/Input"
import SearchResultView from "./SearchResultView"

export default function SearchDialog()
{

    const {apiSearch, data, isSuccess, isPending, isError} = useApiSearch()
    const [searchString, setSearchString] = useState(String())
    const { showSearchDialog, hideSearchDialog } = useShowSearchDialog()

    const onHide = () => { hideSearchDialog() }

    const Header = () => (
        <header className="w-full">
            <Input 
                value={searchString} 
                autoFocus
                placeholder="Type something to search ..."
                onChange={(e) => {
                    const query = e.target.value
                    setSearchString(query)
                    
                    if(query.length === 0) return;
                    
                    apiSearch({query}, {
                        onError: () => { console.log("[SearchDialog] Erreur lors de la recherche") }
                    })
                }} 
                icon="pi pi-search" 
                className="bg-transparent text-sm w-full" 
                inputClassname="text-sm" />
        </header>
    )

    return (
        <>
            {showSearchDialog && 
            <Dialog 
                visible={showSearchDialog} 
                onHide={onHide}
                modal={true}
                blockScroll={true}
                headerClassName="flex flex-row text-sm p-2 items-center justify-between"
                header={Header}
            >
                <div className="p-2">
                    {isPending? 
                        <span>Recherche ...</span>:
                    isSuccess? 
                        <SearchResultView query={searchString} searchResult={data} /> : 
                    isError || <p>Rien a rechercher</p>
                    }
                </div>
            </Dialog>
            }
        </>
    )
}