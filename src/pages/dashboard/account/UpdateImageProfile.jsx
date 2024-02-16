import InputFile from "../../../components/input/InputFile.jsx";
import useUpdateAccount from "../../../hooks/useUpdateAccount.jsx";
import {useState} from "react";

function UpdateImageProfile({user, setUpdated, errors, setErrors})
{
    const {updateImage} = useUpdateAccount()
    const [image, setImage] = useState(user.image_url)
    const [resizeImage, setResizeImage] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        const fileInput = document.getElementById('image_profile')
        formData.append('image', fileInput.files[0])
        updateImage({
            setUpdated,
            setErrors,
            data: formData
        })
    }

    return (
        <div className="bg-white w-full flex flex-col items-center p-5 rounded-lg">
            <div className='text-left'>
                <h3 className="font-bold text-lg">Photo de profil</h3>
                <p className='text-sm text-gray-500'>
                    Mettez a jour votre photo de profil en cliquant sur le bouton Parcourir,
                    ou par Drag & Drop. Vous devez choisir une image de definitions 460x460.
                </p>
            </div>
            <div className="h-full w-full flex p-3 items-center">
                <div className="flex rounded-md h-full items-center bg-gray-50 w-full">
                    <div className="h-[260px] flex items-center mx-auto border-2 overflow-hidden border-black rounded-full w-[260px]">
                        <img src={image} className="w-full h-full" alt="image_profile"/>
                    </div>
                </div>
            </div>
            <form className="w-full items-center flex justify-around" onSubmit={onSubmit} encType='multipart/form-data'>
                <InputFile title='Choisir une image' label="Parcourir" id="image_profile" error={errors.image} name="image" />
                <button className="bg-green text-white hover:text-black py-2 px-5 rounded-md" type="submit">Sauvegarder</button>
            </form>
            {resizeImage ? (
                <div className='fixed p-5 top-0 right-0 z-10 bg-opacity-50 bg-black w-screen h-screen'>

                </div>
            ) : ( <></> ) }
        </div>
    )
}

export default UpdateImageProfile