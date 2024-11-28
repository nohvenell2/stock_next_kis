import connectDB from "./connectDB.js";
import { fetchExchange } from "./fetch_exchange.js";
import { kospi_symbols, snp500_symbols } from "./fetch_symbols.js";
/**
 * 단일 종목의 현재 가격 조회
 * @param {string} symbol - 종목 코드
 * @returns {Promise<number>} 현재가
 */
async function fetchSingleCurrentPrice(symbol) {
    let conn;
    try {
        conn = await connectDB();
        const query = `
            SELECT symbol, price 
            FROM stock_info 
            WHERE symbol = ?
        `;
        const [result] = await conn.execute(query, [symbol]);
        let exchangeRate;
        if (kospi_symbols.includes(symbol)){
            exchangeRate = 1;
        }else if (snp500_symbols.includes(symbol)){
            const result = await fetchExchange();
            exchangeRate = result.en_kr;
        }
        return { [result[0].symbol]: (Number(result[0].price) * exchangeRate).toFixed(0) };
    } catch(e) {
        console.log('Mysql DB 에러 - 단일 종목 조회');
        throw e;
    } finally {
        if (conn) await conn.end();
    }
}

/**
 * 여러 종목의 현재 가격 조회
 * @param {string[]} symbols - 종목 코드 배열
 * @returns {Promise<Object.<string, number>>} 종목코드:현재가 객체
 */
async function fetchMultipleCurrentPrices(symbols) {
    let conn;
    try {
        conn = await connectDB();
        const placeholders = symbols.map(() => '?').join(',');
        const query = `
            SELECT symbol, price
            FROM stock_info
            WHERE symbol IN (${placeholders})
        `;
        
        const [result] = await conn.execute(query, symbols);
        
        const exchangeRate = await fetchExchange();
        const en_kr = exchangeRate.en_kr;

        const priceMap = {};
        for (const item of result) {
            const rate = kospi_symbols.includes(item.symbol) ? 1 : 
                        snp500_symbols.includes(item.symbol) ? en_kr : 1;
            
            priceMap[item.symbol] = (Number(item.price) * rate).toFixed(0);
        }
        
        return priceMap;
    } catch(e) {
        console.log('Mysql DB 에러 - 다중 종목 조회:', e);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
}

export { fetchSingleCurrentPrice, fetchMultipleCurrentPrices }; 