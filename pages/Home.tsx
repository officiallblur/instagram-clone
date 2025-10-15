
import React, { useState } from 'react';
import Header from '../components/Header';
import StoryReel from '../components/StoryReel';
import Post from '../components/Post';
import { usePosts } from '../contexts/PostsContext';
import type { Post as PostType } from '../types';
import StoryViewer from '../components/StoryViewer';
import { STORIES_DATA } from '../constants';

const Home: React.FC = () => {
  const { posts } = usePosts();
  const [storyViewerState, setStoryViewerState] = useState<{isOpen: boolean; index: number} | null>(null);

  const handleStoryClick = (index: number) => {
    setStoryViewerState({ isOpen: true, index });
  };

  const handleCloseStoryViewer = () => {
    setStoryViewerState(null);
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <Header />
      <StoryReel onStoryClick={handleStoryClick} />
      <div className="flex flex-col">
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
       {storyViewerState?.isOpen && (
        <StoryViewer 
          stories={STORIES_DATA} 
          initialStoryIndex={storyViewerState.index} 
          onClose={handleCloseStoryViewer} 
        />
      )}
    </div>
  );
};

export default Home;
