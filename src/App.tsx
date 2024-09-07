import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ListingPage from './pages/ListingPage.tsx';

function App() {
  return (
    <Router>
      <NavigationBar />
      <ListingPage />
    </Router>
  );
}

export default App;
