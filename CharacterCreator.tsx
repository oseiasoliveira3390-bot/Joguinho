
import React, { useState } from 'react';
import { CharacterClass, PlayerData, Stats } from '../../types';
import { INITIAL_STATS } from '../../constants';

interface Props {
  onComplete: (player: PlayerData) => void;
}

const CharacterCreator: React.FC<Props> = ({ onComplete }) => {
  const [name, setName] = useState('Aventureiro');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [charClass, setCharClass] = useState<CharacterClass>(CharacterClass.WARRIOR);

  const handleStart = () => {
    const stats = INITIAL_STATS[charClass];
    const newPlayer: PlayerData = {
      name,
      gender,
      class: charClass,
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      gold: 50,
      hp: stats.vitality * 10,
      maxHp: stats.vitality * 10,
      mana: stats.intelligence * 10,
      maxMana: stats.intelligence * 10,
      stats: { ...stats },
      skillPoints: 1,
      inventory: [],
      equipment: { weapon: null, armor: null, accessory: null },
      skills: [],
      position: [0, 1, 0]
    };
    if ('vibrate' in navigator) navigator.vibrate(50);
    onComplete(newPlayer);
  };

  return (
    <div className="fixed inset-0 bg-black md:bg-black/90 flex items-center justify-center p-0 md:p-4 z-50 overflow-y-auto">
      <div className="bg-zinc-900 md:border-2 md:border-amber-900/50 md:rounded-lg max-w-2xl w-full p-6 md:p-8 shadow-2xl min-h-screen md:min-h-0">
        <h2 className="text-2xl md:text-3xl fantasy-font text-amber-500 mb-6 md:mb-8 text-center uppercase tracking-widest pt-4 md:pt-0">Criação de Personagem</h2>
        
        <div className="space-y-5">
          <section>
            <label className="block text-amber-200/50 text-[10px] md:text-xs mb-1 uppercase tracking-tighter">Nome do Herói</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-amber-500"
            />
          </section>

          <section>
            <label className="block text-amber-200/50 text-[10px] md:text-xs mb-1 uppercase">Gênero</label>
            <div className="flex gap-2">
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g as any)}
                  className={`flex-1 py-2 rounded border text-sm transition-all ${gender === g ? 'bg-amber-600 border-amber-400 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}
                >
                  {g === 'male' ? 'Masculino' : 'Feminino'}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-amber-200/50 text-[10px] md:text-xs mb-1 uppercase">Classe</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {Object.values(CharacterClass).map((c) => (
                <button
                  key={c}
                  onClick={() => setCharClass(c)}
                  className={`p-3 md:p-4 rounded border text-left transition-all ${charClass === c ? 'bg-amber-900/30 border-amber-500' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}
                >
                  <div className={`font-bold text-sm md:text-base ${charClass === c ? 'text-amber-400' : 'text-zinc-400'}`}>{c}</div>
                  <div className="text-[10px] opacity-60 line-clamp-1">
                    {c === 'WARRIOR' && 'Força e resistência.'}
                    {c === 'MAGE' && 'Magias arcanas.'}
                    {c === 'ARCHER' && 'Distância e precisão.'}
                    {c === 'ROGUE' && 'Agilidade e furtividade.'}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-zinc-950 p-3 rounded border border-zinc-800">
            <h3 className="text-amber-500 text-[10px] font-bold mb-2 uppercase">Atributos</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex justify-between"><span className="text-zinc-500">For:</span><span className="text-amber-200">{INITIAL_STATS[charClass].strength}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Agi:</span><span className="text-amber-200">{INITIAL_STATS[charClass].agility}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Int:</span><span className="text-amber-200">{INITIAL_STATS[charClass].intelligence}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Vit:</span><span className="text-amber-200">{INITIAL_STATS[charClass].vitality}</span></div>
            </div>
          </section>

          <button
            onClick={handleStart}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded shadow-xl transition-all active:scale-95 fantasy-font uppercase tracking-widest mt-2"
          >
            Começar Jornada
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreator;
