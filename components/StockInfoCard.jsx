import React from "react";

function formatBigNumber_en(number,front = '', back = '') {
	let number_short;
	if (number < 1e3) number_short = `${number.toFixed(2)}` // Less than Thousand
    if (number >= 1e3) number_short = `${(number / 1e3).toFixed(2)}K`; // Thousand
    if (number >= 1e6) number_short = `${(number / 1e6).toFixed(2)}M`; // Million
    if (number >= 1e9) number_short = `${(number / 1e9).toFixed(2)}B`; // Billion
    if (number >= 1e12) number_short = `${(number / 1e12).toFixed(2)}T`; // Trillion
    return `${front} ${number_short} ${back}`;
}
function formatBigNumber_kr(number,front = '', back = ''){
	let number_short;
	if (number < 1e4) number_short = `${(number / 1e4).toFixed(2)}`;   // 만 이하
    if (number >= 1e4) number_short = `${(number / 1e4).toFixed(2)}만`;   // 만
    if (number >= 1e8) number_short = `${(number / 1e8).toFixed(2)}억`;   // 억
	if (number >= 1e12) number_short = `${(number / 1e12).toFixed(2)}조`; // 조
	return `${front} ${number_short} ${back}`;
}
function formatMarketCap_kr(number,front = '', back = ''){
	let number_short;
	if (number < 1e4) number_short = `${(number / 1e4).toFixed(2)}억`;   // 만
    if (number >= 1e4) number_short = `${(number / 1e4).toFixed(2)}조`;   // 만
    if (number >= 1e8) number_short = `${(number / 1e8).toFixed(2)}경`;   // 억
	return `${front} ${number_short} ${back}`;
}
const StockInfo = ( { data } ) => {
    if (!data) return <></>
	const {
		symbol,
        market,
		stock_name,
		sector_name,
		change,
		rate,
		volume,
        amount,
		market_cap,
		per,
		eps,
		pbr,
        close,
        open,
		currency
	} = data;
	const currency_symbols = {'KRW':'₩','USD':'$'}[currency]
	const bignumber_function = {'KRW':formatBigNumber_kr,'USD':formatBigNumber_en}[currency]
	const marketcap_function = {'KRW':formatMarketCap_kr,'USD':formatBigNumber_en}[currency]
	return (
		<div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
			{/* 주식 이름 및 코드 */}
			<div className="mb-4">
				<h2 className="text-xl font-bold">
					{stock_name} <span className="text-gray-500">[{symbol}]</span>
				</h2>
				<p className={change > 0 ? 'text-red-500':'text-blue-700'}>
					{change > 0 ? `+ ${change} $ ( ${rate}% )` : `${change} $ ( ${rate}% )`}
				</p>
			</div>

			{/* 정보 리스트 */}
			<div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
				{/* 시장 / 종목 구분 이름 */}
				<div>
					<p className="font-semibold">시장</p>
					<p>{market}</p>
				</div>
				<div>
					<p className="font-semibold">그룹 이름</p>
					<p className="text-sm">{sector_name}</p>
				</div>

				{/* 시가 / 종가 */}
				<div>
					<p className="font-semibold">시가</p>
					<p>{bignumber_function(open,currency_symbols)}</p>
				</div>
				<div>
					<p className="font-semibold">종가</p>
					<p>{bignumber_function(close,currency_symbols)}</p>
				</div>
                {/* 거래량 / 거래액 */}
				<div>
					<p className="font-semibold">거래량</p>
					<p>{formatBigNumber_kr(volume,'','주')}</p>
				</div>
				<div>
					<p className="font-semibold">거래액</p>
					<p>{bignumber_function(amount,currency_symbols)}</p>
				</div>
				{/* 시가 총액 / PER */}
				<div>
					<p className="font-semibold">시가 총액</p>
					<p>{marketcap_function(market_cap,currency_symbols)}</p>
				</div>
				<div>
					<p className="font-semibold">PER</p>
					<p>{per}</p>
				</div>

				{/* EPS / PBR */}
				<div>
					<p className="font-semibold">EPS</p>
					<p>{eps}</p>
				</div>
				<div>
					<p className="font-semibold">PBR</p>
					<p>{pbr}</p>
				</div>
			</div>
		</div>
	);
};

export default StockInfo;
