//定义axios返回类型
//解决返回AxiosResponse<any, any>
declare module 'axios' {
	interface IAxios<D = null> {
		data?: any
		message?: string
		code: number | string
		[key: string]: any
	}
	export interface AxiosResponse<T = any> extends IAxios<D> { }
	export default axios
}