import TopBar from "@/components/TopBar";
import "./globals.css";

export const metadata = {
  title: "Stock_Next",
  description: "stock app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopBar onChangeStock={handleStock} onChangePeriod={handlePeriod}/>
        {children}
      </body>
    </html>
  );
}
