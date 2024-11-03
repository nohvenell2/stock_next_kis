import connectDB from "./connectDB.js";
import { kospi_symbols,snp500_symbols } from "./fetch_symbols.js";
/**
 * kospi ohlc + volume 시계열 데이터
 * @param {string} symbol 
 * @param {int} period 
 * @returns {Promise<PriceData_raw[]>}
 */
async function fetchPrice(symbol, period, table_name) {
    let conn;
    try{
        conn = await connectDB();
        const query = `
            SELECT * 
            FROM ${table_name} 
            WHERE symbol = ? AND trade_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
            ORDER BY trade_date ASC
        `;
        const [result] = await conn.execute(query, [symbol, period]);
        await conn.end();
        return result
    }catch(e){
        console.log('Mysql DB 에러.');
        throw e;
    }finally{
        if (conn) await conn.end();
    }
}
export {fetchPrice}

/**
 * Chart 에서 사용하는 데이터 형식으로 변환
 * @param {PriceData_raw[]} data - The list of raw data to convert.
 * @returns {PriceData[]} The converted list in PriceData format.
 */

/**
 * @typedef {Object} PriceData_raw
 * @property {string} symbol - 주식 코드
 * @property {Date} trade_date
 * @property {string} open_price - 상장 시장
 * @property {string} high_price - 주식 이름
 * @property {string} low_price - 주식 구분 이름
 * @property {string} close_price - 주식 구분 이름
 * @property {string} volume - 거래량
 */