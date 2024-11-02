import "../globals.css";
//import { useRouter } from 'next/navigation';
import TopBar_kospi from "@/components/TopBar_kospi";
import TopBar_snp500 from "@/components/TopBar_snp500";
export const metadata = {
  title:{
    default : 'STOCK',
    template : '%s | STOCK'
  },
  description: "stock app",
};

export default function MarketLayout({ children,params:{market} }) {
  return (
    <div>
      { market == 'kospi'? <TopBar_kospi /> : market == 'snp500'? <TopBar_snp500/> : <></> }
      <main>{children}</main> {/* 하위 페이지가 여기에 렌더링됨 */}
    </div>
  );
}