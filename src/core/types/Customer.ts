import { User, UserImpl } from "./User";

export interface Customer extends User
{
    // empty
}

export class CustomerImpl extends UserImpl implements Customer
{
    // async getOrders(): Promise<Order[]>
    // {
    //     return []
    // }
}