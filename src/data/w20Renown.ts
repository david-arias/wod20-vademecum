// ─────────────────────────────────────────────────────────────────────────────
// W20 SISTEMA DE RENOMBRE — Rangos, Requisitos y Mecánicas
// ─────────────────────────────────────────────────────────────────────────────

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface GarouRankEntry {
  rank: 0 | 1 | 2 | 3 | 4 | 5
  name: string              // Nombre español (ej. "Cliath")
  nameEn: string            // Nombre inglés canónico
  minGloria: number         // Puntos mínimos de Gloria requeridos
  minHonor: number          // Puntos mínimos de Honor requeridos
  minSabiduria: number      // Puntos mínimos de Sabiduría requeridos
  description: string       // Quién es un Garou de este rango
  privileges: string[]      // Qué puede hacer este rango
  obligations: string[]     // Qué se espera de este rango
}

export interface RenownType {
  id: 'gloria' | 'honor' | 'sabiduria'
  name: string
  description: string       // Qué representa esta forma de renombre
  gainExamples: string[]    // Cómo se gana
  lossExamples: string[]    // Cómo se pierde
  associatedAuspicios: string[]  // Auspicios que más lo valoran
}

export interface RenownMechanics {
  title: string
  description: string
  rule: string
}

// ─── TABLA DE RANGOS ──────────────────────────────────────────────────────────

export const W20_RANKS: GarouRankEntry[] = [
  {
    rank: 0,
    name: 'Cachorro',
    nameEn: 'Cub',
    minGloria: 0,
    minHonor: 0,
    minSabiduria: 0,
    description: 'El Garou recién iniciado que aún no ha completado su Rito de Pasaje. Carece de nombre de hazaña propio y no tiene voz en los consejos del sept. Es un tiempo de aprendizaje, observación y supervivencia. Los Cachorros están bajo la tutela de un Garou de Rango 2+ (su mentor) que responde por sus acciones ante el sept.',
    privileges: [
      'Puede hablar en los howls informales del sept',
      'Recibe la protección del sept mientras no deshonre a su mentor',
      'Puede aprender Dones de Rango 1 si un profesor los enseña',
      'Tiene derecho a solicitar un Rito de Pasaje cuando su mentor lo considere preparado',
    ],
    obligations: [
      'Obedecer a todos los Garou de Rango superior sin cuestionamiento inmediato',
      'Completar las tareas asignadas por su mentor',
      'No tomar decisiones que afecten al sept sin aprobación de un superior',
      'Aprender las Letanías y ser capaz de recitarlas completas antes del Rito de Pasaje',
    ],
  },
  {
    rank: 1,
    name: 'Cliath',
    nameEn: 'Cliath',
    minGloria: 2,
    minHonor: 1,
    minSabiduria: 1,
    description: 'El guerrero novato que ha superado el Rito de Pasaje y tiene su primer nombre de hazaña. Un Cliath tiene voz en los asuntos del sept y puede actuar de forma independiente, aunque sigue siendo considerado inexperto. La mayoría de los Garou permanece en Rango 1 durante la mayor parte de su vida activa.',
    privileges: [
      'Voz en los howls formales del sept (puede opinar, no dirigir)',
      'Puede iniciar misiones menores sin aprobación explícita',
      'Puede enseñar a Cachorros con aprobación de un superior',
      'Derecho a desafiar a otros Cliath por posiciones de responsabilidad menor',
      'Puede solicitar asistencia del sept en peligro directo',
    ],
    obligations: [
      'Respetar las decisiones del sept tomadas por Rango 2+',
      'Informar al sept de amenazas detectadas',
      'Completar al menos 1 misión significativa al año para mantener el Renombre',
      'No revelar los secretos Garou a los mortales bajo ninguna circunstancia',
    ],
  },
  {
    rank: 2,
    name: 'Fostern',
    nameEn: 'Fostern',
    minGloria: 4,
    minHonor: 4,
    minSabiduria: 4,
    description: 'El guerrero de confianza probada. Un Fostern ha demostrado no solo valentía sino también juicio. Puede liderar misiones, ser el portavoz de un pack ante el sept y enseñar Dones a los Rango 1. Es el primer Rango donde el Garou comienza a ser visto como un adulto pleno de la comunidad, no solo un guerrero en formación.',
    privileges: [
      'Puede liderar packs en misiones medianas',
      'Tiene derecho a un asiento en el consejo del sept en discusiones que le conciernan directamente',
      'Puede realizar Ritos de Rango 2',
      'Puede enseñar Dones de Rango 1 y 2 a quien los solicite',
      'Derecho a desafiar a cualquier Garou de Rango inferior por posiciones del sept',
      'Puede solicitar un fetiche del armería del sept para una misión (con devolución)',
    ],
    obligations: [
      'Mentorizar a al menos un Cachorro o Cliath si el sept lo requiere',
      'Participar en las defensas del Caern cuando sea convocado',
      'Reportar al Alfa de Sept de amenazas de Rango 3 o superior',
      'Llevar a cabo mínimo 2 acciones significativas para el sept por año',
    ],
  },
  {
    rank: 3,
    name: 'Adren',
    nameEn: 'Adren',
    minGloria: 8,
    minHonor: 8,
    minSabiduria: 8,
    description: 'El líder de medio nivel: el Garou que otros siguen voluntariamente. Un Adren ha acumulado suficiente experiencia para ver más allá del combate inmediato y entender las consecuencias de sus acciones. Puede ser el líder de un pack permanente, el Magistrado de un sept pequeño, o el emisario de su tribu ante otras tribus. Los Adren son la columna vertebral de la nación Garou en tiempos de guerra.',
    privileges: [
      'Asiento permanente en el consejo del sept',
      'Puede convocar howls formales del sept con causa justificada',
      'Acceso a los archivos espirituales del Caern (si existe registro)',
      'Puede realizar Ritos de Rango 3',
      'Derecho a desafiar a Fostern y Cliath sin necesidad de justificación',
      'Puede llevar un fetiche personal del armería sin condición de devolución inmediata',
    ],
    obligations: [
      'Disponibilidad para la defensa del Caern en cualquier momento',
      'Participar en consejos donde su auspicio o tribu tenga intereses',
      'Investigar y neutralizar amenazas del Wyrm en su territorio de forma proactiva',
      'Representar a su sept ante otros septs si no hay Rango superior disponible',
    ],
  },
  {
    rank: 4,
    name: 'Athro',
    nameEn: 'Athro',
    minGloria: 14,
    minHonor: 12,
    minSabiduria: 12,
    description: 'El maestro y sabio. Un Athro ha visto lo suficiente como para actuar con la misma seguridad que sabiduría. Son los árbitros de disputas internas, los maestros de los rituales más complejos y los strategas en las guerras contra el Wyrm. Son raros y valiosos —la mayoría de los septs grandes tiene solo uno o dos.',
    privileges: [
      'Puede liderar el sept en ausencia del Alfa',
      'Tiene veto en decisiones que contradigan las Letanías',
      'Puede realizar Ritos de Rango 4 (incluyendo apertura de Caern durmiente)',
      'Derecho a conocer todos los secretos del sept, incluyendo los espirituales',
      'Puede proclamar un Rito de Cacería de Honor sin votación si la amenaza es inminente',
      'Derecho de desafío a cualquier Garou de Rango 3 o inferior',
    ],
    obligations: [
      'Presidir o supervisar todos los Ritos mayores del sept',
      'Arbitrar disputas entre Garou de Rango inferior cuando sean solicitados',
      'Mantener el conocimiento de los secretos del Caern y transmitirlos si muere',
      'Actuar como embajador del sept ante septs de otras tribus con plena autoridad',
    ],
  },
  {
    rank: 5,
    name: 'Elder',
    nameEn: 'Elder',
    minGloria: 20,
    minHonor: 18,
    minSabiduria: 18,
    description: 'La cima de la sociedad Garou. Un Elder ha sobrevivido décadas o siglos de guerra contra el Wyrm, ha guiado a generaciones de guerreros y lleva en sus cicatrices la historia de su sept. Son figuras de autoridad absoluta dentro de su tribu y nación, consejeros en los Grandes Consejos y custodios de los secretos más profundos de Gaia.',
    privileges: [
      'Autoridad suprema en cualquier sept que visite, salvo que otro Elder lo contradiga',
      'Puede proclamar sin votación cualquier Rito de Castigo, incluyendo el Destierro',
      'Puede realizar Ritos de Rango 5',
      'Sus decisiones en materia espiritual son vinculantes para el sept',
      'Puede solicitar cualquier fetiche del armería del sept sin condición',
      'Derecho a convocar Grandes Howls que reúnan a múltiples septs',
    ],
    obligations: [
      'La nación entera espera su intervención en crisis mayores',
      'Debe transmitir su conocimiento antes de morir (un Elder que muere con secretos no transmitidos es una tragedia para la nación)',
      'Moderar su poder para no aplastar la iniciativa de los rangos inferiores',
      'Actuar en el Gran Consejo si es convocado',
    ],
  },
]

// ─── TIPOS DE RENOMBRE ────────────────────────────────────────────────────────

export const W20_RENOWN_TYPES: RenownType[] = [
  {
    id: 'gloria',
    name: 'Gloria',
    description: 'La valentía en combate, la audacia en la acción y los logros heroicos visibles. La Gloria no es brutalidad ciega —es la demostración de que un Garou se enfrenta a aquello de lo que otros huyen y que actúa cuando actuar cuesta. Los Ahrouns acumulan Gloria con más facilidad, pero cualquier auspicio puede ganarla con actos de coraje genuino.',
    gainExamples: [
      'Matar o expulsar un Bane de potencia significativa (1-3 puntos según tamaño)',
      'Defender a mortales inocentes de amenaza sobrenatural a costa de heridas propias',
      'Liderar una misión exitosa contra el Wyrm (1 punto si exitosa, 2 si exitosa contra desventaja significativa)',
      'Sobrevivir a un combate que debería haber matado al Garou y continuar la lucha',
      'Ser el primero en saltar en una batalla donde todos dudaban',
      'Completar un Gran Desafío de Gloria para el Rito de Reconocimiento de Rango',
    ],
    lossExamples: [
      'Huir de un combate cuando había posibilidad real de victoria (pérdida 1 punto)',
      'Atacar a un Garou de Rango 2+ inferior sin causa justa y ser vencido (-1 Gloria, +1 Deshonor)',
      'Ser capturado por el Wyrm sin resistir debidamente (-1 a -2 según circunstancias)',
      'Fallar en proteger a un inocente cuando se tenía capacidad de hacerlo (-1)',
      'Destruir un lugar sagrado de Gaia (aunque sea accidentalmente) (-2 a -3)',
    ],
    associatedAuspicios: ['Ahroun', 'Ragabash (por audacia táctica)'],
  },
  {
    id: 'honor',
    name: 'Honor',
    description: 'El cumplimiento de la palabra dada, la justicia en las relaciones con los hermanos y el respeto por las tradiciones y estructuras de la nación Garou. El Honor no es rigidez —es la confianza que hace posible que el sept funcione como unidad. Un Garou sin Honor puede ser valiente y sabio, pero no puede ser Alfa.',
    gainExamples: [
      'Cumplir un juramento aunque hacerlo tenga un coste personal significativo (1-2 puntos)',
      'Mediar en una disputa entre Garou con justicia reconocida por ambas partes (1 punto)',
      'Denunciar públicamente una violación de las Letanías aunque el culpable sea un aliado (1-2 puntos)',
      'Devolver territorio o fetiche tomado injustamente por tu pack sin ser obligado (1 punto)',
      'Proteger a un Garou de Rango inferior de trato injusto de un superior (1 punto)',
      'Respetar un tratado de paz incluso cuando romprerlo sería ventajoso (1-2 puntos)',
    ],
    lossExamples: [
      'Romper una promesa hecha ante testigos (-1 a -3 según gravedad)',
      'Mentir en un consejo formal del sept (-2)',
      'Atacar a un Garou de la nación por la espalda o durante una tregua (-3)',
      'Acusar falsamente a un hermano de traición (-2)',
      'Negarse a cumplir una orden legítima de un superior de Rango 3+ sin causa justa (-1)',
      'Revelar secretos del sept a outsiders sin autorización (-2 a -4)',
    ],
    associatedAuspicios: ['Philodox', 'Theurge (por respeto a los espíritus)'],
  },
  {
    id: 'sabiduria',
    name: 'Sabiduría',
    description: 'El conocimiento profundo de los misterios Garou, el entendimiento del mundo espiritual, la capacidad de aprender de las experiencias y la habilidad para ver consecuencias donde otros solo ven el momento presente. La Sabiduría es la forma de renombre más difícil de ganar —requiere reflexión, no solo acción.',
    gainExamples: [
      'Resolver un misterio espiritual o descifrar un enigma que otros no pudieron (1-2 puntos)',
      'Identificar correctamente la naturaleza y debilidades de un enemigo antes del combate (1 punto)',
      'Descubrir y transmitir al sept conocimiento de un rito o don desconocido (2-3 puntos)',
      'Encontrar una solución no violenta a un conflicto que habría costado vidas Garou (1-2 puntos)',
      'Mantener la cabeza fría en un momento de pánico y guiar al sept correctamente (1 punto)',
      'Interpretar correctamente una visión o profecía de relevancia para el sept (1-2 puntos)',
    ],
    lossExamples: [
      'Tomar una decisión impulsiva que provoca pérdidas evitables (-1 a -2)',
      'Ignorar una advertencia de un espíritu aliado con consecuencias graves (-1)',
      'Demostrar ignorancia grave de las Letanías cuando se esperaba que el Garou las conociera (-1)',
      'Repetir el mismo error que ya cometió anteriormente (-1)',
      'Desestimar a un Garou de Rango inferior cuya opinión resultaba correcta (-1)',
    ],
    associatedAuspicios: ['Theurge', 'Galliard (por preservar el conocimiento)'],
  },
]

// ─── MECÁNICAS DE RENOMBRE ────────────────────────────────────────────────────

export const W20_RENOWN_MECHANICS: RenownMechanics[] = [
  {
    title: 'Ganancia de Renombre',
    description: 'El Narrador asigna puntos de Renombre al final de cada sesión o arco narrativo según las acciones realizadas. El grupo no debe votar —es decisión del Narrador con transparencia.',
    rule: 'Mínimo de ganancia por acción significativa: 1 punto. Hazañas épicas: 2-3 puntos. Record absoluto posible por sesión para personajes activos: 3 puntos (para evitar progresión inflada). El Renombre solo puede ganarse mediante ACCIONES —no por mero paso del tiempo.',
  },
  {
    title: 'Pérdida de Renombre',
    description: 'El Renombre puede perderse por acciones contrarias al tipo de renombre (cobardía → -Gloria, deshonestidad → -Honor, imprudencia → -Sabiduría) o por el veredicto de un consejo formal del sept.',
    rule: 'La pérdida es inmediata cuando el Narrador la declara. Puede impugnarse ante el sept (tirada de Carisma + Liderazgo dif. 7 para convencer de reducir la penalización), pero la impugnación fallida añade -1 de Honor adicional por el intento fallido. El Renombre total nunca puede bajar de 0.',
  },
  {
    title: 'Desafíos de Rango',
    description: 'Para ascender de Rango, no es suficiente acumular Renombre. El Garou debe demostrar que merece el Rango mediante un desafío específico, diferente para cada auspicio.',
    rule: 'AHROUN (Rango 2+): combate solo a un enemigo significativamente más fuerte y sobrevivir. THEURGE (Rango 2+): resolver una crisis espiritual sin recurrir al combate. GALLIARD (Rango 2+): crear o preservar un registro de hazaña que inspire a otros. PHILODOX (Rango 2+): mediar en un conflicto irresoluable entre dos bandos opuestos. RAGABASH (Rango 2+): demostrar una verdad inconveniente que nadie más tenía el valor de decir. Para Rango 4 y 5 los desafíos son únicos y determinados por el Narrador.',
  },
  {
    title: 'Renombre y Dones',
    description: 'Ciertos Dones de Rango superior solo pueden ser enseñados a Garou que han demostrado el Renombre apropiado para ese Rango.',
    rule: 'Para aprender un Don de Rango N, el Garou debe tener al menos Rango N-1 (o Rango N si el don es especialmente sagrado). El maestro debe tener Rango igual o superior al don que enseña. Los espíritus que enseñan Dones evalúan el Renombre del Garou antes de aceptar enseñarle.',
  },
  {
    title: 'Recuperación de Renombre Perdido',
    description: 'El Renombre no perdido permanentemente puede recuperarse mediante el Rito de Contrición y las acciones correctoras apropiadas.',
    rule: 'Por cada punto de Renombre perdido por error (no por juicio formal), el Garou puede intentar recuperarlo realizando una acción específica que repare el daño causado. Esta acción debe ser proporcional o mayor a la falta. El Narrador declara si la acción fue suficiente. Los puntos perdidos por juicio formal del sept solo pueden recuperarse mediante el voto del mismo sept que los impuso.',
  },
]

// ─── TABLA RESUMEN ────────────────────────────────────────────────────────────

export interface RenownSummaryRow {
  rank: number
  name: string
  gloria: number
  honor: number
  sabiduria: number
  total: number
}

export const W20_RENOWN_TABLE: RenownSummaryRow[] = W20_RANKS.map(r => ({
  rank: r.rank,
  name: r.name,
  gloria: r.minGloria,
  honor: r.minHonor,
  sabiduria: r.minSabiduria,
  total: r.minGloria + r.minHonor + r.minSabiduria,
}))
