import React from 'react';

const RelatedPage: React.FC = () => {
    return (
        <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">📚 조주 관련 페이지 (Related Info)</h1>
            <p className="text-gray-600">칵테일 역사, 용어 사전, 클래식 레시피 등 관련 정보 링크가 표시될 페이지입니다.</p>
            {/* 여기에 관련 페이지 링크나 콘텐츠가 추가됩니다. */}
        </div>
    );
};

export default RelatedPage;