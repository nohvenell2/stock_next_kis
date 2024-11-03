import { fetchInfo } from "./db/fetch_info.js";
/**
 * 주식 심볼로 데이터를 가져와서 필요한 값을 숫자로 변환하여 반환하는 함수
 * @param {string} symbol - 주식의 심볼
 * @returns {Promise<InfoData>} 변환된 주식 데이터 배열
 */
async function chartData_info(symbol) {
    const data = await fetchInfo(symbol);
    const result = {
        symbol: data.symbol,
        stock_name: data.stock_name,
        market: data.market,
        sector_name: data.sector_name,
        price: data.price ? parseFloat(data.price) : null,
        volume: data.volume ? parseInt(data.volume, 10) : null,
        amount: data.amount ? parseInt(data.amount, 10) : null,
        market_cap: data.market_cap ? parseInt(data.market_cap) : null,
        sign: data.sign,
        risk: data.risk,
        halt: data.halt ? Boolean(parseInt(data.halt, 10)) : null,
        overbought: data.overbought ? Boolean(parseInt(data.overbought, 10)) : null,
        prev_price: data.prev_price ? parseFloat(data.prev_price) : null,
        prev_volume: data.prev_volume ? parseInt(data.prev_volume, 10) : null,
        change: data.change ? parseFloat(data.change) : null,
        high_limit: data.high_limit ? parseFloat(data.high_limit) : null,
        low_limit: data.low_limit ? parseFloat(data.low_limit) : null,
        unit: data.unit ? parseFloat(data.unit) : null,
        tick: data.tick ? parseFloat(data.tick) : null,
        decimal_places: data.decimal_places ? parseInt(data.decimal_places, 10) : null,
        currency: data.currency,
        exchange_rate: data.exchange_rate ? parseFloat(data.exchange_rate) : null,
        open: data.open ? parseFloat(data.open) : null,
        high: data.high ? parseFloat(data.high) : null,
        low: data.low ? parseFloat(data.low) : null,
        close: data.close ? parseFloat(data.close) : null,
        rate: data.rate ? parseFloat(data.rate) : null,
        sign_name: data.sign_name,
        eps: data.eps ? parseFloat(data.eps) : null,
        bps: data.bps ? parseFloat(data.bps) : null,
        per: data.per ? parseFloat(data.per) : null,
        pbr: data.pbr ? parseFloat(data.pbr) : null,
        week52_high: data.week52_high ? parseFloat(data.week52_high) : null,
        week52_low: data.week52_low ? parseFloat(data.week52_low) : null,
        week52_high_date: data.week52_high_date ? data.week52_high_date : null,
        week52_low_date: data.week52_low_date ? data.week52_low_date : null,
    };
    return result;
}
//chartData_info('005930').then((d)=>console.table(d))
export { chartData_info }

/**
 * @typedef {Object} InfoData
 * @property {string} symbol - 주식의 심볼.
 * @property {string} stock_name - 주식 이름.
 * @property {string|null} market - 주식이 상장된 시장 (있을 경우).
 * @property {string|null} sector_name - 주식의 섹터 이름 (있을 경우).
 * @property {number|null} price - 현재 주식 가격.
 * @property {number|null} volume - 거래량.
 * @property {number|null} amount - 총 거래 금액.
 * @property {number|null} market_cap - 시가 총액.
 * @property {string|null} sign - 주식 변동을 나타내는 기호.
 * @property {string|null} risk - 주식의 위험 수준.
 * @property {boolean|null} halt - 주식 거래 중지 여부 (1은 참, 0은 거짓).
 * @property {boolean|null} overbought - 주식이 과매수인지 여부 (1은 참, 0은 거짓).
 * @property {number|null} prev_price - 전일 종가.
 * @property {number|null} prev_volume - 전일 거래량.
 * @property {number|null} change - 가격 변동.
 * @property {number|null} high_limit - 상한가.
 * @property {number|null} low_limit - 하한가.
 * @property {number|null} unit - 단위 가격.
 * @property {number|null} tick - 틱 크기.
 * @property {number|null} decimal_places - 소수점 자리수.
 * @property {string|null} currency - 주식 거래 통화.
 * @property {number|null} exchange_rate - 통화의 환율.
 * @property {number|null} open - 시가.
 * @property {number|null} high - 당일 최고가.
 * @property {number|null} low - 당일 최저가.
 * @property {number|null} close - 종가.
 * @property {number|null} rate - 변동률.
 * @property {string|null} sign_name - 주식 변동을 나타내는 기호 이름.
 * @property {number|null} eps - 주당 순이익.
 * @property {number|null} bps - 주당 장부가치.
 * @property {number|null} per - 주가수익비율.
 * @property {number|null} pbr - 주가순자산비율.
 * @property {number|null} week52_high - 52주 최고가.
 * @property {number|null} week52_low - 52주 최저가.
 * @property {Date|null} week52_high_date - 52주 최고가 날짜.
 * @property {Date|null} week52_low_date - 52주 최저가 날짜.
 */