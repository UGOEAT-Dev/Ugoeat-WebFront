import Input from "../../../components/input/Input.jsx";

function NewsLetter({className = "", onEmailChanged = null, onSubmit = null})
{
    return (
        <form className={"p-10 space-y-5 " + className} id="formNewsLetter" action="#">
            <p className="text-center">Inscrivez vous a notre newsletter pour reccevoir les offres speciales UGOEAT</p>
            <div className="flex mx-auto w-fit flex-col sm:flex-row space-y-5 sm:space-x-5 sm:space-y-0 justify-center text-black items-center">
                <Input className="min-w-[200px]" onChange={onEmailChanged} placeholder="Email"/>
                <button className="bg-green text-white rounded-xl text-xl p-1 min-w-[200px]" type="submit" onClick={onSubmit}>S&apos;inscrire</button>
            </div>
        </form>
    )
}

export default NewsLetter