import get_kospiIndex from "@/util/get_kospi";
import KospiChart from "@/components/KospiChart";
export const metadata = {
    title: 'Home'
}
const Home = async () => {
    //todo 주식 거래량 순위 10, 주식 등략률 10, 공매도 상위 10
    const data = await get_kospiIndex()
    return (
        <div className='flex w-full gap-5 mt-24'>
            <div className="flex-grow min-w-0 max-w-7xl">
                <KospiChart data={data} />
            </div>
        </div>
    )
};

export default Home;