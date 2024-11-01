//todo stock info card 컴포넌트 추가
import LWChart from "@/components/LWChart";
import styles from './styles.module.css';
import get_data_lwchart from "@/util/snp500/get_data_lwchart";
import { symbols_arr,symbols_obj } from "@/util/snp500/get_symbols";
import StockInfo_snp from "@/components/StockInfo_snp";
export function generateMetadata({params:{id}}){
    return ({
        title: 'TODO:CHANGE'
    })
}
const StockPage = async ({params:{id}}) => {
    if(!symbols_arr.includes(id)){ return <></> }
    const stock_name = symbols_obj[id].stock_name
    const [info_data,price_data, volume_data] = await get_data_lwchart(id)
    //RENDER
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <LWChart chartTitle={stock_name} data_ohlc={price_data} data_volume={volume_data}/>
            </div>         
            <div className={styles.item}>
                <StockInfo_snp data={info_data} />
            </div>
        
        </div>
    );
};
export default StockPage;

