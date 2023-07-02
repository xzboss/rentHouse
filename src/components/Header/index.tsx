import React from 'react'
import { Link, useModel, useNavigate, useParams, history } from 'umi'
import type, {
	Row,
	Col,
	Dropdown,
	MenuProps,
	Divider,
	Space
} from 'antd'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import './index.less'
import Logo from '@/assets/logo.png'
import Condition from './Condition'
import Login from '../Login'
import Register from '../Register'
import { TxtButton } from '../Button'
import Nav from './Nav'
import { removeToken } from '@/utils'
import Property from '@/components/Property'
import style from './index.less'
//个人信息路由导航
function Menu() {
	const { isLogin, setIsLogin } = useModel('userModel')
	const { openModal } = useModel('globalModel')

	/**
	 * @callback
	 * 用于打开对话框
	 */
	const handleClick = (action: React.ReactNode) => {
		openModal(action)
	}

	/**
	 * 登出
	 */
	const loginOut = () => {
		removeToken()
		setIsLogin(false)
		location.reload()
	}


	//add listing
	const handleIncrementListing = () => {
		openModal(<Property />)
	}


	//动态路由菜单
	let items: MenuProps['items']
	if (isLogin) {
		items = [
			{ key: 'myTrips', label: <Link className='a' to='/myTrips'>MyTrip</Link> },
			{ key: 'myFavorites', label: <Link className='a' to='/myFavorites'>My Favorite</Link> },
			{ key: 'myProperties', label: <Link className='a' to='/myProperties'>My Property</Link> },
			{ key: 'myReservations', label: <Link className='a' to='/myReservations'>my Reservation</Link> },
			{ key: 'addListing', label: <TxtButton onClick={handleIncrementListing}>Publish Home</TxtButton> },
			{ key: 'loginOut', label: <TxtButton onClick={loginOut}>Sing out</TxtButton> }
		]
	} else {
		items = [
			{ key: 'login', label: <TxtButton onClick={() => handleClick(<Login />)}>Sign in</TxtButton> },
			{ key: 'register', label: <TxtButton onClick={() => handleClick(<Register />)}>Sign up</TxtButton> }
		]
	}

	const screen = {
		xs: 0, sm: 0, md: 0, lg: 16, xl: 16, xxl: 16
	}
	return (
		<div className='menu'>
			<Col {...screen}>
				<span className='menu-des'>MENU</span>
			</Col>
			<Dropdown
				menu={{ items }}
				placement="bottomCenter">
				<a onClick={(e) => e.preventDefault()} className='btns'>
					<div className='btn'>
						<Space>
							<MenuOutlined />
							<UserOutlined />
						</Space>
					</div>
				</a>
			</Dropdown>
		</div>

	)
}

export default function Header() {
	const navigate = useNavigate()
	const { dataDefault, setData } = useModel('searchModel')
	const handleClick = () => {
		setData(dataDefault)
		navigate('/')
	}
	//房屋类型
	const { type } = useParams()
	let isNav = true
	if (!type) {
		isNav = false
	}
	const screen = {
		xs: 0, sm: 0, md: 0, lg: 6, xl: 6, xxl: 6
	}
	const screen2 = {
		xs: 18, sm: 18, md: 18, lg: 12, xl: 12, xxl: 12
	}
	const screen3 = {
		xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6
	}
	return (
		<div className='head'>
			<Row style={{ paddingBottom: 10 }} justify='space-between' align='middle' gutter={20} wrap={false}>
				<Col {...screen}>
					<img src={Logo} alt="logo" onClick={handleClick} />
				</Col>
				<Col {...screen2}>
					<Condition />
				</Col>
				<Col {...screen3}>
					<Menu />
				</Col>
			</Row>
			<Row style={{ display: isNav ? 'block' : 'none' }}>
				<Divider style={{ margin: 0 }} />
				<Nav></Nav>
			</Row>
		</div>
	)
}
