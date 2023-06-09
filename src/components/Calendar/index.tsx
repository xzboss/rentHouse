import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Calendar, Select } from 'antd'
import { SwapRightOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayLocaleData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'
import style from './index.less'
import { dayIsSame } from '@/utils'
//使用插件
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(dayLocaleData)

interface CalendarProps {
	getDate?: (startDay: Dayjs, endDate: Dayjs) => void
	validRange?: [Dayjs, Dayjs]//允许选择范围
	dateRange?: [Dayjs, Dayjs] | undefined//默认选中
	style?: { [p: string]: any }
	className?: string
	reservedRange?: [Dayjs, Dayjs][] | undefined
}
const calender: React.FC<CalendarProps> = (props) => {
	const dayNow = dayjs()
	let startDay: Dayjs | null = props.dateRange?.[0] || dayNow
	let endDay: Dayjs | null = props.dateRange?.[1] || dayNow

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
		day = day.hour(13)
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
			//选择是否也包含了已被预定时间
			props.reservedRange?.map(item => {
				const [reservedStart, reservedEnd] = [dayjs(item[0]), dayjs(item[1])]
				const isValid = reservedStart.isBetween(startDay, endDay) && reservedEnd.isBetween(startDay, endDay)
				//如果选择时间横跨已被预定区间
				if (isValid) startDay = endDay = day
			})
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

		props.getDate?.(startDay!, endDay ?? startDay!)
	}


	/**
	 * 自定义单元格内容
	 */
	const fullCellRender = (current: Dayjs) => {
		//由于antd组件自动传入的dayjs实例无法使用插件，所以克隆一下
		current = dayjs(current).hour(13)


		let date = current.get('date')
		if (panelChangeByPanel) {
			return <i>{date}</i>
		}

		//今日前的不能选了
		if (current.isBefore(dayjs().hour(13))) {
			return (<i className={style.disabled}
				style={{
					backgroundColor: 'rgba(0,0,0,0.04)',
					color: 'rgba(0,0,0,0.25)'
				}}>{date}</i>)
		}

		//判断此日是否已被预定
		for (const item of props.reservedRange ?? []) {
			const [reservedStart, reservedEnd] = [dayjs(item[0]), dayjs(item[1])]
			const isBetween = current.isBetween(reservedStart, reservedEnd)
			//已预定
			if (isBetween) {
				return (<i className={style.disabled}
					style={{
						backgroundColor: 'rgba(0,0,0,0.04)',
						color: 'rgba(0,0,0,0.25)'
					}}>{date}</i>)
			}
		}
		if (mode === 'year') date = current.month() + 1
		//如果只有一天被选中
		if (dayIsSame(current, startDay) && (endDay === null || dayIsSame(endDay, startDay)))
			return <i className={style.only}>{date}</i>

		//如果两天被选中
		if (startDay && endDay) {
			//isSame有bug,改用current.format()===startDay.format()
			//console.log(current.format('YYYY-MM-DD') ===startDay.format('YYYY-MM-DD'))

			//第一天样式
			if (dayIsSame(current, startDay)) return <i className={style.first}>{date}</i>

			//最后天样式
			if (dayIsSame(current, endDay)) return <i className={style.last}>{date}</i>

			//中间日期样式
			if (current.isBetween(startDay, endDay)) return <i className={style.focus}>{date}</i>

		}
		//鼠标移入样式
		if (current.isBetween(props.validRange?.[0] || dayNow, props.validRange?.[1] || dayNow)) {
			return <i>{date}</i>
		}
		//不可选中样式
		return <i className={style.disabled}>{date}</i>
	}

	return (
		<Calendar
			style={{ ...props.style ?? null }}
			fullscreen={false}
			className={`${style.calendar} ${props.className}`}
			validRange={props.validRange || [dayNow.subtract(10, 'y'), dayNow.add(10, 'y')]}
			onChange={onChange}
			onSelect={onSelect}
			fullCellRender={fullCellRender}
			onPanelChange={onPanelChange}
			headerRender={({ onChange }) => {
				const format = 'DD , MMM , YYYY'
				const startDate = startDay?.format(format) || dayNow.format(format)
				const endDate = endDay?.format(format) || startDate
				const validRange = props.validRange ?? [dayNow, dayNow]
				const yDiff = validRange[1].diff(validRange[0], 'y')
				const mDiff = validRange[1].diff(validRange[0], 'M')
				const startYear = validRange[0].year()
				const endYear = validRange[1].year()
				const startMonth = validRange[0].month() + 1
				const endMonth = startYear === endYear ? validRange[1].month() + 1 : 12
				let [currentYear, setCurrentYear] = useState(startYear)
				let [currentMonth, setCurrentMonth] = useState(startMonth)


				//所有年各自月份选项集合
				let options: { [year: string]: Array<any> } = {}

				//当前年的所有月份
				options[startYear] = []
				for (let j = startMonth; j <= endMonth; j++) {
					options[startYear].push(
						<Select.Option key={j}>{j}</Select.Option>
					)
				}
				//不足一年超出月份
				let mOver = startMonth + (mDiff % 12) - 12
				if (mOver > 0) {
					options[startYear + yDiff + 1] = []
					//结尾年的月份
					for (let i = 1; i <= mOver; i++) {
						options[startYear + yDiff + 1].push(
							<Select.Option key={i}>{i}</Select.Option>
						)
					}
				}
				//中间年都有12个月份
				if (yDiff > 1) {
					for (let i = 1; i < yDiff; i++) {
						options[startYear + i] = []
						for (let j = 1; j <= 12; j++) {
							options[startYear + i].push(
								<Select.Option key={j}>{j}</Select.Option>
							)
						}
					}
				}
				//所有年选项集合
				const yOptions = Object.keys(options).map((year) => {
					return <Select.Option key={year}>{year}</Select.Option>
				})

				//跳转
				const to = (e: any, type: string) => {
					if (type === 'y') {
						currentYear = e
						currentMonth = options[currentYear][0].key
					} else {
						currentMonth = e
					}
					//确定是由panel触发
					panelChangeByPanel = true
					onChange(dayjs(new Date(currentYear, currentMonth - 1, 15)))
					//重新加载header
					setCurrentMonth(currentMonth)
					setCurrentYear(currentYear)
				}

				return (
					<div>
						<div className={style.header}>
							<span>{startDate}</span>
							<SwapRightOutlined className={style.point} />
							<span>{endDate}</span>
						</div>
						<div className={style.selectBox}>
							<Select value={currentYear + ' Y'}
								style={{ width: 100 }}
								onChange={(e) => to(e, 'y')}
							>{yOptions}</Select>
							<span>-</span>
							<Select value={currentMonth + ' M'}
								style={{ width: 100 }}
								onChange={(e) => to(e, 'm')}>{options[currentYear]}</Select>
						</div>
					</div>
				)
			}}
		/>
	)
}
export default calender