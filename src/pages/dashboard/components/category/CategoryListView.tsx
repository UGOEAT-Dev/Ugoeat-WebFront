import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
// import RoundedImage from "../../../../components/RoundedImage";
import { Icon } from "../../../../features/common/components/elements/Icon";
import { Category } from "@/features/common/types/Category";

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
                    <DataTable 
                        value={categories}  
                        tableStyle={{minWidth: '50rem'}} 
                        sortField='id'
                        selectionMode='single' onSelectionChange={onSelect}>
                        
                        <Column field='id' header=""></Column>
                        <Column field='name' header="Nom" sortable ></Column>
                        <Column body={(c) => (<button onClick={() => onDelete(c)}><Icon icon="pi-trash" className="text-xl" color="red"/></button>)} ></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default CategoryListView