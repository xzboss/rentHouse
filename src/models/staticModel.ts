/* 一些全局静态数据,默认数据 */
import React from 'react'
interface NavItemType {
	className: string
	type: string
}
export default function staticModel() {
	// 类型导航图标类名
	const icons: NavItemType[] = [
		{ className: 'icon-luyingcamping1', type: '野外' },
		{ className: 'icon-Desert', type: '沙漠' },
		{ className: 'icon-Snowflake', type: '雪地' },
		{ className: 'icon-beach-parasol-water-', type: '沙滩' },
		{ className: 'icon-xianxinghaidao', type: '海岛' },
		{ className: 'icon-building-modern-1', type: '都市' },
		{ className: 'icon-diaoyu', type: '钓鱼' },
		{ className: 'icon-suoshuxiangcun', type: '乡村' },
		{ className: 'icon-huaxue', type: '滑雪' },
		{ className: 'icon-pool', type: '游泳' }
	]
	//所有可存在房子的国家
	const regions = [
		{
			region: '亚洲',
			country: '中国',
			latlng: [60, 19.9]
		},
		{
			region: '亚洲',
			country: '日本',
			latlng: [50, 13.9]
		},
		{
			region: 'any',
			country: 'where',
			latlng: [50, 13.9]
		}
	]
	return { icons, regions }
}
