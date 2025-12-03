// src/components/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------
// 원본 src/App.tsx의 Header HTML 구조를 그대로 복원했습니다.
const Header = () => (
    <div id="header">
        <div className='header-container'>
            <div id="page-Name">
                {/* Link를 사용하여 루트 페이지로 이동하도록 설정 */}
                <Link to="/">홈페이지명</Link>
            </div>
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

// App.css에 별도의 #footer 스타일은 없지만, Container 밖에서 구조를 닫아줍니다.
const Footer = () => (
    <div id="footer" style={{
        height: '3rem',
        backgroundColor: 'rgb(219, 253, 253)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto' // main의 flex-direction: column에 맞게 하단에 고정
    }}>
        푸터입니다.
    </div>
);
// ----------------------------------------------------

// Layout 컴포넌트: #main과 #container ID를 적용합니다.
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        // 원본 App.css의 #main 스타일을 반영합니다.
        <div id='main'>
            <Header />

            {/* 원본 App.css의 #container 스타일을 반영합니다. */}
            <div id='container'>
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default Layout;