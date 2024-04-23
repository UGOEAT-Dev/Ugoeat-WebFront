import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
// import RoundedImage from "../../../../components/RoundedImage";
import { Icon } from "../../../../components/Icon";

interface CategoryListViewProps
{
    categories: Category[],
    onDelete?: any,
    onSelect?: any,
}

function CategoryListView({categories, onDelete, onSelect}: CategoryListViewProps)
{
    return (
        <>
            <div className="bg-white p-3 rounded-lg">
                <div className='mt-3'>
                    <DataTable value={categories}  tableStyle={{minWidth: '50rem'}} sortField='id'>
                        <Column field='id' header=""></Column>
                        { /*<Column field='image_url' header="Categorie" body={(c) => <RoundedImage src={c.image_url} size={50}/>} ></Column> */ }
                        <Column field='name' header="Nom" sortable ></Column>
                        <Column body={(c) => (<button onClick={() => onSelect(c)}><Icon icon="pi-eye" className="text-xl" color="blue"/></button>)} ></Column>
                        <Column body={(c) => (<button onClick={() => onDelete(c)}><Icon icon="pi-trash" className="text-xl" color="red"/></button>)} ></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default CategoryListView