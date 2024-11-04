import IndexChart from "@/components/chart/IndexChart"
import RankCard from "@/components/RankCard"
import { chartData_index } from "@/util/chartdata_index.js"
import { rank_Info } from "@/util/db/rank_info"
import { formatBigNumber_en, formatBigNumber_kr, formatMarketCap_kr, formatNumberComma } from "@/util/format_number"

export default async function Page({ params: { market } }) {
    const RankNumb = 5;
    let index_data, chart_title, currency_index, formatBigNumber_market;
    if (market == 'kospi') {
        index_data = await chartData_index('KOSPI', 3650)
        chart_title = 'KOSPI'
        formatBigNumber_market = formatMarketCap_kr
        currency_index = '₩'
    } else if (market == 'snp500') {
        index_data = await chartData_index('SP500', 3650)
        chart_title = 'S&P 500'
        formatBigNumber_market = formatBigNumber_kr
        currency_index = '$'
    } else {
        return <></>
    }
    const volumeRank = (await rank_Info(market, 'volume', RankNumb)).map((d) => [d[0], d[1], formatBigNumber_kr(d[2], undefined, ' 주')])
    const capitalRank = (await rank_Info(market, 'market_cap', RankNumb)).map((d) => [d[0], d[1], formatBigNumber_market(d[2], currency_index)])
    const increaseRateRank = (await rank_Info(market, 'rate', RankNumb)).map((d) => [d[0], d[1], formatNumberComma(d[2], '','%')])
    const decreaseRateRank = ( await rank_Info(market, 'rate', RankNumb, 'ASC')).map((d) => [d[0], d[1], formatNumberComma(d[2], '','%')])
    return (
        <div className="flex w-full gap-5 mt-24 justify-center">
            <div className="flex-grow min-w-0 max-w-7xl">
                <IndexChart data_index={index_data} chartTitle={chart_title} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md">
                    <RankCard market={market} title="시가총액 순위" data={capitalRank} />
                    <RankCard market={market} title="거래 순위" data={volumeRank} />
                    <RankCard market={market} title="상승률 순위" data={increaseRateRank} value_color={"text-red-600 "} />
                    <RankCard market={market} title="하락률 순위" data={decreaseRateRank} value_color={"text-blue-600 "} />
                </div>
            </div>
        </div>
    );
};
