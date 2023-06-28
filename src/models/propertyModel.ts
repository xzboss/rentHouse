import React from 'react'
import { useState, useCallback } from 'react'
import { useModel } from 'umi'
import { listingProps } from '@/types'
export default function propertyModel() {
	const propertyDefault = {
		title: undefined,
		description: undefined,
		imageSrc: undefined,
		img: undefined,
		category: undefined,
		roomCount: 1,
		bathroomCount: 1,
		guestCount: 1,
		latlng: [20, 20],
		userId: undefined,
		price: undefined,
		validRange: undefined,
		locationValue: undefined
	}
	//财产信息
	const [property, setProperty] = useState<listingProps>(propertyDefault)
	const [step, setStep] = useState(0)

	return {
		property,
		setProperty,
		step,
		setStep
	}
}

