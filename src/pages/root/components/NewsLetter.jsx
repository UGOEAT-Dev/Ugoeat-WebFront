import Input from "../../../components/Input.jsx";

function NewsLetter({className = "", onEmailChanged = null, onSubmit = null})
{
    return (
        <form className={"p-10 space-y-5 " + className} id="formNewsLetter" action="#">
            <p className="text-center">Inscrivez vous a notre newsletter pour reccevoir les offres speciales UGOEAT</p>
            <div className="flex flex-col md:flex-row space-y-5 justify-center text-black items-center">
                <Input onChange={onEmailChanged}/>
                <button className="bg-green text-white rounded-xl text-xl p-1 w-full md:w-[200px]" type="submit" onClick={onSubmit}>S&apos;inscrire</button>
            </div>
        </form>
    )
}

export default NewsLetter