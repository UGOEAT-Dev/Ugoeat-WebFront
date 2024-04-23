import {useEffect, useState} from "react";
// import {DataTable} from "primereact/datatable";
// import {Column} from "primereact/column";
// import {Button} from "primereact/button";
// import RoundedImage from "../../../../components/RoundedImage";
import getRestaurantProducts from "../../../../core/services/products/getRestaurantProducts";
// import toast from "react-hot-toast";
// import addProduct from "../../../../core/services/products/addProduct";
// import deleteProduct from "../../../../core/services/products/deleteProduct";
// import ProductDialogView, { ProductDialogViewMode } from "../../components/products/ProductDialogView";
// import updateProduct from "../../../../core/services/products/updateProduct";
// import updateProductImage from "../../../../core/services/products/updateProductImage";
import { useAppContext } from "../../../../core/context/AppContext";
// import { Icon } from "../../../../components/Icon";
import ProductListView from "../../components/products/ProductListView";
import Paginate from "../../../../components/pagination/Paginate";

/**
 * TODO: Comprendre pourquoi les requettes de modification et de creation echouent et gerer les problemes
 */
function RestaurantProducts()
{
    const [products, setProducts] = useState<Product[]>([])
    const [paginated, setPaginated] = useState<PaginatedResponse<Product>>({})
    // const [currentProduct, setCurrentProduct] = useState<Product>({id: 0})
    // const [visible, setVisible] = useState(false)
    // const [errors, setErrors] = useState({})

    const {token, user} = useAppContext()

    useEffect(() => {
        getRestaurantProducts(token, user.id).then(r => {
                setPaginated(r.data)
                setProducts(r.data.data)
        })
    }, [])

    // const editProductCallback = async (product: Product) => {

    //     const formData = await productToFormData(product)

    //     updateProduct(token, product.id, product).then(() //=> {
    //         if(formData.has('image')) {
    //             updateProductImage(token, product.id, formData).then(() => {
    //                 toast.success("Mise a jour effectuee avec success")
    //                 setVisible(false)
    //             }).catch(e => {
    //                 toast.error("Oupps !!! Quelque chose c'est mal passe")
    //                 throw e
    //             })
    //         }
    //     }).catch(e => {
    //         toast.error("Oupps !!! Quelque chose c'est mal passe")
    //         throw e
    //     })
    // }


    // const addProductCallback = async (product: Product) => {

    //     const formData = await productToFormData(product)
    //     // formData.set("restaurant_id", user.id.toString())
    //     addProduct(formData, token).then(() => {
    //             toast.success("Produit ajouter avec success", { duration: 2000 })
    //             setVisible(false)
    //         }).catch(error => {
    //             if(error.response.status === 422) setErrors(error.response.data.errors)
    //             throw error
    //     })
    // }

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <ProductListView products={products ?? []} />
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        getRestaurantProducts(token, user.id, {page: selected+1}).then(r => setProducts(r.data.data))
                    }}/>
            </div>
            {
                // visible && (
                //     <ProductDialogView
                //         product={currentProduct}
                //         visible={visible} mode={mode as ProductDialogViewMode}
                //         errors={errors}
                //         callback={mode === 'create' ? addProductCallback : editProductCallback}
                //         onHide={() => {
                //             setVisible(false)
                //             setCurrentProduct({id: 0})
                //         }}
                //     />
                // )
            }
        </div>
    )
}

// async function productToFormData(product: Product)
// {
//     const formData = new FormData()

//     formData.set("name", String(product.name))
//     formData.set("description", String(product.description))
//     formData.set("price", String(product.price))
//     formData.set("category_id", String(product.category?.id))
//     formData.set("id", String(product.id))

//     if(product.image_url?.match('^blob')) {
//         const blob = await fetch(product.image_url).then(r => r.blob())
//         formData.set("image", blob)
//     }

//     return formData
// }

export default RestaurantProducts

