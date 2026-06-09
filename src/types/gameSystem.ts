// ─────────────────────────────────────────────────────────────────────────────
// TYPES: World of Darkness 20th Anniversary — Agnostic Rules Engine
// ─────────────────────────────────────────────────────────────────────────────

/** Identifiers for each supported game line */
export type GameSystemId = 'V20' | 'W20' | 'M20' | 'C20' | 'Wr20'

/** Navigation sections — labels adapt per game system */
export interface NavSection {
  id: string
  label: string          // Display label (ALL-CAPS in UI via CSS)
  icon: string           // Lucide-compatible icon name or SVG path key
  href: string
}

/** Accent color palette for a game system */
export interface GameAccent {
  primary: string        // Main accent hex
  dim: string            // Low-opacity variant for backgrounds
  border: string         // Semi-transparent for keylines
}

/** Discipline / Power entry for the quick-access card */
export interface PowerEntry {
  name: string
  level?: number         // 1–5, optional
}

/** Attribute group listing */
export interface AttributeGroup {
  label: string          // e.g. "FÍSICOS"
  color: string          // Tailwind text color class or hex
  members: string[]
}

/** Virtue / Moral stat for progress-bar display */
export interface VirtueStat {
  name: string
  current: number        // 0–10
  max: number            // Always 10
}

/** Session status shown in sidebar footer */
export interface SessionStatus {
  groupName: string      // e.g. "Coterie Crest"
  label: string          // e.g. "Session Active"
  isActive: boolean
}

/** Hero section content */
export interface HeroContent {
  eyebrow: string        // e.g. "BIENVENIDO AL ABISMO"
  title: string          // e.g. "Vademécum: La Mascarada"
  description: string
  ctaPrimary: string
  ctaSecondary: string
}

/** Full game system configuration — the core data unit */
export interface GameSystemConfig {
  id: GameSystemId
  fullName: string       // e.g. "Vampiro: La Mascarada 20º Aniversario"
  shortName: string      // e.g. "V20"
  accent: GameAccent
  nav: NavSection[]
  hero: HeroContent
  attributeGroups: AttributeGroup[]
  powers: PowerEntry[]
  powersLabel: string    // "DISCIPLINAS" | "DONES" | "ESFERAS" etc.
  virtues: VirtueStat[]
  virtuesLabel: string   // "VIRTUDES" | "RENOMBRES" | "ESENCIAS" etc.
  systemSummary: string  // Short text for the Sistema Básico card
  healthPips: number     // Max health levels (7 for V20)
  currentHealth: number
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD STATE
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardState {
  activeGame: GameSystemId
  session: SessionStatus
  sidebarCollapsed: boolean
}
