import React, { Fragment, useEffect } from 'react'
import { Link, useModel, useNavigate } from 'umi'
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

	useEffect(() => { openModal(<Register />) }, [])

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


	return (
		<div className='menu'>
			<span className='d-1'>这里进入你的空间</span>
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
		navigate('/home')
	}
	return (
		<div className='head'>
			<Row justify='space-between' gutter={20}>
				<Col span={6}>
					<img src={Logo} alt="logo" onClick={handleClick} />
				</Col>
				<Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
					<Condition />
				</Col>
				<Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
					<Menu />
				</Col>
			</Row>
			<Divider />
		</div>
	)
}
