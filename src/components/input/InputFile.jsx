
function InputFile({id, label, title, className, ...props})
{
    return (
        <div title={title} className={'cursor-pointer text-center hover:text-white hover:bg-black rounded-md border-black bg-transparent border-2 py-2 px-5 ' + className}>
            <label className="cursor-pointer" htmlFor={id}>{label}</label>
            <input className="hidden" type="file" id={id} {...props} />
        </div>
    )
}

export default InputFile