import React from 'react'

import { useModel } from 'umi'
import { Space, Divider } from 'antd'
import { TextInput, PasswordInput, EmailInput } from '../Input'
import { PrimaryButton } from '../Button'
import style from './index.less'
import Login from '../Login'
export default (props: any) => {
	const { openModal } = useModel('globalModel')
	const toLogin = () => {
		openModal(<Login />)
	}
	return (
		<Space direction='vertical' style={{ width: '100%' }}>
			<h1 style={{ textAlign: 'center' }}>Register</h1>
			<Divider />
			<TextInput />
			<EmailInput />
			<PasswordInput />
			<PrimaryButton style={{ height: '50px' }} />
			<div className={style.des}>
				已经有账户？
				<b className={style.a} onClick={toLogin}>去登陆</b>
			</div>
		</Space>
	)
}