"use client"
import styles from "./MockInvestment.module.scss"
import Link from "next/link"
import { useMockStorage } from "@/hooks/mock/useMockStorage"
const dashboardPath = "/mock-dashboard"
export default function MockInvestment() {
    const { totalValue, accountInfo, isLoading } = useMockStorage()
    
    if (isLoading) return <div></div>
    const getProfitRateDisplay = (rate) => {
        if (rate === 0) {
            return <p>총 수익률 : {rate.toFixed(2)}%</p>;
        }

        const isPositive = rate > 0;
        return (
            <p style={{ color: isPositive ? 'red' : 'blue' }}>
                {isPositive ? '▲' : '▼'}
                총 수익률 : {rate.toFixed(2)}%
            </p>
        );
    };


    return (
        <div className={styles.container}>
            <Link href={dashboardPath}>
                <h1 className={styles.title}>💵</h1>
            </Link>
            <Link href={dashboardPath}>
                <ul className={styles.portfolioSimple}>
                    <p>투자 금액 : {totalValue.invested.toLocaleString()}원</p>
                    <p>평가 금액 : {totalValue.marketValue.toLocaleString()}원 </p>
                    {getProfitRateDisplay(totalValue.totalProfitRate)}
                    <p>잔액 : {accountInfo.balance.toLocaleString()}원</p>
                </ul>
            </Link>
        </div>
    )
}