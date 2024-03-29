import {calculateTotal, formatAmount} from "../../../lib/helpers.jsx";
import {useContext, useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom"
import AppContext from "../../../AppContext.jsx";
import InputWithLabel from "../../../components/input/InputWithLabel.jsx";
import postOrder from "../../../api/orders/postOrder.jsx";
import toast from "react-hot-toast";
import {Dialog} from "primereact/dialog"
import {Button} from "primereact/button"
import {ProgressSpinner} from "primereact/progressspinner"
import {config} from "../../../config.jsx";

function DashboardPayments()
{
    const {orders, setOrders, user, token} = useContext(AppContext)
    const [visible, setVisible] = useState(false)
    const [loading,setLoading] = useState(false)
    const remoteOrderRef = useRef()
    const navigate = useNavigate()
    const fees = 500;
    const orderAmount = calculateTotal(orders.products)
    const confirmBtnDisabled = orders.products.length === 0

    const confirmPayment = (e) => {
        setLoading(true)
        setVisible(true)
        const products = orders.products.map((p) => ({id: p.id, quantity: p.quantity}))
        postOrder(user.id,token, {
            delivery: user.address, products
        }).then(response => {
            toast.success("Commande envoye avec success", {duration:2000})
            remoteOrderRef.current = response.data.data
        }).catch(error => {
            toast.error("Oupps! Quelque chose c'est mal passe")
            setVisible(false)
        }).finally(() => {
            setLoading(false)
        })
    }

    const onDialogHide = () => {
        if(!loading) {
            setVisible(false)
            navigate('/dashboard/orders')
            window.open(`https://wa.me/${config.ugoeat.tel}`, 'redirectToWhatsapp')
        }
    }

    const _AmountComponent = ({className, title, amount}) => (
        <div className={"flex justify-between px-2 " + className}>
            <span className="capitalize">{title}</span>
            <span>{formatAmount(amount)} XAF</span>
        </div>
    )

    const _DialogFooter = ({hide}) => (
        <Button
            className="block w-full bg-secondary my-3 p-3 rounded-md text-white"
            icon="pi pi-whatsapp"
            label="&thinsp;&thinsp;Continuer"
            onClick={hide}
        ></Button>
    )

    return (
        <>
        <div>
            <h1 className="text-2xl font-bold">Payement</h1>
            <div className="w-full h-full my-5 md:px-5 flex flex-col md:flex-row gap-5 justify-center">
                <div className="w-full bg-white p-5 shadow-md md:min-w-[300px]">
                    <h3 className="text-lg">Details de livraison</h3>
                    <p className="text-sm text-gray-700">Mettez a jour les informations de livraison depuis la section Profil.</p>
                    <div className="m-5 flex flex-col gap-4">
                        <InputWithLabel disabled={true} label="Numéro de téléphone du destinataire"
                                        placeholder={user.tel || "Aucun"}/>
                        <InputWithLabel disabled={true} label="Adresse de livraison" placeholder={user.address || "Aucun"}/>
                        <InputWithLabel disabled={true} label="Duree de livraison apres payement" value={"30 min"}/>
                    </div>
                    <Link
                        className="block p-3 rounded text-center font-bold bg-secondary text-white"
                        title="Mettre a jour le profile"
                        to="/dashboard/profile">
                            Editer votre Profil
                    </Link>
                </div>
                <div className="w-full bg-white p-5 flex flex-col gap-3 rounded shadow-md md:min-w-[350px]">
                    <h3 className="text-lg">Montant Total</h3>
                    <div className="h-full flex flex-col gap-1">
                        <_AmountComponent amount={orderAmount} title="Sous Total"/>
                        <_AmountComponent amount={fees} title="Livraison" className="text-gray-500 text-sm"/>
                        <hr/>
                        <_AmountComponent amount={orderAmount + fees} title="Total"
                                          className="font-bold text-md my-2"/>
                        <hr/>
                    </div>
                    <button
                        title="Finaliser le payement"
                        className={`rounded p-3 text-white font-bold ${confirmBtnDisabled ? 'input-disabled' : 'bg-green'}`}
                        onClick={confirmPayment}
                        disabled={confirmBtnDisabled}
                    >
                        Confirmer et Payer
                    </button>
                </div>
            </div>
        </div>
            {visible &&
                <Dialog
                    className="w-[90vw] md:w-[50vw]"
                    visible={visible} modal
                    onHide={onDialogHide}
                    content={({hide}) => {
                        if(loading)
                            return ( <div className="w-full bg-white text-center p-10 rounded-md"><ProgressSpinner /></div> )

                        //
                        setTimeout(() => {
                            setOrders({products:[]})
                        }, 5000)

                        return (
                            <div className="w-full bg-white p-3 rounded-md">
                                <p className="m-2">
                                    Votre commande a ete envoye avec success, il ne vous reste plus qu&apos;a effectuer le payement.<br/>
                                    Une fois le payement effectue sur l&apos;un de nos contact (<span className="font-bold">{config.ugoeat.momo.tel} | {config.ugoeat.om.tel}</span>), vous devez faire une capture d&apos;ecran de ce message ainsi que celui recu par <span className="font-bold">MTN|Orange</span> apres le payement, et nous l&apos;envoyez sur notre whatsapp.
                                </p>
                                <div className="m-2" style={{ fontFamily: "consolas"}}>
                                    <ul className="list-none">
                                        <li><span className="font-bold">ID COMMANDE</span> : {remoteOrderRef.current.id}</li>
                                        <li><span className="font-bold">ID CLIENT</span> : {remoteOrderRef.current.customer_id}</li>
                                        <li><span className="font-bold">Adresse de Livraison</span> : {remoteOrderRef.current.delivery}</li>
                                        <li><span className="font-bold">Montant Total</span> : {formatAmount(remoteOrderRef.current.amount)} XAF</li>
                                    </ul>
                                </div>
                                <_DialogFooter hide={hide} />
                            </div>
                        )
                    }}
                >
                </Dialog>
            }
        </>
    );

}

export default DashboardPayments