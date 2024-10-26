import get_kospiIndex from "@/util/get_kospi";
import KospiChart from "@/components/KospiChart";
import { rank_VolumeQ, rank_RateUp, rank_RateDown, rank_Capital } from "@/util/get_rank";
import RankCard from "@/components/RankCard";
export const revalidate = 60 * 30;
export function generateMetadata({params:{id}}){
    return ({
        title:'HOME'
    })
}
const Home= () => {
    return <h1 className="m-40 text-8xl">공사중</h1>
};

export default Home;