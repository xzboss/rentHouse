import React from 'react'
import { useState, useCallback } from 'react'
import dayjs from 'dayjs'

interface searchProps {
	title?: string
	dateRange?: Date[]
	category?: string
	bathRoomCount?: number
	guestCount?: number
	roomCount?: number
}
export default function userModel() {
	const dataDefault = {
		bathRoomCount: 1,
		guestCount: 1,
		roomCount: 1,
		dateRange: [dayjs().toDate(), dayjs().add(1, 'd').toDate()]
	}
	//搜索条件
	const [data, setData] = useState<searchProps>({ ...dataDefault })
	//保存当前步骤
	const [step, setStep] = useState<number>(0)
	return { dataDefault, data, setData, step, setStep }
}

