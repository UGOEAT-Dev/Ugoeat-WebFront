import {NavLink} from "react-router-dom";
import { routesConfig } from "../../../../router.config";

export default function ExploreMenu()
{
    return (
        <div className="p-5 text-center">
            <h2 className="text-2xl md:text-4xl font-bold p-5">Les meilleurs <span className="text-green">restaurants</span> a<br/> proximites</h2>
            <p className="p-4 text-gray-700 md:font-medium mb-3">
                U GO EAT se nourrit des rencontres avec les chefs des meilleurs restaurants au<br className="hidden md:block" />
                Cameroun, de l’expérience de ses partenaires et du savoir-faire de ses équipes <br className="hidden md:block" />
                pour réinventer la réservation et la commande en ligne en Afrique dans le secteur <br className="hidden md:block" />
                de restauration, notamment à DOUALA et YAOUNDE.
            </p>
            <NavLink to={routesConfig.routes.app.order} className="inline-block cursor-pointer bg-green hover:bg-green-700 text-base text-white p-3 rounded-md md:text-2xl">Explorez le menu</NavLink>
        </div>
    )
}