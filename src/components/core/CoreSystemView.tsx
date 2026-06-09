// ─────────────────────────────────────────────────────────────────────────────
// 🎨 UX/UI: Grid de tarjetas oscuras, tabla comparativa multi-game con accent
// 💻 Arch: CoreRuleBlock union rendering — text / table / list / comparison
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import type { GameSystemId } from '@/types/gameSystem'
import type { CoreRule, CoreRuleBlock } from '@/types/coreSystem'
import { CORE_RULES } from '@/data/coreSystem'

// ─── Game system accent colors (for comparison table) ────────────────────────
const GAME_ACCENT: Record<string, string> = {
  v20:  '#FF3333',
  w20:  '#D4AF37',
  m20:  '#8A2BE2',
  c20:  '#00FF7F',
  wr20: '#708090',
}

const GAME_LABELS: Record<string, string> = {
  v20:  'V20',
  w20:  'W20',
  m20:  'M20',
  c20:  'C20',
  wr20: 'Wr20',
}

// ─── Block renderers ──────────────────────────────────────────────────────────

const TextBlock = ({ content }: { content: string }) => (
  <p className="font-inter text-[13px] text-[#A09E9D] leading-[1.7]">{content}</p>
)

const TableBlock = ({ headers, rows, caption }: {
  headers: string[]
  rows: string[][]
  caption?: string
}) => (
  <div>
    {caption && (
      <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">{caption}</p>
    )}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-[#1E1E1E]">
            {headers.map(h => (
              <th
                key={h}
                className="text-left px-3 py-2 font-mono text-[9px] tracking-[0.15em] uppercase"
                style={{ color: 'var(--accent)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#131313]">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-3 py-2 font-inter text-[12px] ${ci === 0 ? 'text-[#E5E2E1] font-medium' : 'text-[#A09E9D]'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const ListBlock = ({ items, title }: { items: string[]; title?: string }) => (
  <div>
    {title && (
      <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">{title}</p>
    )}
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 mt-[5px]" style={{ width: 4, height: 4, backgroundColor: 'var(--accent)', display: 'inline-block' }} />
          <span className="font-inter text-[12px] text-[#A09E9D] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

type ComparisonRow = { action: string; v20?: string; w20?: string; m20?: string; c20?: string; wr20?: string }

const ComparisonBlock = ({ rows, caption }: { rows: ComparisonRow[]; caption?: string }) => {
  const games: Array<keyof ComparisonRow> = ['v20', 'w20', 'm20', 'c20', 'wr20']

  return (
    <div>
      {caption && (
        <p className="font-mono text-[9px] tracking-[0.2em] text-[#6B7280] mb-3 uppercase">{caption}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="border-b border-[#1E1E1E]">
              <th className="text-left px-3 py-2 font-mono text-[9px] tracking-[0.15em] text-[#6B7280] uppercase w-36">
                ACCIÓN
              </th>
              {games.map(game => (
                <th
                  key={game}
                  className="text-left px-3 py-2 font-mono text-[9px] tracking-[0.15em] uppercase"
                  style={{ color: GAME_ACCENT[game] }}
                >
                  {GAME_LABELS[game]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={`border-b ${ri === 0 ? 'border-[#2a2a2a]' : 'border-[#131313]'}`}>
                <td className="px-3 py-2.5 font-mono text-[10px] text-[#E5E2E1] tracking-wide">
                  {row.action}
                </td>
                {games.map(game => (
                  <td key={game} className="px-3 py-2.5 font-inter text-[11px] text-[#8a8880]">
                    {row[game] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Block dispatcher ─────────────────────────────────────────────────────────
const RenderBlock = ({ block }: { block: CoreRuleBlock }) => {
  switch (block.type) {
    case 'text':
      return <TextBlock content={block.content} />
    case 'table':
      return <TableBlock headers={block.headers} rows={block.rows} caption={block.caption} />
    case 'list':
      return <ListBlock items={block.items} title={block.title} />
    case 'comparison':
      return <ComparisonBlock rows={block.rows as ComparisonRow[]} caption={block.caption} />
    default:
      return null
  }
}

// ─── Rule Card ────────────────────────────────────────────────────────────────
interface RuleCardProps {
  rule: CoreRule
  isExpanded: boolean
  onToggle: () => void
}

const RuleCard = ({ rule, isExpanded, onToggle }: RuleCardProps) => (
  <div
    className="flex flex-col border"
    style={{
      borderColor: isExpanded ? 'var(--accent)' : '#1E1E1E',
      backgroundColor: '#0A0A0A',
    }}
  >
    {/* Card header — always visible */}
    <button
      onClick={onToggle}
      className="w-full flex items-start gap-4 p-5 text-left"
    >
      <div className="flex flex-col flex-1 min-w-0">
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2"
          style={{ color: 'var(--accent)' }}
        >
          {rule.eyebrow}
        </span>
        <h3 className="font-garamond text-xl font-semibold text-[#F5F5F0] leading-snug mb-2">
          {rule.title}
        </h3>
        <p className="font-inter text-[12px] text-[#6B7280] leading-relaxed">
          {rule.summary}
        </p>
      </div>
      <div
        className="flex-shrink-0 flex items-center justify-center mt-1"
        style={{
          width: 24, height: 24,
          border: '1px solid',
          borderColor: isExpanded ? 'var(--accent)' : '#333',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isExpanded ? 'var(--accent)' : '#6B7280'} strokeWidth="2">
          {isExpanded
            ? <path d="M18 15l-6-6-6 6"/>
            : <path d="M6 9l6 6 6-6"/>
          }
        </svg>
      </div>
    </button>

    {/* Expanded content */}
    {isExpanded && (
      <div className="border-t border-[#1E1E1E] p-5 flex flex-col gap-5">
        {rule.content.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </div>
    )}
  </div>
)

// ─── MAIN CORE SYSTEM VIEW ────────────────────────────────────────────────────
interface CoreSystemViewProps {
  gameSystem: GameSystemId
}

export default function CoreSystemView({ gameSystem }: CoreSystemViewProps) {
  // Filter rules applicable to this game (or 'all')
  const rules = CORE_RULES.filter(
    r => r.applicableTo === 'all' || (Array.isArray(r.applicableTo) && r.applicableTo.includes(gameSystem))
  )

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['dice-basics']))

  const toggle = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const expandAll = () => setExpandedIds(new Set(rules.map(r => r.id)))
  const collapseAll = () => setExpandedIds(new Set())

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Page header */}
      <div className="px-8 pt-8 pb-4 border-b border-[#1E1E1E] flex-shrink-0">
        <p className="font-mono text-[10px] tracking-[0.2em] mb-1 uppercase" style={{ color: 'var(--accent)' }}>
          SISTEMA CENTRAL
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-garamond text-3xl font-semibold text-[#F5F5F0]">
            The Core Engine
          </h1>
          <div className="flex gap-2 pb-0.5">
            <button
              onClick={expandAll}
              className="font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 border border-[#333] text-[#6B7280]"
            >
              EXPANDIR TODO
            </button>
            <button
              onClick={collapseAll}
              className="font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 border border-[#333] text-[#6B7280]"
            >
              COLAPSAR TODO
            </button>
          </div>
        </div>
        <p className="font-inter text-[13px] text-[#6B7280] mt-2">
          Reglas fundamentales del sistema d10 — aplican a todas las líneas del ecosistema 20 Aniversario
        </p>
      </div>

      {/* Rules grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 max-w-4xl">
          {rules.map(rule => (
            <RuleCard
              key={rule.id}
              rule={rule}
              isExpanded={expandedIds.has(rule.id)}
              onToggle={() => toggle(rule.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
