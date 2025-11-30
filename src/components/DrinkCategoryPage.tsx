import React, { useState, useMemo, useEffect } from 'react';
// 💡 데이터 파일에서 인터페이스와 데이터를 import합니다.
// ALL_DRINK_CATEGORIES는 값이므로 일반 import를 사용합니다.
import { ALL_DRINK_CATEGORIES } from '../data/DrinkCategoryData';
// 💡 DrinkCategory는 순수 타입이므로 'import type'을 사용합니다. (ts(1484) 및 ts(6133) 해결)
import type { DrinkCategory } from '../data/DrinkCategoryData';
import '../App.css';

// Props 타입 정의
interface DrinkCategoryPageProps {
    categoryType: 'SPIRIT_ONLY' | 'GENERAL' | 'DRINK_TYPE_ONLY';
}


// 💡 상세 정보를 표시할 더미 컴포넌트 (COLUMN 3)
const DrinkDetailView: React.FC<{ mediumItem: string }> = ({ mediumItem }) => (
    <div className="p-8 bg-amber-50 rounded-lg h-full border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">🔍 {mediumItem} 상세 정보</h2>
        <p className="text-gray-700">
            **{mediumItem}**에 대한 자세한 정보(역사, 제조법, 주요 브랜드, 칵테일 레시피 등)가 여기에 표시됩니다.
        </p>
        <p className="mt-4 text-sm text-gray-500">
            (현재는 `{mediumItem}`을(를) 위한 더미 페이지입니다.)
        </p>
    </div>
);


const DrinkCategoryPage: React.FC<DrinkCategoryPageProps> = ({ categoryType }) => {
    // 💡 [상태 1] 현재 선택된 대분류 (majorCategory)
    const [selectedMajorCategory, setSelectedMajorCategory] = useState<string | null>(null);
    // 💡 [상태 2] 현재 선택된 중분류 항목 (mediumItem)
    const [selectedMediumItem, setSelectedMediumItem] = useState<string | null>(null);

    // 💡 useMemo를 사용하여 categoryType에 따라 표시할 대분류 목록 필터링
    const drinkCategories = useMemo(() => {
        if (categoryType === 'SPIRIT_ONLY') {
            // 조주 정보 -> 기주 종류: '증류주'만 표시
            return ALL_DRINK_CATEGORIES.filter(c => c.majorCategory.includes('증류주'));
        } else {
            // Drink -> 술 분류 (DRINK_TYPE_ONLY 또는 GENERAL): 모든 분류(발효, 증류, 혼성) 표시
            return ALL_DRINK_CATEGORIES;
        }
    }, [categoryType]);

    // 💡 목록이 변경될 때 선택 상태 초기화
    useEffect(() => {
        setSelectedMajorCategory(null);
        setSelectedMediumItem(null);
        // SPIRIT_ONLY일 경우 (증류주만 남을 경우) 첫 항목 자동 선택
        if (categoryType === 'SPIRIT_ONLY' && drinkCategories.length > 0) {
            setSelectedMajorCategory(drinkCategories[0].majorCategory);
        }
    }, [categoryType, drinkCategories]);

    // 선택된 대분류 객체 찾기
    const currentMajorCategory = drinkCategories.find(
        cat => cat.majorCategory === selectedMajorCategory
    );

    // 💡 [핸들러 1] 대분류 클릭 시 호출
    const handleMajorCategoryClick = (categoryName: string) => {
        // 대분류 변경 시, 중분류 선택 초기화
        setSelectedMajorCategory(prev => (prev === categoryName ? null : categoryName));
        setSelectedMediumItem(null);
    };

    // 💡 [핸들러 2] 중분류 항목 클릭 시 호출 (상세 페이지 이동 전)
    const handleMediumItemClick = (mediumItemName: string) => {
        // 중분류 선택 상태 업데이트
        setSelectedMediumItem(mediumItemName);
        console.log(`소분류(상세) 페이지: ${mediumItemName}`);
    };

    // 페이지 제목 설정
    let pageTitle: string;
    if (categoryType === 'SPIRIT_ONLY') {
        pageTitle = '🍸 기주 종류 (Base Spirits - 증류주)';
    } else {
        pageTitle = '🍾 주류 타입 분류 (Type of Alcohol)';
    }

    return (
        <div className="p-8 bg-white rounded-lg mt-8 w-full max-w-7xl mx-auto" id="drink-category-box">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">{pageTitle}</h1>

            {/* 💡 [3단 레이아웃] w-1/4, w-1/4, w-1/2 분할 */}
            <div className="flex min-h-[500px]">

                {/* === COLUMN 1: 대분류 (제조 방식) === */}
                <div className="w-1/5 pr-6 border-r border-gray-200">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4">제조 방식</h2>
                    <ul className="space-y-2">
                        {drinkCategories.map((category) => (
                            <li key={category.majorCategory}>
                                <button
                                    onClick={() => handleMajorCategoryClick(category.majorCategory)}
                                    className={`w-full text-left p-3 rounded-lg transition duration-150 text-gray-700
                                        ${selectedMajorCategory === category.majorCategory
                                            ? 'bg-amber-100 font-bold text-amber-900 border-l-4 border-amber-500'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {category.majorCategory}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* === COLUMN 2: 중분류 리스트 (클릭된 대분류에 속하는 항목) === */}
                {currentMajorCategory && (
                    <div className="w-1/4 px-6 border-r border-gray-200">
                        <h2 className="text-xl font-semibold text-amber-700 mb-4">{currentMajorCategory.majorCategory}</h2>
                        <ul className="space-y-2">
                            {currentMajorCategory.mediumCategories.map((mediumItem) => (
                                <li key={mediumItem}>
                                    <button
                                        onClick={() => handleMediumItemClick(mediumItem)}
                                        className={`w-full text-left p-3 rounded-lg transition duration-150 text-gray-700
                                            ${selectedMediumItem === mediumItem
                                                ? 'bg-blue-100 font-bold text-blue-900 border-l-4 border-blue-500'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        {mediumItem.split('(')[0].trim()} {/* 영어 이름만 표시 */}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                {/* === COLUMN 3: 상세 정보 (선택된 중분류 항목) === */}
                <div className="w-2/4 pl-6">
                    {selectedMediumItem ? (
                        <DrinkDetailView mediumItem={selectedMediumItem} />
                    ) : (
                        <div className={`p-10 text-center text-gray-500 bg-gray-50 rounded-lg h-full flex flex-col items-center justify-center 
                            ${currentMajorCategory ? 'opacity-100' : 'opacity-50'}`}
                        >
                            <p className="text-lg font-medium mb-2">
                                {currentMajorCategory ? "우측 중분류를 선택해주세요." : "좌측 대분류를 선택해주세요."}
                            </p>
                            <p className="text-sm">
                                {currentMajorCategory ? `"${currentMajorCategory.majorCategory}"에 속하는 상세 주류를 선택하세요.` : "제조 방식(발효주, 증류주, 혼성주)을 선택하면 중분류가 표시됩니다."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DrinkCategoryPage;