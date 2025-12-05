// src/components/Home.tsx

import React from 'react';
// Card 및 CocktailInfo 컴포넌트가 src/components에 있다고 가정
import Card from './Card';
import CocktailInfo from './CocktailInfo';
import type { CocktailData } from '../types/cocktail';


interface HomeProps {
    currentCocktail: CocktailData | null;
    handleCardClick: () => void;
    allCocktails: CocktailData[];
    isError: boolean;
}

const Home: React.FC<HomeProps> = ({ currentCocktail, handleCardClick, allCocktails, isError }) => {
    const contentWrapperClass = 'w-full max-w-[1440px] mx-auto';

    // 데이터 로드 실패 시 오류 메시지
    if (allCocktails.length === 0 && isError) {
        return (
            <div className={`${contentWrapperClass} p-8 mt-8 text-center bg-red-100 rounded-lg`}>
                <h1 className="text-3xl font-bold text-red-700 mb-4">데이터 로드 실패</h1>
                <p className="text-gray-700">NestJS 백엔드 서버가 실행 중인지 확인해 주세요. (주소: http://localhost:3000/cocktails)</p>
            </div>
        );
    }

    return (
        // [이전 HomeContent의 렌더링 로직 복구]
        <div className={contentWrapperClass}>
            <div className='content'>
                <Card onClick={handleCardClick} />
                <div className='info-box'>
                    <div className="fixed-info-box">
                        <CocktailInfo cocktail={currentCocktail} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;