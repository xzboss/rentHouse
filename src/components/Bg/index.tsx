
import style from './index.less'
import { getRandom, getColor } from '@/utils'
export default (props: any) => {
	let arr = new Array(10).fill(0)
	return (
		<div className={style.bg}>
			{arr.map(item => {
				return (
					<span style={{
						color: getColor(),
						width: getRandom(5, 20) + 'vmin',
						height: getRandom(5, 20) + 'vmin',
						top: getRandom(0, 100) + '%',
						left: getRandom(0, 100) + '%',
						animationDuration: getRandom(20, 50) + 's',
						animationDelay: getRandom(-50, 0) + 's',
						transformOrigin: `${getRandom(-20, 20)}vw ${getRandom(-20, 20)}vw`,
						boxShadow: `20vw 0 40px currentColor`
					}}
					></span>
				)
			})}
		</div>
	)
}