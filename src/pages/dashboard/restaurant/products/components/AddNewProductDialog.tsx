import { RestaurantService } from "@/features/admin/services/restaurant.service";
import { Icon } from "@/features/common/components/elements/Icon";
import InputWithLabel from "@/features/common/components/elements/input/InputWithLabel";
import TextArea from "@/features/common/components/elements/input/TextArea";
import { CategoryService, ImageService, ProductService } from "@/features/common/services";
import { User } from "@/features/common/types/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import { ChangeEventHandler, FormEventHandler, LegacyRef, useRef, useState } from "react";
import toast from "react-hot-toast";

export interface AddNewProductDialogProps 
{
    user: User,
    onHide: any,
    visible: boolean,
    onSuccess?: any
}

export default function AddNewProductDialog(props: AddNewProductDialogProps)
{
    const [images, setImages] = useState<string[]>([])
    const [imagesFiles, setImageFiles] = useState<File[]>([])
    const [defaultImage, setDefaultImage] = useState(0)
    const {data: categories} = useQuery({
        queryKey: ['/api/v1/categories'],
        queryFn: async () => (await CategoryService.fetch({page: 1, limit: 100})).data
    })
    const addProductMutation = useMutation({
        mutationKey: ['/api/v1/products'],
        mutationFn: (data: FormData) => ProductService.add(data) 
    })
    const formRef = useRef<HTMLFormElement>()

    const addImage: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.item(0)
        if(!file?.type.match('image/.*')){
            toast.error("OUPS!! Fichiers Images uniquement")
            return;
        }

        if(file.size > 5 * 1024 * 1024){
            toast.error("Taille maximum autorise : 5Mo")
            return;
        }

        if(imagesFiles.some(value => value.name === file.name && value.type === file.type && value.size === file.size)) { return; }

        const url = URL.createObjectURL(file)
        setImages(prev => [...prev, url])
        setImageFiles(prev => [...prev, file])
    }

    const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const formData = new FormData(formRef.current)
        const image = imagesFiles[defaultImage]
        
        formData.delete('image_url')
        formData.set('image', image);

        addProductMutation.mutate(formData, {
            onSuccess: (product) => {
                RestaurantService.addProducts(props.user.id, {products: [product.id]}).then(() => {
                    if(props.onSuccess) 
                        props.onSuccess()
                })
                const images = imagesFiles.filter((_, index) => index !== defaultImage)
                if(images.length > 0) {
                    images.forEach(image => {
                        const formData = new FormData()
                        formData.set('imageable_type', 'products')
                        formData.set('imageable_id', `${product.id}`)
                        formData.set('image', image)
                        ImageService.store(formData)
                    })
                }
            }
        })

        
    }

    return (
        <Dialog 
            className="h-[90%] w-11/12 md:w-[90%]" 
            header={<span className="p-3">Ajouter un Produit</span>} 
            onHide={props.onHide} 
            visible={props.visible}
        >
            
            <form ref={formRef as LegacyRef<HTMLFormElement>} className="h-full p-3 flex flex-col gap-3" onSubmit={onFormSubmit}>
                <fieldset className="flex flex-col md:flex-row gap-3 border p-2">
                    <legend className="mx-2">Informations de base</legend>
                    <div className="w-full space-y-3 pe-2">
                        <InputWithLabel id="name" name="name" label="Nom" placeholder="Ex: Eru" required/>
                        <div className="space-y-1">
                            <label htmlFor="category">Categorie</label>
                            <select className="rounded-md px-2 py-2 w-full" id="category" name="category_id" required>
                                {
                                    categories && categories.map(category => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <InputWithLabel id="price" name="price" label="Prix (en XAF)" type="number" placeholder="Ex: 2000" min={0} required/>
                    </div>
                    <div className="w-full">
                        <TextArea className="h-full" label="Description" name="description" required/>
                    </div>
                </fieldset>
                <fieldset className="flex flex-col gap-1 border h-full p-2">
                    <legend className="mx-2">Images de produits</legend>
                    <div className="mb-1">
                        <label htmlFor="addFileBtn" className="w-fit bg-primary text-white py-1 px-2 rounded hover:bg-green-700">
                            <Icon icon="pi-plus"/> Ajouter une image
                        </label>
                        <input className="hidden" type="file" id="addFileBtn" onChange={addImage} />
                        <span>(5MO maximum)</span>
                    </div>
                    <div className="w-hull h-full bg-gray-100 flex items-center px-2 gap-3">
                        {
                            images && images.map((url, index) => {
                                return (
                                    <div key={index} className="cursor-pointer text-center" onClick={() => setDefaultImage(index)}>
                                        <LittleImagePreview image={url} width={64} height={64} onClose={() => {
                                            setImages(prev => prev.filter(item => item !== url))
                                            setImageFiles(prev => prev.filter((_, i) => i !== index ))
                                        }}/>
                                        <div>
                                            <input type="radio" name="image_url" value={url} onChange={() => null} checked={index === defaultImage} />
                                            <label className="ml-1 text-sm">{index === defaultImage ? "default":""}</label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </fieldset>
                <div className="flex flex-row-reverse gap-3 items-end">
                    <button type="submit" className="bg-primary text-white px-3 py-2 rounded hover:bg-gray-900">
                        <Icon icon="pi-plus"/> Ajouter
                    </button>
                    <button onClick={() => props.onHide()} type="reset" className="px-3 py-2 rounded-md bg-error text-white hover:bg-red-900">
                        <Icon icon="pi-times"/> Annuler
                    </button>
                </div>
            </form>
        </Dialog>
    )
}

export interface LittleImagePreviewProps
{
    image: string,
    onClose?: any,
    width?: number, 
    height?: number
}

export function LittleImagePreview({image, onClose, ...props}: LittleImagePreviewProps)
{
    return (
        <div className="relative w-fit border-4 border-double hover:scale-110">
            <img className="z-0" src={image} width={props.width} height={props.height} alt="LittleImagePreviewProps"/>
            <button className="absolute -right-0 -top-0 z-50 text-sm text-black rounded-full" title="Close" onClick={onClose}><Icon icon="pi-times"/></button>
        </div>
    )
}