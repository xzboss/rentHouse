import React, { useMemo } from 'react'
import { useParams } from 'umi'

import HouseItem from './HouseItem'
import style from './index.less'
import Bg from '@/components/Bg';
export default function Container() {
	const BgMemo = useMemo(() => <Bg />, [])
	//房屋类型
	const params = useParams()
	console.log(params)
	let test = new Array(1).fill(1)
	return (
		<div style={{ width: '100%' }}>
			{BgMemo}
			<div className={style['house-list']}>
				{test.map(item => <HouseItem key={'dudud'} btnStyle={{ display: 'none' }} />)}
			</div>
		</div>
	)
}
