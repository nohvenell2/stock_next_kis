'use client';

import { useMockStorage } from '@/hooks/mock/useMockStorage';
import { useState } from 'react';

export default function StockTestPage() {
    const { accountInfo, portfolio, tradeHistory, totalValue, initializeAccount, buyStock, sellStock } = useMockStorage();
    const [tradeInput, setTradeInput] = useState({
        stockCode: '',
        stockName: '',
        quantity: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTradeInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTrade = async (type) => {
        const { stockCode, stockName, quantity } = tradeInput;
        if (!stockCode || !stockName || !quantity) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const success = type === 'BUY'
            ? await buyStock(stockCode, stockName, Number(quantity))
            : await sellStock(stockCode, stockName, Number(quantity));

        if (success) {
            setTradeInput({
                stockCode: '',
                stockName: '',
                quantity: ''
            });
        }
    };

    return (
        <div className="p-4">
            <h1>주식 모의투자 테스트</h1>

            <section className="mt-4">
                <h2>계좌 관리</h2>
                <button
                    onClick={() => initializeAccount(10000000)}
                    className="border p-2"
                >
                    계좌 초기화 (1000만원)
                </button>

                <div className="mt-4">
                    <h3>현재 계좌 정보</h3>
                    <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
                </div>
            </section>

            <section className="mt-4">
                <h2>주식 거래</h2>
                <div className="flex flex-col gap-2 max-w-sm">
                    <input
                        type="text"
                        name="stockCode"
                        value={tradeInput.stockCode}
                        onChange={handleInputChange}
                        placeholder="종목 코드"
                        className="border p-2"
                    />
                    <input
                        type="text"
                        name="stockName"
                        value={tradeInput.stockName}
                        onChange={handleInputChange}
                        placeholder="종목 이름"
                        className="border p-2"
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={tradeInput.quantity}
                        onChange={handleInputChange}
                        placeholder="수량"
                        className="border p-2"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleTrade('BUY')}
                            className="border p-2 flex-1"
                        >
                            매수
                        </button>
                        <button
                            onClick={() => handleTrade('SELL')}
                            className="border p-2 flex-1"
                        >
                            매도
                        </button>
                    </div>
                </div>
            </section>

            <section className="mt-4">
                <h2>포트폴리오 요약</h2>
                <pre>{JSON.stringify(totalValue, null, 2)}</pre>
            </section>

            <section className="mt-4">
                <h2>포트폴리오 상세</h2>
                <pre>{JSON.stringify(portfolio, null, 2)}</pre>
            </section>

            <section className="mt-4">
                <h2>거래 내역</h2>
                <pre>{JSON.stringify(tradeHistory, null, 2)}</pre>
            </section>
        </div>
    );
}