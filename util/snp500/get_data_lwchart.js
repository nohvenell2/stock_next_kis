//todo stock info 정보 가공 고려
import get_price_snp500 from "./get_price.js";
import { modTime } from "../format_time.js";
import { symbols_arr, symbols_obj } from "./get_symbols.js";
async function get_data(symbol){
    if (!symbols_arr.includes(symbol)) return null
    const data = await get_price_snp500(symbol)
    const info = symbols_obj[symbol]
    const price_data = []
    const volume_data = []
    data.forEach((d) => {
        //UTC 시간 맞추기
        //const time = new Date(d.trade_date).getTime() + 9 * 60 * 60 * 1000
        price_data.push(
            { time: modTime(d.trade_date), open: Number(d.open_price), high: Number(d.high_price),
            low: Number(d.low_price), close: Number(d.close_price) } 
        )
        volume_data.push({time: modTime(d.trade_date), value:Number(d.accumulated_volume)})
    })
    return [info,price_data,volume_data]
}
export default get_data