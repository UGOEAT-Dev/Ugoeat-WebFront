
import bannerImg from "/static.ugoeatonline.com/assets/images/home-banner.png"
import homeBannerSec from "/static.ugoeatonline.com/assets/images/home-banner-sec.png"
import BannerCardItem from "./BannerCardItem.js";
// icons
import grennCoursierIcon from "/static.ugoeatonline.com/assets/images/icons/green-coursier.png"
import grennGroupeIcon from "/static.ugoeatonline.com/assets/images/icons/green-group.png"
import grennLocationIcon from "/static.ugoeatonline.com/assets/images/icons/green-location.png"
import grennVectorIcon from "/static.ugoeatonline.com/assets/images/icons/green-vector.png"

export default function HomeBanner()
{
    return (
        <div className="flex items-center justify-center text-white font-bold relative h-screen bg-center bg-cover" style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundColor: "#474947FF"
        }}>
            <div className="md:flex lg:pt-20 justify-evenly items-center">
                <div className="md:w-1/3 text-lg text-center lg:text-left p-2">
                    <h3 className="text-4xl mb-2">Meilleur site de <span className="text-amber-400">Restauration</span> en ligne a Douala et Yaounde</h3>
                    <p>UGOEAT est la plateforme Leader de restauration en ligne au Cameroun</p>
                </div>

                <div className="relative hidden md:flex items-center justify-center h-fit w-fit">
                    <div className="flex-row absolute w-90 h-full">
                        <div className="ml-20 mt-10">
                            <BannerCardItem image={grennCoursierIcon} text="Livraison a domicile jour et nuit" />
                        </div>
                        <div className="mt-20 ml-80">
                            <BannerCardItem image={grennGroupeIcon} text="Livraison en 45 min" />
                        </div>
                        <div className="mt-20">
                            <BannerCardItem image={grennVectorIcon} text="Le meilleur de la cuisine camerounaise" />
                        </div>
                        <div className="mt-14 ml-72">
                            <BannerCardItem image={grennLocationIcon} text="Meilleur restaurant a proximite" />
                        </div>
                    </div>
                    <img src={homeBannerSec} alt="banner-secondary-image" width="70%"/>
                </div>
            </div>
        </div>
    )
}