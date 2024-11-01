import get_stockPrice from "./get_stockPrice.js"
import get_stockInfo from "./get_stockInfo.js"
import isCode from "./isCode.js"
/**
 * unix 시간을 lightweight-charts 에 필요한 yyyy-mm-dd 로 변환
 * @param {string} : unix time
 * @returns {string} : yyyy-mm-dd
 */
//todo modTime 수정하기 time 객체로 db 로 부터 받을 예정 
function modTime(time) {
    const date = new Date(time)
    const yy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yy}-${mm}-${dd}`;
}
/**
 * 주식 정보를 lw-chart 에 맞게 수정하여 반환
 * @param {string} code 주식코드
 * @param {string} period 'D' | 'M' | 'Y'
 * @returns 
 */
export default async function get_data_lwchart(code, period = 'D') {
    if (!isCode(code)) {
        return null
    }
    const data = await get_stockPrice(code, period)
    const info = await get_stockInfo(code)
    const price_data = []
    const volume_data = []
    data.forEach((d) => {
        //UTC 시간 맞추기
        const time = new Date(d.trading_date).getTime() + 9 * 60 * 60 * 1000
        //todo modTime 수정하기 time 객체로 db 로 부터 받을 예정 
        price_data.push(
            { time: modTime(time), open: d.open_price, high: d.high_price, low: d.low_price, close: d.close_price } 
        )
        volume_data.push({time: modTime(time), value:d.accumulated_volume})
    })
    return [info,price_data,volume_data]
}
