import connectDB from '../connectDB.js';

/**
 * 주식 기본 정보
 * @param {string} symbol snp500 symbol
 * @returns {raw_StockData}
 * 
 */
const get_raw_data = async (symbol) => {
    const query = 'SELECT * FROM snp500_symbol WHERE symbol = ?';
    const conn = await connectDB();
    const [[result]] = await conn.query(query,[symbol])
    conn.end()
    return result
}
/**
 * 
 * @param {raw_StockData} raw_data 
 * @returns {StockData}
 */
const format_stock_info = (raw_data) => {
    const data = {
        symbol: raw_data.symbol,
        market: raw_data.market,
        stock_name: raw_data.stock_name,
        sector_name: raw_data.sector_name,
        volume: raw_data.volume,
        amount: raw_data.amount,
        market_cap: raw_data.market_cap,
        price_change_rate: raw_data.price_change_rate,
        price_change: raw_data.price_change,
        eps: raw_data.eps,
        per: raw_data.per,
        pbr: raw_data.pbr,
        open_price: raw_data.open_price,
        high_price: raw_data.high_price,
        low_price: raw_data.low_price,
        close_price: raw_data.close_price,
    }
    return data
}
const get_stockInfo = async (symbol) => {
    const raw = await get_raw_data(symbol)
    const data = format_stock_info(raw)
    return data
}
export default get_stockInfo

/**
 * @typedef {Object} raw_StockData
 * @property {string} symbol - 주식 코드
 * @property {string} market - 상장 시장
 * @property {string} stock_name - 주식 이름
 * @property {string} sector_name - 주식 구분 이름
 * @property {number} volume - 거래량
 * @property {number} amount - 거래대금
 * @property {number} market_cap - 시가총액 (억 단위)
 * @property {number} eps - 주당순이익
 * @property {number} bps - 주당순자산
 * @property {number} per - 주가수익비율
 * @property {number} pbr - 주가순자산비율
 * @property {time} week52_high_date - 52주 최고가 날짜
 * @property {time} week52_low_date - 52주 최저가 날짜
 * @property {number} open_price - 당일 시가
 * @property {number} high_price - 당일 고가
 * @property {number} low_price - 당일 저가
 * @property {number} close_price - 당일 종가
 * @property {number} price_change_rate - 가격 변동 비율 (퍼센트)
 * @property {number} unit - 
 * @property {number} tick - 
 * @property {number} risk - 
 * @property {number} halt - 
 * @property {number} overbought - 
 * @property {number} price_change - 가격 변동 (현재 가격 - 전일 가격)
 * */

/**
 * @typedef {Object} StockData
 * @property {string} symbol - 주식 코드
 * @property {string} market - 상장 시장
 * @property {string} stock_name - 주식 이름
 * @property {string} sector_name - 주식 구분 이름
 * @property {number} volume - 거래량
 * @property {number} amount - 거래대금
 * @property {number} market_cap - 시가총액 (억 단위)
 * @property {number} price_change_rate - 가격 변동 비율 (퍼센트)
 * @property {number} price_change - 가격 변동 (현재 가격 - 전일 가격)
 * @property {number} eps - 주당순이익
 * @property {number} per - 주가수익비율
 * @property {number} pbr - 주가순자산비율
 * @property {number} open_price - 당일 시가
 * @property {number} high_price - 당일 고가
 * @property {number} low_price - 당일 저가
 * @property {number} close_price - 당일 종가
 * */