import axios from 'axios'

const createPureInstance = (baseUrl:string, { headers, ...configs } = {}) => {
    return axios.create({
        timeout: 15000,
        baseURL: baseUrl,
        headers: {
            ...(headers || {}),
        },
        ...configs,
    })
}



const createInstance = (baseUrl:string, configs = {}) => {
    const instance = createPureInstance(baseUrl, configs)
    return instance
}

export { createInstance, createPureInstance }
