import { useNavigate } from "react-router-dom";

const ProductPopup = ({ product, close }: any) => {
    const navigate = useNavigate();

    const handleBuy = () => {
        navigate(`/payment/${product._id}`);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
            <div className="bg-black/70 backdrop-blur-md w-[90%] sm:w-[450px] rounded-3xl p-6 relative shadow-2xl border border-yellow-400">
                
                {/* Close Button */}
                <button
                    className="absolute right-4 top-3 text-2xl text-yellow-400 hover:text-yellow-300"
                    onClick={close}
                >
                    ✖
                </button>

                {/* Product Image */}
                <img
                    src={product.image}
                    className="w-full h-48 object-cover rounded-2xl border-b border-yellow-400 mb-4"
                />

                {/* Product Name */}
                <h2 className="text-3xl font-extrabold text-yellow-400 mb-2 text-center drop-shadow-lg">
                    {product.name}
                </h2>

                {/* Description */}
                <p className="mt-2 text-gray-200 text-sm">{product.description}</p>

                {/* Ingredients */}
                {product.ingredients?.length > 0 && (
                    <div className="mt-3">
                        <h3 className="font-semibold text-yellow-400 mb-1">Ingredients:</h3>
                        <ul className="list-disc ml-5 text-gray-200">
                            {product.ingredients.map((i: string, idx: number) => (
                                <li key={idx}>{i}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Buy Button */}
                <button
                    onClick={handleBuy}
                    className="w-full mt-5 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-bold rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductPopup;
