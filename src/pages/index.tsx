import React, { useEffect, useMemo, useState } from 'react'
import Container from '@/components/Container'
import { useModel, useParams, useSearchParams, useNavigate } from 'umi'
import { findListing, getAllListing, getOAuthConfig } from '@/service/api'
import { listingProps } from '@/types'
import { setToken } from '@/utils'

export default function HomePage() {
  const params = useParams()
  const navigate = useNavigate()
  const [search, _] = useSearchParams()
  if (search.get('token')) {
    //如果是第三方登录重定向
    setToken(search.get('token') as string)
    // location.reload()
    window.location.href = window.location.origin
    console.log(location)

  }

  const [listings, setListings] = useState<listingProps[]>()
  //精确搜索条件
  let { data: searchQuery } = useModel('searchModel')
  const { OAuthConfig, setOAuthConfig
  } = useModel('globalModel')
  useEffect(() => {
    (async () => {
      if (searchQuery.locationValue === 'any-where') searchQuery.locationValue = undefined
      if (params.type === 'all') {
        const res = await getAllListing({ ...searchQuery })
        setListings(res.data)
        return
      } else {
        const res = await findListing({ ...searchQuery, category: params.type })
        setListings(res.data)
      }
    })()
  }, [params])
  // 获取第三方需要权限信息
  useEffect(() => {
    (async () => {
      const { data } = await getOAuthConfig()
      setOAuthConfig(data)
    })()
  }, [])
  return (
    <div className='box' style={{ width: '100%' }}>
      <Container listings={listings} />
    </div>
  );
}
