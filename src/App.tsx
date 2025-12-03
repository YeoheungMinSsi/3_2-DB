// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 💡 [컴포넌트]
import Nav from './components/Nav';
import Home from './components/Home';
import NotFoundContent from './components/NotFoundContent';
import CocktailListPage from './components/CocktailListPage';
import DrinkCategoryPage from './components/DrinkCategoryPage';
import ToolsPage from './components/ToolsPage';
import TechniquesPage from './components/TechniquesPage';
import RelatedPage from './components/RelatedPage';
import CocktailClassificationPage from './components/CocktailClassificationPage';

// 💡 [훅]
import { useCocktailData } from './hooks/useCocktailData';
import { useRouting } from './hooks/useRouting';

// 💡 [설정] 라우트 목록만 임포트
import { allRoutes } from './config/menuRoutes';


// MainApp 컴포넌트: 로직은 Hook으로, 설정은 Config로 위임되어 간결해졌습니다.
const MainApp: React.FC = () => {
  // 1. 라우팅 로직 사용
  const { navigateTo, drinkMenuGroups, bartendingMenuGroups } = useRouting();

  // 2. 데이터/상태 로직 사용
  const {
    allCocktails,
    currentCocktail,
    isLoading,
    isError,
    handleCardClick
  } = useCocktailData(navigateTo);

  // 로딩 UI는 별도 컴포넌트(StatusIndicator)로 분리 가능하나, 현재 App.tsx에 유지합니다.
  if (isLoading) {
    return (
      <div className='w-full max-w-[1440px] mx-auto flex justify-center items-center p-16 min-h-[500px]'>
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="ml-3 text-lg text-gray-600">데이터를 로드하는 중입니다...</p>
      </div>
    );
  }

  return (
    <div id='main'>
      {/* 1. Nav 컴포넌트: 메뉴 설정과 네비게이션 함수를 전달 */}
      <Nav
        navigateTo={navigateTo as any}
        drinkMenuGroups={drinkMenuGroups}
        bartendingMenuGroups={bartendingMenuGroups}
      />

      <div id='container'>
        <Routes>
          {/* 2. 홈 라우트 */}
          <Route
            path="/"
            element={
              <Home
                currentCocktail={currentCocktail}
                handleCardClick={handleCardClick}
                allCocktails={allCocktails}
                isError={isError}
              />
            }
          />

          {/* 3. 동적 라우트 등록: 설정 파일(allRoutes)을 기반으로 순회 */}
          {allRoutes.map((route, index) => {
            let element;

            // PageId에 따라 렌더링할 컴포넌트를 결정합니다.
            switch (route.pageId) {
              case 'COCKTAIL_INFO_PAGE':
                element = <CocktailListPage cocktails={allCocktails} />;
                break;
              case 'DRINK_CATEGORY':
                element = <DrinkCategoryPage categoryType={route.categoryType || 'GENERAL'} />;
                break;
              case 'COCKTAIL_CLASSIFICATION': // 💡 새 case 추가 및 컴포넌트 연결
                element = <CocktailClassificationPage />;
                break;
              case 'TOOLS':
                element = <ToolsPage />;
                break;
              case 'TECHNIQUES':
                element = <TechniquesPage />;
                break;
              case 'RELATED':
                element = <RelatedPage />;
                break;
              default:
                element = <NotFoundContent navigateTo={navigateTo as any} />;
            }

            return <Route key={index} path={route.path} element={element} />;
          })}

          {/* 4. 404 폴백 라우트 */}
          <Route path="*" element={<NotFoundContent navigateTo={navigateTo as any} />} />
        </Routes>
      </div>
    </div>
  );
}


const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>
);

export default AppWrapper;