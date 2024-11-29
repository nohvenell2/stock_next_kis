import './TopBar.css';
import StockSelector from './StockSelector';
import Link from 'next/link';
import { kospi_symbols, snp500_symbols, symbolsData } from '@/util/db/fetch_symbols.js';
import TopBarRightButtons from './TopBarRightButtons';
function TopBar({market}){
	//RENDER
	return (
		<div className="top-bar">
			{/* TITLE */}
			<div className="title">
				<div className='flex flex-row gap-8'>
					<Link href={`/${process.env.NEXT_PUBLIC_KOSPI_URL}`} className={market == 'kospi' ? 'underline' : ''}>
						KOSPI
					</Link>
					<Link href={`/${process.env.NEXT_PUBLIC_SNP500_URL}`} className={market == 'snp500' ? 'underline' : ''}>
						S&P500
					</Link>
				</div>
			</div>
			{/* SELECTOR */}
			<div className="search">
				<div className="stock-selector-wrapper">
                    <StockSelector symbols={market == 'kospi' ? kospi_symbols : snp500_symbols} symbolsData={symbolsData} market={market}/> 
                </div>
			</div>
			<div className='favorites'>
				<TopBarRightButtons/>
			</div>
		</div>
	);
};

export default TopBar;

