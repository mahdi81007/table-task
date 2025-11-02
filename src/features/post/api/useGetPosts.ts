import {useQuery} from "@tanstack/react-query";
import {apiGetPosts} from "@/data/api/posts";

export const useGetPostsQuery = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => apiGetPosts(),
    })
}