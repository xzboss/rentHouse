import React, { useState } from 'react'
import { history } from 'umi'
import { Image } from 'antd'
import style from './index.less'
import { DelButton, HeartButton } from '../../Button'
//按钮props
interface btnStyle {
	display?: string
	height?: string
	children?: React.ReactNode
}
//每个信息卡片的props
interface HouseItemProps {
	btnStyle?: btnStyle
	display?: string
	height?: string
	children?: React.ReactNode
}
const App: React.FC<HouseItemProps> = (props) => {
	//改变爱心按钮样式
	const [blur, setBlur] = useState(false)

	/**
	 * 去详情
	 * @callback
	 */
	const handleClick = () => {
		console.log('click')
		history.push('/detail', {
			state: {
				date: 'hello'
			}
		})
	}
	
	const clickHeart=(e:any)=>{
		setBlur(!blur);
		e.stopPropagation();
	}
	return (
		<div className={style['house-item']} onClick={handleClick}>
			<div className={style.imgBox}>
			<HeartButton blur={blur} onClick={clickHeart} className={style.heart} />
			<Image className={style.img}
				onError={() => { }}
				width={200}
				preview={false}
				src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
			/>
			</div>
			
			<div>
				<b>亚洲，中国</b>
				<p>沙滩</p>
				<div>
					<b className={style.price}>￥1000</b>  night
				</div>
				<DelButton style={{ ...props.btnStyle }} onClick={handleClick}>删除</DelButton>
			</div>
		</div>
	)
}

export default App