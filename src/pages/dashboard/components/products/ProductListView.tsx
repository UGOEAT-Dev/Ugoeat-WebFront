import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import RoundedImage from "@/features/common/components/elements/RoundedImage";
import { Icon } from "@/features/common/components/elements/Icon";

interface ProductListViewProps
{
    products: Product[],
    onDelete?: any,
    onSelect?: any,
}

function ProductListView({products, onDelete, onSelect}: ProductListViewProps)
{
    const _DeleteActionComponent = ({product}: {product: Product}) => {
        return (
            <button 
                className="bg-error text-white rounded px-2 py-1 hover:bg-red-600" 
                onClick={() => onDelete(product)} 
                title="Supprimer le produit">
                <Icon icon="pi-trash" className="text-sm" color="white"/> Delete
            </button>
        )
    }

    return (
        <>
            <div className="bg-white p-3 rounded-lg">
                <div className='mt-3'>
                    <DataTable 
                        value={products}  
                        tableStyle={{minWidth: '50rem'}}
                        onSelectionChange={onSelect} selectionMode={"single"}
                        sortField='id'>
                        <Column field='id' header=""></Column>
                        <Column field='image_url' header="Produit" body={(p) => <RoundedImage src={p.image_url} size={50}/>} ></Column>
                        <Column field='name' header="Nom" sortable ></Column>
                        <Column field='price' header="Prix" sortable></Column>
                        <Column header="Categorie" body={(p: Product) => (<span>{p.category?.name}</span>)}></Column>
                        {/* <Column body={(p) => (<button onClick={() => onSelect(p)}><Icon icon="pi-eye" className="text-xl" color="blue"/></button>)} ></Column> */}
                        <Column body={(p) => <_DeleteActionComponent product={p} />} ></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default ProductListView