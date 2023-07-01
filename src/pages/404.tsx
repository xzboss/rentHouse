import React from 'react'
import { history } from 'umi'

import LoadingAnimation from '@/components/LoadingAnimation'
export default (props: any) => {
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			height: '50vmin'
		}}>
			<h1 style={{ fontSize: '5vmin' }}>您访问的页面好像不存在</h1>
			<h3 onClick={() => {
				history.replace('/')
			}}>点我去首页</h3>
		</div>
	)
}