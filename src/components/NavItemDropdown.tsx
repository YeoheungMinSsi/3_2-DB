import React, { useState } from 'react';
// NavItemDropdownProps 정의에 필요한 CategoryType과 MenuGroup만 유지합니다.
import type { CategoryType, MenuGroup, MenuItem } from '../types/navigation';
import { Link } from 'react-router-dom';

// NavItemDropdown이 받는 Props를 정의합니다.
export interface NavItemDropdownProps {
    title: string;
    menuGroups: MenuGroup[]; // 중앙 정의된 MenuGroup 타입 사용
    tabIndex: number;
    // NavProps의 navigateTo와 동일한 시그니처를 사용해야 합니다.
    onItemClick: (pageId: string, categoryType?: CategoryType) => void;
}

const NavItemDropdown: React.FC<NavItemDropdownProps> = ({ title, menuGroups, onItemClick }) => {
    // 1. 드롭다운 열림/닫힘 상태 관리
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: MenuItem) => {
        // 2. 외부의 navigateTo 함수 호출
        onItemClick(item.pageId, item.categoryType);
        // 3. 메뉴 닫기
        setIsOpen(false);
    };

    return (
        // DaisyUI/Tailwind를 사용하여 드롭다운 구현
        <div
            className="dropdown dropdown-hover dropdown-end" // 마우스 오버 시 열리도록 변경
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost m-1" // DaisyUI 스타일 적용
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
            </div>

            {/* 드롭다운 내용 */}
            {isOpen && (
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    {menuGroups.map((group, groupIndex) => (
                        <React.Fragment key={groupIndex}>
                            {/* 메뉴 그룹 제목 (구분선 역할) */}
                            {group.groupTitle && (
                                <li className="menu-title">
                                    <span>{group.groupTitle}</span>
                                </li>
                            )}

                            {/* 메뉴 항목 렌더링 */}
                            {group.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <Link
                                        to={item.path}
                                        onClick={(e) => {
                                            // Link의 기본 동작을 막고 onItemClick을 통해 라우팅 처리
                                            e.preventDefault();
                                            handleItemClick(item);
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NavItemDropdown;