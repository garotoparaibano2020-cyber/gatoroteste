
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { MOCK_CREATOR, CURRENT_USER } from '../constants';
import { getGeminiReply } from '../services/geminiService';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'c1', text: 'Olá lindo! Gostou do meu último post?', timestamp: '10:00' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      senderId: CURRENT_USER.id,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call Gemini for creator personality reply
    const replyText = await getGeminiReply(inputText, MOCK_CREATOR.name);
    
    setIsTyping(false);
    const creatorMsg: Message = {
      id: (Date.now() + 1).toString(),
      senderId: MOCK_CREATOR.id,
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, creatorMsg]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex items-center">
        <img src={MOCK_CREATOR.avatar} className="w-10 h-10 rounded-full border-2 border-green-500" />
        <div className="ml-3">
          <h3 className="font-bold text-zinc-100">{MOCK_CREATOR.name}</h3>
          <p className="text-xs text-green-500 font-medium">Online agora</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === CURRENT_USER.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.senderId === CURRENT_USER.id 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <span className="text-[10px] opacity-50 mt-1 block text-right">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-400 p-2 px-4 rounded-full text-xs animate-pulse">
              Digitando...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-zinc-400 hover:text-zinc-200">📸</button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Mande uma mensagem..."
            className="flex-1 bg-zinc-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button 
            onClick={handleSend}
            className="p-2 bg-purple-600 rounded-full text-white hover:bg-purple-500 transition-colors"
          >
            ✈️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
