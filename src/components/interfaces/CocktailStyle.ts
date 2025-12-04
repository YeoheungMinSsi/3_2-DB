
export interface StylesName {
    kr: string;
    en: string;
}

export interface IbaCocktailExamples {
    kr: string[];
    en: string[];
}

// 최종 칵테일 분류 데이터 구조
export interface CocktailStyle {
    serving_styles_id: number;
    styles_name: StylesName;
    feature: string[];
    iba_cocktail_examples: IbaCocktailExamples;
}