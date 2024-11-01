import get_kospiIndex from "@/util/get_kospi";
import KospiChart from "@/components/KospiChart";
import { rank_VolumeP,rank_VolumeQ, rank_RateUp, rank_RateDown } from "@/util/get_rank";
import RankCard from "@/components/RankCard";
export const metadata = {
    title: 'HOME'
}
const Home = async () => {
    const data = await get_kospiIndex()
    const volumeRank = await rank_VolumeQ()
    const priceRank = await rank_VolumeP()
    const increaseRateRank = await rank_RateUp()
    const decreaseRateRank = await rank_RateDown()
    return (
        <div className="flex w-full gap-5 mt-24 justify-center">
            <div className="flex-grow min-w-0 max-w-7xl">
                <KospiChart data={data} />
                {/* 4개의 순위를 그리드로 배치 */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                    {/* 거래량 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard title ="주식 거래량 순위" data={volumeRank}/>
                    </div>
                    {/* 거래 가격 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard title ="주식 거래액 순위" data={priceRank}/>
                    </div>
                    {/* 증가율 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard title ="주가 증가율 순위" data={increaseRateRank}/>
                    </div>
                    {/* 감소율 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard title ="주식 하락율 순위" data={decreaseRateRank}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;