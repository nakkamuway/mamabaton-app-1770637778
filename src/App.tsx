import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import FindTeacher from './pages/FindTeacher';
import Pricing from './pages/Pricing';
import BecomeTeacher from './pages/BecomeTeacher';
import Login from './pages/Login';
import TeacherDetail from './pages/TeacherDetail';
import Flow from './pages/Flow';
import Order from './pages/Order';
import OrderConfirm from './pages/OrderConfirm';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="find-teacher" element={<FindTeacher />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="become-teacher" element={<BecomeTeacher />} />
            <Route path="login" element={<Login />} />
            <Route path="teacher/:id" element={<TeacherDetail />} />
            <Route path="flow" element={<Flow />} />
            <Route path="order" element={<Order />} />
            <Route path="order/confirm" element={<OrderConfirm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;