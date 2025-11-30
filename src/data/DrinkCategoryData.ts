// 💡 [데이터 정의] 주류 분류 데이터 구조를 정의합니다.
// 외부 파일(DrinkCategoryPage.tsx)에서 사용할 수 있도록 반드시 export 해야 합니다.
export interface DrinkCategory {
    majorCategory: string; // 대분류 이름 (예: "발효주")
    mediumCategories: string[]; // 중분류 이름 (예: "Beer (맥주)")
}

// 💡 [핵심 데이터] 제조 방식에 따른 3가지 타입 데이터
export const ALL_DRINK_CATEGORIES: DrinkCategory[] = [
    {
        majorCategory: "발효주 (Fermented)",
        mediumCategories: [
            "Beer (맥주)",
            "Wine (와인)",
            "Sake (사케/청주)",
            "Makgeolli (막걸리/탁주)",
            "Cider (애플사이더)"
        ]
    },
    {
        majorCategory: "증류주 (Distilled)",
        mediumCategories: [
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
        mediumCategories: [
            "Liqueur (리큐르)",
            "Vermouth (베르무트)",
            "Bitters (비터스)",
            "Sherry (셰리 와인)",
            "Port (포트 와인)"
        ]
    },
];