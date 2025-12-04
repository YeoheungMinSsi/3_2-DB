// src/components/Home.tsx

import React from 'react';
// Card 및 CocktailInfo 컴포넌트가 src/components에 존재한다고 가정합니다.
import Card from './Card';
import CocktailInfo from './CocktailInfo';
import type { CocktailData } from '../types/cocktail'; // 타입 임포트

interface HomeProps {
    currentCocktail: CocktailData | null;
    handleCardClick: () => void;
    allCocktails: CocktailData[];
    isError: boolean;
    // 💡 App.tsx에서 전달받는 API 주소 Props (오류 메시지용)
    apiBaseUrl: string;
}

const Home: React.FC<HomeProps> = ({
    currentCocktail,
    handleCardClick,
    allCocktails,
    isError,
    apiBaseUrl // Props에서 받습니다.
}) => {
    const contentWrapperClass = 'w-full max-w-[1440px] mx-auto';

    // 데이터 로드 실패 시 오류 메시지
    if (allCocktails.length === 0 && isError) {
        return (
            <div className={`${contentWrapperClass} p-8 mt-8 text-center bg-red-100 rounded-lg`}>
                <h1 className="text-3xl font-bold text-red-700 mb-4">데이터 로드 실패</h1>
                {/* 💡 하드코딩된 localhost 대신 apiBaseUrl Props로 대체 */}
                <p className="text-gray-700">
                    NestJS 백엔드 서버가 실행 중인지 확인해 주세요.
                    (현재 프론트엔드 코드에 설정된 API 주소: {apiBaseUrl}/cocktails)
                </p>
                <p className="mt-2 text-sm text-red-500">
                    서버가 실행 중인데도 이 메시지가 계속 표시된다면, NestJS 서버의 CORS 설정에서
                    Firebase Hosting URL이 정확히 허용되었는지 확인해 주세요.
                </p>
            </div>
        );
    }

    return (
        // [Home 페이지의 실제 콘텐츠]
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