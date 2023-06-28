import { useMemo } from 'react'
import { Link, Outlet, useModel } from 'umi'
import { Modal } from 'antd'
import './index.less'
import Header from '@/components/Header'
import { TxtButton } from '@/components/Button'
import Bg from '@/components/Bg'
export default function Layout() {
  const { isLogin } = useModel('userModel')
  const { contextHolder } = useModel('globalModel')
  const BgMemo = useMemo(() => <Bg />, [])
  return (
    <div className='container'>
      {BgMemo}
      <Header></Header>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 8vw' }}>
        <Outlet />
      </div>
      {contextHolder}
    </div>
  );
}
