import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import WelfarePage from './pages/WelfarePage.tsx';
import SchedulePage from './pages/SchedulePage.tsx';
import MenuPage from './pages/MenuPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welfare" element={<WelfarePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
