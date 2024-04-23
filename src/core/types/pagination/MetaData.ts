
interface MetaDataLink
{
    url: string,
    label: string,
    active: boolean
}

interface MetaData
{
    links: MetaDataLink[],
    from: number,
    to: number,
    per_page: number,
    current_page: number,
    total: number,
    path: string
}