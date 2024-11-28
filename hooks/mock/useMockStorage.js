'use client'
import { useState, useCallback, useEffect } from 'react';
import { AccountInfo, PortfolioItem, TradeHistory } from './types';
import Swal from 'sweetalert2';
/**
 * 포트폴리오 현재가 업데이트 및 수익률 계산
 * @param {PortfolioItem[]} portfolio - 포트폴리오 배열
 * @returns {Promise<PortfolioItem[]>} 업데이트된 포트폴리오
 */
async function updatePortfolioPrices(portfolio) {
    if (portfolio.length === 0) return [];

    try {
        const symbols = portfolio.map(item => item.stockCode).join(',');
        const response = await fetch(`/api/stock/current-price?symbols=${symbols}`);
        const currentPrices = await response.json();

        return portfolio.map(item => {
            const currentPrice = currentPrices[item.stockCode];
            const invested = item.quantity * item.avgPrice;
            const marketValue = item.quantity * currentPrice;
            const unrealizedProfit = marketValue - invested;
            const profitRate = (unrealizedProfit / invested) * 100;

            return {
                ...item,
                currentPrice,
                marketValue,
                unrealizedProfit,
                profitRate,
                lastUpdate: getKSTString()
            };
        });
    } catch (error) {
        console.error('포트폴리오 가격 업데이트 실패:', error);
        return portfolio;
    }
}
const getKSTString = () => {
    const now = new Date();
    const kstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    return kstDate.toISOString();
};
/**
 * 업데이트 시간 체크
 * @param {Date} now - 현재 시간
 * @returns {boolean} 업데이트 필요 여부
 */
const isUpdateTime = (now) => {
    const kstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    const hour = kstDate.getHours();
    const minute = kstDate.getMinutes();
    
    // 평일 체크
    if (now.getDay() === 0 ) return false;

    // 장 시작 시간대 (9:30 ~ 9:45)
    if (hour === 9 && minute >= 30 && minute <= 45) {
        return true;
    }
    
    // 장 마감 시간대 (16:00 ~ 16:15)
    if (hour === 16 && minute >= 0 && minute <= 15) {
        return true;
    }

    return false;
};
/**
 * 단일 종목의 현재가 조회
 * @param {string} stockCode - 종목 코드
 * @returns {Promise<number|null>} 현재가
 */
const fetchCurrentPrice = async (stockCode) => {
    try {
        const response = await fetch(`/api/stock/current-price?symbols=${stockCode}`);
        const data = await response.json();
        const price = Number(data[stockCode]);
        return price;
    } catch (error) {
        console.error('현재가 조회 실패:', error);
        return null;
    }
};
// 이벤트 정의
const MOCK_STORAGE_CHANGE_EVENT = 'mockStorageChanged';
const STORAGE_KEYS = {
    ACCOUNT: 'stockAccount',
    PORTFOLIO: 'stockPortfolio',
    HISTORY: 'stockTradeHistory'
};
/**
 * 주식 모의투자 데이터를 관리하는 커스텀 훅
 * @returns {{
 *   accountInfo: AccountInfo | null,
 *   portfolio: PortfolioItem[],
 *   tradeHistory: TradeHistory[],
 *   initializeAccount: (initialBalance: number) => void,
 *   buyStock: (stockCode: string, stockName: string, quantity: number) => boolean,
 *   sellStock: (stockCode: string, stockName: string, quantity: number) => boolean
 * }}
 */
export const useMockStorage = () => {
    const [accountInfo, setAccountInfo] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const [tradeHistory, setTradeHistory] = useState([]);
    const [totalValue, setTotalValue] = useState({
        invested: 0,
        marketValue: 0,
        unrealizedProfit: 0,
        profitRate: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    // 변경사항을 다른 컴포넌트에 알리는 ���수
    const notifyStorageChange = useCallback(() => {
        window.dispatchEvent(new Event(MOCK_STORAGE_CHANGE_EVENT));
    }, []);

    /**
     * 초기 데이터 생성
     * @param {number} initialBalance - 초기 잔액
     */
    const initializeAccount = useCallback((initialBalance) => {
        const newAccount = {
            balance: initialBalance,
            initialBalance,
            lastUpdate: getKSTString()
        };

        localStorage.setItem('stockAccount', JSON.stringify(newAccount));
        localStorage.setItem('stockPortfolio', JSON.stringify([]));
        localStorage.setItem('stockTradeHistory', JSON.stringify([]));

        setAccountInfo(newAccount);
        setPortfolio([]);
        setTradeHistory([]);
    }, []);

    /**
     * 저장된 데이터 로드
     */
    const loadStoredData = useCallback(() => {
        try {
            const storedAccount = localStorage.getItem(STORAGE_KEYS.ACCOUNT);
            const storedPortfolio = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
            const storedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);

            if (storedAccount) setAccountInfo(JSON.parse(storedAccount));
            if (storedPortfolio) {
                const portfolioData = JSON.parse(storedPortfolio);
                setPortfolio(portfolioData);
                calculateTotalValue(portfolioData);
            }
            if (storedHistory) setTradeHistory(JSON.parse(storedHistory));
        } catch (error) {
            console.error('Failed to load stored data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 초기 로딩과 이벤트 리스너 설정
    useEffect(() => {
        const handleStorageChange = () => {
            loadStoredData();
        };

        loadStoredData();
        window.addEventListener(MOCK_STORAGE_CHANGE_EVENT, handleStorageChange);

        return () => {
            window.removeEventListener(MOCK_STORAGE_CHANGE_EVENT, handleStorageChange);
        };
    }, [loadStoredData]);

    // 포트폴리오 총 가치 계산
    const calculateTotalValue = useCallback((portfolioData) => {
        const total = portfolioData.reduce((acc, item) => ({
            invested: acc.invested + (item.quantity * item.avgPrice),
            marketValue: acc.marketValue + (item.quantity * item.currentPrice),
            unrealizedProfit: acc.unrealizedProfit + item.unrealizedProfit
        }), { invested: 0, marketValue: 0, unrealizedProfit: 0 });

        total.profitRate = total.invested > 0
            ? (total.unrealizedProfit / total.invested) * 100
            : 0;

        setTotalValue(total);
    }, []);

    // 초기 로드시 업데이트
    useEffect(() => {
        const updatePrices = async () => {
            if (portfolio.length === 0) return;

            console.log('포트폴리오 가격 업데이트:', new Date().toLocaleString());
            const updatedPortfolio = await updatePortfolioPrices(portfolio);
            
            setPortfolio(updatedPortfolio);
            calculateTotalValue(updatedPortfolio);
            localStorage.setItem('stockPortfolio', JSON.stringify(updatedPortfolio));
        };

        updatePrices();

        const interval = setInterval(() => {
            const now = new Date();
            if (isUpdateTime(now)) {
                updatePrices();
            }
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    /**
     * 매수 주문 처리
     * @param {string} stockCode - 종목 코드
     * @param {string} stockName - 종목 이름
     * @param {number} quantity - 매수 수량
     * @returns {Promise<{success: boolean, trade?: TradeHistory, balance?: number}>} 매수 성공 여부와 거래 정보
     */
    const buyStock = useCallback(async (stockCode, stockName, quantity) => {
        // 현재가 조회
        const currentPrice = await fetchCurrentPrice(stockCode);
        if (!currentPrice) {
            await Swal.fire({
                icon: 'error',
                title: '현재가 조회 실패',
                text: '현재가 조회에 실패했습니다.',
                timer: 5000
            });
            return { success: false };
        }

        const totalAmount = quantity * currentPrice;

        // 잔액 확인
        if (!accountInfo || accountInfo.balance < totalAmount) {
            await Swal.fire({
                icon: 'error',
                title: '잔액 부족',
                text: '주문 금액이 계좌 잔액보다 큽니다.',
                timer: 5000
            });
            return { success: false };
        }

        // 포트폴리오 업데이트
        const existingStock = portfolio.find(item => item.stockCode === stockCode);
        let updatedPortfolio;

        if (existingStock) {
            // 기존 보유 주식인 경우
            const newTotalQuantity = existingStock.quantity + quantity;
            const newAvgPrice = ((existingStock.quantity * existingStock.avgPrice) + totalAmount) / newTotalQuantity;

            updatedPortfolio = portfolio.map(item =>
                item.stockCode === stockCode
                    ? {
                        ...item,
                        quantity: newTotalQuantity,
                        avgPrice: newAvgPrice,
                        currentPrice,
                        marketValue: newTotalQuantity * currentPrice,
                        unrealizedProfit: (newTotalQuantity * currentPrice) - (newTotalQuantity * newAvgPrice),
                        profitRate: ((currentPrice - newAvgPrice) / newAvgPrice) * 100,
                        lastUpdate: getKSTString()
                    }
                    : item
            );
        } else {
            const newStock = {
                stockCode,
                stockName,
                quantity,
                avgPrice: currentPrice,
                currentPrice,
                marketValue: quantity * currentPrice,
                unrealizedProfit: 0,
                profitRate: 0,
                lastUpdate: getKSTString()
            };
            updatedPortfolio = [...portfolio, newStock];
        }

        // 거래 내역 생성
        const newTrade = {
            id: Date.now().toString(),
            type: 'BUY',
            stockCode,
            stockName,
            quantity,
            price: currentPrice,
            timestamp: getKSTString(),
            total: totalAmount
        };

        // 계좌 정보 업데이트
        const updatedAccount = {
            ...accountInfo,
            balance: accountInfo.balance - totalAmount,
            lastUpdate: getKSTString()
        };

        // 거래 내역 배열 생성
        const updatedTradeHistory = [...tradeHistory, newTrade];

        // 상태 업데이트
        setAccountInfo(updatedAccount);
        setPortfolio(updatedPortfolio);
        setTradeHistory(updatedTradeHistory);
        calculateTotalValue(updatedPortfolio);

        // 로컬스토리지 업데이트
        localStorage.setItem(STORAGE_KEYS.ACCOUNT, JSON.stringify(updatedAccount));
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updatedPortfolio));
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedTradeHistory));

        notifyStorageChange();
        return { success: true, trade: newTrade, balance: updatedAccount.balance };
    }, [accountInfo, portfolio, tradeHistory, calculateTotalValue, notifyStorageChange]);

    /**
     * 매도 주문 처리
     * @param {string} stockCode - 종목 코드
     * @param {string} stockName - 종목 이름
     * @param {number} quantity - 매도 수량
     * @returns {Promise<{success: boolean, trade?: TradeHistory, balance?: number}>} 매도 성공 여부와 거래 정보
     */
    const sellStock = useCallback(async (stockCode, stockName, quantity) => {
        const existingStock = portfolio.find(item => item.stockCode === stockCode);

        // 보유 주식 확인
        if (!existingStock || existingStock.quantity < quantity) {
            await Swal.fire({
                icon: 'error',
                title: '매도 수량 부족',
                text: '매도 가능한 수량이 부족합니다.',
                timer: 5000
            });
            return { success: false };
        }

        // 현재가 조회
        const currentPrice = await fetchCurrentPrice(stockCode);
        if (!currentPrice) {
            await Swal.fire({
                icon: 'error',
                title: '현재가 조회 실패',
                text: '현재가 조회에 실패했습니다.',
                timer: 5000
            });
            return { success: false };
        }

        const totalAmount = quantity * currentPrice;

        // 새로운 거래 내역 생성
        const newTrade = {
            id: Date.now().toString(),
            type: 'SELL',
            stockCode,
            stockName,
            quantity,
            price: currentPrice,
            timestamp: getKSTString(),
            total: totalAmount
        };

        // 포트폴리오 업데이트
        let updatedPortfolio;
        if (existingStock.quantity === quantity) {
            // 전량 매도
            updatedPortfolio = portfolio.filter(item => item.stockCode !== stockCode);
        } else {
            // 일부 매도
            updatedPortfolio = portfolio.map(item =>
                item.stockCode === stockCode
                    ? {
                        ...item,
                        quantity: item.quantity - quantity,
                        currentPrice: currentPrice,
                        marketValue: (item.quantity - quantity) * currentPrice,
                        unrealizedProfit: ((item.quantity - quantity) * currentPrice) - ((item.quantity - quantity) * item.avgPrice),
                        profitRate: ((currentPrice - item.avgPrice) / item.avgPrice) * 100,
                        lastUpdate: getKSTString()
                    }
                    : item
            );
        }

        // 계좌 정보 업데이트
        const updatedAccount = {
            ...accountInfo,
            balance: accountInfo.balance + totalAmount,
            lastUpdate: getKSTString()
        };

        // 거래 내역 배열 생성
        const updatedTradeHistory = [...tradeHistory, newTrade];

        // 상태 업데이트
        setAccountInfo(updatedAccount);
        setPortfolio(updatedPortfolio);
        setTradeHistory(updatedTradeHistory);
        calculateTotalValue(updatedPortfolio);

        // 로컬스토리지 업데이트
        localStorage.setItem(STORAGE_KEYS.ACCOUNT, JSON.stringify(updatedAccount));
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updatedPortfolio));
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedTradeHistory));

        notifyStorageChange();
        return { success: true, trade: newTrade, balance: updatedAccount.balance };
    }, [accountInfo, portfolio, tradeHistory, calculateTotalValue, notifyStorageChange]);

    /**
     * 특정 종목의 보유 수량 조회
     * @param {string} stockCode - 종목 코드
     * @returns {number} 보유 수량 (미보유시 0)
     */
    const getStockQuantity = useCallback((stockCode) => {
        const stock = portfolio.find(item => item.stockCode === stockCode);
        return stock ? stock.quantity : 0;
    }, [portfolio]);

    /**
     * 가장 최근 거래 내역 조회
     * @param {string} [stockCode] - 종목 코드 (선택적)
     * @returns {TradeHistory|null} 최근 거래 내역 (없으면 null)
     */
    const getLatestTrade = useCallback((stockCode = null) => {
        if (tradeHistory.length === 0) return null;

        if (stockCode) {
            // 특정 종목의 최근 거래 내역
            const stockTrades = tradeHistory.filter(trade => trade.stockCode === stockCode);
            const latestTrade = stockTrades[stockTrades.length - 1];
            return latestTrade || null;
        }

        // 전체 거래 중 가장 최근 거래
        const latestTrade = tradeHistory[tradeHistory.length - 1];
        return latestTrade || null;
    }, [tradeHistory]);

    return {
        accountInfo,
        portfolio,
        tradeHistory,
        totalValue,
        isLoading,
        initializeAccount,
        buyStock,
        sellStock,
        getStockQuantity,
        getLatestTrade
    };
};