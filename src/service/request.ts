//axios封装
import axios from 'axios'
const service = axios.create({
	baseURL: '',
	timeout: 5000,
})
service.interceptors.request.use(
	(config: any) => {
		config.headers['Authorization '] = localStorage.getItem('xz_token')
		return config
	},
	(err: any) => {
		console.log(err)
		return Promise.reject(err)
	}
)
service.interceptors.response.use(
	(res: any) => {
		return res.data
	},
	(err: any) => {
		console.log(err)
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