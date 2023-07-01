import React, { useState, useMemo, useEffect } from 'react'
import { Image, Divider, Space, Row, Col } from 'antd'
import { useLocation, useModel } from 'umi'

import { PrimaryButton, HeartButton } from '@/components/Button'
import '@/assets/icon/iconfont.css'
import style from './index.less'
import Map from '@/components/Map'
import Calendar from '@/components/Calendar'
import dayjs, { Dayjs } from 'dayjs'
import houseDefault from '@/assets/houseDefault.jpg'
import Login from '@/components/Login'
import { listingProps } from '@/types'
import {
	getReservedRanges,
	incrementReservation,
	findUserById
} from '@/service/api'
import { CODE } from '@/constants'
import { notifyWarn, notifySuccess } from '@/utils/modal'
import LoadingAnimation from '@/components/LoadingAnimation'
import { AVATARURL } from '@/constants'

interface DetailProps {
}

const FC: React.FC<DetailProps> = (props) => {
	const { isLogin, userDetail, setUserDetail } = useModel('userModel')
	const {
		openModal,
		disabled,
		setDisabled,
		isLoading,
		setIsLoading } = useModel('globalModel')
	//响应
	console.log(disabled)

	const screen = {
		xs: 24, sm: 24, md: 24, lg: 24, xl: 20, xxl: 20
	}
	const location = useLocation() as any

	const {
		_id,
		validRange,
		title,
		category,
		imageSrc,
		latlng,
		price,
		roomCount,
		bathRoomCount,
		guestCount,
		description,
		locationValue,
		reservations,
		userId } = location.state.listing
	let [startDay, setStartDay] = useState<Dayjs | null>()
	let [endDay, setEndDay] = useState<Dayjs | null>()
	const day = dayjs()
	const _validRange = [dayjs(validRange?.[0]), dayjs(validRange?.[1])] as [Dayjs, Dayjs]
	const [blur, setBlur] = useState(userDetail?.favoriteIds?.includes(_id))
	const totalPrice = (endDay ? (endDay as Dayjs).diff(startDay, 'd') * price : 0).toFixed(2)
	const [boss, setBoss] = useState('xzboss')
	/**
	 * 获取日历组件选择的时间
	 * @param s 开始时间
	 * @param e 结束时间
	 */
	const getDate = (s: Dayjs, e: Dayjs) => {
		//下午12:00入住,上午14:00结束
		setStartDay(s?.hour(12).minute(0))
		setEndDay(e?.hour(14).minute(0))
	}



	/**
	 * @callback
	 * 预定
	 */
	const reserve = async () => {
		if (!isLogin) return openModal(<Login />)
		if (!startDay || !endDay || (startDay.isSame(endDay, 'd'))) {
			return notifyWarn('租赁时间最少为 当日14:00 至 次日12:00')
		}
		try {
			setDisabled(true)
			setIsLoading(true)
			const res = await incrementReservation({
				userId: userDetail?._id,
				listingId: _id,
				startDate: startDay,
				endDate: endDay,
				totalPrice
			})
			if (res.code === CODE.SUCCESS) {
				userDetail?.reservations?.push(res.data._id)
				setUserDetail({ ...userDetail })
				notifySuccess(res.message)
			}
			if (res.code === CODE.UNAUTHENTICATED) {
				notifyWarn(res.message)
			}
			setDisabled(false)
			setIsLoading(false)
		} catch (error) {
			notifyWarn()
		}
	}

	/**
		* blur or noBlur
		* @param e 
		*/
	const clickHeart = (e: any) => {
		e.stopPropagation()
		if (!isLogin) return openModal(<Login />)
		//isExist
		const idx = userDetail?.favoriteIds?.indexOf(_id)
		//add or remove
		if (idx !== -1) {
			userDetail?.favoriteIds?.splice(idx!, 1)
		} else {
			userDetail?.favoriteIds?.push(_id)
			console.log(userDetail,)
		}
		//render and request
		setUserDetail({ ...userDetail })
		setBlur(userDetail?.favoriteIds?.includes(_id))
	}

	//getReservedRanges
	let [reservedRange, setReservedRange] = useState<[Dayjs, Dayjs][]>()
	useEffect(() => {
		(async () => {
			const { code, data } = await getReservedRanges(_id)
			if (code === CODE.SUCCESS) setReservedRange(data)
		})()
	}, [isLoading])

	//获取发布者
	useEffect(() => {
		(async () => {
			const { code, data } = await findUserById(userId)
			if (code === CODE.SUCCESS) setBoss(data.name)
		})()
	}, [])

	//缓存日历
	const CalendarMemo = useMemo(() => {
		return <Calendar reservedRange={reservedRange} validRange={_validRange} getDate={getDate} />
	}, [validRange, reservedRange])
	return (
		<Col {...screen}>
			<br />
			<h1>{title}</h1>
			<p className=''>{locationValue}</p>
			<div className={style.img}>
				<HeartButton
					onClick={clickHeart}
					blur={blur ? 1 : 0}
					style={{ right: '5%', top: '5%' }} />
				<Image style={{ borderRadius: '15px' }}
					onError={() => { }}
					width={'100%'}
					preview={false}
					fallback={houseDefault}
					src={imageSrc}
				/>
			</div>
			<Row justify={'space-between'}>
				<Col xs={{ span: 24, order: 2 }}
					sm={{ span: 24, order: 2 }}
					md={{ span: 24, order: 2 }}
					lg={{ span: 13, order: 1 }}
					xl={{ span: 13, order: 1 }}
					xxl={{ span: 13, order: 1 }}>

					<div className={style.space}>
						<h2>
							Publisher: {boss}
						</h2>
						<Image style={{ borderRadius: '50%' }}
							width={30}
							height={30}
							preview={false}
							src={AVATARURL}
						/>
					</div>
					<br />
					<Space >
						<span>{guestCount} guests</span>
						<span>{roomCount} rooms</span>
						<span>{bathRoomCount} bathrooms</span>
					</Space>
					<Divider />
					<Space>
						<span className='iconfont icon-Desert' style={{ fontSize: '2.5vw' }}></span>
						<div style={{ display: 'inline-block' }}>
							<b>{category}</b>
							<br />
							<span>The surroundings of this property are: {category}</span>
						</div>
					</Space>
					<Divider />
					<p>{description}</p>
					<Divider />
					<Map style={{ height: '350px' }} position={latlng} describe={locationValue} />
				</Col>


				<Col className={style.calendarBox}
					xs={{ span: 24, order: 1 }}
					sm={{ span: 24, order: 1 }}
					md={{ span: 24, order: 1 }}
					lg={{ span: 10, order: 2 }}
					xl={{ span: 10, order: 2 }}
					xxl={{ span: 10, order: 2 }}>
					<Space align='center'>
						<h1 style={{ display: 'inline-block' }}>￥{price}</h1>
						<span>night</span>
					</Space>
					<Divider />
					{CalendarMemo}
					<Divider />
					<PrimaryButton
						style={{ height: '2.5rem' }}
						onClick={reserve}
						disabled={disabled}>
						{isLoading ? <LoadingAnimation /> : 'Reserve'}
					</PrimaryButton>
					<Divider />
					<div className={style.price}>
						<h2>Total</h2>
						<h2>￥ {totalPrice}</h2>
					</div>
				</Col>
			</Row>
		</Col>
	)
}

export default FC