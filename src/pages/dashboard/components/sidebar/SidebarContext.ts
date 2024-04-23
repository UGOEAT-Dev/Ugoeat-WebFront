import {createContext} from "react";

/**
 * mode: represent the mode of the sidebar (1->fullMode, 2->collapseMode)
 * @type {React.Context<{mode: number}>}
 */
export const SidebarContext = createContext({
    mode: 1
})
