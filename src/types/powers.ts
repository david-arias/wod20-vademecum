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

export type PowersIndex = Record<GameSystemId, (PowerCategory | MultiPathDiscipline)[]>

// ─── C20: Realm (used in combination with Arts) ──────────────────────────────

export interface C20Realm {
  id: string
  name: string
  description: string
  levels: PowerLevel[]
}

// ─── W20: Triple Axis for Gift segmentation ───────────────────────────────────
// Maps associatedWith.type to display axis in PowersView

export type W20GiftAxis = 'raza' | 'auspicio' | 'tribu'

export const W20_AXIS_LABELS: Record<W20GiftAxis, string> = {
  raza:     'RAZA',
  auspicio: 'AUSPICIO',
  tribu:    'TRIBU',
}

// Maps associatedWith.type → axis
export function getW20Axis(type: string): W20GiftAxis | null {
  if (type === 'breed')   return 'raza'
  if (type === 'auspice') return 'auspicio'
  if (type === 'tribe')   return 'tribu'
  return null
}

// ─── W20: Formas Garou ────────────────────────────────────────────────────────

export interface GarouFormModifier {
  attribute: string          // e.g. 'Fuerza', 'Destreza'
  modifier?: number          // positive = bonus, negative = penalty. Omit when isSet:true
  isSet?: boolean            // true = set to fixed value, not add/subtract
  setValue?: number          // if isSet, the absolute value
  notes?: string             // e.g. "no puede aumentarse con Gnosis"
}

export interface GarouForm {
  id: 'homid' | 'glabro' | 'crinos' | 'hispo' | 'lupus'
  name: string               // canonical English name
  nameEs: string             // Spanish display name
  description: string
  attributeModifiers: GarouFormModifier[]
  naturalWeapons?: {
    claws?: string            // damage type description
    bite?: string             // damage type description
    notes?: string
  }
  delirium: boolean           // true = mortals must roll Delirium
  difficultyToShift?: number  // difficulty to enter this form voluntarily
  rageCostToShift?: number    // Rage points spent on shift
  movementNotes?: string
  socialRestrictions?: string
  specialRules?: string[]
}

// ─── V20: Multi-Path Disciplines (Taumaturgia, Nigromancia) ──────────────────

export interface PowerPath {
  id: string
  name: string
  isPrimary: boolean          // true = primary/default path
  description: string
  levels: PowerLevel[]
}

export interface MultiPathDiscipline extends Omit<PowerCategory, 'levels'> {
  isMultiPath: true
  paths: PowerPath[]
  levels: PowerLevel[]        // re-exported from primary path for type compatibility
}
