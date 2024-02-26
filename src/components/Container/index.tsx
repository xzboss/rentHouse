import React, { useEffect } from 'react'
import HouseItem from './HouseItem'
import Empty from '@/components/Empty'
import { listingProps } from '@/types'
interface _Props {
	listings?: listingProps[]
}
const P: React.FC<_Props> = ({ listings }) => {
	const count = { x: 0 }
	const observe = () => {
		const imgs = document.querySelectorAll(".lazy");
		const intersect = new IntersectionObserver((entries, observe) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log('ok')
					const img: any = entry.target;
					img.src = img.dataset.src;
					img.classList.remove("lazy");
					intersect.unobserve(img);
				}
			});
		});
		imgs.forEach((img) => {
			intersect.observe(img);
		});
	}
	return (
		<div style={{ width: '100%' }}>
			<div className='house-list'>
				{
					listings?.length ?
						listings.map(
							(item: any, index) => {
								return (
									<HouseItem
										key={item._id}
										btnStyle={{ display: 'none' }}
										listing={item}
										observe={observe}
										final={index === listings.length - 1} />
								)
							}
						) : <Empty />
				}
			</div>
		</div>
	)
}
export default P
