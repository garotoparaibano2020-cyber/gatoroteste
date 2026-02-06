
import React from 'react';
import { Post, ContentType } from '../types';
import { MOCK_CREATOR } from '../constants';

interface PostCardProps {
  post: Post;
  onSubscribe: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSubscribe }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-6 shadow-xl">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={MOCK_CREATOR.avatar} className="w-10 h-10 rounded-full border-2 border-purple-500" />
          <div className="ml-3">
            <h3 className="font-bold text-zinc-100 flex items-center">
              {MOCK_CREATOR.name}
              <span className="ml-1 text-blue-400 text-xs">✔️</span>
            </h3>
            <p className="text-xs text-zinc-500">@{MOCK_CREATOR.username} • {post.createdAt}</p>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors">•••</button>
      </div>

      {/* Content */}
      <div className="relative group">
        {post.isLocked ? (
          <div className="relative aspect-[3/4] bg-zinc-800 flex flex-col items-center justify-center p-8 text-center cursor-pointer" onClick={onSubscribe}>
            <div className="absolute inset-0 bg-black/40 blur-xl opacity-50"></div>
            <div className="z-10 bg-zinc-950/80 p-6 rounded-3xl border border-zinc-700 backdrop-blur-md">
              <span className="text-4xl mb-4 block">🔒</span>
              <h4 className="text-xl font-bold mb-2">Conteúdo Exclusivo</h4>
              <p className="text-sm text-zinc-400 mb-6">Assine o perfil para desbloquear este e mais centenas de posts.</p>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-full font-bold transition-all">
                Assinar por $19.90/mês
              </button>
            </div>
          </div>
        ) : (
          <div className="aspect-[3/4] w-full bg-zinc-950">
            {post.type === ContentType.VIDEO ? (
              <video 
                src={post.contentUrl} 
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img src={post.contentUrl} className="w-full h-full object-cover" />
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-3">
          <button className="flex items-center text-zinc-300 hover:text-pink-500 transition-colors">
            <span className="text-xl mr-2">❤️</span>
            <span className="text-sm font-semibold">{post.likes}</span>
          </button>
          <button className="flex items-center text-zinc-300 hover:text-purple-400 transition-colors">
            <span className="text-xl mr-2">💬</span>
            <span className="text-sm font-semibold">{post.comments}</span>
          </button>
          <button className="flex items-center text-zinc-300 hover:text-blue-400 transition-colors ml-auto">
            <span className="text-xl">⭐</span>
          </button>
        </div>
        <p className="text-sm text-zinc-300">
          <span className="font-bold mr-2">{MOCK_CREATOR.username}</span>
          {post.caption}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
