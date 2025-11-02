import {apiGetUsers} from "@/data/api/users";
import {useQuery} from "@tanstack/react-query";

export const useGetUsersQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => apiGetUsers(),
    })
}