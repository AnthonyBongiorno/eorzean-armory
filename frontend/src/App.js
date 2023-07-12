
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Home from './Home';
import Header from './Header';
import SignUp from './components/StuffForHeader/SignUp';
import LogIn from './components/StuffForHeader/LogIn';
import AttachCharacter from './components/characterStuff/CharacterAttach';
import MyCharacters from './components/characterStuff/MyCharacters';
import SingleCharacter from './components/characterStuff/SingleCharacter';
import GearSearch from './components/gearStuff/UserProfileGearForm';
import GearList from './components/gearStuff/MySavedGear';
import Footer from './Footer';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
      <Header />
        <Routes>
        <Route path="/mycharacters" element={<MyCharacters />} /> 
        <Route path="/attachcharacter" element={<AttachCharacter />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/characters/:characterId" element={<SingleCharacter />} />
        <Route path="/gearsearch" element={<GearSearch />} />
        <Route path="/mygear" element={<GearList />} />
          {/* Add more routes as needed */}
        </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;