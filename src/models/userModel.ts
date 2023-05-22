
import React from 'react'
import { useState, useCallback } from 'react'
interface NavItemType {
	className: string
	type: string
}
export default function userModel() {
	const [isLogin, setIsLogin] = useState(false);
	return { isLogin, setIsLogin }
}
