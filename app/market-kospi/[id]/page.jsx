//todo stock info card 컴포넌트 추가
import LWChart from "@/components/LWChart";
import { symbolsData } from "@/util/db/fetch_symbols.js";
import { chartPrice_daily } from "@/util/chartdata_price_daily.js";
import { chartData_info } from "@/util/chartdata_info.js";
import TopBar_kospi from "@/components/TopBar_kospi";
import StockInfo from "@/components/StockInfo";
import styles from './styles.module.css'
export function generateMetadata({params:{id}}){
    return ({
        title: `${symbolsData[id].stock_name}`
    })
}
const StockPage = async ({params:{id},searchParams:{period}}) => {
    const stock_name = symbolsData[id].stock_name
    const { price_data, volume_data } = await chartPrice_daily(id,1000)
    const info_data = await chartData_info(id)
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <LWChart chartTitle={stock_name} data_ohlc={price_data} data_volume={volume_data}/>
            </div>
            <div className={styles.item}>
                <StockInfo data={info_data} />
            </div>
        </div>
    );
};
export default StockPage;

