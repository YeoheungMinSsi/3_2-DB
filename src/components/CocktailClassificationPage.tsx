// src/components/CocktailClassificationPage.tsx
import React, { useState, useEffect } from 'react';

// classification.json의 구조에 맞는 타입 정의
interface ClassificationStyle {
    serving_styles_id: number;
    styles_name: { kr: string, en: string };
    feature: string[];
    //iba_cocktail_examples_en 등의 불일치를 수정했다는 가정 하에 iba_cocktail_examples만 사용
    iba_cocktail_examples: { kr: string[], en: string[] };
}

const API_URL = 'http://localhost:3000/cocktail-styles';

const CocktailClassificationPage: React.FC = () => {
    const [styles, setStyles] = useState<ClassificationStyle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`API 호출 실패 (HTTP 상태 코드: ${response.status})`);
                }

                const data: ClassificationStyle[] = await response.json();
                setStyles(data);
            } catch (err) {
                console.error("칵테일 분류 데이터 로드 중 오류 발생:", err);
                setError(`데이터 로드 중 오류 발생. 백엔드(NestJS) 서버 상태 및 CORS 설정을 확인하세요.`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStyles();
    }, []);

    // --- Rendering Logic ---
    if (isLoading) {
        return <div className='content p-8 text-center text-lg'>칵테일 분류 데이터를 불러오는 중...</div>;
    }

    if (error) {
        return <div role="alert" className="alert alert-error m-8 max-w-[1440px] mx-auto">
            <span>{error}</span>
        </div>;
    }

    return (
        <div className='content p-8'>
            <h1 className="text-3xl font-extrabold text-center mb-10 text-neutral-content">
                🍹 기능별 칵테일 분류 (API 연동)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {styles.map((style) => (
                    <div key={style.serving_styles_id} className="card bg-base-100 shadow-xl border border-gray-200">
                        <div className="card-body">
                            <h2 className="card-title text-primary">{style.styles_name.kr}
                                <div className="badge badge-secondary ml-2">{style.styles_name.en}</div>
                            </h2>

                            <p className="text-sm font-semibold mt-2">주요 특징:</p>
                            <ul className="list-disc list-inside text-gray-700 ml-2">
                                {style.feature.map((f, index) => (
                                    <li key={index}>{f}</li>
                                ))}
                            </ul>

                            <p className="text-sm font-semibold mt-4">대표 예시 칵테일:</p>
                            <p className="text-xs text-gray-500 max-w-full overflow-hidden text-ellipsis">
                                {style.iba_cocktail_examples.kr.join(' • ')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CocktailClassificationPage;