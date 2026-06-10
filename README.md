# V20 Vademécum — Abyssal Gothic

> Compendio digital unificado para el ecosistema **World of Darkness 20th Anniversary Edition**.
> Motor de reglas agnóstico con interfaz adaptable por línea de juego.

![Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## Líneas de Juego Soportadas

| ID | Juego | Acento | Facciones | Poderes | Estado |
|----|-------|--------|-----------|---------|--------|
| `V20` | Vampiro: La Mascarada | 🔴 `#FF3333` Blood Red | 16 clanes (13 base + 3 menores) | 23 disciplinas (2 MultiPath — Tau 7 sendas, Nigro 5 sendas) | ✅ Fase 5-A |
| `W20` | Hombre Lobo: El Apocalipsis | 🟡 `#D4AF37` Dark Gold | 16 facciones (13 tribus + 2 Fera + Hakken) | 24 dones + 18 ritos + renombre | ✅ Fase 5-B |
| `M20` | Mago: La Ascensión | 🟣 `#8A2BE2` BlueViolet | 9 tradiciones (esferas correctas) | 9 esferas | ✅ Fase 4 |
| `C20` | Changeling: El Ensueño | 🟢 `#00FF7F` Spring Green | 13 kiths | 9 artes | ✅ Fase 4 |
| `Wr20` | Wraith: El Olvido | 🩶 `#708090` Slate Gray | 15 gremios (IDs corregidos) | 15 arcanos | ✅ Fase 4 |

---

## Sistema de Diseño: Abyssal Gothic

El proyecto adopta una estética **neo-noir / gothic-punk** de alta precisión visual.

- **Geometría estricta** — `border-radius: 0px` en absolutamente todo
- **Sin sombras** — profundidad creada mediante separación tonal
- **Tipografía de tensión** — EB Garamond (editorial) × JetBrains Mono (técnico) × Inter (legibilidad)
- **Theming dinámico** — el acento cambia al cambiar de juego via CSS Custom Properties

```
Fondo base:     #0A0A0A  (void)
Superficie:     #131313
Texto:          #F5F5F0  (cream)
Acento activo:  var(--accent)   ← se sobreescribe con html[data-game="ID"]
```

---

## Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/wod20-vademecum.git
cd wod20-vademecum

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Build de producción
npm run build
```

> **Requisito:** Node.js 18+ y npm 9+

---

## Estructura del Proyecto

```
wod20 - Vademecum/
├── .agents/                    # Equipo de agentes IA del proyecto
│   ├── AGENTS.md               # Definición de roles y protocolo
│   ├── SYSTEM_PROMPT.md        # Prompt para activar agentes en nueva sesión
│   ├── skills/
│   │   ├── UX_UI_Expert.md     # Reglas del sistema de diseño Abyssal Gothic
│   │   ├── Frontend_Architect.md # Patrones de código React + TypeScript
│   │   └── Documentador.md     # Protocolo del Guardián del Handoff
│   └── templates/
│       └── HANDOFF_TEMPLATE.md # Plantilla base para handoffs
│
├── src/
│   ├── types/
│   │   └── gameSystem.ts       # Interfaces TypeScript completas
│   ├── data/
│   │   └── gameSystems.ts      # Config de los 5 juegos (única fuente de verdad)
│   ├── components/
│   │   └── Dashboard.tsx       # Dashboard principal + todos los sub-componentes
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Variables CSS, theming por juego, resets
│
├── HANDOFF.md                  # Estado actual del proyecto (actualizado por agentes)
├── tailwind.config.ts          # Tokens de diseño: colores, fuentes, spacing
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Arquitectura de Datos

El corazón del motor agnóstico es `GameSystemConfig` — un objeto de configuración por juego que alimenta toda la UI sin strings hardcodeados en los componentes.

```typescript
interface GameSystemConfig {
  id:               GameSystemId           // 'V20' | 'W20' | 'M20' | 'C20' | 'Wr20'
  accent:           GameAccent             // { primary, dim, border }
  nav:              NavSection[]           // Links del sidebar adaptados por juego
  hero:             HeroContent            // Eyebrow, título, descripción, CTAs
  attributeGroups:  AttributeGroup[]       // Físicos / Sociales / Mentales
  powers:           PowerEntry[]           // Disciplinas / Dones / Esferas / Artes
  virtues:          VirtueStat[]           // Barras de progreso (Conciencia, etc.)
  // ...
}
```

**Theming:** Al cambiar de juego, `handleGameChange()` actualiza `html[data-game="ID"]`, activando las CSS vars correspondientes en `index.css`. Todos los componentes consumen `var(--accent)` — nunca un hex hardcodeado.

### Motor de Reglas Agnóstico (Fase 2)

Tres capas de datos adicionales que permiten consultar poderes, facciones y reglas básicas para los 5 sistemas:

```typescript
// Poderes: Disciplinas / Dones / Esferas / Artes / Arcanos
// ── Actualizado en Fase 3.5: soporta MultiPathDiscipline (Taumaturgia, Nigromancia)
const ALL_POWERS: PowersIndex = Record<GameSystemId, (PowerCategory | MultiPathDiscipline)[]>

// Facciones: Clanes / Tribus / Tradiciones / Parentelas / Gremios
const ALL_FACTIONS: FactionsIndex = Record<GameSystemId, Faction[]>

// Reglas básicas compartidas (dice pool, acciones, heridas, recursos)
const CORE_RULES: CoreRule[]
```

Cada `PowerLevel` incluye: nombre, resumen, texto de sistema, reserva de dados, coste de recurso, tipo de acción, duración y campos específicos del juego (`effectType` para M20, `realmRequired` para C20, `sourceType` / `associatedWith` para W20).

Las disciplinas con múltiples sendas (Taumaturgia, Nigromancia) usan `MultiPathDiscipline` con array `paths: PowerPath[]`. La UI debe detectar `isMultiPath === true` y renderizar un selector de senda antes de mostrar los niveles.

---

## Calidad del Data Layer

Tras la auditoría QA de cierre de Fase 3, el data layer cumple las siguientes garantías:

- **TypeScript strict**: 0 errores en `npx tsc --noEmit` — no hay casts ilegales ni tipados por conveniencia
- **IDs cross-game consistentes**: todos los `nativePowerIds` de facciones apuntan a slugs existentes en los archivos de poderes
- **`associatedWith` canónico**: los dones W20 usan correctamente `type: 'auspice'`, `'tribe'` o `'breed'`
- **M20 completo**: las 9 esferas tienen `rulingConcept` — requerido por `PowersView`
- **C20 completo**: las 9 artes tienen `realmRequired[]` con reinos válidos y `cost.resource: 'Glamour'`

---

## Agentes del Proyecto

Este proyecto usa un sistema de sub-agentes IA para mantener coherencia entre sesiones de desarrollo. Ver `.agents/AGENTS.md` para el protocolo completo.

| Agente | Rol |
|--------|-----|
| 🎨 **UX/UI Dark-Mode Expert** | Guardián del sistema Abyssal Gothic. Verifica geometría, paleta y tipografía |
| 💻 **Frontend Architect** | Código limpio, tipos robustos, componentes agnósticos al juego |
| 📝 **Documentador** | Actualiza `HANDOFF.md` al final de cada sesión sin excepción |

Para iniciar una nueva sesión de desarrollo, copiar el prompt de `.agents/SYSTEM_PROMPT.md`.

---

## Estado del Data Layer (Fase 2.5)

### V20 — Disciplinas `src/data/powers/v20Disciplines.ts`

| Grupo | Disciplinas | Niveles | Estado |
|---|---|---|---|
| Base | Animalismo, Celeridad, Dominación, Ofuscación, Presencia | 5/5 c/u | ✅ |
| Ampliado | Auspex, Fortitud, Potencia, Obtenebración, Vicisitud | 5/5 c/u | ✅ |
| Clan (Fase 3) | Serpentis, Dementación, Quietud | 5/5 c/u | ✅ |
| **MultiPath (Fase 3.5)** | **Nigromancia** (Sepulcro + Osario + Cenizas) | **5+5+5/5** | **✅ NUEVO** |
| **MultiPath (Fase 4.2)** | **Taumaturgia** (Sangre + Mov.Mente + Conjuración + Elemental + Verde + Adivinatoria + Espíritus) | **7 sendas × 5** | **✅ Fase 4.2** |
| **MultiPath (Fase 5-A)** | **Nigromancia** (Sepulcro + Osario + Cenizas + Alma + Testigo) | **5 sendas × 5** | **✅ Fase 5-A** |
| **Clan menor (Fase 5-A)** | **Mortis** (Capadocios) | **5/5** | **✅ Fase 5-A** |
| **Clan menor (Fase 5-A)** | **Daimonion** (Baali) | **5/5** | **✅ Fase 5-A** |
| **Clan menor (Fase 5-A)** | **Koldunismo** (Tzimisce Antiguos) | **5/5** | **✅ Fase 5-A** |
| **Ravnos (Fase 3.5)** | **Quimerismo** | **5/5** | **✅ NUEVO** |

16 disciplinas — **~100 `PowerLevel`** (incluyendo sub-sendas MultiPath) con `systemText`, `dicePool`, `cost`, `actionType`, `duration`, `tags`.

### W20 — Dones `src/data/powers/w20Gifts.ts`

| Categoría | Tipo | Rangos | Estado |
|---|---|---|---|
| Ahroun, Theurge | auspice | base | ✅ |
| Ragabash, Philodox, Galliard | auspice | 5/5 c/u | ✅ Fase 2.5 |
| Homínido, Lupus | breed | 5/5 c/u | ✅ Fase 2.5 |
| Metis | breed | 5/5 | ✅ Fase 3 Bloque 8 |
| Señores de la Sombra, Vástagos de Fenris, Furias Negras, Caminantes de Cristal, Garras Rojas | tribe | 5/5 c/u | ✅ Fase 3 |
| **Fianna, Roedores de Huesos, Contemplaestrellas** | **tribe** | **5/5 c/u** | **✅ Fase 3.5** |
| **Hijos de Gaia, Peregrinos Silenciosos, Colmillos de Plata** | **tribe** | **5/5 c/u** | **✅ Fase 3.5** |
| **Uktena, Wendigo** | **tribe** | **5/5 c/u** | **✅ Fase 3.5** |

| **Fera (Fase 5-B)** | **Dones Nuwisha** (Coyotes Cambiantes) | **5/5** | **✅ Fase 5-B** |
| **Fera (Fase 5-B)** | **Dones Ratkin** (Cambiantes Rata) | **3** | **✅ Fase 5-B** |
| **Variante tribal (Fase 5-B)** | **Dones Hakken** (Señores de la Sombra Orientales) | **2 variantes** | **✅ Fase 5-B** |

**24 categorías totales** — todos los dones incluyen `sourceType`, `associatedWith`, recurso `Gnosis`/`Rabia`/`Gratis` y `systemText` canónico en español. Las 13 tribus canónicas W20 tienen gift sets completos, más Nuwisha, Hakken y Ratkin.

### M20 — Esferas `src/data/powers/m20Spheres.ts`

| Esfera | `rulingConcept` | Estado |
|---|---|---|
| Correspondencia | Distancia, Localización y Conexión | ✅ |
| Entropía | Caos, Decadencia, Suerte y Orden | ✅ |
| Fuerzas | Energía, Elementos y Movimiento | ✅ Fase 2.5 |
| Vida | Organismos, Biología y Metamorfosis | ✅ Fase 2.5 |
| Mente | Consciencia, Psique y Proyección Astral | ✅ Fase 2.5 |
| Materia | Estructuras Moleculares, Transmutación e Inorgánico | ✅ Fase 2.5 |
| Tiempo | Dilatación, Profecía y Aceleración | ✅ Fase 2.5 |
| Espíritu | El Velo, los Efímeros y las Dimensiones de la Umbra | ✅ Fase 3 Bloque 9 |
| Primo | La Quintaesencia, las Líneas Ley y la Creación de la Realidad | ✅ Fase 3 Bloque 9 |

Cada nivel incluye `effectType` (`coincidental` / `instrumental` / `vulgar`) renderizado como badge coloreado en `PowersView`. **45/45 niveles con `effectType` asignado** (verificado Fase 3.5). Tradición Dreamspeakers renombrada canónicamente a `Cuentasueños` en Fase 3.5.

### C20 — Artes `src/data/powers/c20Arts.ts` · Parentelas `src/data/factions/index.ts`

| Arte | Reinos requeridos | Estado |
|---|---|---|
| Chicanería | Actor, Fae, Naturaleza, Prop, Escena | ✅ Fase 2.5 |
| Metamorfosis | Actor, Fae, Naturaleza, Prop | ✅ Fase 2.5 |
| Primordial | Naturaleza, Escena | ✅ Fase 2.5 |
| Soberanía | Actor, Fae, Naturaleza, Escena | ✅ Fase 2.5 |
| Viaje | Actor, Fae, Escena | ✅ Fase 2.5 |
| Infusión | Prop, Fae, Actor, Escena | ✅ Fase 3 Bloque 10 |
| Prestidigitación | Prop, Actor, Fae, Escena | ✅ Fase 3 Bloque 10 |
| Onomancia | Actor, Fae, Prop, Naturaleza | ✅ Fase 3 Bloque 10 |
| Tejeduría del Cielo | Naturaleza, Escena, Actor, Fae | ✅ Fase 3 Bloque 10 |

Cada nivel incluye `realmRequired[]` con los Reinos canónicos. Recurso siempre `Glamour`.

**Parentelas (Fase 3.5)** — 9 kiths completos:

| Kith | Debilidad | Estado |
|---|---|---|
| Pooka, Sídhe, Eshu, Nocker, Boggan | (previas) | ✅ |
| **Gorros Rojos (Redcaps)** | Hambre Insaciable | **✅ Fase 3.5** |
| **Sluagh** | Voz del Susurro | **✅ Fase 3.5** |
| **Sátiros (Satyrs)** | Pasión Insaciable | **✅ Fase 3.5** |
| **Trols (Trolls)** | Lazo de Honor | **✅ Fase 3.5** |

### Wr20 — Arcanos `src/data/powers/wr20Arcanos.ts`

| Arcano | Descripción | Atributos clave | Estado |
|---|---|---|---|
| Encarnación | Manifestación física en el mundo material | Fuerza, Apariencia, Destreza, Resistencia | ✅ Fase 2.5 |
| Flujo | Cambio y transmutación del Umbral | Percepción, Inteligencia, Destreza, Manipulación | ✅ Fase 2.5 |
| Lamento | Voz de los muertos; terror, desesperación y destrucción | Carisma, Manipulación, Fuerza | ✅ Fase 2.5 |
| Moldeo | Escultura del Corpus propio y ajeno | Destreza, Resistencia, Fuerza | ✅ Fase 2.5 |
| Marioneta | Control de mortales y posesión | Destreza, Manipulación, Inteligencia | ✅ Fase 2.5 |
| **Argos** | **Navegación espectral: Byways, Tempestado e Inframundo** | **Percepción, Destreza, Inteligencia** | **✅ Fase 3 Bloque 12** |
| **Castigo** | **Arcano de los Perdonadores: confrontar y reducir la Sombra** | **Percepción, Manipulación, Carisma, Inteligencia** | **✅ Fase 3 Bloque 12** |
| **Habitar** | **Posesión de máquinas, electrónica y redes digitales** | **Percepción, Inteligencia, Astucia** | **✅ Fase 3 Bloque 12** |
| **Intimación** | **Manipulación de deseos, pasiones y necesidades** | **Percepción, Manipulación, Inteligencia** | **✅ Fase 3 Bloque 12** |
| **Red de Vida** | **Percibir, manipular y destruir Grilletes** | **Percepción, Manipulación, Destreza, Inteligencia** | **✅ Fase 3 Bloque 12** |
| **Ultraje** | **Psicoquinesis violenta: daño físico y destrucción** | **Fuerza, Destreza** | **✅ Fase 3 Bloque 13** |
| **Pandemonium** | **Terror espectral, pánico y locura** | **Manipulación, Carisma** | **✅ Fase 3 Bloque 13** |
| **Fantasmagoría** | **Invasión de sueños mortales; Pathos onírico** | **Percepción, Astucia, Inteligencia, Manipulación** | **✅ Fase 3 Bloque 13** |
| **Ladrón del Velo** | **Brechas en el Velo para paso de objetos y espionaje** | **Percepción, Destreza, Fuerza** | **✅ Fase 3 Bloque 13** |
| **Usura** | **Transferencia y drenaje de Pathos y Corpus** | **Percepción, Manipulación, Inteligencia** | **✅ Fase 3 Bloque 13** |

15 Arcanos × 5 niveles = **75 `PowerLevel`** con `dicePool` (atributos Wr20), `cost.resource: 'Pathos'/'Gratis'`, `systemText` y `tags`.

**Gremios (Fase 3.5)** — 15 gremios completos: Encarnadores, Proctores, Tejedores + 10 nuevos (Artesanos, Alquimistas, Cantores, Embrujadores, Enmascarados, Mnemoi, Titiriteros, Areneros, Espantos, Usureros).

---

## Roadmap

- [x] **Fase 1** — Dashboard multirraza con selector de juego y grid de módulos
- [x] **Fase 2** — Motor de Reglas Agnóstico: PowersView, FactionsView, CoreSystemView + colores canónicos
- [x] **Fase 2.5** — Data layer completo: V20 (50), W20 (~35), M20 (35), C20 (25), Wr20 (25) — **≥ 170 PowerLevel**
- [x] **Fase 3** — Expansión total del data layer al manual básico canónico (~190 PL adicionales, 8 bloques):
  - [x] Bloque 6: V20 disciplinas de clan (Serpentis, Dementación, Nigromancia, Taumaturgia, Quietud) — **+25 PL**
  - [x] Bloque 7: W20 tribus (Vástagos de Fenris, Furias Negras, Caminantes de Cristal, Garras Rojas) — **+20 PL**
  - [x] Bloque 8: W20 raza Metis — **+5 PL**
  - [x] Bloque 9: M20 esferas restantes (Espíritu, Primo) — **+10 PL**
  - [x] Bloque 10: C20 artes (Infusión, Prestidigitación, Onomancia, Tejeduría del Cielo) — **+20 PL**
  - [x] Bloque 11: C20 (absorbido en Bloque 10)
  - [x] Bloque 12: Wr20 arcanos (Argos, Castigo, Habitar, Intimación, Red de Vida) — **+25 PL**
  - [x] Bloque 13: Wr20 arcanos (Ultraje, Pandemonium, Fantasmagoría, Ladrón del Velo, Usura) — **+25 PL**
  - [x] **Saneamiento QA**: eliminación de tipado ilegal (`as unknown as number`), resolución de 8 IDs huérfanos cross-game, corrección de `associatedWith.type` en W20
- [x] **Fase 3.5** — Arquitectura de Reglas Agnósticas + Sincronización Completa de Datos + UI MultiPath:
  - [x] `W20GiftAxis` + `W20_AXIS_LABELS` + `getW20Axis()` en `types/powers.ts`
  - [x] `GarouForm` / `GarouFormModifier` / `PowerPath` / `MultiPathDiscipline` en `types/powers.ts`
  - [x] `PowersIndex` actualizado a `Record<GameSystemId, (PowerCategory | MultiPathDiscipline)[]>`
  - [x] `w20Forms.ts` — 5 Formas Garou con modificadores exactos (pp.285-290 W20)
  - [x] `PowersView.tsx` — selector triple-eje RAZA/AUSPICIO/TRIBU para W20; breadcrumb de eje activo
  - [x] **`PathSelector` component** — selector de senda para MultiPathDiscipline en `PowersView.tsx`; `isMultiPath()` type guard; memos `effectivePathId`, `activePath`, `levelsToShow`
  - [x] **V20**: Quimerismo (Ravnos, 5 niveles) + Taumaturgia MultiPath (3 sendas) + Nigromancia MultiPath (3 sendas)
  - [x] **W20**: 13 tribus canónicas en facciones + 8 nuevos conjuntos de dones de tribu (Fianna, Roedores de Huesos, Contemplaestrellas, Hijos de Gaia, Peregrinos Silenciosos, Colmillos de Plata, Uktena, Wendigo)
  - [x] **M20**: `effectType` verificado en 45/45 niveles; Dreamspeakers renombrados a `Cuentasueños`
  - [x] **C20**: 4 nuevas parentelas (Gorros Rojos, Sluagh, Sátiros, Trols) → 9 kiths completos
  - [x] **Wr20**: 10 nuevos gremios → 15 gremios completos
  - [x] **TypeScript**: `npx tsc --noEmit` — 0 errores, 0 avisos (fix TS6133 en `PowerCard`)
- [ ] **Fase 4** — Motor de Tiradas Interactivo y Ficha de Personaje:
  - [ ] `MultiPathDiscipline UI` — selector de senda en `PowersView` para Taumaturgia y Nigromancia
  - [ ] `AttributesView` — atributos + habilidades interactivos por juego
  - [ ] `DiceRoller` — simulador d10 con pool configurable, dificultad y lectura de resultados
  - [ ] `CharacterSheet` — ficha de personaje completa y editable
- [ ] **Fase 5** — Búsqueda global cross-game en poderes y facciones
- [ ] **Fase 6** — Persistencia local + exportar/importar personajes en JSON
- [ ] **Fase 7** — Modo Narrador (gestión de múltiples personajes)

---

## Contribuir

1. Lee `HANDOFF.md` para entender el estado actual
2. Lee `.agents/AGENTS.md` para conocer las reglas del proyecto
3. Crea una rama: `git checkout -b feat/nombre-de-la-feature`
4. Abre un Pull Request describiendo los cambios

---

*© 1242 AD – MMXXXIV. World of Darkness es marca registrada de White Wolf Publishing / Paradox Interactive. Este proyecto es un fan-tool sin fines de lucro.*
