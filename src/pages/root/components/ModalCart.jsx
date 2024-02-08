
import {AiOutlineClose} from "react-icons/ai";
import cartSvg from "../../../assets/images/icons/cart-vector.svg"
import OrderCard from "./OrderCard.jsx";

function ModalCart({products = [], onConfirmBtnClicked = null, onCancelBtnClicked = null, onItemCancelBtnClicked = null, onCloseBtnClicked = null, ...props})
{
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
                <OrderCard onConfirmBtnClicked={onConfirmBtnClicked} onCancelBtnClicked={onConfirmBtnClicked} onItemCancelBtnClicked={onItemCancelBtnClicked} products={products} className="bg-white h-auto" />
            </div>
        </div>
    )
}

export default ModalCart;