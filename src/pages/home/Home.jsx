import HomeBanner from "./components/HomeBanner.jsx";
import ExploreMenu from "./components/ExploreMenu.jsx";
import OrderSection from "./components/OrderSection.jsx";
import CustomersAdvices from "./components/CustomersAdvices.jsx";

export default function Home()
{
    return (
        <>
            <HomeBanner />
            <ExploreMenu />
            <OrderSection />
            <CustomersAdvices />
        </>
    )
}