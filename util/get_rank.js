import connectDB from "./db/connectDB.js";
import { formatNumberShort } from "./format_number.js";
const RANK_MAX = 5;
//시가총액 순위
const rank_Capital = async (rank_max=RANK_MAX) => {
    const conn = await connectDB()
    const query = `
    SELECT stock_code, market_cap
    FROM stock_info
    ORDER BY market_cap DESC
    LIMIT ${rank_max};`
    const [result] = await conn.execute(query);
    conn.end()
    //accumulated_volume
    const data = result.map((s)=>[s.stock_code,`${formatNumberShort(s.market_cap*100000000)} 원`])
    return data
}
const rank_VolumeQ = async (rank_max=RANK_MAX) => {
    const conn = await connectDB()
    const query = `
    WITH LatestTradingDate AS (
        SELECT MAX(trading_date) AS latest_date
        FROM stock_price_daily
    )
    SELECT stock_code, accumulated_volume
    FROM stock_price_daily
    WHERE trading_date = (SELECT latest_date FROM LatestTradingDate)
    ORDER BY accumulated_volume DESC
    LIMIT ${rank_max};`
    const [result] = await conn.execute(query);
    conn.end()
    //accumulated_volume
    const data = result.map((s)=>[s.stock_code,`${formatNumberShort(s.accumulated_volume)} 주`])
    return data
}
//하루 거래액 순위
const rank_VolumeP = async (rank_max=RANK_MAX) => {
    const conn = await connectDB()
    const query = `
    WITH LatestTradingDate AS (
        SELECT MAX(trading_date) AS latest_date
        FROM stock_price_daily
    )
    SELECT stock_code, accumulated_tr_pbmn
    FROM stock_price_daily
    WHERE trading_date = (SELECT latest_date FROM LatestTradingDate)
    ORDER BY accumulated_tr_pbmn DESC
    LIMIT ${rank_max};`

    const [result] = await conn.execute(query);
    conn.end()
    //accumulated_tr_pbmn
    const data = result.map((s)=>[s.stock_code,`${formatNumberShort(s.accumulated_tr_pbmn)} 원`])
    return data
}
//하루 상승률 순위
const rank_RateUp = async (rank_max=RANK_MAX) => {
    const conn = await connectDB()
    const query = `
    SELECT stock_code, price_change_rate
    FROM stock_info
    ORDER BY price_change_rate DESC
    LIMIT ${rank_max};`
    const [result] = await conn.execute(query);
    conn.end()
    //price_change_rate
    const data = result.map((s)=>[s.stock_code,`${s.price_change_rate}%`])
    return data
}
//하루 하락률률 순위
const rank_RateDown = async (rank_max=RANK_MAX) => {
    const conn = await connectDB()
    const query = `
    SELECT stock_code, price_change_rate
    FROM stock_info
    ORDER BY price_change_rate ASC
    LIMIT ${rank_max};`
    const [result] = await conn.execute(query);
    conn.end()
    //price_change_rate
    const data = result.map((s)=>[s.stock_code,`${s.price_change_rate}%`])
    return data
}
export { rank_VolumeQ, rank_VolumeP, rank_RateUp, rank_RateDown, rank_Capital }