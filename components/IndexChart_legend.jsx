"use client"
export default function IndexChart_legend({ chartTitle, cursorData }) {
    //console.log(chartTitle)
    return (
        <div className="absolute left-4 z-10 bg-white p-4 rounded-lg shadow-lg opacity-90">
            <div className="text-xl font-semibold text-gray-800 mb-2">{chartTitle}</div>
                <div className="flex flex-row gap-6 text-sm text-gray-700 justify-center">
                    <div className="flex flex-col items-start text-lg">
                        <span>{cursorData?.value}</span>
                </div>
            </div>
        </div>
    )
}
