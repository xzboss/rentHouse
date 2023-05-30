import React from 'react'
import { history } from 'umi'
import '@/assets/icon/iconfont.css'
import style from './index.less'
interface _props {
	data: {
		className: string,
		type: string
	}
}
export default (props: _props) => {
	const handleClick = () => {
		history.push(`/${props.data.type}`)
	}
	return (
		<div className={style.NavItem} onClick={handleClick}>
			<i className={'iconfont ' + props.data.className}></i>
			<span>{props.data.type}</span>
		</div>

	)
}