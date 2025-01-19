import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; 
import Header from './layout/Header';
import PortfolioList from './pages/PortfolioList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PortfolioList />} />
        </Routes>
      </Router> 
    </ThemeProvider>
  );
}

export default App;