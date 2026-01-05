import React from 'react';

interface Props {
    product: any;
    onClick: (p: any) => void;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
    return (
        <div
            className="bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-yellow-400 hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300"
            onClick={() => onClick(product)}
        >
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-3xl border-b border-yellow-400"
            />
            <div className="p-4 bg-black/50">
                <h3 className="font-bold text-lg text-yellow-400 mb-2 drop-shadow-lg">{product.name}</h3>
                {product.price && (
                    <p className="text-2xl font-bold text-yellow-300 drop-shadow-md">
                        ${product.price.toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
};
