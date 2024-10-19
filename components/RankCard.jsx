import Link from "next/link";
import styles from "./RankCard.module.css";
import { stock_code_name } from "@/constants/stock_code_name";
export default function RankCard({ title, data }) {
    return (
        <div className={styles.rank_container}>
            <div className={styles.title}>{title}</div>
            {
                data.map((d,i) =>
                    <Link key={i} className={styles.rank_item} href={`/stock-info/${d[0]}?period=D`}>
                        <div className={styles.rank_name}>{`${i+1} ${stock_code_name[d[0]]}`}</div>
                        <div className={styles.rank_disc}>{d[1]}</div>
                    </Link>
                )
            }
        </div>
    )
}