import HomeBanner from "./components/HomeBanner";
import ExploreMenu from "./components/ExploreMenu";
import OrderSection from "./components/OrderSection";
import CustomersAdvices from "./components/CustomersAdvices";
import ShareExperience from "./components/ShareExperience";
import {useEffect} from "react";

export default function AppHome()
{
    useEffect(() => {
        document.title = "Accueil | UGOEAT";
        // document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content = "Accueil";
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