import React from 'react'
import { useState, useCallback } from 'react'
import dayjs from 'dayjs'
export default function userModel() {
	const [data, setData] = useState({
		label: '亚洲-中国',
		dateRange: [dayjs(), dayjs().add(10, 'd')],
		category: '沙滩',
		bathRoomCount: 1,
		guestCount: 1,
		roomCount: 1
	})

	return { data, setData }
}

