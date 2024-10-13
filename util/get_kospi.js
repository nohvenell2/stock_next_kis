import connectDB from './connectDB.js';

/**
 * 주식 기본 정보
 * @returns {KospiData}
 * 
 */
const get_kospiIndex = async ()=>{
    const query = 'SELECT * FROM stock_kospi';
    const conn = await connectDB();
    const [data] = await conn.query(query)
    conn.end()
    const kospi_data = []
    data.forEach((d) => {
        //UTC 시간 맞추기
        const time = new Date(d.trading_date).getTime() + 9 * 60 * 60 * 1000
        kospi_data.push([time, Number(d.value)])
    })
    return kospi_data
}

export default get_kospiIndex

/*debug
const result = await get_kospiIndex();
console.log(result) */


/**
 * @typedef {Object} KospiData
 * @property {string} trading_date - 거래일 (YYYY-MM-DD)
 * @property {number} value - 코스피 지수
 */
