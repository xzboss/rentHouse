import React, { useState, useCallback, useMemo } from 'react'
import { Calendar } from 'antd'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
import type { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjs from 'dayjs'
import style from './index.less'
//使用插件
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

console.log(dayjs().isBetween(dayjs(), dayjs()))


const calender: React.FC = () => {

	const dayNow = dayjs()
	let [startDay, setStartDay] = useState<Dayjs | null>(null)
	let [endDay, setEndDay] = useState<Dayjs | null>(null)

	/**
	 * @callback
	 * 选择后回调
	 */
	const onSelect = (day: Dayjs) => {
		//选择区间
		if (startDay && endDay == null) {
			setEndDay(day)
		} else {
			setStartDay(day)
		}
		//如果已经选择区间需要重置区间
		if (startDay && endDay) {
			setStartDay(day)
			setEndDay(null)
		}
		console.log(startDay, endDay)

	}


	/**
	 * 自定义单元格内容
	 */
	const fullCellRender = (current: Dayjs) => {
		//由于antd组件自动传入的dayjs实例无法使用插件，所以克隆一下
		current = dayjs(current)
		const date = current.get('date')
		//改变选中区域样式
		if (startDay && endDay) {
			console.log(1)

			if (current.isBetween(startDay, endDay)) {
				console.log(2)
				return <i className={style.focus}>{date}</i>
			}
		}
		//判断是否为选中区域
		if (current.isSame(startDay) || current.isSame(endDay)) {
			return <i className={style.focus}>{date}</i>
		} else {
			return <i>{date}</i>
		}
	}
	setTimeout(() => {
		const list = document.getElementsByClassName(`${style.focus}`)
		if (list.length > 1) {
			list[0]?.classList.add(`${style.first}`)
			list[list.length - 1]?.classList.add(`${style.last}`)
		} else {
			list[0]?.classList.add(`${style.only}`)
		}
	});

	return (
		<Calendar fullscreen={false}
			className={style.calendar}
			onPanelChange={() => { }}
			validRange={[dayNow.subtract(7, 'day'), dayNow.add(7, 'day')]}
			onSelect={onSelect}
			fullCellRender={fullCellRender}
		/>
	)
}
export default calender