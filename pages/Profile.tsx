import React, { useState } from 'react';
import type { Story, UserProfile } from '../types';
import { PlusIcon, HamburgerMenuIcon, LockIcon, VerifiedBadge, GridIcon, TaggedIcon, ReelsIcon } from '../components/Icons';
import type { Page } from '../App';
import { useUser } from '../contexts/UserContext';

interface ProfilePageProps {
  setActivePage: (page: Page) => void;
}

const ProfileHeader: React.FC<{ user: UserProfile }> = ({ user }) => (
  <header className="p-3 flex justify-between items-center sticky top-0 bg-black z-10">
    <div className="flex items-center space-x-1">
      <LockIcon className="h-4 w-4" />
      <h1 className="text-xl font-bold flex items-center">{user.username} {user.isVerified && <VerifiedBadge className="h-4 w-4 ml-1" />}</h1>
    </div>
    <div className="flex items-center space-x-5">
      <button aria-label="New post"><PlusIcon className="h-7 w-7" /></button>
      <button aria-label="Menu"><HamburgerMenuIcon className="h-7 w-7" /></button>
    </div>
  </header>
);

const ProfileInfo: React.FC<{ user: UserProfile }> = ({ user }) => (
  <div className="flex items-center justify-between">
    <div className="p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full">
        <div className="bg-black p-0.5 rounded-full">
            <img src={user.avatarUrl} alt={user.username} className="h-20 w-20 rounded-full object-cover" />
        </div>
    </div>
    <div className="flex items-center space-x-6">
        <div className="text-center"><p className="font-bold text-lg">{user.postCount}</p><p className="text-sm">Posts</p></div>
        <div className="text-center"><p className="font-bold text-lg">{user.followerCount}</p><p className="text-sm">Followers</p></div>
        <div className="text-center"><p className="font-bold text-lg">{user.followingCount}</p><p className="text-sm">Following</p></div>
    </div>
  </div>
);

const ProfileBio: React.FC<{ user: UserProfile; setActivePage: (page: Page) => void }> = ({ user, setActivePage }) => {
    
    const handleShare = async () => {
        const profileUrl = `https://www.instagram.com/${user.username}/`;
        const shareData = {
            title: `Check out ${user.name}'s profile on Instagram`,
            text: `${user.bio}`,
            url: profileUrl,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert("Web Share API is not supported in your browser. You can manually share this link: " + profileUrl);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
      <div className="mt-4">
        <p className="font-bold text-sm">{user.name}</p>
        <p className="text-sm whitespace-pre-line">{user.bio}</p>
        <a href={`https://${user.link}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400">{user.link}</a>
        <div className="flex space-x-2 mt-4">
            <button onClick={() => setActivePage('edit-profile')} className="flex-1 bg-gray-800 hover:bg-gray-700 text-sm font-semibold py-1.5 rounded-lg">Edit Profile</button>
            <button onClick={handleShare} className="flex-1 bg-gray-800 hover:bg-gray-700 text-sm font-semibold py-1.5 rounded-lg">Share Profile</button>
        </div>
      </div>
    );
};

const HighlightItem: React.FC<{ highlight: Omit<Story, 'isOwnStory'> }> = ({ highlight }) => (
    <div className="flex flex-col items-center space-y-1 flex-shrink-0">
      <div className="p-0.5 rounded-full bg-gray-700">
        <div className="bg-black p-0.5 rounded-full">
          <img className="h-16 w-16 rounded-full object-cover" src={highlight.avatarUrl} alt={highlight.username} />
        </div>
      </div>
      <p className="text-xs w-20 text-center truncate">{highlight.username}</p>
    </div>
);

const ProfileHighlights: React.FC<{ highlights: Omit<Story, 'isOwnStory'>[] }> = ({ highlights }) => (
    <div className="px-3 py-2">
      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {highlights.map((h) => <HighlightItem key={h.id} highlight={h} />)}
      </div>
    </div>
);

const ProfileTabs: React.FC<{activeTab: string; setActiveTab: (tab: string) => void}> = ({activeTab, setActiveTab}) => (
    <div className="flex justify-around border-t border-gray-800">
        <button onClick={() => setActiveTab('grid')} className={`flex-1 py-3 ${activeTab === 'grid' ? 'border-b border-white' : ''}`}><GridIcon className="h-6 w-6 mx-auto" /></button>
        <button onClick={() => setActiveTab('reels')} className={`flex-1 py-3 ${activeTab === 'reels' ? 'border-b border-white' : ''}`}><ReelsIcon className="h-6 w-6 mx-auto" /></button>
        <button onClick={() => setActiveTab('tagged')} className={`flex-1 py-3 ${activeTab === 'tagged' ? 'border-b border-white' : ''}`}><TaggedIcon className="h-6 w-6 mx-auto" /></button>
    </div>
);


const Profile: React.FC<ProfilePageProps> = ({ setActivePage }) => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('grid');
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <ProfileHeader user={user} />
      <div className="p-4">
        <ProfileInfo user={user} />
        <ProfileBio user={user} setActivePage={setActivePage} />
      </div>
      <ProfileHighlights highlights={user.highlights} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grid grid-cols-3 gap-0.5">
        {user.posts.map(post => (
            <div key={post.id} className="aspect-square">
                <img src={post.imageUrls[0]} className="w-full h-full object-cover" alt={`post ${post.id}`}/>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;