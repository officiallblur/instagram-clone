import React, { useState, useEffect, useCallback } from 'react';
import type { Story } from '../types';
import { CloseIcon } from './Icons';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialStoryIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  const story = stories[currentIndex];

  const goToNextStory = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPrevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + (100 / 5000) * 50; // 5 seconds duration
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentIndex]);
  
  useEffect(() => {
    if (progress >= 100) {
        const timeout = setTimeout(() => {
            goToNextStory();
        }, 100);
        return () => clearTimeout(timeout);
    }
  }, [progress, goToNextStory]);


  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const tapPosition = clientX - left;
    if (tapPosition < width / 3) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center p-2" role="dialog" aria-modal="true">
      <div className="absolute top-3 left-2 right-2 flex items-center gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="h-0.5 bg-white/30 flex-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-50 ease-linear"
              style={{ width: `${index === currentIndex ? progress : (index < currentIndex ? 100 : 0)}%` }}
            />
          </div>
        ))}
      </div>

      <header className="absolute top-5 left-4 right-4 flex justify-between items-center text-white z-10">
         <div className="flex items-center gap-2">
          <img src={story.avatarUrl} className="h-8 w-8 rounded-full" alt={`${story.username}'s profile`} />
          <span className="font-bold text-sm">{story.username}</span>
         </div>
         <div>
            <button onClick={onClose} aria-label="Close stories">
              <CloseIcon className="h-6 w-6"/>
            </button>
         </div>
      </header>

      <div className="relative w-full h-full flex items-center justify-center">
        <img src={`https://picsum.photos/seed/story${story.id}/540/960`} className="max-w-full max-h-full object-contain rounded-lg" alt={`Story by ${story.username}`} />
        <div className="absolute inset-0 grid grid-cols-2" onClick={handleTap}>
            <div aria-label="Previous story"></div>
            <div aria-label="Next story"></div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;