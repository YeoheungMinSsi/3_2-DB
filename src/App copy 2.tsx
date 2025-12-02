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
import CocktailListPage from './components/CocktailListPage';

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

// 💡 DrinkCategoryPage로 전달할 필터 타입
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
  // '술 분류' 항목: 모든 분류(발효, 증류, 혼성)를 표시
  { label: "술 분류", pageId: 'DRINK_CATEGORY', categoryType: 'DRINK_TYPE_ONLY' },
  // '칵테일 정보' 항목: 전체 리스트 페이지로 이동
  { label: "칵테일 정보", pageId: 'COCKTAIL_INFO_PAGE' },
];

const drinkMenuGroups = [
  { groupTitle: "Drink 메뉴", items: drinkRoutes }
];

// --- 💡 [조주 정보 구조 정의] ---
const bartendingRoutes: { label: string; pageId: Page; categoryType?: CategoryType }[] = [
  // 기주 종류: 증류주만 필터링하여 표시
  { label: "기주 종류", pageId: 'DRINK_CATEGORY', categoryType: 'SPIRIT_ONLY' },

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

  // 💡 [핵심 상태 2] DrinkCategoryPage에 전달할 필터 타입 상태를 관리
  const [currentCategoryType, setCurrentCategoryType] = useState<CategoryType>('GENERAL');

  // 칵테일 추천 관련 상태 및 데이터
  const [currentCocktail, setCurrentCocktail] = useState<CocktailData | null>(null);
  const allCocktails: CocktailData[] = cocktailData as CocktailData[];


  // 💡 [라우팅 메소드] 페이지 이동 함수 (Setter 메소드 역할)
  const navigateTo = (pageId: string, categoryType?: CategoryType) => {
    setCurrentPage(pageId as Page);
    if (categoryType) {
      setCurrentCategoryType(categoryType);
    }
  };

  // 카드를 클릭했을 때 실행될 함수
  const handleCardClick = () => {
    // HOME으로 이동하도록 설정
    setCurrentPage('HOME');

    if (allCocktails.length === 0) {
      console.error("칵테일 데이터가 없습니다.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * allCocktails.length);
    const randomCocktail = allCocktails[randomIndex];
    setCurrentCocktail(randomCocktail);
  };


  // 💡 [조건부 렌더링 메소드] 현재 페이지에 따라 내용을 렌더링
  const renderPageContent = () => {
    // 💡 모든 페이지에 max-w-1440px와 중앙 정렬을 적용하는 래퍼 클래스
    const contentWrapperClass = 'w-full max-w-[1440px] mx-auto';

    switch (currentPage) {
      case 'HOME':
        // [수정]: 홈 화면도 contentWrapperClass로 감싸서 너비 기준을 통일합니다.
        return (
          <div className={contentWrapperClass}>
            <div className='content'>
              <Card onClick={handleCardClick} />
              <div className='info-box'>
                <div className="fixed-info-box">
                  <CocktailInfo cocktail={currentCocktail} />
                </div>
              </div>
            </div>
          </div>
        );
      // --- Drink/조주 정보 페이지들 ---
      case 'DRINK_CATEGORY':
        return (
          <div className={contentWrapperClass}>
            <DrinkCategoryPage categoryType={currentCategoryType} />
          </div>
        );
      case 'COCKTAIL_INFO_PAGE':
        // 💡 칵테일 리스트 페이지에도 동일한 래퍼 클래스 적용
        return (
          <div className={contentWrapperClass}>
            <CocktailListPage cocktails={allCocktails} />
          </div>
        );

      case 'TOOLS':
        return (
          <div className={contentWrapperClass}>
            <ToolsPage />
          </div>
        );
      case 'TECHNIQUES':
        return (
          <div className={contentWrapperClass}>
            <TechniquesPage />
          </div>
        );
      case 'RELATED':
        return (
          <div className={contentWrapperClass}>
            <RelatedPage />
          </div>
        );

      case 'SPIRIT_LIST_PAGE':
        return (
          <div className={`${contentWrapperClass} p-8 mt-8`}>
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">🥂 기주별 칵테일 목록 (선택 불가)</h1>
            <p className="text-gray-600">메뉴에서 '술 분류'나 '칵테일 정보'를 선택해주세요.</p>
          </div>
        );

      default:
        return (
          <div className={`${contentWrapperClass} p-8 mt-8`}>
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

                {/* 1. Drink 드롭다운 */}
                <NavItemDropdown
                  title="Drink"
                  menuGroups={drinkMenuGroups}
                  tabIndex={1}
                  onItemClick={navigateTo}
                />

                {/* 2. 조주 정보 드롭다운 */}
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

        {/* 💡 [수정] 모든 페이지 컴포넌트(HOME 포함)가 이 #container 안에서 렌더링되도록 함 */}
        <div id='container'>
          {renderPageContent()}
        </div>
      </div>
    </>
  )
}

export default App;