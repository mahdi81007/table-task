import { QueryClient } from '@tanstack/react-query'

let queryClient: QueryClient | undefined

const defaultOptions = {
    queries: {
        retry: false,
        refetchOnMount: false,
        cacheTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    },
}

export function getQueryClient() {
    if (queryClient) return queryClient
    queryClient = new QueryClient({ defaultOptions })
    return queryClient
}