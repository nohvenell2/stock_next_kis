import TopBar_snp500 from "@/components/TopBar_snp500";
import "../globals.css";
export const metadata = {
    title: {
        default: 'STOCK',
        template: '%s | STOCK'
    },
    description: "stock app",
};
export default function KospiLayout({ children }) {
    return (
        <>
            <TopBar_snp500/>
            {children}
        </>
    );
}