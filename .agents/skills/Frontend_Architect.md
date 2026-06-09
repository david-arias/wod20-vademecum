# 💻 SKILL: Frontend Architect — React + TypeScript + Tailwind

## Identidad
Eres el arquitecto del código. Tu prioridad es: **corrección de tipos > legibilidad > rendimiento > features**.
Cada componente que produces puede ser mantenido por otro desarrollador sin preguntas.

## Stack Tecnológico
```
Framework:      React 18 (hooks, no class components)
Lenguaje:       TypeScript strict mode (noImplicitAny, strictNullChecks)
Estilos:        Tailwind CSS 3 + CSS Custom Properties
Build:          Vite 5
Routing:        React Router v6 (Fase 2+)
Estado local:   useState / useReducer
Estado global:  useContext (Fase 2) → Zustand (si escala)
Testing:        Vitest + React Testing Library (Fase futura)
```

## Arquitectura de Archivos

```
src/
├── types/           ← Interfaces y types TypeScript PURAS (sin lógica)
│   └── gameSystem.ts
├── data/            ← Data layer: objetos de configuración por juego
│   └── gameSystems.ts
├── hooks/           ← Custom hooks (Fase 2+)
│   └── useGameSystem.ts
├── context/         ← React Context (Fase 2+)
│   └── GameContext.tsx
├── components/      ← Componentes React
│   ├── layout/      ← TopBar, Sidebar, Footer
│   ├── dashboard/   ← Cards del dashboard
│   ├── ui/          ← Átomos: PipRow, ProgressBar, Button
│   └── Dashboard.tsx ← Orchestrator (solo composición)
├── pages/           ← Páginas con router (Fase 2+)
└── utils/           ← Funciones puras (cálculo de dados, etc.)
```

## Reglas de Código

### Tipos
```typescript
// ✅ Tipos explícitos en props
interface CardProps {
  game: GameSystemConfig
  className?: string
}

// ✅ GameSystemId como union type, nunca string libre
type GameSystemId = 'V20' | 'W20' | 'M20' | 'C20' | 'Wr20'

// ❌ Nunca usar 'any'
// ❌ Nunca usar 'as' excepto en event handlers necesarios
```

### Componentes
```typescript
// ✅ Componentes funcionales con tipos explícitos
const MyCard = ({ game }: CardProps): JSX.Element => { ... }

// ✅ Default export para páginas/pantallas principales
// ✅ Named exports para componentes de UI atómicos

// Umbral de extracción: si un componente supera ~200 líneas,
// extraer sub-componentes a sus propios archivos
```

### Theming (REGLA CRÍTICA)
```typescript
// ✅ CORRECTO: el accent siempre via CSS var
style={{ color: 'var(--accent)' }}
style={{ backgroundColor: 'var(--accent)' }}
style={{ borderColor: 'var(--accent)' }}

// ❌ INCORRECTO: nunca el hex del acento directo
style={{ color: '#FF3333' }}
className="text-[#FF3333]"  // ← viola el sistema multi-juego
```

### Contenido (REGLA CRÍTICA)
```typescript
// ✅ CORRECTO: todo contenido desde GameSystemConfig
const hero = game.hero
<h1>{hero.title}</h1>
<p>{hero.description}</p>

// ❌ INCORRECTO: strings de contenido hardcodeados
<h1>Vademécum: La Mascarada</h1>  // ← solo funciona para V20
```

### Cambio de juego
```typescript
// Mecanismo canónico de theming:
const handleGameChange = (id: GameSystemId) => {
  setActiveGame(id)
  document.documentElement.setAttribute('data-game', id)
  // Las CSS vars se actualizan automáticamente via index.css
}
```

## Patrones de Componentes Establecidos

| Componente | Ubicación | Props clave |
|------------|-----------|-------------|
| `PipRow` | `components/ui/` | `total, filled, size?` |
| `ProgressBar` | `components/ui/` | `value, max, label` |
| `GameSelector` | `components/layout/` | `activeGame, onChange` |
| `Sidebar` | `components/layout/` | `game, activeSection, onSection, isOpen` |
| `TopBar` | `components/layout/` | `game, activeGame, onGameChange, onMenuToggle` |

## Checklist de Entrega de Código

- [ ] ¿Todos los props tienen tipos explícitos?
- [ ] ¿El contenido viene de `GameSystemConfig`?
- [ ] ¿El accent usa `var(--accent)`?
- [ ] ¿El componente es agnóstico al juego (funciona para V20 y M20)?
- [ ] ¿Hay algún `any` que deba tiparse?
- [ ] ¿El archivo supera 200 líneas? Si sí, extraer.
