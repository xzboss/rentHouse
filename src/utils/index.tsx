import React from 'react'
import { useModel } from 'umi'
import style from '../layouts/index'
import type { Dayjs } from 'dayjs'
import { MehFilled } from '@ant-design/icons'
import Login from '@/components/Login'

/**
 * 
 * @param start >=起始
 * @param end <结束
 * @param isFloat 是否返回浮点数
 * @returns 
 */
export const getRandom = (start: number, end: number, isFloat: boolean = false): number => {
	let origin = Math.random() * (end - start) + start
	if (isFloat) return origin
	return Math.floor(origin)
}

//
export const getColor = (): string => {

	const colorList = [
		'#14d05b',
		'#79E0EE',
		'#98EECC',
		'#D0F5BE',
		'#FBFFDC',
		'#b1bed5',
		'#bfd8d5',
		'#dfdfdf',
		'#f4f3f3',
		'#9de6e8',
		'#73b9d7',
		'#ffd79a',
		'#fffac0',
		'#70a1d7',
		'#a1de93',
		'#f47c7c',
	]
	return colorList[getRandom(0, colorList.length)]

}

/**
 * 比较两个日期是否相同，因为在使用day.isSame()时有bug
 * @param day 
 * @param day2 
 * @returns 
 */
export const dayIsSame = (day: Dayjs | null, day2: Dayjs | null): boolean => {
	if (!day && !day2) return false
	return day!.format('YYYY-MM-DD') === day2!.format('YYYY-MM-DD')
}

/**
 * 判断对象有字段为空
 * @param obj 
 * @returns 
 */
export const objectEmptyOne = (obj: Record<string, any>) => {
	return Object.values(obj).some(value => value === null || value === '');
}

/**
 * 设置token
 * @param token 
 */
export const setToken = (token: string) => {
	localStorage.setItem('xz_token', 'Bearer ' + token)
}
/**
 * 获取token
 * @param token 
 */
export const getToken = (tokenKey: string | undefined = undefined) => {
	if (!tokenKey) return localStorage.getItem('xz_token')
	return localStorage.getItem(tokenKey)
}


export const debounce = (fn: Function, delay: number) => {
	let timer: any = null
	return function () {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(undefined, arguments)
		}, delay)
	}
}

export const throttle = (fn: Function, delay: number) => {
	let now = new Date().getTime()
	return function () {
		const curr = new Date().getTime()
		if (curr - now >= delay) {
			fn.apply(undefined, arguments)
			now = curr
		}
	}
}