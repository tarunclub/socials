import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/profile/:profileId'} element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
