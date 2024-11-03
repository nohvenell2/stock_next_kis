import connectDB from "./connectDB.js";
const RANK_MAX = 10;
/**
 * 지정된 시장, 열, 정렬 순서에 따라 상위 랭크 정보를 반환합니다.
 *
 * @param {"kospi" | "snp500"} market - 조회할 시장
 * @param {"volume" | "amount" | "market_cap" | "change" | "rate"} column_name - 정렬할 열 이름
 * @param {"DESC" | "ASC"} [order="DESC"] - 정렬 순서
 * @param {number} [rank_numb=RANK_MAX] - 반환할 상위 랭크 수
 * @returns {Promise<Array>} 상위 랭크 정보 배열
 */
async function rank_Info(market, column_name, rank_numb = RANK_MAX, order = 'DESC') {
    let conn;
    try {
        let market_query;
        if (market === 'kospi') {
            market_query = `WHERE market = 'KRX'`;
        } else if (market === 'snp500') {
            market_query = `WHERE market = 'NYSE' OR market = 'NASDAQ'`;
        } else {
            throw new Error('Wrong Market');
        }
        conn = await connectDB();

        const query = `
            SELECT symbol, stock_name, ${column_name}
            FROM stock_info
            ${market_query}
            ORDER BY ${column_name} ${order}
            LIMIT ${rank_numb};
        `;
        const [result] = await conn.execute(query);

        const data = result.map((s) => [s.symbol, s.stock_name, s[column_name]]);
        return data;
    } catch (e) {
        console.log('Mysql DB 에러.');
        console.log(e);
        throw e;
    } finally {
        if (conn) conn.end();
    }
}

//rank_Info('snp500', 'rate', 10, 'ASC');
export { rank_Info };
