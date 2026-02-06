
import React from 'react';
import { Post, ContentType, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Silva',
  username: 'alex_silva',
  avatar: 'https://picsum.photos/seed/user/200',
  isCreator: false
};

export const MOCK_CREATOR: User = {
  id: 'c1',
  name: 'Valentina Rose',
  username: 'valentinarose',
  avatar: 'https://picsum.photos/seed/val/200',
  isCreator: true,
  isSubscribed: false
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    creatorId: 'c1',
    type: ContentType.IMAGE,
    contentUrl: 'https://picsum.photos/seed/p1/800/1200',
    caption: 'Bastidores do ensaio de hoje ✨',
    likes: 1240,
    comments: 45,
    isLocked: false,
    createdAt: '2h atrás'
  },
  {
    id: 'p2',
    creatorId: 'c1',
    type: ContentType.VIDEO,
    contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    previewUrl: 'https://picsum.photos/seed/p2/800/1200',
    caption: 'Vídeo exclusivo para assinantes VIP! 🔞',
    likes: 3500,
    comments: 120,
    isLocked: true,
    price: 19.90,
    createdAt: '5h atrás'
  },
  {
    id: 'p3',
    creatorId: 'c1',
    type: ContentType.IMAGE,
    contentUrl: 'https://picsum.photos/seed/p3/800/1200',
    caption: 'O que você achou dessa cor? 🫦',
    likes: 890,
    comments: 12,
    isLocked: false,
    createdAt: '1 dia atrás'
  }
];
