import React, { useState, useEffect } from 'react';
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

// JSON 데이터를 가져옵니다. (백엔드 연동 대신 이전처럼 로컬 public 폴더에서 직접 가져옴)
import cocktailData from '../public/sul.json';


// sul.json 구조를 기반으로 타입 정의 (NestJS와 동일하게 맞춤)
interface CocktailData {
  cocktail_id: number;
  name_kr: string;
  name_en: string;
  ingredients: string[];
  ingredients_kr: string[];
  method_kr: string;
  category: string;
  calculated_abv?: string;
}

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


// --- 💡 [Drink 메뉴 구조 정의] ---
const drinkRoutes: { label: string; pageId: Page; categoryType?: CategoryType }[] = [
  { label: "술 분류", pageId: 'DRINK_CATEGORY', categoryType: 'DRINK_TYPE_ONLY' },
  { label: "칵테일 정보", pageId: 'COCKTAIL_INFO_PAGE' },
];
const drinkMenuGroups = [
  { groupTitle: "Drink 메뉴", items: drinkRoutes }
];

// --- 💡 [조주 정보 구조 정의] ---
const bartendingRoutes: { label: string; pageId: Page; categoryType?: CategoryType }[] = [
  { label: "기주 종류", pageId: 'DRINK_CATEGORY', categoryType: 'SPIRIT_ONLY' },
  { label: "조주 도구", pageId: 'TOOLS' },
  { label: "조주 기술", pageId: 'TECHNIQUES' },
  { label: "조주 관련 페이지", pageId: 'RELATED' },
];
const bartendingMenuGroups = [
  { groupTitle: "조주 분류", items: bartendingRoutes }
];


function App() {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [currentCategoryType, setCurrentCategoryType] = useState<CategoryType>('GENERAL');

  // 💡 [복구] useEffect 대신, 로컬 JSON을 직접 로드하여 초기화합니다.
  const allCocktails: CocktailData[] = cocktailData as CocktailData[];

  // 💡 [복구] 초기 로딩 상태 및 오류 상태 제거
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false); 

  // 💡 [복구] 초기 칵테일 설정 로직: App 컴포넌트가 마운트될 때 한 번 실행합니다.
  const initialCocktail = () => {
    if (allCocktails.length > 0) {
      const randomIndex = Math.floor(Math.random() * allCocktails.length);
      return allCocktails[randomIndex];
    }
    return null;
  }
  const [currentCocktail, setCurrentCocktail] = useState<CocktailData | null>(initialCocktail);


  // 💡 [제거] NestJS 백엔드 API에서 데이터를 가져오는 useEffect 로직을 제거합니다.
  /*
  useEffect(() => {
    const fetchCocktails = async () => {
      // ... (기존 API 로직 제거) ...
    };
    fetchCocktails();
  }, []);
  */


  // 💡 [라우팅 메소드] 페이지 이동 함수
  const navigateTo = (pageId: string, categoryType?: CategoryType) => {
    setCurrentPage(pageId as Page);
    if (categoryType) {
      setCurrentCategoryType(categoryType);
    }
  };

  // 카드를 클릭했을 때 실행될 함수
  const handleCardClick = () => {
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
    const contentWrapperClass = 'w-full max-w-[1440px] mx-auto';

    // 💡 [제거] 로딩 중 또는 오류 발생 시의 조건부 렌더링을 제거합니다.

    switch (currentPage) {
      case 'HOME':
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
      case 'DRINK_CATEGORY':
        return (
          <div className={contentWrapperClass}>
            <DrinkCategoryPage categoryType={currentCategoryType} />
          </div>
        );
      case 'COCKTAIL_INFO_PAGE':
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

        {/* 💡 모든 페이지 컴포넌트(HOME 포함)가 이 #container 안에서 렌더링되도록 함 */}
        <div id='container'>
          {renderPageContent()}
        </div>
      </div>
    </>
  )
}

export default App;