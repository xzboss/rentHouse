import React from 'react'

import './font.css'
import style from './index.less'
export default (props: any) => {
	return (
		<div className={style.NavItem}>
			<i className={'iconfont ' + props.data.className}></i>
			<span>{props.data.type}</span>
		</div>

	)
}