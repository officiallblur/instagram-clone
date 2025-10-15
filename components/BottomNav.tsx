
import React from 'react';
import { HomeIcon, SearchIcon, AddIcon, HeartIcon, HomeIconFilled, SearchIconFilled, AddIconFilled, HeartIconFilled } from './Icons';
import type { Page } from '../App';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <footer className="bg-black border-t border-gray-800 sticky bottom-0 z-10">
      <nav className="flex justify-around items-center p-3">
        <button aria-label="Home" onClick={() => setActivePage('home')}>
          {activePage === 'home' ? <HomeIconFilled className="h-7 w-7" /> : <HomeIcon className="h-7 w-7" />}
        </button>
        <button aria-label="Search" onClick={() => setActivePage('explore')}>
          {activePage === 'explore' ? <SearchIconFilled className="h-7 w-7" /> : <SearchIcon className="h-7 w-7" />}
        </button>
        <button aria-label="Create Post" onClick={() => setActivePage('add')}>
          {activePage === 'add' ? <AddIconFilled className="h-7 w-7" /> : <AddIcon className="h-7 w-7" />}
        </button>
        <button aria-label="Activity" onClick={() => setActivePage('activity')}>
          {activePage === 'activity' ? <HeartIconFilled className="h-7 w-7" /> : <HeartIcon className="h-7 w-7" />}
        </button>
        <button aria-label="Profile" onClick={() => setActivePage('profile')}>
          <img
            src="https://picsum.photos/seed/1/100/100"
            alt="Your profile"
            className={`h-7 w-7 rounded-full object-cover p-px ${activePage === 'profile' ? 'border-2 border-white' : ''}`}
          />
        </button>
      </nav>
    </footer>
  );
};

export default BottomNav;
