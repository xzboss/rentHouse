import React from 'react'
import style from './index.less'
//按钮props
interface btnStyle {
	style?: {
		display?: string
		height?: string
	}
	children?: React.ReactNode
	onClick?: () => void
}
//默认按钮样式属性值
const defaultStyle = {
	display: 'block',
	height: '1.875rem',
	children: '确定'
}
export const TxtButton: React.FC<btnStyle> = (props) => {
	return (
		<span {...props}
			className={style.txt}>{props.children || defaultStyle.children}</span>
	)
}
export const DelButton: React.FC<btnStyle> = (props) => {
	return (
		<button {...props} style={{ ...defaultStyle, ...props.style }}
			className={style.btn + ' ' + style.del}>{props.children || defaultStyle.children}</button>
	)
}
export const PrimaryButton: React.FC<btnStyle> = (props) => {
	return (
		<button {...props} style={{ ...defaultStyle, ...props.style }}
			className={style.btn + ' ' + style.primary}>{props.children || defaultStyle.children}</button>
	)
}