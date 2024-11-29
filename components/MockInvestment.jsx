"use client"
import styles from "./MockInvestment.module.scss"
import Link from "next/link"
import { useMockStorage } from "@/hooks/mock/useMockStorage"
const dashboardPath = "/mock-dashboard"
export default function MockInvestment() {
    const { totalValue, accountInfo, isLoading } = useMockStorage()

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

    if (isLoading) return <div></div>

    return (
        <div className={styles.container}>
            <Link href={dashboardPath}>
                <h1 className={styles.title}>💵</h1>
            </Link>
            <ul className={styles.portfolioSimple}>
                <Link href={dashboardPath}>
                    <p>투자 금액 : {totalValue.invested.toLocaleString()}원</p>
                    <p>평가 금액 : {totalValue.marketValue.toLocaleString()}원 </p>
                    {getProfitRateDisplay(totalValue.profitRate)}
                    <p>잔액 : {accountInfo.balance.toLocaleString()}원</p>
                </Link>
            </ul>
        </div>
    )
}