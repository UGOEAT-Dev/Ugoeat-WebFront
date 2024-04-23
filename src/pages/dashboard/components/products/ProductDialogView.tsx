
import { ContentProps, Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import InputWithLabel from "../../../../components/input/InputWithLabel.jsx";
import InputFile from "../../../../components/input/InputFile.jsx";
import toast from "react-hot-toast";
import TextArea from "../../../../components/input/TextArea.jsx";
import { ProductError } from '../../../../core/types/error/ProductError.js';

export type ProductDialogViewMode = "create" | "edit" | "view";

interface ProductDialogViewProps
{
    product: Product,
    visible?: boolean,
    onHide: () => void,
    mode?: ProductDialogViewMode,
    callback: (p: Product) => Promise<void>,
    errors: ProductError
}

function ProductDialogView({product, visible, onHide, mode = 'create', callback, errors}: ProductDialogViewProps)
{
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [image_url, setImageUrl] = useState(product.image_url)
    const [category_id] = useState(product.category?.id)
    const createOrEditText = mode === 'create' ? 'Ajouter' : 'Modifier'

    const handleAction: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if(!image_url) {
            toast.error("Vous devez choisir une image pour votre produit")
            return;
        }

        const newProduct = {
            id: product.id, name, description, price, image_url, category_id,
        }

        await callback(newProduct)
    }

     const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.item(0)
        if (!file?.type.match('image/*')) {
            toast.error("Oups !!!, le fichier Choisi n'est pas une image")
            return;
        }
        setImageUrl(URL.createObjectURL(file))
     }

    return (
        <Dialog
            onHide={onHide}
            visible={visible}
            content={({hide}: ContentProps) => {

                return (
                    <form onSubmit={handleAction} className="bg-white p-3 rounded-md">
                        <header className="flex justify-between items-center gap-3">
                            <h3 className="text-lg font-bold">{createOrEditText} un produit</h3>
                            <i className="pi pi-times cursor-pointer hover:scale-125" onClick={hide}></i>
                        </header>
                        <main className="flex gap-3 p-3">
                            <div className="flex flex-col gap-2">
                                <div
                                    className="h-full w-full md:w-[400px] md:h-[400px] border-2 rounded-md overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${image_url})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat"
                                    }}></div>
                                <InputFile
                                    className="w-full"
                                    onChange={handleImageChange} accept="image/*" label="Choisir une Image" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputWithLabel
                                    error={errors.errors?.name} id="name" value={name}
                                    label="Nom du produit" onChange={(e) => setName(e.target.value)} />
                                <TextArea
                                    error={errors.errors?.description} id="description" value={description}
                                    onChange={(e) => setDescription(e.target.value)} label="Description" />
                                <InputWithLabel
                                    error={errors.errors?.price} value={price} id="price"
                                    onChange={(e) => setPrice(parseInt(e.target.value))} label="Prix du produit (en FCFA)" type="number" />
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="productview-category-dropdown" className="block font-bold">Categorie</label>
                                    <select
                                        id="productview-category-dropdown"
                                        className="w-full rounded p-2">
                                    </select>
                                </div>
                            </div>
                        </main>
                        <footer className="flex gap-3 justify-end">
                            <Button
                                type="submit"
                                className="bg-green hover:bg-green-800 text-white py-2 px-3 "
                                icon={`pi ${mode === 'create' ? 'pi-plus' : 'pi-times'}`}
                                label={createOrEditText}/>
                            <Button
                                className="bg-secondary hover:bg-black text-white py-2 px-3"
                                label="Annuler" onClick={hide}/>
                        </footer>
                    </form>
                )
            }}
        ></Dialog>
    )
}

export default ProductDialogView