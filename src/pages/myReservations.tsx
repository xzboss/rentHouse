import React, { useState, useEffect } from 'react'
import { useModel } from 'umi'
import { getReservations, removeReservationById } from '@/service/api'
import { CODE } from '@/constants'
import HouseItem from '@/components/Container/HouseItem'
import Empty from '@/components/Empty'
import dayjs from 'dayjs'
import { notifySuccess, notifyWarn } from '@/utils/modal'

export default (props: any) => {
	const { userDetail, setUserDetail } = useModel('userModel')
	const [listings, setListings] = useState<any>()
	console.log(listings)
	
	useEffect(() => {
		(async () => {
			const { code, data } = await getReservations(userDetail?._id)
			console.log(data)
			
			if (code === CODE.SUCCESS) {
				let listings: any = []
				//获取我的房源的所有预定信息
				data.map((listing: any) => {
					listing.reservationsValue.map(({ _id, userId, startDate, endDate, totalPrice }: any) => {
						//此预定由谁发起id
						listing['reserveBy'] = userId
						listing['reservationId'] = _id
						listing['dateRange'] = dayjs(startDate).format('DD,MMM,YYYY') + ' - ' + dayjs(endDate).format('DD,MMM,YYYY')
						listing['totalPrice'] = totalPrice
						listings.push({ ...listing })
					})
				})
				setListings(listings)
			}
		})()
	}, [userDetail])

	const handleRemove = async (listingId: string | undefined, reservationId: string | undefined, reserveBy: string | undefined) => {
		//删除别人的预定
		const res = await removeReservationById(listingId as string, reservationId as string, reserveBy as string)
		if (res.code === CODE.SUCCESS) {
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
							btnDes='cancel guest reservation'
							btnClick={handleRemove} />
					)
				}) : <Empty />}
		</div>
	)
}