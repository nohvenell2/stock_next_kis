import TopBar from "@/components/TopBar";
import "./globals.css";
import { symbols_arr, symbols_obj } from "@/util/snp500/get_symbols";

export const metadata = {
  title:{
    default : 'STOCK',
    template : '%s | STOCK'
  },
  description: "stock app",
};
export default async function RootLayout({ children }) {
  //todo 임시로 snp500 정보 비동기로 topbar 에 전달. 나중에 고치기
  return (
    <html lang="en">
      <body>
        <TopBar snp500Symbols={symbols_arr} snp500Data={symbols_obj}/>
        {children}
      </body>
    </html>
  );
}
