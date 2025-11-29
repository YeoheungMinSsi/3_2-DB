import React, { useState, useMemo, useEffect } from 'react';

// 데이터 구조 정의
interface DrinkCategory {
    majorCategory: string; // 중분류 이름 (예: "발효주")
    smallCategories: string[]; // 소분류 이름 (예: "Beer (맥주)")
}

// Props 타입 정의
interface DrinkCategoryPageProps {
    categoryType: 'SPIRIT_ONLY' | 'GENERAL' | 'DRINK_TYPE_ONLY';
}

// 💡 [핵심 수정] 제조 방식에 따른 3가지 타입으로 데이터 재구성
const ALL_DRINK_CATEGORIES: DrinkCategory[] = [
    {
        majorCategory: "발효주 (Fermented)",
        smallCategories: [
            "Beer (맥주)",
            "Wine (와인)",
            "Sake (사케/청주)",
            "Makgeolli (막걸리/탁주)",
            "Cider (애플사이더)"
        ]
    },
    {
        majorCategory: "증류주 (Distilled)",
        smallCategories: [
            "Gin (진)",
            "Vodka (보드카)",
            "Rum (럼)",
            "Tequila (데킬라)",
            "Whiskey (위스키)",
            "Brandy (브랜디/코냑)",
            "Baijiu (백주)",
            "Soju (소주)"
        ]
    },
    {
        majorCategory: "혼성주 (Compound)",
        smallCategories: [
            "Liqueur (리큐르)",
            "Vermouth (베르무트)",
            "Bitters (비터스)",
            "Sherry (셰리 와인)",
            "Port (포트 와인)"
        ]
    },
];

const DrinkCategoryPage: React.FC<DrinkCategoryPageProps> = ({ categoryType }) => {
    // 내부 상태: 현재 선택된 중분류
    const [selectedMediumCategory, setSelectedMajorCategory] = useState<string | null>(null);

    // 💡 [필터링 로직 수정] categoryType에 따라 보여줄 분류 결정
    const drinkCategories = useMemo(() => {
        if (categoryType === 'SPIRIT_ONLY') {
            // 조주 정보 -> 기주 종류: 칵테일의 기주(Base)는 주로 '증류주'입니다.
            return ALL_DRINK_CATEGORIES.filter(c => c.majorCategory.includes('증류주'));
        } else {
            // Drink -> 술 분류 (DRINK_TYPE_ONLY 또는 GENERAL): 모든 분류(발효, 증류, 혼성) 표시
            return ALL_DRINK_CATEGORIES;
        }
    }, [categoryType]);

    // 💡 페이지 진입 시, 목록이 하나뿐이면(예: 기주 종류) 자동으로 선택되게 하거나,
    // 목록이 변경될 때 선택 상태 초기화
    useEffect(() => {
        if (drinkCategories.length > 0) {
            // 첫 번째 항목을 기본으로 선택할지 여부는 선택사항입니다. 
            // 여기서는 사용자가 직접 누르도록 초기화만 합니다.
            // 만약 '기주 종류' 클릭 시 바로 목록을 보고 싶다면 아래 주석을 해제하세요.
            if (categoryType === 'SPIRIT_ONLY') {
                setSelectedMajorCategory(drinkCategories[0].majorCategory);
            } else {
                setSelectedMajorCategory(null);
            }
        }
    }, [drinkCategories, categoryType]);

    // 선택된 중분류 데이터 찾기
    const currentCategory = drinkCategories.find(
        cat => cat.majorCategory === selectedMediumCategory
    );

    const handleMediumCategoryClick = (categoryName: string) => {
        setSelectedMajorCategory(prev => (prev === categoryName ? null : categoryName));
    };

    const handleSmallCategoryClick = (smallCategoryName: string) => {
        console.log(`소분류 '${smallCategoryName}' 페이지로 이동 요청.`);
    };

    // 페이지 제목 설정
    let pageTitle: string;
    if (categoryType === 'SPIRIT_ONLY') {
        pageTitle = '🍸 기주 종류 (Base Spirits - 증류주)';
    } else {
        pageTitle = '🍾 주류 타입 분류 (Type of Alcohol)';
    }

    return (
        <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">{pageTitle}</h1>

            <div className="flex min-h-[400px]"> {/* 최소 높이 설정 */}
                {/* 1. 중분류 목록 (좌측) */}
                <div className="w-1/4 pr-6 border-r border-gray-200">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4">제조 방식</h2>
                    <ul className="space-y-2">
                        {drinkCategories.map((category) => (
                            <li key={category.majorCategory}>
                                <button
                                    onClick={() => handleMediumCategoryClick(category.majorCategory)}
                                    className={`w-full text-left p-3 rounded-lg transition duration-150 text-gray-700
                                        ${selectedMediumCategory === category.majorCategory
                                            ? 'bg-amber-100 font-bold text-amber-900 border-l-4 border-amber-500'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {/* 이름에서 괄호 앞부분만 강조하거나 그대로 출력 */}
                                    {category.majorCategory}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. 소분류 목록 (우측) */}
                <div className="w-3/4 pl-6">
                    {currentCategory ? (
                        <>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                                {currentCategory.majorCategory}의 종류
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                {currentCategory.smallCategories.map((item) => {
                                    // 💡 줄 바꿈 로직 유지
                                    const parts = item.split('(');

                                    return (
                                        <div
                                            key={item}
                                            onClick={() => handleSmallCategoryClick(item)}
                                            className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-amber-50 cursor-pointer transition duration-150 text-center text-sm font-medium border border-gray-200 flex flex-col justify-center items-center h-24"
                                        >
                                            <span className="leading-snug">
                                                {parts.map((part, index) => (
                                                    <React.Fragment key={index}>
                                                        {index > 0 && <br />}
                                                        {index === 0 ? part.trim() : `(${part.trim()}`}
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="p-10 text-center text-gray-500 bg-gray-50 rounded-lg h-full flex flex-col items-center justify-center">
                            <p className="text-lg font-medium mb-2">좌측에서 분류를 선택해주세요.</p>
                            <p className="text-sm">발효주, 증류주, 혼성주 중 하나를 선택하면<br />상세 종류를 확인할 수 있습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DrinkCategoryPage;