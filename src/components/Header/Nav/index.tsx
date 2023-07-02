
import NavItem from './NavItem'
import { useModel } from 'umi'
import style from './index.less'
export default (props: any) => {
	//导航数据
	const { icons } = useModel('staticModel')
	return (
		<>
			<div className={style.nav}>
				{icons.map(item => (<NavItem data={item} key={item.className} />))}
			</div>
		</>
	)

}