// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// 💡 [컴포넌트] 새로 분리한 Nav와 Home, 404 페이지
import Nav from './components/Nav';
import Home from './components/Home';
import NotFoundContent from './components/NotFoundContent';

// 💡 [훅] 새로 분리한 로직 훅
import { useCocktailData } from './hooks/useCocktailData';
import { useRouting } from './hooks/useRouting';

// 💡 [기존] 페이지 컴포넌트 Import 유지
import CocktailListPage from './components/CocktailListPage';
import DrinkCategoryPage from './components/DrinkCategoryPage';
import ToolsPage from './components/ToolsPage';
import TechniquesPage from './components/TechniquesPage';
import RelatedPage from './components/RelatedPage';

// MainApp 컴포넌트는 이제 로직을 Hook으로 위임합니다.
const MainApp: React.FC = () => {
  // 1. 라우팅 로직 사용
  const { navigateTo, allRoutes, drinkMenuGroups, bartendingMenuGroups } = useRouting();

  // 2. 데이터/상태 로직 사용
  const {
    allCocktails,
    currentCocktail,
    isLoading,
    isError,
    handleCardClick
  } = useCocktailData(navigateTo); // navigateTo를 훅에 전달

  // 💡 [조건부 렌더링]
  if (isLoading) {
    return (
      <div className='w-full max-w-[1440px] mx-auto flex justify-center items-center p-16 min-h-[500px]'>
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="ml-3 text-lg text-gray-600">데이터를 로드하는 중입니다...</p>
      </div>
    );
  }

  // 💡 [메인 렌더링]
  return (
    <div id='main'>
      {/* 1. Nav 컴포넌트: 라우팅 훅에서 가져온 메뉴와 navigateTo 전달 */}
      <Nav
        navigateTo={navigateTo}
        drinkMenuGroups={drinkMenuGroups}
        bartendingMenuGroups={bartendingMenuGroups}
      />

      <div id='container'>
        {/* 2. Routes: 훅에서 관리하는 상태를 페이지 컴포넌트에 Props로 전달 */}
        <Routes>
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

          {/* 3. 나머지 라우트: allRoutes를 기반으로 동적으로 구성하는 것이 이상적이나,
                           현재 구조를 유지하며 모든 라우트 항목을 명시적으로 연결합니다. */}
          {allRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.pageId === 'COCKTAIL_INFO_PAGE' ? <CocktailListPage cocktails={allCocktails} /> :
                  route.pageId === 'DRINK_CATEGORY' ? <DrinkCategoryPage categoryType={route.categoryType || 'GENERAL'} /> :
                    route.pageId === 'TOOLS' ? <ToolsPage /> :
                      route.pageId === 'TECHNIQUES' ? <TechniquesPage /> :
                        route.pageId === 'RELATED' ? <RelatedPage /> :
                          <NotFoundContent navigateTo={navigateTo} />
              }
            />
          ))}

          <Route path="*" element={<NotFoundContent navigateTo={navigateTo} />} />
        </Routes>
      </div>
      {/* Footer는 App.tsx에 없었으므로 추가하지 않습니다. */}
    </div>
  );
}


// 💡 [최종] AppWrapper 유지
const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>
);

export default AppWrapper;