import StockChart from "@/components/TempChart";
import get_data from "@/util/get_data";
function modTime(time) {
    const date = new Date(time)
    const yy = String(date.getFullYear()); // 연도의 마지막 두 자리만 사용
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 맞춤
    const dd = String(date.getDate()).padStart(2, '0'); // 일, 두 자리로 맞춤
    return `${yy}-${mm}-${dd}`;
}

export default async function Page() {
    const data = await get_data('005930')
    const price_data = data[1]
    const volume_data = data[2]
    const priceData = price_data.map((d) => {
        return { time: modTime(d[0]), open: d[1], high: d[2], low: d[3], close: d[4] }
    })
    const volumeData = volume_data.map((d) => {
        return { time: modTime(d[0]), value: d[1] }
    })

    return (
        <div className="mt-12">
            <StockChart ohlc = {priceData} volume = {volumeData}/>
        </div>
    )
}