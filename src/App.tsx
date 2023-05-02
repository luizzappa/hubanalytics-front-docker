// 3rd's
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// locals
import TheHeader from './TheHeader';
import InfiniteScroller from './InfiniteScroller';
import Cadastro from './Cadastro'

function App() {
  const [searchTerms, setSearchTerms] = useState<string>('');

  return (
    <div className="App">
      <Router>
        <TheHeader setSearchTerms={setSearchTerms} />
        <Routes>
          <Route  path='/' element={<InfiniteScroller searchTerms={searchTerms} /> } />
          <Route  path='/cadastro' element={<Cadastro /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
