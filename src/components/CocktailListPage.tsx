import { useState, useMemo } from 'react';
import type { CocktailData } from '../types/cocktail';

// 페이지당 표시할 항목 수 (상수)
const ITEMS_PER_PAGE = 10;

// App.tsx와 일치하는 타입 정의
// interface CocktailData {
//     cocktail_id: number;
//     name_kr: string;
//     name_en: string;
//     category: string;
//     ingredients: string[];
//     ingredients_kr: string[];
//     method_kr: string;
//     calculated_abv?: string; // 💡 sul.json에 있는 도수 필드
// }

interface CocktailListPageProps {
    cocktails: CocktailData[];
}

const CocktailListPage: React.FC<CocktailListPageProps> = ({ cocktails }) => {
    // 💡 [상태 0] 현재 페이지 번호 (초기값: 1)
    const [currentPage, setCurrentPage] = useState(1);
    // 💡 [상태 1] 현재 모달에 표시할 칵테일 데이터
    const [selectedCocktail, setSelectedCocktail] = useState<CocktailData | null>(null);
    // 💡 [상태 2] 모달 열림/닫힘 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ----------------------------------------------------
    // 💡 [페이지네이션 로직]
    const totalPages = Math.ceil(cocktails.length / ITEMS_PER_PAGE);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    // 현재 페이지의 항목만 잘라내기
    const currentItems = cocktails.slice(indexOfFirstItem, indexOfLastItem);

    // 💡 특정 페이지로 이동하는 핸들러 (totalPages를 넘어서지 않도록 안전 장치 추가)
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // 💡 이전/다음 페이지 이동 핸들러
    const handleNextPage = () => handlePageChange(currentPage + 1);
    const handlePrevPage = () => handlePageChange(currentPage - 1);

    // 💡 첫 페이지/마지막 페이지 이동 핸들러
    const handleFirstPage = () => handlePageChange(1);
    const handleLastPage = () => handlePageChange(totalPages);


    // 💡 표시할 페이지 번호 목록 계산 (최대 5개 표시 + 생략 처리) - 안정화된 로직
    const pagesToShow = useMemo(() => {
        if (totalPages <= 1) return [];

        const maxVisiblePages = 5;
        const pages: (number | string)[] = [];

        // 1. 기본 표시할 페이지 범위 설정
        let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        // 2. 끝 페이지 번호가 totalPages와 가까울 때 시작점 조정
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, totalPages - maxVisiblePages + 1);
            end = totalPages;
        }

        // 3. 페이지 번호 채우기
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // 4. 왼쪽 생략 부호 처리 (1 페이지 포함)
        if (start > 1) {
            if (start > 2) pages.unshift('...'); // 2보다 크면 생략 부호
            if (pages[0] !== 1) pages.unshift(1); // 1 페이지가 없으면 추가
        }

        // 5. 오른쪽 생략 부호 처리 (마지막 페이지 포함)
        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...'); // totalPages - 1 보다 작으면 생략 부호
            if (pages[pages.length - 1] !== totalPages) pages.push(totalPages);
        }

        // 중복 페이지 번호 제거 (1과 totalPages가 이미 추가된 경우를 대비)
        return Array.from(new Set(pages));

    }, [currentPage, totalPages]);
    // ----------------------------------------------------


    // 💡 [핸들러] '자세히' 버튼 클릭 시
    const handleDetailClick = (cocktail: CocktailData) => {
        setSelectedCocktail(cocktail);
        setIsModalOpen(true);
    };

    // 💡 [핸들러] 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCocktail(null);
    };


    if (!cocktails || cocktails.length === 0) {
        return (
            <div className="bg-white shadow-xl rounded-lg w-full text-center text-red-500 p-8 mt-8">
                <p>칵테일 데이터를 불러올 수 없거나 목록이 비어 있습니다.</p>
            </div>
        );
    }

    return (
        // 레이아웃 문제 해결을 위해 max-w-6xl mx-auto는 제거하고 w-full만 사용합니다.
        <div className="bg-white shadow-xl rounded-lg w-full" id="cocktail-list-page">
            {/* 💡 내부 패딩/마진을 위한 래퍼 */}
            <div className="p-8 mt-8">
                <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">
                    🍸 전체 칵테일 목록 ({cocktails.length}종)
                </h1>

                {/* daisyUI Menu 컨테이너를 사용하여 리스트 구조를 만듭니다. */}
                <ul className="menu bg-base-100 w-full p-2 rounded-box border border-gray-100 shadow-lg">
                    {currentItems.map((cocktail) => {
                        // 💡 도수 정보 추출
                        const abv = cocktail.calculated_abv || "N/A";

                        return (
                            <li key={cocktail.cocktail_id} className="mb-2">
                                {/* 항목 자체를 Hero 스타일로 디자인 */}
                                <div className="card bg-amber-50 hover:bg-amber-100 shadow-md p-4 h-45 transition-all duration-300">
                                    <div className="card-body p-0">
                                        <div className="flex justify-between items-center">

                                            {/* 이름/카테고리/도수 정보 영역 */}
                                            <div className="flex-1 min-w-0">
                                                {/* 1. 이름 */}
                                                <h2 className="text-xl font-extrabold text-amber-800 truncate">
                                                    {cocktail.name_kr} ({cocktail.name_en})
                                                </h2>
                                                {/* 2. 카테고리 (이름 아래) */}
                                                <p className="badge badge-outline badge-primary mt-1 text-xs">{cocktail.category}</p>
                                                
                                                {/* 3. 도수 (카테고리 아래) */}
                                                <div className="mt-1 flex items-center text-sm text-gray-600">
                                                    <span className="font-semibold mr-1">도수 (ABV):</span>
                                                    <span className="font-bold text-blue-600">
                                                        {abv === "미지원" ? "N/A" : abv}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* (이전 도수 섹션 제거)
                                            <div className="w-24 text-center">
                                                <h3 className="font-semibold text-gray-700">도수 (ABV)</h3>
                                                <p className="text-lg font-bold text-blue-600">
                                                    {abv === "미지원" ? "N/A" : abv}
                                                </p>
                                            </div> */}

                                            {/* 자세히 버튼 */}
                                            <div className="ml-8 self-center">
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    id = "cockList-detail-button"
                                                    onClick={() => handleDetailClick(cocktail)}
                                                >
                                                    자세히
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* 💡 [페이지네이션 컨트롤] */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">

                        {/* 첫 페이지로 이동 버튼 */}
                        <button
                            className="btn btn-sm btn-square btn-neutral"
                            onClick={handleFirstPage}
                            disabled={currentPage === 1}
                        >
                            {'<<'}
                        </button>

                        {/* 이전 페이지 버튼 */}
                        <button
                            className="btn btn-sm btn-neutral"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            이전
                        </button>

                        {/* 페이지 번호 목록 */}
                        <div className="join">
                            {pagesToShow.map((page, index) => (
                                <button
                                    key={index}
                                    className={`join-item btn btn-sm ${page === currentPage ? 'btn-active btn-warning' : ''}`}
                                    // '...' 문자열인 경우 버튼을 비활성화하고 아무것도 하지 않음
                                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                                    disabled={typeof page !== 'number'}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        {/* 다음 페이지 버튼 */}
                        <button
                            className="btn btn-sm btn-neutral"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            다음
                        </button>

                        {/* 마지막 페이지로 이동 버튼 */}
                        <button
                            className="btn btn-sm btn-square btn-neutral"
                            onClick={handleLastPage}
                            disabled={currentPage === totalPages}
                        >
                            {'>>'}
                        </button>
                    </div>
                )}
            </div>


            {/* === 💡 칵테일 상세 정보 Modal (daisyUI) === */}
            {selectedCocktail && (
                <dialog id="cocktail_modal" className={`modal ${isModalOpen ? 'modal-open' : ''}`} open={isModalOpen}>
                    <div className="modal-box w-11/12 max-w-3xl">
                        <h3 className="font-bold text-3xl text-amber-700 mb-2">{selectedCocktail.name_kr}</h3>
                        {/* 💡 [수정/추가]: 모달 제목 아래에도 도수 정보 표시 */}
                        <p className="text-lg text-gray-500 mb-4">
                            ({selectedCocktail.name_en}) | 도수: {selectedCocktail.calculated_abv && selectedCocktail.calculated_abv !== "미지원" ? selectedCocktail.calculated_abv : 'N/A'}
                        </p>

                        <div className="py-4 space-y-4">

                            {/* 1. 재료 */}
                            <div>
                                <h4 className="text-xl font-semibold text-gray-700 border-b pb-1">🍸 재료 (Ingredients)</h4>
                                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1 mt-2">
                                    {(selectedCocktail.ingredients_kr && selectedCocktail.ingredients_kr.length > 0 ? selectedCocktail.ingredients_kr : selectedCocktail.ingredients).map((ing, index) => (
                                        <li key={index}>{ing}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* 2. 제조 방법 */}
                            <div>
                                <h4 className="text-xl font-xl font-semibold text-gray-700 border-b pb-1">🧪 제조 방법 (Method)</h4>
                                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{selectedCocktail.method_kr}</p>
                            </div>

                        </div>

                        <div className="modal-action">
                            <button className="btn btn-error" onClick={closeModal}>닫기</button>
                        </div>
                    </div>

                    {/* 모달 외부 클릭 시 닫히는 영역 */}
                    <form method="dialog" className="modal-backdrop" onClick={closeModal}>
                        <button>닫기</button>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default CocktailListPage;