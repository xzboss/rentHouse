import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Divider, Select, Space, Row, Col } from 'antd'
import { useModel } from 'umi'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import Map from '@/components/Map'
import Calendar from '@/components/Calendar'
import { DelButton, PrimaryButton } from '../Button'
import Counter from '@/components/Counter'
import style from './index.less'

interface ChildrenProps {
	step: number,
	setStep: React.Dispatch<React.SetStateAction<number>>
}

const P1: React.FC<ChildrenProps> = (props) => {
	const { regions } = useModel('staticModel')
	const { data } = useModel('searchModel')
	const options = useMemo(() => {
		return regions.map(item => {
			return {
				value: item.region + '-' + item.country,
				label: item.region + '-' + item.country,
				latlng: item.latlng
			}
		})
	}, [])

	const [position, setPosition] = useState(options.find(item => item.label === data.label)?.latlng)
	//描述
	const [des, setDes] = useState(data.label)
	/**
	* @callback 选项改变
	* @param v 展示值
	* @param option 源对象
	*/
	const onChange = (v: any, option: any) => {
		//console.log('chang', option)
		setPosition(option.latlng)
		setDes(option.label)
		data.label = option.label
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
				defaultValue={data.label}
				onChange={onChange}
				onSearch={onSearch}
				options={options}
			/>
			<Divider />
			<Map style={{ height: '35vmin' }} position={position} describe={des} />
			<br />
			<PrimaryButton
				onClick={() => props.setStep(props.step + 1)}
				style={{ height: '40px' }}>N E X T</PrimaryButton>
		</div>
	)
}
const P2: React.FC<ChildrenProps> = (props) => {
	const { data } = useModel('searchModel')
	const { step, setStep } = props
	const getDate = (startDay: Dayjs, endDay: Dayjs) => {
		data.dateRange = [startDay, endDay]
	}
	return (
		<div className={style.box}>
			<h2>When do you plan to go?</h2>
			<p>select date</p>
			<Calendar
				validRange={[dayjs(), dayjs().add(8, 'M')]}
				getDate={getDate}
				dateRange={data.dateRange as [Dayjs, Dayjs]} />
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
const P3: React.FC<ChildrenProps> = (props) => {
	const { data } = useModel('searchModel')
	const { step, setStep } = props
	/**
	 * 搜索
	 * 踢出去
	 */
	const search = () => {
		console.log(data)
	}
	return (
		<div className={style.box}>
			<h2>More information</h2>
			<p>default 1</p>
			<Counter num={data.guestCount} onChange={(num) => { data.guestCount = num }}>{['人数', '有多少人需要住宿?']}</Counter>
			<br />
			<Counter num={data.roomCount} onChange={(num) => { data.roomCount = num }}>{['房间数', '你需要多少房间?']}</Counter>
			<br />
			<Counter num={data.bathRoomCount} onChange={(num) => { data.bathRoomCount = num }}>{['厕所数', '你需要多少厕所?']}</Counter>
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
	//
	const [step, setStep] = useState<number>(0)
	switch (step) {
		case 1: return <P2 step={step} setStep={setStep} />
		case 2: return <P3 step={step} setStep={setStep} />
		default: return <P1 step={step} setStep={setStep} />
	}

}
export default P