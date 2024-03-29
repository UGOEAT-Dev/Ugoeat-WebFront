import {Column} from "primereact/column";
import RoundedImage from "../../../components/RoundedImage.jsx";
import {DataTable} from "primereact/datatable";
import {useState} from "react";
import UserDialogView from "./UserDialogView.jsx";
import {parseUserRole} from "../../../lib/helpers.jsx";

/**
 * Helps to display a list of Users
 */
function UsersListView({users = [], header, onSelectionChange})
{
    const [visible, setVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const defaultOnSelectionChange = (e) => {
        setVisible(true)
        setSelectedUser(e.value)
    }

    return (
        <>
            <div className="bg-white p-2 rounded-md shadow-md">
                <DataTable
                    value={users} header={header}
                    paginator rows={7}
                    rowsPerPageOptions={[5, 7, 10, 15, 20]}
                    showGridlines  tableStyle={{minWidth: '50rem'}}
                    sortField='id' selectionMode="single"
                    selection={[1,2,3]} onSelectionChange={onSelectionChange ?? defaultOnSelectionChange}>
                    <Column field='image_url' body={(p) => <RoundedImage src={p.image_url} size={50}/>} ></Column>
                    <Column field='email' header="Email" sortable></Column>
                    <Column field='name' header="Nom" sortable></Column>
                    <Column field='role' header="Role" sortable body={u => <span className="capitalize">{parseUserRole(u.role)}</span>}></Column>
                </DataTable>
            </div>
            <UserDialogView
                user={selectedUser} visible={visible} onHide={() => setVisible(false)}/>
        </>
    )
}

export default UsersListView