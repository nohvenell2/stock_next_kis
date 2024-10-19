import connectDB from "./connectDB.js";
//하루 거래량 순위 탑10
const rank_VolumeQ = async() => {
    const conn = await connectDB()
    const query =`
    WITH LatestTradingDate AS (
        SELECT MAX(trading_date) AS latest_date
        FROM stock_price_daily
    )
    SELECT stock_code, accumulated_volume
    FROM stock_price_daily
    WHERE trading_date = (SELECT latest_date FROM LatestTradingDate)
    ORDER BY accumulated_volume DESC
    LIMIT 10;`
    const [result] = await conn.execute(query);
    conn.end()
    //accumulated_volume
    return result
}
//하루 거래액 순위 탑10
const rank_VolumeP = async() => {
    const conn = await connectDB()
    const query =`
    WITH LatestTradingDate AS (
        SELECT MAX(trading_date) AS latest_date
        FROM stock_price_daily
    )
    SELECT stock_code, accumulated_tr_pbmn
    FROM stock_price_daily
    WHERE trading_date = (SELECT latest_date FROM LatestTradingDate)
    ORDER BY accumulated_tr_pbmn DESC
    LIMIT 10;`
    const [result] = await conn.execute(query);
    conn.end()
    //accumulated_tr_pbmn
    return result
}
//하루 상승률 순위 탑10
const rank_RateUp = async() => {
    const conn = await connectDB()
    const query =`
    SELECT stock_code, price_change_rate
    FROM stock_info
    ORDER BY price_change_rate DESC
    LIMIT 10;`
    const [result] = await conn.execute(query);
    conn.end()
    //price_change_rate
    return result
}
//하루 하락률률 순위 탑10
const rank_RateDown = async() => {
    const conn = await connectDB()
    const query =`
    SELECT stock_code, price_change_rate
    FROM stock_info
    ORDER BY price_change_rate ASC
    LIMIT 10;`
    const [result] = await conn.execute(query);
    conn.end()
    //price_change_rate
    return result
}
export {rank_VolumeQ,rank_VolumeP,rank_RateUp,rank_RateDown}