import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const nav = useNavigate();
    const [err, setErr] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            const res = await API.post('/auth/login', { email, password });
            const { accessToken, user } = res.data;
            login(accessToken, user);
            if (user.role === 'admin') nav('/admin'); else nav('/');
        } catch (e: any) {
            setErr(e.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
            <div className="backdrop-blur-md bg-black/50 shadow-2xl rounded-2xl p-10 w-full max-w-sm">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-lg">
                        <img src="/assets/ceylon-spirits-logo.png" alt="Ceylon Spirits" className="h-16 w-auto" />
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-yellow-400 mb-6 text-center font-barLogo tracking-wide">
                    Welcome
                </h2>

                {err && (
                    <div className="bg-red-600/20 text-red-400 p-3 mb-4 rounded text-center font-medium border border-red-400">
                        {err}
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-5">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="p-3 rounded-xl bg-black/30 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="p-3 rounded-xl bg-black/30 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-300">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-yellow-400 hover:text-yellow-300 font-medium underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
