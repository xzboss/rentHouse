//保存登陆状态及当前用户信息
import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { verifyToken } from '@/service/api'
interface userDetailProps {
	name?: string
	email?: string
	emailVerify?: Date
	image?: string
	createdAt?: Date
	updateAt?: Date
	favoriteIds?: string[]
	listings?: string[]
	accounts?: string[]
	reservations?: string[]
	[key: string]: any
}
export default function userModel() {
	const [isLogin, setIsLogin] = useState(false)
	const [userDetail, setUserDetail] = useState<userDetailProps>()
	useEffect(() => {
		(async () => {
			const haveToken = !!localStorage.getItem('xz_token')
			if (!haveToken) return
			const res = await verifyToken()
			console.log(res)
			if (res.code !== 401) {
				setUserDetail(res)
				setIsLogin(true)
			}
		})()
	}, [])
	return { isLogin, setIsLogin, userDetail }
}
