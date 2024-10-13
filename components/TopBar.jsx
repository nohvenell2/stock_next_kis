'use client'
import React, { Suspense, useEffect, useState } from 'react';
import StockSelector from './StockSelector';
import './TopBar.css';
import { useRouter } from 'next/navigation';
import PeriodButton from './PeriodButton';
import Link from 'next/link';
const urlToCode = (u) => u.match(/\/(\d{6})(?=\?)/)?.[1]
const TopBar = () => {
	//STATE - Stock
	const [stock,setStock] = useState('')
	useEffect(()=>{
		if (typeof window !== 'undefined') {
			setStock(urlToCode(window.location.href));
        }
	},[])
	//STATE - Period
	const [period,setPeriod] = useState('D')
	//APPLY STATE
	const router = useRouter()
	useEffect(()=>{
		if (stock){
			const stock_url = `${process.env.NEXT_PUBLIC_SITE_URL}/stock-info/${stock}?period=${period}`
            router.push(stock_url)
        }
	},[stock,period])
	//RENDER
	return (
		<div className="top-bar">
			{/* TITLE */}
			<div className="title">
				<Link href='/'>
					KOSPI 주식정보
				</Link>
			</div>
			{/* SELECTOR */}
			<div className="search">
				<div className="stock-selector-wrapper">
					<Suspense fallback={<>Loading...</>}>
                    	<StockSelector onSelect={setStock} currentStock={stock}/> 
					</Suspense>
                </div>
			</div>
			{/* PERIOD BUTTON */}
			<PeriodButton onSelect={setPeriod}/>
		</div>
	);
};

export default TopBar;
