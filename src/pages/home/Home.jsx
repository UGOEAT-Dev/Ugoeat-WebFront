import HomeBanner from "./components/HomeBanner.jsx";
import ExploreMenu from "./components/ExploreMenu.jsx";
import OrderSection from "./components/OrderSection.jsx";
import CustomersAdvices from "./components/CustomersAdvices.jsx";
import ShareExperience from "./components/ShareExperience.jsx";
import {useEffect} from "react";

export default function Home()
{
    useEffect(() => {
        document.title = "Accueil | UGOEAT";
        document.querySelector('meta[property="og:title"]').content = "Accueil";
    }, [])

    return (
        <>
            <HomeBanner />
            <ExploreMenu />
            <OrderSection />
            <CustomersAdvices />
            <ShareExperience />
        </>
    )
}