'use client'
import { useMockStorage } from '@/hooks/mock/useMockStorage';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.scss';

export default function MockHistory() {
    const { tradeHistory, isLoading } = useMockStorage();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    if (isLoading) return <div className={styles.loading}>로딩 중...</div>;

    // 거래 내역을 최신순으로 정렬
    const sortedHistory = [...tradeHistory].reverse();
    
    // 페이지네이션 계산
    const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedHistory.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>거래 히스토리</h1>
                <Link href="/mock-dashboard">
                    <button className={styles.backButton}>
                        대시보드
                    </button>
                </Link>
            </div>

            <div className={styles.historyList}>
                {currentItems.map((trade, index) => (
                    <div key={index} className={styles.historyItem}>
                        <div className={styles.tradeInfo}>
                            <span className={styles.date}>
                                {new Date(trade.timestamp).toLocaleString()}
                            </span>
                            <span className={`${styles.type} ${styles[trade.type.toLowerCase()]}`}>
                                {trade.type}
                            </span>
                        </div>
                        <div className={styles.stockInfo}>
                            <h3>{trade.stockName}</h3>
                            <p>{trade.stockCode}</p>
                        </div>
                        <div className={styles.tradeDetails}>
                            <p>거래가: {trade.price.toLocaleString()}원</p>
                            <p>수량: {trade.quantity}주</p>
                            <p>총액: {trade.total.toLocaleString()}원</p>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        이전
                    </button>
                    <span className={styles.pageInfo}>
                        {currentPage} / {totalPages}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={styles.pageButton}
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
}
