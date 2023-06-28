import React, { useState, useEffect } from 'react'
import { useModel } from 'umi'
import { getFavorites } from '@/service/api'
import { CODE } from '@/constants'
import HouseItem from '@/components/Container/HouseItem'
import Empty from '@/components/Empty'

export default (props: any) => {
	const { userDetail } = useModel('userModel')
	const [listings, setListings] = useState<any>()
	useEffect(() => {
		(async () => {
			const { code, data } = await getFavorites(userDetail?._id)
			if (code === CODE.SUCCESS) {
				setListings(data)
			}
		})()
	}, [userDetail])

	return (
		<div style={{ width: '100%' }} className='house-list'>
			{listings?.length ?
				listings?.map((listing: any) => {
					return (
						<HouseItem
							key={listing._id}
							listing={listing}
							btnStyle={{ display: 'none' }} />
					)
				}) : <Empty />}
		</div>
	)
}