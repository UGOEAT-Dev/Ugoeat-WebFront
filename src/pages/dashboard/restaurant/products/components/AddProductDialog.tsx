import { RestaurantService } from "@/features/admin/services/restaurant.service";
import { Icon } from "@/features/common/components/elements/Icon";
import { ProductService } from "@/features/common/services";
import { keepPreviousData, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import { PickList } from "primereact/picklist";
import { ProgressSpinner } from "primereact/progressspinner";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface AddProductDialogProps
{
    visible: boolean,
    onHide: any,
    user: any,
    products: Product[],
    onSuccess?: any,
}

function getNextPageParam(lastPage: any, _allPages: any, lastPageParam: number)
{
    if(lastPageParam === lastPage.meta?.last_page)
        return undefined
    return lastPageParam + 1
}

export default function AddProductDialog(props: AddProductDialogProps)
{
    const { data } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({pageParam}) => ProductService.fetch({page: pageParam, limit: 100}),
        initialPageParam: 0,
        getNextPageParam: getNextPageParam,
        placeholderData: keepPreviousData,
        staleTime: 60 * 1000
    })

    const mutation = useMutation({
        mutationKey: ['/api/v1/products'],
        mutationFn: (products: any) => RestaurantService.addProducts(props.user.id, products)
    })

    const [source, setSource] = useState<Product[]>([])
    const [target, setTarget] = useState<Product[]>([])

    useEffect(() => { 
        const products = data?.pages.map(response => response.data ?? []).flat()
        const filteredProducts = products?.filter(product => !props.products.some(p => p.id === product.id))
        setSource(filteredProducts ?? []) 
    }, [data])

    const addProducts = () => {

        if(target.length === 0) {
            toast.error("Vous devez ajouter au moins un produit")
            return;
        }
        mutation.mutate({
            products: target.map(product => product.id)}, {
            onSuccess: () => {
                if(props.onSuccess) {
                    props.onSuccess()
                }
            }
        })
    }

    const itemTemplate = (p: Product) => {
        return (
            <div>
                <div className="w-100 p-1 flex gap-3 items-center">
                    <img src={p.image_url} className="h-[40px] w-[60px] rounded-md"/>
                    <div className="flex flex-col">
                        <span className="font-semibold">{p.name}</span>
                        <span>{p.category?.name}</span>
                    </div>
                    <span className="font-semibold ml-auto">{p.price} XAF</span>
                </div>
            </div>
        )
    }

    return (
        <Dialog className="h-[90%] w-11/12 md:w-[90%]" visible={props.visible} onHide={props.onHide}>
            <div className="h-full p-5 flex flex-col">
                <PickList 
                    className="h-full"
                    dataKey="id" filterBy="name"
                    source={source} sourceHeader="Produits Disponible"
                    target={target} targetHeader="Produits Selectionnes"
                    sourceStyle={{padding: '5px 10px'}}
                    targetStyle={{padding: '5px 10px'}}
                    itemTemplate={itemTemplate}
                    filter={true} filterMatchMode="contains"
                    sourceFilterPlaceholder="Nom du produit"
                    showTargetControls={false} showSourceControls={false}
                    onChange={e => {
                        setSource(e.source)
                        setTarget(e.target)
                }}/>
                <div className="flex flex-row-reverse gap-3 items-center text-white">
                    <Fragment>
                        {
                            mutation.isPending ? 
                                <ProgressSpinner className="w-[50px] h-[50px]" /> : 
                            mutation.isSuccess ? 
                                <span className="text-green mr-3"><Icon icon="pi-check-circle" className="text-3xl"/></span> : 
                            mutation.isError ? 
                                <span className="error text-lg"><Icon icon="pi-times"/> Erreur</span> : ''
                        }
                    </Fragment>
                    <button className="bg-primary hover:bg-green-700 rounded-md p-2 px-3" onClick={addProducts}>
                        <Icon icon="pi-plus"/> Ajouter
                    </button>
                    <button className="bg-secondary hover:bg-black rounded-md p-2 px-3" onClick={props.onHide}>
                        <Icon icon="pi-times"/> Annuler
                    </button>
                </div>
            </div>
        </Dialog>
    )
}