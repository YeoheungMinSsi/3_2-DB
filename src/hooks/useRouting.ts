import { useNavigate } from 'react-router-dom';
import type { Page, CategoryType } from '../types/cocktail'; // 💡 타입 임포트 수정
import { allRoutes, drinkMenuGroups, bartendingMenuGroups } from '../config/menuRoutes'; // 💡 설정 임포트 수정
// import type {MenuGroup} from '../config/menuRoutes';

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