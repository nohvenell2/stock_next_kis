import TopBar from "@/components/TopBar";
import "./globals.css";

export const metadata = {
  title:{default : 'KRX100',
  template : '%s | KRX100'},
  description: "stock app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopBar/>
        {children}
      </body>
    </html>
  );
}
