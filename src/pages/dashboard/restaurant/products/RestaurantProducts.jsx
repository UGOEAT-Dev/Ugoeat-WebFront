import {useContext, useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import RoundedImage from "../../../../components/RoundedImage.jsx";
import {ImBin} from "react-icons/im"
import { FaEye } from "react-icons/fa";
import getRestaurantProducts from "../../../../api/products/getRestaurantProducts.jsx";
import AppContext from "../../../../AppContext.jsx";
import getCategories from "../../../../api/categories/getCategories.jsx";
import toast from "react-hot-toast";
import addProduct from "../../../../api/products/addProduct.jsx";
import deleteProduct from "../../../../api/products/deleteProduct.jsx";
import ProductDialogView from "../../../../components/ProductDialogView.jsx";
import updateProduct from "../../../../api/products/updateProduct.jsx";
import updateProductImage from "../../../../api/products/updateProductImage.jsx";

/**
 * TODO: Comprendre pourquoi les requettes de modification et de creation echouent et gerer les problemes
 */
function RestaurantProducts({...props})
{
    const [mode, setMode] = useState('create')
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState({})
    const [visible, setVisible] = useState(false)
    const [categories, setCategories] = useState([])
    const [errors, setErrors] = useState({})

    const {token, user} = useContext(AppContext)

    useEffect(() => {
        getRestaurantProducts(token, user.id).then(r => {
                setProducts(r.data.data)
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
    const editProductCallback = async (product) => {

        const formData = await productToFormData(product)

        updateProduct(token, product.id, product).then(r => {
            if(formData.has('image')) {
                updateProductImage(token, product.id, formData).then(r => {
                    toast.success("Mise a jour effectuee avec success")
                    setVisible(false)
                }).catch(e => {
                    toast.error("Oupps !!! Quelque chose c'est mal passe")
                    throw e
                })
            }
        }).catch(e => {
            toast.error("Oupps !!! Quelque chose c'est mal passe")
            throw e
        })
    }

    const Header = () => (
        <div className="p-3 flex items-center justify-between">
            <h2>Tous les produits</h2>
            <Button
                onClick={(e) => {
                    setMode('create')
                    setVisible(true)
                }}
                className="bg-green text-white py-1 px-3"
                label="Ajouter" icon="pi pi-plus" raised/>
        </div>
    )

    const addProductCallback = async (product) => {

        const formData = await productToFormData(product)
        formData.set("restaurant_id", user.id)
        addProduct(formData, token).then((r) => {
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
                        <Column body={(p) => (<button className="" onClick={() => {
                            setMode('edit')
                            setCurrentProduct(p)
                            setVisible(true)
                        }}><FaEye size={20} color="blue"/> </button>)} ></Column>
                        <Column body={(p) => (<button className="" onClick={() => handleDeleteProduct(p)}><ImBin size={20} color="red"/> </button>)} ></Column>
                    </DataTable>
                </div>
            </div>
            {
                visible && (
                    <ProductDialogView
                        product={currentProduct}
                        categories={categories}
                        visible={visible} mode={mode}
                        errors={errors}
                        callback={mode === 'create' ? addProductCallback : editProductCallback}
                        onHide={() => {
                            setVisible(false)
                            setCurrentProduct({})
                        }}
                    />
                )
            }
        </div>
    )
}

async function productToFormData(product)
{
    const formData = new FormData()

    formData.set("name", product.name)
    formData.set("description", product.description)
    formData.set("price", String(product.price))
    formData.set("category_id", String(product.category_id))
    formData.set("restaurant_id", String(product.restaurant_id))
    formData.set("id", String(product.id))

    if(product.image_url.match('^blob')) {
        const blob = await fetch(product.image_url).then(r => r.blob())
        formData.set("image", blob)
    }

    return formData
}

export default RestaurantProducts

