
import React from 'react';
import { PlayerData } from '../../types';

interface Props {
  player: PlayerData;
  time: number;
  onMenuOpen: () => void;
}

const HUD: React.FC<Props> = ({ player, time, onMenuOpen }) => {
  const hpPercent = (player.hp / player.maxHp) * 100;
  const manaPercent = (player.mana / player.maxMana) * 100;
  const xpPercent = (player.xp / player.nextLevelXp) * 100;

  const hours = Math.floor(time / 100).toString().padStart(2, '0');
  const minutes = (time % 100).toString().padStart(2, '0');

  const vibrate = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
  };

  return (
    <div className="fixed inset-0 pointer-events-none p-4 md:p-6 flex flex-col justify-between z-40 safe-area-inset">
      {/* Top Section */}
      <div className="flex justify-between items-start w-full">
        {/* Player Stats - Compact for Mobile */}
        <div className="flex items-center gap-3 pointer-events-auto" onClick={onMenuOpen}>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-900 border-2 border-amber-500 flex items-center justify-center text-xl md:text-3xl font-bold text-amber-500 shadow-lg fantasy-font">
            {player.level}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="fantasy-font text-sm md:text-xl text-white drop-shadow-md truncate max-w-[100px] md:max-w-none">{player.name}</span>
            </div>
            <div className="w-32 md:w-64 h-2 md:h-4 bg-zinc-950 rounded-full border border-zinc-800 relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300" style={{ width: `${hpPercent}%` }} />
            </div>
            <div className="w-24 md:w-56 h-1.5 md:h-3 bg-zinc-950 rounded-full border border-zinc-800 relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300" style={{ width: `${manaPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Time and Mini-options */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className="bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded border border-zinc-700 text-amber-500 font-mono text-sm md:text-lg">
            {hours}:{minutes}
          </div>
          <button 
            onClick={() => { vibrate(); onMenuOpen(); }}
            className="p-2 bg-amber-600/20 border border-amber-600 rounded text-amber-500 md:hidden"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* Center - XP Bar */}
      <div className="w-full flex justify-center px-8">
         <div className="w-full max-w-md h-1 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/50">
            <div className="h-full bg-amber-500/50" style={{ width: `${xpPercent}%` }} />
         </div>
      </div>

      {/* Bottom Section - Controls */}
      <div className="flex justify-between items-end w-full pb-2 md:pb-0">
        {/* Virtual Joystick Placeholder */}
        <div className="pointer-events-auto opacity-60 md:opacity-20">
          <div className="joystick-base">
            <div className="joystick-stick" />
          </div>
        </div>

        {/* Quick Slots - Scrollable on mobile */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-auto md:relative md:bottom-0 md:left-0 md:translate-x-0">
          {[1, 2].map((i) => (
            <div key={i} onClick={vibrate} className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900/80 border border-zinc-700 rounded flex items-center justify-center relative active:scale-90 transition-transform">
               {i === 1 ? <div className="w-6 h-6 rounded-full bg-red-500/40 border border-red-500" /> : <div className="w-6 h-6 rounded-full bg-blue-500/40 border border-blue-500" />}
            </div>
          ))}
        </div>

        {/* Action Buttons Wheel */}
        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={vibrate} className="w-12 h-12 bg-zinc-800/80 rounded-full border border-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-400 active:bg-amber-600 active:text-white">SKL</button>
            <button onClick={vibrate} className="w-12 h-12 bg-zinc-800/80 rounded-full border border-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-400 active:bg-blue-600 active:text-white">DGE</button>
          </div>
          <button 
            onClick={vibrate}
            className="w-20 h-20 bg-amber-600/80 rounded-full border-4 border-amber-400/50 flex items-center justify-center shadow-xl active:scale-90 transition-all"
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Quest Tracker - Bottom Left */}
      <div className="absolute bottom-32 left-4 md:left-6 max-w-[150px] md:max-w-xs pointer-events-none">
        <div className="bg-black/40 backdrop-blur-sm p-2 rounded text-[10px] md:text-[11px] text-zinc-300 border-l-2 border-amber-500">
          Missão: Vila de Arathor
        </div>
      </div>
    </div>
  );
};

export default HUD;
