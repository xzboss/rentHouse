import request from './request'
import { listingProps } from '@/types'
const { get, post, put, remove } = request
interface loginProp {
	email: string
	password: string
}

export const findListing = async (query: any) => {
	return await get(`proxy/api/findListing`, query)
}
export const getAllListing = async (query: any) => {
	return await get(`proxy/api/findListing`, query)
}
export const login = async (query: loginProp) => {
	return await post(`proxy/api/login`, query)
}
export const verifyToken = async () => {
	return await get(`proxy/api/verifyToken`)
}