import { fetchIndex } from "./db/fetch_index_daily.js";
import { modTime } from "./format_time.js";
/**
 * 
 * @param {IndexName} index_name 
 * @param {int} period
 * @returns {Promise<IndexData[]>}
 */
async function chartData_index(index_name,period){
    const data = await fetchIndex(index_name,period)
    const result = data.map((d)=>(
        {
            time: modTime(d.date),
            value: parseFloat(d.value)
        }
    ))
    return result
}
//chartData_index('NASDAQ',5).then((d)=>console.table(d))
export { chartData_index }

/**
 * @typedef {"KOSPI" | "SP500" | "DJIA" | "NASDAQ" } IndexName
 */

/**
 * @typedef {Object} IndexData
 * @property {string} time - yyyy-mm-dd 형식의 시간 문자열
 * @property {Number} value - index value
 * 
 */