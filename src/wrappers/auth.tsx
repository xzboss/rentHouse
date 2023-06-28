import { notifyWarn } from '@/utils/modal'
import { Navigate, Outlet, useModel } from 'umi'
export default (props: any) => {
	const { isLogin } = useModel('userModel')
	if (isLogin) {
		return <Outlet />
	} else {
		notifyWarn('please login')
		return <Navigate to={'/'} />
	}
}