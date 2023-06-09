import React, { useState, useMemo } from 'react'
import { Divider, Select, Space, Row, Col } from 'antd'
import { useModel, history, useParams } from 'umi'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import Map from '@/components/Map'
import Calendar from '@/components/Calendar'
import { DelButton, PrimaryButton } from '../Button'
import Counter from '@/components/Counter'
import style from './index.less'
import { ALL } from '@/constants'


const P1: React.FC = (props) => {
	const { regions } = useModel('staticModel')
	const { data, setData, step, setStep } = useModel('searchModel')
	const options = useMemo(() => {
		return regions.map(item => {
			return {
				value: item.region + '-' + item.country,
				label: item.region + '-' + item.country,
				latlng: item.latlng
			}
		})
	}, [])

	const [position, setPosition] = useState(options.find(item => item.label === data.title)?.latlng)
	//map描述
	const [des, setDes] = useState(data.locationValue)

	/**
	* @callback 选项改变
	* @param v 展示值
	* @param option 源对象
	*/
	const onChange = (v: any, option: any) => {
		//console.log('chang', option)
		setPosition(option.latlng)
		setDes(option.label)
		setData({ ...data, locationValue: option.label })
	}
	const onSearch = () => {
		//console.log('select')
	}

	return (
		<div className={style.box}>
			<h2>Where do you want go?</h2>
			<p>select location</p>
			<Select
				style={{ width: '100%' }}
				size='large'
				showSearch
				defaultValue={data.locationValue ?? 'anywhere'}
				onChange={onChange}
				onSearch={onSearch}
				options={options}
			/>
			<Divider />
			<Map style={{ height: '35vmin' }} position={position} describe={des} />
			<br />
			<PrimaryButton
				onClick={() => setStep(step + 1)}
				style={{ height: '40px' }}>N E X T</PrimaryButton>
		</div>
	)
}
const P2: React.FC = (props) => {
	const { data, setData, step, setStep } = useModel('searchModel')
	const getDate = (startDay: Dayjs, endDay: Dayjs) => {
		setData({ ...data, dateRange: [startDay.toDate(), endDay?.toDate()] })
	}
	//缓存日历
	const CalendarMemo = useMemo(() => {
		return <Calendar validRange={[dayjs(), dayjs().add(8, 'y')]} getDate={getDate} />
	}, [])
	return (
		<div className={style.box}>
			<h2>When do you plan to go?</h2>
			<p>select date</p>
			{CalendarMemo}
			<br />
			<Row gutter={30} wrap={false}>
				<Col span={12}>
					<DelButton
						style={{ height: '40px' }}
						onClick={() => setStep(step - 1)}
					>B A C K</DelButton>
				</Col>
				<Col span={12}>
					<PrimaryButton
						style={{ height: '40px' }}
						onClick={() => setStep(step + 1)}
					>N E X T</PrimaryButton>
				</Col>
			</Row>
		</div>
	)
}
const P3: React.FC = (props) => {
	const { data, setData, step, setStep } = useModel('searchModel')
	const { closeModal } = useModel('globalModel')
	const { type } = useParams()

	//search
	const search = () => {
		history.push('/' + (type ?? ALL), data)
		closeModal()
	}
	return (
		<div className={style.box}>
			<h2>More information</h2>
			<p>Default one</p>
			<Counter num={data.guestCount} onChange={(num) => { setData({ ...data, guestCount: num }) }}>{['Guest', 'How many guest?']}</Counter>
			<br />
			<Counter num={data.roomCount} onChange={(num) => { setData({ ...data, roomCount: num }) }}>{['Room', 'How many rooms?']}</Counter>
			<br />
			<Counter num={data.bathRoomCount} onChange={(num) => { setData({ ...data, bathRoomCount: num }) }}>{['Bathroom', 'How many bathrooms?']}</Counter>
			<br />
			<Row gutter={30} wrap={false}>
				<Col span={12}>
					<DelButton
						style={{ height: '40px' }}
						onClick={() => setStep(step - 1)}
					>B A C K</DelButton>
				</Col>
				<Col span={12}>
					<PrimaryButton
						style={{ height: '40px' }}
						onClick={search}
					>S E A R C H</PrimaryButton>
				</Col>
			</Row>
		</div>
	)
}



const P: React.FC = (props: any) => {
	const { step, setStep } = useModel('searchModel')
	switch (step) {
		case 1: return <P2 />
		case 2: return <P3 />
		default: return <P1 />
	}

}
export default P