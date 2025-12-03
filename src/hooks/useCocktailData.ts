// src/hooks/useCocktailData.ts

import { useState, useEffect } from 'react';

// App.tsx에서 정의된 타입 복사 (별도 파일로 분리하는 것이 이상적)
interface CocktailData {
    cocktail_id: number;
    name_kr: string;
    name_en: string;
    ingredients: string[];
    ingredients_kr: string[];
    method_kr: string;
    category: string;
    calculated_abv?: string;
}

const API_URL = 'http://localhost:3000/cocktails';

export const useCocktailData = (navigateTo: (pageId: string) => void) => {
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