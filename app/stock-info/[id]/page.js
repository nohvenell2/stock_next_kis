// pages/index.js
import HighChart from "@/components/HighChart";
import StockInfo from "@/components/StockInfo";
import { stock_code_name } from "@/constants/stock_code_name.js";
import get_data from "@/util/get_data";
import styles from './styles.module.css'
export function generateMetadata({params:{id}}){
    return ({
        title: stock_code_name[id]
    })
}
const StockPage = async ({params:{id},searchParams:{period}}) => {
    const data = await get_data(id,period)
    //RENDER
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <HighChart data={data}/>
            </div>
            <div className={styles.item}>
                <StockInfo data={data[0]} />
            </div>
        </div>
    );
};
export default StockPage;

