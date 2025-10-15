import React, { useState } from 'react';
import type { Page } from '../App';
import { useUser } from '../contexts/UserContext';
import { CloseIcon, CheckIcon } from '../components/Icons';
import type { UserProfile } from '../types';

interface EditProfileProps {
  setActivePage: (page: Page) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ setActivePage }) => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState<UserProfile>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setActivePage('profile');
  };

  return (
    <div className="h-full flex flex-col">
      <header className="p-3 flex justify-between items-center border-b border-gray-800">
        <button onClick={() => setActivePage('profile')} aria-label="Cancel editing">
            <CloseIcon className="h-6 w-6"/>
        </button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
        <button onClick={handleSave} aria-label="Save changes">
            <CheckIcon className="h-7 w-7 text-blue-500"/>
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center">
            <img src={user.avatarUrl} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
            <button className="text-blue-400 font-semibold mt-3 text-sm">Edit picture or avatar</button>
        </div>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-xs text-gray-400">Name</label>
            <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-700 py-1 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="username" className="text-xs text-gray-400">Username</label>
            <input 
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-700 py-1 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="bio" className="text-xs text-gray-400">Bio</label>
            <textarea 
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full bg-transparent border-b border-gray-700 py-1 focus:outline-none focus:border-gray-400 resize-none"
            />
          </div>
           <div>
            <label htmlFor="link" className="text-xs text-gray-400">Link</label>
            <input 
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder='Add link'
              className="w-full bg-transparent border-b border-gray-700 py-1 focus:outline-none focus:border-gray-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
