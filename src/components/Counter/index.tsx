import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import style from './index.less'
interface Props {
	children?: [string, string] | ['', ''],
	num?: number,
	onChange?: (num: number) => void
}

const FC: React.FC<Props> = (props) => {
	const [count, setCount] = useState(props.num || 1)
	const increment = (e: any) => {
		e.stopPropagation()
		setCount(count + 1)
	}
	const decrement = (e: any) => {
		e.stopPropagation()
		if (count <= 1) return
		setCount(count - 1)
	}
	useEffect(() => {
		props.onChange?.(count)
	}, [count])
	return (
		<Row justify='space-between' className={style.box} >
			<Col span={20}>
				<h3>{props.children?.[0]}</h3>
				<p>{props.children?.[1]}</p>
			</Col>
			<Col span={4} className={style.count} >
				<MinusCircleOutlined
					className={style.svg}
					onClick={decrement} />
				<span>{count}</span>
				<PlusCircleOutlined
					className={style.svg}
					onClick={increment} />
			</Col>
		</Row>
	)
}
export default FC