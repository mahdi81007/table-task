import { createInstance } from './instance'

export const API_BASE_URL = `https://jsonplaceholder.typicode.com`

export const generalRequest = createInstance(API_BASE_URL)
