import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type, { nanoid } from 'nanoid'
import 'leaflet/dist/leaflet.css'
import style from './index.less'
//L.marker([51.5, -0.09]).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
//无需翻墙的google瓦片地图
const _2D = 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=m&x={x}&y={y}&z={z}'
const _3D = 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s,m&gl=CN&x={x}&y={y}&z={z}'
const attribution = '&copy; <a>hello</a> contributors'
interface mapProps {
	position?: [number | string, number | string],
	style?: Record<string, unknown>,
	describe: string
}
const MyMap: React.FC<any> = (props) => {
	const { position = [29.56574, 103.738152] } = props
	const url = _2D
	const id = nanoid()
	console.log(props.describe)
	useEffect(() => {
		//绑定地图
		let map = L.map(id).setView(position, 13);
		//用瓦片，设置地图默认缩放尺度，左下角描述
		L.tileLayer(url, {
			maxZoom: 3,
			minZoom: 1,
			attribution: attribution
		}).addTo(map)
		//绘制圆点
		let circle = L.circleMarker(position, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 5
		}).addTo(map);
		//创建弹窗提示
		const popup = L.popup()
			.setLatLng(position)
			.setContent(`<p>${props.describe ?? 'something'}</p>`)
			.openOn(map);
		//圆点标记绑定点击事件
		circle.bindPopup(popup)
		return () => {
			//组件卸载同时卸载map所有监听，这很重要
			map.remove()
		}

	}, [position])

	return (
		<>
			<div id={id} className={style.myMap} style={props.style}></div>
		</>

	)
}
export default MyMap
