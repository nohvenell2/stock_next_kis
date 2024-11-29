
'use client'
import { useFavoriteStocks } from "@/hooks/useFavoriteStocks";
import Swal from "sweetalert2";
export default function FavoriteButton_delete({ symbol, stock_name, market }) {
    const { isLoading, removeFavorite, isFavorite } = useFavoriteStocks()
    if (isLoading) return <div>Loading</div>

    function handleClick() {
        if (isFavorite(symbol)) {
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
        <button onClick={handleClick}>
            ❌
        </button>
    )
}