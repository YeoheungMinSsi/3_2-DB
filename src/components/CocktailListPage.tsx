import React, { useState } from 'react';

// App.tsx와 일치하는 타입 정의
interface CocktailData {
    cocktail_id: number;
    name_kr: string;
    name_en: string;
    category: string;
    ingredients: string[];
    ingredients_kr: string[];
    method_kr: string;
    calculated_abv?: string; // sul.json에 있으나 타입 정의가 누락된 경우를 대비해 추가
}

interface CocktailListPageProps {
    cocktails: CocktailData[];
}

const CocktailListPage: React.FC<CocktailListPageProps> = ({ cocktails }) => {
    // 💡 [상태 1] 현재 모달에 표시할 칵테일 데이터
    const [selectedCocktail, setSelectedCocktail] = useState<CocktailData | null>(null);
    // 💡 [상태 2] 모달 열림/닫힘 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 💡 [핸들러] '자세히' 버튼 클릭 시
    const handleDetailClick = (cocktail: CocktailData) => {
        setSelectedCocktail(cocktail);
        setIsModalOpen(true);
        // HTML 모달을 제어하기 위해 DOM API를 사용할 수도 있습니다. (daisyUI 방식)
        // document.getElementById('cocktail_modal').showModal();
    };

    // 💡 [핸들러] 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCocktail(null);
    };


    if (!cocktails || cocktails.length === 0) {
        return (
            <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-4xl mx-auto text-center text-red-500">
                <p>칵테일 데이터를 불러올 수 없거나 목록이 비어 있습니다.</p>
            </div>
        );
    }

    return (
        // 💡 [수정] max-w-full을 제거하고 max-w-7xl (1280px)을 사용하여, 1440px에 가장 가깝게 너비를 제한하고 중앙 정렬합니다.
        <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">🍸 전체 칵테일 목록 ({cocktails.length}종)</h1>

            {/* daisyUI Menu 컨테이너를 사용하여 리스트 구조를 만듭니다. */}
            <ul className="menu bg-base-100 w-full p-2 rounded-box border border-gray-100 shadow-lg">
                {/* 칵테일 목록을 반복하여 표시 */}
                {cocktails.map((cocktail) => {
                    // 도수 정보 추출 (sul.json의 calculated_abv 필드 사용)
                    const abv = cocktail.calculated_abv || "N/A";

                    return (
                        <li key={cocktail.cocktail_id} className="mb-2">
                            {/* 항목 자체를 Hero 스타일로 디자인 */}
                            <div className="card bg-amber-50 hover:bg-amber-100 shadow-md p-4 transition-all duration-300 hero-card">
                                <div className="card-body p-0">
                                    <div className="flex justify-between items-center">

                                        {/* 이름 */}
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-lg font-extrabold text-amber-800 truncate">
                                                {cocktail.name_kr} ({cocktail.name_en})
                                            </h2>
                                            <p className="badge badge-outline badge-primary mt-1 text-xs">{cocktail.category}</p>
                                        </div>

                                        {/* 도수 */}
                                        <div className="w-24 text-center">
                                            <h3 className="font-semibold text-gray-700">도수 (ABV)</h3>
                                            <p className="text-lg font-bold text-blue-600">{abv}</p>
                                        </div>

                                        {/* 자세히 버튼 */}
                                        <div className="ml-8">
                                            <button
                                                className="btn btn-sm btn-warning"
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

            {/* === 💡 칵테일 상세 정보 Modal (daisyUI) === */}
            {selectedCocktail && (
                <dialog id="cocktail_modal" className={`modal ${isModalOpen ? 'modal-open' : ''}`} open={isModalOpen}>
                    <div className="modal-box w-11/12 max-w-3xl">
                        <h3 className="font-bold text-3xl text-amber-700 mb-2">{selectedCocktail.name_kr}</h3>
                        <p className="text-lg text-gray-500 mb-4">({selectedCocktail.name_en}) | 도수: {selectedCocktail.calculated_abv || 'N/A'}</p>

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