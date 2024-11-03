import connectDB from "./connectDB.js";

/**
 * stock_info 테이블에서 market_cap 순으로 symbol, stock_name, market 값을 가져와 market에 따라 분류합니다.
 * @returns {Promise<SymbolsResult>} `kospi_symbols`, `snp500_symbols`, `symbolsData`를 포함한 객체를 반환
 */
async function fetchSymbols() {
    let conn;
    try{
        conn = await connectDB()
        const query = `
        SELECT symbol, stock_name, market
        FROM stock_info
        ORDER BY market_cap DESC
        `
        const [rows] = await conn.execute(query)
        
        const kospi_symbols = [];
        const snp500_symbols = [];
        const symbolsData = {}
        rows.forEach(row => {
            symbolsData[row.symbol] = {
                stock_name : row.stock_name,
                market : row.market
            }
            if (row.market === 'KRX') {
                kospi_symbols.push(row.symbol);
            } else if (row.market === 'NYSE' || row.market === 'NASDAQ') {
                snp500_symbols.push(row.symbol);
            }
        });
        return { kospi_symbols, snp500_symbols, symbolsData }
    }catch(e){
        console.log('Mysql DB 에러.')
        throw e
    }finally{
        if (conn) await conn.end();
    }
}
const { kospi_symbols, snp500_symbols, symbolsData } = await fetchSymbols()
export { kospi_symbols, snp500_symbols, symbolsData }

/**
 * @typedef {Object} SymbolData
 * @property {string} stock_name - 주식 이름
 * @property {string} market - 시장 정보
 */

/**
 * @typedef {Object} SymbolsResult
 * @property {string[]} kospi_symbols - KOSPI 시장의 symbol 목록
 * @property {string[]} snp500_symbols - NYSE 또는 NASDAQ 시장의 symbol 목록
 * @property {Object.<string, SymbolData>} symbolsData - symbol을 키로 하고 { stock_name, market } 정보를 가진 객체
 */