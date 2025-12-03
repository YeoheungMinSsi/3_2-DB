import '../App.css'

function Card() {

    return (
        <>
            <a href="#" className="hover-3d my-12 mx- cursor-pointer">

                {/* content */}
                <div className="card w-100 h-100 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
                    <div className="card-body">
                        <div className="flex justify-between mt-10 mb-10">
                            <div className="text-2xl font-bold">오늘의 칵테일 추천</div>
                            <div className="text-7xl opacity-50">🍸</div>
                        </div>
                        <div className="text-lg mb-4 opacity-40">0210 8820 1150 0222</div>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-xs opacity-20">CARD HOLDER</div>
                                <div>VICTOR VON D.</div>
                            </div>
                            <div>
                                <div className="text-xs opacity-20">EXPIRES</div>
                                <div>29/08</div>
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
            </a>
        </>
    )
}

export default Card
