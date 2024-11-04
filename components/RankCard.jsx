import Link from "next/link";
export default function RankCard({ market, title, data, value_color }){
    const valueColor = value_color ? value_color : "text-gray-600 "
    return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
        <ul className="space-y-2">
            {data.map((d, i) => (
                <li key={i}>
                    <Link href={`/${market}/${encodeURIComponent(d[0])}`} className="flex items-center justify-between py-2 px-3 rounded-lg transition-colors duration-200 hover:bg-gray-100">
                        <span className="flex items-center space-x-2">
                            <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-medium">
                                {i + 1}
                            </span>
                            <span className="text-gray-700">{d[1]}</span>
                        </span>
                        <span className={valueColor+"font-medium"}>{d[2]}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)};