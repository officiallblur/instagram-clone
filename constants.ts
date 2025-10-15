
import type { Story, Post, UserProfile, Reel, Notification } from './types';

export const STORIES_DATA: Story[] = [
  { id: 1, username: 'Your Story', avatarUrl: 'https://picsum.photos/seed/1/100/100', isOwnStory: true },
  { id: 2, username: 'joshua_l', avatarUrl: 'https://picsum.photos/seed/2/100/100' },
  { id: 3, username: 'karennne', avatarUrl: 'https://picsum.photos/seed/3/100/100' },
  { id: 4, username: 'martini_rond', avatarUrl: 'https://picsum.photos/seed/4/100/100' },
  { id: 5, username: 'craig_love', avatarUrl: 'https://picsum.photos/seed/5/100/100' },
  { id: 6, username: 'zackjohn', avatarUrl: 'https://picsum.photos/seed/6/100/100' },
  { id: 7, username: 'max_feel', avatarUrl: 'https://picsum.photos/seed/7/100/100' },
];

export const POSTS_DATA: Post[] = [
  {
    id: 1,
    username: 'joshua_l',
    location: 'Tokyo, Japan',
    avatarUrl: 'https://picsum.photos/seed/2/100/100',
    imageUrls: ['https://picsum.photos/seed/11/600/600', 'https://picsum.photos/seed/111/600/600'],
    caption: 'The game in Japan was amazing and I want to share some photos',
    likesCount: 44686,
    firstLiker: 'craig_love',
    firstLikerAvatarUrl: 'https://picsum.photos/seed/5/100/100',
    commentsCount: 489,
    timestamp: '10 hours ago',
    isVerified: true,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: 1, username: 'karennne', text: 'Looks amazing!' },
      { id: 2, username: 'zackjohn', text: 'Incredible shots.'}
    ],
  },
  {
    id: 2,
    username: 'karennne',
    isVerified: true,
    avatarUrl: 'https://picsum.photos/seed/3/100/100',
    imageUrls: ['https://picsum.photos/seed/12/600/700'],
    caption: 'A beautiful day at the beach!',
    likesCount: 12345,
    firstLiker: 'zackjohn',
    firstLikerAvatarUrl: 'https://picsum.photos/seed/6/100/100',
    commentsCount: 231,
    timestamp: '1 day ago',
    isLiked: false,
    isBookmarked: false,
    comments: [],
  },
    {
    id: 3,
    username: 'martini_rond',
    location: 'Paris, France',
    avatarUrl: 'https://picsum.photos/seed/4/100/100',
    imageUrls: ['https://picsum.photos/seed/13/600/600'],
    caption: 'Eiffel Tower vibes ✨',
    likesCount: 98765,
    firstLiker: 'joshua_l',
    firstLikerAvatarUrl: 'https://picsum.photos/seed/2/100/100',
    commentsCount: 1024,
    timestamp: '2 days ago',
    isLiked: true,
    isBookmarked: true,
    comments: [
      { id: 1, username: 'craig_love', text: 'So jealous!' },
      { id: 2, username: 'zackjohn', text: 'I need to go back.' },
      { id: 3, username: 'joshua_l', text: 'Classic view!'}
    ],
  },
];

export const USER_PROFILE_DATA: UserProfile = {
  username: 'your_username',
  name: 'Your Name',
  avatarUrl: 'https://picsum.photos/seed/1/100/100',
  postCount: 6,
  followerCount: 532,
  followingCount: 562,
  bio: 'Digital creator\nProduct designer\nEverything is designed.',
  link: 'website.com',
  isVerified: false,
  highlights: [
    { id: 1, username: 'New', avatarUrl: 'https://picsum.photos/seed/h1/100/100' },
    { id: 2, username: 'Friends', avatarUrl: 'https://picsum.photos/seed/h2/100/100' },
    { id: 3, username: 'Sport', avatarUrl: 'https://picsum.photos/seed/h3/100/100' },
    { id: 4, username: 'Design', avatarUrl: 'https://picsum.photos/seed/h4/100/100' },
  ],
  posts: [
    { id: 1, imageUrls: ['https://picsum.photos/seed/p1/300/300'] },
    { id: 2, imageUrls: ['https://picsum.photos/seed/p2/300/300'] },
    { id: 3, imageUrls: ['https://picsum.photos/seed/p3/300/300'] },
    { id: 4, imageUrls: ['https://picsum.photos/seed/p4/300/300'] },
    { id: 5, imageUrls: ['https://picsum.photos/seed/p5/300/300'] },
    { id: 6, imageUrls: ['https://picsum.photos/seed/p6/300/300'] },
  ],
};

export const EXPLORE_DATA = Array.from({ length: 21 }, (_, i) => ({
  id: i,
  imageUrl: `https://picsum.photos/seed/e${i}/300/300`,
}));

export const REELS_DATA: Reel[] = [
  {
    id: 1,
    username: 'nature_lover',
    isVerified: true,
    avatarUrl: 'https://picsum.photos/seed/r1/100/100',
    videoUrl: 'https://picsum.photos/seed/v1/400/800',
    caption: 'The mountains are calling!',
    song: 'Original Audio',
    likes: '1.2M',
    comments: '5,432',
    shares: '8,123',
  },
  {
    id: 2,
    username: 'foodie_queen',
    avatarUrl: 'https://picsum.photos/seed/r2/100/100',
    videoUrl: 'https://picsum.photos/seed/v2/400/800',
    caption: 'Best pasta I have ever had!',
    song: 'That\'s Amore - Dean Martin',
    likes: '897K',
    comments: '2,109',
    shares: '4,567',
  }
];

export const SHOP_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  imageUrl: `https://picsum.photos/seed/s${i}/300/300`,
}));

export const NOTIFICATIONS_DATA: { [key: string]: Notification[] } = {
  "New": [
    {
      id: 1,
      type: 'follow',
      user: { username: 'craig_love', avatarUrl: 'https://picsum.photos/seed/5/100/100' },
      timestamp: '1h',
    },
  ],
  "This Week": [
    {
      id: 2,
      type: 'like',
      user: { username: 'karennne', avatarUrl: 'https://picsum.photos/seed/3/100/100' },
      timestamp: '2d',
      postPreviewUrl: 'https://picsum.photos/seed/p1/300/300',
    },
    {
      id: 3,
      type: 'comment',
      user: { username: 'martini_rond', avatarUrl: 'https://picsum.photos/seed/4/100/100' },
      timestamp: '3d',
      postPreviewUrl: 'https://picsum.photos/seed/p2/300/300',
      commentText: 'Awesome shot!',
    },
     {
      id: 4,
      type: 'follow',
      user: { username: 'zackjohn', avatarUrl: 'https://picsum.photos/seed/6/100/100' },
      timestamp: '4d',
    },
  ],
  "This Month": [
     {
      id: 5,
      type: 'like',
      user: { username: 'max_feel', avatarUrl: 'https://picsum.photos/seed/7/100/100' },
      timestamp: '1w',
      postPreviewUrl: 'https://picsum.photos/seed/p3/300/300',
    },
    {
      id: 6,
      type: 'like',
      user: { username: 'joshua_l', avatarUrl: 'https://picsum.photos/seed/2/100/100' },
      timestamp: '2w',
      postPreviewUrl: 'https://picsum.photos/seed/p4/300/300',
    },
  ]
};