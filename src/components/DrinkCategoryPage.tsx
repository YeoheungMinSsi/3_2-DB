import React, { useState, useMemo } from 'react';

// 데이터 구조 정의 (App.tsx와 일치해야 합니다)
interface DrinkCategory {
    mediumCategory: string; // 중분류 이름 (예: "기주 종류")
    smallCategories: string[]; // 소분류 이름 (예: "Gin", "Vodka")
}

// 💡 Props 타입 정의: App.tsx에서 전달할 필터 타입을 받습니다. (DRINK_TYPE_ONLY 추가)
interface DrinkCategoryPageProps {
    categoryType: 'SPIRIT_ONLY' | 'GENERAL' | 'DRINK_TYPE_ONLY';
}


// 💡 모든 중분류 데이터 정의 
const ALL_DRINK_CATEGORIES: DrinkCategory[] = [
    {
        mediumCategory: "기주 종류 (Base Spirits)",
        smallCategories: ["Gin (진)", "Vodka (보드카)", "Rum (럼)", "Tequila (데킬라)", "Whiskey (위스키)", "Cognac (코냑)"]
    },
    {
        mediumCategory: "주류 타입 (Type)",
        smallCategories: ["Liqueur (리큐르)", "Brandy (브랜디)", "Fortified Wine (주정강화 와인)", "Beer (맥주)", "Sake (사케)"]
    },
    {
        mediumCategory: "생산 지역",
        smallCategories: ["European", "American", "Asian", "Other"]
    },
];


const DrinkCategoryPage: React.FC<DrinkCategoryPageProps> = ({ categoryType }) => {
    // 💡 [내부 상태] 현재 선택된 중분류를 추적 (선택되지 않았으면 null)
    const [selectedMediumCategory, setSelectedMediumCategory] = useState<string | null>(null);

    // 💡 useMemo를 사용하여 categoryType에 따라 표시할 중분류 목록을 필터링합니다.
    const drinkCategories = useMemo(() => {
        if (categoryType === 'SPIRIT_ONLY') {
            // 조주 정보 -> 기주 종류: '기주 종류'만 표시
            return ALL_DRINK_CATEGORIES.filter(c => c.mediumCategory.includes('기주 종류'));
        } else if (categoryType === 'DRINK_TYPE_ONLY') {
            // 💡 [수정됨]: Drink -> 술 분류 (기존 기타 주류 타입) - 모든 분류를 표시합니다.
            return ALL_DRINK_CATEGORIES;
        } else {
            // GENERAL (이전 '술 분류' 역할): '기주 종류'를 제외한 나머지 표시 (주류 타입, 생산 지역)
            return ALL_DRINK_CATEGORIES.filter(c => !c.mediumCategory.includes('기주 종류'));
        }
    }, [categoryType]); // categoryType이 변경될 때만 재계산

    // 선택된 중분류에 해당하는 소분류 목록을 찾습니다.
    const currentCategory = drinkCategories.find(
        cat => cat.mediumCategory === selectedMediumCategory
    );

    // 💡 [이벤트 핸들러] 중분류 클릭 시 호출되어 상태 업데이트
    const handleMediumCategoryClick = (categoryName: string) => {
        // 이미 선택된 항목을 다시 클릭하면 닫고, 아니면 선택합니다.
        setSelectedMediumCategory(prev => (prev === categoryName ? null : categoryName));
    };

    // 💡 [렌더링 헬퍼] 소분류 항목 클릭 시 실행될 함수 
    const handleSmallCategoryClick = (smallCategoryName: string) => {
        console.log(`소분류 '${smallCategoryName}' 페이지로 이동 요청.`);
    };

    // 💡 categoryType에 따른 페이지 제목 설정
    let pageTitle: string;
    if (categoryType === 'SPIRIT_ONLY') {
        pageTitle = '🍸 기주 종류 정보 (Base Spirits)';
    } else if (categoryType === 'DRINK_TYPE_ONLY') {
        // 💡 제목을 '술 분류 (전체)'로 변경
        pageTitle = '🍾 술 분류 (전체 주류/지역)';
    } else {
        pageTitle = '🍾 술 분류 (주류 타입/지역)';
    }


    return (
        <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">{pageTitle}</h1>

            <div className="flex">
                {/* 1. 중분류 목록 (좌측 네비게이션) */}
                <div className="w-1/4 pr-6 border-r border-gray-200">
                    <h2 className="text-xl font-semibold text-amber-700 mb-4">중분류</h2>
                    <ul className="space-y-2">
                        {drinkCategories.map((category) => (
                            <li key={category.mediumCategory}>
                                <button
                                    onClick={() => handleMediumCategoryClick(category.mediumCategory)}
                                    className={`w-full text-left p-3 rounded-lg transition duration-150 text-gray-700
                                        ${selectedMediumCategory === category.mediumCategory
                                            ? 'bg-amber-100 font-bold text-amber-900 border-l-4 border-amber-500'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {category.mediumCategory}
                                </button>
                            </li>
                        ))}
                        {drinkCategories.length === 0 && (
                            <li className="text-gray-500 text-sm p-3">표시할 분류가 없습니다.</li>
                        )}
                    </ul>
                </div>

                {/* 2. 소분류 목록 (우측 콘텐츠) */}
                <div className="w-3/4 pl-6">
                    {currentCategory ? (
                        <>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                                {currentCategory.mediumCategory}의 소분류
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                {currentCategory.smallCategories.map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => handleSmallCategoryClick(item)}
                                        className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-amber-50 cursor-pointer transition duration-150 text-center text-sm font-medium border border-gray-200"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="p-10 text-center text-gray-500 bg-gray-50 rounded-lg h-full flex items-center justify-center">
                            <p>좌측에서 중분류를 선택하시면 해당 주류의 소분류 목록이 표시됩니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DrinkCategoryPage;