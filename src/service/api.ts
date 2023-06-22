import request from './request'
import { listingProps, userProps } from '@/types'
const { get, post, put, remove } = request

//-----------listing
export const findListing = async (query: listingProps) => {
	return await get(`proxy/api/findListing`, query)
}
export const getAllListing = async (query: listingProps) => {
	return await get(`proxy/api/findListing`, query)
}

//-----------user
export const login = async (query: any) => {
	return await post(`proxy/api/login`, query)
}
export const verifyToken = async () => {
	return await get(`proxy/api/verifyToken`)
}
export const incrementUser = async (formData: userProps) => {
	return await post('/proxy/api/incrementUser', formData)
}
export const updateUser = async (body: userProps) => {
	return await post('/proxy/api/updateUser', body)
}

//-----------reservation
export const incrementReservation = async (reservation: any) => {
	return await post('/proxy/api/incrementReservation', reservation)
}
export const getReservedRanges = async (listingId: any) => {
	return await get('/proxy/api/getReservedRanges', {listingId})
}