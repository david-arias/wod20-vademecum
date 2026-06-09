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
| `V20` | Vampiro: La Mascarada | 🔴 `#FF3333` Blood Red | ✅ Fase 1 |
| `W20` | Hombre Lobo: El Apocalipsis | 🟡 `#C07800` Rage Gold | ✅ Fase 1 |
| `M20` | Mago: La Ascensión | 🔵 `#1A6EFF` Quint Blue | ✅ Fase 1 |
| `C20` | Changeling: El Ensueño | 🟣 `#9333EA` Dream Violet | ✅ Fase 1 |
| `Wr20` | Wraith: El Olvido | ⚫ `#6B7280` Ash Gray | ✅ Fase 1 |

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

## Roadmap

- [x] **Fase 1** — Dashboard multirraza con selector de juego y grid de módulos
- [ ] **Fase 2** — Router + páginas individuales por sección
- [ ] **Fase 3** — Ficha de personaje interactiva con atributos y habilidades editables
- [ ] **Fase 4** — Motor de tiradas (pool de dados, dificultad, especialidades)
- [ ] **Fase 5** — Persistencia local + exportar/importar personajes en JSON
- [ ] **Fase 6** — Modo Narrador (gestión de múltiples personajes)

---

## Contribuir

1. Lee `HANDOFF.md` para entender el estado actual
2. Lee `.agents/AGENTS.md` para conocer las reglas del proyecto
3. Crea una rama: `git checkout -b feat/nombre-de-la-feature`
4. Abre un Pull Request describiendo los cambios

---

*© 1242 AD – MMXXXIV. World of Darkness es marca registrada de White Wolf Publishing / Paradox Interactive. Este proyecto es un fan-tool sin fines de lucro.*
