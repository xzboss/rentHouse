import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { Divider, Select, Space, Row, Col } from 'antd'
import { useModel, history, useParams } from 'umi'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'

import Map from '@/components/Map'
import Calendar from '@/components/Calendar'
import { DelButton, PrimaryButton } from '../Button'
import Counter from '@/components/Counter'
import style from './index.less'
import { ALL, CODE } from '@/constants'
import { TextInput } from '../Input'
import { incrementListing, uploadImg } from '@/service/api'
import { notifySuccess, notifyWarn } from '@/utils/modal'
import LoadingAnimation from '@/components/LoadingAnimation'
interface BtnProps {
	increment?: () => void
	disabled?: boolean
	isLoading?: boolean
}
//back and forward
const BtnGroup: React.FC<BtnProps> = ({ increment, disabled, isLoading }) => {
	const { step, setStep } = useModel('propertyModel')
	return (
		<Row gutter={30} wrap={false}>
			<Col span={12}>
				<DelButton
					style={{ height: '40px' }}
					onClick={() => setStep(step - 1)}
				>B A C K</DelButton>
			</Col>
			<Col span={12}>
				<PrimaryButton
					disabled={disabled}
					style={{ height: '40px' }}
					onClick={increment ?? (() => setStep(step + 1))}
				>{isLoading ? <LoadingAnimation /> : increment ? 'I N C R E M E N T' : 'N E X T'}</PrimaryButton>
			</Col>
		</Row>
	)
}
//locationValue,latlng
const P1: React.FC = (props) => {
	const { regions } = useModel('staticModel')
	const { property, setProperty, step, setStep } = useModel('propertyModel')
	const options = useMemo(() => {
		return regions.map(item => {
			return {
				value: item.region + '-' + item.country,
				label: item.region + '-' + item.country,
				latlng: item.latlng
			}
		})
	}, [])

	const [position, setPosition] = useState(options.find(item => item.label === property.title)?.latlng)
	//map描述
	const [des, setDes] = useState(property.locationValue)

	/**
	* @callback 选项改变
	* @param v 展示值
	* @param option 源对象
	*/
	const onChange = (v: any, option: any) => {
		setPosition(option.latlng)
		setDes(option.label)
		setProperty({
			...property,
			locationValue: option.label,
			latlng: option.latlng
		})
	}
	const onSearch = () => {
		//console.log('select')
	}

	return (
		<div className={style.box}>
			<h2>Where is your house located?</h2>
			<p>select location</p>
			<Select
				style={{ width: '100%' }}
				size='large'
				showSearch
				defaultValue={property.locationValue ?? 'anywhere'}
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
//dateRange
const P2: React.FC = (props) => {
	const { property, setProperty } = useModel('propertyModel')
	const getDate = (startDay: Dayjs, endDay: Dayjs) => {
		if (startDay && endDay)
			setProperty({
				...property,
				validRange: [startDay.toDate(), endDay?.toDate()]
			})
	}
	//缓存日历
	const CalendarMemo = useMemo(() => {
		return <Calendar
			dateRange={[dayjs(property.validRange?.[0]), dayjs(property.validRange?.[1])] ?? undefined}
			validRange={[dayjs(), dayjs().add(8, 'y')]}
			getDate={getDate} />
	}, [])
	return (
		<div className={style.box}>
			<h2>What is your rental time?</h2>
			<p>Your rental time</p>
			{CalendarMemo}
			<br />
			<BtnGroup />
		</div>
	)
}
//guest
const P3: React.FC = (props) => {
	const { property, setProperty } = useModel('propertyModel')
	return (
		<div className={style.box}>
			<h2>Room configuration</h2>
			<p>Default one</p>
			<Counter
				num={property.guestCount}
				onChange={num => setProperty({ ...property, guestCount: num })}
			>{['人数', '有多少人需要住宿?']}</Counter>
			<br />
			<Counter
				num={property.roomCount}
				onChange={num => setProperty({ ...property, roomCount: num })}
			>{['房间数', '你需要多少房间?']}</Counter>
			<br />
			<Counter
				num={property.bathroomCount}
				onChange={num => setProperty({ ...property, bathroomCount: num })}
			>{['厕所数', '你需要多少厕所?']}</Counter>
			<br />
			<BtnGroup />
		</div>
	)
}
//category
const P4: React.FC = (props) => {
	const { property, setProperty } = useModel('propertyModel')
	const { icons } = useModel('staticModel')
	const [selectType, setSelectType] = useState<string | undefined>(property.category)
	return (
		<div className={style.box}>
			<h2>What is your house category</h2>
			<p>House category</p>
			<div className={style.select}>
				{
					icons.map(({ className, type }) => {
						return (
							<div
								key={className + type}
								className={style.selectBox + ' ' + (selectType === type ? style.selected : '')}
								onClick={() => {
									setSelectType(type)
									setProperty({ ...property, category: type })
								}}>
								<b className={'iconfont ' + className}></b>
								<b>{type}</b>
							</div>
						)
					})
				}
			</div>
			<BtnGroup />
		</div>
	)
}
//title,des,price
const P5: React.FC = (props) => {
	const { property, setProperty } = useModel('propertyModel')
	const { title, description, price } = property
	return (
		<div className={style.box}>
			<h2>How do you introduce your house?</h2>
			<p>Introduce the house</p>
			<div className={style.main}>
				<TextInput
					reg={/^[A-Za-z\u4e00-\u9fa5]{1,10}$/}
					label='title'
					onchange={(content: string) => {
						setProperty({ ...property, title: content })
					}} >{title}</TextInput>
				<TextInput
					reg={/^.{1,100}$/}
					label='description'
					onchange={(content: string) => {
						setProperty({ ...property, description: content })
					}} >{description}</TextInput>
				<TextInput
					reg={/^\d+(\.\d{1,2})?$/}
					label='price'
					onchange={(content: string) => {
						setProperty({ ...property, price: content ? Number(content) : undefined })
					}} >{price}</TextInput>
			</div>
			<BtnGroup />
		</div>
	)
}
//img
const P6: React.FC = (props) => {
	const { property, setProperty, step, setStep } = useModel('propertyModel')
	const { userDetail, setUserDetail } = useModel('userModel')
	const { closeModal, disabled, setDisabled, isLoading, setIsLoading } = useModel('globalModel')
	const fileRef = useRef<any>()
	const imgRef = useRef<any>()
	const [imgShow, setShow] = useState(true)
	useEffect(() => () => property.img = undefined, [])
	return (
		<div className={style.box}>
			<h2>What the interior of your house looks like?</h2>
			<p>Interior view of the house</p>
			<div className={style.uploadBox}>
				<input type="file" accept='image/*' ref={fileRef}
					onChange={(e) => {
						//将选择图片放在页面
						const reader = new FileReader()
						const file = new FormData()
						file.append('img', e.target.files![0])
						property.img = file
						reader.readAsDataURL(e.target.files![0])
						reader.onload = (event) => {
							imgRef.current.src = event.target?.result;
						}
					}} />
				<div
					onClick={() => {
						fileRef.current.click()
						setShow(false)
					}}>
					{
						imgShow ?
							<PlusOutlined /> :
							<img className={style.img} alt="nothing" ref={imgRef} />
					}
				</div>
			</div>
			<BtnGroup
				disabled={disabled}
				isLoading={isLoading}
				increment={async () => {
					try {
						setDisabled(true)
						setIsLoading(true)
						//上传图片
						const res = await uploadImg(property.img);
						const { code, data: imageSrc } = res
						//添加房源
						if (code === CODE.SUCCESS) {
							const incrementRes = await incrementListing({ ...property, imageSrc })
							if (incrementRes.code === CODE.SUCCESS) {
								userDetail?.listings?.push(incrementRes.data._id)
								notifySuccess('increment success')
							}
						}
						setDisabled(false)
						setIsLoading(false)
						closeModal()
						history.replace(history.location.pathname)
						setUserDetail({ ...userDetail })


					} catch (err) {
						// 异常处理代码
						notifyWarn()
						setDisabled(false)
						setIsLoading(false)
					}

					//console.log(res)
				}} />
		</div>
	)
}

const P: React.FC = (props: any) => {
	const { step, setStep } = useModel('propertyModel')
	switch (step) {
		case 1: return <P2 />
		case 2: return <P3 />
		case 3: return <P4 />
		case 4: return <P5 />
		case 5: return <P6 />
		default: return <P1 />
	}

}
export default P