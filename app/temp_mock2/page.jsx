'use client'
import { useMockStorage } from '@/hooks/mock/useMockStorage'

// 계좌 정보만 보여주는 컴포넌트

function AccountStatus() {
    const { accountInfo, isLoading } = useMockStorage();

    if (isLoading) return <div>로딩 중...</div>;

    return (
        <div className="mb-6 p-4 border rounded bg-white">
            <h2 className="text-xl font-bold mb-2">실시간 계좌 현황</h2>
            <p>초기 자금: {accountInfo?.initialBalance?.toLocaleString()}원</p>
            <p>현재 잔고: {accountInfo?.balance?.toLocaleString()}원</p>
        </div>
    );
}

// 포트폴리오 현황만 보여주는 컴포넌트
function PortfolioStatus() {
    const { portfolio, isLoading } = useMockStorage();

    if (isLoading) return <div>로딩 중...</div>;

    return (
        <div className="mb-6 p-4 border rounded bg-white">
            <h2 className="text-xl font-bold mb-2">실시간 포트폴리오 현황</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">종목명</th>
                            <th className="p-2 border">수량</th>
                            <th className="p-2 border">평가손익</th>
                            <th className="p-2 border">수익률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map((item) => (
                            <tr key={item.stockCode}>
                                <td className="p-2 border">{item.stockName}</td>
                                <td className="p-2 border text-right">{item.quantity}</td>
                                <td className="p-2 border text-right">{item.unrealizedProfit.toLocaleString()}</td>
                                <td className="p-2 border text-right">{item.profitRate.toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 매수/매도 기능을 가진 메인 컴포넌트
function TradeActions() {
    const { buyStock, sellStock, portfolio } = useMockStorage();

    return (
        <div className="mb-6 p-4 border rounded bg-white">
            <h2 className="text-xl font-bold mb-2">매수/매도 실행</h2>
            <div className="space-y-2">
                {portfolio.map((item) => (
                    <div key={item.stockCode} className="flex items-center justify-between p-2 border rounded">
                        <span>{item.stockName}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => buyStock(item.stockCode, item.stockName, 1)}
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                매수
                            </button>
                            <button
                                onClick={() => sellStock(item.stockCode, item.stockName, 1)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                매도
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 메인 페이지 컴포넌트
export default function TempMock2() {
    return (
        <div className="p-4 space-y-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">실시간 모의투자 현황</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <AccountStatus />
                    <PortfolioStatus />
                </div>
                <div>
                    <TradeActions />
                </div>
            </div>
        </div>
    );
}