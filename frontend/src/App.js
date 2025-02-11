import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; 
import Header from './layout/Header';
import PortfolioList from './pages/PortfolioList';
import SignUp from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import Profile from './pages/Profile';
import NewPortfolio from './pages/NewPortfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<PortfolioList />} />
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/profile/setup" element={<ProfileSetup />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/new/portfolio" element={<NewPortfolio />}></Route>
              <Route path="/portfolio/:id" element={<PortfolioDetail />}></Route>
              <Route path="/profile/edit" element={<ProfileEdit />}></Route>
            </Routes>
          </Router> 
        </ThemeProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;