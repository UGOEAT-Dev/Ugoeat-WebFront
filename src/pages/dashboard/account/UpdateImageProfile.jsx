import InputFile from "../../../components/input/InputFile.jsx";
import useUpdateAccount from "../../../hooks/useUpdateAccount.jsx";
import {useRef, useState} from "react";
import { getScreenWidthScale } from '../../../lib/helpers.jsx'
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";

function UpdateImageProfile({user, setUpdated, errors, setErrors})
{
    const [image, setImage] = useState(user.image_url)
    const [imageToResize, setImageToResize] = useState(image)
    const [showResizer, setShowResizer] = useState(false)
    const {updateImage} = useUpdateAccount()
    const editorRef = useRef()


    const handleFileChanged = (file) => {
        setShowResizer(true)
        setImageToResize(file)
    }

    const onValidBtnClicked = () => {
        const editor = editorRef.current
        const canvas = editor.getImageScaledToCanvas()

        setShowResizer(false)
        setImage(canvas.toDataURL())
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(image === user.image_url)
            return;
        // uploading the image
        fetch(image).then(async (response) => {

            const formData = new FormData()
            const blob = await response.blob()
            formData.append('image', blob, `${user.role}-${user.id}-profile.png`)
            updateImage({
                setUpdated,
                setErrors,
                data: formData
            })
        })
    }

    return (
        <div className="bg-white w-full flex flex-col items-center p-5 rounded-lg">
            <div className='text-left'>
                <h3 className="font-bold text-lg">Photo de profil</h3>
                <p className='mb-3 text-sm text-gray-500'>
                    Mettez a jour votre photo de profil en cliquant sur le bouton Parcourir,
                    ou par Drag & Drop. Vous devez choisir une image de definitions 460x460.
                </p>
            </div>
            <Dropzone
                onDrop={(files) => handleFileChanged(files[0]) }
                className=" h-full w-full flex p-3 items-center">
                {({getRootProps}) => (
                    <div {...getRootProps()} className="flex rounded-md h-full items-center bg-gray-50 w-full">
                        <div className="my-3 h-[260px] flex items-center mx-auto border-2 overflow-hidden border-black rounded-full w-[260px]">
                            <img src={image} className="w-full h-full" alt="image_profile"/>
                        </div>
                    </div>
                )}
            </Dropzone>
            <form className="mt-3 w-full items-center flex justify-around" onSubmit={onSubmit} encType='multipart/form-data'>
                <InputFile onChange={(e) => handleFileChanged(e.target.files[0])} title='Choisir une image' label="Parcourir" id="image_profile" error={errors.image} name="image" />
                <button
                    disabled={image === user.image_url}
                    className="bg-green text-white hover:text-black py-2 px-5 rounded-md" type="submit">Sauvegarder</button>
            </form>
            {showResizer ? (
                <div className='fixed p-5 top-0 right-0 z-10 bg-opacity-50 bg-black w-screen h-screen'>
                    <div className="flex flex-col w-full items-center justify-center gap-3">
                        <AvatarEditor
                            ref={editorRef}
                            image={imageToResize}
                            width={460 * getScreenWidthScale(760)}
                            border={[50, 50]}
                            height={460 * getScreenWidthScale(760)}
                            scale={1}
                            className="w-full m-auto"
                        />
                        <div className="relative text-center sm:bottom-10 w-full m-auto space-x-4">
                            <button
                                onClick={onValidBtnClicked}
                                className="py-3 px-5 hover:bg-gray-200 rounded-lg bg-white"
                            >Valider</button>

                            <button
                                onClick={() => {
                                    setImage(user.image_url)
                                    setShowResizer(false)
                                }}
                                className="py-3 px-5 hover:bg-gray-800 rounded-lg text-white bg-black"
                            >Annuler</button>
                        </div>
                    </div>
                </div>
            ) : ( <></> ) }
        </div>
    )
}

export default UpdateImageProfile