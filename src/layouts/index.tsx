import { useMemo } from 'react'
import { Outlet, useModel, history, useLocation } from 'umi'
import { HomeOutlined } from '@ant-design/icons'

import './index.less'
import Header from '@/components/Header'
import Bg from '@/components/Bg'
export default function Layout() {
  const { contextHolder } = useModel('globalModel')
  const BgMemo = useMemo(() => <Bg />, [])
  const location = useLocation()
  const handleClick = () => {
    if (location.pathname === '/all') return
    history.push('/')
  }
  return (
    <div className='container'>
      {BgMemo}
      <Header></Header>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 8vw' }}>
        <Outlet />
      </div>
      {contextHolder}
      <div className='floatBtn'
        onClick={handleClick}>
        <HomeOutlined />
      </div>
    </div>
  );
}
