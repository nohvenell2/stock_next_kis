
'use client'
import { useFavoriteStocks } from "@/hooks/useFavoriteStocks";
import Swal from "sweetalert2";
export default function FavoriteButton({symbol, stock_name, market}){
    const { isLoading, addFavorite, removeFavorite, isFavorite } = useFavoriteStocks()

    if (isLoading) return <div>Loading</div>

    function handleClick(){
        if (!isFavorite(symbol)){
            addFavorite({ code:symbol, name: stock_name, market: market })
            const toastAlert = Swal.mixin({
                toast:true,
                position: 'center-center',
                timer: 3000,
                timerProgressBar:true,
                showConfirmButton: false
            })
            toastAlert.fire({
                title: `${stock_name} 추가`,
                timer:2000,
                icon:'success'
            })
        }else{
            removeFavorite(symbol)
            const toastAlert = Swal.mixin({
                toast:true,
                position: 'center-center',
                timer: 3000,
                timerProgressBar:true,
                showConfirmButton: false
            })
            toastAlert.fire({
                title: `${stock_name} 삭제`,
                timer:2000,
                icon:'error'
            })
        }
    }
    return (
        <button onClick={handleClick} aria-label={isFavorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"} className="text-[24px]">
            {isFavorite(symbol)? '🧡': '🤍'}
        </button>
    )
}