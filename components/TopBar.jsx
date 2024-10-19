'use client'
import React, { Suspense, useEffect, useState } from 'react';
import StockSelector from './StockSelector';
import './TopBar.css';
import { useRouter,usePathname } from 'next/navigation';
import PeriodButton from './PeriodButton';
import Link from 'next/link';
const TopBar = () => {
	//STATE - Stock
	const [stock,setStock] = useState('')
	const pathname = usePathname();
    useEffect(()=>{
        const currentStock = pathname.substring(12)
        setStock(currentStock)
    },[pathname])
	//STATE - Period
	const [period,setPeriod] = useState('D')
	//APPLY STATE - stock 또는 period 가 변경되면 해당 url 로 이동
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
					<Suspense fallback={<div>Loading...</div>}>
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
