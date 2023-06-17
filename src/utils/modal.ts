import { notification } from 'antd'
export const notifySuccess = (description: string = 'do you want to know ?') => {
	notification.open({
		message: undefined,
		description,
		style: {
			color: '#14d05b'
		}
	})
}
export const notifyWarn = (description: string = 'do you want to know ?') => {
	notification.open({
		message: undefined,
		style: {
			color: '#ef551e'
		},
		description
	})
}