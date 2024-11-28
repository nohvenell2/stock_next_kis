import { fetchSingleCurrentPrice, fetchMultipleCurrentPrices } from '@/util/db/fetch_current_price';

/**
 * GET 요청 처리
 * @param {Request} request
 * @returns {Promise<Response>} { symbol: price, ... } 형태의 객체
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const symbols = searchParams.get('symbols');

        if (!symbols) {
            return Response.json({ error: '종목 코드가 필요합니다.' }, { status: 400 });
        }

        // symbols 파라미터가 쉼표로 구분된 문자열인 경우 배열로 처리
        const symbolArray = symbols.includes(',') ? symbols.split(',') : [symbols];
        // 단일/다중 종목 모두 { symbol: price } 형태의 객체 반환
        const result = symbolArray.length === 1
            ? await fetchSingleCurrentPrice(symbolArray[0])
            : await fetchMultipleCurrentPrices(symbolArray);

        return Response.json(result);
    } catch (error) {
        console.error('현재가 조회 에러:', error);
        return Response.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
    }
}