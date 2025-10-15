
import React from 'react';
import { STORIES_DATA } from '../constants';
import type { Story } from '../types';
import { PlusIcon } from './Icons';

interface StoryItemProps {
  story: Story;
  onClick: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ story, onClick }) => {
  const borderGradient = story.isOwnStory ? '' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500';

  return (
    <button onClick={onClick} className="flex flex-col items-center space-y-1 flex-shrink-0 text-left">
      <div className={`p-0.5 rounded-full ${borderGradient}`}>
        <div className="bg-black p-0.5 rounded-full relative">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={story.avatarUrl}
            alt={`${story.username}'s story`}
          />
          {story.isOwnStory && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full border-2 border-black p-0.5">
              <PlusIcon className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>
      <p className="text-xs w-20 text-center truncate">{story.username}</p>
    </button>
  );
};

interface StoryReelProps {
  onStoryClick: (index: number) => void;
}

const StoryReel: React.FC<StoryReelProps> = ({ onStoryClick }) => {
  return (
    <div className="p-3 border-b border-gray-800">
      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {STORIES_DATA.map((story, index) => (
          <StoryItem key={story.id} story={story} onClick={() => onStoryClick(index)} />
        ))}
      </div>
    </div>
  );
};

export default StoryReel;
