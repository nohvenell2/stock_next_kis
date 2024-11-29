'use client'
import { useMockStorage } from "@/hooks/mock/useMockStorage";
import Swal from 'sweetalert2';

/**
 * 매도 버튼 컴포넌트
 * @param {Object} props
 * @param {string} props.stockCode - 종목 코드
 * @param {string} props.stockName - 종목 이름
 * @param {string} props.text - 버튼 텍스트
 * @param {string} props.className - 추가 스타일 클래스
 */
export default function SellButton({ stockCode, stockName, text = '매도', className = '', sellStock, getStockQuantity }) {
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
                    max=${getStockQuantity(stockCode)}
                    placeholder="보유 수량 : ${getStockQuantity(stockCode)} 주"
                    style="width: 280px;"
                >
            `,
            showCancelButton: true,
            confirmButtonText: '매도',
            cancelButtonText: '취소',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            inputAttributes: {
                max: getStockQuantity(stockCode)
            },
            preConfirm: () => {
                const quantity = Swal.getPopup().querySelector('#quantity').value;
                const maxQuantity = getStockQuantity(stockCode);
                if (!quantity || quantity < 1) {
                    Swal.showValidationMessage('올바른 수량을 입력해주세요');
                }
                if (quantity > maxQuantity) {
                    Swal.showValidationMessage(`최대 ${maxQuantity}주까지 매도 가능합니다`);
                }
                return Number(quantity);
            }
        });

        if (result.isConfirmed) {
            const quantity = result.value;
            const { success, trade, balance } = await sellStock(stockCode, stockName, quantity);
            
            if (success && trade) {
                Swal.fire({
                    icon: 'success',
                    title: '매도 완료',
                    html: `${stockName} ${quantity}주, 총 ${Number(trade.total).toLocaleString()}원이 매도되었습니다. <br>잔액: ${Number(balance).toLocaleString()}원`,
                    timer: 10000
                });
            }
        }
    };

    return (
        <button 
            onClick={handleSellClick} 
            className={`${className} ${getStockQuantity(stockCode) > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
        >
            {text}
        </button>
    );
}