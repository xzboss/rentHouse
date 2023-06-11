import React, { useEffect, useMemo, useState } from 'react'
import HouseItem from './HouseItem'
import style from './index.less'
import Bg from '@/components/Bg'
import Empty from '@/components/Empty'
import { listingProps } from '@/types'
interface _Props {
	listings?: listingProps[]
}
const P: React.FC<_Props> = ({ listings }) => {
	const BgMemo = useMemo(() => <Bg />, [])

	return (
		<div style={{ width: '100%' }}>
			{BgMemo}
			<div className={style['house-list']}>
				{
					listings?.length ?
						listings.map(
							(item: any) => {
								return (
									<HouseItem
										key={item._id}
										btnStyle={{ display: 'none' }}
										listing={item} />
								)
							}
						) : <Empty />
				}
			</div>
		</div>
	)
}
export default P
