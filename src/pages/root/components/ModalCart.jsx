
import {AiOutlineClose} from "react-icons/ai";
import cartSvg from "../../../assets/images/icons/cart-vector.svg"
import OrderCard from "./OrderCard.jsx";
import AppContext from "../../../AppContext.jsx";
import {useContext} from "react";

function ModalCart({onCloseBtnClicked = null, ...props})
{
    const {orders, setOrders} = useContext(AppContext)

    return (
        <div className={"flex flex-col gap-2 bg-gray-50 text-black p-5 " + props.className}>
            <div className="flex justify-between items-center pb-2 ">
                <div className="flex gap-2 items-center">
                    <img src={cartSvg} className="bg-green p-2 rounded-md" alt="cart" />
                    <h3 className="text-xl font-medium">Mon Panier</h3>
                </div>
                <AiOutlineClose className="hover:bg-gray-200 hover:text-black text-gray-400 rounded-md p-1" size={32} onClick={onCloseBtnClicked} />
            </div>
            <div className="overflow-y-scroll">
                <OrderCard
                    onCancelBtnClicked={() => setOrders({products:[]})}
                    onConfirmBtnClicked={() => console.log("Payment page")}
                    onItemCancelBtnClicked={(product) => {
                        const products = orders.products.filter( p => p.id !== product.id )
                        setOrders({...orders, products: products})
                    }}
                    products={orders.products}
                    className="bg-white h-auto" />
            </div>
        </div>
    )
}

export default ModalCart;