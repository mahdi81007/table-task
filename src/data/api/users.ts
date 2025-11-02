import {generalRequest} from "@/data/services/request";

export function apiGetUsers(){
    return generalRequest.get('users')
}