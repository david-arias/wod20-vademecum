# 📂 ARCHIVO DE MEMORIA: HANDOFF.md
> Guardián del Handoff — Agente Documentador | Última actualización: Fase 1.1 — Ajustes de Layout Hero y Grid

---

## 🏷️ Proyecto
**Vademécum cWoD 20 Aniversario**
Motor de reglas agnóstico para el ecosistema World of Darkness 20th Anniversary Edition.
Líneas de juego: V20 (Vampiro), W20 (Hombre Lobo), M20 (Mago), C20 (Changeling), Wr20 (Wraith).

---

## ✅ Estado Actual: FASE 1.1 COMPLETADA — Ajustes visuales confirmados en browser

### Bugs resueltos en esta iteración

| Bug | Causa raíz | Solución |
|-----|-----------|---------|
| Hero text pegado a los bordes | `items-end pb-10` pensado para imagen de fondo inexistente | Cambiado a `py-14 px-12` con layout vertical centrado |
| Grid sin gutters entre cards | Truco `gap-[1px] bg-[#1E1E1E]` que crea separadores, no espacios | Reemplazado por `gap-6` (24px) y dos filas explícitas: 5-col (3+2) arriba, 3-col abajo |
| `vite.config.ts` causaba EACCES | Vite escribía cache en `node_modules/.vite/` con permisos del sandbox | Añadido `cacheDir: '.vite-cache'` para mover el cache a la raíz del proyecto |

### Carpeta `.agents/` creada en esta iteración

| Archivo | Descripción |
|---|---|
| `.agents/AGENTS.md` | Definición del equipo: roles, responsabilidades, protocolo de sesión |
| `.agents/SYSTEM_PROMPT.md` | Prompt listo para copiar al inicio de cada nueva sesión |
| `.agents/skills/UX_UI_Expert.md` | Paleta completa, reglas de componentes, checklist de entrega |
| `.agents/skills/Frontend_Architect.md` | Stack, reglas de código, patrones establecidos |
| `.agents/skills/Documentador.md` | Protocolo de handoff, estructura del HANDOFF.md |
| `.agents/templates/HANDOFF_TEMPLATE.md` | Plantilla en blanco para nuevas sesiones |

### Componentes creados en esta iteración (Fase 1)

| Archivo | Descripción |
|---|---|
| `src/types/gameSystem.ts` | Tipos TypeScript completos: `GameSystemId`, `GameSystemConfig`, `DashboardState`, `VirtueStat`, etc. |
| `src/data/gameSystems.ts` | Data layer con las 5 líneas de juego totalmente configuradas |
| `src/components/Dashboard.tsx` | Componente principal monolítico con todos los sub-componentes |
| `src/index.css` | CSS global con variables CSS dinámicas por juego (`--accent`, `--accent-dim`) |
| `tailwind.config.ts` | Configuración extendida: colores, fuentes, `borderRadius: 0px` global |
| `index.html` | HTML base con Google Fonts (EB Garamond, Inter, JetBrains Mono) |
| `package.json` | Dependencias: React 18, Vite, TypeScript, Tailwind CSS 3 |

### Sub-componentes del Dashboard

| Componente | Descripción |
|---|---|
| `<TopBar />` | Barra superior fija: logo, nav, búsqueda, `<GameSelector />` |
| `<GameSelector />` | Dropdown de cambio de juego con preview de accent color |
| `<Sidebar />` | Menú vertical fijo, JetBrains Mono ALL-CAPS, active state con keyline izquierdo |
| `<Hero />` | Hero Section con hero-bg noise, título EB Garamond, dos CTAs |
| `<AttributesCard />` | Módulo de atributos con grupos coloreados |
| `<PowersCard />` | Módulo de disciplinas/dones/esferas (label dinámico por juego) |
| `<CombatCard />` | Módulo de salud con `<PipRow />` de cuadrados 0px |
| `<VirtuesCard />` | Módulo de virtudes con `<ProgressBar />` planas |
| `<SystemCard />` | Módulo de sistema básico con CTA secundario |
| `<PipRow />` | Indicador de puntos: cuadrados `w-[12px] h-[12px]`, 0px radius |
| `<ProgressBar />` | Barra de progreso plana: `h-[3px]`, sin radius, accent via CSS var |
| `<Footer />` | Footer mínimo con copyright y links |

---

## 🎨 Tokens de Diseño Activos

### Paleta base (Abyssal Gothic — Fija)
```
void:           #0A0A0A   — Fondo absoluto del body
surface:        #131313   — Superficie primaria (sidebar, cards)
surface-low:    #1C1B1B   — Contenedores internos
surface-mid:    #201F1F   — Elevación media
surface-high:   #2A2A2A   — Elevación alta (hover states)
cream:          #F5F5F0   — Texto primario
on-surface:     #E5E2E1   — Texto secundario
muted:          #6B7280   — Texto apagado / placeholders
keyline:        #333333   — Bordes estructurales
```

### Acentos por sistema de juego (CSS Custom Properties)
```css
/* Variable global en :root y sobrescrita con html[data-game="ID"] */
--accent         /* Color principal del sistema activo */
--accent-dim     /* rgba del accent al 12% para fondos */
--accent-border  /* rgba del accent al 35% para keylines */

V20  (Vampiro)    → #FF3333  — Blood Red
W20  (Hombre Lobo)→ #C07800  — Rage Gold/Bronze
M20  (Mago)       → #1A6EFF  — Quintessence Blue
C20  (Changeling) → #9333EA  — Dream Violet
Wr20 (Wraith)     → #6B7280  — Ash Gray
```

### Tipografía
```
font-garamond → EB Garamond — Headlines, Hero title, card titles
font-inter    → Inter        — Body text, descriptions, párrafos
font-mono     → JetBrains Mono — Nav labels, badges, pips, metadata
```

### Geometría
```
border-radius: 0px en TODOS los elementos (enforced via Tailwind config + CSS reset)
No box-shadow en ningún elemento (enforced via CSS reset)
Pips: cuadrados 12×12px, borde 1px solid #333333 (vacío) / accent fill (activo)
Progress bars: height 3px, sin radius, fill via --accent
Keylines: 1px solid #333333 | 1px solid var(--accent) en focus/active
```

---

## 🗂️ Estructura del Estado de Datos (JSON Schema)

```typescript
// Unidad raíz de configuración de juego
interface GameSystemConfig {
  id:               GameSystemId          // 'V20' | 'W20' | 'M20' | 'C20' | 'Wr20'
  fullName:         string                // Nombre editorial completo
  shortName:        string                // Código corto para UI
  accent:           GameAccent            // { primary, dim, border }
  nav:              NavSection[]          // Links del sidebar (adaptados por juego)
  hero:             HeroContent           // { eyebrow, title, description, ctaPrimary, ctaSecondary }
  attributeGroups:  AttributeGroup[]      // Físicos | Sociales | Mentales (con color)
  powers:           PowerEntry[]          // Disciplinas / Dones / Esferas / Artes / Arcanos
  powersLabel:      string                // Label del módulo (dinámico por juego)
  virtues:          VirtueStat[]          // { name, current, max } para progress bars
  virtuesLabel:     string                // Label del módulo (dinámico por juego)
  systemSummary:    string                // Descripción corta del sistema de reglas
  healthPips:       number                // Máx. niveles de salud (default 7)
  currentHealth:    number                // Estado de salud del personaje
}

// Estado global de la aplicación
interface DashboardState {
  activeGame:        GameSystemId         // Juego activo (default 'V20')
  session:           SessionStatus        // { groupName, label, isActive }
  sidebarCollapsed:  boolean
}
```

**Mecanismo de theming:** La función `handleGameChange()` actualiza `document.documentElement.setAttribute('data-game', id)`, lo que activa las reglas CSS en `index.css` que sobrescriben las variables `--accent`, `--accent-dim` y `--accent-border`. Todos los componentes consumen el accent exclusivamente via `var(--accent)` — nunca hardcodeado.

---

## 🔮 Siguientes Pasos Pendientes (Fase 2+)

### Fase 1.2 — Mejoras inmediatas opcionales
- [ ] Añadir imagen real de catedral gótica como hero background (reemplazar noise SVG)
- [ ] Ajustar altura mínima del hero en mobile (actualmente `py-14` puede quedar corto en pantallas pequeñas)
- [ ] Añadir transición suave de accent al cambiar de juego (actualmente instantáneo)

### Fase 2 — Sistema de Navegación y Router
- [ ] Instalar `react-router-dom` v6 y configurar rutas por sección
- [ ] Crear páginas: `SistemaBasico`, `AtributosHabilidades`, `Disciplinas`, `Combate`, `Virtudes`
- [ ] Implementar transición de página (fade instantáneo, 0ms — sin easing suave)
- [ ] Conectar el sidebar a las rutas reales

### Fase 3 — Página de Atributos y Habilidades
- [ ] Grid 3-columnas (Físicos / Sociales / Mentales)
- [ ] Input con rating dots/squares (1–5) para cada atributo
- [ ] Sección de Habilidades (Talentos, Técnicas, Conocimientos) con mismo sistema
- [ ] Lógica de cálculo de dados para tiradas (Atributo + Habilidad)

### Fase 4 — Página de Disciplinas (V20) / Poderes
- [ ] Acordeón por disciplina con niveles 1–5
- [ ] Descripción completa de cada poder
- [ ] Sistema de activación (coste en Sangre/Gnosis/Quintaesencia)
- [ ] Adaptar labels y poderes para cada game system

### Fase 5 — Ficha de Personaje y Persistencia
- [ ] Formulario de creación de personaje (Clan/Tribu/Tradición)
- [ ] Persistencia en `localStorage` con clave por personaje
- [ ] Exportar/importar ficha en JSON
- [ ] Modo "Storyteller" (vista de todos los personajes)

### Fase 6 — Motor de Tiradas
- [ ] Componente `<DicePool />`: selección de dados + dificultad
- [ ] Visualización de resultado (éxitos, fallos, pifias)
- [ ] Log de tiradas de sesión
- [ ] Especialidades que añaden dados

### Deuda técnica a resolver
- [ ] Extraer sub-componentes de `Dashboard.tsx` a archivos individuales (`/components/`)
- [ ] Añadir `React.memo()` a tarjetas del grid para evitar re-renders
- [ ] Implementar `useContext` o Zustand para el estado global del juego activo
- [ ] Test unitarios con Vitest para los tipos y el data layer

---

## 🏗️ Arquitectura de Archivos Actual

```
wod20 - Vademecum/
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── postcss.config.js
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── gameSystem.ts        ← Tipos TypeScript completos
    ├── data/
    │   └── gameSystems.ts       ← Data layer: 5 juegos configurados
    └── components/
        └── Dashboard.tsx        ← Componente principal (monolítico Fase 1)
```

---

*Generado por el Agente Documentador — El Guardián del Handoff.*
*Próxima actualización: Fase 2 — Router y páginas de contenido.*
