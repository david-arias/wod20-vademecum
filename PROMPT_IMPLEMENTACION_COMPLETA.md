# PROMPT MAESTRO — IMPLEMENTACIÓN COMPLETA WoD20 Vademecum
> Usa este archivo como prompt de contexto completo en cada nueva sesión de trabajo.
> Copia el contenido de la sección que vayas a trabajar y pégalo como prompt inicial.
> El proyecto está en: `/Users/gilsonaguiar/Documents/Claude/Projects/wod20_vademecum/wod20 - Vademecum/`

---

## CONTEXTO GENERAL DEL PROYECTO

Estás trabajando en un vademecum digital interactivo de World of Darkness 20th Anniversary Edition (WoD20), construido en React + TypeScript + Vite + Tailwind CSS. Los datos del juego se almacenan en archivos TypeScript en `src/data/`. Ya existe una auditoría completa en `INVENTARIO_AUDITORIA_WoD20.md`.

**Regla de oro:** Todos los poderes, disciplinas, artes, arcanos, esferas y dones deben seguir la estructura de tipos existente. Lee los archivos existentes antes de modificar para respetar la arquitectura. Cuando crees contenido nuevo, sigue exactamente el mismo patrón de objetos que ya existe en el archivo correspondiente.

**Tipos clave:**
- `PowerCategory` → para disciplinas, dones, artes, arcanos, esferas (niveles 1-5 en array `levels`)
- `MultiPathDiscipline` → para Taumaturgia y Nigromancia (array `paths`, cada uno con su `levels`)
- `GarouForm` → para las formas Garou (en `w20Forms.ts`)
- `CoreRule` → para reglas universales (en `coreSystem.ts`)

**Recursos de energía por sistema:**
- V20: Sangre | W20: Gnosis + Rabia | M20: Quintaesencia | C20: Glamour | Wr20: Pathos

---

## ════════════════════════════════════════════════════════════
## PROMPT 1 — CORRECCIONES CRÍTICAS (Hacer PRIMERO)
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition. Debes corregir errores críticos
en el proyecto WoD20 Vademecum y agregar disciplinas faltantes.

ARCHIVOS A MODIFICAR:
1. src/data/factions/index.ts
2. src/data/powers/v20Disciplines.ts

═══════════════════════════════════════════════════════
CORRECCIÓN #1 — DISCIPLINAS DE GANGREL (CRÍTICO)
═══════════════════════════════════════════════════════
En src/data/factions/index.ts, dentro de la entrada del clan Gangrel, corrige:
  nativePowerIds: ['animalismo', 'celeridad', 'fortitud']
→ nativePowerIds: ['animalismo', 'fortitud', 'proteanismo']

En V20 básico (pp. 68-71), Gangrel tienen: Animalism, Fortitude, Protean.
Celerity pertenece a Brujah, Assamita y Ravnos, NO a Gangrel.

═══════════════════════════════════════════════════════
CORRECCIÓN #2 — AÑADIR DISCIPLINA PROTEANISMO
═══════════════════════════════════════════════════════
En src/data/powers/v20Disciplines.ts, añade la disciplina Proteanismo como PowerCategory
después de la disciplina Quietud. Sigue exactamente el mismo formato de objeto que
las otras disciplinas del archivo.

PROTEANISMO — La disciplina de metamorfosis de los Gangrel, que permite al vampiro
adaptarse tomando rasgos animales y eventualmente adoptar forma bestial completa.
Disciplinas canónicas del V20 básico (pp. 157-160):

Nivel 1 — Ojos de la Bestia:
  El vampiro puede ver perfectamente en la oscuridad total, sus ojos brillan con luz
  animal. Sus ojos se vuelven completamente de un color animal (rojo, amarillo, verde).
  Activación automática gastando 1 Sangre. Duración: noche entera.
  No requiere tirada. Tags: ['visión', 'oscuridad', 'pasivo', 'bestia']

Nivel 2 — Garras de la Bestia:
  Extiende garras letales de hueso que infligen daño agravado.
  Tirada: ninguna (automático al gastar 1 Sangre).
  Garras infligen Fuerza + 1 dado de daño AGRAVADO. Duración: escena.
  Tags: ['garras', 'daño-agravado', 'combate', 'bestia']

Nivel 3 — Piel de la Bestia:
  El vampiro puede adoptar una forma semi-animal intermedia (lobo grande, gran felino,
  murciélago gigante) o hacer crecer pelaje que actúa como armadura.
  Tirada: Stamina + Proteanismo dif. 6.
  Efectos: +1 Stamina + 1 punto de absorción natural por nivel de éxito (máx. 3).
  Con 3+ éxitos puede adoptar forma parcialmente animal con movimiento x1.5.
  Coste: 1 Sangre. Duración: escena.
  Tags: ['armadura', 'forma-animal', 'stamina', 'bestia']

Nivel 4 — Forma de Bestia:
  Transforma al vampiro en un animal específico de forma completa: lobo, gran murciélago
  o rata gigante (según el clan/linaje del vampiro). La forma es siempre la misma para
  cada vampiro. Atributos físicos del animal reemplazan los del vampiro; mantiene
  Inteligencia y Voluntad. Puede transportar equipamiento que lleve puesto (se absorbe).
  Tirada: Stamina + Proteanismo dif. 6.
  Coste: 1 Sangre. Duración: hasta que el vampiro decida cambiar.
  Tags: ['forma-animal', 'lobo', 'murciélago', 'rata', 'transformación']

Nivel 5 — Forma de Niebla:
  El vampiro se disuelve en niebla etérea y puede atravesar cualquier grieta,
  keyhole o rendija. No puede ser dañado por armas físicas en esta forma
  (solo fuego, luz solar y magia). Puede "ver" y percibir su entorno en niebla.
  No puede atacar ni usar poderes que requieran forma física.
  Tirada: Stamina + Proteanismo dif. 6.
  Coste: 1 Sangre. Duración: escena o hasta que decida volver.
  Tags: ['niebla', 'intangible', 'invulnerable', 'infiltración', 'épico']

DESCRIPCIÓN DE LA DISCIPLINA:
"La disciplina primordial de los Gangrel, regalo de su estrecha unión con el mundo
animal. Proteanismo refleja la naturaleza salvaje e inconstante de los Gangrel —su
capacidad de fundirse con la bestia que todos los vampiros llevan dentro. Mientras
otras disciplinas perfeccionan al no-muerto, el Proteanismo lo devuelve a algo más
antiguo y más honesto: el predador sin nombre que acecha en la oscuridad."
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 2 — SENDAS DE TAUMATURGIA ADICIONALES (V20)
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition V20.
Debes añadir sendas adicionales a la MultiPathDiscipline de Taumaturgia en:
src/data/powers/v20Disciplines.ts

La Taumaturgia es la disciplina multisenda de los Tremere. Ya existen:
- Senda de la Sangre (primaria, ya implementada)
- Senda del Movimiento de la Mente (ya implementada)
- Senda de la Conjuración (ya implementada)

AÑADE las siguientes sendas al array `paths` de la MultiPathDiscipline Taumaturgia,
siguiendo el mismo formato de objeto que las sendas existentes (isPrimary: false).

═══════════════════════════════════════════════════════
SENDA DEL PODER ELEMENTAL
═══════════════════════════════════════════════════════
id: 'senda-poder-elemental'
Descripción: Dominio sobre los cuatro elementos clásicos —fuego, aire, agua y tierra.
Los Tremere que estudian esta senda aprenden a manipular las fuerzas fundamentales
de la naturaleza como extensión de su voluntad.

Nivel 1 — Sentir los Elementos:
  Percibe la presencia y estado de todos los elementos en radio (Taumaturgia × 10) m.
  Sabe dónde hay agua oculta, gas, bolsas de tierra suelta o fuentes de calor.
  Automático, gratis. Dif 5 para detalles precisos (Percepción + Ocultismo).
  
Nivel 2 — Controlar los Elementos:
  Manipula cantidades pequeñas de un elemento: apagar llamas, redirigir agua,
  mover tierra suelta, crear corriente de aire. Hasta (Taumaturgia × 5) kg de materia
  o equivalente energético. Inteligencia + Elementalismo dif. 6. Coste: 1 Sangre.

Nivel 3 — Convocar los Elementos:
  Invoca un elemento desde el entorno (no de la nada): llama de una fuente cercana,
  agua de humedad ambiental, etc. Puede crear efectos de daño: (Taumaturgia + 2)
  dados de daño letal (fuego/ácido) o agravado si fuego directamente sostenido.
  Inteligencia + Elementalismo dif. 7. Coste: 1 Sangre.

Nivel 4 — Elemental Menor:
  Convoca y liga un elemental menor de tamaño humano que obedece hasta (Inteligencia)
  órdenes simples durante (Taumaturgia) horas. El elemental tiene Fuerza 3/Stamina 4
  y los poderes naturales de su elemento. Inteligencia + Ocultismo dif. 8. Coste: 2 Sangre.

Nivel 5 — Maestría Elemental:
  Control total sobre manifestaciones elementales masivas: oleadas de agua de varios
  metros, tornado local, terremoto en radio 20m, inferno controlado. Daño agravado
  masivo a todos en el área (Taumaturgia × 3 dados). Inteligencia + Ocultismo dif. 9.
  Coste: 3 Sangre. Angustia elemental posible.

═══════════════════════════════════════════════════════
SENDA DEL VERDE
═══════════════════════════════════════════════════════
id: 'senda-del-verde'
Descripción: Manipulación de la vida vegetal. Los Tremere con afinidad por los
rituales herbales y la magia verde aprenden a hacer crecer, controlar y armar
a las plantas como extensiones de su voluntad taumatúrgica.

Nivel 1 — Sentir la Vida Verde:
  Detecta plantas, hongos y vida vegetal en radio (Taumaturgia × 20) metros.
  Sabe si están enfermas, saludables o bajo influencia sobrenatural.
  Percepción + Naturaleza dif. 5. Gratis.

Nivel 2 — Crecer:
  Acelera el crecimiento vegetal: una semilla brota en segundos, una planta crece
  hasta tamaño adulto en 1 turno. Útil para crear cobertura, barreras naturales
  o conseguir plantas específicas. Inteligencia + Naturaleza dif. 6. Coste: 1 Sangre.

Nivel 3 — Armar las Plantas:
  Hace que plantas existentes ataquen o enreden a objetivos. Zarzas que inmovilizan
  (Fuerza 3, dif. 7 para escapar), raíces que emergen y agarran piernas.
  Daño letal por espinas: (éxitos) niveles. Inteligencia + Naturaleza dif. 7. Coste: 1 Sangre.

Nivel 4 — Veneno Vegetal:
  Extrae o crea venenos y toxinas de plantas a demanda. El veneno tiene potencia
  (Taumaturgia × 2) y puede causar efectos variados (parálisis, alucinaciones, daño).
  Vampiros son inmunes a venenos orgánicos pero no a toxinas sobrenaturalmente potenciadas.
  Inteligencia + Medicina dif. 8. Coste: 2 Sangre.

Nivel 5 — Bosque Viviente:
  Transforma un área de hasta (Taumaturgia × 50) m² en un bosque animado hostil.
  Toda la vegetación del área actúa bajo las órdenes del Tremere durante (éxitos) horas.
  Moverse en el área requiere Fuerza + Atletismo dif. 8. Salir del área cuesta 1 nivel letal/turno.
  Inteligencia + Naturaleza dif. 9. Coste: 3 Sangre.

═══════════════════════════════════════════════════════
SENDA ADIVINATORIA
═══════════════════════════════════════════════════════
id: 'senda-adivinatoria'
Descripción: La senda del conocimiento y la profecía. Los Tremere que la estudian
pueden leer el pasado de objetos, percibir el presente a distancia y vislumbrar
posibles futuros. Es la senda del espionaje sobrenatural.

Nivel 1 — Leer el Objeto:
  Toca un objeto y ve su historia más reciente: quién lo usó, qué emociones se
  experimentaron cerca de él, si fue usado violentamente. Hasta (Taumaturgia) días atrás.
  Percepción + Ocultismo dif. 6. Gratis.

Nivel 2 — Visión Lejana:
  Percibe un lugar conocido a distancia como si estuviera allí (vista y oído).
  Puede espiar hasta (Taumaturgia × 10) km. No puede actuar en el lugar visto.
  Percepción + Ocultismo dif. 7. Coste: 1 Sangre. Duración: (éxitos) turnos.

Nivel 3 — Leer el Aura:
  Ve el aura de un ser: estado emocional, nivel de Humanidad/Camino, si es
  sobrenatural y qué tipo, vínculos de Sangre activos, si está mintiendo.
  Percepción + Empatía dif. 8. Coste: 1 Sangre.

Nivel 4 — Visión del Pasado:
  Ve un evento específico del pasado en un lugar determinado, hasta (Taumaturgia) años
  atrás. La visión es como una grabación: ve y oye todo lo que ocurrió.
  Inteligencia + Ocultismo dif. 8. Coste: 2 Sangre. Requiere (éxitos × 2) mínimo para
  eventos de más de 10 años.

Nivel 5 — Vislumbrar el Futuro:
  El Tremere puede solicitar una visión de posibles futuros relacionados con una
  pregunta o evento específico. El futuro no es fijo —es probabilístico.
  Con 3+ éxitos: el Narrador describe el futuro más probable tal como se presenta ahora.
  Con 5+ éxitos: revela también los factores que podrían cambiarlo.
  Inteligencia + Ocultismo dif. 9. Coste: 2 Sangre + 1 Voluntad. La visión puede ser
  perturbadora (tirada de Humanidad dif. 6 si ve cosas horribles).

═══════════════════════════════════════════════════════
SENDA DE LOS ESPÍRITUS
═══════════════════════════════════════════════════════
id: 'senda-de-los-espiritus'
Descripción: Manipulación del Umbra y los espíritus. Esta senda permite al Tremere
interactuar con el mundo espiritual, algo que normalmente está vedado a los vampiros
por su naturaleza de Muertos. Requiere un conocimiento hermético profundo.

Nivel 1 — Sentir el Umbra:
  Percibe presencias espirituales en el área y el "grosor" de la barrera entre
  el mundo físico y el Umbra. Detecta espíritus activos en radio (Taumaturgia × 10) m.
  Percepción + Ocultismo dif. 6. Gratis.

Nivel 2 — Hablar con Espíritus:
  Se comunica con espíritus del Umbra sin cruzar al plano espiritual.
  Los espíritus no están obligados a responder. Carisma + Ocultismo dif. 7.
  Coste: 1 Sangre.

Nivel 3 — Vincular Espíritu:
  Atrapa un espíritu en un objeto o en el propio vampiro. El espíritu queda ligado
  y puede ser usado como fuente de información o para potenciar objetos (Fetiches
  vampíricos). Gnosis del espíritu ≤ Taumaturgia. Inteligencia + Ocultismo dif. 8
  enfrentada a Voluntad del espíritu. Coste: 2 Sangre.

Nivel 4 — Cruzar el Velo:
  El vampiro puede atravesar la barrera hacia el Umbra. En el Umbra, el vampiro
  es plenamente visible a los espíritus y puede interactuar físicamente.
  PELIGRO: En el Umbra, el vampiro es percibido por los Garou como una abominación
  del Wyrm. Inteligencia + Ocultismo dif. 8. Coste: 2 Sangre + 1 Voluntad.

Nivel 5 — Dominar Espíritu:
  Control total sobre un espíritu de Gnosis ≤ (Taumaturgia + 2). El espíritu obedece
  órdenes complejas durante (éxitos) días. Un espíritu dominado puede ser usado como
  arma, informante o para lanzar efectos en el Umbra sin que el vampiro cruce.
  Inteligencia + Ocultismo dif. 9 enfrentada a Voluntad del espíritu. Coste: 3 Sangre.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 3 — SENDAS DE NIGROMANCIA ADICIONALES (V20)
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition V20.
Añade sendas adicionales a la MultiPathDiscipline Nigromancia en:
src/data/powers/v20Disciplines.ts

La Nigromancia Giovanni ya tiene: Senda del Sepulcro (primaria), Senda del Osario,
Senda de las Cenizas. AÑADE las siguientes (isPrimary: false):

═══════════════════════════════════════════════════════
SENDA DEL ALMA
═══════════════════════════════════════════════════════
id: 'senda-del-alma'
Descripción: La senda más personal de la Nigromancia. El Giovanni aprende a
percibir, capturar y manipular las almas de los difuntos directamente —no solo sus
cuerpos o manifestaciones, sino la esencia espiritual misma.

Nivel 1 — Ver las Almas:
  El Giovanni puede ver almas de difuntos en el área (wraiths, ecos espectrales).
  También puede leer si un ser vivo tiene el alma completa o dañada.
  Percepción + Ocultismo dif. 6. Gratis.

Nivel 2 — Llamada del Alma:
  Atrae el alma de un difunto específico hacia el vampiro si está en el mismo plano.
  El alma no puede resistir si el Giovanni conoce su nombre completo en vida.
  Manipulación + Ocultismo dif. 7 enfrentada a Voluntad del difunto. Coste: 1 Sangre.

Nivel 3 — Atar el Alma:
  Vincula el alma de un difunto a un objeto, lugar o al propio vampiro.
  El alma atada no puede cruzar al Más Allá y debe servir como fuente de
  información o poder. (Taumaturgia Giovanni) usos antes de que el alma se consuma.
  Manipulación + Ocultismo dif. 8. Coste: 2 Sangre.

Nivel 4 — Robar el Alma:
  El Giovanni puede extraer el alma de un ser VIVO durante un contacto sostenido (1 turno).
  La víctima queda en estado vegetativo hasta que el alma sea devuelta.
  El vampiro puede retener el alma durante (Nigromancia) días.
  Manipulación + Medicina dif. 9 enfrentada a Voluntad dif. 9. Coste: 2 Sangre + 1 Voluntad.

Nivel 5 — Devolver o Destruir:
  Con un alma en su poder, el Giovanni puede: (A) devolverla al cuerpo restaurando
  completamente al ser (incluso desde la muerte reciente, menos de 1 hora);
  o (B) destruirla completamente —la persona muere y su alma deja de existir,
  imposibilitando cualquier forma de resurrección o contacto espectral futuro.
  Inteligencia + Ocultismo dif. 10 para destrucción (acción de profunda oscuridad).
  Coste opción A: 3 Sangre. Coste opción B: 2 Sangre + 1 Voluntad permanente.

═══════════════════════════════════════════════════════
SENDA DEL TESTIGO
═══════════════════════════════════════════════════════
id: 'senda-del-testigo'  
Descripción: La senda de la memoria de los muertos. El Giovanni puede extraer
memorias y conocimientos de los difuntos, convirtiendo a los muertos en la
biblioteca más completa que existe sobre eventos pasados.

Nivel 1 — Eco del Difunto:
  Percibe una "impresión" emocional del último momento de vida de quien murió en un lugar.
  No son palabras ni imágenes, solo emociones. Percepción + Empatía dif. 6. Gratis.

Nivel 2 — Leer los Huesos:
  Tocando restos físicos, ve los últimos (Nigromancia × 10) minutos de vida de esa persona.
  Imágenes y sonidos, pero borrosos. Percepción + Ocultismo dif. 7. Coste: 1 Sangre.

Nivel 3 — Interrogar al Difunto:
  Puede hacer preguntas directamente a los restos mortales (huesos, cenizas, incluso
  sangre seca). El espíritu ligado a los restos debe responder con la verdad
  (no puede mentir, aunque puede negarse a responder con tirada de Voluntad dif. 7).
  Inteligencia + Ocultismo dif. 7. Coste: 1 Sangre.

Nivel 4 — Memorias Completas:
  Extrae TODAS las memorias de un difunto sobre un tema específico como una
  descarga completa. Si el difunto conocía un secreto, el Giovanni lo conoce.
  Los detalles son perfectos y verificables. Inteligencia + Ocultismo dif. 8.
  Coste: 2 Sangre. Solo funciona en muertos de menos de (Nigromancia × 10) años.

Nivel 5 — Archivo de los Siglos:
  Accede a la memoria colectiva de TODOS los difuntos que murieron en un área
  (radio: Nigromancia × 100 m) a lo largo de la historia.
  Con 3+ éxitos: información sobre cualquier evento histórico que ocurrió allí.
  Con 5+ éxitos: puede "ver" el pasado histórico de ese lugar como visión en tiempo real.
  Inteligencia + Ocultismo dif. 9. Coste: 3 Sangre.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 4 — CLANES MENORES Y LINAJES V20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition V20.
Añade los siguientes clanes menores y linajes en src/data/factions/index.ts
dentro del array V20, y sus disciplinas correspondientes en v20Disciplines.ts.

Los clanes menores del V20 básico son vampiros menos extendidos pero canónicos:

═══════════════════════════════════════════════════════
CAPPADOCIAN (CAPADOCIO) — Clan extinto
═══════════════════════════════════════════════════════
Disciplinas: Auspex, Fortitud, Mortis
Afiliación: Clan independiente (extinto, antecesores Giovanni)
Debilidad: Apariencia cadavérica que empeora con el tiempo (–1 Apariencia por siglo)
Descripción: Los maestros de la muerte y la nigromancia que precedieron a los Giovanni.
Fueron destruidos casi por completo por los Giovanni en el siglo XIV. Los pocos
supervivientes guardan un odio eterno hacia sus asesinos.
nativePowerIds: ['auspex', 'fortitud', 'mortis']

DISCIPLINA MORTIS (para Cappadocian):
PowerCategory completa, 5 niveles, manipulación directa de la muerte, necromancia
sin el sistema de sendas (más intuitiva y directa que la Nigromancia Giovanni):

Nivel 1 — Aura de Muerte: El vampiro emana un frío deathly. Mortales a 3m sienten
terror instintivo (Valentía dif. 6). Enfermos/heridos se deterioran más rápido en su presencia.
Nivel 2 — Palabra de la Muerte: Susurra una sola palabra a un mortal que le hace
ver brevemente la muerte. Pierde 1 Voluntad y actúa con –2 dados durante la escena.
Nivel 3 — Marchitar: Toca a un ser vivo e impone envejecimiento acelerado equivalente
a (éxitos × 10) años de deterioro físico. Daño agravado a mortales.
Nivel 4 — Llamada de la Tumba: Evoca la presencia del reino de los muertos.
Todos los que no sean vampiros o muertos vivientes en radio (Mortis × 5) m
deben tirar Valor dif. 8 o quedar paralizados de terror por (éxitos) turnos.
Nivel 5 — Puerta de la Muerte: Abre un nexo temporal entre el mundo de los vivos
y la muerte. Llama a (éxitos) wraiths/zombis que actúan bajo sus órdenes por (Mortis) horas.

═══════════════════════════════════════════════════════
BAALI — Clan infernal (antagonista)
═══════════════════════════════════════════════════════
Disciplinas: Daimonion, Obtenebración, Presencia
Afiliación: Independiente (adoradores de los Antediluvianos infernales)
Debilidad: Sufren daño agravado adicional de símbolos sagrados genuinos; no pueden
entrar en terreno consagrado genuinamente sin superar Voluntad dif. 8.
Descripción: Vampiros que venden su alma a poderes infernales a cambio de poder.
Considerados monstruos por casi toda la sociedad vampírica.

DISCIPLINA DAIMONION (para Baali):
5 niveles de invocación de fuerzas infernales/demoníacas:
Nivel 1: Detectar la corrupción, el pecado y el mal en personas y lugares.
Nivel 2: Infundir miedo sobrenatural y visiones de tormento.
Nivel 3: Invocar una plaga o maldición menor sobre un objetivo.
Nivel 4: Evocar un demonio menor que actúa por (éxitos) turnos.
Nivel 5: Invocar una entidad infernal mayor con poderes devastadores — acto de terribles consecuencias.

═══════════════════════════════════════════════════════
TZIMISCE ANTIGUOS (Old Clan Tzimisce)
═══════════════════════════════════════════════════════
Nota: No es un clan separado sino una variante del Tzimisce Sabbat.
Los Viejos Clan Tzimisce rechazaron la vía del Sabbat y mantienen la disciplina
Koldunismo (magia eslava elemental) en lugar de Vicisitud.

DISCIPLINA KOLDUNIA/KOLDUNISMO:
Magia de la Tierra (sangre de la tierra eslava), 5 niveles.
Nivel 1-5 manipulando fuerzas naturales elementales de la región natal del Tzimisce.
Solo funciona en el territorio natal o en tierra de ese territorio llevada consigo.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 5 — SISTEMA DE RITOS W20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition W20.
Crea el sistema de Ritos Garou en un NUEVO archivo:
src/data/powers/w20Rites.ts

Los Ritos son rituales sagrados de los Garou. A diferencia de los Dones (poderes
individuales), los Ritos son ceremonias que requieren tiempo y participación
comunitaria. Cada Rito tiene un Rango (1-5) que indica su complejidad.

ESTRUCTURA DE TIPO a crear (o importar si ya existe en types):
```typescript
export interface GarouRite {
  id: string
  name: string
  gameSystem: 'W20'
  categoryType: 'rite'
  rank: 1 | 2 | 3 | 4 | 5
  type: 'caern' | 'death' | 'mystic' | 'punishment' | 'renown' | 'minor'
  description: string
  duration: string
  participants: string
  systemText: string
  dicePool?: { formula: string; difficulty: number }
  cost?: { resource: string; amount: number | string }
  tags: string[]
}
```

IMPLEMENTA los siguientes ritos canónicos del W20 básico (pp. 147-162):

RITOS MENORES (Rango 1):
1. Rito de Contrición — El Garou pide perdón por una ofensa. Recupera 1 Honor perdido.
2. Rito de Mantenimiento del Fetiche — Mantiene un fetiche activo sin perder poder.
3. Rito de la Plegaria a Gaia — Meditación que recupera 1 Gnosis extra.
4. Rito de Despertar — Despierta al Garou de sueños profundos o torpor leve.
5. Rito de Purificación Menor — Limpia corrupción superficial del Wyrm.

RITOS DE RENOMBRE (Rango 1-3):
6. Rito de Pasaje — Ceremonial de aceptación de un nuevo Garou en la manada/tribu.
7. Rito de Nombramiento — Asigna el nombre tribal a un Garou joven.
8. Rito de Reconocimiento del Rango — Certifica el ascenso de Rango ante testigos.

RITOS MÍSTICOS (Rango 2-4):
9. Rito de Vinculación — Une temporalmente a dos Garou en mente durante (éxitos) horas.
10. Rito de la Luna Llena — Aumenta el pool de Rabia máximo por una noche.
11. Rito de Convocación Espiritual — Llama a un espíritu específico para negociar.
12. Rito del Caern — Activa y mantiene un Caern existente.

RITOS DE MUERTE (Rango 2-4):
13. Rito de Lamentación — Honra a los caídos, ayuda a sus espíritus a cruzar al Umbra.
14. Rito del Último Aullido — Permite al espíritu de un Garou muerto comunicar un
    último mensaje.
15. Rito de Cacería de Honor — Declara legítima la cacería de un Garou traidor.

RITOS DE CASTIGO (Rango 3-5):
16. Rito de la Mordaza — Prohíbe al castigado revelar secretos de la tribu.
17. Rito de la Cicatriz — Marca físicamente a un Garou deshonrado; la cicatriz
    mágica no se cura.
18. Rito del Destierro — Expulsa a un Garou de sus derechos tribales.

Para cada rito incluye: descripción narrativa, mecánica completa de tirada y efectos,
tiempo de realización, participantes mínimos requeridos, y efectos de pifia.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 6 — SISTEMA DE FOCOS Y PARADOJA M20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition M20.
Crea dos nuevos archivos de datos para el sistema mágico completo de M20:

═══════════════════════════════════════════════════════
ARCHIVO 1: src/data/m20Foci.ts
═══════════════════════════════════════════════════════
Los Focos son los instrumentos o métodos que cada Tradición usa para lanzar
magia. Sin el Foco correcto, la magia se vuelve Vulgar y acumula Paradoja.
Un mago con Arete alta puede lanzar magia sin Focos, pero es más difícil.

ESTRUCTURA:
```typescript
export interface TraditionFoci {
  traditionId: string
  traditionName: string
  paradigm: string  // La visión del mundo de la tradición
  primaryFoci: string[]  // Instrumentos principales
  secondaryFoci: string[]  // Instrumentos secundarios
  descriptionFoci: string  // Cómo usan la magia
  sphereAffinity: string[]  // Esferas "naturales" de la tradición
  coincidentalExamples: string[]  // Ejemplos de magia coincidente
  vulgurExamples: string[]  // Ejemplos de magia vulgar
}
```

IMPLEMENTA los Focos para las 9 Tradiciones:
1. Akásica — Focos: postura corporal, meditación, Katas marciales, respiración
2. Verbena — Focos: sangre, hierbas, rituales lunares, sacrificio voluntario
3. Orden de Hermes — Focos: inscripciones rúnicas, bastón/varita, sellos mágicos
4. Adeptos Virtuales — Focos: tecnología, código, interfaces digitales, datos
5. Culto del Éxtasis — Focos: música, drogas rituales, danza, experiencias extremas
6. Eutanatos — Focos: muerte, rituales de paso, veneno, cartas de Tarot
7. Coro Celestial — Focos: oración, fe, símbolos sagrados, textos divinos
8. Cuentasueños — Focos: historias, sueños, arte, visiones
9. Hijos del Éter — Focos: máquinas, inventos steampunk, experimentos, éter

═══════════════════════════════════════════════════════
ARCHIVO 2: src/data/m20Paradox.ts
═══════════════════════════════════════════════════════
La Paradoja se acumula cuando un mago lanza magia Vulgar (observable por mortales).
Es el sistema más importante de M20 después de las Esferas.

IMPLEMENTA:
1. Tabla de acumulación de Paradoja:
   - Magia coincidente: 0 Paradoja
   - Magia Vulgar sin testigos: 1 Paradoja por éxito sobrante
   - Magia Vulgar con testigos mundanos: 2 Paradoja por éxito + 1 por testigo adicional
   - Magia directamente imposible: 3+ Paradoja automática

2. Efectos de la Paradoja acumulada:
   - 1-5 puntos: Incomodidades (efectos menores, objetos que fallan)
   - 6-10 puntos: Backlash (daño directo al mago: 1 dado agravado por 2 puntos)
   - 11-15 puntos: Paradox Spirits (espíritus de la Paradoja que persiguen al mago)
   - 16-20 puntos: Realidad Rebelde (el entorno del mago se vuelve contra él)
   - 21+ puntos: Agujero en la Realidad / Zona de Paradoja / posible eliminación del mago

3. Sistema de disipación:
   - Reposo (1 punto por día sin magia)
   - Ritual de disipación (Arete vs dificultad de la Paradoja acumulada)
   - En un Nodo Mágico (1 punto extra por hora de meditación)

4. Paradox Spirits — tipos de entidades que persiguen a magos:
   - Agentes de la Realidad (imponen el Consenso)
   - Abominaciones de la Paradoja (criaturas deformes del exceso mágico)
   - Eco de Paradoja (versiones distorsionadas del propio mago)
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 7 — ARTE DE CONTRATOS C20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition C20 (Changeling: The Dreaming).
Añade el Arte de los Contratos al archivo src/data/powers/c20Arts.ts
siguiendo exactamente el mismo formato de PowerCategory que los otros Artes.

CONTRATOS — El Arte de los Tratos y Pactos Feéricos
id: 'contratos'
Descripción: El Arte más político de todos los Changelings. Los Contratos
son juramentos feéricos vinculantes que no pueden romperse sin consecuencias
mágicas para ambas partes. Son el fundamento de toda sociedad Sidhe y el
método por el que los Changelings formalizan alianzas, deudas y promesas.
A diferencia de los otros Artes que afectan el mundo, los Contratos tejen
obligaciones entre seres. Rompedor de contratos: el Changeling pierde
permanentemente 1 punto de Glamour máximo por cada Contrato roto.

Nivel 1 — Sentir el Juramento:
  El Changeling puede detectar si alguien ha hecho un juramento y si lo está
  cumpliendo o rompiendo. Simplemente siendo consciente del estado de cualquier
  promesa que involucre a personas en el mismo cuarto.
  Percepción + Ley dif. 5. Gratis.
  Con 3+ éxitos: sabe exactamente qué prometió cada persona y a quién.
  Reino requerido: Actor (para juramentos de mortales) o Fae (para juramentos feéricos).
  Tags: ['detección', 'juramento', 'pasivo', 'política']

Nivel 2 — Pronunciar el Contrato:
  El Changeling puede crear un Contrato feérico vinculante entre dos partes
  dispuestas. El Contrato tiene fuerza de magia feérica: romperlo causa daño inmediato.
  Ambas partes deben acordar voluntariamente los términos.
  Manipulación + Ley dif. 6 para Contratos simples (1-2 cláusulas).
  Coste: 1 Glamour. El Contrato dura hasta que se cumplan sus términos.
  Penalización por ruptura: 1-3 niveles de daño agravado al infractor (según gravedad).
  Reinos requeridos: Actor + Fae para pactos entre Changeling y mortal.
  Tags: ['contrato', 'pacto', 'vinculante', 'político']

Nivel 3 — Reforzar el Contrato:
  Añade cláusulas a un Contrato existente o refuerza sus penalizaciones.
  También puede detectar y describir todos los Contratos activos sobre una persona.
  Manipulación + Ley dif. 7.
  Coste: 2 Glamour.
  Con 3+ éxitos puede añadir hasta (éxitos) cláusulas adicionales a un Contrato en vigor.
  Penalización reforzada: hasta 5 niveles de daño agravado por ruptura.
  Tags: ['refuerzo', 'cláusula', 'auditoría', 'político']

Nivel 4 — Romper el Contrato:
  El Changeling puede anular un Contrato existente —pero paga el precio.
  Rompiendo el suyo propio: pierde 1 Glamour permanente pero queda libre.
  Rompiendo el de otro: tirada enfrentada Manipulación + Ley del Changeling
  vs. Voluntad + Ley (si lo tiene) del hacedor original del Contrato.
  Dif. 8 para Contratos de nivel 1-2; dif. 9 para nivel 3+.
  Coste: 3 Glamour.
  La ruptura de un Contrato de nivel 3+ siempre provoca un flash visible de
  energía feérica — cualquier Changeling en el área lo siente.
  Tags: ['ruptura', 'liberación', 'costoso', 'político']

Nivel 5 — Gran Tratado:
  El poder supremo de los Contratos: el Changeling puede establecer un Contrato
  que afecte a grupos enteros (clanes, gremios, casas nobles) en lugar de solo
  individuos. Un Gran Tratado puede durar generaciones.
  Manipulación + Ley dif. 9. Proceso de ritual de 1 hora con todos los representantes presentes.
  Coste: 4 Glamour.
  Un Gran Tratado que se rompe causa daño agravado a TODOS los miembros del grupo
  infractor (1-3 niveles según qué tan central era el grupo).
  Los Grandes Tratados son la base de toda la política Sidhe; romper uno es
  suficiente para desencadenar guerras feéricas.
  Tags: ['gran-tratado', 'grupal', 'generacional', 'épico', 'político', 'sidhe']
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 8 — ARCANO USURA Wr20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition Wr20.
Añade el Arcano Usura al archivo src/data/powers/wr20Arcanos.ts
siguiendo exactamente el mismo formato PowerCategory que los otros Arcanos.

USURA — El Arcano de la Deuda y la Obligación
id: 'usura'
Categoría: arcano
Gremio: Usureros (Usurers)
Descripción: El Arcano más temido en el ámbito político del Inframundo.
Usura permite al Wraith percibir, crear y manipular las obligaciones entre
los muertos. En el Inframundo, una promesa incumplida tiene peso físico real;
una deuda es una cadena tan real como el Corpus. Los Usureros son prestamistas
de voluntad, vendedores de Pathos y corredores de pactos entre los muertos.
Nadie hace tratos con un Usurero sin saber exactamente lo que arriesga.

Nivel 1 — Sentir la Deuda:
  El Wraith percibe todas las obligaciones y deudas pendientes de cualquier ser
  en su entorno —tanto en el mundo de los vivos como en el Inframundo.
  Ve las deudas como hilos de luz pálida que conectan a los deudores con
  sus acreedores. Pasivo y automático para deudas evidentes.
  Para deudas ocultas o negadas: Percepción + Usura dificultad 6.
  Con 3+ éxitos: conoce exactamente la naturaleza, valor y antigüedad de cada deuda.
  Coste: Gratis.
  Tags: ['detección', 'deuda', 'obligación', 'pasivo', 'inframundo']

Nivel 2 — Registrar el Pacto:
  El Wraith puede crear un Pacto vinculante entre dos Wraiths (o entre un Wraith
  y un mortal con tendencias espirituales). El Pacto tiene fuerza mágica en el Inframundo.
  El incumplidor sufre daño de Pathos equivalente al valor del pacto.
  Manipulación + Usura dificultad 7 (ambas partes deben acordar).
  Coste: 1 Pathos.
  Con 3+ éxitos el Pacto incluye cláusulas de penalización adicional.
  Duración: hasta que las condiciones se cumplan o 1 año-Inframundo (varios meses reales).
  Tags: ['pacto', 'vinculante', 'pathos', 'político', 'inframundo']

Nivel 3 — Cobrar la Deuda:
  El Wraith puede reclamar el pago de una deuda existente por la fuerza —extraer
  Pathos, Corpus o Voluntad de un deudor incluso a distancia.
  Tirada: Manipulación + Usura dificultad 8 enfrentada a Voluntad dificultad 7 del deudor.
  Por cada éxito neto: extrae 1 punto de Pathos del deudor y lo transfiere al Wraith.
  Con 4+ éxitos netos: puede extraer 1 punto de Voluntad en lugar de Pathos.
  Coste: 1 Pathos.
  Rango: hasta (Usura × 20) metros.
  Tags: ['cobro', 'pathos', 'extracción', 'deudor', 'rango']

Nivel 4 — Transferir la Deuda:
  El Wraith puede redirigir una deuda de un Wraith a otro —sin que el nuevo
  deudor tenga necesariamente que consentir si el Wraith obtiene suficientes éxitos.
  Esto es considerado una de las acciones más despreciables en la sociedad del Inframundo.
  Tirada: Manipulación + Usura dificultad 9 enfrentada a Voluntad dificultad 8 del nuevo deudor.
  Con 3 éxitos netos: la deuda se transfiere completamente.
  El antiguo deudor queda libre; el nuevo no sabe inicialmente de qué se trata.
  Coste: 2 Pathos. Tirada de Angustia dificultad 7 (acción moralmente cuestionable).
  Tags: ['transferencia', 'deuda', 'engaño', 'angustia', 'político']

Nivel 5 — La Gran Deuda:
  El Wraith puede imponer una Deuda de Muerte —una obligación de escala épica
  que el deudor DEBE cumplir o su Corpus se desintegra gradualmente.
  Solo puede usarse en Wraiths que ya han incumplido un Pacto o han cometido
  una traición verificable al Wraith.
  Tirada extendida: Manipulación + Usura dificultad 10, 15 éxitos mínimo.
  El deudor resiste con Voluntad dificultad 9 por ronda.
  Con éxito: la Gran Deuda queda inscrita en el Corpus del deudor.
  Pierde 1 punto de Corpus por semana hasta cumplir la obligación impuesta.
  Si el Corpus llega a 0 por la Gran Deuda, el Wraith sufre Disolución Final
  (su alma se disuelve en el Vacío, sin posibilidad de regreso).
  Coste: 3 Pathos + 1 punto de Voluntad permanente. Angustia dificultad 9 automática.
  Tags: ['gran-deuda', 'corpus', 'disolución', 'angustia', 'épico', 'terrible', 'inframundo']
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 9 — SISTEMA DE LA SOMBRA Wr20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition Wr20.
Crea un nuevo archivo: src/data/wr20Shadow.ts

La Sombra (Shadow) es el aspecto más único de Wraith: The Oblivion.
Cada Wraith lleva dentro suyo una entidad antagonista —su propia oscuridad—
que puede ser interpretada por otro jugador en mesa o por el Narrador.

IMPLEMENTA las siguientes estructuras:

1. ANGUSTIA (Catharsis System):
   - Niveles de Angustia acumulada y sus efectos (1-10)
   - Qué activa la Angustia (ver sufrir, actos crueles, recordar la muerte propia)
   - Efectos de la Angustia alta: 7+ (la Sombra empieza a controlar acciones)
   - Catarsis: cuando la Angustia alcanza 10, la Sombra toma el control completamente

2. RASGOS DE LA SOMBRA (Dark Passions):
   Las Pasiones Oscuras de la Sombra que se oponen a las Pasiones del Wraith.
   Al menos 8 Pasiones Oscuras tipo:
   - Celos (opuesto a Amor)
   - Codicia (opuesto a Generosidad)
   - Crueldad (opuesto a Compasión)
   - Desesperación (opuesto a Esperanza)
   - Odio (opuesto a Respeto)
   - Cobardía (opuesto a Valentía)
   - Lujuria de Destrucción (opuesto a Preservación)
   - Nihilismo (opuesto a Propósito)

3. PODERES DE LA SOMBRA (Shadow Abilities):
   6-8 habilidades que la Sombra puede usar CONTRA el propio Wraith o contra otros:
   - Susurros: la Sombra persuade al Wraith de acciones oscuras (tirada resistencia)
   - Sabotaje: en momentos críticos, puede hacer fallar una tirada del Wraith
   - Posesión Parcial: la Sombra habla por la boca del Wraith brevemente
   - Amplificar la Angustia: en presencia de sufrimiento, incrementa la Angustia extra
   - Seducción Espectral: puede comunicarse con Espectros sin que el Wraith lo sepa

4. MECÁNICA DE CATARSIS:
   Cuando la Angustia llega a 10:
   - La Sombra toma control (el jugador de la Sombra ahora controla el personaje)
   - El Wraith queda "atrapado" como espectador en su propio Corpus
   - Para recuperar el control: Voluntad dif. 8 por turno, requiriendo 3 éxitos totales
   - Si la Catarsis no se resuelve en (Voluntad) turnos: riesgo de convertirse en Espectro

5. ESPECTROS (Spectres):
   Qué son los Wraiths que pierden control de su Sombra:
   - Han sido poseídos permanentemente por la Sombra
   - Sirven al Ángel Oscuro Oblivion (la Nada total)
   - Características mecánicas de un Espectro básico
   - Cómo pueden ser salvados (raro, dificilísimo)
   - Los rangos de Espectro: Lemure, Haunt, Specter, Malfean
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 10 — MECÁNICAS UNIVERSALES FALTANTES
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition.
Añade las siguientes CoreRules al archivo src/data/coreSystem.ts
siguiendo el mismo formato de objeto CoreRule que ya existe.

AÑADIR como nuevas CoreRules (applicableTo: 'all' o específico por sistema):

═══════════════════════════════════════════════════════
REGLA: WILLPOWER COMO RECURSO
═══════════════════════════════════════════════════════
id: 'willpower-resource'
applicableTo: 'all'
Puntuación: 1-10, igual a la suma de las Virtudes primarias del personaje.
Recuperación: 1 punto al despertar (tras descanso/letargo), o por completar
objetivos personales significativos.
Usos:
  - Gastar 1 Voluntad → tirar 1 dado adicional en cualquier tirada
  - Gastar 1 Voluntad → reducir dificultad en 1 (una sola vez por escena en el mismo tipo)
  - Gastar 1 Voluntad → ignorar efectos de miedo, parálisis o control mental por 1 turno
  - Gastar 1 Voluntad permanente → resistir efectos de cambio de personalidad permanentes
Voluntad como barrera: ciertos poderes requieren que la víctima no tenga Voluntad
disponible para ser afectada.

═══════════════════════════════════════════════════════
REGLA: DAÑO AGRAVADO DIFERENCIADO
═══════════════════════════════════════════════════════
id: 'aggravated-damage-by-system'
applicableTo: 'all'
Qué causa daño agravado por sistema:
  V20: Fuego, luz solar, garras/colmillos de hombres lobo, algunos poderes mágicos
  W20: Plata (en cualquier forma), fuego, garras/colmillos de vampiro, dones agravados
  M20: Fuerzas focalizadas (relámpago directo), paradoja backlash, magia de Entropía
  C20: Armas de hierro frío contra Changelings, daño extremo de Banalidad concentrada
  Wr20: Armas de Corpus a Corpus (arcanos de combate), desintegración espectral
Mecánica de absorción: el daño agravado no puede reducirse con Absorción ordinaria.
Solo Fortitud/Fortaleza/Resistencia sobrenatural lo mitiga, y a dificultad +2.

═══════════════════════════════════════════════════════
REGLA: FRENESÍ/FRENZY
═══════════════════════════════════════════════════════
id: 'frenzy-system'
applicableTo: ['V20', 'W20']
V20 — Frenesí de la Bestia:
  Activadores: hambre extrema, ira, presencia del fuego/luz solar, ser atacado.
  Tirada de control: Autocontrol dif. variable (5 por ira simple, hasta 9 por hambre aguda).
  En Frenesí: el vampiro actúa por instinto puro, no puede gastar Voluntad para resistir.
  Tipos: Frenesí de Hambre (busca sangre sin control), Wrath Frenzy (violencia pura),
  Rötschreck (huida aterrorizada del fuego/luz).

W20 — Frenesí de Rabia (Berserk):
  Activadores: recibir daño severo, visión de agentes del Wyrm, Rabia al máximo.
  Tirada de control: Rabia dif. 6. Fallar = Frenesí de Rabia.
  En Frenesí de Rabia: +2 dados de combate pero sin tacto, puede atacar aliados.
  Harano: el frenesí inverso — apatía y desesperación espiritual total.

═══════════════════════════════════════════════════════
REGLA: SISTEMA DE GENERACIONES V20
═══════════════════════════════════════════════════════
id: 'generation-system'
applicableTo: ['V20']
Tabla completa de generaciones:
  3ª generación: los Antediluvianos — inmorales, max Sangre/turno: ilimitado
  4ª generación: Methuselahs — máx. atributo 10, Sangre/turno 6, pool Sangre 50
  5ª generación: Sangre máx. 40, Sangre/turno 5, max atributo 9
  6ª generación: Sangre máx. 30, Sangre/turno 4, max atributo 8
  7ª generación: Sangre máx. 20, Sangre/turno 3, max atributo 7
  8ª generación: Sangre máx. 15, Sangre/turno 2, max atributo 6
  9ª generación: Sangre máx. 14, Sangre/turno 2, max atributo 5
  10ª generación: Sangre máx. 13, Sangre/turno 1, max atributo 5
  11ª generación: Sangre máx. 12, Sangre/turno 1, max atributo 5
  12ª generación: Sangre máx. 11, Sangre/turno 1, max atributo 5
  13ª generación: Sangre máx. 10, Sangre/turno 1, max atributo 5
  14ª y 15ª (Thin-Blooded): Sangre máx. 9, Sangre/turno 1, habilidades limitadas

═══════════════════════════════════════════════════════
REGLA: BANALIDAD vs GLAMOUR C20
═══════════════════════════════════════════════════════
id: 'banality-glamour-system'
applicableTo: ['C20']
Glamour (1-10): la energía feérica del personaje.
  Recuperación: estar en presencia de creatividad, arte, asombro auténtico;
  despertar Glamour en humanos (a veces mediante el robo de sueños);
  Actos de creación genuina.

Banalidad (1-10): la corrupción mundana que erosiona la esencia feérica.
  Aumenta: tiempo en entornos corporativos/burocráticos, uso de tecnología sin magia,
  contacto prolongado con mortales sin imaginación, estrés y trauma.
  
Interacción: Glamour + Banalidad del personaje = 10 (en equilibrio).
  Banalidad 1-3: el Changeling es plenamente feérico, las quimeras son reales para él.
  Banalidad 4-6: equilibrio, puede ver lo mundano y lo feérico.
  Banalidad 7-9: la esencia feérica se marchita; los poderes tienen +1 dificultad por punto.
  Banalidad 10: Olvido — el Changeling pierde toda memoria de ser feérico.
  Glamour 0: Frenesí de Bedlam — pérdida total del control emocional en éxtasis feérico.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 11 — KITHS ADICIONALES C20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition C20.
Añade los siguientes Kiths adicionales al archivo src/data/factions/index.ts
dentro del array C20, siguiendo el mismo formato que los Kiths existentes.

KITHS ADICIONALES DEL MANUAL C20 (pp. 82-105):

1. MERROW (Sirénido de Agua Dulce):
   Archetype: Guardián de ríos y lagos
   Disciplinas: Navegación y manipulación de agua fresca
   nativePowerIds: ['primordial', 'viaje']
   Debilidad: Deben sumergirse en agua fresca al menos una hora por día o pierden
   1 punto de Glamour. En zonas completamente áridas, pierden 1 Glamour/hora.
   Descripción: Criaturas feéricas asociadas con el agua dulce, más raras que los
   Selkie (que habitan el mar). Guardianes de ríos, lagos y fuentes.

2. KORRED (Duende de Piedra):
   Archetype: Bailarín de la tierra y guardián de colinas
   nativePowerIds: ['primordial', 'soberania']
   Debilidad: No pueden usar Glamour durante el día en ambientes urbanos sin
   contacto con tierra/piedra natural. En edificios de cemento, –2 a todas las tiradas.
   Descripción: Feéricos salvajes con aspecto de pequeños humanoides robustos cubiertos
   de musgo y piedra. Sus danzas circulares en las colinas se observan desde hace siglos.

3. AONIDE (Musa Inspiradora):
   Archetype: Fuente de inspiración artística
   nativePowerIds: ['somniloquios', 'onomancia']
   Debilidad: No pueden crear su propio arte — solo pueden inspirar a otros.
   Si intentan crear algo para sí mismos (escribir, pintar, componer), pierden 1 Glamour.
   Descripción: Musas feéricas que se adhieren a artistas mortales a quienes inspiran.
   Son intermediarios entre el Ensueño y la creatividad humana.

4. NIXIE (Espíritu de Agua):
   Archetype: Ser elemental acuático, seductor
   nativePowerIds: ['chicaneria', 'soberania']
   Debilidad: No pueden mentir en tierra firme — la deception feérica solo funciona
   cerca del agua (a menos de 30 metros de una masa de agua natural).
   Descripción: Feéricos del agua con capacidad de adoptar forma perfectamente
   humana. Históricamente asociados con ahogamientos y con atraer mortales al agua.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 12 — TRADICIONES ANTAGONISTAS M20 (Tecnomancia)
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition M20.
Añade las Convenciones de la Técnocracia al archivo src/data/factions/index.ts
dentro del array M20 como una sección separada de antagonistas.

La TÉCNOCRACIA es la organización opuesta a las Tradiciones: controla la realidad
mediante la tecnología y el Consenso, suprimiendo la magia "vulgar" de las Tradiciones.

CONVENCIONES DE LA TÉCNOCRACIA (las 5 principales):

1. UNIÓN ITERATIVA:
   Paradigma: La realidad es un sistema que puede ser optimizado mediante ingeniería.
   Focos: Tecnología avanzada, planos, diagramas técnicos, nanotecnología.
   Esferas afines: Materia, Primo, Fuerzas.
   Descripción: Ingenieros de la realidad. Construyen los Wonders tecnológicos que
   mantienen el Consenso. Rivales de los Hijos del Éter.

2. SYNDICATO NWO (New World Order):
   Paradigma: La información es poder. Controlar la información es controlar la realidad.
   Focos: Tecnología de comunicaciones, psicología, MIB (Hombres de Negro).
   Esferas afines: Mente, Correspondencia, Entropía.
   Descripción: Los agentes secretos de la Técnocracia. Borran memorias, controlan medios,
   eliminan evidencias de lo sobrenatural.

3. PROGENITORES:
   Paradigma: La biología es tecnología. El cuerpo humano es perfectible.
   Focos: Medicina avanzada, ingeniería genética, farmacología.
   Esferas afines: Vida, Mente, Materia.
   Descripción: Científicos que manipulan la biología humana. Rivales de la Verbena.

4. VOID ENGINEERS:
   Paradigma: El espacio exterior es la siguiente frontera del Consenso.
   Focos: Tecnología espacial, física cuántica, exploración.
   Esferas afines: Correspondencia, Fuerzas, Espíritu.
   Descripción: Exploradores del cosmos real y virtual. Los únicos técnomantes que
   aceptan la existencia de lo sobrenatural (lo llaman "anomalías del espacio profundo").

5. VIGILANTES (Watchers):
   Paradigma: El peligro sobrenatural debe ser neutralizado con ciencia.
   Focos: Armas experimentales, técnicas de interrogación, equipamiento especializado.
   Esferas afines: Fuerzas, Materia, Mente.
   Descripción: Los soldados de la Técnocracia. Los que van en campo a eliminar
   magos, Garou y otros seres que amenazan el Consenso.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 13 — TRIBUS EXTINTAS Y RARAS W20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition W20.
Añade las siguientes entidades a src/data/factions/index.ts dentro del array W20,
como "tribus extintas/perdidas" y sus dones correspondientes en w20Gifts.ts.

═══════════════════════════════════════════════════════
NUWISHA (Coyotes Cambiantes) — Cambiante, no Garou estrictamente
═══════════════════════════════════════════════════════
Los Nuwisha no son Garou sino Fera (otros Cambiantes). Son los bromistas
sagrados que sirven a Coyote, el Embaucador. Sus dones reflejan el engaño,
el humor y la habilidad de viajar al Umbra.
Debilidad: No pueden tomar la forma Crinos. Solo Homid, un equivalente a Glabro,
y dos formas coyote.
Dones Nuwisha básicos (5 niveles):
  Nivel 1: Risa Sagrada — cualquier ser que le oiga reír debe superar Voluntad dif. 7 o ría.
  Nivel 2: Paso del Embaucador — desaparece y reaparece hasta 10m en línea de visión.
  Nivel 3: Engaño del Umbra — puede alterar su aspecto en el Umbra.
  Nivel 4: Lección del Coyote — Implanta una lección (koan) en la mente de un ser.
  Nivel 5: Camino del Embaucador — viaja al Umbra Profundo sin riesgo normal.

═══════════════════════════════════════════════════════
HAKKEN (Garou del Pacífico — Señores de la Sombra orientales)
═══════════════════════════════════════════════════════
No es una tribu separada sino una rama cultural de los Señores de la Sombra
que evolucionó en Japón. Sus dones son similares pero con flavour de bushido y
espíritus japoneses (kami). Útil para campañas en Asia.
Dones especiales de Hakken (reemplazo de algunos Señores de la Sombra):
  Los dones son mecánicamente idénticos a los Señores de la Sombra pero con
  nombres y descripciones adaptadas: "Corte del Viento" en lugar de "Sombra Táctica",
  "Silencio del Bambú" en lugar de "Velo de la Oscuridad", etc.

═══════════════════════════════════════════════════════
RATKIN (Cambiantes Rata) — Fera
═══════════════════════════════════════════════════════
Los Ratkin son los Fera de las ratas, agentes del caos y la supervivencia.
Extremadamente peligrosos en números. Son antagonistas frecuentes de los Garou.
Debilidad: Phobia extrema a los gatos sobrenaturales. En presencia de un Bastet
(Cambiante Felino), tirada de Miedo dif. 8 o huyen.
Dones Ratkin básicos (3 niveles de muestra):
  Nivel 1: Plaga Menor — puede infectar a un ser con enfermedad mundana.
  Nivel 2: Control de Roedores — convoca y controla ratas ordinarias.
  Nivel 3: Forma de Enjambre — se disuelve en docenas de ratas pequeñas.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 14 — MECÁNICA DE RENOMBRE W20
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition W20.
Crea el archivo src/data/w20Renown.ts con el sistema completo de Renombre.

El Renombre es la reputación espiritual de un Garou. Tiene tres tipos:
Gloria (combat/bravery), Sabiduría (wisdom/spirit), Honor (duty/law).
El total de Renombre determina el Rango del Garou.

IMPLEMENTA:

1. TABLA DE RANGOS (Rank Table):
   Rango 0 — Cachorro (Cub): 0 Renombre en cualquier categoría
   Rango 1 — Adolescente (Cliath): 1 Gloria/Sabiduría/Honor mínimo
   Rango 2 — Adulto (Fostern): 4 en al menos 2 categorías
   Rango 3 — Elder/Anciano (Adren): 8 en al menos 2 categorías
   Rango 4 — Gran Elder (Athro): 12 en al menos 2 categorías
   Rango 5 — Leyenda (Elder): 15 en todas las categorías

2. CÓMO SE GANA RENOMBRE:
   Gloria: Victorias en combate contra el Wyrm, actos de valentía, defensa del Caern.
   Sabiduría: Negociación exitosa, ritualismo correcto, conocimiento espiritual demostrado.
   Honor: Cumplir juramentos, actuar con la Letanía, respetar las tradiciones Garou.
   Mecánica: el Narrador otorga puntos al final de cada sesión (1-3 por categoría).

3. CÓMO SE PIERDE RENOMBRE:
   Gloria pierde: Huir de combate sin razón, ser derrotado con deshonor.
   Sabiduría pierde: Ignorar a los espíritus, violar rituales sin necesidad.
   Honor pierde: Romper juramentos, violar la Letanía, matar Garou sin juicio previo.
   Mecánica: el Narrador retira puntos por actos contrarios.

4. DESAFÍOS DE RENOMBRE:
   Un Garou puede desafiar el Renombre de otro si cree que no está justificado.
   Proceso: declaración pública + ritual + decisión del grupo por concilio.

5. BENEFICIOS POR RANGO:
   Rango 1: puede aprender Dones de nivel 1-2.
   Rango 2: puede aprender Dones nivel 1-3, acceso a Ritos de nivel 1-2.
   Rango 3: puede aprender todos los Dones, liderar manada, acceso a Ritos nivel 1-3.
   Rango 4: puede convocar Gran Concilio, enseñar a otros, acceso a Ritos nivel 1-4.
   Rango 5: autoridad máxima, acceso a todos los Ritos.
```

---

## ════════════════════════════════════════════════════════════
## PROMPT 15 — REVISIÓN FINAL Y COHERENCIA
## ════════════════════════════════════════════════════════════

```
Eres un experto en World of Darkness 20th Anniversary Edition.
Esta es la revisión final del proyecto WoD20 Vademecum. Realiza las
siguientes comprobaciones de coherencia sin modificar el contenido, solo
corrigiendo inconsistencias técnicas:

1. VERIFICAR que todos los nativePowerIds en factions/index.ts referencian
   PowerCategory/MultiPathDiscipline IDs que EXISTEN en los archivos de poderes.
   Lista todos los IDs rotos que encuentres.

2. VERIFICAR que todos los gameSystem: 'V20'/'W20'/'M20'/'C20'/'Wr20' son
   exactamente esos strings (no variaciones).

3. VERIFICAR que todos los categoryType son exactamente uno de:
   'discipline' | 'gift' | 'sphere' | 'art' | 'arcano' | 'rite' | 'form'
   (según el sistema).

4. VERIFICAR que cada PowerCategory tiene al menos 5 elementos en su array levels
   (nivel 1 al 5) y que no hay niveles duplicados o salteados.

5. VERIFICAR que los cost.resource son consistentes por sistema:
   V20: 'Sangre' o 'Voluntad' o 'Gratis'
   W20: 'Gnosis' o 'Rabia' o 'Gratis'
   M20: 'Quintaesencia' o 'Voluntad' o 'Gratis'
   C20: 'Glamour' o 'Voluntad' o 'Gratis'
   Wr20: 'Pathos' o 'Voluntad' o 'Gratis'

6. Reporta cualquier otro error tipográfico o inconsistencia que encuentres.
7. No modifiques el contenido narrativo, solo los errores técnicos y de consistencia.
```

---

## NOTAS DE USO PARA EL DESARROLLADOR

### Orden recomendado de ejecución:
1. **PROMPT 1** — Correcciones críticas (Gangrel + Proteanismo) → siempre primero
2. **PROMPT 8** — Arcano Usura → segundo (corrige el gremio roto)
3. **PROMPT 7** — Arte de Contratos C20 → tercero (completa el sistema C20)
4. **PROMPT 2** — Sendas de Taumaturgia → cuarto (enriquece V20)
5. **PROMPT 3** — Sendas de Nigromancia → quinto (enriquece V20)
6. **PROMPT 6** — Focos y Paradoja M20 → sexto (completa el sistema M20)
7. **PROMPT 5** — Ritos W20 → séptimo (completa W20)
8. **PROMPT 9** — Sistema de la Sombra Wr20 → octavo (completa Wr20)
9. **PROMPT 10** — Mecánicas universales → noveno (enriquece coreSystem)
10. **PROMPT 4** — Clanes menores V20 → décimo (expande V20)
11. **PROMPT 11** — Kiths adicionales C20 → undécimo (expande C20)
12. **PROMPT 12** — Técnocracia M20 → duodécimo (expande M20)
13. **PROMPT 13** — Tribus extintas W20 → decimotercero (expande W20)
14. **PROMPT 14** — Renombre W20 → decimocuarto (completa mecánicas W20)
15. **PROMPT 15** — Revisión final → siempre AL FINAL

### Recordatorio de estructura de archivos:
```
src/data/
├── gameSystems.ts          ← Config de los 5 sistemas (NO modificar sin necesidad)
├── coreSystem.ts           ← Reglas universales (añadir CoreRules)
├── factions/
│   └── index.ts            ← Todos los clanes/tribus/tradiciones/kiths/gremios
└── powers/
    ├── v20Disciplines.ts   ← Disciplinas V20 (añadir Proteanismo, sendas)
    ├── w20Gifts.ts         ← Dones W20 (completo)
    ├── w20Forms.ts         ← Formas Garou (completo)
    ├── w20Rites.ts         ← NUEVO — Ritos W20
    ├── m20Spheres.ts       ← Esferas M20 (completo)
    ├── c20Arts.ts          ← Artes C20 (añadir Contratos)
    ├── wr20Arcanos.ts      ← Arcanos Wr20 (añadir Usura)
    └── index.ts            ← Exportaciones (actualizar al añadir archivos)

src/data/
├── m20Foci.ts              ← NUEVO — Focos por Tradición
├── m20Paradox.ts           ← NUEVO — Sistema de Paradoja
└── wr20Shadow.ts           ← NUEVO — Sistema de la Sombra
```

---

*Este documento fue generado a partir de la auditoría INVENTARIO_AUDITORIA_WoD20.md*
*Fecha: 10 de junio de 2026*
*Estado del proyecto al momento de la auditoría: Avanzado (85% completado para juego básico)*
