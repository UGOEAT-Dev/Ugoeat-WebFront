import {customerPurposes} from "../datas.jsx";
import bgUserExp from "/static.ugoeatonline.com/assets/images/bg-exp.png"

function ShareExperience()
{
    return (
        <div>
            <h3 className="text-center text-2xl font-bold">Partagez votre experience UGOEAT</h3>
            <div className="bg-cover bg-center p-6" style={{
                backgroundImage: `url(${bgUserExp})`
            }}>
                <form className="flex flex-col md:flex-row space-x-4 justify-center md:justify-end items-center" action="#" id="formShareExp">
                    <div className="space-y-5">
                        <div className="text-white">
                            <span>Etes-vous un client ou un restaurant?</span>
                            <div className="space-x-2">
                                <input type="radio" value="1" name="isRestaurant"/>
                                <label htmlFor="isRestaurant">Restaurant</label>
                            </div>
                            <div className="space-x-2">
                                <input type="radio" value="0" name="isRestaurant"/>
                                <label htmlFor="isRestaurant">Client</label>
                            </div>
                        </div>
                        <div className="text-white">
                            <label htmlFor="">Depuis combien de temps utilisez-vous UGOEAT?</label>
                            <div>
                                <div className="space-x-2">
                                    <input type="radio" value="0" name="startingTime"/>
                                    <label htmlFor="startingTime">Je viens de debuter</label>
                                </div>
                                <div className="space-x-2">
                                    <input type="radio" value="1" name="startingTime"/>
                                    <label htmlFor="startingTime">Environ un mois</label>
                                </div>
                                <div className="space-x-2">
                                    <input type="radio" value="2" name="startingTime"/>
                                    <label htmlFor="startingTime">Entre 02 et 12 mois</label>
                                </div>
                                <div className="space-x-2">
                                    <input type="radio" value="3" name="startingTime"/>
                                    <label htmlFor="startingTime">Plus d&apos;un an</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className="text-white">Veuillez evaluer votre satisfaction</label>
                            <div>
                                <select name="rating" className="p-1 rounded" id="ratingSelectBox">
                                    {new Array(5).fill(0).map((_, i) => {
                                        return <option key={i} value={i}>{i}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-left md:text-center flex-row mt-5 space-y-5">
                        <div className>
                            <label htmlFor="" className="text-white">Que devrions nous ameliorer ?</label><br />
                            <select name="purposeTopic" id="" className="p-2 rounded-md">
                                <option value="none">Choisissez une option</option>
                                {customerPurposes.map((p) => {
                                    return (<option key={p.value} value={p.value}>{p.text}</option>)
                                })}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="" className="text-white">Comment pouvons-nous ameliorer ?</label><br />
                            <textarea className="border-4 rounded-md" cols={20} rows={5} name="purposeContent"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="bg-green p-3 w-full rounded text-white font-bold">Envoyer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShareExperience