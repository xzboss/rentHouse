import React, { ReactNode, useEffect } from 'react'
import { useState, useCallback } from 'react'
import { Modal, message } from 'antd'
import LoadingAnimation from '@/components/LoadingAnimation'
export default function userModel() {
	//防重复提交
	const [disabled, setDisabled] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	//弹窗
	const [modal, contextHolder] = Modal.useModal()
	const openModal = (node: React.ReactNode) => {
		Modal.destroyAll()
		modal.info({
			content: node,
			footer: null,
			closable: true,
			icon: null,
			width: '80vmin',
			centered: true
		})
	}
	const closeModal = () => {
		Modal.destroyAll()
	}
	const loadingModel = (description: string = 'do you want to know ?') => {
		const content = <LoadingAnimation />
		message.open({
			content: content,
			duration: 5
		})
	}
	const closeLoadingModel = () => {
		message.destroy()
	}
	isLoading ? loadingModel() : closeLoadingModel()
	return {
		openModal,
		contextHolder,
		closeModal,
		disabled,
		setDisabled,
		isLoading,
		setIsLoading,
	}
}

