import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/ChatGPT Image Jan 5, 2026, 11_48_27 AM.png'

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const [err, setErr] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            await API.post('/auth/signup', { username, email, password });
            nav('/login');
        } catch (e: any) {
            setErr(e.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
            <div className="backdrop-blur-md bg-black/50 rounded-2xl shadow-2xl p-10 w-full max-w-md">
                
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Ceylon Spirits" className="h-20 w-auto" />
                </div>

                <h2 className="text-4xl font-bold text-yellow-400 mb-6 text-center font-barLogo tracking-wide">
                    Signup
                </h2>

                {err && (
                    <div className="bg-red-600/20 text-red-400 p-3 mb-4 rounded-lg text-center border border-red-400">
                        {err}
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="p-3 rounded-xl bg-black/30 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm"
                        required
                    />
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
                        className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                        Signup
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-300">
                    Already have an account?{' '}
                    <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
