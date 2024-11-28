'use client'
import { useMockStorage } from "@/hooks/mock/useMockStorage";
import Swal from 'sweetalert2';

export default function BuyButton({ stockCode, stockName }) {
    const { buyStock, isLoading } = useMockStorage();

    if (isLoading) return <></>;

    const handleBuyClick = async () => {
        const result = await Swal.fire({
            title: '매수 수량 입력',
            html: `
                <div class="mb-2">${stockName} (${stockCode})</div>
                <input 
                    type="number" 
                    id="quantity" 
                    class="swal2-input" 
                    min="1" 
                    value="1" 
                    placeholder="수량을 입력하세요"
                >
            `,
            showCancelButton: true,
            confirmButtonText: '매수',
            cancelButtonText: '취소',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
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
            const { success, trade, balance } = await buyStock(stockCode, stockName, quantity);
            
            if (success && trade) {
                Swal.fire({
                    icon: 'success',
                    title: '매수 완료',
                    html: `${stockName} ${quantity}주, 총 ${trade.total}원이 매수되었습니다. <br>잔액: ${balance}원`,
                    timer: 10000
                });
            }
        }
    };

    return (
        <button 
            onClick={handleBuyClick} 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            매수
        </button>
    );
}