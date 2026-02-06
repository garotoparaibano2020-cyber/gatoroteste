
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import ChatWindow from './components/ChatWindow';
import LiveStream from './components/LiveStream';
import { MOCK_POSTS, MOCK_CREATOR } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (confirm("Você quer simular a assinatura deste perfil por $19.90?")) {
      setSubscribed(true);
      alert("Assinatura realizada com sucesso! (Modo Simulação)");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="max-w-xl mx-auto py-8 px-4">
            <div className="mb-8 flex items-center space-x-4 overflow-x-auto pb-4 no-scrollbar">
              <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-purple-600">
                  <img src={MOCK_CREATOR.avatar} className="w-full h-full rounded-full border-2 border-zinc-950 object-cover" />
                </div>
                <span className="text-[10px] text-zinc-400">Minha Live</span>
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0 opacity-50 grayscale">
                  <div className="w-16 h-16 rounded-full p-1 bg-zinc-800">
                    <img src={`https://picsum.photos/seed/s${i}/200`} className="w-full h-full rounded-full border-2 border-zinc-950 object-cover" />
                  </div>
                  <span className="text-[10px] text-zinc-500">Creator {i}</span>
                </div>
              ))}
            </div>
            
            {MOCK_POSTS.map(post => (
              <PostCard 
                key={post.id} 
                post={{...post, isLocked: !subscribed && post.isLocked}} 
                onSubscribe={handleSubscribe} 
              />
            ))}
          </div>
        );
      case 'messages':
        return (
          <div className="max-w-4xl mx-auto py-4 px-4 h-full">
            <ChatWindow />
          </div>
        );
      case 'live':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-3 h-3 bg-red-600 rounded-full mr-3 animate-pulse"></span>
              Transmissão ao Vivo
            </h2>
            <LiveStream />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-400 text-sm mb-2 uppercase">Ganhos da Live</h4>
                <p className="text-2xl font-bold text-green-500">$0.00</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-400 text-sm mb-2 uppercase">Novos Assinantes</h4>
                <p className="text-2xl font-bold text-purple-500">0</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-400 text-sm mb-2 uppercase">Duração</h4>
                <p className="text-2xl font-bold text-white">00:00:00</p>
              </div>
            </div>
          </div>
        );
      case 'vault':
        return (
          <div className="max-w-5xl mx-auto py-8 px-4 text-center mt-20">
            <div className="text-6xl mb-6">📂</div>
            <h2 className="text-3xl font-bold mb-4">Seu Cofre Premium</h2>
            <p className="text-zinc-500 mb-8">Todos os vídeos e fotos comprados individualmente ficam guardados aqui.</p>
            <div className="grid grid-cols-3 gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <span className="text-zinc-700 text-2xl">🔒</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-3xl mx-auto py-8 px-4">
             <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <div className="h-48 bg-gradient-to-r from-zinc-800 to-zinc-700 relative">
                  <img src="https://picsum.photos/seed/banner/1200/400" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="px-8 pb-8">
                  <div className="relative flex justify-between items-end -mt-16 mb-6">
                    <img src={MOCK_CREATOR.avatar} className="w-32 h-32 rounded-3xl border-4 border-zinc-900 shadow-2xl" />
                    <button onClick={handleSubscribe} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded-full transition-all">
                      {subscribed ? 'Assinado ✅' : 'Assinar $19.90'}
                    </button>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">{MOCK_CREATOR.name} <span className="text-blue-500 text-xl">✔️</span></h2>
                  <p className="text-zinc-500 mb-4">@{MOCK_CREATOR.username}</p>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    🌟 Bem-vindo ao meu mundo privado. <br/>
                    🔥 Conteúdo diário sem censura. <br/>
                    💬 Chat aberto para assinantes VIP.
                  </p>
                  <div className="flex space-x-8 border-t border-zinc-800 pt-6">
                    <div className="text-center">
                      <p className="text-xl font-bold">12.5k</p>
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Fãs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">452</p>
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">89k</p>
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Likes</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        );
      default:
        return <div>Em construção...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
          <h2 className="font-bold text-zinc-200 uppercase tracking-widest text-sm">
            {activeTab === 'feed' ? 'Para Você' : activeTab}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="text-zinc-400 hover:text-white">🔔</button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700"></div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
