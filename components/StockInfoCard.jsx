import { formatBigNumber_en, formatBigNumber_kr, formatMarketCap_kr, formatNumberComma } from "@/util/format_number";
import React from "react";
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
	const currency_symbol = {'KRW':'₩','USD':'$'}[currency]
	const bignumber_function = {'KRW':formatBigNumber_kr,'USD':formatBigNumber_kr}[currency]
	const marketcap_function = {'KRW':formatMarketCap_kr,'USD':formatBigNumber_kr}[currency]
	return (
		<div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
			{/* 주식 이름 및 코드 */}
			<div className="mb-4">
				<h2 className="text-xl font-bold">
					{stock_name} <span className="text-gray-500">[{symbol}]</span>
				</h2>
				<p className={change > 0 ? 'text-red-500':'text-blue-700'}>
					{change > 0 ? `+ ${change} $ ( ${rate}% )` : `${change}${currency_symbol} ( ${rate}% )`}
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
					<p>{formatNumberComma(open,currency_symbol)}</p>
				</div>
				<div>
					<p className="font-semibold">종가</p>
					<p>{formatNumberComma(close,currency_symbol)}</p>
				</div>
                {/* 거래량 / 거래액 */}
				<div>
					<p className="font-semibold">거래량</p>
					<p>{formatBigNumber_kr(volume,'',' 주')}</p>
				</div>
				<div>
					<p className="font-semibold">거래액</p>
					<p>{bignumber_function(amount,currency_symbol)}</p>
				</div>
				{/* 시가 총액 / PER */}
				<div>
					<p className="font-semibold">시가 총액</p>
					<p>{marketcap_function(market_cap,currency_symbol)}</p>
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
