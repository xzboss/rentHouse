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
export const removeListingById = async (listingId: string) => {
	return await remove(`proxy/api/removeListingById`, { listingId })
}
export const incrementListing = async (listing: any) => {
	return await post(`proxy/api/incrementListing`, listing)
}
export const uploadImg = async (formData:any) => {
	return await post(`proxy/api/uploadImg`, formData)
}

//-----------user
export const findUserById = async (userId: string) => {
	return await get(`proxy/api/findUserById`, { userId })
}
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
export const getTrips = async (_id: string) => {
	return await get('/proxy/api/getTrips', { userId: _id })
}
export const getFavorites = async (_id: string) => {
	return await get('/proxy/api/getFavorites', { userId: _id })
}
export const getReservations = async (_id: string) => {
	return await get('/proxy/api/getReservations', { userId: _id })
}
export const getMyListings = async (_id: string) => {
	return await get('/proxy/api/getMyListings', { userId: _id })
}

//-----------reservation
export const incrementReservation = async (reservation: any) => {
	return await post('/proxy/api/incrementReservation', reservation)
}
export const getReservedRanges = async (listingId: any) => {
	return await get('/proxy/api/getReservedRanges', { listingId })
}
export const removeReservationById = async (listingId: string, reservationId: string, reserveBy?: string) => {
	return await remove(`proxy/api/removeReservationById`, { listingId, reservationId, reserveBy })
}
//---other