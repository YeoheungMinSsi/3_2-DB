import React, { useState } from 'react';
import './App.css'

import Card from './components/Card'
import CocktailInfo from './components/CocktailInfo';
import NavItemDropdown from './components/NavItemDropdown';
// 💡 페이지 컴포넌트들을 import
import ToolsPage from './components/ToolsPage';
import TechniquesPage from './components/TechniquesPage';
import RelatedPage from './components/RelatedPage';
import DrinkCategoryPage from './components/DrinkCategoryPage';

// JSON 데이터를 가져옵니다.
import cocktailData from '../public/sul.json';


// 💡 [OOP 개념: 열거형(Enum) 역할] - 현재 뷰 상태를 정의
type Page =
  'HOME' |
  'DRINK_CATEGORY' |
  'COCKTAIL_INFO_PAGE' |
  'TOOLS' |
  'TECHNIQUES' |
  'RELATED' |
  'SPIRIT_LIST_PAGE';

// 💡 DrinkCategoryPage로 전달할 필터 타입에 'DRINK_TYPE_ONLY'를 추가합니다.
type CategoryType = 'SPIRIT_ONLY' | 'GENERAL' | 'DRINK_TYPE_ONLY';


// sul.json 구조를 기반으로 타입 정의
interface CocktailData {
  cocktail_id: number;
  name_kr: string;
  name_en: string;
  ingredients: string[];
  ingredients_kr: string[];
  method_kr: string;
  category: string;
}


// --- 💡 [Drink 메뉴 구조 정의] ---
const drinkRoutes: { label: string; pageId: Page; categoryType?: CategoryType }[] = [
  // 💡 '기타 주류 타입'을 '술 분류'로 다시 변경하고, DRINK_TYPE_ONLY 타입 유지 (이제 이 타입은 ALL을 의미함)
  { label: "술 분류", pageId: 'DRINK_CATEGORY', categoryType: 'DRINK_TYPE_ONLY' },
  { label: "칵테일 정보", pageId: 'COCKTAIL_INFO_PAGE' },
];

const drinkMenuGroups = [
  { groupTitle: "Drink 메뉴", items: drinkRoutes }
];

// --- 💡 [조주 정보 구조 정의] ---
const bartendingRoutes: { label: string; pageId: Page; categoryType?: CategoryType }[] = [
  // 기주 종류는 SPIRIT_ONLY 타입을 유지합니다. (기주 종류만 표시)
  { label: "기주 종류", pageId: 'DRINK_CATEGORY', categoryType: 'SPIRIT_ONLY' },

  // 기존 항목 유지
  { label: "조주 도구", pageId: 'TOOLS' },
  { label: "조주 기술", pageId: 'TECHNIQUES' },
  { label: "조주 관련 페이지", pageId: 'RELATED' },
];

const bartendingMenuGroups = [
  { groupTitle: "조주 분류", items: bartendingRoutes }
];


function App() {
  // 💡 [핵심 상태 1] 현재 페이지 상태를 관리 (초기값: HOME)
  const [currentPage, setCurrentPage] = useState<Page>('HOME');

  // 💡 [핵심 상태 2] DrinkCategoryPage에 전달할 필터 타입 상태를 관리 (GENERAL은 기본값으로 유지)
  const [currentCategoryType, setCurrentCategoryType] = useState<CategoryType>('GENERAL');

  // 칵테일 추천 관련 상태 및 데이터
  const [currentCocktail, setCurrentCocktail] = useState<CocktailData | null>(null);
  const allCocktails: CocktailData[] = cocktailData as CocktailData[];


  // 💡 [라우팅 메소드] 페이지 이동 함수 (Setter 메소드 역할)
  // categoryType 인자를 추가하여 상태를 업데이트합니다.
  const navigateTo = (pageId: string, categoryType?: CategoryType) => {
    setCurrentPage(pageId as Page);
    if (categoryType) {
      setCurrentCategoryType(categoryType);
    }
  };

  // 카드를 클릭했을 때 실행될 함수
  const handleCardClick = () => {
    // HOME으로 이동하도록 설정하여 메인 화면으로 돌아가게 함
    setCurrentPage('HOME');

    if (allCocktails.length === 0) {
      console.error("칵테일 데이터가 없습니다.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * allCocktails.length);
    const randomCocktail = allCocktails[randomIndex];
    setCurrentCocktail(randomCocktail);
  };


  // 💡 [조건부 렌더링 메소드] 현재 페이지에 따라 내용을 렌더링 (C#/Java의 Switch-Case문과 유사)
  const renderPageContent = () => {
    switch (currentPage) {
      case 'HOME':
        // 홈 화면일 경우 카드와 칵테일 정보를 Flex로 배치하여 렌더링
        return (
          <div className='content'>
            <Card onClick={handleCardClick} />
            <div className='info-box'>
              <div className="fixed-info-box">
                <CocktailInfo cocktail={currentCocktail} />
              </div>
            </div>
          </div>
        );
      // --- 조주 정보 페이지들 ---
      case 'TOOLS':
        return <ToolsPage />;
      case 'TECHNIQUES':
        return <TechniquesPage />;
      case 'RELATED':
        return <RelatedPage />;
      // --- 💡 새로운 Drink 관련 페이지들 ---
      case 'DRINK_CATEGORY':
        // 💡 현재 설정된 currentCategoryType을 DrinkCategoryPage에 Props로 전달합니다.
        return <DrinkCategoryPage categoryType={currentCategoryType} />;
      case 'COCKTAIL_INFO_PAGE':
        return (
          <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">🍸 칵테일 상세 정보</h1>
            <p className="text-gray-600">모든 칵테일 목록(sul.json 기반)을 볼 수 있는 페이지입니다.</p>
          </div>
        );
      case 'SPIRIT_LIST_PAGE':
        return (
          <div className="p-8 mt-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">🥂 기주별 칵테일 목록 (선택 불가)</h1>
            <p className="text-gray-600">이 페이지는 현재 사용되지 않습니다. 메뉴에서 '술 분류'나 '칵테일 정보'를 선택해주세요.</p>
          </div>
        );
      default:
        return (
          <div className="p-8 mt-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-red-600">404 - 페이지를 찾을 수 없습니다.</h1>
            <button onClick={() => navigateTo('HOME')} className="btn btn-warning mt-4">홈으로 돌아가기</button>
          </div>
        );
    }
  };


  return (
    <>
      <div id='main'>
        <div id="header">
          <div className='header-container'>
            {/* 홈페이지명 클릭 시 HOME으로 이동 */}
            <div id="page-Name"><a href="#" onClick={() => navigateTo('HOME')}>홈페이지명</a></div>

            <nav className='header-nav-container'>
              <div className="flex space-x-4 items-center">

                {/* 1. Drink 드롭다운 (술 분류 / 칵테일 정보) */}
                <NavItemDropdown
                  title="Drink"
                  menuGroups={drinkMenuGroups}
                  tabIndex={1}
                  onItemClick={navigateTo}
                />

                {/* 2. 조주 정보 드롭다운 (기주 종류, 도구, 기술, 관련 페이지) */}
                <NavItemDropdown
                  title="조주 정보"
                  menuGroups={bartendingMenuGroups}
                  tabIndex={2}
                  onItemClick={navigateTo}
                />

              </div>
            </nav>

            <div id="page_login"></div>
          </div>
        </div>

        <div id='container'>
          {/* renderPageContent 함수를 호출하여 현재 페이지 내용을 렌더링 */}
          {renderPageContent()}
        </div>
      </div>
    </>
  )
}

export default App;