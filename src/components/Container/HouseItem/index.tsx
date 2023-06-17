import React, { useState, useCallback } from 'react'
import { history, useModel } from 'umi'
import { Image } from 'antd'
import style from './index.less'
import { DelButton, HeartButton } from '../../Button'
import houseDefault from '@/assets/houseDefault.png'
import { listingProps, userDetailProps } from '@/types'
import { getDefaultHeart } from '@/utils'

interface HouseItemProps {
	listing?: listingProps
	btnStyle?: any
	display?: string
	height?: string
	children?: React.ReactNode
}
const App: React.FC<HouseItemProps> = ({ btnStyle, listing }) => {
	const { userDetail } = useModel('userModel')

	//heart blur
	const [blur, setBlur] = useState(getDefaultHeart(userDetail, listing))

	/**
	 * to /detail
	 * @callback
	 */
	const handleClick = () => {
		history.push('/detail', { listing })
	}


	const clickHeart = (e: any) => {
		setBlur(!blur);
		e.stopPropagation()
	}
	return (
		<div className={style['house-item']} onClick={handleClick}>
			<div className={style.imgBox}>
				<HeartButton blur={blur} onClick={clickHeart} className={style.heart} />
				<Image className={style.img}
					rootClassName={style.imgAnt}
					onError={() => { }}
					fallback={houseDefault}
					preview={false}
					src={listing?.imageSrc}
				/>
			</div>

			<div>
				<b>{listing?.title}</b>
				<p>{listing?.category}</p>
				<div>
					<b className={style.price}>￥{listing?.price} night</b>
				</div>
				<DelButton style={{ ...btnStyle }} onClick={handleClick}>删除</DelButton>
			</div>
		</div>
	)
}

export default App