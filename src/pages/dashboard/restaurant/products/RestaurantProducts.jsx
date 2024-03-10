import {useContext, useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import RoundedImage from "../../../../components/RoundedImage.jsx";
import {ImBin} from "react-icons/im"
import { FaEye } from "react-icons/fa";
import getRestaurantProducts from "../../../../api/products/getRestaurantProducts.jsx";
import AppContext from "../../../../AppContext.jsx";
import InputWithLabel from "../../../../components/InputWithLabel.jsx";
import InputFile from "../../../../components/input/InputFile.jsx";
import getCategories from "../../../../api/categories/getCategories.jsx";
import toast from "react-hot-toast";
import addProduct from "../../../../api/products/addProduct.jsx";
import deleteProduct from "../../../../api/products/deleteProduct.jsx";

function RestaurantProducts({...props})
{
    const [products, setProducts] = useState([])
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState(0)
    const [currentCategoryText, setCurrentCategoryText] = useState('Tout')
    const [categories, setCategories] = useState([])
    const [errors, setErrors] = useState({})

    const {token, user} = useContext(AppContext)

    useEffect(() => {
        getRestaurantProducts(token, user.id).then(response => {
                setProducts(response.data.data)
        })
        getCategories().then(r => setCategories(r.data.data))
    }, [])

    const handleDeleteProduct = (product) => {
        deleteProduct(product.id, token).then(res => {
            toast.success("Produit supprimer")
        }).catch(error => {
            toast.error("Une erreur est survenu")
            throw error
        })
    }
    const handleShowProduct = (product) => { }
    const Header = ({...props}) => (
        <div className="p-3 flex items-center justify-between">
            <h2>Tous les produits</h2>
            <Button
                onClick={(e) => {
                    setVisible(true)
                }}
                className="bg-green text-white py-1 px-3"
                label="Ajouter" icon="pi pi-plus" raised/>
        </div>
    )

    const onAddFormSubmit = (e) => {
        e.preventDefault()
        const inputFile = document.getElementById("image_url")

        if(inputFile.files.length === 0) {
            toast.error("Vous devez choisir une image pour votre produit")
            return;
        }
        const image = inputFile.files[0]
        const formData = new FormData()
        formData.set("name", name)
        formData.set("description", description)
        formData.set("price", String(price))
        formData.set("image", image)
        formData.set("restaurant_id", user.id)
        formData.set("category_id", String(category))
        addProduct(formData, token).then(response => {
                toast.success("Produit ajouter avec success", 2000)
                setVisible(false)
            }).catch(error => {
                if(error.response.status === 422) setErrors(error.response.data.errors)
                throw error
        })
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <div className="bg-white p-3 rounded-lg">
                <div className='mt-3'>
                    <DataTable value={products} header={Header} paginator rows={7} rowsPerPageOptions={[5, 7, 10, 15, 20]} showGridlines  tableStyle={{minWidth: '50rem'}} sortField='id'>
                        <Column field='id' header="Id" sortable></Column>
                        <Column field='image_url' header="Produit" body={(p) => <RoundedImage src={p.image_url} size={50}/>} ></Column>
                        <Column field='name' header="Nom" sortable></Column>
                        <Column field='price' header="Prix" sortable></Column>
                        <Column field='restaurant_id' header="Restaurant" sortable></Column>
                        <Column field='category_id' header="Categorie" sortable></Column>
                        <Column body={(p) => (<button className="" onClick={() => handleShowProduct(p)}><FaEye size={20} color="blue"/> </button>)} ></Column>
                        <Column body={(p) => (<button className="" onClick={() => handleDeleteProduct(p)}><ImBin size={20} color="red"/> </button>)} ></Column>
                    </DataTable>
                </div>
            </div>
            {
                visible && (
                    <Dialog
                        onHide={() => {
                            setVisible(false)
                            setErrors({})
                        }}
                        visible={visible}
                        content={({hide}) => {
                            return (
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="flex gap-3 mb-2 items-center justify-between">
                                        <h3 className="text-lg font-bold">Ajouter un produit</h3>
                                        <i className="pi pi-times hover:cursor-pointer" onClick={hide}></i>
                                    </div>
                                    <p className="my-1">Veuillez remplir tous les champs</p>
                                    <form onSubmit={onAddFormSubmit}>
                                        <div className="flex flex-col gap-5 mb-3">
                                            <InputWithLabel error={errors.name} id="name" label="Nom du produit" onChange={(e) => setName(e.target.value)} />
                                            <InputWithLabel error={errors.description} id="description" onChange={(e) => setDescription(e.target.value)} label="Description" />
                                            <InputWithLabel error={errors.price} value={price} id="price" onChange={(e) => setPrice(parseInt(e.target.value))} label="Prix du produit (en FCFA)" type="number" />
                                            <div className="flex flex-row items-center justify-between">
                                                <label className="font-bold">Choisir une Categorie</label>
                                                <div className="border-2 py-2 rounded border-gray-400 ">
                                                    <Dropdown
                                                        className="w-full"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.value)}
                                                        options={categories}
                                                        optionValue="id"
                                                        optionLabel="name" ></Dropdown>
                                                </div>
                                            </div>
                                            <InputFile id="image_url" title="Ajouter une image a votre produit" label="Choisir une Image" />
                                        </div>

                                        <Button type="submit" className="bg-green text-white py-2 px-5 w-full" label="Ajouter" />
                                    </form>
                                </div>
                            )
                        }}
                    ></Dialog>
                )
            }
        </div>
    )
}

export default RestaurantProducts

