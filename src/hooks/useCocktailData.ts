// src/hooks/useCocktailData.ts
import { useState, useEffect } from 'react';
import type { CocktailData, Page } from '../types/cocktail'; // 💡 타입 임포트 수정

const API_URL = 'http://localhost:3000/cocktails';
// const API_URL = getApiUrl(ENDPOINTS.COCKTAIL); // 완전한 API URL 구성


export const useCocktailData = (navigateTo: (pageId: Page) => void) => {
    const [allCocktails, setAllCocktails] = useState<CocktailData[]>([]);
    const [currentCocktail, setCurrentCocktail] = useState<CocktailData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // API 호출 로직
    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: CocktailData[] = await response.json();
                setAllCocktails(data);
                setIsLoading(false);
                setIsError(false);
            } catch (error) {
                console.error("칵테일 데이터 로드 실패. NestJS 서버 확인:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchCocktails();
    }, []);

    // 카드 클릭 및 추천 로직
    const handleCardClick = () => {
        // [OOP 개념: 캡슐화] - 데이터 관리 로직을 이 훅 내부에 캡슐화합니다.
        navigateTo('HOME'); // 클릭 시 Home으로 라우팅

        if (allCocktails.length === 0) {
            setIsError(true);
            return;
        }

        const randomIndex = Math.floor(Math.random() * allCocktails.length);
        const randomCocktail = allCocktails[randomIndex];
        setCurrentCocktail(randomCocktail);
        setIsError(false);
    };

    return {
        allCocktails,
        currentCocktail,
        isLoading,
        isError,
        handleCardClick
    };
};