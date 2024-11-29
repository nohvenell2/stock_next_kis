"use client"
import styles from "./MockInvestment.module.scss"
import Link from "next/link"
import { useMockStorage } from "@/hooks/mock/useMockStorage"
export default function MockInvestment() {
    const { totalValue, isLoading } = useMockStorage()
    if (isLoading) return <div></div>
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>💵</h1>
            <ul className={styles.portfolioSimple}>
                <Link href="/temp_mock2">
                    <p>총 평가 금액 : {totalValue.marketValue.toLocaleString()} </p>
                    <p>총 투자 금액 : {totalValue.invested.toLocaleString()}</p>
                    <p>총 수익률 : {totalValue.profitRate.toFixed(2)}%</p>
                </Link>
            </ul>
        </div>
    )
}