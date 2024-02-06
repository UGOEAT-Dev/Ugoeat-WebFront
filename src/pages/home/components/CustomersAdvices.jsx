
import CustomerAdviceCard from "./CustomerAdviceCard.jsx";
import { customersAdvices } from "../datas.jsx"
import bgCustomerAdviceImage from "../../../assets/images/bg-customers-advices.png"
import avatar1 from "../../../assets/images/avatars/avatar-1.png"
import avatar2 from "../../../assets/images/avatars/avatar-2.png"

export default function CustomersAdvices()
{
    return (
        <div className="md:flex items-center justify-center px-3 py-10">
            <div className="text-white px-10 md:px-20 py-10 w-full rounded-lg bg-cover bg-center" style={{
                backgroundImage: `url(${bgCustomerAdviceImage})`
            }}>
                <h3 className="text-2xl font-bold pb-5">Ce que nos clients disent de <span className="text-green">UGOEAT</span></h3>
                <ul className="list-disc">
                    {customersAdvices.map((k, i) => {
                        return <li key={i}>{k}</li>
                    })}
                </ul>
                <div className="flex py-5 justify-evenly gap-5 ju">
                    <p className="text-center"><span className="text-green text-3xl font-medium ">+200</span><br />Clients Satisfaits</p>
                    <p className="text-center"><span className="text-green text-3xl font-medium ">+10</span><br />Awards</p>
                    <p className="text-center"><span className="text-green text-3xl font-medium ">+150</span><br />Plats au menu</p>
                </div>
            </div>
            <CustomerAdviceCard className="hidden md:block right-10 md:py-10 bg-gray-100" image={avatar1} name="Carine Mbeumo" advice="Merci pour ma commande rapide. Repas très délicieux et excellent service!" starCount={4} />
            <CustomerAdviceCard className="hidden md:block bg-gray-300 shadow-lg" image={avatar2} name="Nadine Tankeu" advice="Je n'étais pas habituée aux commandes en ligne mais j'avoue etre ravie de cette innovation." starCount={3} />
        </div>
    )
}