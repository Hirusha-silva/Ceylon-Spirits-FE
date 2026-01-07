import React from 'react';

interface Props {
    product: any;
    onClose: () => void;
    onBuy: () => void;
    onSelectAlcohol?: (a: string) => void;
    className?:string
}

const ProductModal: React.FC<Props> = ({ product, onClose, onBuy, onSelectAlcohol }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-black/70 backdrop-blur-md w-[92%] sm:w-96 rounded-3xl shadow-2xl border-2 border-yellow-400 p-6">
                
                {/* Product Name */}
                <h2 className="text-3xl font-extrabold text-yellow-400 mb-4 text-center drop-shadow-lg">
                    {product.name}
                </h2>

                {/* Price */}
                {product.price && (
                    <p className="text-3xl font-bold text-yellow-300 mb-4 text-center drop-shadow-md">
                        ${product.price.toFixed(2)}
                    </p>
                )}

                {/* Description */}
                <p className="text-sm mt-2 text-gray-200">{product.description}</p>

                {/* Ingredients */}
                {product.ingredients?.length > 0 && (
                    <p className="mt-3 text-sm font-semibold text-yellow-400">
                        Ingredients: <span className="font-normal text-gray-200">{product.ingredients.join(', ')}</span>
                    </p>
                )}

                {/* Alcohol Brands */}
                {product.alcoholBrands?.length > 0 && (
                    <div className="mt-4">
                        <label className="block mb-2 font-semibold text-yellow-400">Choose alcohol</label>
                        <select
                            onChange={(e) => onSelectAlcohol && onSelectAlcohol(e.target.value)}
                            className="w-full border-2 border-yellow-400 p-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm shadow-md"
                        >
                            <option value="">-- select --</option>
                            {product.alcoholBrands.map((b: string) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border-2 border-yellow-400 rounded-2xl font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors shadow-lg"
                    >
                        Close
                    </button>
                    <button
                        onClick={onBuy}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl font-bold hover:scale-105 transform transition-all duration-300 shadow-2xl"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
