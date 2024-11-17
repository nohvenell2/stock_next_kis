
'use client'
import { useFavoriteStocks } from "@/hooks/useFavoriteStocks";
export default function FavoriteButton({symbol, stock_name, market}){
    const { isLoading, addFavorite, removeFavorite, isFavorite } = useFavoriteStocks()

    if (isLoading) return <div>Loading</div>

    function handleClick(){
        if (!isFavorite(symbol)){
            addFavorite({ code:symbol, name: stock_name, market: market })
            alert(`${stock_name} 즐겨찾기 주식에 추가`)
        }else{
            removeFavorite(symbol)
            alert(`${stock_name} 즐겨찾기 주식에서 삭제`)
        }
    }
    //debug
    //console.log(favorites)
    return (
        <button onClick={handleClick} aria-label={isFavorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}>
            {isFavorite(symbol)? '🧡': '🤍'}
        </button>
    )
}