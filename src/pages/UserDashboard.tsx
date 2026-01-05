import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
    const [famousProducts, setFamousProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string>('');
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await API.get('/products?isFamous=true');
                setFamousProducts(res.data);
            } catch (err) {
                console.error('Failed to fetch famous products:', err);
            }
        })();
    }, []);

    const buy = () => {
        nav('/payment', { state: { product: selected, selectedAlcohol } });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto font-sans">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-5xl font-extrabold text-yellow-400 mb-3 drop-shadow-lg font-barLogo">
                    🍹 Ceylon Spirits
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Explore our signature spirits, cocktails, and custom mixes. Click on any item to view details or make a purchase.
                </p>
            </div>

            {/* Famous Products */}
            {famousProducts.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3 text-yellow-400 drop-shadow-md">
                        ⭐ Famous Spirits
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {famousProducts.map(p => (
                            <ProductCard 
                                key={p._id} 
                                product={p} 
                                onClick={setSelected} 
                                // Passing custom style for bar look
                                className="bg-white border-2 border-yellow-400 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            {selected && (
                <ProductModal 
                    product={selected} 
                    onClose={() => setSelected(null)} 
                    onBuy={buy} 
                    onSelectAlcohol={setSelectedAlcohol} 
                />
            )}
        </div>
    );
};

export default UserDashboard;
