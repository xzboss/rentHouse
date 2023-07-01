/* 一些全局静态数据,默认数据 */
import React from 'react'
import worldCountries from 'world-countries'
console.log(worldCountries)
interface NavItemType {
	className: string
	type: string
}
export default function staticModel() {
	// 类型导航图标类名
	const icons: NavItemType[] = [
		{ className: 'icon-luyingcamping1', type: 'Outdoor' },
		{ className: 'icon-Desert', type: 'Desert' },
		{ className: 'icon-Snowflake', type: 'Snow' },
		{ className: 'icon-beach-parasol-water-', type: 'Beach' },
		{ className: 'icon-xianxinghaidao', type: 'Island' },
		{ className: 'icon-building-modern-1', type: 'Urban' },
		{ className: 'icon-diaoyu', type: 'Fishing' },
		{ className: 'icon-suoshuxiangcun', type: 'Countryside' },
		{ className: 'icon-huaxue', type: 'Skiing' },
		{ className: 'icon-pool', type: 'Swimming' }
	]
	//所有可存在房子的国家

	const regions = worldCountries.map(({ name, region, latlng }) => {
		return {
			region,
			country: name.common,
			latlng,
		}
	})
	regions.sort((f, s) => {
    console.log(f.country[0], s.country[0]);
    return f.region[0].localeCompare(s.region[0]);
});
	regions.unshift({
		region: 'any',
		country: 'where',
		latlng: [35, 105]
	})
	return { icons, regions }

	/* 
	---国际化... 
	*/
}
