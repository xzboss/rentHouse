import React, { useEffect, useState } from 'react'
import { useModel, history, useLocation } from 'umi'
import { Space, Modal } from 'antd'
import { TextInput, PasswordInput, EmailInput } from '../Input'
import { PrimaryButton } from '../Button'
import style from './index.less'
import Register from '../Register'
import { objectEmptyOne, setToken } from '@/utils'
import { login } from '@/service/api'
import { CODE } from '@/constants'
import { notifySuccess, notifyWarn } from '@/utils/modal'
import LoadingAnimation from '@/components/LoadingAnimation'

export default (props: any) => {
	const {
		openModal,
		closeModal,
		disabled,
		setDisabled,
		isLoading,
		setIsLoading } = useModel('globalModel')
	const { isLogin, setIsLogin, userDetail, setUserDetail } = useModel('userModel')
	const [data, setData] = useState<Record<string, any>>({ email: '', password: '' })
	const { pathname, state } = useLocation()

	const toRegister = () => {
		openModal(<Register />)
	}


	/**
	 * login
	 */
	const loginHandler = async () => {
		setIsLoading(true)
		setDisabled(false)
		const res = await login(data)
		if (res.code === CODE.SUCCESS) {
			closeModal()
			notifySuccess(res.message)
			setToken(res.data.token)
			setIsLogin(true)
			setUserDetail(res.data.userDetail)
			history.push(pathname, state)
		}
		if (res.code === CODE.UNAUTHENTICATED) {
			notifyWarn(res.message)
		}
		setDisabled(true)
		setIsLoading(false)
	}

	const changeHandler = (content: string, key: string) => {
		data[key] = content
		setData({ ...data })
	}
	useEffect(() => {
		if (objectEmptyOne(data)) return setDisabled(false)
		setDisabled(true)
		return () => {
			setDisabled(false)
		}
	}, [data])

	return (
		<Space direction='vertical' style={{ width: '100%' }}>
			<h1 style={{ textAlign: 'center' }}>Login</h1>
			<EmailInput onchange={(content: string) => changeHandler(content, 'email')} />
			<PasswordInput onchange={(content: string) => changeHandler(content, 'password')} />
			<PrimaryButton
				style={{ height: '50px' }}
				onClick={loginHandler}
				disabled={!disabled}>
				{isLoading ? <LoadingAnimation /> : 'Login'}
			</PrimaryButton>
			<div className={style.des}>
				还没有账户？
				<b className={style.a} onClick={toRegister}>创建账户</b>
			</div>
		</Space>
	)
}