
import React, { useRef, useEffect, useState } from 'react';

const LiveStream: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [viewers, setViewers] = useState(1240);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setViewers(v => v + Math.floor(Math.random() * 10) - 4);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startLive = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Precisamos de acesso à câmera para simular a live!");
    }
  };

  const stopLive = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsActive(false);
  };

  return (
    <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
      {!isActive ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-950 p-8 text-center">
          <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <span className="text-4xl text-red-500">🔴</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Pronta para entrar ao vivo?</h2>
          <p className="text-zinc-400 mb-6 max-w-sm">Sua audiência VIP está esperando por você. Inicie agora e comece a receber mimos!</p>
          <button 
            onClick={startLive}
            className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg shadow-red-600/20"
          >
            INICIAR LIVE AGORA
          </button>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale-[0.2] brightness-110" />
          
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">AO VIVO</span>
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded flex items-center">
              👤 {viewers.toLocaleString()} assistindo
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <button 
              onClick={stopLive}
              className="bg-zinc-900/80 hover:bg-zinc-800 p-2 rounded-full text-white transition-all"
            >
              ✖️
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end space-x-2">
            <div className="flex-1 space-y-2 max-h-40 overflow-hidden mask-fade-top">
              <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/10 max-w-[80%]">
                <p className="text-xs text-zinc-300"><span className="font-bold text-purple-400">Lucas_VIP:</span> Linda demais! 😍</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/10 max-w-[80%]">
                <p className="text-xs text-zinc-300"><span className="font-bold text-yellow-400">Donatário:</span> Mandou 100 moedas! 💎</p>
              </div>
            </div>
            <button className="bg-pink-600 hover:bg-pink-500 p-4 rounded-full shadow-lg">
              🎁
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveStream;
