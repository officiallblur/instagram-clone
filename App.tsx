import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Add from './pages/Add';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import { PostsProvider } from './contexts/PostsContext';
import Reels from './pages/Reels';
import Shop from './pages/Shop';
import { UserProvider } from './contexts/UserContext';
import EditProfile from './pages/EditProfile';

export type Page = 'home' | 'explore' | 'add' | 'reels' | 'shop' | 'activity' | 'profile' | 'edit-profile';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'explore':
        return <Explore setActivePage={setActivePage} />;
      case 'add':
        return <Add setActivePage={setActivePage} />;
      case 'reels':
        return <Reels />;
      case 'shop':
        return <Shop />;
      case 'activity':
        return <Activity />;
      case 'profile':
        return <Profile setActivePage={setActivePage} />;
      case 'edit-profile':
        return <EditProfile setActivePage={setActivePage} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="bg-black text-white h-screen w-full max-w-md mx-auto flex flex-col font-sans">
      <UserProvider>
        <PostsProvider>
          <main className="flex-1 overflow-hidden">
            {renderPage()}
          </main>
          {activePage !== 'edit-profile' && activePage !== 'add' && <BottomNav activePage={activePage} setActivePage={setActivePage} />}
        </PostsProvider>
      </UserProvider>
    </div>
  );
};

// Simple utility to hide scrollbars if needed
const style = document.createElement('style');
style.innerHTML = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

export default App;