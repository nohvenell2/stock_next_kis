// hooks/useFavoriteStocks.js
'use client'
import { useState, useEffect } from 'react';

// 즐겨찾기 변경 이벤트 정의
const FAVORITE_CHANGE_EVENT = 'favoriteStocksChanged';
const FAVORITE_STOCKS_KEY = 'favoriteStocks';

export function useFavoriteStocks() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 초기 로딩과 이벤트 리스너 설정
    useEffect(() => {
        const loadFavorites = () => {
            try {
                const stored = localStorage.getItem(FAVORITE_STOCKS_KEY);
                setFavorites(stored ? JSON.parse(stored) : []);
            } catch (error) {
                console.error('Failed to load favorites:', error);
                setFavorites([]);
            } finally {
                setIsLoading(false);
            }
        };

        // 다른 컴포넌트의 변경사항을 감지하는 이벤트 리스너
        const handleFavoriteChange = () => {
            loadFavorites();
        };

        loadFavorites();
        window.addEventListener(FAVORITE_CHANGE_EVENT, handleFavoriteChange);

        return () => {
            window.removeEventListener(FAVORITE_CHANGE_EVENT, handleFavoriteChange);
        };
    }, []);

    // 변경사항을 다른 컴포넌트에 알리는 함수
    const notifyFavoriteChange = () => {
        window.dispatchEvent(new Event(FAVORITE_CHANGE_EVENT));
    };

    const addFavorite = (stockInfo) => {
        try {
            const newFavorites = [...favorites,
            {
                code: stockInfo.code,
                name: stockInfo.name,
                market: stockInfo.market,
                addedAt: new Date().toISOString()
            }
            ];
            localStorage.setItem(FAVORITE_STOCKS_KEY, JSON.stringify(newFavorites));
            setFavorites(newFavorites);
            notifyFavoriteChange(); // 변경사항 알림
            return true;
        } catch (error) {
            console.error('Failed to add favorite:', error);
            return false;
        }
    };

    const removeFavorite = (symbol) => {
        try {
            const newFavorites = favorites.filter(item => item.code !== symbol);
            localStorage.setItem(FAVORITE_STOCKS_KEY, JSON.stringify(newFavorites));
            setFavorites(newFavorites);
            notifyFavoriteChange(); // 변경사항 알림
            return true;
        } catch (error) {
            console.error('Failed to remove favorite:', error);
            return false;
        }
    };

    const isFavorite = (symbol) => {
        return favorites.some(item => item.code === symbol);
    };

    return {
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite
    };
}