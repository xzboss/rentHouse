import React, { useState, useEffect } from 'react'
import { useModel } from 'umi'
import { getTrips, removeReservationById } from '@/service/api'
import { CODE } from '@/constants'
import HouseItem from '@/components/Container/HouseItem'
import Empty from '@/components/Empty'
import dayjs from 'dayjs'
import { notifyWarn, notifySuccess } from '@/utils/modal'

export default (props: any) => {
	const { userDetail, setUserDetail } = useModel('userModel')
	const [listings, setListings] = useState<any>()
	useEffect(() => {
		(async () => {
			const { code, data } = await getTrips(userDetail?._id)
			if (code === CODE.SUCCESS) {
				let listings: any = []
				//获取我的所有预定信息
				data.map((listing: any) => {
					listing.reservationsValue.map(({ _id, startDate, endDate, totalPrice }: any) => {
						listing['reservationId'] = _id
						listing['dateRange'] = dayjs(startDate).format('DD,MMM,YYYY') + ' - ' + dayjs(endDate).format('DD,MMM,YYYY')
						listing['totalPrice'] = totalPrice
						listings.push({...listing})
					})
				})
				setListings(listings)
			}
		})()
	}, [userDetail])

	const handleRemove = async (listingId: string | undefined, reservationId: string | undefined) => {
		//
		const idx = userDetail?.reservations?.indexOf(reservationId!)
		if (idx === -1) return
		//删除我的预定
		const res = await removeReservationById(listingId as string, reservationId as string)

		if (res.code === CODE.SUCCESS) {
			userDetail?.reservations?.splice(idx!, 1)
			setUserDetail({ ...userDetail })
			const tmp = listings.filter((item: any) => item.reservationId !== reservationId)
			setListings(tmp)
			notifySuccess(res.message)
		} else {
			notifyWarn(res.message)
		}
	}

	return (
		<div style={{ width: '100%' }} className='house-list'>
			{listings?.length ?
				listings?.map((listing: any) => {
					return (
						<HouseItem
							key={listing.reservationId}
							listing={listing}
							btnDes='cancel reservation'
							btnClick={handleRemove} />
					)
				}) : <Empty />}
		</div>
	)
}