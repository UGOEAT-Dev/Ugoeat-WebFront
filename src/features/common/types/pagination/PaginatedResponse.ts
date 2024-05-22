
interface PaginatedResponse<ItemType>
{
    data?: ItemType[],
    links?: {
        first: string | null,
        last: string | null,
        next: string | null,
        prev: string | null
    },
    meta?: MetaData
}