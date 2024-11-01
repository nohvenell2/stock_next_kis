import connectDB from '../connectDB.js'
/**
 * 
 * @returns {[string[],object]}
 */
async function getSymbols(){
    const query = 'SELECT * FROM snp500_symbol ORDER BY market_cap DESC';
    const conn = await connectDB();
    const [data] = await conn.query(query)
    const symbols_arr = data.map((stock)=>stock.symbol)
    const symbols_obj = {}
    data.forEach((stock)=>{
        const { symbol, ...rest } = stock
        symbols_obj[symbol] = rest
    })
    conn.end()
    return [symbols_arr, symbols_obj]
}
const [symbols_arr, symbols_obj] = await getSymbols()
export {symbols_arr, symbols_obj}