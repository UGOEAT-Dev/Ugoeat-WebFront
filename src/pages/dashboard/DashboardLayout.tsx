
import {Link, Outlet} from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";
import Sidebar from "./components/Sidebar";
import {useEffect, useState} from "react";
import { useMiddleware } from "@/features/common/hooks";
import { useAuth, useEmailVerificationNotifier } from "@/features/auth/hooks";
import useSession from "@/features/session/hooks/useSession";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Icon } from "@/features/common/components/elements/Icon";

function DashboardLayout()
{
    const {isAuth} = useMiddleware('auth')
    useAuth(undefined, 'auth')
    const [sidebarMode, setSidebarMode] = useState<1|2>(1)
    const {session} = useSession()
    const path = pathname2link(window.location.pathname)
    const [showEmailVerificationDialog, setShowDialog] = useState(session?.user.email_verified_at === null)
    const {notify, mutator} = useEmailVerificationNotifier()

    useEffect(() => {
        document.title = "Dashboard | UGOEAT";
    }, [])

    if( !isAuth ) return ( <div></div>)

    return (
        <div className="bg-gray-50 min-h-screen">
            <DashboardHeader
                toggleSidebar={() => setSidebarMode(v => v === 1? 2 : 1)} />
            <main className={`${sidebarMode === 1 ? 'block sm:flex' : 'flex'} pt-16 sm:pt-0 gap-2 min-h-screen`}>
                <Sidebar mode={sidebarMode}/>
                <div className="relative w-full p-3">
                    <p className="hidden sm:block absolute right-3 top-5 text-sm capitalize">
                        <Link to='/' className="text-blue-600">~</Link> / dashboard / <Link to={path.link} className="text-blue-600">{path.text}</Link>
                    </p>
                    <Outlet />
                </div>
            </main>

            <Dialog 
                header="Verifiez votre compte" 
                headerClassName="px-3"
                contentClassName="p-3"
                visible={showEmailVerificationDialog} 
                modal={showEmailVerificationDialog} blockScroll={showEmailVerificationDialog}
                onHide={() => setShowDialog(false)}>
                <p>Pour des raisons de securités, la verification des adresses emails est obligatoire.</p>
                <p>Veuillez verifier votre compte pour beneficiez de nos differents services.</p>
                <div className="flex flex-col mt-32">
                    <Button 
                        label={mutator.isSuccess ? "Email Envoyé avec success" : "Envoyez le lien de verification"} 
                        className={`text-white py-2 px-3 bg-primary`} 
                        disabled={mutator.isSuccess}
                        onClick={() => notify(session?.user.email as string)}>
                        {mutator.isSuccess ?
                            <Icon icon="pi-check-circle"/> :
                            <Icon icon="pi-envelope" />
                        } 
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

function pathname2link(path: string)
{
    return {
        link: path,
        text: path.split('/').pop()
    }
}

export default DashboardLayout