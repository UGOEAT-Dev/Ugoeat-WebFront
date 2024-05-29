import { Customer } from "./Customer"
import { ProductOrdered } from "./Product"

export type OrderState = "accepted" | "canceled" | "finished" | "rejected" | "sent"

export interface Order
{
    id?: number,
    delivery?: string,
    amount?: number,
    state?: OrderState
    customer?: Customer,
    is_active?: boolean,
    products?: ProductOrdered[],
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null
}

