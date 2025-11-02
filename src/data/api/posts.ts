import {generalRequest} from "@/data/services/request";

export function apiGetPosts(){
    return generalRequest.get(`posts`)
}