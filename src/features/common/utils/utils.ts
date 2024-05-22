
type GetStorageFuncKeyType = 'local' | 'session'

export function getStorageFunc(key: GetStorageFuncKeyType = 'local'): Storage
{
    return key === 'local' ? localStorage : sessionStorage
}