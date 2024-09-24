// pages/index.js
import HighChart from "@/components/HighChart";
import StockInfo from "@/components/StockInfo";
import get_data from "@/util/get_data";
const StockPage = async ({params:{id},searchParams:{period}}) => {
    const data = await get_data(id,period)
    //RENDER
    return (
        <div>
            <div className='flex w-full gap-5 mt-24'>
                <div className="flex-grow min-w-0">
                    <HighChart data={data} />
                </div>
                <div className="flex-shrink-0 pr-3 basis-1/4 min-w-[300px] max-w-[350px]">
                    <StockInfo data={data[0]} />
                </div>
            </div>
        </div>
    );
};
export default StockPage;