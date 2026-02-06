
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'feed', icon: '🏠', label: 'Início' },
    { id: 'messages', icon: '💬', label: 'Mensagens' },
    { id: 'live', icon: '🔴', label: 'Live' },
    { id: 'vault', icon: '🔒', label: 'Cofre' },
    { id: 'profile', icon: '👤', label: 'Meu Perfil' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hidden md:block tracking-tighter">
          GAROTOPARAIBANO
        </h1>
        <div className="md:hidden text-2xl">🌵</div>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-zinc-800 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="ml-4 font-medium hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-900">
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl font-bold text-sm hidden md:block hover:opacity-90 active:scale-95 transition-all">
          ASSINAR PREMIUM
        </button>
        <button className="md:hidden text-2xl w-full p-2">💎</button>
      </div>
    </aside>
  );
};

export default Sidebar;
