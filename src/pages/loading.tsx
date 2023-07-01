import React from 'react'
import LoadingAnimation from '@/components/LoadingAnimation'
export default (props: any) => {
	return (
		<div style={{
			display: 'flex',
			alignContent: 'center',
			justifyContent: 'center'
		}}>
			<LoadingAnimation />
		</div>
	)
}