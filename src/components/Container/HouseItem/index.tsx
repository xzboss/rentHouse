import React, { useState, useCallback } from 'react'
import { history, useModel } from 'umi'
import { Image } from 'antd'
import style from './index.less'
import { DelButton, HeartButton } from '../../Button'
import houseDefault from '@/assets/houseDefault.png'
import { listingProps, userDetailProps } from '@/types'
import Login from '@/components/Login'

interface HouseItemProps {
	btnClick?: (listingId?: string, reservationId?: string, reserveBy?: string) => void
	btnDes?: any
	listing?: any
	btnStyle?: any
	display?: string
	height?: string
	children?: React.ReactNode
}
const App: React.FC<HouseItemProps> = ({ btnStyle, listing, btnDes, btnClick }) => {
	const { isLogin, userDetail, setUserDetail } = useModel('userModel')
	const { openModal } = useModel('globalModel')
	const [blur, setBlur] = useState(userDetail?.favoriteIds?.includes(listing?._id as string))


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
		}
		//render and request
		setUserDetail({ ...userDetail })
		setBlur(userDetail?.favoriteIds?.includes(listing?._id as string))
	}


	const handleRemove = async (e: any) => {
		e.stopPropagation()
		btnClick?.(listing._id, listing.reservationId, listing.reserveBy)
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
				<p>{listing?.dateRange ?? listing?.category}</p>
				<div>
					<b className={style.price}>￥{listing?.totalPrice ?? listing?.price + ' night'}</b>
				</div>
				<DelButton
					style={{ ...btnStyle }}
					onClick={handleRemove}>{btnDes ?? 'remove'}</DelButton>
			</div>
		</div>
	)
}

export default App