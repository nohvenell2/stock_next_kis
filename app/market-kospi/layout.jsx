import TopBar_kospi from "@/components/TopBar_kospi";
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
            <TopBar_kospi />
            {children}
        </>
    );
}