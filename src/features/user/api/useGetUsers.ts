import {apiGetUsers} from "@/data/api/users";
import {useQuery} from "@tanstack/react-query";
import type {userQueryResponse} from "../types/usersTypes";

export const useGetUsersQuery = () => {
    return useQuery<userQueryResponse>({
        queryKey: ['users'],
        queryFn: () => apiGetUsers(),
    })
}