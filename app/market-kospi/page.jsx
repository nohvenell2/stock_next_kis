//export const revalidate = 60 * 30;
export function generateMetadata({ params: { id } }) {
    return ({
        title: 'KOSPI'
    })
}
/* const Page = async () => {
    const data = await get_kospiIndex()
    const capitalRank = await rank_Capital()
    const volumeRank = await rank_VolumeQ()
    const increaseRateRank = await rank_RateUp()
    const decreaseRateRank = await rank_RateDown()
    return (
        <div>
            <TopBar_snp500 />
            <div className="container mx-auto px-4 py-8 mt-8">
                <div className="max-w-7xl mx-auto">
                    <KospiChart data={data} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md">
                        <RankCard title="시가총액 순위" data={capitalRank} />
                        <RankCard title="거래 순위" data={volumeRank} />
                        <RankCard title="상승률 순위" data={increaseRateRank} value_color={"text-red-600 "} />
                        <RankCard title="하락률 순위" data={decreaseRateRank} value_color={"text-blue-600 "} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page; */
function Page(){
    return <>공사중</>
}
export default Page