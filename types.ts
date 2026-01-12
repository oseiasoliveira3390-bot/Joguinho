
export enum GameState {
  MENU = 'MENU',
  CHARACTER_CREATION = 'CHARACTER_CREATION',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  DIALOGUE = 'DIALOGUE',
  GAMEOVER = 'GAMEOVER'
}

export enum CharacterClass {
  WARRIOR = 'WARRIOR',
  MAGE = 'MAGE',
  ARCHER = 'ARCHER',
  ROGUE = 'ROGUE'
}

export enum Rarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY'
}

export interface Stats {
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
}

export interface PlayerData {
  name: string;
  gender: 'male' | 'female';
  class: CharacterClass;
  level: number;
  xp: number;
  nextLevelXp: number;
  gold: number;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  stats: Stats;
  skillPoints: number;
  inventory: Item[];
  equipment: {
    weapon: Item | null;
    armor: Item | null;
    accessory: Item | null;
  };
  skills: Skill[];
  position: [number, number, number];
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material';
  rarity: Rarity;
  stats?: Partial<Stats>;
  value: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  manaCost: number;
  cooldown: number;
  unlocked: boolean;
  level: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  rewardGold: number;
  status: 'active' | 'completed' | 'available';
  objective: string;
}

export interface Enemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  level: number;
  position: [number, number, number];
  type: 'minion' | 'boss';
}
