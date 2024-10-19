import RankCard from "@/components/RankCard";
import { rank_VolumeP,rank_VolumeQ, rank_RateUp, rank_RateDown } from "@/util/get_rank";
export default async function Temp(){
    const volumeRankP = await rank_VolumeP()
    return (
        <RankCard title='temp' data={volumeRankP}/>
    )
}