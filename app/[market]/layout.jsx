import "../globals.css";
//import { useRouter } from 'next/navigation';
import TopBar_kospi from "@/components/TopBar_kospi";
import TopBar_snp500 from "@/components/TopBar_snp500";
export function generateMetadata({ params: { market } }){
    return ({
        title: {
            default:`${market.toUpperCase()}`,
            template: `%s | ${market.toUpperCase()}`
        }
    })
}
export default function MarketLayout({ children, params: { market } }) {
    return (
        <div>
            {market == 'kospi' ? <TopBar_kospi /> : market == 'snp500' ? <TopBar_snp500 /> : <></>}
            {children}
        </div>
    );
}