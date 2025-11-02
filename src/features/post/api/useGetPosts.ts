import {useQuery} from "@tanstack/react-query";
import {apiGetPosts} from "@/data/api/posts";
import type {postQueryResponse} from "../types/postsTypes";

export const useGetPostsQuery = () => {
    return useQuery<postQueryResponse>({
        queryKey: ['posts'],
        queryFn: () => apiGetPosts(),
    })
}