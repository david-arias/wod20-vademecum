// ─────────────────────────────────────────────────────────────────────────────
// W20 RITOS GAROU — 18 Ritos Canónicos del Manual W20
// ─────────────────────────────────────────────────────────────────────────────

// ─── Interfaz GarouRite ───────────────────────────────────────────────────────

export type RiteType = 'minor' | 'renown' | 'mystic' | 'death' | 'punishment'

export interface GarouRiteDicePool {
  formula: string
  difficulty: number
  notes?: string
}

export interface GarouRiteCost {
  resource: string
  amount: number | 'variable' | 'free'
}

export interface GarouRite {
  id: string
  name: string
  riteType: RiteType
  rank: 1 | 2 | 3 | 4 | 5
  description: string        // Lore + propósito del rito
  systemText: string         // Mecánica completa
  dicePool?: GarouRiteDicePool
  cost?: GarouRiteCost
  duration?: string
  participants?: string      // Quién puede realizarlo y con qué requisitos
  tags: string[]
}

// ─── RITOS MENORES (Rango 1) ──────────────────────────────────────────────────

const RITOS_MENORES: GarouRite[] = [
  {
    id: 'rito-contricion',
    name: 'Rito de Contrición',
    riteType: 'minor',
    rank: 1,
    description: 'Cuando un Garou ha cometido un acto que daña a Gaia, a sus hermanos o a su propio honor, el Rito de Contrición es el primer paso hacia la reconciliación espiritual. No borra el error, pero abre la puerta al perdón y permite al espíritu comenzar a sanar la deuda contraída.',
    systemText: 'El Garou en penitencia debe realizar una mortificación apropiada a su falta durante un ciclo lunar completo: privarse de comida o sueño, hacer guardia en territorio peligroso sin ayuda, recorrer un camino sagrado descalzo o ayunar de Gnosis. Al finalizar el ciclo, el ritemaster lleva a cabo la ceremonia en luna nueva. Tirada: Carisma + Rituales dif. 6. Con 1 éxito el Garou recupera 1 punto de Renombre perdido (el tipo depende de la naturaleza de la falta). Con 3+ éxitos puede intentar recuperar un punto de Humanidad/Vía si fue reducida por el acto en cuestión (segunda tirada al arbitrio del Narrador). La contrición fallida (pifia) no puede reintentarse hasta el ciclo lunar siguiente.',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 6 },
    cost: { resource: 'Gnosis', amount: 1 },
    duration: 'un ciclo lunar de penitencia + ceremonia',
    participants: 'Un ritemaster de Rango 1+ y el Garou en penitencia. Puede realizarse en solitario en ausencia de sept.',
    tags: ['contrición', 'renombre', 'penitencia', 'perdón'],
  },
  {
    id: 'rito-mantenimiento-fetiche',
    name: 'Rito de Mantenimiento del Fetiche',
    riteType: 'minor',
    rank: 1,
    description: 'Todo fetiche —objeto infundido con un espíritu vinculado— requiere mantenimiento ritual regular. Sin este rito, el espíritu dentro del fetiche se debilita gradualmente hasta quedar inerte o volverse hostil. Es el rito más practicado del día a día Garou, tan habitual como afilar un cuchillo.',
    systemText: 'Debe realizarse una vez por luna para cada fetiche en posesión del Garou. El ritual dura aproximadamente 30 minutos e implica: limpiar físicamente el objeto, pronunciar el nombre del espíritu vinculado, ofrecer Gnosis como alimento espiritual, y renovar verbalmente el propósito del vínculo. Tirada: Inteligencia + Rituales dif. 4. Éxito: el fetiche mantiene plena potencia. Fallo: el fetiche pierde temporalmente 1 punto de potencia (recuperable con el siguiente mantenimiento exitoso). Pifia: el espíritu se enoja; el fetiche queda inerte durante (11 - Rango del ritemaster) días. Si un fetiche pasa dos lunas sin mantenimiento: el espíritu empieza a retirarse (pierde 1 punto de potencia acumulativo). Tras seis lunas sin mantenimiento: el vínculo se rompe y el objeto queda mundano.',
    dicePool: { formula: 'Inteligencia + Rituales', difficulty: 4 },
    cost: { resource: 'Gnosis', amount: 1 },
    duration: '30 minutos por fetiche',
    participants: 'El portador del fetiche. No requiere ritemaster externo.',
    tags: ['fetiche', 'mantenimiento', 'espíritu', 'cotidiano'],
  },
  {
    id: 'rito-plegaria-gaia',
    name: 'Rito de la Plegaria a Gaia',
    riteType: 'minor',
    rank: 1,
    description: 'El rito más sencillo y más poderoso a la vez: el acto de dirigirse a la Madre Tierra cada amanecer o atardecer en un momento de quietud. No requiere parafernalia especial ni palabras arcanas —solo presencia plena y voluntad de conectar. Los Garou que lo practican con consistencia notan que el Umbra responde con más claridad y que los espíritus locales les conocen por su nombre.',
    systemText: 'El Garou dedica 10 minutos de concentración silenciosa (al amanecer, atardecer o bajo la luna) dirigiéndose a Gaia en voz baja o mentalmente. No requiere tirada si se realiza en entorno natural (bosque, campo, orilla de río). En entornos urbanos o fuertemente contaminados por el Wyrm: Willpower dif. 5 para concentrarse adecuadamente. Beneficio por práctica continua: tras siete días consecutivos, el Garou recupera 1 punto adicional de Gnosis en su siguiente recuperación natural. Tras 28 días consecutivos (una luna completa): los espíritus del territorio perciben al Garou como "conocido" y reducen en -1 la dificultad de cualquier interacción social inicial con ellos. Si el Garou rompe la cadena, los beneficios se pierden y debe reiniciar el conteo.',
    dicePool: { formula: 'Voluntad', difficulty: 5, notes: 'solo en entornos urbanos o contaminados' },
    cost: { resource: 'Gratis', amount: 'free' },
    duration: '10 minutos diarios',
    participants: 'Individual. No requiere ritemaster.',
    tags: ['gaia', 'gnosis', 'espiritualidad', 'cotidiano', 'espíritus'],
  },
  {
    id: 'rito-despertar',
    name: 'Rito de Despertar',
    riteType: 'minor',
    rank: 1,
    description: 'Cuando un Garou ha sufrido heridas de plata graves, ha caído en coma espiritual o está atrapado en un estado de semiconsciencia entre el Umbral y el mundo material, el Rito de Despertar tira de su espíritu de vuelta a la presencia consciente. No cura heridas —solo despierta la voluntad.',
    systemText: 'El ritemaster debe tener contacto físico con el Garou inconsciente durante toda la ceremonia (al menos 10 minutos). Implica: limpiar las heridas de plata si las hay (con agua sin metal), pronunciar el nombre completo del Garou tres veces en el idioma de los espíritus (Gnosis del ritemaster determina si conoce las palabras correctas), y ofrecer 1 punto de Gnosis al espíritu del Garou dormido. Tirada: Carisma + Medicina dif. 7. Éxito: el Garou despierta consciente, aunque sigue herido. Con 3+ éxitos despierta con 1 punto de Gnosis recuperado. Fallo: puede reintentarse después de una hora. Pifia: el Garou cae en coma más profundo (no puede ser despertado durante una noche completa). No funciona sobre Garou muertos —solo inconscientes.',
    dicePool: { formula: 'Carisma + Medicina', difficulty: 7 },
    cost: { resource: 'Gnosis', amount: 1 },
    duration: '10 minutos de ceremonia',
    participants: 'Un ritemaster de Rango 1+ con el Garou inconsciente. Preferiblemente su packmate o lider.',
    tags: ['despertar', 'coma', 'plata', 'recuperación'],
  },
  {
    id: 'rito-purificacion-menor',
    name: 'Rito de Purificación Menor',
    riteType: 'minor',
    rank: 1,
    description: 'La corrupción del Wyrm deja residuos en lugares, objetos y personas. Este rito limpia contaminación superficial: el rastro que queda después de que un Bane ha estado presente, la tóxica esencia de un producto industrial especialmente contaminante, o la impregnación de Wyrm en un objeto recientemente usado por un siervo del caos. No es capaz de purificar corrupción profunda ni posesiones activas.',
    systemText: 'El ritemaster purifica un área de hasta (Rango × 3) metros cuadrados, un objeto individual, o quita el rastro de Wyrm de una persona. Requiere ingredientes purificadores: agua corriente, salvia, cedro, o sangre del propio Garou. La ceremonia dura 30 minutos de invocaciones y movimientos de purificación. Tirada: Stamina + Rituales dif. 6. Con 1-2 éxitos: elimina rastros superficiales de Wyrm (el Sentido del Wyrm ya no los detecta). Con 3-4 éxitos: purifica objetos de hasta Gnosis 3 de taint acumulado. Con 5 éxitos: puede intentar purificar contaminación moderada (no eliminada, pero reducida). LIMITACIONES: no purifica Fomori (posesión interna); no purifica zonas de más de (Rango × 10) metros cuadrados; no elimina espíritus del Wyrm, solo sus rastros.',
    dicePool: { formula: 'Stamina + Rituales', difficulty: 6 },
    cost: { resource: 'Gnosis', amount: 1 },
    duration: '30 minutos',
    participants: 'Un ritemaster de Rango 1+. Para áreas mayores se beneficia de asistentes.',
    tags: ['purificación', 'wyrm', 'taint', 'limpieza'],
  },
]

// ─── RITOS DE RENOMBRE (Rango 1–3) ───────────────────────────────────────────

const RITOS_RENOMBRE: GarouRite[] = [
  {
    id: 'rito-pasaje',
    name: 'Rito de Pasaje',
    riteType: 'renown',
    rank: 1,
    description: 'El rito más importante en la vida de un Garou joven: el momento en que el Cachorro deja de serlo y se convierte en Cliath. El Pasaje no es un regalo —es una prueba. El Cachorro debe demostrar que merece un lugar entre los guerreros de Gaia. Cada sept lo realiza de forma diferente, pero todos comparten la estructura: un desafío peligroso, una prueba de carácter y el reconocimiento de los mayores.',
    systemText: 'El Rito de Pasaje tiene tres fases: (1) DESAFÍO FÍSICO: el Cachorro enfrenta una prueba de combate, supervivencia o cacería diseñada por los Ancianos del sept. Tirada de la habilidad relevante dif. 7. (2) PRUEBA DE CARÁCTER: el Cachorro debe tomar una decisión moral sin supervisión (sacrificar algo valioso, defender un inocente a costa de su misión, renunciar a Gloria para salvar un aliado). No hay tirada —el Narrador evalúa la decisión. (3) RECONOCIMIENTO: si supera ambas fases, el sept se reúne al amanecer para el rito formal. Tirada del ritemaster: Carisma + Rituales dif. 6. Con éxito, el Cachorro recibe su primer nombre de hazaña y 1 punto en cada tipo de Renombre (Gloria, Honor, Sabiduría). Con pifia en el rito formal: la ceremonia debe repetirse en la próxima luna. El Cachorro que fracasa en el Desafío Físico puede reintentar tras preparación adicional (mínimo 1 mes).',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 6 },
    cost: { resource: 'Gnosis', amount: 2 },
    duration: 'un día completo (las tres fases)',
    participants: 'Todo el sept o al menos tres Garou de Rango 2+. Requiere un ritemaster de Rango 3+ para la fase final.',
    tags: ['pasaje', 'cliath', 'cachorro', 'renombre', 'iniciación'],
  },
  {
    id: 'rito-nombramiento',
    name: 'Rito de Nombramiento',
    riteType: 'renown',
    rank: 1,
    description: 'El nombre es identidad. Para los Garou, el nombre de hazaña captura quién eres en el momento en que fuiste más tú mismo. El Rito de Nombramiento formaliza y proclama ese nombre ante los espíritus y los hermanos, haciendo que el mundo sobrenatural aprenda a reconocerte.',
    systemText: 'Puede celebrarse por dos motivos: (1) Primera imposición de nombre de hazaña (normalmente ligado al Rito de Pasaje), o (2) Cambio de nombre de hazaña cuando la identidad del Garou ha cambiado significativamente. El sept (o al menos tres Garou testigos) se reúne. El ritemaster proclama las hazañas del Garou en voz alta. El Garou declara su nombre. Los testigos lo repiten tres veces en un howl. Tirada: Carisma + Rituales dif. 5. Con éxito: el nombre queda registrado espiritualmente —los espíritus que hayan presenciado el rito (o que se enteren por red espiritual) reconocerán ese nombre. Beneficio mecánico: en interacciones con espíritus, mencionar el nombre de hazaña y sus hazañas asociadas da +1 dado a tiradas de Carisma durante esa escena. Para cambio de nombre (identidad transformada): requiere además que el Garou haya acumulado al menos 3 puntos de Renombre desde el nombre anterior.',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 5 },
    cost: { resource: 'Gnosis', amount: 1 },
    duration: '30 minutos',
    participants: 'Al menos 3 testigos Garou. El ritemaster de Rango 1+.',
    tags: ['nombre', 'identidad', 'renombre', 'espíritus'],
  },
  {
    id: 'rito-reconocimiento-rango',
    name: 'Rito de Reconocimiento del Rango',
    riteType: 'renown',
    rank: 2,
    description: 'Cuando un Garou ha acumulado el Renombre suficiente para ascender de Rango, el ascenso no se produce automáticamente: debe ser ratificado por la comunidad a través de este rito. Es simultáneamente una celebración y una advertencia —un Rango mayor trae mayores responsabilidades y mayores expectativas de sacrificio.',
    systemText: 'Requisitos previos: el Garou debe haber alcanzado los mínimos de Gloria, Honor y Sabiduría para el siguiente Rango (ver tabla de Renombre). Además debe haber superado un Desafío de Rango: una prueba específica para el nuevo Rango (variable por auspicio y tribu, decidida por el Narrador y los Ancianos del sept). Si los requisitos se cumplen, el ritemaster más veterano presente lidera la ceremonia. La reunión incluye testimonios de aquellos que han presenciado las hazañas del Garou. Tirada: Carisma + Liderazgo dif. (6 para Rango 2, 7 para Rango 3, 8 para Rango 4, 9 para Rango 5). Con éxito: el Garou asciende oficialmente. Adquiere acceso a dones de su nuevo Rango y el respeto asociado. Con fallo: puede reintentar en la próxima luna, pero perder la primera tirada es públicamente vergonzoso (-1 de Honor temporal). Si el ritemaster no está disponible: otro Garou de Rango igual o superior puede asumir el rol.',
    dicePool: { formula: 'Carisma + Liderazgo', difficulty: 7, notes: 'dif. varía según Rango objetivo (6 para Rango 2, 9 para Rango 5)' },
    cost: { resource: 'Gnosis', amount: 2 },
    duration: 'una noche completa',
    participants: 'Todo el sept disponible. El ritemaster debe ser de Rango igual o superior al Rango que se va a reconocer.',
    tags: ['rango', 'ascenso', 'renombre', 'reconocimiento'],
  },
]

// ─── RITOS MÍSTICOS (Rango 2–4) ───────────────────────────────────────────────

const RITOS_MISTICOS: GarouRite[] = [
  {
    id: 'rito-vinculacion',
    name: 'Rito de Vinculación',
    riteType: 'mystic',
    rank: 2,
    description: 'La creación de un fetiche, la unión espiritual con un lugar sagrado o el establecimiento de un vínculo duradero con un espíritu aliado. El Rito de Vinculación es el ritual técnico central de la vida espiritual Garou: sin él no existirían los fetiches ni los territories espirituales reconocidos.',
    systemText: 'Tiene tres usos principales. (A) CREAR FETICHE: el ritemaster captura un espíritu (con Gnosis del espíritu ≤ Rango del ritemaster) y lo vincula a un objeto. El espíritu acepta o es sometido (tirada enfrentada Manipulación + Rituales dif. 8 vs. Voluntad del espíritu). Con éxito, el objeto se convierte en fetiche de potencia igual a (éxitos × Gnosis del espíritu ÷ 3). (B) VINCULAR LUGAR: el sept puede vincular un Caern menor o punto de poder a su grupo. Tirada: Inteligencia + Rituales dif. 8. Requiere el acuerdo de los espíritus del lugar (o su sometimiento). El lugar vinculado recupera Gnosis más rápido para el sept. (C) ALIANZA ESPIRITUAL: crea un vínculo formal con un espíritu aliado que ha aceptado cooperar. El espíritu vinculado puede ser llamado con tirada Carisma + Ocultismo dif. 5 en lugar del estándar dif. 7. El vínculo dura (éxitos) meses antes de necesitar ser renovado.',
    dicePool: { formula: 'Manipulación + Rituales', difficulty: 8, notes: 'enfrentada si el espíritu resiste; dif. varía por uso' },
    cost: { resource: 'Gnosis', amount: 2 },
    duration: '2–4 horas de ceremonia',
    participants: 'Un ritemaster de Rango 2+. Para fetiches poderosos (Gnosis espíritu 5+), requiere ritemaster de Rango 3+.',
    tags: ['fetiche', 'espíritu', 'vinculación', 'místico'],
  },
  {
    id: 'rito-luna-llena',
    name: 'Rito de la Luna Llena',
    riteType: 'mystic',
    rank: 2,
    description: 'La luna llena es el momento de máximo poder para los Garou. Este rito aprovecha esa convergencia para fortalecer la conexión de todo el sept con Luna y con Gaia, recargando reservas espirituales y robusteciendo los vínculos entre hermanos. Es el rito colectivo más celebrado del calendario Garou.',
    systemText: 'Solo puede realizarse la noche de luna llena (y las dos noches adyacentes con penalización de +1 a dificultad). Requiere que todo el sept o pack que participa esté presente en el mismo lugar bajo el cielo abierto. La ceremonia incluye el Gran Aullido (todos aúllan simultáneamente durante al menos 5 minutos), el Recuento de Hazañas (un Galliard o equivalente narra los logros del mes pasado), y la Ofrenda a Luna (cada Garou gasta 1 punto de Gnosis en señal de vínculo). Tirada del ritemaster: Carisma + Rituales dif. 7. Con éxito: todos los participantes recuperan Gnosis igual a (éxitos) esa noche (en lugar de la recuperación normal). Con 3+ éxitos: cada participante también gana +1 dado en todas las tiradas de Dones durante la noche siguiente al rito. Con 5 éxitos: el ritemaster puede solicitar una visión a Luna (una pregunta al Narrador sobre el pasado o el presente).',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 7 },
    cost: { resource: 'Gnosis', amount: 1, },
    duration: 'de medianoche al amanecer',
    participants: 'Todo el sept disponible. El ritemaster de Rango 2+, idealmente un Theurge o ritemaster dedicado.',
    tags: ['luna-llena', 'gnosis', 'colectivo', 'recuperación', 'místico'],
  },
  {
    id: 'rito-convocacion-espiritual',
    name: 'Rito de Convocación Espiritual',
    riteType: 'mystic',
    rank: 3,
    description: 'Para necesidades específicas que van más allá del espíritu local cotidiano, el Rito de Convocación puede llamar a espíritus poderosos o lejanos: totem del clan, espíritus ancestrales, avatares de Gaia o incluso los legendarios Celestinos (aunque convocar a estos últimos es peligroso y raramente funciona). El rito garantiza la convocación —no la cooperación.',
    systemText: 'El ritemaster debe conocer al menos el tipo de espíritu a convocar (Lunes, Gauntlet, totem específico, ancestral). Con nombre verdadero del espíritu, la dificultad baja en 2. Tirada: Carisma + Rituales dif. 8 (espíritu Gnosis ≤ 5), dif. 9 (Gnosis 6–8), dif. 10 con dado extra automático (Gnosis 9+). Con éxito: el espíritu aparece en el Umbral local y puede ser percibido. Con 3+ éxitos: aparece de forma que puede interactuar directamente incluso con Garou que no tengan Auspex activo. El espíritu NO está obligado a obedecer —debe ser persuadido, negociado o sometido separadamente (tiradas de Carisma + Ocultismo o equivalente). ADVERTENCIA: un espíritu convocado que se encuentre con hostilidad o falta de respeto puede volverse iracundo. Los Celestinos convocados responderán (si responden) cuando quieran.',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 8, notes: 'varía según Gnosis del espíritu; -2 con nombre verdadero' },
    cost: { resource: 'Gnosis', amount: 2 },
    duration: '1 hora de preparación; el espíritu permanece hasta que se vaya o sea desterrado',
    participants: 'Un ritemaster de Rango 3+. Para espíritus de Gnosis 8+ se recomienda asistencia de todo el sept.',
    tags: ['convocación', 'espíritu', 'umbral', 'místico', 'totem'],
  },
  {
    id: 'rito-del-caern',
    name: 'Rito del Caern',
    riteType: 'mystic',
    rank: 4,
    description: 'El Caern —lugar sagrado donde el Umbral es delgado como papel— es el corazón espiritual de cualquier sept. El Rito del Caern se utiliza para tres propósitos sagrados: abrir un Caern durmiente, mantener la salud espiritual de uno existente, o en casos desesperados, sanar uno dañado por el Wyrm. Es el rito más poderoso de la vida comunitaria Garou.',
    systemText: 'Tres usos, todos requieren luna llena y la participación del sept completo. (A) ABRIR CAERN DURMIENTE: el sept completo ayuna 3 días y pernocta en el lugar. El ritemaster principal debe tener Rango 4+. Tirada colectiva: Carisma + Rituales del ritemaster dif. 9, con +1 dado por cada Garou adicional de Rango 2+ participante (máximo +5). Con 5+ éxitos: el Caern despierta con Gnosis inicial igual a los éxitos obtenidos. Con menos de 5 éxitos el Caern no despierta pero puede reintentarse la siguiente luna llena. (B) MANTENIMIENTO MENSUAL: dif. 6, 2 Gnosis del ritemaster. Éxito mantiene el Caern en plena potencia. Fallo acumulado (3 fallos consecutivos): el Caern pierde 1 punto de Gnosis. (C) SANAR CAERN DAÑADO: requiere Rango 5 del ritemaster, todo el sept, 3 días de ayuno. Tirada dif. 10 con dado automático; cada éxito cura 1 punto de Gnosis del Caern. Es un milagro cuando funciona.',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 9, notes: 'varía por uso: dif.6 para mantenimiento, dif.9 para apertura, dif.10 para sanación' },
    cost: { resource: 'Gnosis', amount: 3 },
    duration: 'tres días de preparación + ceremonia de una noche completa',
    participants: 'Todo el sept. Ritemaster de Rango 4+ para apertura/sanación, Rango 2+ para mantenimiento.',
    tags: ['caern', 'sagrado', 'gnosis', 'sept', 'místico', 'épico'],
  },
]

// ─── RITOS DE MUERTE (Rango 2–4) ─────────────────────────────────────────────

const RITOS_MUERTE: GarouRite[] = [
  {
    id: 'rito-lamentacion',
    name: 'Rito de Lamentación',
    riteType: 'death',
    rank: 2,
    description: 'Cuando un Garou muere, el Rito de Lamentación permite a sus hermanos llorar su pérdida de forma sagrada. No es un simple funeral —es una despedida espiritual que ayuda al alma del difunto a encontrar su camino en el más allá y sana parcialmente la herida que su ausencia deja en el sept.',
    systemText: 'Debe realizarse dentro de los tres días siguientes a la muerte; cuanto antes mejor. El cuerpo debe estar presente si es posible (o un objeto que le pertenecía si el cuerpo no pudo recuperarse). La ceremonia incluye: narrar las hazañas del muerto, compartir una última comida en su honor, y el Aullido de Lamentación (todos aúllan durante al menos 3 minutos sin parar, un sonido que los espíritus del Umbral reconocen como sagrado). Tirada del ritemaster: Carisma + Rituales dif. 6. Con éxito: cada Garou participante puede gastar 1 punto de Fuerza de Voluntad para recuperar 1 punto de Gnosis (el dolor purifica la conexión espiritual). Con 3+ éxitos: el ritemaster puede intentar comunicarse brevemente con el espíritu del difunto (una pregunta) antes de que parta. Con pifia: la Lamentación se torna caótica, los participantes sufren -1 dado en todas las tiradas la noche siguiente.',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 6 },
    cost: { resource: 'Gnosis', amount: 1 },
    duration: '1 hora de ceremonia',
    participants: 'El sept o packmates del difunto. El ritemaster de Rango 2+.',
    tags: ['muerte', 'luto', 'espíritu', 'gnosis', 'funeral'],
  },
  {
    id: 'rito-ultimo-aullido',
    name: 'Rito del Último Aullido',
    riteType: 'death',
    rank: 2,
    description: 'Mientras el Rito de Lamentación es para los vivos, el Rito del Último Aullido es para el muerto. Este aullido ritual formal anuncia la muerte de un guerrero de Gaia al mundo espiritual, liberando su esencia para continuar su viaje. Sin él, el espíritu puede quedar atado al lugar de su muerte, confundido y en riesgo de convertirse en wraith o ser capturado por espíritus del Wyrm.',
    systemText: 'Debe realizarse en el lugar de la muerte o junto al cuerpo, idealmente dentro de las primeras 12 horas. Un solo Garou puede realizarlo, aunque es mejor con testigos. El ritemaster se planta ante el cuerpo o el lugar, eleva la cabeza y produce el aullido más largo y perfecto posible. El aullido debe durar al menos 30 segundos sin interrupción. Tirada: Carisma + Expresión dif. 6. Con éxito: el espíritu del difunto percibe el aullido y puede partir en paz; el área queda espiritualmente "sellada" (no atraerá espíritus carroñeros del Wyrm durante (éxitos) días). Con 3+ éxitos: el espíritu del difunto puede aparecer brevemente ante el ritemaster para entregar un mensaje final o despedirse (al arbitrio del Narrador). Con fallo: el aullido no llega al Umbral; puede reintentarse. Con pifia: el aullido atrae espíritus del Wyrm en lugar de alejarlos.',
    dicePool: { formula: 'Carisma + Expresión', difficulty: 6 },
    cost: { resource: 'Gnosis', amount: 1 },
    duration: '5–10 minutos en el lugar de la muerte',
    participants: 'Puede hacerlo un solo Garou. Rango mínimo 2. Idealmente el Galliard del sept.',
    tags: ['muerte', 'aullido', 'espíritu', 'liberación', 'funeral'],
  },
  {
    id: 'rito-caceria-honor',
    name: 'Rito de Cacería de Honor',
    riteType: 'death',
    rank: 3,
    description: 'Cuando un traidor, un asesino de hermanos o un sirviente del Wyrm ha cometido crímenes que reclaman respuesta, el sept puede declarar la Cacería de Honor. No es venganza sin más —es un decreto espiritual que convierte la caza en acto sagrado y llama a los espíritus a ser testigos. El objetivo de la cacería siente el decreto en sus sueños.',
    systemText: 'El sept debe votar la declaración (mayoría simple de Garou de Rango 2+). A continuación el ritemaster lleva a cabo el rito formal. Tirada: Carisma + Rituales dif. 7. Con éxito: el objetivo de la cacería queda "marcado" espiritualmente —los espíritus locales lo reconocen como presa declarada y no le ayudarán. Además, cualquier Garou que participe en la cacería gana +1 dado en tiradas de combate y seguimiento contra ese objetivo específico. Con 3+ éxitos: el objetivo siente el peso del decreto (pesadillas, presencias espirituales que le observan). Con 5 éxitos: el objetivo sufre -1 dado a todas sus tiradas mientras la cacería esté activa (el peso espiritual le debilita). La cacería se levanta cuando el objetivo muere, se rinde formalmente al sept (y acepta el castigo), o el sept vota cancelarla.',
    dicePool: { formula: 'Carisma + Rituales', difficulty: 7 },
    cost: { resource: 'Gnosis', amount: 2 },
    duration: '2 horas de ceremonia; la cacería es activa hasta su conclusión',
    participants: 'Todo el sept que vote. Ritemaster de Rango 3+.',
    tags: ['cacería', 'traidor', 'wyrm', 'decreto', 'honor'],
  },
]

// ─── RITOS DE CASTIGO (Rango 3–5) ────────────────────────────────────────────

const RITOS_CASTIGO: GarouRite[] = [
  {
    id: 'rito-mordaza',
    name: 'Rito de la Mordaza',
    riteType: 'punishment',
    rank: 3,
    description: 'Castigo reservado para quienes han mentido ante el sept, han revelado secretos Garou a mortales sin autorización, o han abusado de su voz en el Umbral. El Rito de la Mordaza silencia espiritualmente al condenado: sus palabras en el mundo espiritual quedan sin eco.',
    systemText: 'Requiere que el sept haya juzgado formalmente al acusado y votado el castigo. El ritemaster toca la garganta del condenado y pronuncia la mordaza en el idioma de los espíritus. Tirada: Manipulación + Rituales dif. 8. Con éxito: el condenado no puede comunicarse con espíritus (estos no le oyen ni responden), no puede usar dones que requieran hablar (gritos de guerra, invocaciones verbales) y no puede participar en howls rituales. Su Gnosis queda reducida en 1 punto mientras dure el castigo. Duración del castigo: fijada por el sept en el juicio (mínimo 1 luna, máximo 1 año). Al finalizar, el castigo se levanta automáticamente. NOTA: la Mordaza no impide hablar físicamente —solo silencia la voz espiritual. Si el condenado intenta usar un Don que requiere voz espiritual durante la Mordaza, la tirada automáticamente falla y pierde el coste de recurso.',
    dicePool: { formula: 'Manipulación + Rituales', difficulty: 8 },
    cost: { resource: 'Gnosis', amount: 2 },
    duration: 'fijada por juicio del sept (1 luna a 1 año)',
    participants: 'El sept en pleno (para el juicio) + ritemaster de Rango 3+ para la imposición.',
    tags: ['castigo', 'silencio', 'espíritu', 'mordaza', 'voz'],
  },
  {
    id: 'rito-cicatriz',
    name: 'Rito de la Cicatriz',
    riteType: 'punishment',
    rank: 3,
    description: 'Una marca permanente para quienes han deshonrado a su sept, traicionado la confianza o cometido actos de cobardía en batalla. La Cicatriz no puede esconderse en el Umbral —los espíritus la ven siempre. Es la señal que dice: "este Garou cargó con su vergüenza y sobrevivió para contarlo."',
    systemText: 'El ritemaster graba una marca en el cuerpo del condenado (generalmente en la frente, mejilla o pecho) usando un objeto sagrado imbuido con Gnosis. La herida física sana normalmente, pero la marca espiritual permanece visible en el Umbral. Tirada: Inteligencia + Rituales dif. 8. Con éxito: la Cicatriz queda impuesta. Efectos permanentes: -1 a tiradas de interacción social con espíritus que no conozcan al Garou personalmente (la marca les advierte de su deshonor). -1 de Gloria permanente (anulado solo si el Garou ejecuta un acto de gloria excepcional reconocido por el sept). Los Garou que desconozcan al marcado y que tengan Auspex activo en el Umbral verán la marca y sabrán que fue impuesta por el sept. La Cicatriz puede levantarse solo por otro Rito de Cicatriz realizado específicamente para borrarla, que requiere Rango 4+ y el acuerdo unánime del sept.',
    dicePool: { formula: 'Inteligencia + Rituales', difficulty: 8 },
    cost: { resource: 'Gnosis', amount: 2 },
    duration: 'permanente hasta ritual de borrado',
    participants: 'El sept en pleno (juicio) + ritemaster de Rango 3+.',
    tags: ['castigo', 'cicatriz', 'marca', 'deshonor', 'permanente'],
  },
  {
    id: 'rito-destierro',
    name: 'Rito del Destierro',
    riteType: 'punishment',
    rank: 5,
    description: 'El castigo más severo de la sociedad Garou, reservado para los crímenes más graves: traición al sept completo, asesinato de hermanos sin causa justa, alianza deliberada con el Wyrm, o revelar el secreto de la existencia Garou al mundo humano en masa. El Desterrado queda fuera de la protección y el reconocimiento de toda la nación Garou.',
    systemText: 'Requiere: juicio formal ante al menos 5 Garou de Rango 3+, veredicto unánime, y la presencia del condenado (puede realizarse en ausencia solo si el condenado ha huido, con dificultad +2). El ritemaster de más alto Rango disponible conduce la ceremonia. Tirada: Carisma + Liderazgo dif. 9. Con éxito: el Desterrado pierde TODOS sus puntos de Renombre. Queda espiritualmente marcado como "fuera de la nación" —los espíritus Garou le tratan como extranjero en el mejor caso y como enemigo en el peor. Ningún Garou de la nación puede ayudarle sin perder Honor (1 punto automático por cada acto de ayuda directa). El totem de su pack le abandona. Si intentaba usar Dones: los Dones aprendidos aún funcionan, pero no puede aprender nuevos. Con 5+ éxitos: el Desterrado también pierde 1 punto permanente de Gnosis máxima (el mundo espiritual lo rechaza). El Destierro puede levantarse solo por votación unánime de todo el sept que lo impuso (o su sucesor) y un segundo rito de igual complejidad.',
    dicePool: { formula: 'Carisma + Liderazgo', difficulty: 9 },
    cost: { resource: 'Gnosis', amount: 3 },
    duration: 'permanente hasta ritual de levantamiento',
    participants: 'Mínimo 5 Garou de Rango 3+. Ritemaster de Rango 5 ideal (mínimo Rango 4).',
    tags: ['destierro', 'castigo-supremo', 'renombre', 'exilio', 'épico'],
  },
]

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const W20_RITES: GarouRite[] = [
  ...RITOS_MENORES,
  ...RITOS_RENOMBRE,
  ...RITOS_MISTICOS,
  ...RITOS_MUERTE,
  ...RITOS_CASTIGO,
]

export const W20_RITES_BY_TYPE: Record<RiteType, GarouRite[]> = {
  minor:      RITOS_MENORES,
  renown:     RITOS_RENOMBRE,
  mystic:     RITOS_MISTICOS,
  death:      RITOS_MUERTE,
  punishment: RITOS_CASTIGO,
}

export const RITE_TYPE_LABELS: Record<RiteType, string> = {
  minor:      'Ritos Menores',
  renown:     'Ritos de Renombre',
  mystic:     'Ritos Místicos',
  death:      'Ritos de Muerte',
  punishment: 'Ritos de Castigo',
}
