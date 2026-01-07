import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import Juice from './pages/Juice';
import Cocktail from './pages/Cocktail';
import Custom from './pages/Custom';
import Payment from './pages/Payment';
import Slip from './pages/Slip';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './routes/PrivateRoute';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Navbar />
            <div className="min-h-[calc(100vh-64px)]">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
                    <Route path="/juice" element={<Juice />} />
                    <Route path="/cocktail" element={<PrivateRoute><Cocktail /></PrivateRoute>} />
                    <Route path="/custom" element={<PrivateRoute><Custom /></PrivateRoute>} />
                    <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                    <Route path="/slip" element={<Slip />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/payment/:id" element={<Payment />} />

                </Routes>
            </div>
        </AuthProvider>
    );
};

export default App;
