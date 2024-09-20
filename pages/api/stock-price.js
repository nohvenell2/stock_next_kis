import get_stockInfo from "@/util/get_stockInfo"
import get_stockPrice from "@/util/get_stockPrice"
import isCode from "@/util/isCode"
/*
    query : code - 주식코드, period - D : 일봉, W : 주봉, M : 월봉 
    res : [
    [주식기초정보],
    [HighChart 에서 사용하는 가격정보],
    [HighChart 에서 사용하는 매매량 정보]
    ]
*/
export default async function handler(req,res){
    if (req.method == 'GET'){
        const code = req.query.code
        const period = req.query.period ?? 'D'
        if (!isCode(code)){
            res.status(500).json('Invalid Code')
            return
        }
        const info = await get_stockInfo(code)
        const data = await get_stockPrice(code,period)
        const price_data = []
        const volume_data = []
        data.forEach((d)=>{
            const time = new Date(d.trading_date).getTime() + 9*60*60*1000
            price_data.push([time,d.open_price,d.high_price,d.low_price,d.close_price])
            volume_data.push([time,d.accumulated_volume])
        })
        res.status(200).json([info,price_data,volume_data])
    }
}