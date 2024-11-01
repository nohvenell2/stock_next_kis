//주식Code로 주가정보를 리턴
import connectDB from '../connectDB.js';

/**
 * 주식 가격 관련 정보
 * @param {string} code 
 * @returns {StockHistoryData[]}
 */
async function get_price_snp500 (code){
    const query = `SELECT * FROM snp500_price_daily WHERE symbol = ?`
    const conn = await connectDB()
    const [result] = await conn.query(query,[code])
    conn.end()
    return result
}
export default get_price_snp500
get_price_snp500('AAPL')

/**
 * @typedef {Object} StockHistoryData
 * @property {string} symbol - 주식 코드
 * @property {string} trade_date - 거래일 (YYYY-MM-DD)
 * @property {number} open_price - 시가
 * @property {number} high_price - 최고가
 * @property {number} low_price - 최저가
 * @property {number} close_price - 종가
 * @property {number} volume - 누적 거래량
 */