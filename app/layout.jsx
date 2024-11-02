import "./globals.css";

export const metadata = {
  title:{
    default : 'STOCK',
    template : '%s | STOCK'
  },
  description: "stock app",
};
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
