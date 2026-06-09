// ─────────────────────────────────────────────────────────────────────────────
// 🎨 UX/UI Dark-Mode Expert: Abyssal Gothic system — strict 0px radius,
//    #0A0A0A void base, cream text, CSS-var accent theming.
// 💻 Frontend Architect: React 18 + TypeScript + Tailwind CSS.
//    No external icon library — inline SVG to keep bundle zero-dep.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import type { GameSystemId, GameSystemConfig, VirtueStat } from '@/types/gameSystem'
import { GAME_SYSTEMS, GAME_SYSTEM_ORDER } from '@/data/gameSystems'

// ─── Inline SVG Icons (zero-dependency, matches design system weight) ────────
const Icons = {
  home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9.5L12 3l9 6.5V21H15v-5h-6v5H3V9.5z"/>
    </svg>
  ),
  book: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 7H20v14H6.5A2.5 2.5 0 014 18.5v-14z"/>
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  sparkles: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L4 6v6c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V6z"/>
    </svg>
  ),
  heart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 000-7.8z"/>
    </svg>
  ),
  zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  award: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="6"/><path d="M8.2 13.5L7 22l5-3 5 3-1.2-8.5"/>
    </svg>
  ),
  layers: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  chevronRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
  chevronDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  user2: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>
  ),
  menu: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12h18M3 6h18M3 18h18"/>
    </svg>
  ),
  skull: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C7 2 3 6 3 11c0 2.6 1 4.9 2.7 6.6V20h12.6v-2.4C20 16 21 13.6 21 11c0-5-4-9-9-9z"/>
      <path d="M9 18v2M15 18v2M9 14a1 1 0 100-2 1 1 0 000 2zM15 14a1 1 0 100-2 1 1 0 000 2z"/>
    </svg>
  ),
}

// ─── Square Pip Component ─────────────────────────────────────────────────────
interface PipRowProps {
  total: number
  filled: number
  size?: number
}
const PipRow = ({ total, filled, size = 12 }: PipRowProps) => (
  <div className="flex gap-[3px] items-center">
    {Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className="inline-block flex-shrink-0"
        style={{
          width:  size,
          height: size,
          backgroundColor: i < filled ? 'var(--accent)' : 'transparent',
          border: i < filled ? 'none' : '1px solid #333333',
          display: 'block',
        }}
      />
    ))}
  </div>
)

// ─── Flat Progress Bar ────────────────────────────────────────────────────────
const ProgressBar = ({ value, max, label }: { value: number; max: number; label: string }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center">
      <span className="font-mono text-[11px] tracking-widest text-[#E5E2E1] uppercase">{label}</span>
      <span className="font-mono text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
        {value}/{max}
      </span>
    </div>
    <div className="h-[3px] bg-[#1E1E1E] w-full">
      <div
        className="h-[3px] transition-all duration-300"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: 'var(--accent)' }}
      />
    </div>
  </div>
)

// ─── Game System Selector ─────────────────────────────────────────────────────
interface GameSelectorProps {
  activeGame: GameSystemId
  onChange: (id: GameSystemId) => void
}
const GameSelector = ({ activeGame, onChange }: GameSelectorProps) => {
  const [open, setOpen] = useState(false)
  const active = GAME_SYSTEMS[activeGame]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 border border-[#333333] hover:border-[color:var(--accent)] transition-colors duration-0 font-mono text-[11px] tracking-widest text-[#E5E2E1] uppercase"
        style={{ borderColor: open ? 'var(--accent)' : undefined }}
      >
        <span
          className="inline-block w-2 h-2 flex-shrink-0"
          style={{ backgroundColor: active.accent.primary }}
        />
        <span>{active.shortName}</span>
        <span className="text-[#6B7280]">{open ? Icons.chevronDown : Icons.chevronRight}</span>
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-px border border-[#333333] bg-[#131313] z-50 w-56"
          style={{ borderTop: '1px solid var(--accent)' }}
        >
          {GAME_SYSTEM_ORDER.map(id => {
            const sys = GAME_SYSTEMS[id]
            return (
              <button
                key={id}
                onClick={() => { onChange(id); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1E1E1E] text-left"
              >
                <span
                  className="inline-block w-2 h-2 flex-shrink-0"
                  style={{ backgroundColor: sys.accent.primary }}
                />
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] tracking-widest text-[#E5E2E1] uppercase">
                    {sys.shortName}
                  </span>
                  <span className="font-inter text-[11px] text-[#6B7280]">
                    {sys.fullName.split(' — ')[0]}
                  </span>
                </div>
                {id === activeGame && (
                  <span
                    className="ml-auto inline-block w-1.5 h-1.5"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Top Navigation Bar ───────────────────────────────────────────────────────
interface TopBarProps {
  game: GameSystemConfig
  activeGame: GameSystemId
  onGameChange: (id: GameSystemId) => void
  onMenuToggle: () => void
}
const TopBar = ({ game, activeGame, onGameChange, onMenuToggle }: TopBarProps) => (
  <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-[#0A0A0A] border-b border-[#1E1E1E] flex items-center px-6 gap-6">
    {/* Hamburger — mobile */}
    <button
      onClick={onMenuToggle}
      className="lg:hidden text-[#6B7280] hover:text-[#E5E2E1] p-1"
    >
      {Icons.menu}
    </button>

    {/* Logo */}
    <div className="flex flex-col leading-none">
      <span
        className="font-garamond font-semibold text-lg tracking-tight"
        style={{ color: 'var(--accent)' }}
      >
        {game.shortName} Vademécum
      </span>
      <span className="font-mono text-[9px] tracking-widest text-[#4B4B4A] uppercase">
        Abyssal Gothic
      </span>
    </div>

    {/* Top nav links */}
    <nav className="hidden lg:flex items-center gap-1 ml-2">
      {['Panel', 'Biblioteca', 'Personajes'].map(label => (
        <button
          key={label}
          className={`font-mono text-[11px] tracking-widest px-3 py-1 uppercase transition-colors duration-0 ${
            label === 'Panel'
              ? 'text-[#E5E2E1] border-b-2'
              : 'text-[#6B7280] hover:text-[#E5E2E1]'
          }`}
          style={label === 'Panel' ? { borderColor: 'var(--accent)' } : {}}
        >
          {label}
        </button>
      ))}
    </nav>

    {/* Spacer */}
    <div className="flex-1" />

    {/* Search */}
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#131313] border border-[#1E1E1E] focus-within:border-[color:var(--accent)] w-52">
      <span className="text-[#4B4B4A]">{Icons.search}</span>
      <input
        type="text"
        placeholder="BUSCAR EN EL GRIMORIO..."
        className="bg-transparent font-mono text-[11px] tracking-wider text-[#E5E2E1] placeholder-[#4B4B4A] outline-none w-full"
      />
    </div>

    {/* Actions */}
    <div className="flex items-center gap-2">
      <button className="p-2 text-[#6B7280] hover:text-[#E5E2E1]">{Icons.user2}</button>
      <button className="p-2 text-[#6B7280] hover:text-[#E5E2E1]">{Icons.settings}</button>
      <GameSelector activeGame={activeGame} onChange={onGameChange} />
    </div>
  </header>
)

// ─── Sidebar ──────────────────────────────────────────────────────────────────
interface SidebarProps {
  game: GameSystemConfig
  activeSection: string
  onSection: (id: string) => void
  isOpen: boolean
}
const Sidebar = ({ game, activeSection, onSection, isOpen }: SidebarProps) => {
  const iconMap: Record<string, JSX.Element> = {
    home: Icons.home, book: Icons.book, 'user-plus': Icons.user,
    sparkles: Icons.sparkles, shield: Icons.shield, heart: Icons.heart,
    zap: Icons.zap, award: Icons.award, layers: Icons.layers,
    star: Icons.sparkles, eye: Icons.sparkles, compass: Icons.settings,
    feather: Icons.heart, wind: Icons.zap,
  }

  return (
    <aside
      className={`
        fixed top-14 left-0 bottom-0 w-[228px] bg-[#0A0A0A] border-r border-[#1E1E1E]
        flex flex-col z-30 transition-transform duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {game.nav.map(item => {
          const isActive = item.id === activeSection
          return (
            <button
              key={item.id}
              onClick={() => onSection(item.id)}
              className={`
                nav-link w-full flex items-center gap-3 px-5 py-3
                font-mono text-[11px] tracking-widest uppercase text-left
                transition-none
                ${isActive
                  ? 'text-[#E5E2E1] bg-[#131313]'
                  : 'text-[#6B7280]'
                }
              `}
              style={isActive ? { borderLeft: '2px solid var(--accent)', paddingLeft: '18px' } : { borderLeft: '2px solid transparent' }}
            >
              <span style={{ color: isActive ? 'var(--accent)' : undefined }}>
                {iconMap[item.icon] ?? Icons.book}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Sidebar footer — Session status */}
      <div className="border-t border-[#1E1E1E] p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center border flex-shrink-0"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            {Icons.shield}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[11px] tracking-wider text-[#E5E2E1] truncate uppercase">
              Coterie Crest
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="inline-block w-1.5 h-1.5 animate-accent-pulse"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <span className="font-mono text-[10px] tracking-widest text-[#6B7280] uppercase">
                Session Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
interface HeroProps {
  game: GameSystemConfig
}
const Hero = ({ game }: HeroProps) => (
  <section className="relative hero-bg border-b border-[#1E1E1E] overflow-hidden">
    {/* Accent keyline top */}
    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: 'var(--accent)' }} />

    {/* Accent vertical line — left decoration */}
    <div
      className="absolute left-0 top-0 bottom-0 w-[2px] opacity-20"
      style={{ backgroundColor: 'var(--accent)' }}
    />

    <div className="relative z-10 px-12 py-14 max-w-2xl">
      <p
        className="font-mono text-[10px] tracking-[0.2em] mb-4 uppercase"
        style={{ color: 'var(--accent)' }}
      >
        {game.hero.eyebrow}
      </p>
      <h1 className="font-garamond font-semibold text-hero text-[#F5F5F0] leading-[1.05] tracking-[-0.03em] mb-5">
        {game.hero.title}
      </h1>
      <p className="font-inter text-[15px] text-[#A09E9D] leading-relaxed mb-8 max-w-lg">
        {game.hero.description}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          className="px-6 py-3 font-mono text-[11px] tracking-[0.12em] uppercase font-bold text-[#0A0A0A] hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {game.hero.ctaPrimary}
        </button>
        <button className="px-6 py-3 font-mono text-[11px] tracking-[0.12em] uppercase text-[#F5F5F0] border border-[#F5F5F0] hover:bg-[#F5F5F0] hover:text-[#0A0A0A] transition-colors duration-0">
          {game.hero.ctaSecondary}
        </button>
      </div>
    </div>
  </section>
)

// ─── Module Card: Attributes ──────────────────────────────────────────────────
const AttributesCard = ({ game }: { game: GameSystemConfig }) => (
  <div className="bg-[#131313] border border-[#1E1E1E] p-6 flex flex-col gap-4 hover:border-[#2A2A2A] transition-colors duration-0">
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] uppercase">MÓDULO 02</span>
        <h2 className="font-garamond text-[22px] font-medium text-[#E5E2E1] leading-tight">
          Atributos y Habilidades
        </h2>
      </div>
      <span style={{ color: 'var(--accent)' }}>{Icons.user}</span>
    </div>

    <p className="font-inter text-[13px] text-[#6B7280] leading-relaxed">
      Define la esencia de tu vástago. Desde la fuerza bruta de un Brujah hasta la elegancia social de un Ventrue.
    </p>

    <div className="flex gap-3 mt-auto flex-wrap">
      {game.attributeGroups.map(group => (
        <div key={group.label} className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2" style={{ backgroundColor: group.color }} />
          <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: group.color }}>
            {group.label}
          </span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Module Card: Disciplines / Powers ───────────────────────────────────────
const PowersCard = ({ game }: { game: GameSystemConfig }) => (
  <div className="bg-[#131313] border border-[#1E1E1E] p-6 flex flex-col gap-3 hover:border-[#2A2A2A] transition-colors duration-0">
    <div className="flex items-start justify-between">
      <h2 className="font-garamond text-[22px] font-medium text-[#E5E2E1] leading-tight">
        {game.powersLabel.charAt(0) + game.powersLabel.slice(1).toLowerCase()}
      </h2>
      <span style={{ color: 'var(--accent)' }}>{Icons.sparkles}</span>
    </div>

    <div className="flex flex-col">
      {game.powers.map(power => (
        <div
          key={power.name}
          className="flex items-center justify-between py-2.5 border-b border-[#1E1E1E] last:border-0"
        >
          <span className="font-mono text-[11px] tracking-widest text-[#E5E2E1] uppercase">
            {power.name}
          </span>
          <div className="flex items-center gap-1">
            {Icons.chevronRight}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Module Card: Combat & Health ─────────────────────────────────────────────
const CombatCard = ({ game }: { game: GameSystemConfig }) => {
  const healthStates = ['SANO', 'CONTUSO', 'HERIDO', 'LESIONADO', 'HERIDO GRAVE', 'CRÍTICO', 'INCAPACITADO']
  const currentState = healthStates[Math.max(0, game.healthPips - game.currentHealth - 1)] ?? 'SANO'

  return (
    <div className="bg-[#131313] border border-[#1E1E1E] p-6 flex flex-col gap-4 hover:border-[#2A2A2A] transition-colors duration-0">
      <div className="flex items-start justify-between">
        <h2 className="font-garamond text-[22px] font-medium text-[#E5E2E1] leading-tight">
          Combate y Salud
        </h2>
        <span style={{ color: 'var(--accent)' }}>{Icons.shield}</span>
      </div>

      <PipRow total={game.healthPips} filled={game.currentHealth} size={14} />

      <div className="mt-auto flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5" style={{ backgroundColor: 'var(--accent)' }} />
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          ESTADO: {currentState}
        </span>
      </div>
    </div>
  )
}

// ─── Module Card: Virtues ─────────────────────────────────────────────────────
const VirtuesCard = ({ game }: { game: GameSystemConfig }) => (
  <div className="bg-[#131313] border border-[#1E1E1E] p-6 flex flex-col gap-3 hover:border-[#2A2A2A] transition-colors duration-0">
    <div className="flex items-start justify-between">
      <h2 className="font-garamond text-[22px] font-medium text-[#E5E2E1] leading-tight">
        {game.virtuesLabel.charAt(0) + game.virtuesLabel.slice(1).toLowerCase()}
      </h2>
      <span style={{ color: 'var(--accent)' }}>{Icons.heart}</span>
    </div>

    <div className="flex flex-col gap-3 mt-1">
      {game.virtues.map((virtue: VirtueStat) => (
        <ProgressBar
          key={virtue.name}
          label={virtue.name}
          value={virtue.current}
          max={virtue.max}
        />
      ))}
    </div>
  </div>
)

// ─── Module Card: Sistema Básico ──────────────────────────────────────────────
const SystemCard = ({ game }: { game: GameSystemConfig }) => (
  <div className="bg-[#131313] border border-[#1E1E1E] p-6 flex flex-col gap-3 hover:border-[#2A2A2A] transition-colors duration-0">
    <div className="flex items-start justify-between">
      <h2 className="font-garamond text-[22px] font-medium text-[#E5E2E1] leading-tight">
        Sistema Básico
      </h2>
      <span style={{ color: 'var(--accent)' }}>{Icons.book}</span>
    </div>

    <p className="font-inter text-[13px] text-[#6B7280] leading-relaxed flex-1">
      {game.systemSummary}
    </p>

    <button
      className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase mt-2"
      style={{ color: 'var(--accent)' }}
    >
      EXPLORAR REGLAS
      <span>{Icons.chevronRight}</span>
    </button>
  </div>
)

// ─── Module Grid ──────────────────────────────────────────────────────────────
const ModuleGrid = ({ game }: { game: GameSystemConfig }) => (
  <section className="px-8 py-8 flex flex-col gap-6">
    {/* Row 1 — 2 columns: Atributos (wider) + Disciplinas */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="md:col-span-3">
        <AttributesCard game={game} />
      </div>
      <div className="md:col-span-2">
        <PowersCard game={game} />
      </div>
    </div>

    {/* Row 2 — 3 equal columns */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CombatCard game={game} />
      <VirtuesCard game={game} />
      <SystemCard game={game} />
    </div>
  </section>
)

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ game }: { game: GameSystemConfig }) => (
  <footer className="border-t border-[#1E1E1E] px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="flex items-baseline gap-3">
      <span className="font-garamond font-bold text-lg" style={{ color: 'var(--accent)' }}>
        {game.shortName}
      </span>
      <span className="font-mono text-[10px] tracking-widest text-[#4B4B4A] uppercase">
        Sanguinis et Aeternum
      </span>
    </div>
    <nav className="flex flex-wrap gap-6">
      {['Créditos', 'Soporte', 'Privacidad'].map(label => (
        <button key={label} className="font-mono text-[10px] tracking-widest text-[#4B4B4A] hover:text-[#E5E2E1] uppercase">
          {label}
        </button>
      ))}
    </nav>
    <span className="font-mono text-[10px] tracking-widest text-[#333333] uppercase">
      © 1242 AD – MMXXXIV. White Wolf Publishing.
    </span>
  </footer>
)

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DASHBOARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeGame, setActiveGame] = useState<GameSystemId>('V20')
  const [activeSection, setActiveSection] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const game = GAME_SYSTEMS[activeGame]

  // Apply game accent to :root CSS variables via html[data-game]
  const handleGameChange = useCallback((id: GameSystemId) => {
    setActiveGame(id)
    document.documentElement.setAttribute('data-game', id)
  }, [])

  // Initialize on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-game', 'V20')
  }, [])

  // Close sidebar on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0]">
      {/* Top bar */}
      <TopBar
        game={game}
        activeGame={activeGame}
        onGameChange={handleGameChange}
        onMenuToggle={() => setSidebarOpen(o => !o)}
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        game={game}
        activeSection={activeSection}
        onSection={id => { setActiveSection(id); setSidebarOpen(false) }}
        isOpen={sidebarOpen}
      />

      {/* Main content — offset by sidebar width */}
      <main className="lg:ml-[228px] pt-14 min-h-screen flex flex-col">
        <Hero game={game} />
        <ModuleGrid game={game} />
        <div className="flex-1" />
        <Footer game={game} />
      </main>
    </div>
  )
}
