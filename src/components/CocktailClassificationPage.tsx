// src/components/CocktailClassificationPage.tsx
import React, { useState, useEffect } from 'react';
import type { ClassificationStyle } from '../types/cocktail'; // 💡 타입 임포트
import '../App.css'

const API_URL = import.meta.env.VITE_API_URL + '/cocktail-styles';

const CocktailClassificationPage: React.FC = () => {
    const [styles, setStyles] = useState<ClassificationStyle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const response = await fetch(API_URL);

                // 💡 [수정] 304 Not Modified 응답 처리: 본문 파싱을 건너뜁니다.
                if (response.status === 304) {
                    // 304는 성공적인 캐시 사용을 의미하며, 데이터가 변경되지 않았다는 뜻입니다.
                    // 이전에 로드된 styles 상태를 유지하고 로딩만 종료합니다.
                    setIsLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`API 호출 실패 (HTTP 상태 코드: ${response.status})`);
                }

                // 200 OK 응답일 경우에만 JSON 파싱 진행
                const data: ClassificationStyle[] = await response.json();
                setStyles(data);
            } catch (err) {
                console.error("칵테일 분류 데이터 로드 중 오류 발생:", err);
                setError(`데이터 로드 중 오류 발생. NestJS 서버 상태 및 CORS 설정을 확인하세요.`);
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
        <div className='content p-8' id ='cocktail-classification-page'>
            <div id='cocktail-classification-page-name'>
                <h1 className="text-3xl font-extrabold text-center">
                    🍹 기능별 칵테일 분류
                </h1>
            </div>
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