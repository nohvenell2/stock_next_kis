//todo 더이상 사용하지 않는 주소
import { symbolsData } from "@/util/db/fetch_symbols.js";
import { chartPrice_daily } from "@/util/chartdata_price_daily.js";
import { chartData_info } from "@/util/chartdata_info.js";
import styles from './styles.module.scss'
import PriceChart from "@/components/chart/PriceChart";
import StockTitle from "@/components/stock_title/StockTitle";
import StockInfo from "@/components/stock_info/StockInfo";
export function generateMetadata({params:{id}}){
    const symbol = decodeURIComponent(id)
    return ({
        title: `${symbolsData[symbol].stock_name}`
    })
}
const StockPage = async ({params:{id, market}}) => {
    const symbol = decodeURIComponent(id)
    const stock_name = symbolsData[symbol].stock_name
    const { price_data, volume_data } = await chartPrice_daily(symbol,1825)
    const info_data = await chartData_info(symbol)
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <StockTitle data={info_data} />
            </div>
            <div className={styles.chart}>
                <PriceChart market={market} chartTitle={stock_name} data_ohlc={price_data} data_volume={volume_data} stockCode={symbol}/>
            </div>
            <div className={styles.info}>
                <StockInfo data={info_data} />
            </div>
        </div>
    );
};
export default StockPage;

