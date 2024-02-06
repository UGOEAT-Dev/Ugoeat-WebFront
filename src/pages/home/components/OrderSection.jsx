
import orderMapImage from "../../../assets/images/home-order-map.png"
import deliveryImg from "../../../assets/images/delivery.png"
import {NavLink} from "react-router-dom";

export default function OrderSection()
{
    return (
        <div className="container">
            <div className="text-center mt-4">
                <img src={orderMapImage} alt="order-map-image" className="w-100 md:w-10/12 m-auto"/>
            </div>
            <div className="md:flex items-center justify-center text-center">
                <div className="hidden md:block md:w-2/5">
                    <img src={deliveryImg} alt="delivery" className="w-100"/>
                </div>
                <div className="font-bold md:w-1/2 md:text-left">
                    <h3 className="text-2xl md:text-3xl p-5"><span className="text-green">Commandez en ligne</span> le meilleur de la cuisine Camerounaise</h3>
                    <p className="text-gray-700 p-3">Avec UgoEat, pas besoin de vous déplacer ! Avec notre service optimal pour restaurants en ligne, aucun besoin de se déplacer ! Le site de restauration UgoEat fera le suivi de votre commande en ligne à votre destination. </p>
                </div>
            </div>
            <div className="text-center my-5">
                <NavLink to="/order" className="text-white rounded bg-green p-3 hover:bg-green-700 cursor-pointer">Commandez</NavLink>
            </div>
        </div>
    )
}