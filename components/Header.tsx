import React, { useState, useEffect, useRef } from 'react';
import { AddIcon, HeartIcon, MessageIcon, ChevronDownIcon, FollowingIcon, FavouritesIcon } from './Icons';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black border-b border-gray-800 p-3 flex justify-between items-center sticky top-0 z-10">
      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="flex items-center" aria-label="Accounts menu" aria-haspopup="true" aria-expanded={isDropdownOpen}>
          <h1 className="text-3xl font-satisfy">Instagram</h1>
          <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-3 w-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-700">
                <FollowingIcon className="h-6 w-6 mr-3" />
                <span>Following</span>
              </button>
              <button className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-700">
                <FavouritesIcon className="h-6 w-6 mr-3" />
                <span>Favourites</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-5">
        
        <button aria-label="Notifications">
          <HeartIcon className="h-7 w-7" />
        </button>
        <button aria-label="Direct Messages">
          <MessageIcon className="h-7 w-7" />
        </button>
      </div>
    </header>
  );
};

export default Header;