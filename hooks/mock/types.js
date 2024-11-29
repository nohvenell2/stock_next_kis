/**
 * @typedef {Object} AccountInfo
 * @property {number} balance - 현재 잔액
 * @property {number} initialBalance - 초기 잔액
 * @property {string} lastUpdate - 마지막 업데이트 시간
 */

/**
 * @typedef {Object} PortfolioItem
 * @property {string} stockCode - 종목 코드
 * @property {string} stockName - 종목 이름
 * @property {number} quantity - 보유 수량
 * @property {number} avgPrice - 평균 매수가
 * @property {number} currentPrice - 현재가
 * @property {string} lastUpdate - 마지막 업데이트 시간
 */

/**
 * @typedef {Object} TradeHistory
 * @property {string} id - 거래 ID
 * @property {'BUY' | 'SELL'} type - 거래 타입
 * @property {string} stockCode - 종목 코드
 * @property {string} stockName - 종목 이름
 * @property {number} quantity - 거래 수량
 * @property {number} price - 거래 가격
 * @property {string} timestamp - 거래 시간
 * @property {number} total - 거래 총액
 */

export {};