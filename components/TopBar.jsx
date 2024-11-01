'use client'
import React, { Suspense, useEffect, useState } from 'react';
import StockSelector from './StockSelector';
import './TopBar.css';
import { useRouter } from 'next/navigation';
import PeriodButton from './PeriodButton';
import Link from 'next/link';
import { stock_code_name } from '@/constants/stock_code_name';
const TopBar = ({snp500Symbols, snp500Data}) => {
	//STATE - Stock
	const [stock,setStock] = useState('')
	//STATE - Period
	const [period,setPeriod] = useState('D')
	//APPLY STATE - stock 또는 period 가 변경되면 해당 url 로 이동
	const router = useRouter()
	useEffect(()=>{
		//todo 주식 구분해서 링크하기
		var stock_url = ''
		if (Object.keys(stock_code_name).includes(stock)){
			stock_url = `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_KOSPI_URL}/${stock}?period=${period}`
        }
		else if (snp500Symbols.includes(stock)){
			stock_url = `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_SNP500_URL}/${stock}`
		}
		router.push(stock_url)
	},[stock,period])
	//RENDER
	return (
		<div className="top-bar">
			{/* TITLE */}
			<div className="title">
				<div className='flex flex-row gap-8'>
					<Link href={`/${process.env.NEXT_PUBLIC_KOSPI_URL}`}>
						KOSPI
					</Link>
					<Link href={`/${process.env.NEXT_PUBLIC_SNP500_URL}`}>
						S&P500
					</Link>
				</div>
			</div>
			{/* SELECTOR */}
			<div className="search">
				<div className="stock-selector-wrapper">
					<Suspense fallback={<div>Loading...</div>}>
                    	<StockSelector snp500Symbols={snp500Symbols} snp500Data={snp500Data} onSelect={setStock}/> 
					</Suspense>
                </div>
			</div>
			{/* PERIOD BUTTON */}
			<PeriodButton onSelect={setPeriod}/>
		</div>
	);
};

export default TopBar;

