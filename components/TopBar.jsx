'use client'
import React, { useState } from 'react';
import StockSelector from './StockSelector';
import './TopBar.css';
const period_label = {'일':'D','주':'W','월':'M'}
const TopBar = ({onChangeStock,onChangePeriod}) => {
	const [selectedButton, setSelectedButton] = useState('일');
	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
		onChangePeriod(period_label[buttonName]);
	};

	return (
		<div className="top-bar">
			<div className="title">
				KRX100 주식정보
			</div>

			<div className="search">
				<div className="stock-selector-wrapper">
                    <StockSelector onSelect={onChangeStock}/> 
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
