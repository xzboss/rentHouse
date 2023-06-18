import React, { useState, useMemo } from 'react'
import { Image, Divider, Space, Row, Col } from 'antd'
import { useLocation, useModel } from 'umi'
import { PrimaryButton, HeartButton } from '@/components/Button'
import '@/assets/icon/iconfont.css'
import style from './index.less'
import Map from '@/components/Map'
import Calender from '@/components/Calendar'
import dayjs, { Dayjs } from 'dayjs'
import Bg from '@/components/Bg'
import houseDefault from '@/assets/houseDefault.png'
import Login from '@/components/Login'
import { listingProps } from '@/types'
interface DetailProps {
}

const FC: React.FC<DetailProps> = (props) => {
	const { isLogin, userDetail, setUserDetail } = useModel('userModel')
	const { openModal } = useModel('globalModel')
	//响应
	const screen = {
		xs: 24, sm: 24, md: 24, lg: 24, xl: 20, xxl: 20
	}
	const location = useLocation() as any
	const BgMemo = useMemo(() => <Bg />, [])

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
		locationValue } = location.state.listing
	let [startDay, setStartDay] = useState<Dayjs | null>()
	let [endDay, setEndDay] = useState<Dayjs | null>()
	const day = dayjs()
	const _validRange = [dayjs(validRange?.[0]), dayjs(validRange?.[1])] as [Dayjs, Dayjs]
	const [blur, setBlur] = useState(userDetail?.favoriteIds?.includes(_id))
	/**
	 * 获取日历组件选择的时间
	 * @param s 开始时间
	 * @param e 结束时间
	 */
	const getDate = (s: Dayjs, e: Dayjs) => {
		//[startDay, endDay] = [s, e]
		setStartDay(s)
		setEndDay(e)
	}



	/**
	 * @callback
	 * 预定
	 */
	const reserve = () => {
		if (!startDay) return
		console.log(startDay, endDay)
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

	//缓存日历
	const CalendarMemo = useMemo(() => {
		return <Calender validRange={_validRange} getDate={getDate} />
	}, [validRange])
	return (
		<Col {...screen}>
			{BgMemo}
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
							发布者{'xz'} :
						</h2>
						<Image style={{ borderRadius: '50%' }}
							onError={() => { }}
							width={30}
							height={30}
							preview={false}
							src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
							<span>this property is {category}</span>
						</div>
					</Space>
					<Divider />
					<p>{description}</p>
					<Divider />
					<Map style={{ height: '350px' }} position={latlng} />
				</Col>


				<Col className={style.calendarBox}
					xs={{ span: 24, order: 1 }}
					sm={{ span: 24, order: 1 }}
					md={{ span: 24, order: 1 }}
					lg={{ span: 10, order: 2 }}
					xl={{ span: 10, order: 2 }}
					xxl={{ span: 10, order: 2 }}>
					<Space align='center'>
						<h1 style={{ display: 'inline-block' }}>￥{100}</h1>
						<span>night</span>
					</Space>
					<Divider />
					{CalendarMemo}
					<Divider />
					<PrimaryButton style={{ height: '2.5rem' }} onClick={reserve}>Reserve</PrimaryButton>
					<Divider />
					<div className={style.price}>
						<h2>Total</h2>
						<h2>￥ {startDay ? (endDay as Dayjs).diff(startDay, 'd') * price : price}</h2>
					</div>
				</Col>
			</Row>
		</Col>
	)
}

export default FC