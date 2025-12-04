// src/components/Layout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { drinkMenuGroups, bartendingMenuGroups } from '../config/menuRoutes'; // 🚨 경로 확인 필요
import type { NavProps } from '../types/navigation';

// Footer 컴포넌트 (이전과 동일하게 유지)
const Footer = () => (
    <div id="footer" style={{
        height: '3rem',
        backgroundColor: 'rgb(219, 253, 253)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto'
    }}>
        푸터입니다.
    </div>
);


const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigateTo = useNavigate();
    const handleNavigation: NavProps['navigateTo'] = (pageId, categoryType) => {
        
        // 여기서는 pageId를 경로로 사용하여 표준 navigate 함수를 호출합니다.
        // categoryType이 필요하다면 navigate 함수의 state 옵션으로 전달할 수 있습니다.
        navigateTo(pageId, { state: { categoryType } }); 
    };

    return (
        // #main과 #container ID를 유지하여 기존 스타일 복원
        <div id='main'>
            <Nav
                navigateTo={handleNavigation} // useNavigate를 통해 얻은 함수 전달
                drinkMenuGroups={drinkMenuGroups} // 임포트한 음료 메뉴 데이터 전달
                bartendingMenuGroups={bartendingMenuGroups} // 임포트한 바텐딩 메뉴 데이터 전달
            />

            <div id='container'>
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default Layout;