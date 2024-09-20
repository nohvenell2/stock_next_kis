import React, { useState } from 'react';
import StockSelector from './StockSelector';
import './TopBar.css';
const TopBar = () => {
	const [selectedButton, setSelectedButton] = useState('일');

	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};

	return (
		<div className="top-bar">
			<div className="title">
				My Website
			</div>

			<div className="search">
				<input type="text" placeholder="Search..." />
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
