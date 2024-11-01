import LWChart from "@/components/LWChart";
//import StockInfo from "@/components/StockInfo";
import { stock_code_name } from "@/constants/stock_code_name";
import styles from './styles.module.css'
import get_data_lwchart from "@/util/get_data_lwchart";
export function generateMetadata({params:{id}}){
    return ({
        title: stock_code_name[id]
    })
}
const StockPage = async ({params:{id},searchParams:{period}}) => {
    const [info_data,price_data, volume_data] = await get_data_lwchart(id,period)
    //const [info_data,price_data, volume_data] = await get_data_lwchart('005380',period)
    //RENDER
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <LWChart chartTitle={stock_code_name[id]} data_ohlc={price_data} data_volume={volume_data}/>
            </div>
{/*             <div className={styles.item}>
                <StockInfo data={info_data} />
            </div> */}
        </div>
    );
};
export default StockPage;

