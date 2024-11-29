'use client'
import { useMockStorage } from "@/hooks/mock/useMockStorage";
import Swal from 'sweetalert2';

/**
 * 매수 버튼 컴포넌트
 * @param {Object} props
 * @param {string} props.stockCode - 종목 코드
 * @param {string} props.stockName - 종목 이름
 * @param {string} props.text - 버튼 텍스트
 * @param {string} props.className - 추가 스타일 클래스
 */
export default function BuyButton({ stockCode, stockName, text = '매수', className = '', buyStock }) {
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
                        html: `${stockName} ${quantity}주, 총 ${Number(trade.total).toLocaleString()}원이 매수되었습니다. <br>잔액: ${Number(balance).toLocaleString()}원`,
                        timer: 10000
                });
            }
        }
    };

    return (
        <button 
            onClick={handleBuyClick} 
            className={`${className}`}
        >
            {text}
        </button>
    );
}