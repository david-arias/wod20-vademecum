// ─────────────────────────────────────────────────────────────────────────────
// TYPES: Core System Rules — The Agnostic Dice Engine
// ─────────────────────────────────────────────────────────────────────────────

import type { GameSystemId } from './gameSystem'

export type CoreModuleId =
  | 'dice-basics'
  | 'multiple-actions'
  | 'energy-resources'
  | 'wound-levels'
  | 'extended-actions'
  | 'social-actions'
  | 'resistance'
  | 'combat-initiative'
  | 'combat-basics'
  | 'virtues-morality'
  | 'experience-advancement'
  | 'backgrounds'

// ─── Energy Resource Comparison Row ──────────────────────────────────────────

export interface EnergyResourceRow {
  action: string              // e.g. "Curar 1 nivel de daño contuso"
  v20?: string                // e.g. "1 Sangre"
  w20?: string                // e.g. "1 Gnosis"
  m20?: string                // e.g. "1 Quintaesencia"
  c20?: string                // e.g. "1 Glamour"
  wr20?: string               // e.g. "1 Pathos"
}

// ─── Core Rule Module ─────────────────────────────────────────────────────────

export interface CoreRule {
  id: string
  module: CoreModuleId
  title: string
  eyebrow: string             // "DADOS & ÉXITOS", "ACCIONES MÚLTIPLES", etc.
  summary: string             // 1-sentence quick summary
  content: CoreRuleBlock[]
  applicableTo: GameSystemId[] | 'all'
}

export type CoreRuleBlock =
  | CoreTextBlock
  | CoreTableBlock
  | CoreListBlock
  | CoreComparisonBlock

interface CoreTextBlock {
  type: 'text'
  content: string
}

interface CoreTableBlock {
  type: 'table'
  caption?: string
  headers: string[]
  rows: string[][]
}

interface CoreListBlock {
  type: 'list'
  title?: string
  items: string[]
}

interface CoreComparisonBlock {
  type: 'comparison'
  caption?: string
  rows: EnergyResourceRow[]
}
