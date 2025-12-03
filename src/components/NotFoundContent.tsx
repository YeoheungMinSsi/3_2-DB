// src/components/NotFoundContent.tsx

import React from 'react';

// App.tsx에서 정의된 타입 복사
type Page = 'HOME';

interface NotFoundProps {
    navigateTo: (pageId: Page) => void;
}

const NotFoundContent: React.FC<NotFoundProps> = ({ navigateTo }) => (
    <div className='w-full max-w-[1440px] mx-auto p-8 mt-8'>
        <h1 className="text-3xl font-bold text-red-600">404 - 페이지를 찾을 수 없습니다.</h1>
        <button onClick={() => navigateTo('HOME')} className="btn btn-warning mt-4">홈으로 돌아가기</button>
    </div>
);

export default NotFoundContent;