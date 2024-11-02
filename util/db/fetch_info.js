import connectDB from "./connectDB.js";
/**
 * 
 * @param {string} symbol 
 * @returns {Promise<StockInfo_raw>}
 */
async function fetchInfo(symbol) {
    let conn;
    try{
        conn = await connectDB();
        const query = `SELECT * FROM stock_info WHERE symbol = ?`;
        const [result] = await conn.execute(query, [symbol]);
        return result[0]
    }catch(e){
        console.log('Mysql DB 에러.')
        throw e
    }finally{
        if (conn) await conn.end();
    }
}
export {fetchInfo}

/**
 * @typedef {Object} StockInfo_raw
 * @property {string} symbol - Primary key, 10자 이하의 문자열
 * @property {string} stock_name - 주식 이름, 100자 이하의 문자열
 * @property {string|null} [market] - 시장 정보, 50자 이하의 문자열 (nullable)
 * @property {string|null} [sector_name] - 섹터 이름, 100자 이하의 문자열 (nullable)
 * @property {string|null} [price] - 가격, 소수점 2자리까지의 문자열 (nullable)
 * @property {number|null} [volume] - 거래량, 정수형 (nullable)
 * @property {string|null} [amount] - 거래 금액, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [market_cap] - 시가총액, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [sign] - 기호, 20자 이하의 문자열 (nullable)
 * @property {string|null} [risk] - 리스크 수준, 20자 이하의 문자열 (nullable)
 * @property {boolean|null} [halt] - 거래 정지 여부, 1 또는 0으로 표현되는 boolean (nullable)
 * @property {boolean|null} [overbought] - 과매수 여부, 1 또는 0으로 표현되는 boolean (nullable)
 * @property {string|null} [prev_price] - 이전 가격, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [prev_volume] - 이전 거래량, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [change] - 가격 변화량, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [high_limit] - 상한가, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [low_limit] - 하한가, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [unit] - 단위, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [tick] - 틱, 소수점 2자리까지의 문자열 (nullable)
 * @property {number|null} [decimal_places] - 소수점 자릿수 (nullable)
 * @property {string|null} [currency] - 통화, 10자 이하의 문자열 (nullable)
 * @property {string|null} [exchange_rate] - 환율, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [open] - 시가, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [high] - 최고가, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [low] - 최저가, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [close] - 종가, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [rate] - 변화율, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [sign_name] - 기호 이름, 20자 이하의 문자열 (nullable)
 * @property {string|null} [eps] - 주당순이익, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [bps] - 주당순자산가치, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [per] - 주가수익비율, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [pbr] - 주가순자산비율, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [week52_high] - 52주 최고가, 소수점 2자리까지의 문자열 (nullable)
 * @property {string|null} [week52_low] - 52주 최저가, 소수점 2자리까지의 문자열 (nullable)
 * @property {Date|null} [week52_high_date] - 52주 최고가 날짜 (nullable)
 * @property {Date|null} [week52_low_date] - 52주 최저가 날짜 (nullable)
 */
