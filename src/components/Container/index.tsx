import React from 'react'
import { useParams } from 'umi'

import HouseItem from './HouseItem'
import style from './index.less'
import Bg from '@/components/Bg';
export default function Container() {
	//房屋类型
	const params = useParams()
	console.log(params)
	let test = new Array(40).fill(1)
	return (
		<div style={{ width: '100%' }}>
			<Bg />
			
			<div className={style['house-list']}>
				{test.map(item => <HouseItem key={'dudud'} btnStyle={{ display: 'none' }} />)}
			</div>
		</div>
	)
}
