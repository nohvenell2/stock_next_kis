import { formatBigNumber_kr, formatMarketCap_kr } from '@/util/format_number'
import styles from './StockInfo.module.scss'
export default function StockInfo({ data }) {
    const { sector_name, market_cap, volume, amount, eps, pbr, per, bps, week52_high, week52_low, currency, week52_high_date, week52_low_date } = data
    const currency_symbol = { 'KRW': '₩', 'USD': '$' }[currency]
    const marketcap_function = { 'KRW': formatMarketCap_kr, 'USD': formatBigNumber_kr }[currency]
    const week52_high_date_short = `${week52_high_date.getFullYear()}-${week52_high_date.getMonth()+1}-${week52_high_date.getDate()}`
    const week52_low_date_short = `${week52_low_date.getFullYear()}-${week52_low_date.getMonth()+1}-${week52_low_date.getDate()}`
    return (
        <div className={styles.container}>
            {/* 그룹이름 */}
            <div className={styles.info}>
                <div className={styles.title}>종목 분류</div>
                <div className={styles.value}>{sector_name}</div>
            </div>
            {/* 시가총액 */}
            <div className={styles.info}>
                <div className={styles.title}>시가총액</div>
                <div className={styles.value}>{marketcap_function(market_cap,currency_symbol)}</div>
            </div>
            {/* 거래량 */}
            <div className={styles.info}>
                <div className={styles.title}>거래량</div>
                <div className={styles.value}>{formatBigNumber_kr(volume,'','주')}</div>
            </div>
            {/* 거래금액 */}
            <div className={styles.info}>
                <div className={styles.title}>거래 금액</div>
                <div className={styles.value}>{formatBigNumber_kr(amount,currency_symbol)}</div>
            </div>
            {/* week52 high */}
            <div className={styles.info}>
                <div className={styles.title}>52주 최고가</div>
                <div className={styles.value}>{`${currency_symbol}${Number(week52_high).toLocaleString()}`}</div>
                <div className={styles.tooltip}>
                    <div className={styles.tooltiptext}>{week52_high_date_short}</div>
                </div>
            </div>
            {/* week52 low*/}
            <div className={styles.info}>
                <div className={styles.title}>52주 최저가</div>
                <div className={styles.value}>{`${currency_symbol}${Number(week52_low).toLocaleString()}`}</div>
                <div className={styles.tooltip}>
                    <div className={styles.tooltiptext}>{week52_low_date_short}</div>
                </div>
            </div>
            {/* eps */}
            <div className={styles.info}>
                <div className={styles.title}>EPS</div>
                <div className={styles.value}>{Number(eps).toLocaleString()}</div>
                <div className={styles.tooltip}>
                    <div className={styles.tooltiptext}>주당순이익</div>
                </div>
            </div>
            {/* bps */}
            <div className={styles.info}>
                <div className={styles.title}>BPS</div>
                <div className={styles.value}>{Number(bps).toLocaleString()}</div>
                <div className={styles.tooltip}>
                    <div className={styles.tooltiptext}>주당순자산가치</div>
                </div>
            </div>
            {/* per */}
            <div className={styles.info}>
                <div className={styles.title}>PER</div>
                <div className={styles.value}>{Number(per).toLocaleString()}</div>
                <div className={styles.tooltip}>
                    <div className={styles.tooltiptext}>주가수익비율</div>
                </div>
            </div>
            {/* pbr */}
            <div className={styles.info}>
                <div className={styles.title}>PBR</div>
                <div className={styles.value}>{Number(pbr).toLocaleString()}</div>
                <div className={styles.tooltip}>
                    <div className={styles.tooltiptext}>주가순자산비율</div>
                </div>
            </div>
        </div>
    )
}