import request from './request'
import { listingProps } from '@/types'
const { get, post, put, remove } = request

export const findListing = async (query: any) => {
	return await get(`proxy/api/findListing`, query)
}
export const getAllListing = async (query: any) => {
	return await get(`proxy/api/findListing`, query)
}