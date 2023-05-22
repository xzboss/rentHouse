import React from 'react'
import { useModel } from 'umi'
import { Space, Modal } from 'antd'
import { TextInput, PasswordInput } from '../Input'
import { PrimaryButton } from '../Button'
import style from './index.less'
import Register from '../Register'

export default (props: any) => {
	const { openModal } = useModel('globalModel')
	const { isLogin, setIsLogin } = useModel('userModel')
	/**
	 * 跳转至注册
	 */
	const toRegister = () => {
		openModal(<Register />)
	}
	/**
	 * 登录
	 */
	const login = () => {
		console.log(isLogin)

		//判断条件
		if (1) {
			//改变登录状态
			setIsLogin(true)

		}

	}
	return (
		<Space direction='vertical' style={{ width: '100%' }}>
			<h1 style={{ textAlign: 'center' }}>Login</h1>
			<TextInput />
			<PasswordInput />
			<PrimaryButton style={{ height: '50px' }} onClick={login} />
			<div className={style.des}>
				还没有账户？
				<b className={style.a} onClick={toRegister}>创建账户</b>
			</div>
		</Space>
	)
}