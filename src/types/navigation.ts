// src/types/navigation.ts

// Nav 컴포넌트의 드롭다운 항목이 기대하는 CategoryType을 모두 포괄하는 union type
export type CategoryType =
  'SPIRIT_ONLY' |
  'GENERAL' |
  'DRINK_TYPE_ONLY' |
  'drink' |
  'bartending';

// 메뉴 항목 정의 (NavItemDropdown에서 사용될 수 있음)
export interface MenuItem {
  label: string;
  pageId: string;
  categoryType?: CategoryType;
  path: string;
}

// 메뉴 그룹 정의 (Nav, NavItemDropdown에서 사용)
export interface MenuGroup {
  groupTitle: string;
  items: MenuItem[];
}

// Nav 컴포넌트의 Props 정의 (Layout에서 사용)
export interface NavProps {
  // Layout.tsx의 handleNavigation 함수와 정확히 일치해야 합니다.
  navigateTo: (pageId: string, categoryType?: CategoryType) => void;

  // 메뉴 데이터는 MenuGroup 배열을 기대합니다.
  drinkMenuGroups: MenuGroup[];
  bartendingMenuGroups: MenuGroup[];
}