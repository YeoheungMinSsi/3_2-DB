// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 새로 정의한 컴포넌트들을 임포트합니다.
import Layout from './components/Layout';
import CocktailClassification from './components/CocktailClassification';

// 루트 경로에 표시될 임시 메인 콘텐츠
const HomeContent = () => (
  // src/App.css의 .content 스타일 반영
  <div className='content'>
    <div className='h-[30rem] flex items-center justify-center text-3xl font-bold bg-rgb(219, 253, 253)'>
      메인 페이지입니다.
    </div>
    <p className='p-4 text-center text-xl'>
      칵테일 분류 정보를 보려면 상단 메뉴의 **술 정보**를 클릭하세요.
    </p>
  </div>
);


function App() {
  return (
    <Router>
      <Routes>
        {/* 루트 경로 ('/') */}
        <Route path="/" element={
          <Layout>
            <HomeContent />
          </Layout>
        } />

        {/* '/cocktail-styles' 경로에 기능별 분류 페이지 연결 */}
        <Route path="/cocktail-styles" element={
          <Layout>
            <CocktailClassification />
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App