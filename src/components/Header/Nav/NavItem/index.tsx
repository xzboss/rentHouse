import React from 'react'
import { history, useParams, useModel } from 'umi'
import '@/assets/icon/iconfont.css'
import style from './index.less'
interface _props {
	data: {
		className: string,
		type: string
	}
}
export default (props: _props) => {
	const { type } = useParams()
	const { data, setData } = useModel('searchModel')
	const handleClick = () => {
		history.push(`/${props.data.type}`)
	}
	return (
		<div className={style.NavItem + ' ' + (type === props.data.type ? style.active : '')} onClick={handleClick}>
			<i className={'iconfont ' + props.data.className}></i>
			<span>{props.data.type}</span>
			{type === props.data.type ? <i className={style.line}></i> : undefined}
		</div>

	)
}