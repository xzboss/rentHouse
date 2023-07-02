import React, { useEffect, useState, useMemo } from 'react'

import { useModel } from 'umi'
import { Space } from 'antd'
import { TextInput, PasswordInput, EmailInput } from '../Input'
import { PrimaryButton } from '../Button'
import style from './index.less'
import Login from '../Login'
import { notifySuccess, notifyWarn } from '@/utils/modal'
import { CODE } from '@/constants'
import LoadingAnimation from '@/components/LoadingAnimation'
import { incrementUser } from '@/service/api'
export default (props: any) => {
	const {
		openModal,
		disabled,
		setDisabled,
		isLoading,
		setIsLoading } = useModel('globalModel')

	const toLogin = () => {
		openModal(<Login />)
	}
	const [inputValid, setInputValid] = useState<boolean[]>([false, false, false])
	const formData = useMemo<Record<string, any>>(() => ({}), [])
	//收集所有输入框是否合法及内容
	const valid = (verifyed: boolean, content: string, idx: number) => {
		formData[idx] = content
		inputValid[idx] = verifyed
		setInputValid([...inputValid])
	}
	useEffect(() => {
		setDisabled(inputValid.every(item => item))
		return () => {
			setDisabled(false)
		}
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
			<h1 style={{ textAlign: 'center' }}>Sing up</h1>
			<TextInput
				onchange={(verifyed: boolean, content: string) => valid(verifyed, content, 0)}
				reg={/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/}
				tip='Beginning of the letter, 5~16 characters and  _' />
			<EmailInput
				onchange={(verifyed: boolean, content: string) => valid(verifyed, content, 1)}
				reg={/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}
				tip='Please enter a valid email address' />
			<PasswordInput
				onchange={(verifyed: boolean, content: string) => valid(verifyed, content, 2)}
				reg={/^\w{5,17}$/}
				tip='6~18 characters,only letters,numbers and  _' />
			<PrimaryButton
				style={{ height: '50px' }}
				disabled={!disabled}
				onClick={register} >
				{isLoading ? <LoadingAnimation /> : 'Register'}
			</PrimaryButton>
			<div className={style.des}>
				Already have an account?&nbsp;
				<b className={style.a} onClick={toLogin}>to sing in</b>
			</div>
		</Space>
	)
}