import React from 'react';

const ToolsPage: React.FC = () => {
    return (
        <div className="p-8 bg-white shadow-xl rounded-lg mt-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">🛠️ 조주 도구 (Bartending Tools)</h1>
            <p className="text-gray-600">칵테일 제조에 필요한 쉐이커, 지거, 스트레이너 등의 도구 정보가 표시될 페이지입니다.</p>
            {/* 여기에 실제 도구 목록과 상세 내용이 추가됩니다. */}
        </div>
    );
};

export default ToolsPage;