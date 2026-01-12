
import React, { useState, useEffect } from 'react';
import { GameState, PlayerData } from './types';
import CharacterCreator from './components/UI/CharacterCreator';
import HUD from './components/UI/HUD';
import { generateQuestNarrative } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [time, setTime] = useState(800);
  const [showInGameMenu, setShowInGameMenu] = useState(false);

  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;
    const interval = setInterval(() => setTime(prev => (prev + 1) % 2400), 500);
    return () => clearInterval(interval);
  }, [gameState]);

  const handleStartGame = () => {
    if ('vibrate' in navigator) navigator.vibrate(20);
    setGameState(GameState.CHARACTER_CREATION);
  };

  const handleCharacterCreation = (newPlayer: PlayerData) => {
    setPlayer(newPlayer);
    setGameState(GameState.PLAYING);
    setTimeout(async () => {
      await generateQuestNarrative("O Início da Lenda");
    }, 1000);
  };

  const toggleMenu = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setShowInGameMenu(prev => !prev);
    setGameState(prev => prev === GameState.PLAYING ? GameState.PAUSED : GameState.PLAYING);
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden select-none touch-none">
      {gameState === GameState.MENU && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative flex flex-col items-center text-center px-6 space-y-6 animate-in fade-in duration-1000">
            <h1 className="text-6xl md:text-8xl fantasy-font text-amber-500 tracking-tighter md:tracking-widest drop-shadow-2xl">ELDORIA</h1>
            <p className="text-zinc-500 text-sm md:text-xl max-w-xs md:max-w-md fantasy-font opacity-80 italic">A lenda eterna começa com um toque.</p>
            
            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              <button 
                onClick={handleStartGame}
                className="bg-amber-600 hover:bg-amber-500 text-white py-4 rounded font-bold shadow-xl transition-all active:scale-95 fantasy-font uppercase tracking-widest text-sm"
              >
                Nova Jornada
              </button>
              <button className="bg-zinc-800/50 text-zinc-400 py-3 rounded font-bold transition-all border border-zinc-700/30 fantasy-font uppercase text-xs">
                Opções
              </button>
            </div>
          </div>
          <div className="absolute bottom-6 text-zinc-700 text-[10px] font-mono uppercase tracking-widest">
            v1.1.0-mobile • Eldoria Engine
          </div>
        </div>
      )}

      {gameState === GameState.CHARACTER_CREATION && (
        <CharacterCreator onComplete={handleCharacterCreation} />
      )}

      {(gameState === GameState.PLAYING || gameState === GameState.PAUSED) && player && (
        <>
          <div className="absolute inset-0 z-0 bg-[#070708] flex items-center justify-center overflow-hidden">
            <div className="text-zinc-900 text-center space-y-2 select-none">
              <div className="text-4xl md:text-6xl opacity-10 fantasy-font">ELDORIA 3D</div>
              <div className="text-[10px] md:text-sm opacity-10 uppercase tracking-[0.5rem]">Processando Ambiente Realista...</div>
            </div>
            {/* Visual background element */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
          </div>

          <HUD player={player} time={time} onMenuOpen={toggleMenu} />

          {showInGameMenu && (
            <div className="fixed inset-0 z-[60] bg-black/95 md:bg-black/60 md:backdrop-blur-xl flex items-center justify-center p-0 md:p-8">
                <div className="bg-zinc-900/90 md:border-2 md:border-amber-900/50 md:rounded-xl w-full max-w-5xl h-full md:h-[80vh] flex flex-col md:flex-row overflow-hidden shadow-2xl">
                    {/* Header Mobile / Sidebar Desktop */}
                    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 p-4 md:p-6 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto no-scrollbar">
                        <div className="hidden md:block text-amber-500 fantasy-font text-2xl mb-8 uppercase tracking-tighter">Menu</div>
                        {['Status', 'Inventário', 'Habilidades', 'Missões'].map(item => (
                            <button key={item} className="whitespace-nowrap md:text-left py-2 px-4 rounded bg-zinc-800/50 md:bg-transparent text-zinc-400 hover:text-amber-400 transition-colors uppercase text-[10px] md:text-sm font-bold tracking-widest border border-zinc-700 md:border-none">
                                {item}
                            </button>
                        ))}
                        <button onClick={toggleMenu} className="ml-auto md:ml-0 md:mt-auto py-2 px-4 bg-amber-600 rounded text-white font-bold uppercase text-[10px] md:text-xs">Fechar</button>
                    </div>
                    {/* Content Area */}
                    <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                        <div className="flex flex-col gap-6">
                            <div className="bg-zinc-950/50 rounded-lg border border-zinc-800 p-4 md:p-6">
                                <h3 className="text-amber-500 fantasy-font text-lg md:text-xl mb-4 uppercase tracking-widest">Resumo do Herói</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 text-xs md:text-sm">
                                        <div className="flex justify-between border-b border-zinc-800 pb-1">
                                            <span className="text-zinc-500">Nome:</span>
                                            <span className="text-white font-bold">{player.name}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-800 pb-1">
                                            <span className="text-zinc-500">Classe:</span>
                                            <span className="text-white font-bold">{player.class}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-800 pb-1">
                                            <span className="text-zinc-500">Ouro:</span>
                                            <span className="text-amber-500 font-bold">{player.gold}g</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(player.stats).map(([stat, val]) => (
                                            <div key={stat} className="p-2 bg-zinc-900 rounded border border-zinc-800 flex flex-col items-center">
                                                <span className="text-[9px] text-zinc-500 uppercase">{stat.substring(0,3)}</span>
                                                <span className="text-amber-500 font-bold text-sm">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
