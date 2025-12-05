// src/config/apiConfig.ts (중앙 설정 파일)

// 1. 환경 변수에서 기본 URL을 가져옵니다.
export const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const ENDPOINTS = {
    COCKTAILS: '/cocktails',
    COCKTAIL_STYLES: '/cocktail-styles',
    // 추후 다른 API 경로 추가 시:
    // INGREDIENTS: '/ingredients',
};

// 3. 완전한 URL을 구성하는 헬퍼 함수를 만듭니다.
export const getApiUrl = (endpoint: string): string => {
    return `${API_BASE_URL}${endpoint}`;
};