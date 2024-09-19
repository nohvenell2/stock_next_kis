import get_stockInfo from "@/util/get_stockInfo"
import get_stockPrice from "@/util/get_stockPrice"
import isCode from "@/util/isCode"
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
        const chart_data = data.map(price=>{
            //date,open,high,low,close
            const time = new Date(price.trading_date).getTime() + 9*60*60*1000
            console.log(price.trading_date)
            return [time,price.open_price,price.high_price,price.low_price,price.close_price]
        })
        res.status(200).json([info,chart_data])
    }
}