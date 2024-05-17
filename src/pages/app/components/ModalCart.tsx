
import cartSvg from "/static.ugoeatonline.com/assets/images/icons/cart-vector.svg"
import OrderCard from "./OrderCard";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { useStoreContext } from "../../../features/store/store.context.js";
import { Icon } from "../../../components/Icon.js";

function ModalCart({onCloseBtnClicked, ...props}: {onCloseBtnClicked?: any, className?: string})
{
    const {cart, removeAll, removeProduct} = useStoreContext()
    const navigate = useNavigate()

    const clearCart = () => {
        if(confirm('Voulez vraiment vider votre panier ?')) {
            removeAll()
        }
    }

    return (
        <div className={"flex flex-col gap-2 bg-gray-50 text-black p-5 " + props.className}>
            <div className="flex justify-between items-center pb-2 ">
                <div className="flex gap-2 items-center">
                    <img src={cartSvg} className="bg-green p-2 rounded-md" alt="cart" />
                    <h3 className="text-xl font-medium">Mon Panier</h3>
                </div>
                <Icon icon="pi-times" className="hover:bg-gray-200 hover:text-black text-gray-400 rounded-md p-1" size={32} onClick={onCloseBtnClicked} />
            </div>
            <div className="overflow-y-scroll">
                <OrderCard
                    onCancelBtnClicked={clearCart}
                    onConfirmBtnClicked={() => {
                        if(cart.products?.length)
                            return navigate('/dashboard/payments')

                        toast.error('Aucun produit dans le panier')
                    }}
                    onItemCancelBtnClicked={(product: Product) => {
                        removeProduct(product)
                    }}
                    products={cart.products}
                    className="bg-white h-auto" />
            </div>
        </div>
    )
}

export default ModalCart;