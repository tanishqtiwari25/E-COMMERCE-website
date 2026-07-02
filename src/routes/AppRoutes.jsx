import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Index';
import { Products } from '../pages/Products/Index';
import { Cart } from '../pages/Cart/Index';
import { Checkout } from '../pages/Checkout/Index';
import { Login } from '../pages/Authentication/Login';
import { OrderSuccess } from '../pages/System/OrderSuccess';
import { NotFound } from '../pages/System/NotFound';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Transactions Engine Routes */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/order-success" element={
        <ProtectedRoute>
          <OrderSuccess />
        </ProtectedRoute>
      } />

      {/* Fallback System routing parameters mapping */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};