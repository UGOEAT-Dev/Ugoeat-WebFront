import InputFile from "../../../features/common/components/elements/input/InputFile";
import useUpdateAccount from "../../../features/account/hooks/useUpdateAccount";
import {FormEventHandler, useRef, useState} from "react";
import { getScreenWidthScale } from '../../../lib/helpers'
import Dropzone from "react-dropzone";
import AvatarEditor from "@/features/common/components/elements/editors/AvatarEditor";
import toast from "react-hot-toast";
import { User } from "../../../features/common/types/User";
import { Mutator } from "../../../features/common/types/mutator/Mutator";

function UpdateImageProfile({user, setErrors}: {user:User, setErrors: Mutator<Error>})
{
    const [image, setImage] = useState(user.image_url)
    const [imageToResize, setImageToResize] = useState<string|File|undefined>(image)
    const [showResizer, setShowResizer] = useState(false)
    const {update} = useUpdateAccount()
    const editorRef = useRef<any>()


    const handleFileChanged = (file?: File | null) => {
        if(String(file?.type).match('image/.*')) {
            setShowResizer(true)
            setImageToResize(file ?? undefined)
        } else {
            toast.error("Oupps! Fichier image attendu")
        }
    }

    const onImageCropped = () => {
        const editor = editorRef.current
        const canvas = editor?.getImageScaledToCanvas()

        setShowResizer(false)
        setImage(canvas?.toDataURL())
    }

    const onSubmit :FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if(image === user.image_url)
            return;
        // uploading the image
        fetch(image ?? '').then(async (response) => {

            const formData = new FormData()
            const blob = await response.blob()
            formData.set('name', user.name ?? '');
            formData.set('image', blob, `${user.role}-${user.id}-profile.png`)
            update(setErrors, formData, true)
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
                onDrop={(files) => handleFileChanged(files[0]) } >
                {({getRootProps}) => (
                    <div {...getRootProps()} className="flex rounded-md h-full items-center bg-gray-50 w-full">
                        <div className="my-3 h-[260px] flex items-center mx-auto border-2 overflow-hidden border-black rounded-full w-[260px]">
                            <img src={image} className="w-full h-full" alt="image_profile"/>
                        </div>
                    </div>
                )}
            </Dropzone>
            <form className="mt-3 w-full items-center flex justify-around" onSubmit={onSubmit} encType='multipart/form-data'>
                <InputFile onChange={(e) => handleFileChanged(e.target.files?.item(0))} title='Choisir une image' label="Parcourir" name="image" />
                <button
                    disabled={image === user.image_url}
                    className="bg-green text-white hover:text-black py-2 px-5 rounded-md" type="submit">Sauvegarder</button>
            </form>
            {showResizer ? (

                <AvatarEditor
                    ref={editorRef} 
                    image={imageToResize ?? ''}
                    width={460 * getScreenWidthScale(760)}
                    height={460 * getScreenWidthScale(760)}
                    onAccept={onImageCropped}
                    onReject={() => {
                        setImage(user.image_url)
                        setShowResizer(false)
                    }}
                     />
                      
            ) : ( <></> ) }
        </div>
    )
}

export default UpdateImageProfile