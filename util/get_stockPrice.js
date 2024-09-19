//주식Code로 주가정보를 리턴
import isCode from './isCode.js';
import connectDB from './connectDB.js';
const PERIOD = {'D':'daily','W':'weekly','M':'monthly'};

/**
 * 
 * @param {string} code 
 * @param {string} period 
 * @returns {StockHistoryData[]}
 */
const get_stockPrice = async(code,period)=>{
    if (!isCode(code)) throw new Error('invalid STOCKCODE');
    if (!Object.keys(PERIOD).includes(period)) throw new Error('invalid PERIOD');
    const query = `SELECT * FROM stock_price_${PERIOD[period]} WHERE stock_code = ?`
    const conn = await connectDB()
    const [result] = await conn.query(query,[code])
    conn.end()
    return result
}
export default get_stockPrice


/**
 * @typedef {Object} StockHistoryData
 * @property {string} stock_code - 주식 코드
 * @property {string} trading_date - 거래일 (YYYY-MM-DD)
 * @property {number} close_price - 종가
 * @property {number} open_price - 시가
 * @property {number} high_price - 최고가
 * @property {number} low_price - 최저가
 * @property {number} accumulated_volume - 누적 거래량
 * @property {number} accumulated_tr_pbmn - 누적 거래대금
 * @property {string} flng_cls_code - 종목 구분 코드
 * @property {number} partition_rate - 분할 비율
 * @property {string} mod_yn - 분할변경여부 (Y,N)
 * @property {number} price_change_sign - 가격 변동 방향 (1: 상한, 2: 상승, 3: 보합, 4: 하한, 5: 하락)
 * @property {number} price_change - 가격 변동 (현재 가격 - 전일 가격)
 * @property {string} revl_issu_reas - 공시 사유
 */