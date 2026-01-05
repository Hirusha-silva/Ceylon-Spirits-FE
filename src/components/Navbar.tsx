import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/ChatGPT Image Jan 5, 2026, 11_48_27 AM.png'
const Navbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const nav = useNavigate();

    const handleLogout = async () => {
        await logout();
        nav('/login');
    };

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg border-b-4 border-yellow-500">
            {/* Logo & Menu */}
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                    <img src={Logo} alt="Ceylon Spirits" className="h-20 w-auto" />
                    <span className="hidden sm:inline text-2xl font-bold text-yellow-400">Ceylon Spirits</span>
                </Link>

                {user && (
                    <>
                        <Link to="/" className="hover:text-yellow-400 transition-colors font-medium">Home</Link>
                        <Link to="/menu" className="hover:text-yellow-400 transition-colors font-medium">Menu</Link>
                        <Link to="/cocktails" className="hover:text-yellow-400 transition-colors font-medium">Cocktails</Link>
                        <Link to="/events" className="hover:text-yellow-400 transition-colors font-medium">Events</Link>
                        <Link to="/about" className="hover:text-yellow-400 transition-colors font-medium">About</Link>
                    </>
                )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="hidden sm:inline text-yellow-400 font-medium">{user.username}</span>
                        {user.role === 'admin' && (
                            <Link 
                                to="/admin" 
                                className="px-3 py-1 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                            >
                                Admin
                            </Link>
                        )}
                        <button 
                            onClick={handleLogout} 
                            className="px-4 py-1 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className="px-4 py-1 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            className="px-4 py-1 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
