// src/hooks/useRouting.ts

import { useNavigate } from 'react-router-dom';

// App.tsx에서 정의된 타입 복사
type Page = 'HOME' | 'DRINK_CATEGORY' | 'COCKTAIL_INFO_PAGE' | 'TOOLS' | 'TECHNIQUES' | 'RELATED' | 'SPIRIT_LIST_PAGE';
type CategoryType = 'SPIRIT_ONLY' | 'GENERAL' | 'DRINK_TYPE_ONLY';

interface RouteItem {
    label: string;
    pageId: Page;
    categoryType?: CategoryType;
    path: string;
}
interface MenuGroup {
    groupTitle: string;
    items: RouteItem[];
}

// Drink 메뉴 정의 (App.tsx에서 복사)
const drinkRoutes: RouteItem[] = [
    { label: "술 분류", pageId: 'DRINK_CATEGORY', categoryType: 'DRINK_TYPE_ONLY', path: '/drink/type-of-alcohol' },
    { label: "칵테일 정보", pageId: 'COCKTAIL_INFO_PAGE', path: '/drink/list' },
];
export const drinkMenuGroups: MenuGroup[] = [{ groupTitle: "Drink 메뉴", items: drinkRoutes }];

// 조주 정보 메뉴 정의 (App.tsx에서 복사)
const bartendingRoutes: RouteItem[] = [
    { label: "기주 종류", pageId: 'DRINK_CATEGORY', categoryType: 'SPIRIT_ONLY', path: '/bartending/spirits' },
    { label: "조주 도구", pageId: 'TOOLS', path: '/bartending/tools' },
    { label: "조주 기술", pageId: 'TECHNIQUES', path: '/bartending/techniques' },
    { label: "조주 관련 페이지", pageId: 'RELATED', path: '/bartending/related' },
];
export const bartendingMenuGroups: MenuGroup[] = [{ groupTitle: "조주 분류", items: bartendingRoutes }];

// 모든 라우트 병합
const allRoutes = [...drinkRoutes, ...bartendingRoutes];


export const useRouting = () => {
    const navigate = useNavigate();

    const navigateTo = (pageId: Page, categoryType?: CategoryType) => {
        let path = '/';

        if (pageId !== 'HOME') {
            const targetRoute = allRoutes.find(
                r => r.pageId === pageId && (r.categoryType || 'GENERAL') === (categoryType || 'GENERAL')
            );
            path = targetRoute ? targetRoute.path : '/';
        } else {
            path = '/';
        }

        navigate(path);
    };

    return {
        navigateTo,
        allRoutes,
        drinkMenuGroups,
        bartendingMenuGroups
    };
};