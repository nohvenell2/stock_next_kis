'use client'
import { useMockStorage } from "@/hooks/mock/useMockStorage";
import Swal from 'sweetalert2';

export default function SellButton({ stockCode, stockName }) {
    const { sellStock, getStockQuantity, isLoading } = useMockStorage();

    if (isLoading) return <></>;

    const handleSellClick = async () => {
        if (!getStockQuantity(stockCode)) {
            Swal.fire({
                icon: 'warning',
                title: '매도 불가',
                text: '보유하고 있지 않은 종목입니다.',
                timer: 1500
            });
            return;
        }

        const result = await Swal.fire({
            title: '매도 수량 입력',
            html: `
                <div class="mb-2">${stockName} (${stockCode})</div>
                <input 
                    type="number" 
                    id="quantity" 
                    class="swal2-input" 
                    min="1" 
                    placeholder="보유 수량 : ${getStockQuantity(stockCode)} 주"
                >
            `,
            showCancelButton: true,
            confirmButtonText: '매도',
            cancelButtonText: '취소',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            preConfirm: () => {
                const quantity = Swal.getPopup().querySelector('#quantity').value;
                if (!quantity || quantity < 1) {
                    Swal.showValidationMessage('올바른 수량을 입력해주세요');
                }
                return Number(quantity);
            }
        });

        if (result.isConfirmed) {
            const quantity = result.value;
            const { success, trade } = await sellStock(stockCode, stockName, quantity);
            
            if (success && trade) {
                Swal.fire({
                    icon: 'success',
                    title: '매도 완료',
                    text: `${stockName} ${quantity}주, 총 ${trade.total}원이 매도되었습니다.`,
                    timer: 10000
                });
            }
        }
    };

    return (
        <button 
            onClick={handleSellClick} 
            className={`px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 
                ${getStockQuantity(stockCode) > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
        >
            매도
        </button>
    );
}