import { Link, Outlet, useModel } from 'umi'
import { Modal } from 'antd'
import './index.less'
import Header from '@/components/Header'
import { TxtButton } from '@/components/Button'
export default function Layout() {
  const { isLogin } = useModel('userModel')
  const { contextHolder } = useModel('globalModel')
  return (
    <div className='navs'>
      <Header></Header>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </div>
      {contextHolder}
    </div>
  );
}
