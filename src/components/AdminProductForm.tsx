import React, { useState } from 'react';
import API from '../api/axios';

const AdminProductForm: React.FC<{ onCreated: () => void }> = ({ onCreated }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<'juice'|'cocktail'|'custom'>('juice');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [alcoholBrands, setAlcoholBrands] = useState('');
    const [isFamous, setIsFamous] = useState(false);
    const [price, setPrice] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.post('/products', {
            name, image, category, description,
            ingredients: ingredients.split(',').map(s=>s.trim()).filter(Boolean),
            alcoholBrands: alcoholBrands.split(',').map(s=>s.trim()).filter(Boolean),
            isFamous,
            price: price ? parseFloat(price) : undefined
        });
        setName(''); setImage(''); setDescription(''); setIngredients(''); setAlcoholBrands(''); setIsFamous(false); setPrice('');
        onCreated();
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-black/70 backdrop-blur-md border-2 border-yellow-400 p-6 rounded-3xl shadow-2xl space-y-4 max-w-xl mx-auto"
        >
            <h3 className="text-3xl font-extrabold text-yellow-400 mb-4 text-center drop-shadow-lg">
                Add Product
            </h3>

            {/* Input Fields */}
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" 
                className="w-full p-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md" 
            />
            <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" 
                className="w-full p-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md" 
            />
            <select value={category} onChange={e=>setCategory(e.target.value as any)} 
                className="w-full p-3 rounded-2xl bg-black/30 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md"
            >
                <option value="juice">Juice</option>
                <option value="cocktail">Cocktail</option>
                <option value="custom">Custom</option>
            </select>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" 
                className="w-full p-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md"
            />
            <input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" 
                className="w-full p-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md"
            />
            <input value={alcoholBrands} onChange={e=>setAlcoholBrands(e.target.value)} placeholder="Alcohol brands (comma separated, for custom)" 
                className="w-full p-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md"
            />
            <input type="number" step="0.01" min="0" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price ($)" 
                className="w-full p-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md"
            />

            {/* Famous Checkbox */}
            <label className="flex items-center gap-2 p-3 bg-black/20 rounded-2xl border border-yellow-400">
                <input type="checkbox" checked={isFamous} onChange={e=>setIsFamous(e.target.checked)} 
                    className="w-5 h-5 text-yellow-400 focus:ring-yellow-400" 
                />
                <span className="font-semibold text-yellow-400">Mark as Famous Item</span>
            </label>

            {/* Submit Button */}
            <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-bold rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300">
                Create Product
            </button>
        </form>
    );
};

export default AdminProductForm;
