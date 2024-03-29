import {useEffect, useState} from "react";
import getProducts from "../../../../api/products/getProducts.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import RoundedImage from "../../../../components/RoundedImage.jsx";
import {ImBin} from "react-icons/im"
import { FaEye } from "react-icons/fa";

function AdminProducts({...props})
{
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then(
            response => {
                setProducts(response.data.data)
            }
        )
    }, [])

    const handleDeleteProduct = (product) => {

    }

    const handleShowProduct = (product) => {

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
        </div>
    )
}

const Header = ({...props}) => (
    <div className="p-3 flex items-center justify-between">
        <h2>Tous les produits</h2>
        <Button className="bg-green text-white py-1 px-3" label="Ajouter" icon="pi pi-plus" raised/>
    </div>
)

export default AdminProducts

