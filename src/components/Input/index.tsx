import React, { useEffect, useState } from 'react'
import style from './index.less'
import '@/assets/icon/iconfont.css'

interface FCProps {
	children?: any
	reg?: RegExp | undefined
	tip?: string | undefined
	[key: string]: any
}
const FC: React.FC<FCProps> = (props) => {
	let {
		type,
		children,
		label,
		reg = undefined,
		tip = undefined,
		onchange = () => { } } = props
	const isShow = reg || tip
	const [verifyed, setVerifyed] = useState<boolean>(false)
	const verify = (content: string | undefined, reg: RegExp | undefined, tip: string | undefined) => {
		//针对多种验证反馈
		if (reg && tip) {
			const tmp = reg!.test(content!)
			setVerifyed(tmp)
			onchange(tmp, content)
			return
		}
		//针对单种验证反馈
		if (reg || tip) {
			const tmp = reg!.test(content!)
			setVerifyed(tmp)
			onchange(content)
			return
		}
		onchange(content)
	}
	useEffect(() => {
		verify(children ?? '', reg, tip)
	}, [])

	return (
		<div className={style.box}>
			<input type={type}
				defaultValue={children}
				placeholder=' '
				onChange={e => verify(e.currentTarget.value, reg, tip)} />
			<label>{label}</label>
			{reg && <i className={'iconfont ' + (verifyed ? 'icon-zhengque1' : 'icon-fork')}></i>}
			{tip && <span className={verifyed ? style.green : style.red}>{tip}</span>}
		</div>
	)
}


export const TextInput: React.FC<FCProps> = (props) => {
	return <FC type='text' label='username' {...props} />
}
export const PasswordInput: React.FC<any> = (props) => {
	return <FC type='password' label='Password' {...props} />
}
export const EmailInput: React.FC<any> = (props) => {
	return <FC type='email' label='Email' {...props} />
}