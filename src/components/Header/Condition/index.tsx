import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import './index.less'
const Page: React.FC = (props: any) => {
	return (
		<div className='condition'>
			<span>地22222点</span>
			<span>|</span>
			<span>时qqq间</span>
			<span>|</span>
			<span>人qqq数</span>
			<span>|</span>
			<SearchOutlined />
		</div>
	)
}
export default Page