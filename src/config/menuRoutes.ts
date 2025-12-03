// src/config/menuRoutes.ts
import type { Page, CategoryType } from '../types/cocktail'; // 타입 임포트

interface RouteItem { 
    label: string; 
    pageId: Page; 
    categoryType?: CategoryType; 
    path: string; 
}
export interface MenuGroup { 
    groupTitle: string; 
    items: RouteItem[]; 
}

// Drink 메뉴 정의 (App.tsx에서 복사)
export const drinkRoutes: RouteItem[] = [
    { label: "술 분류", pageId: 'DRINK_CATEGORY', categoryType: 'DRINK_TYPE_ONLY', path: '/drink/type-of-alcohol' },
    { label: "칵테일 분류", pageId: 'COCKTAIL_CLASSIFICATION', path: '/drink/classification' },
    { label: "칵테일 정보", pageId: 'COCKTAIL_INFO_PAGE', path: '/drink/list' },
];
export const drinkMenuGroups: MenuGroup[] = [{ groupTitle: "Drink 메뉴", items: drinkRoutes }];
// 조주 정보 메뉴 정의 (App.tsx에서 복사)
export const bartendingRoutes: RouteItem[] = [
    { label: "기주 종류", pageId: 'DRINK_CATEGORY', categoryType: 'SPIRIT_ONLY', path: '/bartending/spirits' },
    { label: "조주 도구", pageId: 'TOOLS', path: '/bartending/tools' },
    { label: "조주 기술", pageId: 'TECHNIQUES', path: '/bartending/techniques' },
    { label: "조주 관련 페이지", pageId: 'RELATED', path: '/bartending/related' },
];
export const bartendingMenuGroups: MenuGroup[] = [{ groupTitle: "조주 분류", items: bartendingRoutes }];

// 모든 라우트 병합
export const allRoutes = [...drinkRoutes, ...bartendingRoutes];