import "@/app/globals.css";
import styles from "./page.module.scss"
import TopBar from "@/components/TopBar";
import { symbolsData } from "@/util/db/fetch_symbols.js";
export function generateMetadata({ params: { id } }) {
    const symbol = decodeURIComponent(id)
    const market = symbolsData[symbol].market
    return ({
        title: {
            default: `${market.toUpperCase()} | ${symbol}`,
        }
    })
}
export default function PageLayout({ children, params: { id } }) {
    const symbol = decodeURIComponent(id)
    const market = symbolsData[symbol].market == 'kospi' ? 'kospi' : 'snp500'
    return (
        <div>
            <div className={styles.topbar}>
                <TopBar market={market} />
            </div>
            <div className="grid justify-items-center">
                {children}
            </div>
        </div>
    );
}