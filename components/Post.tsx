
import React, { useState } from 'react';
import type { Post as PostType } from '../types';
import { MoreIcon, HeartIcon, CommentIcon, ShareIcon, BookmarkIcon, VerifiedBadge, ChevronLeftIcon, ChevronRightIcon, HeartIconFilled, BookmarkIconFilled } from './Icons';
import { usePosts } from '../contexts/PostsContext';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { toggleLike, toggleBookmark, addComment } = usePosts();
  const [currentImage, setCurrentImage] = useState(0);
  const [comment, setComment] = useState('');

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % post.imageUrls.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + post.imageUrls.length) % post.imageUrls.length);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(post.id, comment.trim());
    setComment('');
  };

  return (
    <div className="flex flex-col">
      {/* Post Header */}
      <div className="flex items-center p-3">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={post.avatarUrl}
          alt={`${post.username}'s profile`}
        />
        <div className="ml-3 flex-1">
          <p className="text-sm font-bold flex items-center">
            {post.username}
            {post.isVerified && <VerifiedBadge className="h-3 w-3 ml-1" />}
          </p>
          {post.location && <p className="text-xs">{post.location}</p>}
        </div>
        <button aria-label="More options">
          <MoreIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative" onDoubleClick={() => toggleLike(post.id)}>
        <img className="w-full h-auto object-cover aspect-square" src={post.imageUrls[currentImage]} alt={`Post by ${post.username}`} />
        {post.imageUrls.length > 1 && (
        <>
            {currentImage > 0 && (
                <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-1 text-white">
                <ChevronLeftIcon className="h-4 w-4" />
                </button>
            )}
            {currentImage < post.imageUrls.length - 1 && (
                <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-1 text-white">
                <ChevronRightIcon className="h-4 w-4" />
                </button>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
                {post.imageUrls.map((_, index) => (
                <div key={index} className={`h-1.5 w-1.5 rounded-full ${index === currentImage ? 'bg-white' : 'bg-white/50'}`} />
                ))}
            </div>
        </>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <button onClick={() => toggleLike(post.id)} aria-label="Like post">
            {post.isLiked ? <HeartIconFilled className="h-7 w-7 text-red-500" /> : <HeartIcon className="h-7 w-7" />}
          </button>
          <button aria-label="Comment on post">
            <CommentIcon className="h-7 w-7" />
          </button>
          <button aria-label="Share post">
            <ShareIcon className="h-7 w-7" />
          </button>
        </div>
        <button onClick={() => toggleBookmark(post.id)} aria-label="Save post">
          {post.isBookmarked ? <BookmarkIconFilled className="h-7 w-7" /> : <BookmarkIcon className="h-7 w-7" />}
        </button>
      </div>

      {/* Post Info */}
      <div className="px-3 pb-4 space-y-2 border-b border-gray-800">
        <div className="flex items-center">
            <img src={post.firstLikerAvatarUrl} alt={post.firstLiker} className="h-5 w-5 rounded-full mr-2 border border-gray-500 p-px" />
            <p className="text-sm">
                Liked by <span className="font-bold">{post.firstLiker}</span> and <span className="font-bold">{post.likesCount.toLocaleString()} others</span>
            </p>
        </div>

        <div>
            <p className="text-sm">
              <span className="font-bold flex items-center gap-1.5">{post.username} {post.isVerified && <VerifiedBadge className="h-3 w-3" />}</span> {post.caption}
            </p>
        </div>
        
        {post.comments.length > 0 && (
            <p className="text-sm text-gray-400 cursor-pointer">
              View all {post.commentsCount.toLocaleString()} comments
            </p>
        )}
        <div className="space-y-1">
            {post.comments.slice(-2).map(comment => (
            <p key={comment.id} className="text-sm">
                <span className="font-bold">{comment.username}</span> {comment.text}
            </p>
            ))}
        </div>

        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
            <img src="https://picsum.photos/seed/1/100/100" className="h-6 w-6 rounded-full" alt="your profile"/>
            <input 
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-transparent text-sm flex-1 focus:outline-none placeholder-gray-400"
            />
            {comment && <button type="submit" className="text-sm font-semibold text-blue-400 hover:text-white">Post</button>}
        </form>

        <p className="text-xs text-gray-500 uppercase">
          {post.timestamp}
        </p>
      </div>
    </div>
  );
};

export default Post;
