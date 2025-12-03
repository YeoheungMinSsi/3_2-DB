// src/components/Nav.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// NavItemDropdown은 App.tsx에서 import하므로, src/components에 있어야 합니다.
import NavItemDropdown from './NavItemDropdown';
// 이미지 경로는 사용자님의 실제 경로에 맞게 확인/수정하십시오.
// import logo from '../img/logo.png'; 
// import myPage from '../img/myPage.svg'; 

// --- App.tsx에서 사용된 타입 정의 복사 (Nav 컴포넌트를 독립시키기 위함) ---
type CategoryType = 'SPIRIT_ONLY' | 'GENERAL' | 'DRINK_TYPE_ONLY';
interface MenuItem { label: string; pageId: string; categoryType?: CategoryType; path: string; }
interface MenuGroup { groupTitle: string; items: MenuItem[]; }

interface NavProps {
    navigateTo: (pageId: string, categoryType?: CategoryType) => void;
    drinkMenuGroups: MenuGroup[];
    bartendingMenuGroups: MenuGroup[];
}
// --- Types End ---


const Nav: React.FC<NavProps> = ({ navigateTo, drinkMenuGroups, bartendingMenuGroups }) => (
    // 💡 요청대로 id="header"를 Nav 컴포넌트의 최상단 div로 사용합니다.
    <div id="header">
        <div className='header-container'>
            {/* 홈페이지명 클릭 시 HOME으로 이동 */}
            <div id="page-Name">
                {/* Link를 사용하여 HOME으로 이동 */}
                <Link to="/">홈페이지명</Link>
            </div>

            <nav className='header-nav-container'>
                <div className="flex space-x-4 items-center">
                    {/* 1. Drink 드롭다운 */}
                    <NavItemDropdown
                        title="Drink"
                        menuGroups={drinkMenuGroups}
                        tabIndex={1}
                        // 💡 onItemClick 시 MainApp의 navigateTo 호출
                        onItemClick={(pageId, categoryType) => navigateTo(pageId as any, categoryType)}
                    />

                    {/* 2. 조주 정보 드롭다운 */}
                    <NavItemDropdown
                        title="조주 정보"
                        menuGroups={bartendingMenuGroups}
                        tabIndex={2}
                        // 💡 onItemClick 시 MainApp의 navigateTo 호출
                        onItemClick={(pageId, categoryType) => navigateTo(pageId as any, categoryType)}
                    />
                </div>
            </nav>

            {/* 로그인 영역 */}
            <div id="page_login"></div>
        </div>
    </div>
);

export default Nav;