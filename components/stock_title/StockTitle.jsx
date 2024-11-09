import styles from './StockTitle.module.scss'
export default function StockTitle({data}){
    const {symbol, market, price, stock_name, change, rate, currency} = data
    const change_sign = Number(rate) > 0? '+':''
    const currency_symbol = {'KRW':'₩','USD':'$'}[currency]
    return (
        <div className={styles.container}>
            <div className={styles.stock_title}>
                <div className={styles.stock_name}>{stock_name}</div>
                <div className={styles.symbol}>{`[ ${symbol} ]`}</div>
                <div className={styles.market}>{market}</div>
            </div>
            <div className={styles.stock_price}>
                <div className={styles.price}>{`${currency_symbol}${price}`}</div>
                <div className={styles.change} style={{color: change_sign == '+'? 'red' : 'blue'}}>{`${change_sign}${change}`}</div>
                <div className={styles.rate} style={{color: change_sign == '+'? 'red' : 'blue'}}>{`(${change_sign}${rate}%)`}</div>
            </div>
        </div>
    )
}