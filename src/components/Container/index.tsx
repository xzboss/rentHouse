import React from 'react'
import Nav from './Nav'
import HouseItem from './HouseItem'
import style from './index.less'

export default function Container() {
	return (
		<div>
			<Nav></Nav>
			<div className={style['house-list']}>{[1].map(item => <HouseItem key={'dudud'} btnStyle={{display:'block'}}/>)}</div>
		</div>
	)
}
