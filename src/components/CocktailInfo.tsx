import React from 'react';
import '../App.css';
import type { CocktailData } from '../types/cocktail';

interface CocktailInfoProps {
    cocktail: CocktailData | null; // 랜덤으로 선택된 칵테일 데이터
}

const CocktailInfo: React.FC<CocktailInfoProps> = ({ cocktail }) => {
    if (!cocktail) {
        return (
            // 정보가 없을 때 메시지 표시 (고정 크기에 맞게 중앙 정렬)
            <div className="p-4 text-center text-gray-500 w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl">
                <span className="text-sm font-medium">카드를 클릭하여<br />오늘의 칵테일을 추천받으세요!</span>
            </div>
        );
    }

    // 한국어 재료(ingredients_kr)를 우선적으로 사용하고, 없으면 영어 재료(ingredients)를 폴백(fallback)으로 사용
    const displayIngredients = (cocktail.ingredients_kr && cocktail.ingredients_kr.length > 0)
        ? cocktail.ingredients_kr
        : cocktail.ingredients;

    return (
        // h-full로 부모 fixed-info-box의 고정된 10rem 높이를 채우고, overflow-y-auto로 스크롤 가능하게 설정
        <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 w-full h-full overflow-y-auto">
            <h3 className="text-3xl font-bold text-amber-900 mb-1 leading-tight">🍹 {cocktail.name_kr}</h3>
            <h4 className="text-xl text-gray-400 mb-3">{cocktail.name_en}</h4>

            <div className="mt-2">
                <h5 className="text-xl font-semibold text-gray-700 pb-0 border-b border-dashed">재료 (Ingredients)</h5>

                {/* 재료 목록 렌더링 (최대 3개 표시 + 스크롤) */}
                <ul className="text-xm list-disc list-inside ml-2 text-gray-600 space-y-0.5 text-sm">
                    {displayIngredients.slice(0, 3).map((item, index) => (
                        <li key={index}>{item.length > 30 ? item.substring(0, 30) + '...' : item}</li>
                    ))}
                    {/* 재료가 많으면 '더보기' 표시 */}
                    {displayIngredients.length > 3 &&
                        <li className='text-xm text-blue-500'>...외 {displayIngredients.length - 3}개</li>
                    }
                </ul>

                {/* 제조 방법 표시 */}
                <div className="mt-2">
                    <h5 className="text-xl font-semibold text-gray-700 pb-0 border-b border-dashed">제조 방법 (Method)</h5>
                    <p className="text-xm text-gray-600 mt-1 whitespace-pre-wrap">{cocktail.method_kr}</p>
                </div>
            </div>
        </div>
    );
};

export default CocktailInfo;