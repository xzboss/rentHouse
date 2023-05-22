import React from 'react'
import style from './index.less'
export const TextInput: React.FC<any> = (props) => {
	return (
		<div className={style.box}>
			<input type="text" placeholder=' '/>
			<label>Username</label>
		</div>
	)
}
export const PasswordInput: React.FC<any> = (props) => {
	return (
		<div className={style.box}>
			<input type="password" placeholder=' '/>
			<label>Password</label>
		</div>
	)
}
export const EmailInput: React.FC<any> = (props) => {
	return (
		<div className={style.box}>
			<input type="email" placeholder=' '/>
			<label>Email</label>
		</div>
	)
}