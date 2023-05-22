import React from 'react'
import { Image } from 'antd'
import style from './index.less'
import { DelButton } from '../../Button'
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
	/**
	 * callback
	 */
	const handleClick = () => {
		console.log('click')
	}
	return (
		<div className={style['house-item']}>
			<Image className={style.img}
				onError={() => { }}
				width={200}
				preview={false}
				src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
			/>

			<div onClick={() => {
				console.log(11)
			}}>
				<b>亚洲，中国</b>
				<p>沙滩</p>
				<div>
					<b className={style.price}>￥1000</b> / night
				</div>
				<DelButton style={{ ...props.btnStyle}} onClick={handleClick}>删除</DelButton>
			</div>

		</div>
	)
}

export default App