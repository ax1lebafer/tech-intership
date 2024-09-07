import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ListingPage from './pages/ListingPage.tsx';
import AdvertisementDetailPage from './pages/AdvertisementDetailPage.tsx';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/advertisements" />} />
        <Route path="/advertisements" element={<ListingPage />} />
        <Route
          path="/advertisements/:id"
          element={<AdvertisementDetailPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
