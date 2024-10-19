import TopBar from "@/components/TopBar";
import "./globals.css";

export const metadata = {
  title:{default : 'KOSPI',
  template : '%s | KOSPI'},
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
