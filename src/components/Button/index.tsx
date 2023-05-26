import React from 'react'
import style from './index.less'
//按钮props
interface btnStyle {
	style?: {
		[p: string]: any
	}
	children?: React.ReactNode
	onClick?: () => void,
	className?: any
	blur?: boolean|number
}
//默认按钮样式属性值
const defaultStyle = {
	display: 'block',
	height: '1.875rem',
	children: '确定'
}
/* 文本按钮 */
export const TxtButton: React.FC<btnStyle> = (props) => {
	return (
		<span {...props}
			className={style.txt + ' ' + props.className}>{props.children || defaultStyle.children}</span>
	)
}
/* 删除按钮 */
export const DelButton: React.FC<btnStyle> = (props) => {
	return (
		<button {...props} style={{ ...defaultStyle, ...props.style }}
			className={style.btn + ' ' + style.del + ' ' + props.className}>{props.children || defaultStyle.children}</button>
	)
}
/* 主要按钮 */
export const PrimaryButton: React.FC<btnStyle> = (props) => {
	return (
		<button {...props} style={{ ...defaultStyle, ...props.style }}
			className={style.btn + ' ' + style.primary + ' ' + props.className}>{props.children || defaultStyle.children}</button>
	)
}
/* 爱心按钮 */
export const HeartButton: React.FC<btnStyle> = (props) => {
	console.log(props)

	return (
		<div {...props} style={{ ...props.style }}
			className={style.heart + ' ' + props.className}>
			<div className={style.bg}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className={style.show + ' ' + (props.blur ? '' : style.noBlur)}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}