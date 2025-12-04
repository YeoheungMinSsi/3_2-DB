import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Home 컴포넌트 임포트
import Layout from './components/Layout'; // Layout 컴포넌트 임포트
import type { CocktailData } from './types/cocktail'; // 타입 임포트
import './App.css';

// 💡 1. VITE 환경 변수에서 API 기본 URL을 가져옵니다. (배포 주소)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const COCKTAIL_API_URL = `${API_BASE_URL}/cocktails`;

function App() {
  const [allCocktails, setAllCocktails] = useState<CocktailData[]>([]);
  const [currentCocktail, setCurrentCocktail] = useState<CocktailData | null>(null);
  const [isError, setIsError] = useState(false);

  // 💡 2. 데이터 로딩 로직 (App에서 상태 관리)
  useEffect(() => {
    // Cloud Run 주소로 API 호출
    fetch(COCKTAIL_API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: CocktailData[]) => {
        setAllCocktails(data);
        setIsError(false); // 성공
      })
      .catch(error => {
        console.error("Failed to fetch cocktails:", error);
        setIsError(true); // 실패
      });
  }, []);

  // 카드 클릭 핸들러 (랜덤 칵테일 선택 로직)
  const handleCardClick = () => {
    if (allCocktails.length > 0) {
      const randomIndex = Math.floor(Math.random() * allCocktails.length);
      setCurrentCocktail(allCocktails[randomIndex]);
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currentCocktail={currentCocktail}
                handleCardClick={handleCardClick}
                allCocktails={allCocktails}
                isError={isError}
                // 💡 Home.tsx에 필요한 apiBaseUrl Props 전달
                apiBaseUrl={API_BASE_URL}
              />
            }
          />
          {/* 기타 라우트 추가 */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;