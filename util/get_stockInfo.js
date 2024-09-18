import connectDB from './connectDB.js';
import isCode from './isCode.js'
/**
 * @typedef {Object} StockData
 * @property {string} stock_code - 주식 코드
 * @property {string} stock_name - 주식 이름
 * @property {number} current_price - 현재 가격
 * @property {number} previous_close_price - 전일 종가
 * @property {number} price_change - 가격 변동 (현재 가격 - 전일 가격)
 * @property {number} price_change_sign - 가격 변동 방향 (1: 상승, 2: 하락, 0: 동일)
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

/**
 * 주식 기본 정보
 * @param {string} code Stock Code
 * @returns {StockData}
 * 
 */
const get_stockInfo = async (code)=>{
    if (!isCode(code)) throw new Error('invalid STOCKCODE');
    const query = 'SELECT * FROM stock_info WHERE stock_code = ?';
    const conn = await connectDB();
    const [[result]] = await conn.query(query,[code])
    conn.end()
    return result
}
export default get_stockInfo