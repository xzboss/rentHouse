import React, { useState } from 'react'
import { history } from 'umi'
import { Image } from 'antd'
import style from './index.less'
import { DelButton, HeartButton } from '../../Button'
import houseDefault from '@/assets/houseDefault.png'
import { listingProps } from '@/types'
//每个信息卡片的props
interface HouseItemProps {
	listing?: listingProps
	btnStyle?: any
	display?: string
	height?: string
	children?: React.ReactNode
}
const App: React.FC<HouseItemProps> = ({ btnStyle, listing }) => {

	//改变爱心按钮样式
	const [blur, setBlur] = useState(false)

	/**
	 * 去详情
	 * @callback
	 */
	const handleClick = () => {
		history.push('/detail', { listing })
	}

	const clickHeart = (e: any) => {
		setBlur(!blur);
		e.stopPropagation();
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