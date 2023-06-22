import React, { useEffect, useState, useMemo } from 'react'

import { useModel } from 'umi'
import { Space, Divider } from 'antd'
import { TextInput, PasswordInput, EmailInput } from '../Input'
import { PrimaryButton } from '../Button'
import style from './index.less'
import Login from '../Login'
import { debounce, throttle } from '@/utils'
import { notifySuccess, notifyWarn } from '@/utils/modal'
import { TIMEOUT, CODE } from '@/constants'
import LoadingAnimation from '@/components/LoadingAnimation'
import { incrementUser } from '@/service/api'
export default (props: any) => {
	const { openModal } = useModel('globalModel')
	const toLogin = () => {
		openModal(<Login />)
	}
	const [disabled, setDisabled] = useState<boolean>(false)
	const [inputValid, setInputValid] = useState<boolean[]>([false, false, false])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const formData = useMemo<Record<string, any>>(() => ({}), [])
	//收集所有输入框是否合法及内容
	const valid = (verifyed: boolean, content: string, idx: number) => {
		formData[idx] = content
		inputValid[idx] = verifyed
		setInputValid([...inputValid])
	}
	useEffect(() => {
		setDisabled(inputValid.every(item => item))
	}, [inputValid])

	/**
	 * register
	 */
	const register = async () => {
		setIsLoading(true)
		setDisabled(false)
		const res = await incrementUser({
			name: formData[0],
			email: formData[1],
			password: formData[2]
		})
		if (res.code === CODE.CONFLICT) {
			notifyWarn(res.message)
		} else if (res.code === CODE.SUCCESS) {
			notifySuccess(res.message)
		}
		setDisabled(true)
		setIsLoading(false)
	}

	return (
		<Space direction='vertical' style={{ width: '100%' }}>
			<h1 style={{ textAlign: 'center' }}>Register</h1>
			<TextInput
				onchange={(verifyed: boolean, content: string) => valid(verifyed, content, 0)}
				reg={/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/}
				tip='字母开头-5~16位-字母数字下划线' />
			<EmailInput
				onchange={(verifyed: boolean, content: string) => valid(verifyed, content, 1)}
				reg={/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}
				tip='请输入有效邮箱' />
			<PasswordInput
				onchange={(verifyed: boolean, content: string) => valid(verifyed, content, 2)}
				reg={/^[a-zA-Z]\w{5,17}$/}
				tip='字母开头-6~18位-只能包含字母、数字和下划线' />
			<PrimaryButton
				style={{ height: '50px' }}
				disabled={!disabled}
				onClick={register} >
				{isLoading ? <LoadingAnimation /> : 'Register'}
			</PrimaryButton>
			<div className={style.des}>
				已经有账户？
				<b className={style.a} onClick={toLogin}>去登陆</b>
			</div>
		</Space>
	)
}