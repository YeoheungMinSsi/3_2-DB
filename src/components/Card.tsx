import '../App.css'
import React from 'react';

// Props 타입 정의: 상위 컴포넌트(App.tsx)로부터 클릭 메소드를 받습니다.
interface CardProps {
    onClick: () => void; // 카드가 클릭되었을 때 실행할 함수
}

function Card({ onClick }: CardProps) {

    return (
        <React.Fragment>
            {/* div로 변경하고, onClick 핸들러를 추가하여 클릭 이벤트 처리 */}
            <div
                className="hover-3d my-12 mx-auto cursor-pointer" // 💡 [수정 완료] mx-auto로 수정
                onClick={onClick}
                role="button" // 접근성 향상을 위해 버튼 역할 명시
                tabIndex={0} // 키보드 접근성 활성화
            >

                {/* content */}
                <div className="card w-100 h-100 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
                    <div className="card-body">
                        <div className="flex justify-between mt-10 mb-10">
                            <div className="text-2xl font-bold">오늘의 칵테일 추천</div>
                            <div className="text-7xl opacity-50">🍸</div>
                        </div>
                        <div className="text-lg mb-4 opacity-40">클릭하여 추천받기</div>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-xs opacity-20">COCKTAIL</div>
                                <div>OF THE DAY</div>
                            </div>
                            <div>
                                <div className="text-xs opacity-20">CLICK ME</div>
                                <div>TO REVEAL</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8 empty divs needed for the 3D effect */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </React.Fragment>
    )
}

export default Card