
import {Dialog} from "primereact/dialog"
import {Button} from "primereact/button"
import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"
import RoundedImage from "../../../../components/RoundedImage";
import {parseUserRole} from "../../../../core/lib/helpers";
import { User } from "../../../../core/types/User";

/**
 * It's a dialog that display a user
 */
function UserDialogView({user, onHide, visible, ...props}: {user:User, onHide:any, visible:boolean, className?: string})
{
    const userCredentials = [
        { name: "Id", value: user.id },
        { name: "Role", value: parseUserRole(user.role ?? 'customer') },
        { name: "Telephone", value: user.tel ?? 'NULL' },
        { name: "Adresse", value: user.address ?? 'NULL' },
        { name: "Inscrit le", value: new Date(user.created_at ?? 0).toLocaleDateString() }
    ]

    return visible && (
        <Dialog
            onHide={onHide} visible={visible}
            content={({hide}) => {

                return (
                    <div className={`bg-white p-3 rounded-md ${props.className}`}>
                        <header className="text-end">
                            <Button onClick={hide} className="hover:scale-125" icon="pi pi-times" />
                        </header>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex flex-col items-center gap-1 ">
                                <RoundedImage size={300} src={user.image_url}/>
                                <span className="font-bold text-lg">{user.name}</span>
                                <span className="">{user.email}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <DataTable className="h-full" value={userCredentials} size="large" style={{minWidth: '200px'}}>
                                    <Column field="name"></Column>
                                    <Column field="value" className="text-black"></Column>
                                </DataTable>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        icon="pi pi-star"
                                        className="p-2 bg-secondary hover:bg-gray-600 text-white w-full" label="Promouvoir"/>
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-2 bg-red-600 hover:bg-red-400 text-white w-full" label="Supprimer"/>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }}></Dialog>
    )
}

export default UserDialogView