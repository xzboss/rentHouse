import { notification } from 'antd'
export const notifySuccess = (description: string = 'do you want to know ?') => {
	notification.open({
		message: undefined,
		description,
		placement:'topLeft',
		style: {
			color: '#14d05b'
		}
	})
}
export const notifyWarn = (description: string = 'do you want to know ?') => {
	notification.open({
		message: undefined,
		placement:'topLeft',
		style: {
			color: '#ef551e'
		},
		description: description ?? 'someThingError'
	})
}