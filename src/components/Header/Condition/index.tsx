import React from 'react'
import { Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useModel } from 'umi'
import Search from '@/components/Search'
import './index.less'
const Page: React.FC = (props: any) => {
	const screen = {
		xs: 0, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24
	}
	const { openModal } = useModel('globalModel')
	const handleOnclick = () => {
		openModal(<Search />)

	}
	return (
		<Row className='condition' wrap={false} onClick={handleOnclick}>
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