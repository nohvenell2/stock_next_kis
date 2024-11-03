import connectDB from "./connectDB.js";
/**
 * kospi ohlc + volume 시계열 데이터
 * @param {IndexName} index_name
 * @param {int} period 
 * @returns {Promise<StockIndex_raw[]>}
 */
async function fetchIndex(index_name, period) {
    let conn;
    try{
        conn = await connectDB();
        const query = `
            SELECT * 
            FROM stock_index
            WHERE index_name = ? AND date >= DATE_SUB(NOW(), INTERVAL ? DAY)
        `;
        const [result] = await conn.execute(query, [index_name, period]);
        return result
    }catch(e){
        console.log('Mysql DB 에러.')
        throw e
    }finally{
        if (conn) await conn.end();
    }
}
export {fetchIndex}

/**
 * @typedef {Object} StockIndex_raw
 * @property {Date} date - 거래일
 * @property {IndexName} index_name - index 이름
 * @property {string} value - 값
 */

/**
 * @typedef {"KOSPI" | "SP500" | "DJIA" | "NASDAQ" } IndexName
 */