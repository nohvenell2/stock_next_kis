import Link from 'next/link'
import styles from './page.module.scss'
import { chartData_index } from "@/util/chartdata_index"

export default async function Page() {
    const snp500Data = await chartData_index('SP500', 10)
    const kospiData = await chartData_index('KOSPI', 10)
    // 최신 데이터와 전일 데이터 가져오기
    const latestSP500 = snp500Data[snp500Data.length - 1]
    const previousSP500 = snp500Data[snp500Data.length - 2]
    const sp500Change = ((latestSP500.value - previousSP500.value) / previousSP500.value * 100).toFixed(2)

    const latestKOSPI = kospiData[kospiData.length - 1]
    const previousKOSPI = kospiData[kospiData.length - 2]
    const kospiChange = ((latestKOSPI.value - previousKOSPI.value) / previousKOSPI.value * 100).toFixed(2)

    return (
        <div className={styles.container}>
            <Link href={`/${process.env.NEXT_PUBLIC_KOSPI_URL}`} className={styles.card}>
                <h2>KOSPI</h2>
                <p className={styles.value}>{latestKOSPI.value.toFixed(2)}</p>
                <p className={`${styles.change} ${kospiChange >= 0 ? styles.positive : styles.negative}`}>
                    {kospiChange >= 0 ? '+' : ''}{kospiChange}%
                </p>
                <p className={styles.time}>{latestKOSPI.time}</p>
            </Link>

            <Link href={`/${process.env.NEXT_PUBLIC_SNP500_URL}`} className={styles.card}>
                <h2>S&P 500</h2>
                <p className={styles.value}>{latestSP500.value.toFixed(2)}</p>
                <p className={`${styles.change} ${sp500Change >= 0 ? styles.positive : styles.negative}`}>
                    {sp500Change >= 0 ? '+' : ''}{sp500Change}%
                </p>
                <p className={styles.time}>{latestSP500.time}</p>
            </Link>
        </div>
    )
}