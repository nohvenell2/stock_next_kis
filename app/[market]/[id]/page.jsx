//todo stock info card 컴포넌트 추가
import PriceChart from "@/components/chart/PriceChart";
import { symbolsData } from "@/util/db/fetch_symbols.js";
import { chartPrice_daily } from "@/util/chartdata_price_daily.js";
import { chartData_info } from "@/util/chartdata_info.js";
import StockInfo from "@/components/StockInfoCard";
import styles from './styles.module.css'
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
            <div className={styles.item}>
                <PriceChart market={market} chartTitle={stock_name} data_ohlc={price_data} data_volume={volume_data}/>
            </div>
            <div className={styles.item}>
                <StockInfo data={info_data} />
            </div>
        </div>
    );
};
export default StockPage;

