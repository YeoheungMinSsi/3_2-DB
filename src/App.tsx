import { BrowserRouter as Router } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './Components/Jsx/Home.tsx'

function App() {

  return (
    <>
      {/* <BrowserRouter>
        <Home />
      </BrowserRouter> */}
      <Router>
        <Home />
      </Router>
    </>
  )
}

export default App

// import { BrowserRouter as Router } from 'react-router-dom';


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