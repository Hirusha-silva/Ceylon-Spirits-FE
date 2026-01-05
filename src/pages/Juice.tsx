import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';

const Juice: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams({ category: 'juice' });
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }
            const res = await API.get(`/products?${params.toString()}`);
            setProducts(res.data);
        })();
    }, [searchQuery]);

    const buy = () => {
        nav('/payment', { state: { product: selected, selectedAlcohol } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
            {/* Page Title */}
            <h2 className="text-5xl font-extrabold text-yellow-400 mb-8 text-center font-barLogo tracking-wider drop-shadow-lg">
                Ceylon Spirits Collection
            </h2>

            {/* Search Input */}
            <div className="max-w-xl mx-auto mb-10">
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search juices by name, ingredients or description..."
                    className="w-full p-4 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-md shadow-lg"
                />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {products.map((p) => (
                    <ProductCard
                        key={p._id}
                        product={p}
                        onClick={setSelected}
                        className="bg-black/40 backdrop-blur-md rounded-3xl p-6 shadow-2xl hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300 cursor-pointer border border-yellow-400"
                    />
                ))}
            </div>

            {/* Product Modal */}
            {selected && (
                <ProductModal
                    product={selected}
                    onClose={() => setSelected(null)}
                    onBuy={buy}
                    onSelectAlcohol={setSelectedAlcohol}
                    className="bg-black/70 backdrop-blur-lg text-white rounded-3xl shadow-2xl border border-yellow-400"
                />
            )}
        </div>
    );
};

export default Juice;
