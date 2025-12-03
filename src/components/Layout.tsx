// src/components/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------
// App.css 구조를 재현한 Header 컴포넌트
const Header = () => (
    // src/App.css의 #header 스타일 반영
    <div id="header">
        <div className='header-container'>
            <div id="page-Name">홈페이지명</div>
            <nav className='header-nav-container'>
                <ul className='header-nav-list'>
                    {/* "술 정보" 메뉴를 새로운 페이지로 연결합니다. */}
                    <li className='header-nav' >
                        <Link to="/cocktail-styles">술 정보</Link>
                    </li>
                    <li className='header-nav'>
                        <a href="#">조주정보</a>
                    </li>
                </ul>
            </nav>
            <div className='right_header'>
                <a href="#">로그인</a>
            </div>
        </div>
    </div>
);

// App.tsx의 기존 레이아웃 구조를 단순화한 Footer 컴포넌트
const Footer = () => (
    // 간단한 푸터 스타일
    <div id="footer" style={{
        height: '3rem',
        backgroundColor: 'rgb(219, 253, 253)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        푸터입니다.
    </div>
);
// ----------------------------------------------------

// 전체 레이아웃 컴포넌트
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        // src/App.css의 #main 스타일 반영
        <div id='main'>
            <Header />

            {/* src/App.css의 #container 스타일 반영 */}
            <div id='container' style={{ minHeight: 'calc(100vh - 8rem)' }}>
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default Layout;