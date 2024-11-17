const FAVORITE_STOCKS_KEY = 'favoriteStocks';

class StockFavorites {
    constructor() {
        // 초기화 시 저장된 즐겨찾기가 없다면 빈 배열로 생성
        if (localStorage.getItem(FAVORITE_STOCKS_KEY) === null) {
            localStorage.setItem(FAVORITE_STOCKS_KEY, JSON.stringify([]));
        }
    }

    // 즐겨찾기 목록 조회
    getFavorites() {
        const favorites = localStorage.getItem(FAVORITE_STOCKS_KEY);
        return JSON.parse(favorites);
    }

    // 즐겨찾기 추가
    addFavorite(stockInfo) {
        const favorites = this.getFavorites();
        // 이미 존재하는지 확인
        if (!favorites.some(stock => stock.code === stockInfo.code)) {
            favorites.push({
                code: stockInfo.code,
                name: stockInfo.name,
                market: stockInfo.market,
                addedAt: new Date().toISOString(),
            });
            localStorage.setItem(FAVORITE_STOCKS_KEY, JSON.stringify(favorites));
            return true;
        }
        return false;
    }

    // 즐겨찾기 삭제
    removeFavorite(stockCode) {
        const favorites = this.getFavorites();
        const filteredFavorites = favorites.filter(stock => stock.code !== stockCode);
        localStorage.setItem(FAVORITE_STOCKS_KEY, JSON.stringify(filteredFavorites));
    }

    // 특정 주식이 즐겨찾기에 있는지 확인
    isFavorite(stockCode) {
        const favorites = this.getFavorites();
        return favorites.some(stock => stock.code === stockCode);
    }

    // 즐겨찾기 순서 변경
    reorderFavorites(stockCodes) {
        const favorites = this.getFavorites();
        const reorderedFavorites = stockCodes.map(code => 
            favorites.find(stock => stock.code === code)
        ).filter(Boolean);
        localStorage.setItem(FAVORITE_STOCKS_KEY, JSON.stringify(reorderedFavorites));
    }

    // 로컬스토리지 초기화
    deleteAll(){
        localStorage.clear()
    }
}
export default StockFavorites