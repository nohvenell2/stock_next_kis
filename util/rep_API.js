import get_stockInfo from "./get_stockInfo.js"
import get_stockPrice from "./get_stockPrice.js"
import isCode from "./isCode.js"
export default async function rep_API(code, period = 'D') {
    if (!isCode(code)) {
        res.status(500).json('Invalid Code')
        return
    }
    const info = await get_stockInfo(code)
    const data = await get_stockPrice(code, period)
    const price_data = []
    const volume_data = []
    data.forEach((d) => {
        const time = new Date(d.trading_date).getTime() + 9 * 60 * 60 * 1000
        price_data.push([time, d.open_price, d.high_price, d.low_price, d.close_price])
        volume_data.push([time, d.accumulated_volume])
    })
    console.log(data)
}