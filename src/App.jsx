import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Matrix Injections
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layout Blocks
import { Navbar } from './components/layout/Navbar';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="min-h-screen flex flex-col transition-colors duration-300">
                  <Navbar />
                  <main className="flex-grow">
                    <AppRoutes />
                  </main>
                  <footer className="py-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
                    &copy; {new Date().getFullYear()} Pickk Premium Labs Engine. Distributed on enterprise infrastructure.
                  </footer>
                </div>
                <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;