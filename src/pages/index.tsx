import React, { useEffect, useMemo, useState } from 'react'
import Container from '@/components/Container'
import { useModel, useParams } from 'umi'
import { findListing, getAllListing } from '@/service/api'
import { listingProps } from '@/types'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Property from '@/components/Property'
export default function HomePage() {
  const params = useParams()
  const [listings, setListings] = useState<listingProps[]>()
  //精确搜索条件
  let { data: searchQuery } = useModel('searchModel')
  useEffect(() => {
    ((async () => {
      if (searchQuery.locationValue === 'any-where') searchQuery.locationValue = undefined
      if (params.type === 'all') {
        const res = await getAllListing({ ...searchQuery })
        setListings(res.data)
        return
      } else {
        const res = await findListing({ ...searchQuery, category: params.type })
        setListings(res.data)
      }
    }))()
  }, [params])
  return (
    <div className='box' style={{ width: '100%' }}>
      <Container listings={listings} />
    </div>
  );
}
