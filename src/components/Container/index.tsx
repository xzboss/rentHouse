import React from 'react'
import HouseItem from './HouseItem'
import Empty from '@/components/Empty'
import { listingProps } from '@/types'
interface _Props {
	listings?: listingProps[]
}
const P: React.FC<_Props> = ({ listings }) => {

	return (
		<div style={{ width: '100%' }}>
			<div className='house-list'>
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
