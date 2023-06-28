import React from 'react'
import { useState, useCallback } from 'react'
import { Modal } from 'antd'
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
	return {
		openModal, contextHolder, closeModal,
		disabled, setDisabled, isLoading, setIsLoading
	}
}

