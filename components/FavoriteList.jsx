'use client'
import { useFavoriteStocks } from "@/hooks/useFavoriteStocks"
import styles from "./FavoriteList.module.scss"
import Link from "next/link"
import FavoriteButton_delete from "./favoriteButton/FavoriteButton_delete"
export default function FavoriteList() {
    const { favorites, isLoading } = useFavoriteStocks()

    if (isLoading) return <div></div>
    if (favorites.length == 0) return <div></div>
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>🧡</h1>
            <ul className={styles.favoriteList}>
                {favorites.map((stock, i) => {
                    const { code, name, market } = stock
                    let base_url;
                    if (market == 'KRX') { base_url = `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_KOSPI_URL}/` }
                    else { base_url = `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_SNP500_URL}/` }
                    return (
                        <div className={styles.favoriteList__item} key={i}>
                            <Link className={styles.favoriteList__item__Link} key={i} href={base_url + code}>
                                <div>{`${name}`}</div>
                            </Link>
                            <FavoriteButton_delete symbol={code} stock_name={name} market={market}/>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}