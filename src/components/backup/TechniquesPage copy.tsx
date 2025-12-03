import React from 'react';

const TechniquesPage: React.FC = () => {
    return (
        <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">🧪 조주 기술 (Bartending Techniques)</h1>
            <p className="text-gray-600">쉐이킹, 스터링, 빌딩 등 칵테일 제조 기술에 대한 상세 내용이 표시될 페이지입니다.</p>
            {/* 여기에 실제 기술 가이드가 추가됩니다. */}
        </div>
    );
};

export default TechniquesPage;