import React, { useEffect, useMemo, useState } from 'react'
import Container from '@/components/Container'
import { useModel, useParams } from 'umi'
import { findListing, getAllListing } from '@/service/api'
import { listingProps } from '@/types'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
export default function HomePage() {
  const params = useParams()
  const [listings, setListings] = useState<listingProps[]>()
  //精确搜索条件
  let { data: searchQuery } = useModel('searchModel')
  useEffect(() => {
    if (params.type === 'all') {
      ((async () => {
        const res = await getAllListing({ ...searchQuery })
        setListings(res)
      }))()
      return
    }
    ((async () => {
      const res = await findListing({ ...searchQuery, category: params.type })
      setListings(res)
    }))()
  }, [params])
  return (
    <div className='box' style={{ width: '100%' }}>
      <Container listings={listings} />
    </div>
  );
}
