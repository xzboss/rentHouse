import React from 'react'
import { useParams } from 'umi'
import Nav from './Nav'
import HouseItem from './HouseItem'
import style from './index.less'
import Bg from '@/components/Bg';
export default function Container() {
	const params = useParams()
	console.log(params)

	return (
		<div style={{ width: '100%' }}>
			<Bg />
			<Nav></Nav>
			<div className={style['house-list']}>
				{[1].map(item => <HouseItem key={'dudud'} btnStyle={{ display: 'none' }} />)}
			</div>
		</div>
	)
}
