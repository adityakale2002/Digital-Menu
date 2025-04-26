import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CartProvider } from './context/CartContext';
import theme from './theme';
import Menu from './pages/Menu';
import MyOrders from './pages/MyOrders';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App; 