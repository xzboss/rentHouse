import React, { useState } from 'react'
import { Image, Divider, Space, Row, Col } from 'antd'
import { PrimaryButton, HeartButton } from '@/components/Button'
import '@/assets/icon/iconfont.css'
import style from './index.less'
import Map from '@/components/Map'
import Calender from '@/components/Calendar'
export default (props: any) => {
	const screen = {
		xs: 24, sm: 24, md: 24, lg: 24, xl: 20, xxl: 20
	}
	const [blur, setBlur] = useState(0)
	return (
		<Col {...screen}>
			<h1>title</h1>
			<p className=''>亚洲，中国</p>
			<div className={style.img}>
				<HeartButton onClick={() => { setBlur(blur ? 0 : 1) }} blur={blur} style={{ right: '5%', top: '5%' }} />
				<Image style={{ borderRadius: '15px' }}
					onError={() => { }}
					width={'100%'}
					height={400}
					preview={false}
					src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
				/>
			</div>
			<Row justify='space-between' style={{ marginBottom: '50px' }}>
				<Col span={12}>
					<div className={style.space}>
						<h2>
							发布者{'xz'} :
						</h2>
						<Image style={{ borderRadius: '50%' }}
							onError={() => { }}
							width={30}
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
					<Map />
				</Col>
				<Col className={style.leftBox} span={10} style={{ borderRadius: '15px', height: 'fit-content',overflow:'auto' }}>
					<Space align='center'>
						<h1 style={{ display: 'inline-block' }}>￥{100}</h1>
						<span>night</span>
					</Space>
					<Divider />
					<Calender />
					<Divider />
					<PrimaryButton style={{ height: '2.5rem' }}>Reserve</PrimaryButton>
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