import get_kospiIndex from "@/util/get_kospi";
import KospiChart from "@/components/KospiChart";
import { rank_VolumeP,rank_VolumeQ, rank_RateUp, rank_RateDown } from "@/util/get_rank";
import { stock_code_name } from "../constants/stock_code_name";
import Link from "next/link";
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
        <div className="flex w-full gap-5 mt-24">
            <div className="flex-grow min-w-0 max-w-7xl justify-self-center">
                <KospiChart data={data} />
                {/* 4개의 순위를 그리드로 배치 */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                    {/* 거래량 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">주식 거래량 순위</h2>
                        <ul className="space-y-2">
                            {volumeRank.map((stock, index) => (
                                <li key={index} className="text-lg">
                                    <Link href={`/stock-info/${stock.stock_code}?period=D`}>
                                        {index + 1}. {stock_code_name[stock.stock_code]} - {stock.accumulated_volume}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* 거래 가격 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">주식 거래 가격 순위</h2>
                        <ul className="space-y-2">
                            {priceRank.map((stock, index) => (
                                <li key={index} className="text-lg">
                                    <Link href={`/stock-info/${stock.stock_code}?period=D`}>
                                        {index + 1}. {stock_code_name[stock.stock_code]} - {stock.accumulated_tr_pbmn}원
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* 증가율 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">주식 증가율 순위</h2>
                        <ul className="space-y-2">
                            {increaseRateRank.map((stock, index) => (
                                <li key={index} className="text-lg">
                                    <Link href={`/stock-info/${stock.stock_code}?period=D`}>
                                        {index + 1}. {stock_code_name[stock.stock_code]}  {stock.price_change_rate}%
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* 감소율 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">주식 감소율 순위</h2>
                        <ul className="space-y-2">
                            {decreaseRateRank.map((stock, index) => (
                                <li key={index} className="text-lg">
                                    <Link href={`/stock-info/${stock.stock_code}?period=D`}>
                                        {index + 1}. {stock_code_name[stock.stock_code]}  {stock.price_change_rate}%
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;