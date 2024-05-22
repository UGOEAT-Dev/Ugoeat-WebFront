import { Customer } from "@/features/common/types/Customer";
import { PaginationOptions } from "@/features/common/types/options/PaginationOption";
import { UserService } from "./users.service";

export class CustomerService extends UserService
{
    static async fetch(options?: PaginationOptions) {
        return super.getUsers<Customer>("customer", options)
    }
}