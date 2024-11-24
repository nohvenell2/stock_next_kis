import Link from "next/link";
import styles from './RankCard.module.scss';

export default function RankCard({ market, title, data, value_color }) {
    const valueStyle = {
        color: value_color || '#4B5563'
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <ul className={styles.list}>
                {data.map((d, i) => (
                    <li key={i} className={styles.listItem}>
                        <Link href={`/${market}/${encodeURIComponent(d[0])}`}>
                            <span className={styles.rank}>
                                <span className={styles.rankNumber}>
                                    {i + 1}
                                </span>
                                <span className={styles.name}>{d[1]}</span>
                            </span>
                            <span className={styles.value} style={valueStyle}>{d[2]}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}