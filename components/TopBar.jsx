'use client'
import React, { useEffect, useState } from 'react';
import StockSelector from './StockSelector';
import './TopBar.css';
import { useRouter } from 'next/navigation';
const period_label = {'일':'D','주':'W','월':'M'}
const TopBar = () => {
	const router = useRouter()
	const [stock,setStock] = useState('')
	//todo 버튼컴포넌트 나누기
	const [selectedButton, setSelectedButton] = useState('일');
	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};
	useEffect(()=>{
		const period = period_label[selectedButton]
		if (stock){
            const stock_url = `${process.env.NEXT_PUBLIC_SITE_URL}/stock-info/${stock}?period=${period}`
            router.push(stock_url)
        }
	},[stock,selectedButton])
	
	return (
		<div className="top-bar">
			<div className="title">
				KRX100 주식정보
			</div>

			<div className="search">
				<div className="stock-selector-wrapper">
                    <StockSelector onSelect={setStock}/> 
                </div>
			</div>

			<div className="buttons">
				<button
					className={selectedButton === '일' ? 'active' : ''}
					onClick={() => handleButtonClick('일')}>
					일
				</button>
				<button
					className={selectedButton === '주' ? 'active' : ''}
					onClick={() => handleButtonClick('주')}>
					주
				</button>
				<button
					className={selectedButton === '월' ? 'active' : ''}
					onClick={() => handleButtonClick('월')}>
					월
				</button>
			</div>
		</div>
	);
};

export default TopBar;
