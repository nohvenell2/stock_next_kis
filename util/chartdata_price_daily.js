import { fetchPrice } from "./db/fetch_price_daily.js";
import { modTime } from "./format_time.js";
import { kospi_symbols, snp500_symbols } from "./db/fetch_symbols.js";
/**
 * 
 * @param {str} symbol 
 * @param {int} period 
 * @returns {Promise<{price_data: PriceData[], volume_data: VolumeData[]}>} - 일간 가격 및 거래량 데이터 객체
 */
async function chartPrice_daily(symbol,period) {
    let market,table_name;
    if (kospi_symbols.includes(symbol)){
        table_name = 'stock_price_daily_kospi'
        market = 'kospi'
    } else if (snp500_symbols.includes(symbol)){
        table_name = 'stock_price_daily_snp500'
        market = 'snp500'
    }
    else{
        throw new Error('Wrong Symbol Error.')
    } 
    const data = await fetchPrice(symbol,period,table_name)
    const price_data = data.map((d) => {
        if (market == 'kospi'){
            // 코스피 종목이면 가격은 int 
            return {
                time: modTime(d.trade_date),
                open: parseInt(d.open_price,10),
                high: parseInt(d.high_price,10),
                low: parseInt(d.low_price,10),
                close: parseInt(d.close_price,10),
            }
        }else{
            // 해외종목이면 가격은 float
            return {
                time: modTime(d.trade_date),
                open: parseFloat(d.open_price),
                high: parseFloat(d.high_price),
                low: parseFloat(d.low_price),
                close: parseFloat(d.close_price),
            }
        }
    })
    const volume_data = data.map((d) => ({
        time: modTime(d.trade_date),
        value: Number(d.volume)
    }));
    return { price_data, volume_data }
}
/* chartPrice_daily('BRK/B',10).then((d)=>{
    console.table(d.price_data)
    console.table(d.volume_data)
}) */
export {chartPrice_daily}

/**
 * @typedef {Object} PriceData
 * @property {Date} time
 * @property {Number} open - 상장 시장
 * @property {Number} high - 주식 이름
 * @property {Number} low - 주식 구분 이름
 * @property {Number} close - 주식 구분 이름
 * @property {Number} volume - 거래량
 */

/**
 * @typedef {Object} VolumeData
 * @property {Date} time
 * @property {Number} volume - 거래량
 */