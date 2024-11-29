'use client'
import { useMockStorage } from '@/hooks/mock/useMockStorage';
import BuyButton from '@/components/mockButton/BuyButton';
import SellButton from '@/components/mockButton/SellButton';
import Swal from 'sweetalert2';
import Link from 'next/link';
import styles from './page.module.scss';

export default function MockDashboard() {
    const { accountInfo, portfolio, totalValue, isLoading, initializeAccount } = useMockStorage();

    if (isLoading) return <div className={styles.loading}>로딩 중...</div>;

    const handleReset = () => {
        Swal.fire({
            title: '모든 모의투자 정보를 초기화 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                initializeAccount(10000000); // 초기화 로직 호출
                Swal.fire('초기화 완료', '모의투자 정보가 초기화되었습니다.', 'success');
            }
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>모의투자 현황</h1>
            
            <section className={styles.accountSection}>
                <h2>계좌 현황</h2>
                <div className={styles.accountInfo}>
                    <div>
                        <span>초기 자금</span>
                        <span>{accountInfo?.initialBalance?.toLocaleString()}원</span>
                    </div>
                    <div>
                        <span>현재 잔고</span>
                        <span>{accountInfo?.balance?.toLocaleString()}원</span>
                    </div>
                    <div>
                        <span>총 투자금</span>
                        <span>{totalValue?.invested?.toLocaleString()}원</span>
                    </div>
                    <div>
                        <span>총 평가금</span>
                        <span>{totalValue?.marketValue?.toLocaleString()}원</span>
                    </div>
                    <div>
                        <span>총 수익률</span>
                        <span className={totalValue?.profitRate > 0 ? styles.profit : styles.loss}>
                            {totalValue?.profitRate?.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </section>

            <section className={styles.portfolioSection}>
                <h2>포트폴리오 현황</h2>
                {portfolio.map((item) => (
                    <div key={item.stockCode} className={styles.portfolioItem}>
                        <div className={styles.stockInfo}>
                            <h3>{item.stockName}</h3>
                            <p>보유수량: {item.quantity}주</p>
                            <p>평균단가: {item.avgPrice.toLocaleString()}원</p>
                            <p>현재가: {item.currentPrice.toLocaleString()}원</p>
                            <p className={item.profitRate > 0 ? styles.profit : styles.loss}>
                                수익률: {item.profitRate.toFixed(2)}%
                            </p>
                        </div>
                        <div className={styles.actions}>
                            <BuyButton 
                                stockCode={item.stockCode}
                                stockName={item.stockName}
                                text="매수"
                                className={styles.buyButton}
                            />
                            <SellButton 
                                stockCode={item.stockCode}
                                stockName={item.stockName}
                                text="매도"
                                className={styles.sellButton}
                            />
                        </div>
                    </div>
                ))}
            </section>

            <div className={styles.footerButtons}>
                <Link href="/mock-history">
                    <button className={styles.historyButton}>거래 히스토리</button>
                </Link>
                <button onClick={handleReset} className={styles.resetButton}>모의투자 리셋</button>
            </div>
        </div>
    );
}