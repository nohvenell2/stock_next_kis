"use client"
import styles from './IndexChart_legend.module.scss'

export default function IndexChartLegend({ chartTitle, cursorData }) {
    return (
        <div className={styles.legendContainer}>
            <div className={styles.title}>{chartTitle}</div>
            <div className={styles.valueContainer}>
                <span>{cursorData?.value.toFixed(2)}</span>
            </div>
        </div>
    )
}
