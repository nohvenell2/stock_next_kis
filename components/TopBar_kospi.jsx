import './TopBar.css';
import StockSelector from './StockSelector';
import Link from 'next/link';
import { kospi_symbols, symbolsData } from '@/util/db/fetch_symbols.js';
import FavoriteList from './FavoriteList';
function TopBar_kospi() {
	//RENDER
	return (
		<div className="top-bar">
			{/* TITLE */}
			<div className="title">
				<div className='flex flex-row gap-8'>
					<Link href={`/${process.env.NEXT_PUBLIC_KOSPI_URL}`} className='underline'>
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
					<StockSelector symbols={kospi_symbols} symbolsData={symbolsData} market='kospi' />
				</div>
			</div>
			<div className='favorites'>
				<FavoriteList />
			</div>
		</div>
	);
};
export default TopBar_kospi;

