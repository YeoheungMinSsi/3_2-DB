// src/components/Layout.tsx
import React from 'react';
import Nav from './Nav'; // 새로 만든 Nav 컴포넌트 임포트

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
    return (
        // #main과 #container ID를 유지하여 기존 스타일 복원
        <div id='main'>
            <Nav /> {/* 💡 Nav 컴포넌트 사용 */}

            <div id='container'>
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default Layout;