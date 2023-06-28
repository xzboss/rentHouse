
export interface listingProps {
	_id?: string
	__v?: any
	title?: string
	description?: string
	imageSrc?: string
	img?: FormData
	category?: string
	roomCount?: number
	bathroomCount?: number
	guestCount?: number
	latlng?: number[]
	userId?: string
	price?: number
	reservations?: string[]
	validRange?: Date[]
	reservedRange?: Date[][]
	locationValue?: string
	reservationId?: string
}
export interface userProps {
	name?: string
	email?: string
	password?: string
}
export interface userDetailProps {
	_id?: string
	__v?: any
	name?: string
	email?: string
	emailVerify?: Date
	image?: string
	createdAt?: Date
	updateAt?: Date
	favoriteIds?: string[]
	listings?: string[]
	accounts?: string[]
	reservations?: string[]
}