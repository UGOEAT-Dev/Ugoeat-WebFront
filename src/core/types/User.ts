
export type UserRole = "customer" | "restaurant" | "admin"

export interface User 
{
    id: number,
    name?: string,
    email?: string,
    role?: UserRole,
    image_url?: string,
    address?: string,
    tel?: string,
    email_verified_at?: Date | null,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null
}

export class UserFactory
{
    static create({id = 0, ...props}: User): UserImpl
    {
        return new UserImpl({id, ...props})
    }
}

export class UserImpl implements User
{
    id: number = 0
    name?: string 
    email?: string
    role?: UserRole
    image_url?: string
    address?: string    
    tel?: string
    email_verified_at?: Date | null
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date | null
    
    private token?: string
    
    constructor({id = 0, ...props}: User)
    {
        this.id = id
        this.name = props.name
        this.email = props.email 
        this.role = props.role
        this.image_url = props.image_url
        this.tel = props.tel
        this.address = props.address
        this.email_verified_at = props.email_verified_at
        this.created_at = props.created_at
        this.updated_at = props.updated_at
        this.deleted_at = props.deleted_at
    }

    isAdmin(): boolean { return this.role === 'admin' }

    isRestaurant(): boolean { return this.role === 'restaurant' }

    isCustomer(): boolean { return this.role === 'customer' }

    accessToken(): string { return this.token ?? '' }

    setAccessToken(token: string) { this.token = token }

}

