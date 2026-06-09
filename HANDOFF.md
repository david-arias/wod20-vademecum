# 📂 ARCHIVO DE MEMORIA: HANDOFF.md
> Guardián del Handoff — Agente Documentador | Última actualización: **Fase 2.5 — Llenado de Datos V20: 10 Disciplinas completas**

---

## 🏷️ Proyecto
**Vademécum cWoD 20 Aniversario**
Motor de reglas agnóstico para el ecosistema World of Darkness 20th Anniversary Edition.
Líneas de juego: V20 (Vampiro), W20 (Hombre Lobo), M20 (Mago), C20 (Changeling), Wr20 (Wraith).

---

## ✅ Estado Actual: FASE 2.5 EN PROGRESO — Llenado de Datos Completo (Bloque 1: V20 finalizado)

### ══════════════════════════════════════════════════════
### FASE 2.5 — Llenado de Datos (Bloque 1 completo)

| Archivo | Cambio | Estado |
|---|---|---|
| `src/data/powers/v20Disciplines.ts` | +5 disciplinas completas (Auspex, Fortitud, Potencia, Obtenebración, Vicisitud) con 5 niveles cada una | ✅ COMPLETO |
| `src/data/powers/w20Gifts.ts` | Dones completos W20 | ⏳ PENDIENTE |
| `src/data/powers/m20Spheres.ts` | Esferas completas M20 | ⏳ PENDIENTE |
| `src/data/powers/c20Arts.ts` | Artes + Reinos completos C20 | ⏳ PENDIENTE |
| `src/data/powers/wr20Arcanos.ts` | Arcanos completos Wr20 | ⏳ PENDIENTE |

### Disciplinas V20 — Estado de cobertura

| Disciplina | Niveles | Campos | Estado |
|---|---|---|---|
| Animalismo | 5/5 | name, summary, systemText, dicePool, cost, actionType, duration, tags | ✅ |
| Celeridad | 5/5 | name, summary, systemText, dicePool, cost, actionType, duration, tags | ✅ |
| Dominación | 5/5 | name, summary, systemText, dicePool, cost, actionType, duration, tags | ✅ |
| Ofuscación | 5/5 | name, summary, systemText, dicePool, cost, actionType, duration, tags | ✅ |
| Presencia | 5/5 | name, summary, systemText, dicePool, cost, actionType, duration, tags | ✅ |
| **Auspex** | **5/5** | name, summary, systemText, dicePool, cost, actionType, duration, tags | **✅ NUEVO** |
| **Fortitud** | **5/5** | name, summary, systemText, dicePool, cost, actionType, duration, tags | **✅ NUEVO** |
| **Potencia** | **5/5** | name, summary, systemText, dicePool, cost, actionType, duration, tags | **✅ NUEVO** |
| **Obtenebración** | **5/5** | name, summary, systemText, dicePool, cost, actionType, duration, tags | **✅ NUEVO** |
| **Vicisitud** | **5/5** | name, summary, systemText, dicePool, cost, actionType, duration, tags | **✅ NUEVO** |

**Total V20: 10 disciplinas × 5 niveles = 50 entradas PowerLevel con todos los campos requeridos.**

---

## ✅ Estado Anterior: FASE 2 COMPLETADA — Motor de Reglas + 3 Vistas + Colores actualizados

### ══════════════════════════════════════════════════════
### FASE 2 — Nuevos archivos creados

| Archivo | Descripción |
|---|---|
| `src/types/powers.ts` | `PowerLevel`, `PowerCategory`, `PowerCategoryType`, `PowersIndex`, `DicePool`, `PowerCost`, `ActionType`, `C20Realm` |
| `src/types/factions.ts` | `Faction`, `FactionType`, `FactionWeakness`, `FactionTrait`, `FactionsIndex` |
| `src/types/coreSystem.ts` | `CoreRule`, `CoreModuleId`, `EnergyResourceRow`, `CoreRuleBlock` (union TextBlock \| TableBlock \| ListBlock \| ComparisonBlock) |
| `src/data/powers/v20Disciplines.ts` | Animalismo, Celeridad, Dominación, Ofuscación, Presencia — 5 niveles cada uno |
| `src/data/powers/w20Gifts.ts` | Dones Ahroun (5), Theurge (3), Señores de la Sombra (3) con `associatedWith` |
| `src/data/powers/m20Spheres.ts` | Correspondencia (5), Entropía (3) con `effectType: 'coincidental' \| 'vulgar'` |
| `src/data/powers/c20Arts.ts` | Chicanería (3), Metamorfosis (3) con `realmRequired[]`, `C20_REALMS_INFO` |
| `src/data/powers/wr20Arcanos.ts` | Embodiment (3), Flux (3) con Pathos como recurso |
| `src/data/powers/index.ts` | `ALL_POWERS: PowersIndex` exportado con los 5 sistemas |
| `src/data/factions/index.ts` | 13 Clanes V20, 5 Tribus W20, 9 Tradiciones M20, 5 Parentelas C20, 5 Gremios Wr20 |
| `src/data/coreSystem.ts` | 5 `CoreRule`: dice-basics, multiple-actions, energy-resources (tabla comparativa), wound-levels, extended-actions |
| `src/components/powers/PowersView.tsx` | Tabs horizontales + listado scrollable izquierdo + card expandida derecha |
| `src/components/factions/FactionsView.tsx` | Grid de tarjetas + Drawer lateral con lore, poderes nativos, bloque de debilidad |
| `src/components/core/CoreSystemView.tsx` | Grid de cards acordeón + tabla comparativa multi-juego de recursos de energía |

### Cambios en archivos existentes

| Archivo | Cambio |
|---|---|
| `src/index.css` | Actualización de acentos: W20→#D4AF37, M20→#8A2BE2, C20→#00FF7F, Wr20→#708090 |
| `src/data/gameSystems.ts` | Mismos acentos actualizados en objetos `GameSystemConfig`; nav de cada juego recibe `{ id: 'factions', ... }` |
| `src/components/Dashboard.tsx` | Importa `PowersView`, `FactionsView`, `CoreSystemView`; enruta por `activeSection` |

---

## 🎨 Sistema de Colores de Acento (Canónicos)

| Juego | Acento | CSS var activo |
|---|---|---|
| V20 — Vampiro | `#FF3333` | `html[data-game="V20"]` |
| W20 — Hombre Lobo | `#D4AF37` | `html[data-game="W20"]` |
| M20 — Mago | `#8A2BE2` | `html[data-game="M20"]` |
| C20 — Changeling | `#00FF7F` | `html[data-game="C20"]` |
| Wr20 — Wraith | `#708090` | `html[data-game="Wr20"]` |

---

## 🏗️ Arquitectura de Componentes

### Árbol de componentes

```
Dashboard.tsx
├── TopBar (GameSelector dropdown)
├── Sidebar (nav items: home, system, attributes, powers, factions, combat, virtues)
└── main
    ├── [home]    → Hero + ModuleGrid + Footer
    ├── [system]  → CoreSystemView (accordion cards, comparison table)
    ├── [powers]  → PowersView (tabs + list + expanded card)
    ├── [factions]→ FactionsView (grid + Drawer lateral)
    └── [otros]   → "Módulo en construcción"
```

### Patrón de enrutamiento
- Sin React Router — enrutamiento por `activeSection: string` en estado de `Dashboard`
- `Sidebar` emite `onSection(id)` → `setActiveSection(id)`
- Cada sección renderiza su vista correspondiente

---

## 📦 Esquema de Datos (Data Layer Completo)

### PowersIndex
```typescript
type PowersIndex = Record<GameSystemId, PowerCategory[]>

interface PowerCategory {
  id: string
  name: string
  gameSystem: GameSystemId
  categoryType: PowerCategoryType  // 'discipline' | 'gift' | 'sphere' | 'art' | 'realm' | 'arcano'
  description?: string
  rulingConcept?: string           // M20: "Control del Espacio"
  associatedWith?: { type: 'auspice' | 'tribe', name: string }  // W20
  levels: PowerLevel[]
}

interface PowerLevel {
  level: number
  name: string
  summary: string
  systemText: string
  dicePool?: DicePool
  cost?: PowerCost
  actionType?: ActionType
  duration?: string
  effectType?: 'coincidental' | 'vulgar' | 'instrumental'  // M20
  realmRequired?: string[]                                   // C20
  tags?: string[]
}
```

### FactionsIndex
```typescript
type FactionsIndex = Record<GameSystemId, Faction[]>

interface Faction {
  id: string
  name: string
  gameSystem: GameSystemId
  factionType: FactionType
  archetype: string
  lore: string
  nativePowerIds: string[]
  nativePowerLabel: string
  weakness: FactionWeakness
  notableMembers?: string[]
  startingTraits?: FactionTrait[]
}
```

### CoreRule
```typescript
interface CoreRule {
  id: string
  module: CoreModuleId
  title: string
  eyebrow: string
  summary: string
  content: CoreRuleBlock[]
  applicableTo: GameSystemId[] | 'all'
}

type CoreRuleBlock = CoreTextBlock | CoreTableBlock | CoreListBlock | CoreComparisonBlock
```

---

## 🔒 Reglas de Diseño Invariables

1. **`border-radius: 0 !important`** en `* { }` — nunca esquinas redondeadas
2. **`box-shadow: none !important`** — nunca sombras
3. **Pips cuadrados** — `width: 10px; height: 10px; display: inline-block` con accent fill o border `#333`
4. **ProgressBar flat** — `height: 3px`, sin radius, accent via CSS var
5. **Fuentes**: EB Garamond (títulos), Inter (cuerpo), JetBrains Mono (UI/labels/badges)
6. **Etiquetas ALL-CAPS JetBrains Mono** con `tracking-widest` para todos los meta-labels
7. **CSS vars `--accent` / `--accent-dim` / `--accent-border`** — nunca hardcoded en componentes salvo data layer
8. **Border-left activo** en sidebar nav: `2px solid var(--accent)`, `paddingLeft: 18px`
9. **Drawer de facciones**: `borderLeft: '2px solid var(--accent)'` en contenedor, no modal
10. **Accent theming**: `document.documentElement.setAttribute('data-game', id)` en `handleGameChange()`

---

## 🐛 Bugs Resueltos (historial)

| Bug | Causa | Solución |
|---|---|---|
| Hero text pegado a los bordes | `items-end pb-10` sin imagen de fondo | `py-14 px-12` con layout vertical |
| Grid sin gutters | `gap-[1px] bg-[#1E1E1E]` crea separadores, no espacios | `gap-6` dos filas explícitas |
| EACCES en Vite cache | node_modules permisos sandbox vs Mac user | `cacheDir: '.vite-cache'` en `vite.config.ts` |

---

## 🔜 Próximos Pasos (Fase 3)

| Tarea | Prioridad | Descripción |
|---|---|---|
| Expandir poderes | Alta | Completar los 5 niveles de todas las disciplinas/dones/esferas/artes/arcanos |
| AttributesView | Media | Vista dedicada con atributos+habilidades de cada juego, sistema de puntos |
| CombatView | Media | Mecánica de iniciativa, daño, tipos, flujo de combate |
| SearchGlobal | Alta | Búsqueda cross-game en poderes + facciones usando índice en memoria |
| CharacterSheet | Alta | Formulario interactivo de ficha de personaje con campos editables |
| Persistencia | Media | `localStorage` / exportar JSON de personaje |
| React Router | Baja | Migrar enrutamiento interno a React Router v6 para URLs navegables |
| Testing | Media | Vitest + Testing Library para componentes críticos (PowersView, FactionsView) |

---

## 💻 Comandos Útiles

```bash
# Desarrollo local
cd "wod20 - Vademecum" && npm run dev

# Build de producción
npm run build

# Lint
npm run lint

# Fix permisos (si EACCES reaparece)
sudo chown -R $(whoami) . && chmod -R u+rw . && rm -rf node_modules && npm install
```

---

## 📁 Estructura de Archivos Actualizada

```
wod20 - Vademecum/
├── src/
│   ├── types/
│   │   ├── gameSystem.ts       # GameSystemId, GameSystemConfig, VirtueStat, NavSection...
│   │   ├── powers.ts           # PowerCategory, PowerLevel, DicePool, ActionType...
│   │   ├── factions.ts         # Faction, FactionType, FactionWeakness...
│   │   └── coreSystem.ts       # CoreRule, CoreRuleBlock (union), EnergyResourceRow
│   ├── data/
│   │   ├── gameSystems.ts      # Config completa de los 5 sistemas con acentos canónicos
│   │   ├── coreSystem.ts       # 5 CoreRules con 3 tipos de bloque
│   │   ├── powers/
│   │   │   ├── v20Disciplines.ts
│   │   │   ├── w20Gifts.ts
│   │   │   ├── m20Spheres.ts
│   │   │   ├── c20Arts.ts
│   │   │   ├── wr20Arcanos.ts
│   │   │   └── index.ts        # ALL_POWERS: PowersIndex
│   │   └── factions/
│   │       └── index.ts        # ALL_FACTIONS: FactionsIndex (13+5+9+5+5 facciones)
│   ├── components/
│   │   ├── Dashboard.tsx       # Orquestador principal + todos los sub-componentes del home
│   │   ├── powers/
│   │   │   └── PowersView.tsx  # Tabs + list + expanded card
│   │   ├── factions/
│   │   │   └── FactionsView.tsx # Grid + Drawer lateral
│   │   └── core/
│   │       └── CoreSystemView.tsx # Accordion cards + comparison table
│   ├── index.css               # CSS vars por juego, resets, utility classes
│   └── App.tsx
├── .agents/                    # Sistema de 3 agentes
│   ├── AGENTS.md
│   ├── SYSTEM_PROMPT.md
│   ├── skills/
│   │   ├── UX_UI_Expert.md
│   │   ├── Frontend_Architect.md
│   │   └── Documentador.md
│   └── templates/HANDOFF_TEMPLATE.md
├── tailwind.config.ts
├── vite.config.ts
├── HANDOFF.md                  # ← ESTE ARCHIVO
└── README.md
```
