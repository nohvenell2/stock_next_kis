"use client"
import styles from './PriceChart_legend.module.scss'
export default function PriceChartLegend({ chartTitle, cursorData }) {
    let price_sign;
    if (cursorData?.time) price_sign = cursorData.close > cursorData.open ? 1 : 0
    return (
        <div className='p-2'>
            {cursorData?.time ?
                <div className={styles.container_ohlc}>
                    <div className={styles.date}>{cursorData.time.slice(2)}</div>
                    <div className={styles.ohlc_default}>
                        <div className={styles.title}>시</div>
                        <div className={styles.price} style={{ color: price_sign ? 'red' : 'blue' }}>{Number(cursorData.open).toLocaleString()}</div>
                    </div>
                    <div className={styles.ohlc_default}>
                        <div className={styles.title}>고</div>
                        <div className={styles.price} style={{ color: price_sign ? 'red' : 'blue' }}>{Number(cursorData.high).toLocaleString()}</div>
                    </div>
                    <div className={styles.ohlc_default}>
                        <div className={styles.title}>정</div>
                        <div className={styles.price} style={{ color: price_sign ? 'red' : 'blue' }}>{Number(cursorData.low).toLocaleString()}</div>
                    </div>
                    <div className={styles.ohlc_default}>
                        <div className={styles.title}>종</div>
                        <div className={styles.price} style={{ color: price_sign ? 'red' : 'blue' }}>{Number(cursorData.close).toLocaleString()}</div>
                    </div>
                    <div className={styles.date} style={{ color: price_sign ? 'red' : 'blue' }}>{`${(100 * (cursorData.close - cursorData.open) / cursorData.open).toFixed(2)}%`}</div>
                </div>
                : <></>}
        </div>
    )
}
