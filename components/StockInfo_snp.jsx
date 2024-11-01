import React from "react";
import styles from "./StockInfo.module.css"
/**
 * 시가 총액을 'xx조 xx억 원' 형식으로 변환하는 함수
 * @param {number} marketCap - 시가 총액 (억 단위)
 * @returns {string} 변환된 시가 총액 문자열
 */
const formatMarketCap = (marketCap) => {
	if (marketCap >= 10000) {
		// 1조 이상일 경우
		const trillion = Math.floor(marketCap / 10000); // 조 단위
		const billion = marketCap % 10000; // 억 단위
		return `${trillion}조 ${billion}억`;
	} else {
		// 1조 미만일 경우
		return `${marketCap}억 원`;
	}
};


const StockInfo_snp = ( { data } ) => {
    if (!data) return <></>
	const {
		symbol,
        market,
		stock_name,
		sector_name,
		price_change,
		price_change_rate,
		volume,
        amount,
		market_cap,
		per,
		eps,
		pbr,
        close_price,
        open_price
	} = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
			{/* 주식 이름 및 코드 */}
			<div className="mb-4">
				<h2 className="text-xl font-bold">
					{stock_name} <span className="text-gray-500">[{symbol}]</span>
				</h2>
				<p className={price_change > 0 ? 'text-red-500':'text-blue-700'}>
					{price_change > 0 ? `+${price_change}원 ( ${price_change_rate}% )` : `${price_change}원 ( ${price_change_rate}% )`}
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
					<p>{open_price}$</p>
				</div>
				<div>
					<p className="font-semibold">종가</p>
					<p>{close_price}$</p>
				</div>
                {/* 거래량 / 거래액 */}
				<div>
					<p className="font-semibold">거래량</p>
					<p>{volume}주</p>
				</div>
				<div>
					<p className="font-semibold">거래액</p>
					<p>{amount}$</p>
				</div>
				{/* 시가 총액 / PER */}
				<div>
					<p className="font-semibold">시가 총액</p>
					<p>{market_cap}$</p>
				</div>
				<div>
					<p className="font-semibold">PER</p>
					<p>{per}</p>
				</div>

				{/* EPS / PBR */}
				<div>
					<p className="font-semibold">EPS</p>
					<p>{Math.floor(eps)}원</p>
				</div>
				<div>
					<p className="font-semibold">PBR</p>
					<p>{pbr}</p>
				</div>
			</div>
		</div>
	);
};

export default StockInfo_snp;
