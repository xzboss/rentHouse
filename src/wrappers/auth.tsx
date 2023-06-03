import { Navigate, Outlet, useModel } from 'umi'
export default (props: any) => {
	const { isLogin } = useModel('userModel')
	if (isLogin) {
		return <Outlet />
	} else {
		return <Navigate to={'/'} />
	}
}