import React from 'react'
import { Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useModel } from 'umi'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Search from '@/components/Search'
import './index.less'
const Page: React.FC = (props: any) => {
	const screen = {
		xs: 0, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24
	}
	const { openModal } = useModel('globalModel')
	const { data: { locationValue, guestCount, dateRange } } = useModel('searchModel')
	const [startDay, endDay] = dateRange ?? [dayjs(), dayjs().add(1, 'd')]
	const handleOnclick = () => {
		openModal(<Search />)

	}
	return (
		<Row className='condition' wrap={false} onClick={handleOnclick}>
			<Col><Col >{(locationValue === 'any-where' || !locationValue) ? 'anywhere' : locationValue}</Col></Col>
			<Col><Col {...screen}>|</Col></Col>
			<Col><Col {...screen}><b>{dayjs(endDay).diff(startDay, 'd')}</b>  day</Col></Col>
			<Col><Col {...screen}>|</Col></Col>
			<Col><Col {...screen}><b>{guestCount ?? 1} </b> person</Col></Col>
			<Col><Col {...screen}>|</Col></Col>
			<Col><Col><SearchOutlined /></Col></Col>
		</Row>
	)
}
export default Page