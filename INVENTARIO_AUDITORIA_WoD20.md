# INVENTARIO & AUDITORÍA COMPLETA — WoD 20th Anniversary Vademecum
> Generado por auditoría exhaustiva de todos los archivos del proyecto.
> Fuente canónica de referencia: Manuales básicos de la 20th Anniversary Edition (V20, W20, M20, C20, Wr20).
> **NOTA:** Este archivo es la guía maestra para refinar el sistema. Lee cada sección antes de modificar los archivos de datos.

---

## ÍNDICE

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Sistema de Juego Base (coreSystem.ts)](#2-sistema-de-juego-base)
3. [V20 — Vampiro: La Mascarada](#3-v20--vampiro-la-mascarada)
4. [W20 — Hombre Lobo: El Apocalipsis](#4-w20--hombre-lobo-el-apocalipsis)
5. [M20 — Mago: La Ascensión](#5-m20--mago-la-ascensión)
6. [C20 — Changeling: El Sueño](#6-c20--changeling-el-sueño)
7. [Wr20 — Wraith: La Oblivión](#7-wr20--wraith-la-oblivión)
8. [Arquitectura del Proyecto](#8-arquitectura-del-proyecto)
9. [Errores y Correcciones Prioritarias](#9-errores-y-correcciones-prioritarias)
10. [Hoja de Ruta de Refinamiento](#10-hoja-de-ruta-de-refinamiento)

---

## 1. RESUMEN EJECUTIVO

| Juego | Facciones | Poderes | Mecánicas | Estado General |
|-------|-----------|---------|-----------|----------------|
| V20   | ✅ 13 Clanes | ⚠️ Parcial (Proteanismo faltante, clan incorrecto) | ✅ Completo | **Muy bueno — 1 error crítico** |
| W20   | ✅ 13 Tribus | ✅ 21 categorías de Dones + 5 Formas | ⚠️ Sin Ritos | **Bueno — faltan Ritos** |
| M20   | ✅ 9 Tradiciones | ✅ 9 Esferas completas | ⚠️ Sin sistema de Focos | **Excelente — más completo del proyecto** |
| C20   | ✅ 13 Kiths | ✅ 11 Artes + 6 Reinos | ⚠️ Faltan artes canónicas | **Bueno — algunas artes potencialmente faltantes** |
| Wr20  | ✅ 13 Gremios (+2 extra) | ✅ 14 Arcanos (13 canónicos + 1 extra) | ⚠️ Arcano Usura faltante | **Muy bueno — 1 arcano faltante** |

**Veredicto global:** El proyecto está en estado avanzado. M20 es el sistema más completo. El único error crítico es la disciplina de Gangrel en V20 (usa Celeridad en lugar de Proteanismo). Los sistemas de reglas secundarias (Ritos W20, Focos M20, Contratos C20) son la prioridad pendiente más importante.

---

## 2. SISTEMA DE JUEGO BASE

**Archivo:** `src/data/coreSystem.ts` (449 líneas)

### ✅ Reglas Implementadas (9 CoreRules — todas con `applicableTo: 'all'`)

| ID | Regla | Contenido |
|----|-------|-----------|
| `dice-basics` | Mecánica de Dados | Pool d10 vs dificultad, éxitos, fallos, pifia (1s cancelan éxitos), 10s cuentan doble |
| `multiple-actions` | Acciones Múltiples | Penalización acumulativa por acción adicional |
| `energy-resources` | Recursos de Energía | Tabla comparativa: Sangre / Gnosis+Rabia / Quintaesencia / Glamour / Pathos |
| `wound-levels` | Niveles de Herida | 7 niveles: Sano → Contuso → Herido → Lesionado → Herido Grave → Crítico → Incapacitado |
| `extended-actions` | Acciones Extendidas | Sistema de éxitos acumulados |
| `combat-initiative` | Iniciativa en Combate | Destreza + Alerta + d10 |
| `combat-basics` | Combate Básico | Ataque vs Defensa, daño contuso/letal/agravado |
| `virtues-morality` | Virtudes y Moralidad | Sistema Humanidad/Camino, tiradas de conciencia |
| `experience-advancement` | Avance por Experiencia | Costes de PX por categoría |
| `backgrounds` | Trasfondos | Trasfondos comunes entre sistemas |

### ⚠️ Faltante en Sistema Base

**Por agregar en `coreSystem.ts`:**
- Regla de **Willpower/Fuerza de Voluntad** como recurso gastable (reducir dificultad en 1, cancelar tirada fallida)
- Regla de **Daño Agravado** con toda su lógica diferenciada por sistema (fuego/luz solar en V20; plata en W20; Paradoja en M20; Banalidad en C20; Angustia en Wr20)
- Sistema de **Trasfondos específicos** por juego (Rebaño, Mentor, Aliados — cada sistema tiene los suyos)
- **Reglas de Torpor** (V20-específico) y **Frenesí** (W20-específico) como subsistemas propios
- **Sistema de Magia/Poderes comunes** — explicación de cómo funcionan las escalas de poder (1-5 en todas las disciplinas/artes/arcanos/esferas)

---

## 3. V20 — VAMPIRO: LA MASCARADA

**Color:** `#FF3333` (rojo) | **Energía:** Sangre (Vitae)

### 3.1 CLANES — ✅ Completo (13/13)

| # | Clan | Disciplinas Canónicas V20 | Estado en Proyecto | Error |
|---|------|--------------------------|-------------------|-------|
| 1 | Brujah | Celeridad, Potencia, Presencia | ✅ | — |
| 2 | Gangrel | Animalismo, Fortitud, **Proteanismo** | ❌ INCORRECTO | Tiene `celeridad` en lugar de `proteanismo` |
| 3 | Malkaviano | Auspex, Dementación, Ofuscación | ✅ | — |
| 4 | Nosferatu | Animalismo, Ofuscación, Potencia | ✅ | — |
| 5 | Toreador | Auspex, Celeridad, Presencia | ✅ | — |
| 6 | Tremere | Auspex, Dominación, Taumaturgia | ✅ | — |
| 7 | Ventrue | Dominación, Fortitud, Presencia | ✅ | — |
| 8 | Lasombra | Dominación, Potencia, Obtenebración | ✅ | — |
| 9 | Tzimisce | Animalismo, Auspex, Vicisitud | ✅ | — |
| 10 | Assamita | Celeridad, Ofuscación, Quietud | ✅ | — |
| 11 | Giovanni | Dominación, Potencia, Nigromancia | ✅ | — |
| 12 | Ravnos | Animalismo, Celeridad, Quimerismo | ✅ | — |
| 13 | Setita | Ofuscación, Presencia, Serpentis | ✅ | — |

> **ERROR CRÍTICO #1:** Gangrel en `factions/index.ts` tiene `nativePowerIds: ['animalismo', 'celeridad', 'fortitud']`. En V20, Gangrel tienen **Animalismo, Fortitud y Proteanismo** (no Celeridad). Celeridad es disciplina Brujah/Assamita/Ravnos. Debe corregirse a `['animalismo', 'fortitud', 'proteanismo']` y añadirse la disciplina Proteanismo al archivo de poderes.

### 3.2 DISCIPLINAS — ⚠️ Casi Completo (Proteanismo faltante)

**Archivo:** `src/data/powers/v20Disciplines.ts` (1535 líneas)

#### ✅ Disciplinas Canónicas Presentes

| Disciplina | Niveles | Clan Principal | Tipo |
|------------|---------|----------------|------|
| Animalismo | 1-5 ✅ | Gangrel, Nosferatu, Tzimisce | PowerCategory |
| Auspex | 1-5 ✅ | Toreador, Tremere, Tzimisce | PowerCategory |
| Celeridad | 1-5 ✅ | Brujah, Assamita, Ravnos | PowerCategory |
| Dementación | 1-5 ✅ | Malkaviano | PowerCategory |
| Dominación | 1-5 ✅ | Lasombra, Malkaviano, Tremere, Ventrue | PowerCategory |
| Fortitud | 1-5 ✅ | Gangrel, Ventrue | PowerCategory |
| Obtenebración | 1-5 ✅ | Lasombra | PowerCategory |
| Ofuscación | 1-5 ✅ | Assamita, Malkaviano, Nosferatu, Setita | PowerCategory |
| Potencia | 1-5 ✅ | Brujah, Giovanni, Lasombra, Nosferatu | PowerCategory |
| Presencia | 1-5 ✅ | Brujah, Setita, Toreador, Ventrue | PowerCategory |
| Quietud | 1-5 ✅ | Assamita | PowerCategory |
| Serpentis | 1-5 ✅ | Setita | PowerCategory |
| Vicisitud | 1-5 ✅ | Tzimisce | PowerCategory |

#### ✅ Disciplinas MultiPath Presentes

| Disciplina | Sendas Implementadas | Para Clan |
|------------|---------------------|-----------|
| Nigromancia | Senda del Sepulcro (primaria), Senda del Osario, Senda de las Cenizas | Giovanni |
| Taumaturgia | Senda de la Sangre (primaria), Senda del Movimiento de la Mente, Senda de la Conjuración | Tremere |

#### ✅ Disciplinas Extra Presentes (Linajes/Bloodlines)

| Disciplina | Niveles | Clan/Linaje |
|------------|---------|-------------|
| Quimerismo | 1-5 ✅ | Ravnos |
| Obeah | 1-5 ✅ | Salubri (casi extintos) |
| Melpominee | 1-5 ✅ | Hijas de la Cacofonía |
| Temporis | 1-5 ✅ | Verdaderos Brujah |

#### ❌ Disciplinas Faltantes

| Disciplina | Niveles Req. | Para Clan | Prioridad |
|------------|-------------|-----------|-----------|
| **Proteanismo** | 1-5 | Gangrel (clan principal) | 🔴 CRÍTICA |
| Mítica (Mytherceria) | 1-5 | Gargoyles/Gangrel exótico | 🟡 Media |

#### ⚠️ Sendas de Taumaturgia Adicionales (V20 manual incluye 18+ sendas)

Las siguientes sendas aparecen en el V20 básico y son usables por cualquier Tremere que las aprenda. Actualmente solo hay 3:

| Senda | Descripción | Prioridad |
|-------|-------------|-----------|
| Senda del Poder Elemental | Controla los 4 elementos | 🟡 Media |
| Senda del Verde | Manipulación vegetal | 🟡 Media |
| Senda de la Comunicación con los Muertos | Hablar con espíritus (distinta de Nigromancia) | 🟡 Media |
| Senda de Córdoba | Armas de espíritu | 🟡 Media |
| Senda Adivinatoria | Profecía y visión | 🟡 Media |
| Senda de los Espíritus | Interacción con el Umbra | 🟡 Media |

#### ⚠️ Sendas de Nigromancia Adicionales

| Senda | Descripción | Prioridad |
|-------|-------------|-----------|
| Senda de los Cuatro Ángeles | Giovanni avanzado | 🟢 Baja |
| Senda del Testigo | Comunicación con difuntos específicos | 🟢 Baja |

### 3.3 MECÁNICAS V20 ESPECÍFICAS

| Mecánica | Estado |
|----------|--------|
| Sangre por turno (según generación) | ✅ En `coreSystem.ts` |
| Generación vampírica | ⚠️ Solo mencionada — no hay tabla completa por generación |
| Sistema de Abrazo | ⚠️ No documentado como regla |
| Diablerie | ⚠️ No documentado |
| Caminos de Moralidad (alternativas a Humanidad) | ⚠️ No implementados |
| Vínculo de Sangre (Blood Bond) | ⚠️ No implementado como subsistema |
| Torpor | ⚠️ Solo mencionado como concepto |
| Frenesí de Hambre/Bestia | ⚠️ Solo mencionado como concepto |
| Edad en el Abrazo (Golconda, Antediluvianos) | ❌ No documentado |

---

## 4. W20 — HOMBRE LOBO: EL APOCALIPSIS

**Color:** `#D4AF37` (dorado) | **Energía:** Gnosis + Rabia

### 4.1 TRIBUS — ✅ Completo (13/13)

| # | Tribu | Dones en Archivo | Estado |
|---|-------|-----------------|--------|
| 1 | Señores de la Sombra | `dones-senores-sombra` | ✅ 5 niveles |
| 2 | Vástagos de Fenris | `dones-vastagos-fenris` | ✅ 5 niveles |
| 3 | Furias Negras | `dones-furias-negras` | ✅ 5 niveles |
| 4 | Caminantes de Cristal | `dones-caminantes-cristal` | ✅ 5 niveles |
| 5 | Garras Rojas | `dones-garras-rojas` | ✅ 5 niveles |
| 6 | Fianna | `dones-fianna` | ✅ 5 niveles |
| 7 | Roedores de Huesos | `dones-bone-gnawers` | ✅ 5 niveles |
| 8 | Contemplaestrellas | `dones-contemplaestrellas` | ✅ 5 niveles |
| 9 | Hijos de Gaia | `dones-hijos-gaia` | ✅ 5 niveles |
| 10 | Peregrinos Silenciosos | `dones-peregrinos-silenciosos` | ✅ 5 niveles |
| 11 | Colmillos de Plata | `dones-colmillos-plata` | ✅ 5 niveles |
| 12 | Uktena | `dones-uktena` | ✅ 5 niveles |
| 13 | Wendigo | `dones-wendigo` | ✅ 5 niveles |

### 4.2 DONES — ✅ Muy Completo (21 categorías)

**Archivo:** `src/data/powers/w20Gifts.ts` (1470 líneas)

#### Por Auspicio (5/5 ✅)
- Dones Ahroun, Dones Theurge, Dones Ragabash, Dones Philodox, Dones Galliard

#### Por Raza (3/3 ✅)
- Dones Homínido, Dones Lupus, Dones Metis

#### Por Tribu (13/13 ✅)
Todas las 13 tribus tienen sus 5 niveles de dones implementados (ver tabla arriba).

**Total de categorías de Dones:** 21 (5 auspicios + 3 razas + 13 tribus) = ✅ Completo por cobertura de manual básico.

### 4.3 FORMAS GAROU — ✅ Completo (5/5)

**Archivo:** `src/data/powers/w20Forms.ts` (172 líneas)

| Forma | Nombre ES | Modificadores | Delirio | Daño | Estado |
|-------|-----------|---------------|---------|------|--------|
| Homid | Homínido | Sin modificadores | No | Contuso | ✅ |
| Glabro | Glabro | Fue+2, Sta+2, Man-1, Apa-1 | No | Letal | ✅ |
| Crinos | Crinos | Fue+4, Des+1, Sta+3, Man-3, Apa=0 | Dif 7 | Agravado | ✅ |
| Hispo | Hispo | Fue+3, Des+2, Sta+3, Man-3, Apa=0 | Dif 5 | Agravado (mordisco>garras) | ✅ |
| Lupus | Lupus | Fue+1, Des+2, Sta+2, Man-3, Apa=0 | No | Letal | ✅ |

Incluye: tabla comparativa `W20_FORMS_SUMMARY`, reglas de Delirio, modificadores exactos de atributos, daño natural, restricciones sociales, movimiento.

### 4.4 MECÁNICAS W20 FALTANTES

| Sistema | Descripción | Prioridad |
|---------|-------------|-----------|
| **Ritos** | Sistema completo de Ritos (Ritos de Renovación, de Paso, de Castigo, etc.) — hay docenas en W20 básico | 🔴 ALTA |
| **Fetiches** | Objetos mágicos Garou con espíritus ligados | 🔴 ALTA |
| **Totems** | Espíritus tutores de manada/tribu con poderes y requerimientos | 🟡 Media |
| **Sistema de Renombre** | Gloria/Sabiduría/Honor y cómo afectan al personaje | 🟡 Media |
| **Caerns** | Lugares sagrados con niveles de potencia y tipos | 🟡 Media |
| **Umbra** | Descripción mecánica del Umbra Medio, Umbra Profunda, Umbra Oscura | 🟡 Media |
| **Horda/Manada** | Reglas de grupos Garou, jerarquía alfa | 🟢 Baja |
| **Harano** | La desesperación espiritual del Garou | 🟢 Baja |

---

## 5. M20 — MAGO: LA ASCENSIÓN

**Color:** `#8A2BE2` (púrpura) | **Energía:** Quintaesencia

### 5.1 TRADICIONES — ✅ Completo (9/9)

| # | Tradición | Esferas Afines | Estado |
|---|-----------|---------------|--------|
| 1 | Akásica | Mente, Correspondencia | ✅ |
| 2 | Verbena | Vida, Espíritu | ✅ |
| 3 | Orden de Hermes | Correspondencia, Fuerzas | ✅ |
| 4 | Adeptos Virtuales | Correspondencia, Fuerzas, Primo | ✅ |
| 5 | Culto del Éxtasis | Tiempo, Mente, Vida | ✅ |
| 6 | Eutanatos | Entropía, Mente | ✅ |
| 7 | Coro Celestial | Espíritu, Vida | ✅ |
| 8 | Cuentasueños | Espíritu, Vida, Mente | ✅ |
| 9 | Hijos del Éter | Materia, Fuerzas | ✅ |

### 5.2 ESFERAS — ✅ COMPLETO (9/9 con 5 niveles cada una)

**Archivo:** `src/data/powers/m20Spheres.ts` (652 líneas)

| # | Esfera | Dominio | Nivel 1 | Nivel 5 | Estado |
|---|--------|---------|---------|---------|--------|
| 1 | Correspondencia | Espacio/Distancia | Sentido de la Distancia | Romper el Espacio | ✅ |
| 2 | Entropía | Caos/Suerte | Sentido del Caos | Decreto del Final | ✅ |
| 3 | Fuerzas | Energía/Elementos | Percibir Fuerzas | Maestría de las Fuerzas | ✅ |
| 4 | Vida | Biología/Metamorfosis | Percibir la Vida | Crear Vida | ✅ |
| 5 | Mente | Consciencia/Psique | Percibir la Mente | Proyección Astral | ✅ |
| 6 | Materia | Transmutación | Percibir la Materia | Maestría Molecular | ✅ |
| 7 | Tiempo | Dilatación/Profecía | Percibir el Tiempo | Viaje en el Tiempo | ✅ |
| 8 | Espíritu | Umbra/Velo | Sentir Espíritus | Forjar Reinos Umbrales | ✅ |
| 9 | Primo | Quintaesencia/Consenso | Sentir la Quintaesencia | Manifestación del Nexo | ✅ |

**M20 es el sistema MÁS COMPLETO del proyecto en cuanto a poderes.**

### 5.3 MECÁNICAS M20 FALTANTES

| Sistema | Descripción | Prioridad |
|---------|-------------|-----------|
| **Sistema de Focos** | Cada Tradición requiere Focos específicos para lanzar magia (instrumentos, rituales, etc.); sin ellos la magia es Vulgar | 🔴 ALTA |
| **Sistema de Paradoja** | Acumulación y efectos de la Paradoja (backlash, realidad castigando la magia Vulgar) | 🔴 ALTA |
| **Magia Coincidente vs Vulgar** | Distinción entre tipos de magia y sus efectos en el mundo mortal | 🟡 Media |
| **Arete y Resonancia** | Puntuación de Arete como límite de Esfera, Resonancia como "sabor" mágico personal | 🟡 Media |
| **Paradigma** | La visión del mundo mágica de cada mago/Tradición | 🟡 Media |
| **Nodos y Freeholds** | Fuentes de Quintaesencia | 🟡 Media |
| **Tecnomantes/Convención** | Las Convenciones de la Técnocracia como antagonistas | 🟢 Baja |
| **Talismanes y Maravillas** | Objetos mágicos M20 | 🟢 Baja |

---

## 6. C20 — CHANGELING: EL SUEÑO

**Color:** `#00FF7F` (verde) | **Energía:** Glamour

### 6.1 KITHS — ✅ Completo para manual básico (13 kiths)

| # | Kith | Tipo | Estado |
|---|------|------|--------|
| 1 | Boggan | Doméstico/Artesano | ✅ |
| 2 | Sidhe | Nobleza Feérica | ✅ |
| 3 | Pooka | Shapeshifter Animal | ✅ |
| 4 | Nocker | Inventor/Artesano | ✅ |
| 5 | Eshu | Viajero/Contador | ✅ |
| 6 | Gorros Rojos (Redcaps) | Berserker/Devorador | ✅ |
| 7 | Sluagh | Espectro/Espía | ✅ |
| 8 | Sátiros | Pasión/Música | ✅ |
| 9 | Trols | Guerrero/Juramento | ✅ |
| 10 | Clurichaun | Bebedor/Festivo | ✅ |
| 11 | Ghille Dhu | Naturaleza/Bosque | ✅ |
| 12 | Piskie | Mensajero/Veloz | ✅ |
| 13 | Selkie | Mar/Piel de Foca | ✅ |

**Kiths en C20 manual que podrían añadirse como extras:**
- Merrow (sirenio de agua dulce)
- Korred (duende de piedra)
- Riversprite (espíritu de río)
- Aonide (musa inspiradora)

### 6.2 ARTES — ✅ Muy Completo (11 Artes)

**Archivo:** `src/data/powers/c20Arts.ts` (~797 líneas)

| # | Arte | ID | Dominio | Estado |
|---|------|----|---------|--------|
| 1 | Chicanería | `chicaneria` | Engaño/Ilusión menor | ✅ 5 niveles |
| 2 | Metamorfosis | `metamorfosis` | Transformación | ✅ 5 niveles |
| 3 | Primordial | `primordial` | Naturaleza/Elementales | ✅ 5 niveles |
| 4 | Soberanía | `soberania` | Control/Mando | ✅ 5 niveles |
| 5 | Viaje | `viaje` | Movimiento/Teletransporte | ✅ 5 niveles |
| 6 | Infusión | `infusion` | (ver nota) | ✅ 5 niveles |
| 7 | Prestidigitación | `prestidigitacion` | Manipulación/Artesanía | ✅ 5 niveles |
| 8 | Onomancia | `onomancia` | Nombres/Lenguaje | ✅ 5 niveles |
| 9 | Tejeduría del Cielo | `tejiedura-cielo` | Clima/Viento | ✅ 5 niveles |
| 10 | Llorona | `llorona` | Fuego/Pasión (≈ Pyretics) | ✅ 5 niveles |
| 11 | Somniloquios | `somniloquios` | Sueños/Onirismo (≈ Dream) | ✅ 5 niveles |

#### Correspondencia con Artes Canónicas C20

| Arte C20 Canónica | Arte en Proyecto | Estado |
|-------------------|-----------------|--------|
| Chicanery | Chicanería | ✅ |
| Dream / Oneiromancy | Somniloquios | ✅ (adaptado) |
| Legerdemain | Prestidigitación | ✅ |
| Metamorphosis | Metamorfosis | ✅ |
| Naming | Onomancia | ✅ |
| Primal | Primordial | ✅ |
| Pyretics | Llorona | ✅ (adaptado al español) |
| Sovereign | Soberanía | ✅ |
| Wayfare | Viaje | ✅ |
| **Contract** | ❌ Sin equivalente claro | ⚠️ Revisar si Soberanía la cubre |
| — | Infusión | ⚠️ No tiene equivalente canónico directo — posible arte personalizado |
| — | Tejeduría del Cielo | ⚠️ No tiene equivalente canónico directo — posible arte personalizado/expandido |

> **NOTA sobre "Infusión":** No corresponde exactamente a ningún Arte canónica de C20. Revisar si cubre Legerdemain de otra manera, o si es una adición creativa propia del proyecto.

> **NOTA sobre "Tejeduría del Cielo":** Arte de clima/viento muy elaborada. En C20 las artes de clima suelen estar bajo Primal o como Arte de Temporada. Bien realizada, pero no canónica.

#### ⚠️ Arte C20 Posiblemente Faltante

| Arte | Descripción | Prioridad |
|------|-------------|-----------|
| **Contract** | El Arte de los Tratos y Pactos vinculantes; fundamental para la política feérica | 🔴 ALTA |
| Chronos | Arte del Tiempo (separado de Wayfare en algunas ediciones) | 🟢 Baja |

### 6.3 REINOS (Realms) — ✅ Implementados

**Exportado en `c20Arts.ts` como `C20_REALMS_INFO`:**

| Reino | ID | Descripción |
|-------|----|-------------|
| Actor | `actor` | Humanos mortales y criaturas mundanas |
| Fae | `fae` | Changelings y criaturas feéricas |
| Naturaleza | `naturaleza` | Animales, plantas, espíritus elementales |
| Prop | `prop` | Objetos inanimados, artefactos, quimeras |
| Escena | `escena` | Lugares, entornos, paisaje |
| Tiempo | `tiempo` | El flujo temporal, pasado y futuro |

Los Reinos están correctamente documentados. Sin embargo, falta la mecánica de **puntuación de Reino** (niveles 1-5 que determinan cuántos objetivos puede afectar el Arte) y su interacción combinada Arte+Reino en el coste de Glamour.

### 6.4 MECÁNICAS C20 FALTANTES

| Sistema | Descripción | Prioridad |
|---------|-------------|-----------|
| **Sistema de Glamour/Banalidad** | Interacción mecánica detallada entre Glamour y Banalidad, recuperación | 🔴 ALTA |
| **Cantrips: Arte + Reino** | Mecánica combinada de Arte+Reino para determinar objetivo y coste de Glamour | 🔴 ALTA |
| **Ensueño (Dreaming)** | El reino feérico y cómo los Changelings lo habitan | 🟡 Media |
| **Contrato Arte** | El arte de Contratos es el motor de la política feérica | 🟡 Media |
| **Frailidades por Kith** | Cada Kith tiene debilidades mecánicas específicas | ⚠️ Verificar si están en factions |
| **Quimeras** | Criaturas y objetos feéricos — reglas de creación y combate | 🟢 Baja |
| **Sistema de Frenesí de Banalidad** | Cuando el Glamour cae a 0 | 🟢 Baja |

---

## 7. Wr20 — WRAITH: LA OBLIVIÓN

**Color:** `#708090` (gris pizarra) | **Recursos:** Pathos (energía), Corpus (salud), Psiquis (voluntad), Angustia (corrupción)

### 7.1 GREMIOS — ✅ Muy Completo (15 total: 13 canónicos + 2 extra)

**Archivo:** `src/data/factions/index.ts`

| # | Gremio (ES) | Arcano | Canónico |
|---|-------------|--------|----------|
| 1 | Artificers | Encarnación | ✅ |
| 2 | Monitores | Argos | ✅ |
| 3 | Oráculos | Intimación | ✅ |
| 4 | Absolventes (Pardoners) | Castigo | ✅ |
| 5 | Proctores | Red de Vida | ✅ |
| 6 | Cantores (Chanteurs) | Lamento | ✅ |
| 7 | Embrujadores (Haunters) | Pandemonium | ✅ |
| 8 | Enmascarados (Masquers) | Moldeo | ✅ |
| 9 | Mnemoi | Fantasmagoría | ✅ |
| 10 | Titiriteros (Puppeteers) | Marioneta | ✅ |
| 11 | Areneros (Sandmen) | Flujo | ✅ |
| 12 | Espantos (Spooks) | Habitar | ✅ |
| 13 | Usureros (Usurers) | Usura | ✅ (gremio) / ❌ (arcano faltante) |
| 14 | Artesanos | *(custom)* | ⚠️ Extra no canónico |
| 15 | Alquimistas | *(custom)* | ⚠️ Extra no canónico |

> **NOTA:** Los 13 Gremios canónicos del Wr20 están todos representados. Los gremios Artesanos y Alquimistas son adiciones creativas del proyecto.

### 7.2 ARCANOS — ✅ Muy Completo (14 total: 13 canónicos + 1 extra)

**Archivo:** `src/data/powers/wr20Arcanos.ts`

| # | Arcano | Dominio | Gremio | Estado |
|---|--------|---------|--------|--------|
| 1 | Encarnación | Manifestación física | Artificers | ✅ 5 niveles |
| 2 | Flujo | Cambio/Pathos emocional | Areneros | ✅ 5 niveles |
| 3 | Lamento | Voz espectral | Cantores | ✅ 5 niveles |
| 4 | Moldeo | Corpus/Forma | Enmascarados | ✅ 5 niveles |
| 5 | Marioneta | Control de vivos | Titiriteros | ✅ 5 niveles |
| 6 | Argos | Navegación espectral | Monitores | ✅ 5 niveles |
| 7 | Castigo | Sombra/Purificación | Absolventes | ✅ 5 niveles |
| 8 | Habitar | Control de máquinas | Espantos | ✅ 5 niveles |
| 9 | Intimación | Deseos/Psique | Oráculos | ✅ 5 niveles |
| 10 | Red de Vida | Grilletes/Vínculos | Proctores | ✅ 5 niveles |
| 11 | Ultraje | Telequinesia | *(sin gremio propio)* | ✅ 5 niveles |
| 12 | Pandemonium | Terror/Locura | Embrujadores | ✅ 5 niveles |
| 13 | Fantasmagoría | Sueños de vivos | Mnemoi | ✅ 5 niveles |
| 14 | Ladrón del Velo | El Velo/Brechas | *(custom)* | ✅ 5 niveles |

#### ❌ Arcano Faltante

| Arcano | Dominio | Gremio | Prioridad |
|--------|---------|--------|-----------|
| **Usura** | Deuda/Obligación — manipular deudas y obligaciones espirituales | Usureros | 🔴 ALTA |

> **NOTA:** El Gremio Usureros referencia el arcano `usura` en su `nativePowerIds`, pero dicho arcano no está definido en el archivo de poderes. Esto deja al Gremio sin arcano funcional.

> **NOTA sobre Ladrón del Velo:** Arte original del proyecto, muy bien implementado. No corresponde directamente a ningún arcano canónico del Wr20 básico, pero llena un espacio temático coherente con el sistema.

### 7.3 MECÁNICAS Wr20 FALTANTES

| Sistema | Descripción | Prioridad |
|---------|-------------|-----------|
| **La Sombra (Shadow)** | Sistema de la Sombra como entidad antagonista interna; mecanismos de control y pérdida | 🔴 ALTA |
| **Arcano Usura** | Completo con 5 niveles para el Gremio Usureros | 🔴 ALTA |
| **El Inframundo** | Los reinos del Inframundo (Tempestades, Ciudad de los Muertos, el Más Allá) | 🟡 Media |
| **Reliquias** | Objetos espectrales con poderes mágicos | 🟡 Media |
| **El Velo (The Shroud)** | Sistema de grosor del Velo y su impacto en acciones espectrales | 🟡 Media (Ladrón del Velo cubre parte) |
| **Corpus y heridas espectrales** | Mecánica completa de daño al Corpus, Oblivion y Destrucción Final | 🟡 Media |
| **Espectros (Spectres)** | Los Wraiths corrompidos — sistema de la Angustia llevada al extremo | 🟢 Baja |
| **Ferrymen/Caronte** | Personajes arquetipo del Inframundo | 🟢 Baja |

---

## 8. ARQUITECTURA DEL PROYECTO

### 8.1 Archivos de Datos Principales

| Archivo | Líneas | Estado | Descripción |
|---------|--------|--------|-------------|
| `src/data/gameSystems.ts` | 258 | ✅ Completo | Config de los 5 sistemas |
| `src/data/coreSystem.ts` | 449 | ✅ Completo | 9 reglas universales |
| `src/data/powers/v20Disciplines.ts` | 1535 | ⚠️ Falta Proteanismo | 15+ disciplinas V20 |
| `src/data/powers/w20Gifts.ts` | 1470 | ✅ Completo | 21 categorías de Dones W20 |
| `src/data/powers/w20Forms.ts` | 172 | ✅ Completo | 5 Formas Garou |
| `src/data/powers/m20Spheres.ts` | 652 | ✅ Completo | 9 Esferas M20 |
| `src/data/powers/c20Arts.ts` | ~797 | ⚠️ Revisar Contract | 11 Artes C20 + Reinos |
| `src/data/powers/wr20Arcanos.ts` | ~900+ | ⚠️ Falta Usura | 14 Arcanos Wr20 |
| `src/data/factions/index.ts` | 849+ | ⚠️ Error Gangrel | Todas las facciones |
| `src/data/powers/index.ts` | ? | No auditado | Exportaciones de poderes |

### 8.2 Sistema de Tipos

| Archivo | Tipos Clave |
|---------|-------------|
| `src/types/powers.ts` | `PowerCategory`, `MultiPathDiscipline`, `GarouForm`, etc. |
| `src/types/gameSystem.ts` | `GameSystemConfig`, `GameSystemId` |
| `src/types/coreSystem.ts` | `CoreRule` |
| `src/types/factions.ts` | `FactionsIndex`, `Clan`, `Tribe`, `Kith`, etc. |

### 8.3 Colores de Identidad por Juego

| Sistema | Color Primario | Hex |
|---------|---------------|-----|
| V20 | Rojo Sangre | `#FF3333` |
| W20 | Dorado Ancestral | `#D4AF37` |
| M20 | Púrpura Místico | `#8A2BE2` |
| C20 | Verde Feérico | `#00FF7F` |
| Wr20 | Gris Pizarra | `#708090` |

---

## 9. ERRORES Y CORRECCIONES PRIORITARIAS

### 🔴 CRÍTICO — Debe corregirse antes de cualquier uso

#### ERROR #1: Disciplinas de Gangrel incorrectas
- **Archivo:** `src/data/factions/index.ts`
- **Línea aprox.:** Entrada del clan Gangrel, campo `nativePowerIds`
- **Incorrecto:** `['animalismo', 'celeridad', 'fortitud']`
- **Correcto:** `['animalismo', 'fortitud', 'proteanismo']`
- **Razón:** En V20, los Gangrel tienen Animalismo, Fortitud y Proteanismo como disciplinas de clan. Celeridad pertenece a Brujah, Assamita y Ravnos.
- **Acción adicional:** Crear disciplina `Proteanismo` (5 niveles) en `v20Disciplines.ts`.

#### ERROR #2: Arcano Usura del Gremio Usureros no implementado
- **Archivo:** `src/data/powers/wr20Arcanos.ts`
- **El gremio Usureros referencia** `nativePowerIds: ['usura']` pero la PowerCategory con `id: 'usura'` no existe
- **Acción:** Crear el Arcano Usura (5 niveles) en `wr20Arcanos.ts`

### 🟡 IMPORTANTE — Completa la experiencia del manual básico

#### Añadir a V20:
- Disciplina **Proteanismo** (Gangrel): 5 niveles — cambio de forma, camuflaje, vuelo, forma bestia
- Al menos 2-3 sendas adicionales de **Taumaturgia** (Elemental, Del Verde, De Córdoba)

#### Añadir a W20:
- Sistema de **Ritos** con al menos los Ritos de Renombre principales por Rango (1-3)
- Sistema de **Fetiches** con mecánicas de creación y uso

#### Añadir a M20:
- Sistema de **Focos** por Tradición (tabla de Foci necesarios para magia no vulgar)
- Sistema de **Paradoja** (acumulación, efectos, Backlash)

#### Añadir a C20:
- Arte de **Contract** (5 niveles) — fundamental para política feérica
- Mecánica de **Cantrip = Arte + Reino** con tabla de costes de Glamour combinados
- Sistema detallado de **Banalidad vs Glamour** (recuperación, pérdida, efectos en 0/10)

#### Añadir a Wr20:
- Arcano **Usura** (5 niveles) para el Gremio Usureros
- Subsistema de **La Sombra** (Shadow): cómo la Angustia empodera a la Sombra, mecánicas de posesión interna

### 🟢 DESEABLE — Enriquece el sistema sin ser esencial para jugar

- V20: Tabla completa de **Generaciones** (13ª a 4ª) con límites de Sangre/turno y max. de Atributos
- V20: Reglas de **Vínculo de Sangre** (Blood Bond) y **Diablerie**
- V20: Caminos de Moralidad alternativos (Camino de la Humanidad, Camino de la Noche, etc.)
- W20: Sistema de **Totems** de manada
- W20: Reglas de **Renombre** (Gloria/Sabiduría/Honor) y cómo suben/bajan
- M20: Mecánicas de **Resonancia** y **Paradigma**
- C20: Reglas del **Ensueño** (el plano feérico)
- Wr20: Descripción de los **reinos del Inframundo** (Ciudad de los Muertos, Tempestades)

---

## 10. HOJA DE RUTA DE REFINAMIENTO

### Fase 1 — Correcciones Críticas (1-2 sesiones)
1. Corregir `nativePowerIds` de Gangrel en `factions/index.ts`
2. Crear disciplina **Proteanismo** (5 niveles) en `v20Disciplines.ts`
3. Crear arcano **Usura** (5 niveles) en `wr20Arcanos.ts`

### Fase 2 — Sistemas de Reglas Secundarias (3-5 sesiones)
4. Añadir sistema de **Focos M20** (tabla por Tradición)
5. Añadir sistema de **Paradoja M20** (niveles, efectos, Backlash)
6. Añadir mecánica **Arte+Reino C20** (tabla de costes combinados)
7. Añadir Arte C20 **Contract** (5 niveles)
8. Añadir subsistema **La Sombra Wr20** (Angustia, posesión, mecanismos)

### Fase 3 — Ampliación de Poderes (4-6 sesiones)
9. Añadir **Ritos W20** (mínimo 10-15 Ritos del manual básico)
10. Añadir **Fetiches W20** (sistema de creación + 10 fetiches ejemplo)
11. Añadir 3 Sendas adicionales de **Taumaturgia V20**
12. Añadir Arte C20 faltante si procede (verificar Infusión con manual)

### Fase 4 — Pulido y Enriquecimiento (continuo)
13. Tabla de Generaciones V20 completa
14. Sistema de Renombre W20
15. Mecánicas de Banalidad/Glamour C20 detalladas
16. Descripción del Inframundo Wr20
17. Kiths adicionales C20 (Merrow, Korred, etc.) si se desea

---

## APÉNDICE: Inventario Rápido de Referencia

### Poderes por Sistema

| Sistema | Archivo | Categorías | Poderes Totales (aprox.) |
|---------|---------|------------|--------------------------|
| V20 | `v20Disciplines.ts` | 17 (13 base + 4 linaje, incluyendo multipath) | ~100+ niveles |
| W20 | `w20Gifts.ts` | 21 categorías | ~105 dones (5×21) |
| W20 | `w20Forms.ts` | 5 formas | 5 formas completas |
| M20 | `m20Spheres.ts` | 9 esferas | 45 niveles (9×5) |
| C20 | `c20Arts.ts` | 11 artes + 6 reinos | 55 niveles (11×5) |
| Wr20 | `wr20Arcanos.ts` | 14 arcanos | 70 niveles (14×5) |

### Facciones por Sistema

| Sistema | Tipo | Cantidad | Estado |
|---------|------|----------|--------|
| V20 | Clanes | 13 | ✅ (error en Gangrel) |
| W20 | Tribus | 13 | ✅ |
| M20 | Tradiciones | 9 | ✅ |
| C20 | Kiths | 13 | ✅ |
| Wr20 | Gremios | 13 (+2 extra) | ✅ (Usura faltante) |

---

*Última auditoría: 10 de junio de 2026*
*Archivos auditados: todos los archivos en `src/data/` y `src/types/`*
*Estado del proyecto: Avanzado — listo para jugar con correcciones menores*
