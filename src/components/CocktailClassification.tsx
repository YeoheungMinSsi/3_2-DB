// src/components/CocktailClassification.tsx
import React, { useState, useEffect } from 'react';
import type { CocktailStyle } from './interfaces/CocktailStyle';

// NestJS API 엔드포인트
const API_URL = 'http://localhost:3000/cocktail-styles';

function CocktailClassification() {
    const [styles, setStyles] = useState<CocktailStyle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                // fetch API를 사용하여 데이터 호출
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`API 호출 실패 (HTTP 상태 코드: ${response.status})`);
                }

                const data: CocktailStyle[] = await response.json();
                setStyles(data);
            } catch (err) {
                console.error("데이터 로드 중 오류 발생:", err);
                setError(`데이터 로드 중 오류 발생: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStyles();
    }, []);

    if (isLoading) {
        return <div className='content p-8 text-center text-lg'>데이터를 불러오는 중입니다...</div>;
    }

    if (error) {
        // Tailwind/DaisyUI 경고 스타일
        return <div role="alert" className="alert alert-error m-8 max-w-[1440px] mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
        </div>;
    }

    return (
        // src/App.css의 .content 스타일 반영
        <div className='content'>
            <h1 className="text-3xl font-extrabold text-center mb-10 text-neutral-content">
                칵테일 기능별 분류 (Back-end API)
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

                            <p className="text-sm font-semibold mt-4">대표 칵테일 예시:</p>
                            <p className="text-xs text-gray-500 max-w-full overflow-hidden text-ellipsis">
                                {style.iba_cocktail_examples.kr.join(' • ')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CocktailClassification;