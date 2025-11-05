import { Routes, Route } from 'react-router-dom' // Router 제거

import Header from './Header.tsx'
import Container from './Container.tsx'
import Footer from './Footer.tsx'
import Cocktail from './Cocktail.tsx' // 사용하지 않아도 임포트는 유지 가능

import '../home.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

function Home() {

    // Header는 계속 사용, 내용을 어떻게 변경하는지 찾아보기
    return (
        <>
            <div className="homeBg">
                <Routes>
                    <Route path="/" element={<Layout><Container /></Layout>} />
                    <Route path="/cocktail" element={<Layout><Cocktail /></Layout>} />
                </Routes>
            </div>
        </>
    )
}

export default Home



// function Home() {
//     return (
//         <>
//             <div className="homeBg">
//                 <Header />
//                 <Container />
//                 <Footer />
//             </div>
//         </>
//     )
// }

// export default Home



// const Layout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <>
//             <Header />
//             {children}
//             <Footer />
//         </>
//     );
// };

// function Home() {

//     // Header는 계속 사용, 내용을 어떻게 변경하는지 찾아보기
//     return (
//         <>
//             <div className="homeBg">
//                 <Routes>
//                     <Route path="/" element={<Layout><Container /></Layout>} />
//                     <Route path="/cocktail" element={<Layout><Cocktail /></Layout>} />
//                 </Routes>
//             </div>
//         </>
//     )
// }

// export default Home
