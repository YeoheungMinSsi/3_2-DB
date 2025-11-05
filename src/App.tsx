import { BrowserRouter as Router } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <div id='main'>
        <div id="header">
          <div className='header-container'>
            <div id="page-Name">홈페이지명</div>
            <nav className='header-nav-container'>
              <ul className='header-nav-list'>
                <li className='header-nav' ><a href="">술 정보</a></li>
                <li className='header-nav'><a href="">조주정보</a></li>
              </ul>
            </nav>
            <div className='right_header'>
              {/* <input type="text" /> */}
              <a href="">로그인</a>
            </div>
          </div>

        </div>
        <div id='container'>
          <div className='content'>
          </div>

        </div>
      </div>
    </>
  )
}

export default App

// import { BrowserRouter as Router } from 'react-router-dom';
// import Home from './Components/Jsx/Home.tsx'


// function App() {

//   return (
//     <>
//       <Router>
//         <Home />
//       </Router>
//     </>
//   )
// }

// export default App