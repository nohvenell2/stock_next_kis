import connectDB from "./connectDB.js";

/**
 * MySQL DB에서 가장 최근 환율 정보를 조회합니다.
 * @async
 * @returns {Promise<{
 *   date: Date,
 *   en_kr: number
 * }>} 환율 정보 객체
 *   - date: 환율 기준 날짜
 *   - en_kr: 달러/원 환율 (소수점 둘째자리까지)
 * @throws {Error} DB 연결 또는 쿼리 실행 중 오류 발생시
 */
async function fetchExchange(){
    let conn;
    try{
        conn = await connectDB();
        const query = `SELECT * FROM exchange_rate ORDER BY date DESC LIMIT 1`;
        const [result] = await conn.execute(query);
        return result[0]
    }catch(e){
        console.log('Mysql DB 에러.')
        throw e
    }finally{
        if (conn) await conn.end();
    }
}
export {fetchExchange}
