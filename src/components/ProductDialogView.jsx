
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useState } from "react";
import InputWithLabel from "./input/InputWithLabel.jsx";
import InputFile from "./input/InputFile.jsx";
import toast from "react-hot-toast";
import TextArea from "./input/TextArea.jsx";
function ProductDialogView({product, categories, visible, onHide, mode = 'create', callback, errors = {}})
{
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [image_url, setImageUrl] = useState(product.image_url)
    const [category_id, setCategoryId] = useState(product.category_id)
    const createOrEditText = mode === 'create' ? 'Ajouter' : 'Modifier'

    const handleAction = async (e) => {
        e.preventDefault()

        if(!image_url) {
            toast.error("Vous devez choisir une image pour votre produit")
            return;
        }

        const newProduct = {
            id: product.id, name, description, price, image_url, category_id, restaurant_id: product.restaurant_id ?? 0
        }

        await callback(newProduct)
    }

     const handleImageChange = (e) => {
        const file = e.target.files.item(0)
        if (!file.type.match('image/*')) {
            toast.error("Oups !!!, le fichier Choisi n'est pas une image")
            return;
        }
        setImageUrl(URL.createObjectURL(file))
     }

    return (
        <Dialog
            onHide={onHide}
            visible={visible}
            content={({hide}) => {

                return (
                    <form onSubmit={handleAction} className="bg-white p-3 rounded-md">
                        <header className="flex justify-between items-center gap-3">
                            <h3 className="text-lg font-bold">{createOrEditText} un produit</h3>
                            <i className="pi pi-times cursor-pointer hover:scale-125" onClick={() => hide()}></i>
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
                                    error={errors.name} id="name" value={name}
                                    label="Nom du produit" onChange={(e) => setName(e.target.value)} />
                                <TextArea
                                    error={errors.description} id="description" value={description}
                                    onChange={(e) => setDescription(e.target.value)} label="Description" />
                                <InputWithLabel
                                    error={errors.price} value={price} id="price"
                                    onChange={(e) => setPrice(parseInt(e.target.value))} label="Prix du produit (en FCFA)" type="number" />
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="productview-category-dropdown" className="block font-bold">Categorie</label>
                                    <select
                                        id="productview-category-dropdown"
                                        className="w-full rounded p-2"
                                        onChange={(e) => setCategoryId(e.target.value)}>
                                        {categories.map(c => {
                                            return (
                                                <option key={c.id} value={c.id} selected={c.id === category_id} >{c.name}</option>
                                            )
                                        })}
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
                                label="Annuler" onClick={() => hide()}/>
                        </footer>
                    </form>
                )
            }}
        ></Dialog>
    )
}

export default ProductDialogView