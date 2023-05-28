import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Calendar, Select } from 'antd'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
import { SwapRightOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayLocaleData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'
import style from './index.less'
//使用插件
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(dayLocaleData)

interface CalendarProps {
	getDate?: (startDay: Dayjs, endDate: Dayjs) => void,
	validRange?: [Dayjs, Dayjs]
	style?: { [p: string]: any }
	className?: string
}
const calender: React.FC<CalendarProps> = (props) => {

	const dayNow = dayjs()
	let startDay: Dayjs | null = dayNow
	let endDay: Dayjs | null = dayNow
	let mode = 'month'
	//panel切换是否由点击panel改变,因为由谁改变都会执行onSelect<-onChange<-onPanelChange
	let panelChangeByPanel = false

	/** 1
	 * 面板变化
	 */
	const onPanelChange = (day: Dayjs, type: string) => {
		mode = type
	}

	/** 2
	 * @callback
	 * 变化后回调
	 */
	const onChange = (day: Dayjs) => {
		if (panelChangeByPanel) {
			panelChangeByPanel = false
			return
		}
		//两个都已经选了，重置
		if (startDay && endDay) {
			startDay = day
			endDay = null
			return
		}
		//如果只选了一个
		if (startDay && endDay === null) {
			//判断前后
			if (startDay.isAfter(day)) {
				[endDay, startDay] = [startDay, day]

			} else {
				endDay = day
			}
			return
		}
		//否则就是两者都没选
		startDay = day
	}


	/** 3
	 * @callback
	 * 点击后回调
	 */
	const onSelect = () => {
		//传给父
		if (startDay && endDay && !startDay?.isSame(endDay)) {
			props.getDate?.(startDay!, endDay!)
		}
	}
	/**
	 * 自定义单元格内容
	 */
	const fullCellRender = (current: Dayjs) => {

		//由于antd组件自动传入的dayjs实例无法使用插件，所以克隆一下
		current = dayjs(current)
		let date = current.get('date')
		if (panelChangeByPanel) {
			return <i>{date}</i>
		}
		if (mode === 'year') date = current.month() + 1
		//如果只有一天被选中
		if (current.isSame(startDay) && (endDay === null || startDay?.isSame(endDay)))
			return <i className={style.only}>{date}</i>

		//如果两天被选中
		if (startDay && endDay) {
			//第一天样式
			if (current.isSame(startDay)) return <i className={style.first}>{date}</i>

			//最后天样式
			if (current.isSame(endDay)) return <i className={style.last}>{date}</i>

			//中间日期样式
			if (current.isBetween(startDay, endDay)) return <i className={style.focus}>{date}</i>

		}
		return <i>{date}</i>
	}


	return (
		<Calendar
			style={{ ...props.style ?? null }}
			fullscreen={false}
			className={`${style.calendar} ${props.className}`}
			validRange={props.validRange || [dayNow, dayNow.add(99, 'day')]}
			onChange={onChange}
			onSelect={onSelect}
			fullCellRender={fullCellRender}
			onPanelChange={onPanelChange}
			headerRender={({ onChange }) => {
				const format = 'YYYY 年 MM 月 DD 日'
				const startDate = startDay?.format(format) || dayNow.format(format)
				const endDate = endDay?.format(format) || startDate
				const validRange = props.validRange ?? [dayNow, dayNow]
				const yDiff = validRange[1].diff(validRange[0], 'y') + 1
				const mDiff = validRange[1].diff(validRange[0], 'M') + 2
				const startYear = validRange[0].year()
				const startMonth = validRange[0].month() + 1
				let currentYear = startYear
				let currentMonth = startMonth

				//得到年所有选项
				let yOptions = []
				for (let i = 0; i < yDiff; i++) {
					yOptions.push(
						<Select.Option key={startYear + i}>{startYear + i + ' 年'}</Select.Option>
					)
				}

				//得到月所有选项
				let mOptions = []
				for (let i = 0; i < mDiff + 2; i++) {
					if (i >= 12) break
					if (startYear + i > 12) {
						mOptions.unshift(
							<Select.Option key={12 - i}>{12 - i + ' 月'}</Select.Option>
						)
						continue
					}
					mOptions.push(
						<Select.Option key={startMonth + i}>{startMonth + i + ' 月'}</Select.Option>
					)
				}

				//跳转
				const to = (e: any, type: string) => {
					if (type === 'y') {
						currentYear = e
					} else {
						currentMonth = e
					}
					//确定是由panel触发
					panelChangeByPanel = true
					onChange(dayjs(new Date(currentYear, currentMonth, 15)))
				}
				return (
					<div>
						<div className={style.header}>
							<span>{startDate}</span>
							<SwapRightOutlined className={style.point} />
							<span>{endDate}</span>
						</div>
						<div className={style.selectBox}>
							<Select defaultValue={startYear + ' 年'}
								style={{ width: 100 }}
								onChange={(e) => to(e, 'y')}
							>{yOptions}</Select>
							<span>-</span>
							<Select defaultValue={startMonth + ' 月'}
								style={{ width: 100 }}
								onChange={(e) => to(e, 'm')}>{mOptions}</Select>
						</div>
					</div>
				)
			}}
		/>
	)
}
export default calender