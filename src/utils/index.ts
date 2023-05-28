import React from 'react'
import style from '../layouts/index'

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
	console.log(getRandom(0, colorList.length))
	return colorList[getRandom(0, colorList.length)]
	
}