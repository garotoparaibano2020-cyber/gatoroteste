
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isCreator: boolean;
  isSubscribed?: boolean;
}

export enum ContentType {
  IMAGE = 'image',
  VIDEO = 'video',
  LIVE = 'live'
}

export interface Post {
  id: string;
  creatorId: string;
  type: ContentType;
  contentUrl: string;
  previewUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  isLocked: boolean;
  price?: number;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface CreatorStats {
  subscribers: number;
  posts: number;
  likes: number;
}
