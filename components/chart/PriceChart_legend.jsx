"use client"
import { formatNumberComma } from "@/util/format_number"
export default function PriceChartLegend({ chartTitle, cursorData }) {
    //console.log(chartTitle)
    return (
        <div className="absolute left-4 z-10 bg-white p-4 rounded-lg shadow-lg opacity-90">
            {cursorData?.time ?
                <div>
                    <div className="text-xl font-semibold text-gray-800 mb-2">
                        <span>{chartTitle}</span>
                        <span className="text-sm ml-10">{`${cursorData.time}`}</span>
                    </div>
                    <div className="flex flex-row gap-6 text-sm text-gray-700">
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-600">시가</span>
                            <span>{formatNumberComma(cursorData.open)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-600">고가</span>
                            <span>{formatNumberComma(cursorData.high)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-600">저가</span>
                            <span>{formatNumberComma(cursorData.low)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-600">종가</span>
                            <span>{formatNumberComma(cursorData.close)}</span>
                        </div>
                    </div>
                </div> :
                <></>
            }
        </div>
    )
}