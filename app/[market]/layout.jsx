import "../globals.css";
import TopBar_kospi from "@/components/TopBar_kospi";
import TopBar_snp500 from "@/components/TopBar_snp500";
import styles from "./layout.module.scss"
export function generateMetadata({ params: { market } }) {
    return ({
        title: {
            default: `${market.toUpperCase()}`,
            template: `%s | ${market.toUpperCase()}`
        }
    })
}
export default function MarketLayout({ children, params: { market } }) {
    return (
        <div>
            <div className={styles.topbar}>
                {market == 'kospi' ? <TopBar_kospi /> : market == 'snp500' ? <TopBar_snp500 /> : <></>}
            </div>
            <div className="grid justify-items-center">
                {children}
            </div>
        </div>
    );
}