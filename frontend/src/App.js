
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Home from './Home';
import Header from './Header';
import SignUp from './components/StuffForHeader/SignUp';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
      <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App;