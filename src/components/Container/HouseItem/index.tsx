import React, { useState, useCallback } from 'react'
import { history, useModel } from 'umi'
import { Image } from 'antd'
import style from './index.less'
import { DelButton, HeartButton } from '../../Button'
import houseDefault from '@/assets/houseDefault.png'
import { listingProps, userDetailProps } from '@/types'
import Login from '@/components/Login'

interface HouseItemProps {
	listing?: listingProps
	btnStyle?: any
	display?: string
	height?: string
	children?: React.ReactNode
}
const App: React.FC<HouseItemProps> = ({ btnStyle, listing }) => {
	const { isLogin, userDetail, setUserDetail } = useModel('userModel')
	const { openModal } = useModel('globalModel')
	const [blur, setBlur] = useState(userDetail?.favoriteIds?.includes(listing?._id as string))
	console.log(blur)


	/**
	 * to /detail
	 * @callback
	 */
	const handleClick = () => {
		history.push('/detail', { listing })
	}

	/**
	 * blur or noBlur
	 * @param e 
	 */
	const clickHeart = (e: any) => {
		e.stopPropagation()
		if (!isLogin) return openModal(<Login />)

		//isExist
		const idx = userDetail?.favoriteIds?.indexOf(listing?._id as string)
		//add or remove
		if (idx !== -1) {
			userDetail?.favoriteIds?.splice(idx!, 1)
		} else {
			userDetail?.favoriteIds?.push(listing!._id as string)
			console.log(userDetail,)
		}
		//render and request
		setUserDetail({ ...userDetail })
		setBlur(userDetail?.favoriteIds?.includes(listing?._id as string))
	}
	return (
		<div className={style['house-item']} onClick={handleClick}>
			<div className={style.imgBox}>
				<HeartButton
					blur={blur ? 1 : 0}
					onClick={clickHeart}
					className={style.heart} />
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