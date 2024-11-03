"use client"
export default function LWChartLegend({ chartTitle, cursorData }) {
    //console.log(chartTitle)
    return (
        <div className="absolute left-4 z-10 bg-white p-4 rounded-lg shadow-lg opacity-90">
            <div className="text-xl font-semibold text-gray-800 mb-2">{chartTitle}</div>
            <div className="flex flex-row gap-6 text-sm text-gray-700">
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-600">시가</span>
                    <span>{cursorData?.open}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-600">고가</span>
                    <span>{cursorData?.high}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-600">저가</span>
                    <span>{cursorData?.low}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-600">종가</span>
                    <span>{cursorData?.close}</span>
                </div>
            </div>
        </div>
    )
}