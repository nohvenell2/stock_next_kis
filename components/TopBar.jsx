import './TopBar.css';
import StockSelector from './StockSelector';
import Link from 'next/link';
import { kospi_symbols, snp500_symbols, symbolsData } from '@/util/db/fetch_symbols.js';
const TopBar = () => {
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
                    	<StockSelector snp500_symbols={snp500_symbols} kospi_symbols={kospi_symbols} symbolsData={symbolsData}/> 
					</Suspense>
                </div>
			</div>
			{/* PERIOD BUTTON */}
			{/* <PeriodButton onSelect={setPeriod}/> */}
		</div>
	);
};

export default TopBar;

