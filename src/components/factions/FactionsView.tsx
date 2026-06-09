// ─────────────────────────────────────────────────────────────────────────────
// 🎨 UX/UI: Grid de tarjetas + Drawer derecho borde afilado, 0px radius
// 💻 Arch: Drawer como panel lateral (no modal), estado de selección en View
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import type { GameSystemId } from '@/types/gameSystem'
import type { Faction, FactionType } from '@/types/factions'
import { ALL_FACTIONS } from '@/data/factions'

// ─── Faction type → label ─────────────────────────────────────────────────────
const FACTION_TYPE_LABEL: Record<FactionType, string> = {
  clan:        'CLAN',
  tribe:       'TRIBU',
  tradition:   'TRADICIÓN',
  convention:  'CONVENCIÓN',
  craft:       'OFICIO',
  kith:        'PARENTELA',
  guild:       'GREMIO',
  legacy:      'LEGADO',
}

// ─── Faction card (grid item) ─────────────────────────────────────────────────
interface FactionCardProps {
  faction: Faction
  isSelected: boolean
  onSelect: () => void
}

const FactionCard = ({ faction, isSelected, onSelect }: FactionCardProps) => (
  <button
    onClick={onSelect}
    className="w-full text-left flex flex-col p-5 border transition-none"
    style={{
      borderColor: isSelected ? 'var(--accent)' : '#1E1E1E',
      backgroundColor: isSelected ? '#0F0F0F' : '#0A0A0A',
      borderLeft: isSelected ? '3px solid var(--accent)' : '1px solid #1E1E1E',
    }}
  >
    {/* Type badge */}
    <div className="flex items-center gap-2 mb-3">
      <span
        className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border"
        style={{
          color: isSelected ? 'var(--accent)' : '#6B7280',
          borderColor: isSelected ? 'var(--accent)' : '#333',
        }}
      >
        {FACTION_TYPE_LABEL[faction.factionType]}
      </span>
      {faction.nativePowerIds.length > 0 && (
        <span className="font-mono text-[9px] tracking-widest text-[#444] uppercase ml-auto">
          {faction.nativePowerIds.length} PODERES
        </span>
      )}
    </div>

    {/* Name */}
    <h3
      className="font-garamond text-xl font-semibold mb-1 leading-tight"
      style={{ color: isSelected ? '#F5F5F0' : '#D0CECD' }}
    >
      {faction.name}
    </h3>

    {/* Archetype */}
    <p className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
      {faction.archetype}
    </p>

    {/* Lore excerpt */}
    <p className="font-inter text-[12px] text-[#6B7280] leading-relaxed line-clamp-3">
      {faction.lore}
    </p>

    {/* Weakness name */}
    {faction.weakness && (
      <div className="mt-4 pt-3 border-t border-[#1E1E1E]">
        <span className="font-mono text-[9px] tracking-widest text-[#444] uppercase">
          Debilidad: {faction.weakness.name}
        </span>
      </div>
    )}
  </button>
)

// ─── Faction Drawer ───────────────────────────────────────────────────────────
interface FactionDrawerProps {
  faction: Faction | null
  onClose: () => void
}

const FactionDrawer = ({ faction, onClose }: FactionDrawerProps) => {
  if (!faction) return null

  return (
    <div
      className="flex flex-col h-full overflow-y-auto border-l"
      style={{ borderColor: 'var(--accent)', backgroundColor: '#080808' }}
    >
      {/* Drawer header */}
      <div className="flex items-start justify-between p-6 border-b border-[#1E1E1E] flex-shrink-0">
        <div className="flex-1 min-w-0 pr-4">
          <span
            className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border inline-block mb-3"
            style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
          >
            {FACTION_TYPE_LABEL[faction.factionType]}
          </span>
          <h2 className="font-garamond text-3xl font-semibold text-[#F5F5F0] leading-tight mb-1">
            {faction.name}
          </h2>
          <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            {faction.archetype}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-2 border border-[#333] text-[#6B7280] hover:text-[#F5F5F0] hover:border-[#666]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Lore */}
      <div className="p-6 border-b border-[#1E1E1E] flex-shrink-0">
        <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">Lore</p>
        <p className="font-inter text-[14px] text-[#C0BEBC] leading-[1.7] italic">
          {faction.lore}
        </p>
      </div>

      {/* Native powers */}
      {faction.nativePowerIds.length > 0 && (
        <div className="p-6 border-b border-[#1E1E1E] flex-shrink-0">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">
            {faction.nativePowerLabel ?? 'Poderes Nativos'}
          </p>
          <div className="flex flex-wrap gap-2">
            {faction.nativePowerIds.map(id => (
              <span
                key={id}
                className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border"
                style={{ color: 'var(--accent)', borderColor: '#1E1E1E', backgroundColor: '#0D0D0D' }}
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Weakness block */}
      {faction.weakness && (
        <div className="p-6 border-b border-[#1E1E1E] flex-shrink-0">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">
            Debilidad de {FACTION_TYPE_LABEL[faction.factionType]}
          </p>
          <div
            className="border p-4"
            style={{ borderColor: 'var(--accent)', borderLeft: '3px solid var(--accent)', backgroundColor: '#0D0D0D' }}
          >
            <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
              {faction.weakness.name}
            </p>
            <p className="font-inter text-[13px] text-[#A09E9D] leading-relaxed mb-3">
              {faction.weakness.description}
            </p>
            <div className="border-t border-[#1E1E1E] pt-3">
              <p className="font-mono text-[9px] tracking-widest text-[#6B7280] mb-1 uppercase">
                Mecánica
              </p>
              <p className="font-mono text-[11px] text-[#E5E2E1] leading-relaxed">
                {faction.weakness.mechanical}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notable members */}
      {faction.notableMembers && faction.notableMembers.length > 0 && (
        <div className="p-6 flex-shrink-0">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">
            Miembros Notables
          </p>
          <div className="flex flex-col gap-1">
            {faction.notableMembers.map(member => (
              <span key={member} className="font-inter text-[13px] text-[#A09E9D]">
                — {member}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN FACTIONS VIEW ───────────────────────────────────────────────────────
interface FactionsViewProps {
  gameSystem: GameSystemId
}

export default function FactionsView({ gameSystem }: FactionsViewProps) {
  const factions = ALL_FACTIONS[gameSystem] ?? []
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedFaction = factions.find(f => f.id === selectedId) ?? null
  const isDrawerOpen = selectedFaction !== null

  if (!factions.length) {
    return (
      <div className="flex items-center justify-center h-64 text-[#6B7280] font-mono text-sm tracking-widest uppercase">
        Sin datos para este sistema de juego.
      </div>
    )
  }

  const factionType = factions[0]?.factionType
  const typeLabel = factionType ? FACTION_TYPE_LABEL[factionType] : 'FACCIONES'

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Page header */}
      <div className="px-8 pt-8 pb-4 border-b border-[#1E1E1E] flex-shrink-0">
        <p className="font-mono text-[10px] tracking-[0.2em] mb-1 uppercase" style={{ color: 'var(--accent)' }}>
          {gameSystem} — FACCIONES & LINAJES
        </p>
        <h1 className="font-garamond text-3xl font-semibold text-[#F5F5F0]">
          {typeLabel}S
        </h1>
        <p className="font-inter text-[13px] text-[#6B7280] mt-1">
          {factions.length} {typeLabel.toLowerCase()}s disponibles — selecciona uno para ver su ficha completa
        </p>
      </div>

      {/* Body: grid + optional drawer */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Grid */}
        <div
          className="overflow-y-auto p-6"
          style={{ width: isDrawerOpen ? '55%' : '100%', transition: 'width 0.15s ease-out' }}
        >
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: isDrawerOpen
                ? 'repeat(auto-fill, minmax(220px, 1fr))'
                : 'repeat(auto-fill, minmax(260px, 1fr))',
            }}
          >
            {factions.map(faction => (
              <FactionCard
                key={faction.id}
                faction={faction}
                isSelected={faction.id === selectedId}
                onSelect={() => setSelectedId(faction.id === selectedId ? null : faction.id)}
              />
            ))}
          </div>
        </div>

        {/* Drawer */}
        {isDrawerOpen && (
          <div className="flex-1 min-w-0 overflow-hidden flex-shrink-0" style={{ width: '45%' }}>
            <FactionDrawer
              faction={selectedFaction}
              onClose={() => setSelectedId(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
