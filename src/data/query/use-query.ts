import {
    useQuery as _useQuery,
    type QueryKey,
    type QueryFunction,
} from "@tanstack/react-query"

const useQuery = (key:QueryKey, fetcher:QueryFunction, options :any) => _useQuery({
    queryKey: key,
    queryFn: fetcher,
    ...options,
})

export { useQuery }
