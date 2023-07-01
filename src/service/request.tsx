import { TIMEOUT, BASEURL } from '@/constants'
import { getToken } from '@/utils'
import { notifyWarn } from '@/utils/modal'


//axios封装
import axios from 'axios'
const service = axios.create({
	baseURL: BASEURL,
	timeout: TIMEOUT,
})
service.interceptors.request.use(
	(config: any) => {
		config.headers['Authorization'] = getToken()
		return config
	},
	(err: any) => {
		console.log(err)
		notifyWarn('someThingError')
		return Promise.reject(err)
	}
)
service.interceptors.response.use(
	(res: any) => {
		return res.data
	},
	(err: any) => {
		console.log(err)
		notifyWarn('something error')
		return Promise.reject(err)
	}
)
export default {
	get(url: any, params = {}) {
		return service({
			method: 'get',
			url,
			params
		});
	},
	post(url: any, data = {}) {
		return service({
			method: 'post',
			url,
			data
		});
	},
	put(url: any, data = {}) {
		return service({
			method: 'put',
			url,
			data
		});
	},
	remove(url: any, data = {}) {
		return service({
			method: 'delete',
			url,
			data
		});
	}
};