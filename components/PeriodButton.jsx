'use client'
import { useState } from "react";
import './TopBar.css';
export default function PeriodButton({onSelect}) {
	const [selectedButton, setSelectedButton] = useState('D');
	const handleButtonClick = (buttonClicked) => {
		onSelect(buttonClicked);
        setSelectedButton(buttonClicked);
	};
    return (
        <div className="buttons">
            <button
                className={selectedButton === 'D' ? 'active' : ''}
                onClick={() => handleButtonClick('D')}>
                일
            </button>
            <button
                className={selectedButton === 'W' ? 'active' : ''}
                onClick={() => handleButtonClick('W')}>
                주
            </button>
            <button
                className={selectedButton === 'M' ? 'active' : ''}
                onClick={() => handleButtonClick('M')}>
                월
            </button>
        </div>
    )
}