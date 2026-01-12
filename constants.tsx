
import React from 'react';
import { CharacterClass, Rarity, Item, Skill, Stats } from './types';

export const INITIAL_STATS: Record<CharacterClass, Stats> = {
  [CharacterClass.WARRIOR]: { strength: 10, agility: 5, intelligence: 3, vitality: 12 },
  [CharacterClass.MAGE]: { strength: 3, agility: 5, intelligence: 12, vitality: 6 },
  [CharacterClass.ARCHER]: { strength: 6, agility: 10, intelligence: 6, vitality: 8 },
  [CharacterClass.ROGUE]: { strength: 5, agility: 12, intelligence: 4, vitality: 7 },
};

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.COMMON]: 'text-gray-400',
  [Rarity.RARE]: 'text-blue-400',
  [Rarity.EPIC]: 'text-purple-500',
  [Rarity.LEGENDARY]: 'text-orange-500',
};

export const STARTING_SKILLS: Record<CharacterClass, Skill[]> = {
  [CharacterClass.WARRIOR]: [
    { id: 'bash', name: 'Golpe Esmagador', description: 'Um ataque pesado com a arma.', manaCost: 10, cooldown: 5, unlocked: true, level: 1 },
    { id: 'shout', name: 'Grito de Guerra', description: 'Aumenta sua vitalidade temporariamente.', manaCost: 20, cooldown: 15, unlocked: false, level: 0 },
  ],
  [CharacterClass.MAGE]: [
    { id: 'fireball', name: 'Bola de Fogo', description: 'Lança um projétil flamejante.', manaCost: 15, cooldown: 2, unlocked: true, level: 1 },
    { id: 'blink', name: 'Teletransporte', description: 'Move-se instantaneamente para frente.', manaCost: 30, cooldown: 10, unlocked: false, level: 0 },
  ],
  [CharacterClass.ARCHER]: [
    { id: 'volley', name: 'Chuva de Flechas', description: 'Múltiplas flechas em área.', manaCost: 20, cooldown: 8, unlocked: true, level: 1 },
    { id: 'stealth', name: 'Camuflagem', description: 'Fica invisível por alguns segundos.', manaCost: 25, cooldown: 20, unlocked: false, level: 0 },
  ],
  [CharacterClass.ROGUE]: [
    { id: 'backstab', name: 'Punhalada', description: 'Dano crítico vindo das costas.', manaCost: 10, cooldown: 4, unlocked: true, level: 1 },
    { id: 'poison', name: 'Lâmina Venenosa', description: 'Adiciona veneno aos ataques.', manaCost: 15, cooldown: 12, unlocked: false, level: 0 },
  ],
};
