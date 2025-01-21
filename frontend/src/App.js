import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; 
import Header from './layout/Header';
import PortfolioList from './pages/PortfolioList';
import SignUp from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PortfolioList />} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile/setup" element={<ProfileSetup />}></Route>
        </Routes>
      </Router> 
    </ThemeProvider>
  );
}

export default App;