import React from 'react'
import { Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './index.less'
const Page: React.FC = (props: any) => {
	const screen = {
		xs: 0, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24
	}
	return (
		<Row className='condition' wrap={false}>
			<Col><Col >地点</Col></Col>
			<Col><Col {...screen}>|</Col></Col>
			<Col><Col {...screen}>时间</Col></Col>
			<Col><Col {...screen}>|</Col></Col>
			<Col><Col {...screen}>人数</Col></Col>
			<Col><Col {...screen}>|</Col></Col>
			<Col><Col><SearchOutlined /></Col></Col>
		</Row>
	)
}
export default Page