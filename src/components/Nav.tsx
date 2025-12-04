import React from 'react';
import { Link } from 'react-router-dom';
import NavItemDropdown from './NavItemDropdown';
// 🚨 NavProps만 남기고 모두 제거하여 TS6196 오류 해결
import type { NavProps } from '../types/navigation';

const Nav: React.FC<NavProps> = ({ navigateTo, drinkMenuGroups, bartendingMenuGroups }) => (
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
                        onItemClick={(pageId, categoryType) => navigateTo(pageId, categoryType)}
                    />

                    {/* 2. 조주 정보 드롭다운 */}
                    <NavItemDropdown
                        title="조주 정보"
                        menuGroups={bartendingMenuGroups}
                        tabIndex={2}
                        onItemClick={(pageId, categoryType) => navigateTo(pageId, categoryType)}
                    />
                </div>
            </nav>

            {/* 로그인 영역 */}
            <div id="page_login"></div>
        </div>
    </div>
);

export default Nav;