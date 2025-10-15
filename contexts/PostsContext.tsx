
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { POSTS_DATA } from '../constants';
import type { Post, Comment } from '../types';

interface PostsContextType {
  posts: Post[];
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
  addComment: (postId: number, commentText: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(POSTS_DATA);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 } : p
    ));
  };

  const toggleBookmark = (postId: number) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
    ));
  };

  const addComment = (postId: number, commentText: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newComment: Comment = {
          id: Date.now(),
          username: 'your_username', // Hardcoded for this demo
          text: commentText,
        };
        return { ...p, comments: [...p.comments, newComment], commentsCount: p.commentsCount + 1 };
      }
      return p;
    }));
  };

  return (
    <PostsContext.Provider value={{ posts, toggleLike, toggleBookmark, addComment }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
