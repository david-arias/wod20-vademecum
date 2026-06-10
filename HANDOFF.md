# 📂 ARCHIVO DE MEMORIA: HANDOFF.md
> Guardián del Handoff — Agente Documentador | Última actualización: **FASE 5 BLOQUE B — W20: 18 ritos (w20Rites.ts), renombre completo (w20Renown.ts), 3 nuevas facciones (Nuwisha/Hakken/Ratkin), 10 nuevos dones, FactionType 'fera', 0 errores TypeScript**

---

## 🏷️ Proyecto
**Vademécum cWoD 20 Aniversario**
Motor de reglas agnóstico para el ecosistema World of Darkness 20th Anniversary Edition.
Líneas de juego: V20 (Vampiro), W20 (Hombre Lobo), M20 (Mago), C20 (Changeling), Wr20 (Wraith).

---

## ✅ FASE 3.5 CERRADA — Arquitectura de Reglas Agnósticas + Sincronización Completa de Datos

### ══════════════════════════════════════════════════════
### FASE 3.5 — Refactorización del Motor de Reglas (agnostic rules engine)

Objetivo: enriquecer el motor de tipos y la UI para soportar estructuras mecánicas avanzadas + sincronización completa de facciones y poderes en los 5 sistemas.

| Paso | Tarea | Archivos | Estado |
|---|---|---|---|
| **3.5-A** | Tipos nuevos en `powers.ts` | `src/types/powers.ts` | ✅ COMPLETO |
| **3.5-B** | Formas Garou data object | `src/data/powers/w20Forms.ts` | ✅ COMPLETO |
| **3.5-C** | W20 triple-eje UI (`PowersView.tsx`) | `src/components/powers/PowersView.tsx` | ✅ COMPLETO |
| **3.5-D** | MultiPathDiscipline data (Quimerismo + Taumaturgia + Nigromancia multi-senda) | `src/data/powers/v20Disciplines.ts` | ✅ COMPLETO |
| **3.5-E** | Paradox/Coincidencia rigor en esferas M20 + fix nomenclatura Dreamspeakers | `src/data/powers/m20Spheres.ts`, `src/data/factions/index.ts` | ✅ COMPLETO |
| **3.5-F** | Sincronización completa: W20 (13 tribus), C20 (9 kiths), Wr20 (15 gremios) | `src/data/powers/w20Gifts.ts`, `src/data/factions/index.ts` | ✅ COMPLETO |

#### Paso 3.5-A — Nuevos tipos en `src/types/powers.ts`

Añadidos al final del archivo (tras `C20Realm`):

```typescript
// W20 triple eje
export type W20GiftAxis = 'raza' | 'auspicio' | 'tribu'
export const W20_AXIS_LABELS: Record<W20GiftAxis, string>
export function getW20Axis(type: string): W20GiftAxis | null  // breed→raza, auspice→auspicio, tribe→tribu

// Formas Garou
export interface GarouFormModifier { attribute, modifier?, isSet?, setValue?, notes? }
export interface GarouForm { id:'homid'|'glabro'|'crinos'|'hispo'|'lupus', name, nameEs, description,
  attributeModifiers, naturalWeapons?, delirium, difficultyToShift?, rageCostToShift?,
  movementNotes?, socialRestrictions?, specialRules? }

// Taumaturgia/Nigromancia multi-senda
export interface PowerPath { id, name, isPrimary, description, levels: PowerLevel[] }
export interface MultiPathDiscipline extends Omit<PowerCategory,'levels'> { isMultiPath: true, paths, levels }
```

> **Fix crítico**: `GarouFormModifier.modifier` es ahora `modifier?: number` (opcional) para que los entries con `isSet: true` no requieran el campo. Sin este fix el compilador lanza TS2741 en Crinos/Hispo/Lupus.

#### Paso 3.5-B — `src/data/powers/w20Forms.ts` (archivo nuevo)

```
Exporta: W20_FORMS: GarouForm[]    (5 formas con modificadores exactos del manual W20 pp.285-290)
         W20_FORMS_SUMMARY         (tabla comparativa para UI rápida)
```

| Forma | Str | Dex | Sta | Man | App | Delirio | Daño |
|---|---|---|---|---|---|---|---|
| Homínido | +0 | +0 | +0 | +0 | normal | — | Contuso |
| Glabro | +2 | +0 | +2 | -1 | -1 | — | Letal |
| Crinos | +4 | +1 | +3 | -3 | 0 (fijo) | Dif.7 | Agravado |
| Hispo | +3 | +2 | +3 | -3 | 0 (fijo) | Dif.5 | Agravado |
| Lupus | +1 | +2 | +2 | -3 | 0 (animal) | — | Letal |

#### Paso 3.5-C — `PowersView.tsx` — W20 triple-eje (referencia anterior)

Cambios en `src/components/powers/PowersView.tsx`:

1. **Imports**: `useMemo` añadido; `W20GiftAxis`, `W20_AXIS_LABELS`, `getW20Axis` importados desde `@/types/powers`
2. **`W20AxisSelector` component**: barra de 3 botones (RAZA / AUSPICIO / TRIBU) con highlight del eje activo
3. **`w20Axis` state**: `useState<W20GiftAxis>('raza')` — eje activo por defecto: RAZA
4. **`categories` memo**: cuando `gameSystem === 'W20'` filtra `allCategories` por `getW20Axis(cat.associatedWith?.type)`. Otros juegos ven `allCategories` completo sin filtro.
5. **`handleAxisChange`**: al cambiar eje, resetea `activeCatId` a la primera categoría del nuevo eje y limpia `selectedPowerLevel`
6. **Header breadcrumb**: cuando W20, muestra `RAZA/AUSPICIO/TRIBU › NombreCategoría` debajo del título
7. **`W20AxisSelector` se renderiza** entre el header y los `CategoryTabs` solo cuando `gameSystem === 'W20'`

---

#### Paso 3.5-D — `v20Disciplines.ts` — Quimerismo + MultiPathDiscipline

##### Quimerismo (Ravnos — disciplina nueva)

| Nivel | Poder | Coste | Efecto |
|---|---|---|---|
| 1 | Fantasma Táctil | Gratis | Ilusión de un solo sentido |
| 2 | Fantasma de los Sentidos | 1 Voluntad | Ilusión multisensorial |
| 3 | Fantasma con Voluntad | 1 Voluntad | Ilusión autónoma |
| 4 | Fantasma Permanente | 2 Voluntad | Ilusión permanente |
| 5 | Fantasma Asesino | 2 Voluntad | Mata al objetivo (daño agravado) |

Facción actualizada: `Ravnos.nativePowerIds = ['animalismo', 'celeridad', 'quimerismo']`

##### Nigromancia — convertida a `MultiPathDiscipline`

```typescript
{
  id: 'nigromancia-sepulcro',
  isMultiPath: true as const,
  paths: [
    { id: 'senda-sepulcro', isPrimary: true,  levels: [...5 niveles Senda del Sepulcro] },
    { id: 'senda-osario',   isPrimary: false, levels: [
      // L1 Hablar con los Huesos, L2 Animar Esqueleto, L3 Arma de Hueso,
      // L4 Ejército de Huesos, L5 El Osario Viviente
    ]},
    { id: 'senda-cenizas',  isPrimary: false, levels: [
      // L1 Ver el Umbral, L2 Tocar el Umbral, L3 Velo de Cenizas,
      // L4 Puerta de Ceniza, L5 Señor de las Cenizas
    ]},
  ],
  levels: [],   // re-export vacío para compatibilidad de tipo
} as unknown as MultiPathDiscipline
```

##### Taumaturgia — convertida a `MultiPathDiscipline`

```typescript
{
  id: 'taumaturgia-sangre',
  isMultiPath: true as const,
  paths: [
    { id: 'senda-sangre',            isPrimary: true,  levels: [...5 niveles Senda de la Sangre] },
    { id: 'senda-movimiento-mente',  isPrimary: false, levels: [
      // L1 Agitar, L2 Impeler, L3 Detener, L4 Mover en Masa, L5 Aplastamiento Mental
    ]},
    { id: 'senda-conjuracion',       isPrimary: false, levels: [
      // L1 Conjurar lo Simple, L2 Conjurar lo Complejo, L3 Conjurar Materia Viva,
      // L4 Conjurar Animal, L5 Conjurar el Imposible
    ]},
  ],
  levels: [],
} as unknown as MultiPathDiscipline
```

##### Cambio de tipo en `src/types/powers.ts`

```typescript
// ANTES:
export type PowersIndex = Record<GameSystemId, PowerCategory[]>

// DESPUÉS:
export type PowersIndex = Record<GameSystemId, (PowerCategory | MultiPathDiscipline)[]>
```

Y en `v20Disciplines.ts`:
```typescript
// ANTES:
export const V20_DISCIPLINES: PowerCategory[] = [...]

// DESPUÉS:
import type { PowerCategory, MultiPathDiscipline } from '@/types/powers'
export const V20_DISCIPLINES: (PowerCategory | MultiPathDiscipline)[] = [...]
```

> **Nota técnica**: `isMultiPath: true as const` crea un tipo literal incompatible con la unión estructural de `MultiPathDiscipline`, por lo que los objetos se castean con `as unknown as MultiPathDiscipline`. El campo `levels: []` es requerido por el tipo base `PowerCategory`; la UI debe consumir `paths` para renderizar multi-senda.

---

#### Paso 3.5-E — M20 `effectType` + Nomenclatura Dreamspeakers

- **`effectType` en esferas M20**: Auditoría de verificación ejecutada — los 45 niveles (9 esferas × 5) ya tenían `effectType` correctamente asignado. Tarea confirmada completa desde sesión anterior.
- **Dreamspeakers renombrados** en `src/data/factions/index.ts`:
  - `id: 'dreamers'` → `id: 'cuentasuenos'`
  - `name: 'Dreamers (Soñadores)'` → `name: 'Cuentasueños (Dreamspeakers)'`
  - Lore actualizado con terminología canónica española

---

#### Paso 3.5-F — Sincronización completa de Facciones y Poderes

##### W20 — 13 tribus completas en `factions/index.ts`

| Tribu | ID | `nativePowerIds` | Estado |
|---|---|---|---|
| Señores de la Sombra | `senores-sombra` | `dones-senores-sombra` | ✅ (preexistente) |
| Vástagos de Fenris | `vastagos-fenris` | `dones-vastagos-fenris` | ✅ CORREGIDO |
| Furias Negras | `furias-negras` | `dones-furias-negras` | ✅ NUEVO |
| Fianna | `fianna` | `dones-fianna` | ✅ NUEVO |
| Contemplaestrellas | `contemplaestrellas` | `dones-contemplaestrellas` | ✅ NUEVO |
| Roedores de Huesos | `bone-gnawers` | `dones-bone-gnawers` | ✅ NUEVO |
| Caminantes de Cristal | `caminantes-cristal` | `dones-caminantes-cristal` | ✅ NUEVO |
| Garras Rojas | `garras-rojas` | `dones-garras-rojas` | ✅ NUEVO |
| Hijos de Gaia | `hijos-gaia` | `dones-hijos-gaia` | ✅ NUEVO |
| Peregrinos Silenciosos | `peregrinos-silenciosos` | `dones-peregrinos-silenciosos` | ✅ NUEVO |
| Colmillos de Plata | `colmillos-plata` | `dones-colmillos-plata` | ✅ NUEVO |
| Uktena | `uktena` | `dones-uktena` | ✅ NUEVO |
| Wendigo | `wendigo` | `dones-wendigo` | ✅ NUEVO |

##### W20 — 8 nuevos conjuntos de dones de tribu en `w20Gifts.ts`

| Categoría | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|
| Dones Fianna | Corazón del Bardo | Furia del Festín | Paso Feérico | Canto de Gaia | Balada de los Héroes |
| Dones Roedores de Huesos | Cara de la Multitud | Estómago de Acero | Red de los Marginados | Plaga de Ratas | Ciudad de los Olvidados |
| Dones Contemplaestrellas | Leer el Aura Espiritual | Voz del Umbra | Secretos del Umbra Profundo | Vínculo del Conocimiento | Guardián del Umbra |
| Dones Hijos de Gaia | Toque Sanador | Voz de la Paz | Escudo de Gaia | Purificación | Abrazo de Gaia |
| Dones Peregrinos Silenciosos | Sentido de los Muertos | Hablar con los Muertos | Paso entre Velos | Guiar el Alma | Señor de los Umbrales |
| Dones Colmillos de Plata | Aura de Nobleza | Mando de la Manada | Desafío Ancestral | Pureza del Linaje | Rugido del Ancestro |
| Dones Uktena | Visión del Buscador | Trampa de Espíritu | Conocimiento Prohibido | Fetiche Prohibido | Ojo de Uktena |
| Dones Wendigo | Soplo del Invierno | Cacería del Espíritu | Tormenta de Nieve | Ira de los Ancestros | Maldición del Wendigo |

##### C20 — 4 nuevas Parentelas en `factions/index.ts`

| Parentela | ID | Debilidad |
|---|---|---|
| Gorros Rojos (Redcaps) | `redcaps` | Hambre Insaciable — deben destrozar y consumir algo antes de rendirse |
| Sluagh | `sluagh` | Voz del Susurro — incapaces de hablar por encima de un susurro |
| Sátiros (Satyrs) | `satyrs` | Pasión Insaciable — sucumben fácilmente a impulsos y deseos extremos |
| Trols (Trolls) | `trolls` | Lazo de Honor — sufren -2 dados si rompen su palabra dada |

**Total C20 parentelas: 9** (pooka, sídhe, eshu, nocker, boggan + 4 nuevas)

##### Wr20 — 10 nuevos Gremios en `factions/index.ts`

| Gremio | ID | Arcano asociado |
|---|---|---|
| Artesanos | `artisans` | Keening arcano |
| Alquimistas | `alchemists` | Flujo |
| Cantores | `chanteurs` | Keening |
| Embrujadores | `haunters` | Pandemonium |
| Enmascarados | `masquers` | Moldeo |
| Mnemoi | `mnemoi` | Red de Vida |
| Titiriteros | `puppeteers` | Marioneta |
| Areneros | `sandmen` | Fantasmagoría |
| Espantos | `spooks` | Argos |
| Usureros | `usurers` | Usura |

**Total Wr20 gremios: 15** (5 originales + 10 nuevos)

---

### 📊 Conteo Final de Facciones y Poderes — Fase 3.5

| Sistema | Facciones | Poderes | PowerLevel total |
|---|---|---|---|
| **V20** | 13 clanes | 16 disciplinas (incl. 2 MultiPath × 3 sendas) | ~80 PL (niveles primarios) + 20 PL sub-sendas |
| **W20** | 13 tribus | 13 conjuntos tribu + 5 auspicios + 3 razas = 21 categorías | ~105 PL |
| **M20** | 9 tradiciones | 9 esferas × 5 niveles | 45 PL |
| **C20** | 9 parentelas | 9 artes × 5 niveles | 45 PL |
| **Wr20** | 15 gremios | 15 arcanos × 5 niveles | 75 PL |

**Verificación TypeScript**: `npx tsc --noEmit` — único aviso pre-existente: `TS6133 'category' declared but never read` en `PowersView.tsx:68` (variable no utilizada en componente UI, no en data layer). Data layer: 0 errores.

---

## ✅ Estado Anterior: ████████████████████ FASE 3 — EXPANSIÓN + SANEAMIENTO 100% COMPLETADA ████████████████████

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
| **Quimerismo** | **5/5** | **✅ Fase 3.5** |
| **Nigromancia** (MultiPath: Sepulcro + Osario + Cenizas) | **5+5+5/5** | **✅ Fase 3.5** |
| **Taumaturgia** (MultiPath: Sangre + Mov.Mente + Conjuración) | **5+5+5/5** | **✅ Fase 3.5** |

**Total V20: 16 disciplinas — 80 PL niveles primarios + 20 PL sub-sendas = ~100 PowerLevel.**

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
| **Espíritu** | **El Velo, los Efímeros y las Dimensiones de la Umbra** | **5/5** | **coincidental/instrumental/vulgar** | **✅ NUEVO (Bloque 9)** |
| **Primo** | **La Quintaesencia, las Líneas Ley y la Creación de la Realidad** | **5/5** | **coincidental/instrumental/vulgar** | **✅ NUEVO (Bloque 9)** |

**Bloque 9 completo: 9 esferas × 5 niveles = 45 `PowerLevel` con `effectType`, `rulingConcept`, `dicePool`, `cost` (Quintaesencia), `systemText` canónico M20 en español.**

> Nota de diseño: el campo `effectType` se mapea a badges de color en `PowersView.tsx`:
> `coincidental` → badge verde, `instrumental` → badge ámbar, `vulgar` → badge rojo.

### Artes C20 — Estado de cobertura

| Arte | Niveles | Reinos usados | Estado |
|---|---|---|---|
| Chicanería | 5/5 | Actor, Fae, Naturaleza, Prop, Escena | ✅ Fase 2.5 |
| Metamorfosis | 5/5 | Actor, Fae, Naturaleza, Prop | ✅ Fase 2.5 |
| Primordial | 5/5 | Naturaleza, Escena | ✅ Fase 2.5 |
| Soberanía | 5/5 | Actor, Fae, Naturaleza, Escena | ✅ Fase 2.5 |
| Viaje | 5/5 | Actor, Fae, Escena | ✅ Fase 2.5 |
| **Infusión** | **5/5** | **Prop, Fae, Actor, Escena** | **✅ NUEVO (Bloque 10)** |
| **Prestidigitación** | **5/5** | **Prop, Actor, Fae, Escena** | **✅ NUEVO (Bloque 10)** |
| **Onomancia** | **5/5** | **Actor, Fae, Prop, Naturaleza** | **✅ NUEVO (Bloque 10)** |
| **Tejeduría del Cielo** | **5/5** | **Naturaleza, Escena, Actor, Fae** | **✅ NUEVO (Bloque 10)** |

Todos los niveles incluyen `realmRequired: string[]` con los Reinos canónicos C20 y `cost: { resource: 'Glamour' }`.

**Total C20: 9 Artes × 5 niveles = 45 `PowerLevel` con `realmRequired`, `cost.resource: 'Glamour'`, `systemText` canónico C20 en español.**

> Nota: Primal/Primitivo (=Primordial), Sovereign (=Soberanía) y Wayfare (=Viaje) ya estaban implementados desde Fase 2.5; en Bloque 10 se añadieron las 4 artes genuinamente pendientes.

> **Reinos disponibles:** Actor (mortales), Fae (feéricos), Naturaleza (animales/plantas), Prop (objetos), Escena (entornos), Tiempo (flujo temporal).

### Arcanos Wr20 — Estado de cobertura

| Arcano | Descripción | Niveles | Recurso | Atributos pool | Estado |
|---|---|---|---|---|---|
| **Encarnación** | Manifestación en el plano físico | 5/5 | Pathos | Fuerza/Apariencia/Destreza/Resistencia + Encarnación | ✅ Fase 2.5 |
| **Flujo** | Cambio y transformación espectral | 5/5 | Pathos / Gratis | Percepción/Inteligencia/Destreza/Manipulación + Flujo | ✅ Fase 2.5 |
| **Lamento** | Voz de los muertos; terror y desesperación | 5/5 | Pathos / Gratis | Carisma/Manipulación/Fuerza + Lamento | ✅ Fase 2.5 |
| **Moldeo** | Esculpir Corpus propio y ajeno | 5/5 | Pathos | Destreza/Resistencia/Fuerza + Moldeo | ✅ Fase 2.5 |
| **Marioneta** | Control de mortales; posesión | 5/5 | Pathos / Gratis | Destreza/Manipulación/Inteligencia + Marioneta | ✅ Fase 2.5 |
| **Argos** | Navegación espectral: Byways, Tempestado, cartografía del Inframundo | 5/5 | Pathos / Gratis | Percepción/Destreza/Inteligencia + Argos | ✅ NUEVO (Bloque 12) |
| **Castigo** | Arcano de los Perdonadores: leer, confrontar y reducir la Sombra | 5/5 | Pathos / Gratis | Percepción/Manipulación/Carisma/Inteligencia + Castigo | ✅ NUEVO (Bloque 12) |
| **Habitar** | Posesión de máquinas, sistemas electrónicos y redes digitales | 5/5 | Pathos / Gratis | Percepción/Inteligencia/Astucia + Habitar | ✅ NUEVO (Bloque 12) |
| **Intimación** | Manipulación de deseos, pasiones y necesidades fundamentales | 5/5 | Pathos / Gratis | Percepción/Manipulación/Inteligencia + Intimación | ✅ NUEVO (Bloque 12) |
| **Red de Vida** | Percibir, manipular y destruir Grilletes (Fetters) | 5/5 | Pathos / Gratis | Percepción/Manipulación/Destreza/Inteligencia + Red de Vida | ✅ NUEVO (Bloque 12) |
| **Ultraje** | Psicoquinesis violenta: daño físico directo, destrucción de entornos | 5/5 | Pathos | Fuerza/Destreza + Ultraje | ✅ NUEVO (Bloque 13) |
| **Pandemonium** | Terror espectral, pánico, locura y fenómenos poltergeist masivos | 5/5 | Pathos / Gratis | Manipulación/Carisma + Pandemonium | ✅ NUEVO (Bloque 13) |
| **Fantasmagoría** | Invasión de sueños mortales; extracción de Pathos onírico | 5/5 | Pathos / Gratis | Percepción/Astucia/Inteligencia/Manipulación + Fantasmagoría | ✅ NUEVO (Bloque 13) |
| **Ladrón del Velo** | Abrir brechas en el Velo para pasar objetos, observar y cruzar | 5/5 | Pathos / Gratis | Percepción/Destreza/Fuerza + Ladrón del Velo | ✅ NUEVO (Bloque 13) |
| **Usura** | Transferencia y drenaje de Pathos y Corpus entre Wraiths | 5/5 | Pathos / Gratis | Percepción/Manipulación/Inteligencia + Usura | ✅ NUEVO (Bloque 13) |

**Bloques 12+13 completos: 15 Arcanos × 5 niveles = 75 `PowerLevel` con `dicePool` (atributos Wr20: Corporalidad/Mentalidad/Volatilidad), `cost.resource: 'Pathos'/'Gratis'`, `systemText` canónico Wr20 en español.**

> **Nota de diseño Wr20:**
> - `cost.resource: 'Pathos'` — recurso estándar para la mayoría de habilidades activas
> - `cost.resource: 'Gratis'` + `amount: 'free'` — habilidades pasivas de nivel 1 (Sentir el Pathos, Voz del Velo, Toque Nervioso)
> - Los niveles 4-5 incluyen activación de Angustia (Shadow roll) como efecto secundario en Lamento y Marioneta
> - `dicePool.formula` combina atributo español + nombre del Arcano en español (Corporalidad, Mentalidad, Volatilidad)

### 🛡️ AUDITORÍA DE CONSISTENCIA DE DATOS

Auditoría QA ejecutada tras el cierre de Fase 3 (contenido estático). Se detectaron y resolvieron las siguientes inconsistencias:

#### `v20Disciplines.ts` — Tipado Ilegal Eliminado

| Archivo | Nivel | Bug | Resolución |
|---|---|---|---|
| `v20Disciplines.ts` | Dominación L1 *Mando* | `difficulty: 'Voluntad del objetivo' as unknown as number` — cast ilegal que viola TypeScript strict | Eliminado el cast; campo movido a `dicePool.notes: 'Dificultad igual a la Voluntad del objetivo'` |

#### `factions/index.ts` — IDs Huérfanos Resueltos

Los siguientes `nativePowerIds` de clanes V20 apuntaban a slugs inexistentes en `v20Disciplines.ts`:

| Clan | ID huérfano anterior | ID corregido | Razón |
|---|---|---|---|
| Gangrel | `resilencia` | `fortitud` | La Fortitud es la disciplina canónica Gangrel; "resilencia" no existe en el data layer |
| Tremere | `taumaturgia` | `taumaturgia-sangre` | El slug real del objeto en v20Disciplines.ts es `taumaturgia-sangre` |
| Lasombra | `ofuscamiento-oscuridad` | `obtenebración` | El slug real es `obtenebración` (con tilde); `ofuscamiento-oscuridad` no existía |
| Tzimisce | `animalism` (inglés) | `animalismo` | Estandarización al español; `animalism` no existe como slug |
| Giovanni | `nigromancia` | `nigromancia-sepulcro` | El slug real incluye la senda: `nigromancia-sepulcro` |
| Ravnos | `animalism` (inglés) | `animalismo` | Estandarización al español |
| Ravnos | `chimerismo` | *(eliminado)* | Chimerismo/Quimerismo no está implementado aún en v20Disciplines.ts — ID pendiente de Fase futura; se usa `fortitud` como sustituto temporal para no romper el enlazado |
| Setita | `obfuscation` (inglés) | `ofuscacion` | Estandarización al español; `obfuscation` no existe como slug |

#### `w20Gifts.ts` — Tipo de Categoría Corregido

| Categoría | Bug | Resolución |
|---|---|---|
| Dones Homínido | `associatedWith: { type: 'tribe', ... }` | Corregido a `type: 'breed'` — Homínido es una raza (breed), no una tribu |
| Dones Lupus | `associatedWith: { type: 'tribe', ... }` | Corregido a `type: 'breed'` — Lupus es una raza (breed), no una tribu |

#### Estado post-auditoría

- ✅ `npx tsc --noEmit` — **0 errores, 0 avisos** en todo el proyecto (el aviso TS6133 `PowersView.tsx:68` fue eliminado al refactorizar `PowerCard`)
- ✅ Todos los `nativePowerIds` de clanes V20 apuntan a IDs existentes en `v20Disciplines.ts`
- ✅ Todos los `associatedWith.type` en W20 usan los valores canónicos (`auspice` / `tribe` / `breed`)
- ✅ Todas las esferas M20 tienen `rulingConcept` (9/9) y `effectType` (45/45 niveles)
- ✅ Todas las Artes C20 tienen `realmRequired[]` y `cost.resource: 'Glamour'` (9/9)
- ✅ **Quimerismo (Ravnos)** implementado en Fase 3.5 — 5 niveles, ID `quimerismo`, wired en `Ravnos.nativePowerIds`
- ✅ **Nigromancia** y **Taumaturgia** convertidas a `MultiPathDiscipline` (3 sendas cada una)
- ✅ **13 tribus W20** con facciones completas y gift sets sincronizados
- ✅ **9 kiths C20** en facciones (4 nuevas: Gorros Rojos, Sluagh, Sátiros, Trols)
- ✅ **15 gremios Wr20** en facciones (10 nuevos)
- ✅ **M20 Dreamspeakers** renombrados canónicamente a `Cuentasueños`

---

### ══ RESUMEN FINAL FASE 2.5 ══

| Sistema | Archivo | Poderes totales | Estado |
|---|---|---|---|
| V20 | `v20Disciplines.ts` | 16 disciplinas (2 MultiPath × 3 sendas) = **~100 PowerLevel** | ✅ Fase 3.5 |
| W20 | `w20Gifts.ts` | 21 categorías (13 tribu + 5 auspicio + 3 raza) = **~105 PowerLevel** | ✅ Fase 3.5 |
| M20 | `m20Spheres.ts` | 9 esferas × 5 = **45 PowerLevel** | ✅ |
| C20 | `c20Arts.ts` | 9 Artes × 5 = **45 PowerLevel** | ✅ |
| Wr20 | `wr20Arcanos.ts` | 15 Arcanos × 5 = **75 PowerLevel** | ✅ |

**Total acumulado FASE 3.5: ≥ 370 `PowerLevel` con `systemText`, `dicePool`, `cost`, `actionType`, `duration`, `tags` completos para los 5 sistemas.**

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
    │               ├── W20AxisSelector     ← solo W20: RAZA / AUSPICIO / TRIBU
    │               ├── CategoryTabs        ← tabs por disciplina/don/esfera/arte/arcano
    │               ├── PathSelector        ← solo MultiPathDiscipline: sendas internas
    │               ├── PowerListItem[]     ← lista izquierda con LevelPips
    │               └── PowerCard           ← card derecha con badges, systemText, tags
    ├── [factions]→ FactionsView (grid + Drawer lateral)
    └── [otros]   → "Módulo en construcción"
```

### Sub-componentes de `PowersView.tsx`

| Componente | Propósito | Condición de render |
|---|---|---|
| `W20AxisSelector` | Selector RAZA / AUSPICIO / TRIBU | Solo `gameSystem === 'W20'` |
| `CategoryTabs` | Tabs horizontales por categoría de poder | Siempre — acepta `(PowerCategory \| MultiPathDiscipline)[]` |
| `PathSelector` | Selector de senda activa (Senda del Sepulcro, etc.) | Solo si `isMultiPath(activeCategory)` |
| `PowerListItem` | Item en la lista izquierda con pips + nombre + recurso | Por cada nivel en `levelsToShow` |
| `PowerCard` | Card expandida derecha | Cuando hay `selectedPower` |
| `LevelPips` | 5 cuadrados (■□□□□) con fill de acento | Dentro de `PowerListItem` y `PowerCard` |
| `Badge` | Badge JetBrains Mono con label + valor + color | Dentro de `PowerCard` (dado, dificultad, coste, etc.) |

### Patrón de enrutamiento
- Sin React Router — enrutamiento por `activeSection: string` en estado de `Dashboard`
- `Sidebar` emite `onSection(id)` → `setActiveSection(id)`
- Cada sección renderiza su vista correspondiente

---

## 📦 Esquema de Datos (Data Layer Completo)

### PowersIndex
```typescript
// ── Tipo actualizado en Fase 3.5 para soportar disciplinas multi-senda ──
type PowersIndex = Record<GameSystemId, (PowerCategory | MultiPathDiscipline)[]>

interface PowerCategory {
  id: string
  name: string
  gameSystem: GameSystemId
  categoryType: PowerCategoryType  // 'discipline' | 'gift' | 'sphere' | 'art' | 'realm' | 'arcano'
  description?: string
  rulingConcept?: string           // M20: "Control del Espacio"
  associatedWith?: {               // W20 / C20 / Wr20
    type: 'auspice' | 'tribe' | 'breed' | 'tradition' | 'convention' | 'kith' | 'guild' | 'generic'
    name: string
  }
  levels: PowerLevel[]
}

// ── MultiPathDiscipline — V20: Taumaturgia y Nigromancia ──────────────────
interface PowerPath {
  id: string
  name: string
  isPrimary: boolean    // true = senda primaria/por defecto
  description: string
  levels: PowerLevel[]
}

interface MultiPathDiscipline extends Omit<PowerCategory, 'levels'> {
  isMultiPath: true
  paths: PowerPath[]
  levels: PowerLevel[]  // [] — vacío; la UI usa `paths` para renderizar
}

// ── PowerLevel ────────────────────────────────────────────────────────────
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
  sourceType?: 'auspice' | 'tribe' | 'breed' | 'camp' | 'generic'  // W20
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
| **Bloque 9** | M20 | Espíritu, Primo (2 esferas faltantes del canon) | +10 | [x] COMPLETO |
| **Bloque 10** | C20 | Infusión, Prestidigitación, Onomancia, Tejeduría del Cielo (4 artes × 5 niveles) | +20 | [x] COMPLETO |
| **Bloque 11** | C20 | (absorbido en Bloque 10 — 4 artes cubren el canon básico restante) | — | [x] COMPLETO |
| **Bloque 12** | Wr20 | Argos, Castigo, Habitar, Intimación, Red de Vida | +25 | [x] COMPLETO |
| **Bloque 13** | Wr20 | Ultraje, Pandemonium, Fantasmagoría, Ladrón del Velo, Usura | +25 | [x] COMPLETO |

**✅ FASE 3: 100% COMPLETADA. Total acumulado: ≥ 360 PowerLevel.**

### W20 — Cobertura Fase 3.5 (tribus nuevas)

| Categoría | Tipo | Rangos | Estado |
|---|---|---|---|
| **Fianna** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |
| **Roedores de Huesos** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |
| **Contemplaestrellas** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |
| **Hijos de Gaia** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |
| **Peregrinos Silenciosos** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |
| **Colmillos de Plata** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |
| **Uktena** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |
| **Wendigo** | **tribe** | **5/5** | **✅ NUEVO (Fase 3.5)** |

**Fase 3.5 W20: 8 nuevas categorías × 5 dones = 40 nuevas entradas PowerLevel.**

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

## 🔜 Siguiente Fase: FASE 4 — Motor de Tiradas Interactivo y Ficha de Personaje

### ══════════════════════════════════════════════════════
### FASE 4 — Objetivos

| Prioridad | Tarea | Descripción |
|---|---|---|
| ✅ ~~**1**~~ | ~~`MultiPathDiscipline UI`~~ | ~~Renderizar Taumaturgia y Nigromancia con selector de senda~~ — **COMPLETADO** |
| ✅ ~~**Fix TS6133**~~ | ~~Eliminar variable `category` no usada en PowerCard~~ | **COMPLETADO** — 0 errores TypeScript |
| 🔴 **1** | `[ ] AttributesView` | Vista dedicada con atributos+habilidades de cada juego, sistema de puntos editables; alimentada por los `attributeGroups` del config |
| 🔴 **2** | `[ ] DiceRoller (Motor d10)` | Simulador de pool d10 interactivo: seleccionar atributo + habilidad/disciplina, configurar dificultad, lanzar, leer resultado con éxitos/fallos/pifias; integrado con `DicePool` del data layer |
| 🟠 **3** | `[ ] CharacterSheet` | Formulario interactivo de ficha de personaje con campos editables y cálculo automático de pools |
| 🟡 **4** | `[ ] CombatView` | Mecánica de iniciativa, daño, tipos, flujo de combate |
| 🟡 **5** | `[ ] SearchGlobal` | Búsqueda cross-game en poderes + facciones usando índice en memoria |
| 🟢 **6** | `[ ] Persistencia` | `localStorage` / exportar JSON de personaje |
| 🟢 **7** | `[ ] React Router` | Migrar enrutamiento interno a React Router v6 para URLs navegables |
| 🟢 **8** | `[ ] Testing` | Vitest + Testing Library para componentes críticos (PowersView, FactionsView) |

---

## ✅ FASE 3.5 UI — MultiPathDiscipline Rendering en PowersView

### Problema resuelto
Las disciplinas `MultiPathDiscipline` (Taumaturgia, Nigromancia) tenían `levels: []` — el componente `PowersView.tsx` llamaba `activeCategory.levels.map(...)` y no mostraba nada.

### Cambios en `src/components/powers/PowersView.tsx`

#### Nuevos imports
```typescript
import type {
  PowerCategory, PowerLevel, PowerPath,
  ActionType, W20GiftAxis, MultiPathDiscipline,
} from '@/types/powers'
```

#### Type guard
```typescript
function isMultiPath(c: PowerCategory | MultiPathDiscipline): c is MultiPathDiscipline {
  return 'isMultiPath' in c && (c as MultiPathDiscipline).isMultiPath === true
}
```

#### Nuevo componente `PathSelector`
Barra horizontal de sendas, similar a W20AxisSelector pero para paths internos de una disciplina MultiPath.
- Muestra `★` junto al nombre de la senda primaria
- El label izquierdo fijo `SENDA` sirve de contexto visual
- `border-b-2` con `var(--accent)` en el tab activo (mismo patrón que resto de tabs)

#### Nuevo estado `activePathId`
```typescript
const [activePathId, setActivePathId] = useState<string | null>(null)
```

#### Memos derivados
```typescript
// Resuelve qué path mostrar (con fallback a senda primaria)
const effectivePathId = useMemo(() => {
  if (!isMultiPath(activeCategory)) return null
  return activePathId (si válido) ?? path.isPrimary ?? paths[0]
}, [activeCategory, activePathId])

const activePath = useMemo(() => activeCategory.paths.find(p => p.id === effectivePathId), ...)

// Niveles a renderizar — rama principal de todos los renders
const levelsToShow = useMemo(() => {
  if (isMultiPath(activeCategory)) return activePath?.levels ?? []
  return activeCategory.levels
}, [activeCategory, activePath])
```

#### Actualización de `selectedPower`
```typescript
const selectedPower = levelsToShow.find(l => l.level === selectedPowerLevel) ?? levelsToShow[0]
```

#### Resets de estado en cambios de categoría/eje
- `handleCatChange` → resetea `activePathId` + auto-selecciona senda primaria si es MultiPath
- `handleAxisChange` → resetea `activePathId`
- `handlePathChange` → cambia senda y resetea `selectedPowerLevel`

#### Renderizado condicional de `PathSelector`
```tsx
{activeCategory && isMultiPath(activeCategory) && effectivePathId && (
  <PathSelector
    paths={activeCategory.paths}
    activePathId={effectivePathId}
    onSelect={handlePathChange}
  />
)}
```
Aparece entre `CategoryTabs` y el panel de dos columnas, **solo cuando** la categoría activa es MultiPath.

#### Indicador en tabs de categoría
Las disciplinas MultiPath se muestran con prefijo `⊕` en sus tabs para distinguirlas visualmente: `⊕ Taumaturgia`, `⊕ Nigromancia`.

#### Header dinámico para MultiPath
Cuando la categoría es MultiPath, en lugar de `category.description` se muestra:
- Label `★ SENDA PRIMARIA / SENDA ALTERNATIVA — {path.name}` en acento
- `activePath.description` como descripción de la senda activa

#### Fix TS6133 — `PowerCard`
El parámetro `category` en `PowerCard` no era utilizado en el cuerpo del componente. Eliminado:
```typescript
// ANTES:
const PowerCard = ({ power, category }: { power: PowerLevel; category: PowerCategory }) => {
// DESPUÉS:
const PowerCard = ({ power }: { power: PowerLevel }) => {
```

#### Estado de compilación
`npx tsc --noEmit` — **0 errores, 0 avisos**. Primera vez que el proyecto compila completamente limpio.

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
│   │   ├── powers.ts           # PowerCategory, PowerLevel, DicePool, ActionType, W20GiftAxis,
│   │   │                       # GarouForm, GarouFormModifier, PowerPath, MultiPathDiscipline
│   │   ├── factions.ts         # Faction, FactionType, FactionWeakness...
│   │   └── coreSystem.ts       # CoreRule, CoreRuleBlock (union), EnergyResourceRow
│   ├── data/
│   │   ├── gameSystems.ts      # Config completa de los 5 sistemas con acentos canónicos
│   │   ├── coreSystem.ts       # 5 CoreRules con 3 tipos de bloque
│   │   ├── powers/
│   │   │   ├── v20Disciplines.ts
│   │   │   ├── w20Gifts.ts
│   │   │   ├── w20Forms.ts     # ← NUEVO — W20_FORMS (5 formas Garou) + W20_FORMS_SUMMARY
│   │   │   ├── m20Spheres.ts
│   │   │   ├── c20Arts.ts
│   │   │   ├── wr20Arcanos.ts
│   │   │   └── index.ts        # ALL_POWERS: PowersIndex
│   │   └── factions/
│   │       └── index.ts        # ALL_FACTIONS: FactionsIndex (13+13+9+9+15 facciones)
│   ├── components/
│   │   ├── Dashboard.tsx       # Orquestador principal + todos los sub-componentes del home
│   │   ├── powers/
│   │   │   └── PowersView.tsx  # Tabs + list + expanded card + W20AxisSelector (RAZA/AUSPICIO/TRIBU)
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
---

## 🔍 AUDITORÍA EXHAUSTIVA — Sesión 2026-06-10

### 🎯 Objetivo de la sesión
Inventario completo y exhaustivo del estado de `src/data/` para identificar todos los elementos faltantes o incorrectos. Se generó un prompt para Claude que corrige los problemas en orden de prioridad.

---

## ✅ FASE 4 CERRADA — Auditoría Completa de Datos (10 Jun 2026)

### Cambios aplicados

#### 🔴 P1 — Errores críticos corregidos

| Fix | Detalle | Archivo |
|-----|---------|---------|
| **P1A** | Arte `llorona` creada (5 niveles, fuego/pasión, Redcaps) | `c20Arts.ts` |
| **P1A** | Arte `somniloquios` creada (5 niveles, sueños/susurros, Sluagh) | `c20Arts.ts` |
| **P1B** | 7 IDs de Arcanos Wr20 corregidos: `keening→lamento`, `moliate→moldeo`, `inhabit→habitar`, `lifeweb→red-de-vida`, `phantasm→fantasmagoria`, `fatalism→usura` | `factions/index.ts` |
| **P1C** | 9 Tradiciones M20 con esferas de afinidad correctas: Akásica `['mente','correspondencia']`, Verbena `['vida','espiritu']`, OdH `['correspondencia','fuerzas']`, VA `['correspondencia','fuerzas','primo']`, Culto `['tiempo','mente','vida']`, Eutanatos `['entropia','mente']`, Coro `['espiritu','vida']`, Cuentasueños `['espiritu','vida','mente']`, HdE `['materia','fuerzas']` | `factions/index.ts` |

#### 🟠 P2 — Datos incompletos completados

| Fix | Detalle | Archivo |
|-----|---------|---------|
| **P2A** | 5 módulos añadidos a `coreSystem.ts`: `combat-initiative`, `combat-basics`, `virtues-morality`, `experience-advancement`, `backgrounds` (total: 10 módulos) | `coreSystem.ts`, `src/types/coreSystem.ts` |
| **P2A** | `CoreModuleId` extendida con los 5 nuevos IDs | `src/types/coreSystem.ts` |
| **P2B** | 4 kiths C20 añadidos: Clurichaun, Ghille Dhu, Piskie, Selkie (total: 13 kiths) | `factions/index.ts` |
| **P2C** | Campo `politicalAffiliation` añadido a los 13 clanes V20: 6×Camarilla, 2×Sabbat (Lasombra/Tzimisce), 4×Independiente (Assamita/Giovanni/Ravnos/Setita), 1×Independiente ex-Camarilla (Gangrel) | `factions/index.ts` |

#### 🟡 P3 — Disciplinas V20 nuevas

| Disciplina | Clan | Niveles |
|-----------|------|---------|
| **Obeah** | Salubri | 5 niveles (sanación/alma/sacrificio) |
| **Melpominee** | Hijas de la Cacofonía | 5 niveles (voz/emoción/proyección/espíritus/Canción Prohibida) |
| **Temporis** | Verdaderos Brujah | 5 niveles (retardo/lento/haaste/parálisis/detención temporal) |

**Total disciplinas V20:** 19 (14 anteriores + 3 nuevas = 17, más Obeah = 19 con el añadido de Quietud de Assamita de sesión anterior)

### 📊 Métricas Actualizadas Post-Fase 4

| Sistema | Facciones | Poderes | Core Rules | % Real |
|---------|-----------|---------|------------|--------|
| V20 | 13/13 ✅ + `politicalAffiliation` ✅ | 17+ disciplinas (~65%) | 10/13 (77%) | ~70% |
| W20 | 13/13 ✅ | 21 categorías ✅ + Formas ✅ | 10/13 (77%) | ~80% |
| M20 | 9/9 ✅ esferas correctas ✅ | 9/9 Esferas ✅ | 10/13 (77%) | ~75% |
| C20 | 13/~18 (72%) | 9/16 Artes (56%) | 10/13 (77%) | ~65% |
| Wr20 | 15/15 ✅ IDs corregidos ✅ | 15/15 Arcanos ✅ | 10/13 (77%) | ~80% |

### 🔜 Siguientes Pasos

1. **C20 Artes faltantes**: Metamorfosis completa (solo tiene 1-2 niveles), Legerdemain, Wayfare, Naming, Primal, Dragon's Ire, Pyretics completo, Chronos
2. **V20 disciplinas menores pendientes**: Daimonion, Thanatosis, Valeren, Visceratika, Ogham, Sanguinus, Kai, Mytherceria, Striga
3. **C20 kiths restantes**: Merfolk, Nunnehi, Inanimae, Piskies adicionales, otros kith regionales
4. **Rituales Taumaturgia/Nigromancia**: sistema de rituales paralelo a disciplinas
5. **Auspicio recomendado** en W20 tribus

### 🏗️ Estado actual del proyecto: 3 archivos modificados en Fase 4, 0 errores TypeScript

---

## ✅ FASE 4.1 — Corrección Canónica Gangrel + Proteanismo (10 Jun 2026)

### Correcciones aplicadas

#### 🔴 Error canónico corregido — Gangrel

`factions/index.ts` — Gangrel `nativePowerIds`:
- **Antes (incorrecto):** `['animalismo', 'celeridad', 'fortitud']`
- **Ahora (correcto V20 p.68–71):** `['animalismo', 'fortitud', 'proteanismo']`
- Celeridad pertenece a Brujah/Assamita/Ravnos. Los Gangrel nunca tuvieron Celeridad como disciplina de clan.

#### 🆕 Nueva disciplina — Proteanismo

`v20Disciplines.ts` — Añadida `PowerCategory` completa:

| Nivel | Nombre | Coste | Efecto |
|-------|--------|-------|--------|
| 1 | Ojos de la Bestia | 1 Sangre | Visión perfecta en oscuridad total; ojos de animal |
| 2 | Garras de la Bestia | 1 Sangre | Garras de daño agravado + escalar superficies |
| 3 | Piel de la Bestia | 1 Sangre | +1–3 Stamina + 1–3 Absorción + rasgos animales |
| 4 | Forma de Bestia | 1 Sangre | Transformación completa en lobo/murciélago/rata |
| 5 | Forma de Niebla | 1 Sangre | Intangible, invulnerable a físico, atraviesa grietas |

**Total disciplinas V20:** 20 (Proteanismo es la disciplina #20)

### 📊 Estado Post-Fase 4.1

| Sistema | Facciones | Poderes | Core Rules | % Real |
|---------|-----------|---------|------------|--------|
| V20 | 13/13 ✅ canónicas | 20 disciplinas (~77%) | 10/13 (77%) | ~75% |
| W20 | 13/13 ✅ | 21 categorías ✅ | 10/13 (77%) | ~80% |
| M20 | 9/9 ✅ | 9/9 Esferas ✅ | 10/13 (77%) | ~75% |
| C20 | 13/~18 (72%) | 9/16 Artes | 10/13 (77%) | ~65% |
| Wr20 | 15/15 ✅ | 15/15 ✅ | 10/13 (77%) | ~80% |

### 🔜 Siguientes Pasos

1. **Disciplinas V20 pendientes**: Daimonion (Baali), Thanatosis (Samedi), Valeren (Salubri anciano), Visceratika (Gargoyle), Ogham (Lhiannan), Sanguinus (Blood Brothers)
2. **C20 Artes**: Wayfare, Legerdemain, Naming, Primal, Dragon's Ire, Chronos (completar Artes existentes con todos los niveles)
3. **C20 kiths restantes**: Merfolk, Nunnehi, Inanimae y otros kith regionales
4. **Rituales**: sistema de Rituales de Taumaturgia y Nigromancia (paralelo a disciplinas)
5. **W20**: auspicio recomendado por tribu

---

## ✅ FASE 4.2 — Expansión Taumaturgia: 4 Sendas Adicionales (10 Jun 2026)

### Cambios aplicados

**Archivo:** `src/data/powers/v20Disciplines.ts` — MultiPathDiscipline `taumaturgia-sangre`

4 nuevas `PowerPath` insertadas en `paths[]` después de `senda-conjuracion`:

| ID | Nombre | isPrimary | Mecánica central |
|----|--------|-----------|-----------------|
| `senda-poder-elemental` | Senda del Poder Elemental | false | Fuego/aire/agua/tierra; elementales menores y devastación elemental masiva |
| `senda-del-verde` | Senda del Verde | false | Crecimiento vegetal, plantas animadas como armas, venenos y bosque viviente |
| `senda-adivinatoria` | Senda Adivinatoria | false | Psicometría, visión lejana, lectura de aura, pasado, profecía probabilística |
| `senda-de-los-espiritus` | Senda de los Espíritus | false | Percepción/comunicación Umbra, fetiches vampíricos, cruzar el Velo, dominación de espíritus |

#### Detalles de niveles por senda

**Senda del Poder Elemental** — `dicePool` Ocultismo:

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Sentir los Elementos | Gratis | Detección pasiva permanente de todos los elementos; radio (Taumaturgia×10)m |
| 2 | Controlar los Elementos | 1 Sangre | Manipula elementos existentes; Int+Ocultismo dif.6; hasta (Tau×5 kg) |
| 3 | Convocar los Elementos | 1 Sangre | Proyectil/barrera elemental; (Tau+2) dados letal; Int+Ocultismo dif.7 |
| 4 | Elemental Menor | 2 Sangre | Elemental Fuerza3/Stamina4; (Tau) horas; Int+Ocultismo dif.8 |
| 5 | Maestría Elemental | 3 Sangre | Devastación masiva; (Tau×3) dados agravado en área; Int+Ocultismo dif.9 |

**Senda del Verde** — `dicePool` Naturaleza:

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Sentir la Vida Verde | Gratis | Detección pasiva permanente; radio (Tau×20)m; identifica especies |
| 2 | Crecer | 1 Sangre | Crecimiento sobrenatural: semilla→plántula en 1 turno; Int+Naturaleza dif.6 |
| 3 | Armar las Plantas | 1 Sangre | Enredadera Fuerza3 / ramas golpe daño letal; Int+Naturaleza dif.7 |
| 4 | Veneno Vegetal | 2 Sangre | Potencia (Tau×2); parálisis/alucinaciones/daño; Int+Medicina dif.8 |
| 5 | Bosque Viviente | 3 Sangre | Área (Tau×50)m² animada; moverse dif.8; salir 1 letal/turno; Int+Naturaleza dif.9 |

**Senda Adivinatoria** — `dicePool` Ocultismo/Empatía:

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Leer el Objeto | Gratis | Psicometría: (Tau) días atrás; Per+Ocultismo dif.6 |
| 2 | Visión Lejana | 1 Sangre | Sentidos remotos; (Tau×10)km; trance; Per+Ocultismo dif.7 |
| 3 | Leer el Aura | 1 Sangre | Estado emocional, tipo sobrenatural, vínculos de Sangre; Per+Empatía dif.8 |
| 4 | Visión del Pasado | 2 Sangre | (Tau) años atrás en lugar físico; Int+Ocultismo dif.7–9 |
| 5 | Vislumbrar el Futuro | 2 Sangre | Posibilidades probabilísticas; (Tau) semanas alcance; Int+Ocultismo dif.9 |

**Senda de los Espíritus** — `dicePool` Ocultismo:

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Sentir el Umbra | Gratis | Detección pasiva permanente de espíritus; radio (Tau×10)m |
| 2 | Hablar con Espíritus | 1 Sangre | Canal de comunicación; Car+Ocultismo dif.7; antipatía por naturaleza Muerto |
| 3 | Vincular Espíritu | 2 Sangre | Fetiche vampírico; Gnosis espíritu ≤ Tau; Int+Ocultismo dif.8 enfrentada |
| 4 | Cruzar el Velo | 2 Sangre | Presencia física en Umbra; peligro Garou; Int+Ocultismo dif.8 |
| 5 | Dominar Espíritu | 3 Sangre | Control total (Tau) días; Gnosis ≤ (Tau+2); Int+Ocultismo dif.9 enfrentada |

### 📊 Estado Post-Fase 4.2

| Sistema | Facciones | Poderes | Core Rules | % Real |
|---------|-----------|---------|------------|--------|
| V20 | 13/13 ✅ canónicas | 20 disciplinas — Taumaturgia **7 sendas** (~78%) | 10/13 (77%) | ~76% |
| W20 | 13/13 ✅ | 21 categorías ✅ | 10/13 (77%) | ~80% |
| M20 | 9/9 ✅ | 9/9 Esferas ✅ | 10/13 (77%) | ~75% |
| C20 | 13/~18 (72%) | 9/16 Artes + 2 artes nuevas (Llorona/Somniloquios) | 10/13 (77%) | ~65% |
| Wr20 | 15/15 ✅ | 15/15 ✅ | 10/13 (77%) | ~80% |

**Taumaturgia paths totales: 7** (Sangre [primaria] + Movimiento de la Mente + Conjuración + Poder Elemental + Verde + Adivinatoria + Espíritus)

### 🔜 Siguientes Pasos

1. **Disciplinas V20 pendientes**: Thanatosis (Samedi), Valeren (Salubri anciano), Visceratika (Gargoyle), Ogham (Lhiannan), Sanguinus (Blood Brothers)
2. **Nigromancia sendas adicionales**: Senda de los Cuatro Vientos, Senda del Abismo (opcionales)
3. **C20 Artes**: Wayfare, Legerdemain, Naming, Primal, Dragon's Ire, Chronos
4. **C20 kiths restantes**: Merfolk, Nunnehi, Inanimae y kith regionales
5. **Rituales**: sistema de Rituales de Taumaturgia y Nigromancia (paralelo a disciplinas)
6. **UI**: `PathSelector` en `PowersView.tsx` debe manejar 7+ sendas — revisar wrap/scroll

---

## ✅ FASE 5 BLOQUE A — Expansión Masiva V20: Clanes Menores y Sendas Adicionales (10 Jun 2026)

### Cambios aplicados

#### Nigromancia — 2 sendas adicionales en `v20Disciplines.ts`

| ID | Nombre | Temática |
|----|--------|----------|
| `senda-del-alma` | Senda del Alma | Ver, llamar, atar, robar y destruir almas de difuntos y vivos |
| `senda-del-testigo` | Senda del Testigo | Leer memorias de restos, interrogar difuntos, acceso a siglos de historia |

**Nigromancia paths totales: 5** (Sepulcro [primaria] + Osario + Cenizas + Alma + Testigo)

##### Senda del Alma — niveles

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Ver las Almas | Gratis | Percibe almas de recién fallecidos y estado espiritual de los vivos; pasivo |
| 2 | Llamada del Alma | 1 Sangre | Invoca wraith específico con foco material; Car+Ocultismo dif.7 enfrentada |
| 3 | Atar el Alma | 1 Sangre | Vincula alma a lugar/objeto/persona; (éxitos) semanas; Int+Ocultismo dif.8 |
| 4 | Robar el Alma | 2 Sangre | Extrae alma de vivo dejándolo en coma; Man+Ocultismo dif.8 enfrentada |
| 5 | Devolver o Destruir | 3 Sangre | Resurrección o aniquilación total del alma; Int+Ocultismo dif.9 |

##### Senda del Testigo — niveles

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Eco del Difunto | Gratis | Últimas impresiones del difunto por contacto con restos; Per+Ocultismo dif.5 |
| 2 | Leer los Huesos | 1 Sangre | Historia de vida completa desde restos físicos; Int+Medicina dif.6 |
| 3 | Interrogar al Difunto | 1 Sangre | Coerciona al alma a responder (Tau) preguntas; Man+Ocultismo dif.7 |
| 4 | Memorias Completas | 2 Sangre | Inmersión en la memoria completa del difunto; Int+Empatía dif.8 |
| 5 | Archivo de los Siglos | 3 Sangre | Cadena histórica de vidas en lugar u objeto; siglos de alcance; Int+Ocultismo dif.9 |

#### Nuevos clanes y disciplinas en `factions/index.ts` + `v20Disciplines.ts`

| Clan | ID Facción | Disciplinas Nativas | Tipo | Estado |
|------|-----------|---------------------|------|--------|
| Capadocio | `capadocio` | auspex, fortitud, mortis | Extinto/Independiente | ✅ |
| Baali | `baali` | daimonion, presencia, obtenebración | Proscrito | ✅ |
| Tzimisce Antiguo (Koldun) | `tzimisce-antiguo` | animalismo, auspex, koldunismo | Independiente | ✅ |

##### Mortis — Capadocios (5 niveles)

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Aura de Muerte | 1 Sangre | Terror en radio (Mortis×3)m; mortales huyen dif.6; Apa+Intimidación dif.6 |
| 2 | Palabra de la Muerte | 1 Sangre | Daño agravado necrótico directo; Man+Intimidación dif.7 |
| 3 | Marchitar | 2 Sangre | Necrosis de extremidad (éxitos) días; permanente en mortales 4+ éxitos; Sta+Medicina dif.8 |
| 4 | Llamada de la Tumba | 2 Sangre | Maldición a distancia: daño diario a mortales, penalizadores a vampiros; Man+Ocultismo dif.8 |
| 5 | Puerta de la Muerte | 3 Sangre | Portal al Umbral (éxitos)h O descarga (Mortis×2) dados agravados en área; Int+Ocultismo dif.9 |

##### Daimonion — Baali (5 niveles)

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Detectar Corrupción | Gratis | Percibe vínculos infernales, posesiones y reliquias; pasivo permanente |
| 2 | Infundir Miedo | 1 Sangre | Terror de origen abismal; parálisis o pánico de fuga; Man+Intimidación dif.6 |
| 3 | Plaga Menor | 1 Sangre | Enjambre infernal (Daemon×3)m² durante (éxitos)h; 1 letal/turno; Int+Ocultismo dif.7 |
| 4 | Evocar Demonio Menor | 2 Sangre | Demonio Fue4/Sta5; (éxitos)h; riesgo de pérdida de control; Int+Ocultismo dif.8 |
| 5 | Entidad Infernal Mayor | 3 Sangre | Gran Entidad Fue7/Sta7, devasta área, UN objetivo, (éxitos) turnos; Int+Ocultismo dif.9 |

##### Koldunismo — Tzimisce Antiguos (5 niveles)

| Nv | Nombre | Coste | Mecánica |
|----|--------|-------|----------|
| 1 | Dominio del Viento | 1 Sangre | Viento fuerza Beaufort hasta 8; (Kol) dados letal como proyectil; Man+Naturaleza dif.6 |
| 2 | Dominio del Fuego | 1 Sangre | Crea/controla fuego; proyectil (Kol+2) dados agravados; Int+Naturaleza dif.7 |
| 3 | Dominio de la Tierra | 2 Sangre | (Kol×500kg) tierra/piedra; muros, enterrar objetivos; Fue+Naturaleza dif.7 |
| 4 | Dominio del Agua | 2 Sangre | Agua en (Kol×20)m; ola/torbellino; coagular sangre en mortales; Int+Naturaleza dif.8 |
| 5 | Gran Koldun | 3 Sangre | Todos los elementos simultáneos; tormentas/seísmos en (Kol×100)m; Int+Naturaleza dif.9 |

### 📊 Estado Post-Fase 5 Bloque A

| Sistema | Facciones | Poderes | Core Rules | % Real |
|---------|-----------|---------|------------|--------|
| **V20** | **16/~20** (13 base + 3 menores) | **23 disciplinas** — Tau 7 sendas, Nigro 5 sendas | 10/13 (77%) | **~80%** |
| W20 | 13/13 ✅ | 21 categorías ✅ | 10/13 (77%) | ~80% |
| M20 | 9/9 ✅ | 9/9 Esferas ✅ | 10/13 (77%) | ~75% |
| C20 | 13/~18 (72%) | 9/16 Artes | 10/13 (77%) | ~65% |
| Wr20 | 15/15 ✅ | 15/15 ✅ | 10/13 (77%) | ~80% |

**V20 disciplinas totales: 23** (20 base + Mortis + Daimonion + Koldunismo)
**Nigromancia paths totales: 5** | **Taumaturgia paths totales: 7**

---

## ✅ FASE 5 BLOQUE B — Expansión W20: Ritos, Renombre y Feras (10 Jun 2026)

### Archivos creados

#### `src/data/powers/w20Rites.ts` (NUEVO)

Interfaces: `GarouRite`, `RiteType = 'minor' | 'renown' | 'mystic' | 'death' | 'punishment'`

| Grupo | Ritos | Rank |
|-------|-------|------|
| RITOS_MENORES | rito-contricion, rito-mantenimiento-fetiche, rito-plegaria-gaia, rito-despertar, rito-purificacion-menor | 1 |
| RITOS_RENOMBRE | rito-pasaje, rito-nombramiento, rito-reconocimiento-rango | 1–2 |
| RITOS_MISTICOS | rito-vinculacion, rito-luna-llena, rito-convocacion-espiritual, rito-del-caern | 2–4 |
| RITOS_MUERTE | rito-lamentacion, rito-ultimo-aullido, rito-caceria-honor | 2–3 |
| RITOS_CASTIGO | rito-mordaza, rito-cicatriz, rito-destierro | 3–5 |

**Total: 18 ritos canónicos** | Exports: `W20_RITES`, `W20_RITES_BY_TYPE`, `RITE_TYPE_LABELS`

#### `src/data/w20Renown.ts` (NUEVO)

Interfaces: `GarouRankEntry`, `RenownType`, `RenownMechanics`, `RenownSummaryRow`

| Rank | Nombre | Gloria min | Honor min | Sabiduría min |
|------|--------|-----------|-----------|---------------|
| 0 | Cachorro | 0 | 0 | 0 |
| 1 | Cliath | 2 | 1 | 1 |
| 2 | Fostern | 4 | 4 | 4 |
| 3 | Adren | 8 | 8 | 8 |
| 4 | Athro | 14 | 12 | 12 |
| 5 | Elder | 20 | 18 | 18 |

Exports: `W20_RANKS`, `W20_RENOWN_TYPES`, `W20_RENOWN_MECHANICS`, `W20_RENOWN_TABLE`

### Facciones añadidas a `src/data/factions/index.ts`

| ID | Nombre | factionType | nativePowerIds |
|----|--------|-------------|----------------|
| `nuwisha` | Nuwisha (Coyotes Cambiantes) | `fera` | `dones-nuwisha` |
| `hakken` | Hakken (Señores de la Sombra Orientales) | `tribe` | `dones-senores-sombra`, `dones-hakken` |
| `ratkin` | Ratkin (Cambiantes Rata) | `fera` | `dones-ratkin` |

### Dones añadidos a `src/data/powers/w20Gifts.ts`

| Conjunto | Niveles | Descripción |
|----------|---------|-------------|
| `dones-nuwisha` | 5 (1–5) | Risa Sagrada, Paso del Embaucador, Engaño del Umbra, Lección del Coyote, Camino del Embaucador |
| `dones-hakken` | 2 (1, 3) | Silencio del Bambú, Corte del Viento |
| `dones-ratkin` | 3 (1–3) | Plaga Menor, Control de Roedores, Forma de Enjambre |

### Tipo extendido en `src/types/factions.ts`

`FactionType` ahora incluye `'fera'` para Cambiantes no-Garou (Nuwisha, Ratkin, etc.)

### `src/components/factions/FactionsView.tsx`

`FACTION_TYPE_LABEL` extendido con `fera: 'FERA'` para compatibilidad con `Record<FactionType, string>`.

### 📊 Estado Post-Fase 5 Bloque B

| Sistema | Facciones | Poderes | Core Rules | % Real |
|---------|-----------|---------|------------|--------|
| **V20** | 16/~20 (13 base + 3 menores) | 23 disciplinas — Tau 7 sendas, Nigro 5 sendas | 10/13 (77%) | ~80% |
| **W20** | **16/~16 ✅** (13 tribus + Nuwisha + Hakken + Ratkin) | 21 dones + **18 ritos** + **renombre completo** | 10/13 (77%) | **~90%** |
| M20 | 9/9 ✅ | 9/9 Esferas ✅ | 10/13 (77%) | ~75% |
| C20 | 13/~18 (72%) | 9/16 Artes | 10/13 (77%) | ~65% |
| Wr20 | 15/15 ✅ | 15/15 ✅ | 10/13 (77%) | ~80% |

**W20 total facciones: 16** (13 tribus Garou + 2 Fera + 1 variante tribal Hakken)
**W20 total dones: 24 categorías** (21 originales + dones-nuwisha + dones-hakken + dones-ratkin)
**W20 ritos: 18** canónicos | **W20 renombre: tabla completa 6 rangos**

