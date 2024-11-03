import IndexChart from "@/components/IndexChart"
import RankCard from "@/components/RankCard"
import { chartData_index } from "@/util/chartdata_index.js"
import { rank_Info } from "@/util/db/rank_info"
import { formatBigNumber_en, formatBigNumber_kr } from "@/util/format_number"
export default async function Page({params:{market}}){
    let index_data,chart_title,formatBigNumber_price,currency_index;
    if (market == 'kospi') {
        index_data = await chartData_index('KOSPI',3000)
        chart_title = 'KOSPI'
        formatBigNumber_price = formatBigNumber_kr
        currency_index = ''
    }else if (market == 'snp500'){
        index_data = await chartData_index('SP500',3000)
        chart_title = 'S&P 500'
        formatBigNumber_price = formatBigNumber_en
        currency_index = '$'
    }
    const volumeRank = (await rank_Info(market,'volume',10)).map((d) => [d[0],d[1],formatBigNumber_kr(d[2],undefined,' 주')])
    const amountRank = (await rank_Info(market,'amount',10)).map((d) => [d[0],d[1],formatBigNumber_price(d[2],currency_index)])
    const increaseRateRank = await rank_Info(market,'rate',10)
    const decreaseRateRank = await rank_Info(market,'rate',10,'ASC')
    return (
        <div className="flex w-full gap-5 mt-24 justify-center">
            <div className="flex-grow min-w-0 max-w-7xl">
                <IndexChart data_index={index_data} chartTitle={chart_title}/>
                {/* 4개의 순위를 그리드로 배치 */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                    {/* 거래량 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard market={market} title ="주식 거래량 순위" data={volumeRank}/>
                    </div>
                    {/* 거래 가격 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard market={market} title ="주식 거래액 순위" data={amountRank}/>
                    </div>
                    {/* 증가율 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard market={market} title ="주가 증가율 순위" data={increaseRateRank}/>
                    </div>
                    {/* 감소율 순위 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <RankCard market={market} title ="주식 하락율 순위" data={decreaseRateRank}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
