import { useDispatch, useSelector } from "react-redux";
import { setShowSearchDialog as showDialog, ShowSearchDialogSelector } from "../store/searchSlice";

export default function useShowSearchDialog()
{
    const dispatch = useDispatch()
    const showSearchDialog = useSelector(ShowSearchDialogSelector)

    const setShowSearchDialog = (show: boolean) => dispatch(showDialog(show))

    const displaySearchDialog = () => setShowSearchDialog(true)

    const hideSearchDialog = () => setShowSearchDialog(false)

    return {
        showSearchDialog,
        setShowSearchDialog,
        displaySearchDialog,
        hideSearchDialog
    }
}