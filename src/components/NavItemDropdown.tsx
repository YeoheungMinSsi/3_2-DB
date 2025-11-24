import React from 'react';

// 💡 CategoryType에 'DRINK_TYPE_ONLY' 추가
type CategoryType = 'SPIRIT_ONLY' | 'GENERAL' | 'DRINK_TYPE_ONLY';

// 💡 새로운 데이터 구조 정의: 아이템이 라벨, 페이지 ID, 그리고 옵션 타입(DrinkCategoryPage에 전달될)을 가집니다.
interface MenuItem {
    label: string;
    pageId: string; // 이동할 페이지 ID
    categoryType?: CategoryType; // DrinkCategoryPage 컴포넌트에 전달할 옵션
}

interface MenuGroup {
    groupTitle: string; // 드롭다운 내부 섹션 제목
    items: MenuItem[];    // 해당 섹션의 목록 항목들
}

// Props 타입 정의
interface NavItemDropdownProps {
    title: string; // 드롭다운 버튼에 표시될 제목
    menuGroups: MenuGroup[]; // 그룹화된 메뉴 항목 배열
    tabIndex: number; // 고유한 tabIndex (클릭 제어 및 접근성용)
    // 💡 onItemClick 함수는 pageId와 categoryType을 전달받도록 수정
    onItemClick: (pageId: string, categoryType?: CategoryType) => void;
}

const NavItemDropdown: React.FC<NavItemDropdownProps> = ({ title, menuGroups, tabIndex, onItemClick }) => {

    return (
        // daisyUI의 드롭다운 컨테이너
        <div className="dropdown">

            {/* Dropdown Button (tabIndex를 사용하여 클릭으로 열림) */}
            <div
                tabIndex={tabIndex}
                role="button"
                className="m-1 font-normal text-lg cursor-pointer flex items-center p-2 rounded-lg hover:bg-amber-100 transition duration-150"
            >
                {title}
                {/* 드롭다운 아이콘 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Dropdown Content */}
            <ul tabIndex={tabIndex} className="dropdown-content menu bg-base-100 rounded-box z-10 w-56 p-2 shadow-lg">
                {/* menuGroups를 순회하며 그룹 제목과 하위 항목들을 렌더링합니다. */}
                {menuGroups.map((group, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                        {/* 그룹 제목이 있다면 표시 (daisyUI의 menu-title 클래스 사용) */}
                        {group.groupTitle && <li className="menu-title"><span>{group.groupTitle}</span></li>}

                        {group.items.map((item, itemIndex) => (
                            <li key={`${groupIndex}-${itemIndex}`}>
                                {/* 💡 클릭 시 onItemClick 호출, categoryType이 있으면 함께 전달 */}
                                <a
                                    onClick={() => onItemClick(item.pageId, item.categoryType)}
                                    className="cursor-pointer"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default NavItemDropdown;