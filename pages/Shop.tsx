import React from 'react';
import { SHOP_DATA } from '../constants';
import { HamburgerMenuIcon } from '../components/Icons';

const Shop: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <header className="p-3 sticky top-0 bg-black z-10 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold">Shop</h1>
        <div className="flex items-center space-x-4">
          <HamburgerMenuIcon className="h-7 w-7" />
        </div>
      </header>
      <div className="p-3">
         <input 
          type="text"
          placeholder="Search shops"
          className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        {SHOP_DATA.map((item) => (
          <div key={item.id}>
            <img src={item.imageUrl} loading="lazy" className="w-full h-full object-cover aspect-square" alt={`shop item ${item.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
