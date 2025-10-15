import React, { useState } from 'react';
import { EXPLORE_DATA, REELS_DATA, SHOP_DATA } from '../constants';
import { IGTVIcon, ReelsIcon, SearchIcon, ShopIcon } from '../components/Icons';
import type { Page } from '../App';

const categories = [
  { id: 'reels', name: 'Reels', Icon: ReelsIcon },
  { id: 'igtv', name: 'IGTV', Icon: IGTVIcon },
  { id: 'shop', name: 'Shop', Icon: ShopIcon },
  { id: 'style', name: 'Style' },
  { id: 'sports', name: 'Sports' },
  { id: 'auto', name: 'Auto' },
  { id: 'art', name: 'Art' },
  { id: 'music', name: 'Music' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food & Drink' },
];

interface ExploreProps {
  setActivePage: (page: Page) => void;
}

const Explore: React.FC<ExploreProps> = ({ setActivePage }) => {
  const [activeCategory, setActiveCategory] = useState('explore');

  const renderContent = () => {
    switch(activeCategory) {
      case 'reels':
        return (
          <div className="grid grid-cols-3 gap-0.5">
            {REELS_DATA.map((reel) => (
              <button key={reel.id} className="relative group aspect-[9/16]" onClick={() => setActivePage('reels')}>
                <img src={reel.videoUrl} loading="lazy" className="w-full h-full object-cover" alt={`Reel by ${reel.username}`} />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </button>
            ))}
          </div>
        );
      case 'shop':
        return (
           <div className="grid grid-cols-2 gap-0.5">
            {SHOP_DATA.map((item) => (
              <button key={item.id} onClick={() => setActivePage('shop')}>
                <img src={item.imageUrl} loading="lazy" className="w-full h-full object-cover aspect-square" alt={`shop item ${item.id}`} />
              </button>
            ))}
          </div>
        );
      case 'igtv':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">IGTV content would be shown here.</p>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-3 gap-0.5">
            {EXPLORE_DATA.map((item, index) => (
              <div key={item.id} className={`${(index + 1) % 7 === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={item.imageUrl} loading="lazy" className="w-full h-full object-cover aspect-square" alt={`explore content ${item.id}`} />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 bg-black z-10">
        <header className="p-3">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 pl-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700"
                />
            </div>
        </header>
        <div className="px-3 pb-3 border-b border-gray-800">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                 <button
                  onClick={() => setActiveCategory('explore')}
                  className={`border px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center space-x-2 whitespace-nowrap transition-colors ${
                    activeCategory === 'explore'
                      ? 'bg-white text-black border-white'
                      : 'border-gray-700 bg-black text-white hover:bg-gray-900'
                  }`}
                >
                  <span>For You</span>
                </button>
                {categories.map(({ id, name, Icon }) => (
                    <button 
                      key={id}
                      onClick={() => setActiveCategory(id)}
                      className={`border px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center space-x-2 whitespace-nowrap transition-colors ${
                        activeCategory === id
                          ? 'bg-white text-black border-white'
                          : 'border-gray-700 bg-black text-white hover:bg-gray-900'
                      }`}
                    >
                        {Icon && <Icon className="h-5 w-5" />}
                        <span>{name}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default Explore;