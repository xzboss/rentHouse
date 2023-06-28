import React, { useState, useEffect } from 'react'
import { useModel } from 'umi'
import { getMyListings, removeListingById } from '@/service/api'
import { CODE } from '@/constants'
import HouseItem from '@/components/Container/HouseItem'
import Empty from '@/components/Empty'
import { notifyWarn, notifySuccess } from '@/utils/modal'

export default (props: any) => {
	const { userDetail, setUserDetail } = useModel('userModel')
	const [listings, setListings] = useState<any>()
	useEffect(() => {
		(async () => {
			const { code, data } = await getMyListings(userDetail?._id)
			if (code === CODE.SUCCESS) {
				setListings(data)
			}
		})()
	}, [userDetail])


	const handleRemove = async (listingId: string | undefined) => {
		//
		const idx = userDetail?.listings?.indexOf(listingId!)
		if (idx === -1) return
		userDetail?.listings?.splice(idx!, 1)
		//删除房源
		const res = await removeListingById(listingId!)
		if (res.code === CODE.SUCCESS) {
			const tmp = listings.filter((item: any) => item._id !== listingId)
			setUserDetail({ ...userDetail })
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
							key={listing._id}
							listing={listing}
							btnDes='remove my property'
							btnClick={handleRemove} />
					)
				}) : <Empty />}
		</div>
	)
}