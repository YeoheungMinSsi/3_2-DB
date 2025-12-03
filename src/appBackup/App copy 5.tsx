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

// JSON 데이터를 가져옵니다. 💡 [제거] 로컬 JSON 로드 구문 제거
// import cocktailData from '../public/sul.json'; 


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

  // 💡 [추가] API에서 받아올 데이터를 상태로 관리 (초기값 빈 배열)
  const [allCocktails, setAllCocktails] = useState<CocktailData[]>([]);
  const [currentCocktail, setCurrentCocktail] = useState<CocktailData | null>(null);

  // 💡 [추가] 로딩 및 오류 상태 관리 (API 호출의 필수 요소)
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  // 💡 [핵심 추가] NestJS 백엔드 API에서 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        // 💡 [NestJS API 호출] NestJS 서버의 칵테일 엔드포인트를 호출
        const response = await fetch('http://localhost:3000/cocktails');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CocktailData[] = await response.json();
        setAllCocktails(data);

        // 💡 [핵심 수정] 데이터 로드 성공 후, currentCocktail을 null로 유지하여 클릭 전에는 숨깁니다.
        // allCocktails에 데이터가 있고, currentCocktail이 null일 경우에만 초기값을 설정합니다.
        // (클릭 전 비어있기 기능 유지를 위해, 초기에는 null로 두고 클릭 시에만 설정)
        // 하지만 데이터는 로드되었으므로 isLoading은 해제합니다.

        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        console.error("칵테일 데이터를 불러오는 중 오류 발생: NestJS 서버를 확인하세요.", error);
        setIsError(true); // 💡 오류 상태 설정
        setIsLoading(false);
      }
    };

    fetchCocktails();
  }, []); // 컴포넌트 마운트 시 한 번만 실행


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
      // 💡 데이터가 없으면 오류 메시지를 띄우기 위해 isError를 true로 설정합니다.
      setIsError(true);
      return;
    }

    // 💡 [수정] 데이터가 있을 때만 무작위 칵테일 설정
    const randomIndex = Math.floor(Math.random() * allCocktails.length);
    const randomCocktail = allCocktails[randomIndex];
    setCurrentCocktail(randomCocktail);

    // 혹시 오류 상태였다면 클릭으로 복구 시도 시 오류 상태 해제
    setIsError(false);
  };


  // 💡 [조건부 렌더링 메소드] 현재 페이지에 따라 내용을 렌더링
  const renderPageContent = () => {
    const contentWrapperClass = 'w-full max-w-[1440px] mx-auto';

    // 💡 [추가] 오류 발생 시 오류 메시지 표시
    if (isError) {
      return (
        <div className={`${contentWrapperClass} p-8 mt-8 text-center bg-red-100 rounded-lg`}>
          <h1 className="text-3xl font-bold text-red-700 mb-4">데이터 로드 실패</h1>
          <p className="text-gray-700">
            NestJS 백엔드 서버가 실행 중이거나 데이터를 정상적으로 반환하는지 확인해 주세요.
            (주소: <span className='font-mono text-sm'>http://localhost:3000/cocktails</span>)
          </p>
          <p className="mt-2 text-sm text-gray-500">브라우저 콘솔(F12)에서 자세한 네트워크 오류를 확인할 수 있습니다.</p>
        </div>
      );
    }

    // 💡 로딩 중인 경우 로딩 메시지 표시
    if (isLoading) {
      return (
        <div className={`${contentWrapperClass} flex justify-center items-center p-16 h-full min-h-[500px]`}>
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
          <p className="ml-3 text-lg text-gray-600">데이터를 로드하는 중입니다...</p>
        </div>
      );
    }

    // 💡 [유지] 데이터 로드 성공 후 페이지 콘텐츠 렌더링
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