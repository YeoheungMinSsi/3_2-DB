import React, { useState, useEffect } from 'react';
// 💡 [추가] React Router Hooks 및 Components import
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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


// --- 💡 라우팅 정의 맵 (경로 <-> Page) ---
// Note: React Router에서는 useLocation을 사용하여 경로를 읽습니다.
const ROUTE_MAP: { [key: string]: { pageId: Page, category?: CategoryType } } = {
  '/': { pageId: 'HOME' },
  '/drink/list': { pageId: 'COCKTAIL_INFO_PAGE' },
  '/drink/type-of-alcohol': { pageId: 'DRINK_CATEGORY', category: 'DRINK_TYPE_ONLY' },
  '/bartending/spirits': { pageId: 'DRINK_CATEGORY', category: 'SPIRIT_ONLY' },
  '/bartending/tools': { pageId: 'TOOLS' },
  '/bartending/techniques': { pageId: 'TECHNIQUES' },
  '/bartending/related': { pageId: 'RELATED' },
};

// --- 💡 [Drink 메뉴 구조 정의] ---
// 드롭다운 메뉴 항목에 path 정보를 추가합니다.
const drinkRoutes: { label: string; pageId: Page; categoryType?: CategoryType, path: string }[] = [
  { label: "술 분류", pageId: 'DRINK_CATEGORY', categoryType: 'DRINK_TYPE_ONLY', path: '/drink/type-of-alcohol' },
  { label: "칵테일 정보", pageId: 'COCKTAIL_INFO_PAGE', path: '/drink/list' },
];

const drinkMenuGroups = [
  { groupTitle: "Drink 메뉴", items: drinkRoutes }
];

// --- 💡 [조주 정보 구조 정의] ---
// 드롭다운 메뉴 항목에 path 정보를 추가합니다.
const bartendingRoutes: { label: string; pageId: Page; categoryType?: CategoryType, path: string }[] = [
  { label: "기주 종류", pageId: 'DRINK_CATEGORY', categoryType: 'SPIRIT_ONLY', path: '/bartending/spirits' },
  { label: "조주 도구", pageId: 'TOOLS', path: '/bartending/tools' },
  { label: "조주 기술", pageId: 'TECHNIQUES', path: '/bartending/techniques' },
  { label: "조주 관련 페이지", pageId: 'RELATED', path: '/bartending/related' },
];

const bartendingMenuGroups = [
  { groupTitle: "조주 분류", items: bartendingRoutes }
];


// 💡 [추가] 404 Not Found 컴포넌트
const NotFoundContent: React.FC<{ navigateTo: (pageId: Page) => void }> = ({ navigateTo }) => (
  <div className='w-full max-w-[1440px] mx-auto p-8 mt-8'>
    <h1 className="text-3xl font-bold text-red-600">404 - 페이지를 찾을 수 없습니다.</h1>
    <button onClick={() => navigateTo('HOME')} className="btn btn-warning mt-4">홈으로 돌아가기</button>
  </div>
);

// 💡 [추가] Home 페이지 콘텐츠 컴포넌트
const HomeContent: React.FC<{ currentCocktail: CocktailData | null, handleCardClick: () => void, allCocktails: CocktailData[], isError: boolean }> = ({ currentCocktail, handleCardClick, allCocktails, isError }) => {

  const contentWrapperClass = 'w-full max-w-[1440px] mx-auto';

  // 데이터 로드 실패 시, Home 페이지에서도 오류 메시지를 보여줍니다.
  if (allCocktails.length === 0 && isError) {
    return (
      <div className={`${contentWrapperClass} p-8 mt-8 text-center bg-red-100 rounded-lg`}>
        <h1 className="text-3xl font-bold text-red-700 mb-4">데이터 로드 실패</h1>
        <p className="text-gray-700">NestJS 백엔드 서버가 실행 중인지 확인해 주세요. (주소: <span className='font-mono text-sm'>http://localhost:3000/cocktails</span>)</p>
      </div>
    );
  }

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
};


// 💡 [핵심] 모든 상태와 API 로직을 포함하는 메인 컴포넌트
const MainApp: React.FC = () => {
  const navigate = useNavigate(); // 💡 [추가] 라우팅을 위한 Hook
  const location = useLocation(); // 💡 [추가] 현재 URL 경로를 읽기 위한 Hook

  const [allCocktails, setAllCocktails] = useState<CocktailData[]>([]);
  const [currentCocktail, setCurrentCocktail] = useState<CocktailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  // 💡 [API 호출] useEffect 로직 (이전 버전 유지)
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch('http://localhost:3000/cocktails');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CocktailData[] = await response.json();
        setAllCocktails(data);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        console.error("칵테일 데이터를 불러오는 중 오류 발생: NestJS 서버를 확인하세요.", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchCocktails();
  }, []); // 컴포넌트 마운트 시 한 번만 실행


  // 💡 [라우팅 메소드 수정] React Router의 useNavigate를 사용하여 URL 변경합니다.
  const navigateTo = (pageId: string, categoryType?: CategoryType) => {
    // URL 경로 찾기
    const allRoutes = [...drinkRoutes, ...bartendingRoutes];

    let path = '/';
    if (pageId !== 'HOME') {
      const targetRoute = allRoutes.find(
        r => r.pageId === pageId && (r.categoryType || 'GENERAL') === (categoryType || 'GENERAL')
      );
      path = targetRoute ? targetRoute.path : '/';
    } else {
      path = '/';
    }

    // 💡 [핵심] React Router의 useNavigate를 사용하여 URL 변경
    navigate(path);
  };

  // 💡 [Card 클릭 로직 유지]
  const handleCardClick = () => {
    navigateTo('HOME');

    if (allCocktails.length === 0) {
      setIsError(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * allCocktails.length);
    const randomCocktail = allCocktails[randomIndex];
    setCurrentCocktail(randomCocktail);
    setIsError(false);
  };


  // 💡 [조건부 렌더링]
  if (isLoading) {
    return (
      <div className='w-full max-w-[1440px] mx-auto flex justify-center items-center p-16 min-h-[500px]'>
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="ml-3 text-lg text-gray-600">데이터를 로드하는 중입니다...</p>
      </div>
    );
  }

  // 💡 [메인 렌더링] 헤더와 라우터 영역을 분리하여 렌더링
  return (
    <div id='main'>
      <div id="header">
        <div className='header-container'>
          {/* 홈페이지명 클릭 시 HOME으로 이동 */}
          {/* 💡 [수정] Link 컴포넌트 사용 */}
          <div id="page-Name"><Link to="/" onClick={(e) => { e.preventDefault(); navigateTo('HOME'); }}>홈페이지명</Link></div>

          <nav className='header-nav-container'>
            <div className="flex space-x-4 items-center">

              {/* 1. Drink 드롭다운 */}
              <NavItemDropdown
                title="Drink"
                menuGroups={drinkMenuGroups}
                tabIndex={1}
                onItemClick={(pageId, categoryType) => navigateTo(pageId, categoryType)}
              />

              {/* 2. 조주 정보 드롭다운 */}
              <NavItemDropdown
                title="조주 정보"
                menuGroups={bartendingMenuGroups}
                tabIndex={2}
                onItemClick={(pageId, categoryType) => navigateTo(pageId, categoryType)}
              />

            </div>
          </nav>

          <div id="page_login"></div>
        </div>
      </div>

      <div id='container'>
        {/* 💡 [핵심] URL 경로에 따라 페이지를 분기합니다. */}
        <Routes>
          <Route path="/" element={<HomeContent currentCocktail={currentCocktail} handleCardClick={handleCardClick} allCocktails={allCocktails} isError={isError} />} />
          <Route path="/drink/list" element={<CocktailListPage cocktails={allCocktails} />} />

          {/* DrinkCategoryPage는 카테고리 타입별로 라우트를 나눕니다. */}
          <Route path="/drink/type-of-alcohol" element={<DrinkCategoryPage categoryType="DRINK_TYPE_ONLY" />} />
          <Route path="/bartending/spirits" element={<DrinkCategoryPage categoryType="SPIRIT_ONLY" />} />

          <Route path="/bartending/tools" element={<ToolsPage />} />
          <Route path="/bartending/techniques" element={<TechniquesPage />} />
          <Route path="/bartending/related" element={<RelatedPage />} />

          {/* 404 폴백 라우트 */}
          <Route path="*" element={<NotFoundContent navigateTo={navigateTo} />} />
        </Routes>
      </div>
    </div>
  )
}


// 💡 [최종] App 컴포넌트를 BrowserRouter로 감싸서 라우팅 기능을 활성화합니다.
const AppWrapper: React.FC = () => (
  // URL 도메인 전체를 변경하므로, BrowserRouter를 사용합니다.
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>
);

export default AppWrapper;