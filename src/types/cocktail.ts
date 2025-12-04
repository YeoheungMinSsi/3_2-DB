// src/types/cocktail.ts

// 칵테일 데이터 구조
export interface CocktailData {
    cocktail_id: number;
    name_kr: string;
    name_en: string;
    ingredients: string[];
    ingredients_kr: string[];
    method_kr: string;
    method_en: string;
    category: string;
    calculated_abv?: string;
}

// 💡 [새로운 타입] cocktail_serving_styles.json의 구조
export interface ClassificationStyle {
    serving_styles_id: number;
    styles_name: { kr: string, en: string };
    feature: string[];
    iba_cocktail_examples: { kr: string[], en: string[] };
}

// 뷰 상태 (페이지 ID) - App.tsx에서 복사
export type Page =
    'HOME' |
    'DRINK_CATEGORY' |
    'COCKTAIL_INFO_PAGE' |
    'TOOLS' |
    'TECHNIQUES' |
    'RELATED' |
    'SPIRIT_LIST_PAGE' |
    'COCKTAIL_CLASSIFICATION'; // 💡 새 페이지 ID 추가

// 카테고리 필터 타입 - App.tsx에서 복사
export type CategoryType =
    'SPIRIT_ONLY' |
    'GENERAL' |
    'DRINK_TYPE_ONLY';