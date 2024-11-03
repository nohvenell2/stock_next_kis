import './TopBar.css';
import StockSelector from './StockSelector';
import Link from 'next/link';
import { snp500_symbols, symbolsData } from '@/util/db/fetch_symbols.js';
function TopBar_snp500(){
	//RENDER
	return (
		<div className="top-bar">
			{/* TITLE */}
			<div className="title">
				<div className='flex flex-row gap-8'>
					<Link href={`/${process.env.NEXT_PUBLIC_KOSPI_URL}`}>
						KOSPI
					</Link>
					<Link href={`/${process.env.NEXT_PUBLIC_SNP500_URL}`} className='underline'>
						S&P500
					</Link>
				</div>
			</div>
			{/* SELECTOR */}
			<div className="search">
				<div className="stock-selector-wrapper">
                    <StockSelector symbols={snp500_symbols} symbolsData={symbolsData} market='snp500'/> 
                </div>
			</div>
			<div className='buttons'></div>
		</div>
	);
};

export default TopBar_snp500;

