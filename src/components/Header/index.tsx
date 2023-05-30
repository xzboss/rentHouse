import React, { Fragment, useEffect } from 'react'
import { Link, useModel, useNavigate, useParams } from 'umi'
import type, {
	Row,
	Col,
	Dropdown,
	MenuProps,
	Divider,
	Space,
	Button,
	Modal
} from 'antd'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import './index.less'
import Logo from '@/assets/logo.png'
import Condition from './Condition'
import Login from '../Login'
import Register from '../Register'
import { TxtButton } from '../Button'
import Nav from './Nav'
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
		setIsLogin(false)
	}



	//动态路由菜单
	let items: MenuProps['items']
	if (isLogin) {
		items = [
			{ key: 'myFavorites', label: <Link type='text' to='/myFavorites'>我的喜欢</Link> },
			{ key: 'myProperties', label: <Link to='/myProperties'>我的房子</Link> },
			{ key: 'myReservations', label: <Link to='/myReservations'>我的预定</Link> },
			{ key: 'myTrips', label: <Link to='/myTrips'>我的旅行</Link> },
			{ key: 'loginOut', label: <TxtButton onClick={loginOut}>Login OUT</TxtButton> }
		]
	} else {
		items = [
			{ key: 'login', label: <TxtButton onClick={() => handleClick(<Login />)}>登录</TxtButton> },
			{ key: 'register', label: <TxtButton onClick={() => handleClick(<Register />)}>注册</TxtButton> }
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
			<Dropdown menu={{ items }}>
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
	const handleClick = () => {
		navigate('/')
	}
	//房屋类型
	const params = useParams()
	console.log(params.type)
	const screen = {
		xs: 0, sm: 0, md: 0, lg: 6, xl: 6, xxl: 6
	}
	const screen2 = {
		xs: 18, sm: 18, md: 18, lg: 12, xl: 12, xxl: 12
	}
	const screen3 = {
		xs:6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6
	}
	return (
		<div className='head'>
			<Row justify='space-between' align='middle' gutter={20} wrap={false}>
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
			<Row>
				<Nav></Nav>
			</Row>
		</div>
	)
}
