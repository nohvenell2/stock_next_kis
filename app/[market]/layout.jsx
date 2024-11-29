import "../globals.css";
import styles from "./layout.module.scss"
import TopBar from "@/components/TopBar";
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
                <TopBar market={market} />
            </div>
            <div className="grid justify-items-center">
                {children}
            </div>
        </div>
    );
}