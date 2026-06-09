# V20 Vademécum — Abyssal Gothic

> Compendio digital unificado para el ecosistema **World of Darkness 20th Anniversary Edition**.
> Motor de reglas agnóstico con interfaz adaptable por línea de juego.

![Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## Líneas de Juego Soportadas

| ID | Juego | Acento | Estado |
|----|-------|--------|--------|
| `V20` | Vampiro: La Mascarada | 🔴 `#FF3333` Blood Red | ✅ Fase 2 |
| `W20` | Hombre Lobo: El Apocalipsis | 🟡 `#D4AF37` Dark Gold | ✅ Fase 2 |
| `M20` | Mago: La Ascensión | 🟣 `#8A2BE2` BlueViolet | ✅ Fase 2 |
| `C20` | Changeling: El Ensueño | 🟢 `#00FF7F` Spring Green | ✅ Fase 2 |
| `Wr20` | Wraith: El Olvido | 🩶 `#708090` Slate Gray | ✅ Fase 2 |

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
const ALL_POWERS: PowersIndex = Record<GameSystemId, PowerCategory[]>

// Facciones: Clanes / Tribus / Tradiciones / Parentelas / Gremios
const ALL_FACTIONS: FactionsIndex = Record<GameSystemId, Faction[]>

// Reglas básicas compartidas (dice pool, acciones, heridas, recursos)
const CORE_RULES: CoreRule[]
```

Cada `PowerLevel` incluye: nombre, resumen, texto de sistema, reserva de dados, coste de recurso, tipo de acción, duración y campos específicos del juego (`effectType` para M20, `realmRequired` para C20, `associatedWith` para W20).

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
| Clan (Fase 3 Bloque 6) | Serpentis, Dementación, Nigromancia (Senda Sepulcro), Taumaturgia (Senda Sangre), Quietud | 5/5 c/u | ✅ |

15 disciplinas × 5 niveles = **75 `PowerLevel`** con `systemText`, `dicePool`, `cost`, `actionType`, `duration`, `tags`.

### W20 — Dones `src/data/powers/w20Gifts.ts`

| Categoría | Tipo | Rangos | Estado |
|---|---|---|---|
| Ahroun, Theurge | auspice | base | ✅ |
| Señores de la Sombra | tribe | base | ✅ |
| Ragabash, Philodox, Galliard | auspice | 5/5 c/u | ✅ Fase 2.5 |
| Homínido, Lupus | breed | 5/5 c/u | ✅ Fase 2.5 |
| **Metis** | **breed** | **5/5** | **✅ Fase 3 Bloque 8** |
| **Vástagos de Fenris, Furias Negras** | **tribe** | **5/5 c/u** | **✅ Fase 3 Bloque 7** |
| **Caminantes de Cristal, Garras Rojas** | **tribe** | **5/5 c/u** | **✅ Fase 3 Bloque 7** |

Todos los dones nuevos incluyen `sourceType`, `associatedWith`, recurso `Gnosis`/`Rabia`/`Gratis` y `systemText` canónico en español.

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
| **Espíritu** | **El Velo, los Efímeros y las Dimensiones de la Umbra** | **✅ Fase 3 Bloque 9** |
| **Primo** | **La Quintaesencia, las Líneas Ley y la Creación de la Realidad** | **✅ Fase 3 Bloque 9** |

Cada nivel incluye `effectType` (`coincidental` / `instrumental` / `vulgar`) renderizado como badge coloreado en `PowersView`.

### C20 — Artes `src/data/powers/c20Arts.ts`

| Arte | Reinos requeridos | Estado |
|---|---|---|
| Chicanería | Actor, Fae, Naturaleza, Prop, Escena | ✅ Fase 2.5 |
| Metamorfosis | Actor, Fae, Naturaleza, Prop | ✅ Fase 2.5 |
| Primordial | Naturaleza, Escena | ✅ Fase 2.5 |
| Soberanía | Actor, Fae, Naturaleza, Escena | ✅ Fase 2.5 |
| Viaje | Actor, Fae, Escena | ✅ Fase 2.5 |
| **Infusión** | **Prop, Fae, Actor, Escena** | **✅ Fase 3 Bloque 10** |
| **Prestidigitación** | **Prop, Actor, Fae, Escena** | **✅ Fase 3 Bloque 10** |
| **Onomancia** | **Actor, Fae, Prop, Naturaleza** | **✅ Fase 3 Bloque 10** |
| **Tejeduría del Cielo** | **Naturaleza, Escena, Actor, Fae** | **✅ Fase 3 Bloque 10** |

Cada nivel incluye `realmRequired[]` con los Reinos canónicos. Recurso siempre `Glamour`.

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
- [ ] **Fase 4** — Motor de Tiradas Interactivo y Ficha de Personaje (AttributesView, CharacterSheet)
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
