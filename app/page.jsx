import Link from "next/link";


function Home(){
    return (
        <div className="m-10 flex flex-col gap-10">
            <h1 className="text-5xl">공사중</h1>
            <Link href='/kospi' className="text-5xl">KOSIP</Link>
            <Link href='/snp500'className="text-5xl">S&P500</Link>
        </div>
    )
}
export default Home;