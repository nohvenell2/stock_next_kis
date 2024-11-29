'use client'
import BuyButton from '@/components/mockButton/BuyButton'
import SellButton from '@/components/mockButton/SellButton'
import { useMockStorage } from '@/hooks/mock/useMockStorage';
import FavoriteButton from '@/components/favoriteButton/FavoriteButton'
export default function Buttons({ stockCode, stockName, market }) {
    const { buyStock, sellStock, getStockQuantity, isLoading } = useMockStorage();
    if (isLoading) return <></>;
    return (
        <div className='flex gap-4'>
            <FavoriteButton symbol={stockCode} stock_name={stockName} market={market} />
            <BuyButton
                stockCode={stockCode}
                stockName={stockName}
                text="💰"
                className="text-[24px]"
                buyStock={buyStock}
            />
            <SellButton
                stockCode={stockCode}
                stockName={stockName}
                text="💸"
                className="text-[24px]"
                sellStock={sellStock}
                getStockQuantity={getStockQuantity}
            />
        </div>
    )
}