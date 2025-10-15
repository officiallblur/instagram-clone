
export interface Story {
  id: number;
  username: string;
  avatarUrl: string;
  isOwnStory?: boolean;
}

export interface Comment {
  id: number;
  username: string;
  text: string;
}

export interface Post {
  id: number;
  username: string;
  location?: string;
  avatarUrl: string;
  imageUrls: string[];
  caption: string;
  likesCount: number;
  firstLiker: string;
  firstLikerAvatarUrl: string;
  commentsCount: number;
  timestamp: string;
  isVerified?: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: Comment[];
}

export interface UserProfile {
  username: string;
  name: string;
  avatarUrl: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  bio: string;
  link: string;
  highlights: Omit<Story, 'isOwnStory'>[];
  posts: Pick<Post, 'id' | 'imageUrls'>[];
  isVerified?: boolean;
}

export interface Reel {
  id: number;
  username: string;
  avatarUrl: string;
  videoUrl: string; // Using image urls for this demo
  caption: string;
  song: string;
  likes: string;
  comments: string;
  shares: string;
  isVerified?: boolean;
}

export interface Notification {
  id: number;
  type: 'follow' | 'like' | 'comment';
  user: {
    username: string;
    avatarUrl: string;
  };
  timestamp: string;
  postPreviewUrl?: string;
  commentText?: string;
}