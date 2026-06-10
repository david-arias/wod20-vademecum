// ─────────────────────────────────────────────────────────────────────────────
// 🎨 UX/UI: Tabs 0px radius, pips cuadrados, badges técnicos JetBrains Mono
// 💻 Arch: Dos paneles — lista scrollable izquierda + card expandida derecha
// 🔀 MultiPath: Taumaturgia / Nigromancia muestran selector de senda
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react'
import type { GameSystemId } from '@/types/gameSystem'
import type {
  PowerCategory, PowerLevel, PowerPath,
  ActionType, W20GiftAxis, MultiPathDiscipline,
} from '@/types/powers'
import { W20_AXIS_LABELS, getW20Axis } from '@/types/powers'
import { ALL_POWERS } from '@/data/powers'

// ─── Type guard ───────────────────────────────────────────────────────────────
function isMultiPath(c: PowerCategory | MultiPathDiscipline): c is MultiPathDiscipline {
  return 'isMultiPath' in c && (c as MultiPathDiscipline).isMultiPath === true
}

// ─── Action type labels ──────────────────────────────────────────────────────
const ACTION_LABELS: Record<ActionType, string> = {
  instant:    'INSTANTÁNEA',
  extended:   'PROLONGADA',
  contested:  'ENFRENTADA',
  reflexive:  'REFLEXIVA',
  special:    'ESPECIAL',
}

// ─── Resource color map ──────────────────────────────────────────────────────
const resourceColor: Record<string, string> = {
  'Sangre':         '#FF3333',
  'Gnosis':         '#C07800',
  'Quintaesencia':  '#8A2BE2',
  'Glamour':        '#00FF7F',
  'Pathos':         '#708090',
  'Voluntad':       '#E5E2E1',
  'Rabia':          '#C07800',
  'Gratis':         '#6B7280',
}

// ─── Effect type badge (M20) ─────────────────────────────────────────────────
const EFFECT_TYPE_LABELS = {
  coincidental: { label: 'COINCIDENTAL', bg: '#1a2a1a', border: '#2a5a2a', text: '#4ade80' },
  vulgar:       { label: 'VULGAR',        bg: '#2a1a1a', border: '#5a2a2a', text: '#f87171' },
  instrumental: { label: 'INSTRUMENTAL',  bg: '#1a1a2a', border: '#2a2a5a', text: '#60a5fa' },
}

// ─── Square Pip ──────────────────────────────────────────────────────────────
const LevelPips = ({ level, max = 5 }: { level: number; max?: number }) => (
  <div className="flex gap-[3px]">
    {Array.from({ length: max }, (_, i) => (
      <span
        key={i}
        className="inline-block"
        style={{
          width: 10, height: 10, flexShrink: 0,
          backgroundColor: i < level ? 'var(--accent)' : 'transparent',
          border: i < level ? 'none' : '1px solid #333',
        }}
      />
    ))}
  </div>
)

// ─── Metadata Badge ──────────────────────────────────────────────────────────
const Badge = ({ label, value, color }: { label: string; value: string; color?: string }) => (
  <div className="flex flex-col border border-[#1E1E1E] px-3 py-2 bg-[#131313]">
    <span className="font-mono text-[9px] tracking-[0.15em] text-[#6B7280] uppercase">{label}</span>
    <span className="font-mono text-[11px] font-bold mt-0.5 uppercase" style={{ color: color ?? 'var(--accent)' }}>
      {value}
    </span>
  </div>
)

// ─── Expanded Power Card ─────────────────────────────────────────────────────
const PowerCard = ({ power }: { power: PowerLevel }) => {
  const effectStyle = power.effectType ? EFFECT_TYPE_LABELS[power.effectType] : null

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-[#1E1E1E] flex-shrink-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LevelPips level={power.level} />
              <span className="font-mono text-[10px] tracking-widest text-[#6B7280] uppercase">
                NIVEL {power.level}
              </span>
            </div>
            <h2 className="font-garamond text-2xl font-semibold text-[#F5F5F0] leading-tight">
              {power.name}
            </h2>
          </div>
          {/* Effect type badge (M20) */}
          {effectStyle && (
            <div
              className="px-2 py-1 border text-[9px] font-mono tracking-widest uppercase flex-shrink-0"
              style={{ backgroundColor: effectStyle.bg, borderColor: effectStyle.border, color: effectStyle.text }}
            >
              {effectStyle.label}
            </div>
          )}
        </div>
        <p className="font-inter text-[13px] text-[#A09E9D] leading-relaxed italic">
          {power.summary}
        </p>
      </div>

      {/* Metadata badges */}
      <div className="p-6 border-b border-[#1E1E1E] flex-shrink-0">
        <div className="flex flex-wrap gap-2">
          {power.dicePool && (
            <Badge label="RESERVA DE DADOS" value={power.dicePool.formula} color="#E5E2E1" />
          )}
          {power.dicePool?.difficulty && (
            <Badge label="DIFICULTAD" value={String(power.dicePool.difficulty)} />
          )}
          {power.cost && (
            <Badge
              label="COSTE"
              value={power.cost.resource === 'Gratis' ? 'GRATUITO' : `${power.cost.amount === 'variable' ? 'VAR.' : power.cost.amount} ${power.cost.resource.toUpperCase()}`}
              color={resourceColor[power.cost.resource] ?? 'var(--accent)'}
            />
          )}
          {power.actionType && (
            <Badge label="ACCIÓN" value={ACTION_LABELS[power.actionType]} />
          )}
          {power.duration && (
            <Badge label="DURACIÓN" value={power.duration.toUpperCase()} color="#E5E2E1" />
          )}
          {/* C20 Realms */}
          {power.realmRequired && power.realmRequired.length > 0 && (
            <Badge label="REINOS" value={power.realmRequired.join(' / ')} color="#00FF7F" />
          )}
        </div>
        {power.dicePool?.notes && (
          <p className="font-mono text-[10px] text-[#6B7280] mt-2 tracking-wide">
            ⚠ {power.dicePool.notes}
          </p>
        )}
      </div>

      {/* System text */}
      <div className="p-6 flex-1">
        <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">
          TEXTO DE SISTEMA
        </p>
        <p className="font-inter text-[14px] text-[#E5E2E1] leading-[1.7]">
          {power.systemText}
        </p>

        {/* Tags */}
        {power.tags && power.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {power.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 border border-[#333]"
                style={{ color: '#6B7280' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Power List Item ──────────────────────────────────────────────────────────
const PowerListItem = ({
  power, isSelected, onClick,
}: { power: PowerLevel; isSelected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 px-5 py-3 border-b border-[#1E1E1E] text-left"
    style={{
      backgroundColor: isSelected ? '#131313' : 'transparent',
      borderLeft: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
    }}
  >
    <LevelPips level={power.level} />
    <div className="flex flex-col min-w-0">
      <span className={`font-garamond text-[15px] font-medium truncate ${isSelected ? 'text-[#F5F5F0]' : 'text-[#A09E9D]'}`}>
        {power.name}
      </span>
      <span className="font-mono text-[10px] tracking-widest text-[#6B7280] uppercase truncate">
        Nivel {power.level}{power.cost && power.cost.resource !== 'Gratis' ? ` · ${power.cost.resource}` : ' · Gratuito'}
      </span>
    </div>
    {isSelected && (
      <svg className="ml-auto flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    )}
  </button>
)

// ─── Category Tabs ────────────────────────────────────────────────────────────
const CategoryTabs = ({
  categories, activeId, onSelect,
}: {
  categories: (PowerCategory | MultiPathDiscipline)[]
  activeId: string
  onSelect: (id: string) => void
}) => (
  <div className="flex overflow-x-auto border-b border-[#1E1E1E] flex-shrink-0 scrollbar-none">
    {categories.map(cat => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        className="flex-shrink-0 px-5 py-3 font-mono text-[10px] tracking-widest uppercase border-b-2 transition-none"
        style={{
          color: cat.id === activeId ? 'var(--accent)' : '#6B7280',
          borderColor: cat.id === activeId ? 'var(--accent)' : 'transparent',
          backgroundColor: cat.id === activeId ? '#0F0F0F' : 'transparent',
        }}
      >
        {/* Show multi-path indicator */}
        {isMultiPath(cat) ? `⊕ ${cat.name}` : cat.name}
      </button>
    ))}
  </div>
)

// ─── Path Selector (MultiPathDiscipline) ──────────────────────────────────────
const PathSelector = ({
  paths, activePathId, onSelect,
}: { paths: PowerPath[]; activePathId: string; onSelect: (id: string) => void }) => (
  <div className="flex border-b border-[#1E1E1E] flex-shrink-0 bg-[#0A0A0A] overflow-x-auto scrollbar-none">
    <div
      className="flex-shrink-0 flex items-center px-4 font-mono text-[9px] tracking-widest uppercase"
      style={{ color: '#444', borderRight: '1px solid #1E1E1E' }}
    >
      SENDA
    </div>
    {paths.map(path => (
      <button
        key={path.id}
        onClick={() => onSelect(path.id)}
        className="flex-shrink-0 flex items-center gap-2 px-5 py-2 font-mono text-[10px] tracking-widest uppercase border-b-2 -mb-[1px] transition-none"
        style={{
          color: path.id === activePathId ? 'var(--accent)' : '#6B7280',
          borderColor: path.id === activePathId ? 'var(--accent)' : 'transparent',
          backgroundColor: path.id === activePathId ? '#131313' : 'transparent',
        }}
      >
        {path.isPrimary && (
          <span style={{ color: 'var(--accent)', fontSize: 9 }}>★</span>
        )}
        {path.name}
      </button>
    ))}
  </div>
)

// ─── W20 Axis Selector ────────────────────────────────────────────────────────
const W20_AXES: W20GiftAxis[] = ['raza', 'auspicio', 'tribu']

const W20AxisSelector = ({
  activeAxis, onSelect,
}: { activeAxis: W20GiftAxis; onSelect: (a: W20GiftAxis) => void }) => (
  <div className="flex border-b-2 border-[#1E1E1E] flex-shrink-0 bg-[#0A0A0A]">
    {W20_AXES.map(axis => (
      <button
        key={axis}
        onClick={() => onSelect(axis)}
        className="flex-1 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-none border-b-2 -mb-[2px]"
        style={{
          color: axis === activeAxis ? 'var(--accent)' : '#6B7280',
          borderColor: axis === activeAxis ? 'var(--accent)' : 'transparent',
          backgroundColor: axis === activeAxis ? '#131313' : 'transparent',
        }}
      >
        {W20_AXIS_LABELS[axis]}
      </button>
    ))}
  </div>
)

// ─── MAIN POWERS VIEW ─────────────────────────────────────────────────────────
interface PowersViewProps {
  gameSystem: GameSystemId
}

export default function PowersView({ gameSystem }: PowersViewProps) {
  const allCategories = ALL_POWERS[gameSystem] ?? []

  // W20 triple-axis state
  const [w20Axis, setW20Axis] = useState<W20GiftAxis>('raza')

  // Derive visible categories — W20 filters by axis, others show all
  const categories = useMemo(() => {
    if (gameSystem !== 'W20') return allCategories
    return allCategories.filter(c => {
      const axis = getW20Axis(c.associatedWith?.type ?? '')
      return axis === w20Axis
    })
  }, [allCategories, gameSystem, w20Axis])

  const [activeCatId, setActiveCatId] = useState(allCategories[0]?.id ?? '')
  const [selectedPowerLevel, setSelectedPowerLevel] = useState<number | null>(null)
  // Active path ID for MultiPathDiscipline (null = use primary path)
  const [activePathId, setActivePathId] = useState<string | null>(null)

  // ── Resolve active category ──────────────────────────────────────────────
  const activeCategory = categories.find(c => c.id === activeCatId) ?? categories[0]

  // ── For MultiPath: resolve which path is currently shown ─────────────────
  const effectivePathId = useMemo(() => {
    if (!activeCategory || !isMultiPath(activeCategory)) return null
    // Use explicit selection if valid, else fall back to primary path
    if (activePathId) {
      const exists = activeCategory.paths.find(p => p.id === activePathId)
      if (exists) return activePathId
    }
    return activeCategory.paths.find(p => p.isPrimary)?.id
      ?? activeCategory.paths[0]?.id
      ?? null
  }, [activeCategory, activePathId])

  const activePath = useMemo(() => {
    if (!activeCategory || !isMultiPath(activeCategory) || !effectivePathId) return null
    return activeCategory.paths.find(p => p.id === effectivePathId) ?? null
  }, [activeCategory, effectivePathId])

  // ── Levels to render — MultiPath uses selected path's levels ─────────────
  const levelsToShow = useMemo(() => {
    if (!activeCategory) return []
    if (isMultiPath(activeCategory)) {
      return activePath?.levels ?? []
    }
    return activeCategory.levels
  }, [activeCategory, activePath])

  const selectedPower = levelsToShow.find(l => l.level === selectedPowerLevel)
    ?? levelsToShow[0]

  // ── When axis changes, reset to first category of new axis ────────────────
  const handleAxisChange = (axis: W20GiftAxis) => {
    setW20Axis(axis)
    const first = allCategories.find(c => getW20Axis(c.associatedWith?.type ?? '') === axis)
    if (first) {
      setActiveCatId(first.id)
      setSelectedPowerLevel(null)
      setActivePathId(null)
    }
  }

  // ── When category changes, reset selection & path ─────────────────────────
  const handleCatChange = (id: string) => {
    setActiveCatId(id)
    setSelectedPowerLevel(null)
    // Auto-select primary path if new category is MultiPath
    const cat = allCategories.find(c => c.id === id)
    if (cat && isMultiPath(cat)) {
      setActivePathId(cat.paths.find(p => p.isPrimary)?.id ?? cat.paths[0]?.id ?? null)
    } else {
      setActivePathId(null)
    }
  }

  // ── When path changes, reset power selection ──────────────────────────────
  const handlePathChange = (pathId: string) => {
    setActivePathId(pathId)
    setSelectedPowerLevel(null)
  }

  if (!allCategories.length) {
    return (
      <div className="flex items-center justify-center h-64 text-[#6B7280] font-mono text-sm tracking-widest uppercase">
        Sin datos para este sistema de juego.
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Page header */}
      <div className="px-8 pt-8 pb-4 border-b border-[#1E1E1E] flex-shrink-0">
        <p className="font-mono text-[10px] tracking-[0.2em] mb-1 uppercase" style={{ color: 'var(--accent)' }}>
          {gameSystem} — PODERES SOBRENATURALES
        </p>
        <h1 className="font-garamond text-3xl font-semibold text-[#F5F5F0]">
          {activeCategory ? activeCategory.name : 'Poderes'}
        </h1>

        {/* MultiPath: show current path info */}
        {activeCategory && isMultiPath(activeCategory) && activePath && (
          <>
            <p className="font-mono text-[10px] tracking-widest mt-1 uppercase" style={{ color: 'var(--accent)' }}>
              {activePath.isPrimary ? '★ SENDA PRIMARIA' : 'SENDA ALTERNATIVA'} — {activePath.name}
            </p>
            <p className="font-inter text-[13px] text-[#6B7280] mt-2 max-w-2xl leading-relaxed">
              {activePath.description}
            </p>
          </>
        )}

        {/* Regular description (non-MultiPath) */}
        {activeCategory && !isMultiPath(activeCategory) && activeCategory.description && (
          <p className="font-inter text-[13px] text-[#6B7280] mt-2 max-w-2xl leading-relaxed">
            {activeCategory.description}
          </p>
        )}

        {/* M20 ruling concept */}
        {activeCategory && !isMultiPath(activeCategory) && activeCategory.rulingConcept && (
          <p className="font-mono text-[10px] tracking-widest mt-2 uppercase" style={{ color: 'var(--accent)' }}>
            Concepto rector: {activeCategory.rulingConcept}
          </p>
        )}
        {/* W20 axis + category label */}
        {gameSystem === 'W20' && activeCategory?.associatedWith && (
          <p className="font-mono text-[10px] tracking-widest mt-1 uppercase" style={{ color: '#6B7280' }}>
            {W20_AXIS_LABELS[w20Axis]} › {activeCategory.associatedWith.name}
          </p>
        )}
      </div>

      {/* W20: triple-axis selector */}
      {gameSystem === 'W20' && (
        <W20AxisSelector activeAxis={w20Axis} onSelect={handleAxisChange} />
      )}

      {/* Category tabs */}
      <CategoryTabs
        categories={categories}
        activeId={activeCategory?.id ?? ''}
        onSelect={handleCatChange}
      />

      {/* MultiPath: path selector — shown when active category has multiple paths */}
      {activeCategory && isMultiPath(activeCategory) && effectivePathId && (
        <PathSelector
          paths={activeCategory.paths}
          activePathId={effectivePathId}
          onSelect={handlePathChange}
        />
      )}

      {/* Two-pane layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: Power list */}
        <div className="w-72 flex-shrink-0 border-r border-[#1E1E1E] overflow-y-auto bg-[#0A0A0A]">
          {levelsToShow.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="font-mono text-[10px] tracking-widest text-[#333] uppercase">
                Selecciona una senda
              </p>
            </div>
          ) : (
            levelsToShow.map(power => (
              <PowerListItem
                key={`${power.level}-${power.name}`}
                power={power}
                isSelected={selectedPower?.name === power.name}
                onClick={() => setSelectedPowerLevel(power.level)}
              />
            ))
          )}
        </div>

        {/* Right: Expanded card */}
        <div className="flex-1 overflow-hidden bg-[#0D0D0D]">
          {selectedPower ? (
            <PowerCard power={selectedPower} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="font-mono text-[11px] tracking-widest text-[#333] uppercase">
                Selecciona un poder
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
