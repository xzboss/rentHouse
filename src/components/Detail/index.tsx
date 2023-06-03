import React, { useState, useMemo } from 'react'
import { Image, Divider, Space, Row, Col } from 'antd'
import { useLocation } from 'umi'
import { PrimaryButton, HeartButton } from '@/components/Button'
import '@/assets/icon/iconfont.css'
import style from './index.less'
import Map from '@/components/Map'
import Calender from '@/components/Calendar'
import dayjs, { Dayjs } from 'dayjs'
import Bg from '@/components/Bg'
interface DetailProps {

}

export default (props: DetailProps) => {
	const BgMemo = useMemo(() => <Bg />, [])
	const [blur, setBlur] = useState(0)
	let startDay: Dayjs | null = null
	let endDay: Dayjs | null = null
	const day = dayjs()
	//test
	const validRange = [day, day.add(300, 'day')] as [Dayjs, Dayjs]
	const location = useLocation()
	console.log(location)


	/**
	 * 获取日历组件选择的时间
	 * @param s 开始时间
	 * @param e 结束时间
	 */
	const getDate = (s: Dayjs, e: Dayjs) => {
		[startDay, endDay] = [s, e]
	}



	/**
	 * @callback
	 * 预定
	 */
	const reserve = () => {
		if (!startDay) return
		console.log(startDay, endDay)
	}
	//响应
	const screen = {
		xs: 24, sm: 24, md: 24, lg: 24, xl: 20, xxl: 20
	}
	//justify='space-between' style={{ marginBottom: '50px' }}

	return (
		<Col {...screen}>
			{BgMemo}
			<br />
			<h1>titlwwwwwe</h1>
			<p className=''>亚洲，中国</p>
			<div className={style.img}>
				<HeartButton onClick={() => { setBlur(blur ? 0 : 1) }} blur={blur} style={{ right: '5%', top: '5%' }} />
				<Image style={{ borderRadius: '15px' }}
					onError={() => { }}
					width={'100%'}
					preview={false}
					src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
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
						<span>{1} 人住宿</span>
						<span>{1} 间卧室</span>
						<span>{1} 间浴室</span>
					</Space>
					<Divider />
					<Space>
						<span className='iconfont icon-Desert' style={{ fontSize: '2.5vw' }}></span>
						<div style={{ display: 'inline-block' }}>
							<b>类型</b>
							<br />
							<span>descript ssssssss</span>
						</div>
					</Space>
					<Divider />
					<p>描述!!!!!!</p>
					<Divider />
					<Map style={{ height: '350px' }} />
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
					<Calender validRange={validRange} getDate={getDate} />
					<Divider />
					<PrimaryButton style={{ height: '2.5rem' }} onClick={reserve}>Reserve</PrimaryButton>
					<Divider />
					<div className={style.price}>
						<h2>Total</h2>
						<h2>￥ 100</h2>
					</div>
				</Col>
			</Row>
		</Col>
	)
}