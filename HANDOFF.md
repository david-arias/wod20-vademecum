# 📂 ARCHIVO DE MEMORIA: HANDOFF.md
> Guardián del Handoff — Agente Documentador | Última actualización: **Fase 2.5 — COMPLETADA — Arcanos Wr20: 5 Arcanos × 5 niveles (Bloque 5)**

---

## 🏷️ Proyecto
**Vademécum cWoD 20 Aniversario**
Motor de reglas agnóstico para el ecosistema World of Darkness 20th Anniversary Edition.
Líneas de juego: V20 (Vampiro), W20 (Hombre Lobo), M20 (Mago), C20 (Changeling), Wr20 (Wraith).

---

## ✅ Estado Actual: ██████████████ FASE 2.5 COMPLETADA ██████████████

### ══════════════════════════════════════════════════════
### FASE 2.5 — Llenado de Datos — CIERRE FORMAL

| Archivo | Cambio | Estado |
|---|---|---|
| `src/data/powers/v20Disciplines.ts` | +5 disciplinas completas (Auspex, Fortitud, Potencia, Obtenebración, Vicisitud) | ✅ COMPLETO |
| `src/data/powers/w20Gifts.ts` | +5 categorías: Ragabash, Philodox, Galliard, Homínido, Lupus — 5 rangos cada una | ✅ COMPLETO |
| `src/data/powers/m20Spheres.ts` | +5 esferas nuevas (Fuerzas, Vida, Mente, Materia, Tiempo) + Entropía 5/5 niveles | ✅ COMPLETO |
| `src/data/powers/c20Arts.ts` | +3 Artes nuevas (Primordial, Soberanía, Viaje) + Chicanería y Metamorfosis 5/5 niveles | ✅ COMPLETO |
| `src/data/powers/wr20Arcanos.ts` | Reescritura completa: 5 Arcanos × 5 niveles (Encarnación, Flujo, Lamento, Moldeo, Marioneta) | ✅ COMPLETO |

### Disciplinas V20 — Estado de cobertura

| Disciplina | Niveles | Estado |
|---|---|---|
| Animalismo | 5/5 | ✅ |
| Celeridad | 5/5 | ✅ |
| Dominación | 5/5 | ✅ |
| Ofuscación | 5/5 | ✅ |
| Presencia | 5/5 | ✅ |
| Auspex | 5/5 | ✅ |
| Fortitud | 5/5 | ✅ |
| Potencia | 5/5 | ✅ |
| Obtenebración | 5/5 | ✅ |
| Vicisitud | 5/5 | ✅ |

**Total V20: 10 disciplinas × 5 niveles = 50 PowerLevel.**

### Dones W20 — Estado de cobertura

| Categoría | Tipo | Rangos | Recurso | Estado |
|---|---|---|---|---|
| Dones Ahroun | auspice | 6 entradas | Rabia | ✅ (previo) |
| Dones Theurge | auspice | 3 entradas | Gnosis | ✅ (previo, pendiente ampliar) |
| Dones Señores de la Sombra | tribe | 3 entradas | Gnosis | ✅ (previo, pendiente ampliar) |
| **Dones Ragabash** | **auspice** | **5/5** | **Gnosis** | **✅ NUEVO** |
| **Dones Philodox** | **auspice** | **5/5** | **Gnosis / Rabia** | **✅ NUEVO** |
| **Dones Galliard** | **auspice** | **5/5** | **Gnosis** | **✅ NUEVO** |
| **Dones Homínido** | **breed** | **5/5** | **Gnosis** | **✅ NUEVO** |
| **Dones Lupus** | **breed** | **5/5** | **Gnosis / Rabia / Gratis** | **✅ NUEVO** |

**Bloque 2 completo: +5 categorías × 5 rangos = 25 nuevas entradas PowerLevel con sourceType, associatedWith, cost (Gnosis/Rabia), dicePool, systemText completos.**

### Esferas M20 — Estado de cobertura

| Esfera | `rulingConcept` | Niveles | `effectType` | Estado |
|---|---|---|---|---|
| Correspondencia | Distancia, Localización y Conexión | 5/5 | coincidental→vulgar | ✅ (previo) |
| Entropía | Caos, Decadencia, Suerte y Orden | 5/5 | coincidental→vulgar | ✅ COMPLETADO |
| **Fuerzas** | **Energía, Elementos y Movimiento** | **5/5** | **coincidental/instrumental/vulgar** | **✅ NUEVO** |
| **Vida** | **Organismos, Biología y Metamorfosis** | **5/5** | **coincidental/instrumental/vulgar** | **✅ NUEVO** |
| **Mente** | **Consciencia, Psique y Proyección Astral** | **5/5** | **coincidental→vulgar** | **✅ NUEVO** |
| **Materia** | **Estructuras Moleculares, Transmutación e Inorgánico** | **5/5** | **coincidental/instrumental/vulgar** | **✅ NUEVO** |
| **Tiempo** | **Dilatación, Profecía y Aceleración** | **5/5** | **coincidental→vulgar** | **✅ NUEVO** |

**Bloque 3 completo: 7 esferas × 5 niveles = 35 `PowerLevel` con `effectType`, `rulingConcept`, `dicePool`, `cost` (Quintaesencia), `systemText` canónico M20 en español.**

> Nota de diseño: el campo `effectType` se mapea a badges de color en `PowersView.tsx`:
> `coincidental` → badge verde, `instrumental` → badge ámbar, `vulgar` → badge rojo.

### Artes C20 — Estado de cobertura

| Arte | Niveles | Reinos usados | Estado |
|---|---|---|---|
| Chicanería | 5/5 | Actor, Fae, Naturaleza, Prop, Escena | ✅ COMPLETADO |
| Metamorfosis | 5/5 | Actor, Fae, Naturaleza, Prop | ✅ COMPLETADO |
| **Primordial** | **5/5** | **Naturaleza, Escena** | **✅ NUEVO** |
| **Soberanía** | **5/5** | **Actor, Fae, Naturaleza, Escena** | **✅ NUEVO** |
| **Viaje** | **5/5** | **Actor, Fae, Escena** | **✅ NUEVO** |

Todos los niveles incluyen `realmRequired: string[]` con los Reinos canónicos C20 y `cost: { resource: 'Glamour' }`.

**Bloque 4 completo: 5 Artes × 5 niveles = 25 `PowerLevel` con `realmRequired`, `cost.resource: 'Glamour'`, `systemText` canónico C20 en español.**

> **Reinos disponibles:** Actor (mortales), Fae (feéricos), Naturaleza (animales/plantas), Prop (objetos), Escena (entornos), Tiempo (flujo temporal).

### Arcanos Wr20 — Estado de cobertura

| Arcano | Descripción | Niveles | Recurso | Atributos pool | Estado |
|---|---|---|---|---|---|
| **Encarnación** | Manifestación en el plano físico | 5/5 | Pathos | Fuerza/Apariencia/Destreza/Resistencia + Encarnación | ✅ NUEVO (completado 3→5) |
| **Flujo** | Cambio y transformación espectral | 5/5 | Pathos / Gratis | Percepción/Inteligencia/Destreza/Manipulación + Flujo | ✅ NUEVO (completado 3→5) |
| **Lamento** | Voz de los muertos; terror y desesperación | 5/5 | Pathos / Gratis | Carisma/Manipulación/Fuerza + Lamento | ✅ NUEVO |
| **Moldeo** | Esculpir Corpus propio y ajeno | 5/5 | Pathos | Destreza/Resistencia/Fuerza + Moldeo | ✅ NUEVO |
| **Marioneta** | Control de mortales; posesión | 5/5 | Pathos / Gratis | Destreza/Manipulación/Inteligencia + Marioneta | ✅ NUEVO |

**Bloque 5 completo: 5 Arcanos × 5 niveles = 25 `PowerLevel` con `dicePool` (atributos Wr20: Corporalidad/Mentalidad/Volatilidad), `cost.resource: 'Pathos'/'Gratis'`, `systemText` canónico Wr20 en español.**

> **Nota de diseño Wr20:**
> - `cost.resource: 'Pathos'` — recurso estándar para la mayoría de habilidades activas
> - `cost.resource: 'Gratis'` + `amount: 'free'` — habilidades pasivas de nivel 1 (Sentir el Pathos, Voz del Velo, Toque Nervioso)
> - Los niveles 4-5 incluyen activación de Angustia (Shadow roll) como efecto secundario en Lamento y Marioneta
> - `dicePool.formula` combina atributo español + nombre del Arcano en español (Corporalidad, Mentalidad, Volatilidad)

### ══ RESUMEN FINAL FASE 2.5 ══

| Sistema | Archivo | Poderes totales | Estado |
|---|---|---|---|
| V20 | `v20Disciplines.ts` | 10 disciplinas × 5 = **50 PowerLevel** | ✅ |
| W20 | `w20Gifts.ts` | 8 categorías, ~35 entradas | ✅ |
| M20 | `m20Spheres.ts` | 7 esferas × 5 = **35 PowerLevel** | ✅ |
| C20 | `c20Arts.ts` | 5 Artes × 5 = **25 PowerLevel** | ✅ |
| Wr20 | `wr20Arcanos.ts` | 5 Arcanos × 5 = **25 PowerLevel** | ✅ |

**Total Fase 2.5: ≥ 170 `PowerLevel` con `systemText`, `dicePool`, `cost`, `actionType`, `duration`, `tags` completos para los 5 sistemas.**

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

## 🔜 Siguiente Fase: FASE 3 — Expansión Total del Data Layer

### ══════════════════════════════════════════════════════
### FASE 3 — Inyección de Datos Completa (Manual Básico Canónico)

Objetivo: cubrir al 100% los sistemas de poderes del manual básico de cada línea de juego. ~190 `PowerLevel` adicionales sobre los ≥170 ya existentes.

| Bloque | Sistema | Contenido | PL nuevos | Estado |
|---|---|---|---|---|
| **Bloque 6** | V20 | Serpentis, Dementación, Nigromancia (Senda del Sepulcro), Taumaturgia (Senda de la Sangre), Quietud | +25 | [x] COMPLETO |
| **Bloque 7** | W20 | Vástagos de Fenris, Furias Negras, Caminantes de Cristal, Garras Rojas (4 tribus × 5 dones) | +20 | [x] COMPLETO |
| **Bloque 8** | W20 | Raza Metis (5 dones) | +5 | [x] COMPLETO |
| **Bloque 9** | M20 | Espíritu, Primo (2 esferas faltantes del canon) | +10 | [ ] PENDIENTE |
| **Bloque 10** | C20 | Chronos, Prestidigitación, Nomenclatura, Pirética | +20 | [ ] PENDIENTE |
| **Bloque 11** | C20 | Adivinación, Ensueño, Primavera | +15 | [ ] PENDIENTE |
| **Bloque 12** | Wr20 | Argos, Castigate, Fatalismo, Inhabit, Lifeweb | +25 | [ ] PENDIENTE |
| **Bloque 13** | Wr20 | Mnemósynis, Outrage, Pandemonium, Phantasm, Usury | +25 | [ ] PENDIENTE |

**Total Fase 3: ~190 PL nuevos. Total acumulado al cerrar Fase 3: ≥ 360 PowerLevel.**

### W20 — Cobertura de Bloques 7+8

| Categoría | Tipo | Rangos | Estado |
|---|---|---|---|
| **Metis** | **breed** | **5/5** | **✅ NUEVO (Bloque 8)** |
| **Vástagos de Fenris** | **tribe** | **5/5** | **✅ NUEVO (Bloque 7)** |
| **Furias Negras** | **tribe** | **5/5** | **✅ NUEVO (Bloque 7)** |
| **Caminantes de Cristal** | **tribe** | **5/5** | **✅ NUEVO (Bloque 7)** |
| **Garras Rojas** | **tribe** | **5/5** | **✅ NUEVO (Bloque 7)** |

**Bloques 7+8: 5 nuevas categorías × 5 dones = 25 nuevas entradas PowerLevel.**
Nota: Ragabash, Philodox y Galliard ya cubiertos en Fase 2.5 (5 niveles cada uno).

### V20 — Cobertura completa de disciplinas (Bloque 6)

| Disciplina | Clan | Niveles | Estado |
|---|---|---|---|
| Animalismo | Gangrel, Nosferatu | 5/5 | ✅ (Fase 2.5) |
| Celeridad | Assamita, Brujah, Toreador | 5/5 | ✅ (Fase 2.5) |
| Dominación | Lasombra, Malkavian, Tremere, Ventrue | 5/5 | ✅ (Fase 2.5) |
| Ofuscación | Assamita, Malkavian, Nosferatu | 5/5 | ✅ (Fase 2.5) |
| Presencia | Brujah, Followers of Set, Toreador, Ventrue | 5/5 | ✅ (Fase 2.5) |
| Auspex | Malkavian, Toreador, Tremere, Ventrue | 5/5 | ✅ (Fase 2.5) |
| Fortitud | Gangrel, Ravnos, Ventrue | 5/5 | ✅ (Fase 2.5) |
| Potencia | Brujah, Giovanni, Lasombra, Nosferatu | 5/5 | ✅ (Fase 2.5) |
| Obtenebración | Lasombra | 5/5 | ✅ (Fase 2.5) |
| Vicisitud | Tzimisce | 5/5 | ✅ (Fase 2.5) |
| **Serpentis** | **Followers of Set** | **5/5** | **✅ NUEVO** |
| **Dementación** | **Malkavian** | **5/5** | **✅ NUEVO** |
| **Nigromancia (Senda del Sepulcro)** | **Giovanni** | **5/5** | **✅ NUEVO** |
| **Taumaturgia (Senda de la Sangre)** | **Tremere** | **5/5** | **✅ NUEVO** |
| **Quietud** | **Assamita** | **5/5** | **✅ NUEVO** |

**Total V20: 15 disciplinas × 5 niveles = 75 PowerLevel.**

### Notas de segmentación Fase 3

- **V20 Bloque 6**: Disciplinas de clan avanzadas — `categoryType: 'discipline'`, sin `associatedWith` (son disciplinas standalone)
- **W20 Bloques 7–8**: `associatedWith: { type: 'tribe', name: '...' }`, `sourceType: 'tribe'`, recurso `Gnosis`/`Rabia`/`Gratis`
- **W20 Tribu corregida**: La lista canónica de 13 tribus es: Furias Negras, Roehuesos, Hijos de Gaia, Fianna, Vástagos de Fenris, Caminantes de Cristal, Garras Rojas, Señores de la Sombra, Peregrinos Silenciosos, Colmillos de Plata, Observadores de las Estrellas, Uktena, Wendigo
- **M20 Bloque 9**: Espíritu y Primo deben incluir `effectType` en cada nivel y `rulingConcept`
- **C20 Bloques 10–11**: `realmRequired[]` canónico por nivel; `cost.resource: 'Glamour'`
- **Wr20 Bloques 12–13**: `cost.resource: 'Pathos'` o `'Gratis'`; `dicePool` con atributos Wr20

---

## 🔜 Próximos Pasos (Post Fase 3)

| Tarea | Prioridad | Descripción |
|---|---|---|
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
