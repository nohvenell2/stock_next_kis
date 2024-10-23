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
		return `${trillion}조 ${billion}억 원`;
	} else {
		// 1조 미만일 경우
		return `${marketCap}억 원`;
	}
};


const StockInfo = ( { data } ) => {
    if (!data) return <></>
	const {
		stock_code,
		stock_name,
		current_price,
		previous_close_price,
		price_change,
		price_change_sign,
		price_change_rate,
		accumulated_volume,
		turnover_rate,
		market_cap,
		per,
		eps,
		pbr
	} = data;

	const priceChangeColor =
		price_change_sign === 1 || price_change_sign === 2
			? "text-green-500"
			: price_change_sign === 4 || price_change_sign === 5
			? "text-red-500"
			: "text-gray-500";

	return (
		<div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
			{/* 주식 이름 및 코드 */}
			<div className="mb-4">
				<h2 className="text-xl font-bold">
					{stock_name} <span className="text-gray-500">[{stock_code}]</span>
				</h2>
				<p className={price_change > 0 ? 'text-red-500':'text-blue-700'}>
					{price_change > 0 ? `+${price_change}원 ( ${price_change_rate}% )` : `${price_change}원 ( ${price_change_rate}% )`}
				</p>
			</div>

			{/* 정보 리스트 */}
			<div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
				{/* 현재가 / 전일 종가 */}
				<div>
					<p className="font-semibold">현재가</p>
					<p>{current_price}원</p>
				</div>
				<div>
					<p className="font-semibold">전일 종가</p>
					<p>{previous_close_price}원</p>
				</div>

				{/* 누적 거래량 / 거래 회전율 */}
				<div>
					<p className="font-semibold">누적 거래량</p>
					<p>{accumulated_volume}주</p>
				</div>
				<div>
					<p className="font-semibold">거래 회전율</p>
					<p>{turnover_rate}%</p>
				</div>

				{/* 시가 총액 / PER */}
				<div>
					<p className="font-semibold">시가 총액</p>
					<p>{formatMarketCap(market_cap)}</p>
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

export default StockInfo;

/**
 * @typedef {Object} StockData
 * @property {string} stock_code - 주식 코드
 * @property {string} stock_name - 주식 이름
 * @property {number} current_price - 현재 가격
 * @property {number} previous_close_price - 전일 종가
 * @property {number} price_change - 가격 변동 (현재 가격 - 전일 가격)
 * @property {number} price_change_sign - 가격 변동 방향 (1: 상한, 2: 상승, 3: 보합, 4: 하한, 5: 하락)
 * @property {number} price_change_rate - 가격 변동 비율 (퍼센트)
 * @property {number} accumulated_volume - 누적 거래량
 * @property {number} accumulated_tr_pbmn - 누적 거래대금
 * @property {number} previous_volume - 전일 거래량
 * @property {number} max_price - 당일 최고가
 * @property {number} min_price - 당일 최저가
 * @property {number} open_price - 시가
 * @property {number} high_price - 당일 고가
 * @property {number} low_price - 당일 저가
 * @property {number} previous_open_price - 전일 시가
 * @property {number} previous_high_price - 전일 고가
 * @property {number} previous_low_price - 전일 저가
 * @property {number} ask_price - 매도 호가
 * @property {number} bid_price - 매수 호가
 * @property {number} price_change_volume - 가격 변동 거래량
 * @property {number} turnover_rate - 거래 회전율
 * @property {number} face_value - 액면가
 * @property {number} listed_shares - 상장 주식 수
 * @property {number} capital_amount - 자본금 (억 단위)
 * @property {number} market_cap - 시가 총액 (억 단위)
 * @property {number} per - 주가수익비율
 * @property {number} eps - 주당순이익
 * @property {number} pbr - 주가순자산비율
 * @property {number} loan_remain_rate - 대출 잔고율
 */