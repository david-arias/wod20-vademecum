// ─────────────────────────────────────────────────────────────────────────────
// TYPES: Factions — Clans, Tribes, Traditions, Kiths, Guilds
// ─────────────────────────────────────────────────────────────────────────────

import type { GameSystemId } from './gameSystem'

export type FactionType =
  | 'clan'         // V20
  | 'tribe'        // W20
  | 'tradition'    // M20
  | 'convention'   // M20 Tecnocracia
  | 'craft'        // M20 Solitarios
  | 'kith'         // C20
  | 'guild'        // Wr20
  | 'legacy'       // Generic (bloodlines, etc.)

export interface FactionWeakness {
  name: string
  description: string        // Narrative explanation
  mechanical: string         // Exact rule text
}

export interface FactionTrait {
  type: 'attribute' | 'ability' | 'background' | 'power' | 'resource'
  name: string
  notes?: string             // e.g. "empieza con 3 puntos"
}

export interface Faction {
  id: string                 // slug: "tremere", "contemplaestrellas", "akashic"
  name: string
  gameSystem: GameSystemId
  factionType: FactionType
  archetype: string          // One-word identity: "Hechiceros", "Guerreros", "Visionarios"
  lore: string               // 2–3 sentences of flavor text
  nativePowerIds: string[]   // IDs of PowerCategory (discipline/gift/sphere/art)
  nativePowerLabel: string   // "Disciplinas de clan", "Dones tribales", etc.
  startingTraits?: FactionTrait[]
  weakness: FactionWeakness
  notableMembers?: string[]  // Famous NPCs for context
  allies?: string[]          // Allied faction IDs
  enemies?: string[]         // Rival faction IDs
}

export type FactionsIndex = Record<GameSystemId, Faction[]>
