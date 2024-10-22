import get_kospiIndex from "@/util/get_kospi";
import KospiChart from "@/components/KospiChart";
import { rank_VolumeP, rank_VolumeQ, rank_RateUp, rank_RateDown } from "@/util/get_rank";
import RankCard from "@/components/RankCard";
export const revalidate = 60 * 60 * 15;
export const metadata = {
    title: 'Home | KOSPI'
}
const Home = async () => {
    const data = await get_kospiIndex()
    const volumeRank = await rank_VolumeQ()
    const priceRank = await rank_VolumeP()
    const increaseRateRank = await rank_RateUp()
    const decreaseRateRank = await rank_RateDown()
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <KospiChart data={data} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md">
                    <RankCard title="거래량 순위" data={volumeRank} />
                    <RankCard title="거래액 순위" data={priceRank} />
                    <RankCard title="증가율 순위" data={increaseRateRank} value_color={"text-red-600 "} />
                    <RankCard title="하락율 순위" data={decreaseRateRank} value_color={"text-blue-600 "}/>
                </div>
            </div>
        </div>
    );
};

export default Home;