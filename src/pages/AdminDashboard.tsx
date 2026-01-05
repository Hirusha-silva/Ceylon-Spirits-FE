import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import AdminProductForm from '../components/AdminProductForm';
import SearchInput from '../components/SearchInput';

const AdminDashboard: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const fetchAll = async () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        const [pRes, oRes] = await Promise.all([
            API.get(`/products?${params.toString()}`), 
            API.get('/orders')
        ]);
        setProducts(pRes.data);
        setOrders(oRes.data);
    };

    useEffect(() => { fetchAll(); }, [searchQuery]);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete product?')) return;
        await API.delete(`/products/${id}`);
        fetchAll();
    };

    const handleToggleFamous = async (id: string, currentStatus: boolean) => {
        await API.put(`/products/${id}`, { isFamous: !currentStatus });
        fetchAll();
    };

    const handleUpdatePrice = async (id: string, newPrice: string) => {
        const priceValue = newPrice ? parseFloat(newPrice) : undefined;
        await API.put(`/products/${id}`, { price: priceValue });
        fetchAll();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto font-sans">
            <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">Admin Panel</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Form */}
                <div className="lg:col-span-1">
                    <AdminProductForm onCreated={fetchAll} />
                </div>

                {/* Products & Orders */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Products Section */}
                    <section className="bg-white rounded-lg shadow-md p-6 border border-yellow-400">
                        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Products</h3>
                        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search products..." />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {products.map(p => (
                                <div key={p._id} className="bg-gray-50 rounded-lg p-4 border border-yellow-300 shadow-sm hover:shadow-md transition-shadow">
                                    <img src={p.image} alt={p.name} className="h-36 w-full object-cover rounded-md mb-3" />
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-800">{p.name}</h4>
                                                <p className="text-sm text-gray-500">{p.category}</p>
                                                {p.isFamous && <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded font-semibold mt-1 inline-block">⭐ Famous</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={()=>handleToggleFamous(p._id, p.isFamous || false)} 
                                                    className={`px-3 py-1 rounded-md font-semibold ${p.isFamous ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-700'}`}
                                                >
                                                    ⭐
                                                </button>
                                                <button onClick={()=>handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600">Delete</button>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                                            <input 
                                                type="number" 
                                                step="0.01" 
                                                min="0" 
                                                defaultValue={p.price || ''} 
                                                onBlur={(e) => {
                                                    if (e.target.value !== (p.price?.toString() || '')) handleUpdatePrice(p._id, e.target.value);
                                                }}
                                                className="w-full p-2 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Orders Section */}
                    <section className="bg-white rounded-lg shadow-md p-6 border border-yellow-400">
                        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Orders</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-gray-800">
                                <thead className="bg-yellow-100 text-gray-800">
                                    <tr>
                                        <th className="p-3 border border-yellow-300 font-semibold">User</th>
                                        <th className="p-3 border border-yellow-300 font-semibold">Product</th>
                                        <th className="p-3 border border-yellow-300 font-semibold">Amount</th>
                                        <th className="p-3 border border-yellow-300 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o._id} className="hover:bg-yellow-50">
                                            <td className="p-3 border border-yellow-200">{o.userId?.email}</td>
                                            <td className="p-3 border border-yellow-200 font-semibold">{o.productId?.name}</td>
                                            <td className="p-3 border border-yellow-200 font-bold text-yellow-500">${o.totalAmount}</td>
                                            <td className="p-3 border border-yellow-200">{new Date(o.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
