import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search products..." }) => {
    return (
        <div className="mb-6 flex justify-center">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full max-w-md px-5 py-3 rounded-2xl bg-black/30 text-white placeholder-yellow-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-md shadow-lg transition-all duration-300"
            />
        </div>
    );
};

export default SearchInput;
