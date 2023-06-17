import React, { useEffect, useState } from 'react'
import style from './index.less'
import '@/assets/icon/iconfont.css'

interface FCProps {
	reg?: RegExp | undefined
	tip?: string | undefined
	[key: string]: any
}
const FC: React.FC<FCProps> = (props) => {
	let {
		type,
		label,
		reg = undefined,
		tip = undefined,
		onchange = () => { } } = props
	const isShow = reg && tip
	const [verifyed, setVerifyed] = useState<boolean>(false)
	const verify = (content: string | undefined, reg: RegExp | undefined, tip: string | undefined) => {
		if (isShow) {
			const tmp = reg!.test(content!)
			setVerifyed(tmp)
			onchange(tmp, content)
		} else {
			onchange(content)
		}
	}

	return (
		<div className={style.box}>
			<input type={type}
				placeholder=' '
				onChange={e => verify(e.currentTarget.value, reg, tip)} />
			<label>{label}</label>
			{isShow && <i className={'iconfont ' + (verifyed ? 'icon-zhengque1' : 'icon-fork')}></i>}
			{isShow && <span className={verifyed ? style.green : style.red}>{tip}</span>}
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