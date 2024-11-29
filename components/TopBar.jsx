import './TopBar.css';
import StockSelector from './StockSelector';
import Link from 'next/link';
import { kospi_symbols, snp500_symbols, symbolsData } from '@/util/db/fetch_symbols.js';
import TopBarRightButtons from './TopBarRightButtons';
function TopBar({market}){
	console.log(market)
	const isKrx = (market) => market == 'KRX' || market == 'kospi' || market == 'KOSPI'
	const isSnp500 = (market) => market == 'snp500' || market == 'S&P500' || market == 'SNP500' || market == 'NASDAQ' || market == 'NYSE'
	//RENDER
	return (
		<div className="top-bar">
			{/* TITLE */}
			<div className="title">
				<div className='flex flex-row gap-8'>
					<Link href={`/${process.env.NEXT_PUBLIC_KOSPI_URL}`} className={isKrx(market) ? 'underline' : ''}>
						KOSPI
					</Link>
					<Link href={`/${process.env.NEXT_PUBLIC_SNP500_URL}`} className={isSnp500(market) ? 'underline' : ''}>
						S&P500
					</Link>
				</div>
			</div>
			{/* SELECTOR */}
			<div className="search">
				<div className="stock-selector-wrapper">
                    <StockSelector symbols={isKrx(market) ? kospi_symbols : snp500_symbols} symbolsData={symbolsData} market={market}/> 
                </div>
			</div>
			<div className='favorites'>
				<TopBarRightButtons/>
			</div>
		</div>
	);
};

export default TopBar;

