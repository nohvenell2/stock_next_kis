import get_kospiIndex from "@/util/get_kospi";
import KospiChart from "@/components/KospiChart";
import { rank_VolumeQ, rank_RateUp, rank_RateDown, rank_Capital } from "@/util/get_rank";
import RankCard from "@/components/RankCard";
export const revalidate = 60 * 30;
export const metadata = {
    title: 'Home | KOSPI'
}
const Home = async () => {
    const data = await get_kospiIndex()
    const capitalRank = await rank_Capital()
    const volumeRank = await rank_VolumeQ()
    const increaseRateRank = await rank_RateUp()
    const decreaseRateRank = await rank_RateDown()

    /* const priceRank = await rank_VolumeP() */
    return (
        <div className="container mx-auto px-4 py-8 mt-8">
            <div className="max-w-7xl mx-auto">
                <KospiChart data={data} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md">
                    <RankCard title="시가총액 순위" data={capitalRank} />
                    <RankCard title="거래 순위" data={volumeRank} />
                    <RankCard title="상승률 순위" data={increaseRateRank} value_color={"text-red-600 "} />
                    <RankCard title="하락률 순위" data={decreaseRateRank} value_color={"text-blue-600 "}/>
                </div>
            </div>
        </div>
    );
};

export default Home;