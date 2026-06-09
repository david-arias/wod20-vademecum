// ─────────────────────────────────────────────────────────────────────────────
// TYPES: Agnostic Powers Engine
// Handles: V20 Disciplines, W20 Gifts, M20 Spheres, C20 Arts+Realms, Wr20 Arcanos
// ─────────────────────────────────────────────────────────────────────────────

import type { GameSystemId } from './gameSystem'

// ─── Dice Pool / Cost ────────────────────────────────────────────────────────

export type ActionType = 'instant' | 'extended' | 'contested' | 'reflexive' | 'special'

export interface DicePool {
  formula: string          // e.g. "Carisma + Supervivencia", "Manipulación + Mando"
  difficulty?: number      // base difficulty (default 6 in WoD)
  notes?: string           // "dificultad variable", etc.
}

export interface PowerCost {
  resource: string         // "Sangre" | "Gnosis" | "Quintaesencia" | "Glamour" | "Pathos" | "Gratis"
  amount: number | 'variable' | 'free'
  notes?: string           // "por éxito adicional", etc.
}

// ─── Individual Power (a single level / rank entry) ──────────────────────────

export interface PowerLevel {
  level: number             // 1–5 (level in discipline, rank in gift, sphere dot, etc.)
  name: string              // "Atisbo de la Bestia", "Trueno de la Luna", etc.
  summary: string           // One-line summary for list view
  systemText: string        // Full mechanical description
  dicePool?: DicePool
  cost?: PowerCost
  actionType?: ActionType
  duration?: string         // "escena", "instantáneo", "permanente", etc.

  // M20-specific: type of magic effect
  effectType?: 'coincidental' | 'vulgar' | 'instrumental'

  // C20-specific: required realm to use this art
  realmRequired?: string[]

  // W20-specific: optional sub-type (auspice/tribe/breed gift)
  sourceType?: 'auspice' | 'tribe' | 'breed' | 'camp' | 'generic'

  tags?: string[]           // e.g. ["control-animal", "social", "combate"]
}

// ─── Power Category (Discipline / Gift List / Sphere / Art / Arcano) ─────────

export type PowerCategoryType =
  | 'discipline'   // V20
  | 'gift'         // W20
  | 'sphere'       // M20
  | 'art'          // C20
  | 'realm'        // C20
  | 'arcano'       // Wr20

export interface PowerCategory {
  id: string                    // slug: "animalismo", "celeridad", "correspondencia"
  name: string                  // Display name
  gameSystem: GameSystemId
  categoryType: PowerCategoryType
  description: string           // Short lore + mechanical intro

  // W20: gifts can be associated with auspice, tribe, or breed
  associatedWith?: {
    type: 'auspice' | 'tribe' | 'breed' | 'tradition' | 'convention' | 'kith' | 'guild' | 'generic'
    name: string
  }

  // M20: spheres have a ruling concept
  rulingConcept?: string        // "Distancia y Localización", "Caos y Orden", etc.

  icon?: string                 // Icon key for UI
  levels: PowerLevel[]          // Ordered by level ASC
}

// ─── Powers Index (all categories by game system) ────────────────────────────

export type PowersIndex = Record<GameSystemId, PowerCategory[]>

// ─── C20: Realm (used in combination with Arts) ──────────────────────────────

export interface C20Realm {
  id: string
  name: string
  description: string
  levels: PowerLevel[]
}
