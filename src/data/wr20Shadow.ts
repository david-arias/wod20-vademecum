// ─────────────────────────────────────────────────────────────────────────────
// Wr20 — LA SOMBRA (The Shadow / Psyche & Shadow)
// La dualidad fundamental de cada Wraith: la Psique (el yo consciente que busca
// Resolver sus Anclajes) y la Sombra (el yo oscuro que desea la Oblivion).
// La Sombra no es solo un instinto —es una voz, una presencia con voluntad propia
// que habita el mismo cuerpo que la Psique y aprovecha cada momento de debilidad.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export type AngustiaEffect =
  | 'impulse'         // La Sombra implanta un impulso compulsivo
  | 'catharsis'       // La Sombra toma control temporal (Catarsis)
  | 'harrowing'       // La Psique es arrastrada al Descenso (Harrowing)
  | 'damage'          // Daño directo a la Psique como puntación
  | 'spectral-pull'   // Atracción hacia la Oblivion

export interface AngustiaLevel {
  level: number              // 1–10
  name: string               // Nombre del estado
  description: string        // Qué siente el Wraith en este nivel
  shadowPower: string        // Cuánto poder tiene la Sombra
  mechanical: string         // Reglas exactas
  triggerDifficulty: number  // Dificultad para que la Sombra tome control (Catarsis)
  effects: AngustiaEffect[]  // Tipos de efecto posibles en este nivel
  catharsisTriggers: string[] // Qué puede desencadenar una Catarsis en este nivel
}

export interface CatharsisResult {
  id: string
  name: string
  severity: 'minor' | 'moderate' | 'severe' | 'terminal'
  description: string
  mechanical: string
  duration: string
  recoveryMethod: string
}

export interface PassionType {
  id: string
  name: string
  category: 'positive' | 'negative' | 'complex'
  description: string
  angustiaGain: string       // Cuánta Angustia genera cuando es activada contra el Wraith
  hauntingBonus: string      // Bonus que da a acciones de Hostigar (Haunt)
  examples: string[]
}

export interface SpectreType {
  id: string
  name: string
  tier: 1 | 2 | 3 | 4        // 1 = básico, 4 = Señor del Abismo
  description: string
  origin: string             // Cómo se forman
  attributes: { physical: number; social: number; mental: number }
  willpower: number
  corpus: number             // Equivalente a Salud en Espectros
  angustia: number           // Nivel permanente
  powers: string[]
  weakness: string
  shadowRating: string       // Cómo interactúa con las Sombras de Wraiths
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVELES DE ANGUSTIA (1–10)
// ─────────────────────────────────────────────────────────────────────────────

export const ANGUSTIA_LEVELS: AngustiaLevel[] = [
  {
    level: 1,
    name: 'Susurro',
    description: 'La Sombra apenas ha despertado. Solo un murmullo en el fondo de la conciencia, fácilmente ignorable. El Wraith ni siquiera está seguro de que no sea su propia voz.',
    shadowPower: 'Mínima: la Sombra puede sugerir pensamientos negativos pero no puede actuar directamente.',
    mechanical: 'La Sombra puede gastar 1 punto de su Angustia para añadir +1 a la dificultad de una tirada del Wraith (una vez por sesión). El jugador del Wraith no sabe que la dificultad fue manipulada.',
    triggerDifficulty: 9,
    effects: ['impulse'],
    catharsisTriggers: ['Ninguno en este nivel —la Sombra no tiene suficiente fuerza'],
  },
  {
    level: 2,
    name: 'Duda',
    description: 'La Sombra empieza a tener presencia. Planta semillas de duda en los momentos más vulnerables: justo antes de una decisión importante, cuando el Wraith está exhausto, cuando algo recuerda a la muerte.',
    shadowPower: 'La Sombra puede provocar momentos de parálisis —el Wraith duda justo cuando no debería.',
    mechanical: 'La Sombra puede forzar una tirada de Voluntad dif. 6 antes de cualquier acción que involucre los Anclajes del Wraith. Si falla, el Wraith vacila durante 1 turno (pierde el turno o actúa con -2 dados).',
    triggerDifficulty: 8,
    effects: ['impulse'],
    catharsisTriggers: ['Confrontación directa con el objeto de un Anclaje mayor en estado de deterioro'],
  },
  {
    level: 3,
    name: 'Presión',
    description: 'La Sombra tiene una voz distintiva ahora. El Wraith puede distinguirla claramente como "no propia", pero su insistencia es real. Empieza a tener sus propias opiniones sobre cómo el Wraith debería actuar.',
    shadowPower: 'La Sombra puede comunicarse activamente, ofrecer "consejos" y intentar manipular decisiones.',
    mechanical: 'La Sombra tiene derecho a 1 intervención por escena: puede añadir +1 a la dificultad de cualquier tirada, inyectar un pensamiento negativo específico (el Narrador lo describe) o activar una Pasión negativa del Wraith sin coste.',
    triggerDifficulty: 8,
    effects: ['impulse', 'damage'],
    catharsisTriggers: [
      'Fracaso en proteger un Anclaje importante',
      'Presenciar crueldad innecesaria hacia los vivos',
    ],
  },
  {
    level: 4,
    name: 'Conflicto',
    description: 'La dualidad se vuelve angustiante. El Wraith experimenta momentos en que no está seguro de qué pensamientos son suyos y cuáles son de la Sombra. Las pesadillas (para quienes duermen) se intensifican.',
    shadowPower: 'La Sombra puede intentar sabotear activamente los Arcanos del Wraith o amplificar el dolor emocional.',
    mechanical: 'Una vez por sesión, la Sombra puede intentar interferir con el uso de un Arcano: el jugador debe superar Voluntad dif. 7 o el Arcano activa un efecto secundario indeseado (el Narrador decide). Además, la Sombra gana 1 punto temporal de Angustia adicional cada vez que el Wraith completa un Anclaje positivo.',
    triggerDifficulty: 7,
    effects: ['impulse', 'damage', 'catharsis'],
    catharsisTriggers: [
      'Pérdida de un Anclaje',
      'Ser atacado por otro Wraith con intención destructiva',
      'Presenciar una Catarsis de otro Wraith',
    ],
  },
  {
    level: 5,
    name: 'Erosión',
    description: 'La frontera entre Psique y Sombra se erosiona. El Wraith tiene lapsos —momentos en que actúa según los impulsos de la Sombra sin darse cuenta hasta después. Los que le conocen notan que "algo ha cambiado".',
    shadowPower: 'La Sombra puede tomar control breve (1-2 turnos) cuando el Wraith está físicamente incapacitado o emocionalmente devastado.',
    mechanical: 'Cuando el Wraith cae a 0 Pathos o sufre 5+ niveles de daño en una escena, la Sombra puede intentar tomar control (Catarsis) automáticamente —el Wraith debe superar Voluntad dif. 7 para resistir. Además, la Sombra puede gastar su Angustia para causar 1 nivel de daño espiritual al Wraith directamente (1/sesión).',
    triggerDifficulty: 7,
    effects: ['impulse', 'damage', 'catharsis'],
    catharsisTriggers: [
      '0 Pathos',
      'Daño agravado al Corpus',
      'Morte de un ser querido aún vivo',
      'Ser traicionado por un aliado',
    ],
  },
  {
    level: 6,
    name: 'Fisura',
    description: 'La Sombra tiene su propio nombre ahora, o el Wraith le ha puesto uno sin querer. Hay momentos de lucidez —y momentos en que la Sombra habla con la propia voz del Wraith y el Wraith no sabe la diferencia.',
    shadowPower: 'La Sombra puede manifestarse brevemente como entidad semi-independiente visible para otros Wraiths con Percepción espiritual.',
    mechanical: 'Otros Wraiths con Percepción + Enigmas dif. 6 pueden detectar que la Sombra de este Wraith es anormalmente fuerte. La Sombra puede ahora tomar control por (6 - éxitos de Voluntad del Wraith) turnos cuando se activa una Catarsis. En esos turnos actúa completamente según sus propios objetivos.',
    triggerDifficulty: 6,
    effects: ['impulse', 'damage', 'catharsis', 'spectral-pull'],
    catharsisTriggers: [
      'Cualquiera de los anteriores',
      'Contacto con un Espectro que intente "recrutar"',
      'Perder todos los Anclajes activos',
    ],
  },
  {
    level: 7,
    name: 'Dominación Parcial',
    description: 'La Sombra puede "tomar prestada" la voz y las manos del Wraith cuando la Psique está distraída. El Wraith tiene lagunas de memoria. Otros le describen diciendo cosas que no recuerda, haciendo gestos extraños.',
    shadowPower: 'La Sombra tiene acceso a los Arcanos del Wraith y puede usarlos para sus propios propósitos durante una Catarsis.',
    mechanical: 'Durante una Catarsis, la Sombra puede usar los Arcanos del Wraith a voluntad (usando el mismo pool de dados). Además, una vez por sesión, la Sombra puede "robar" 1-2 turnos sin activar una Catarsis completa —el Wraith solo nota el lapso después. El Wraith debe superar Voluntad dif. 8 para notar activamente que la Sombra acaba de actuar.',
    triggerDifficulty: 6,
    effects: ['impulse', 'damage', 'catharsis', 'spectral-pull'],
    catharsisTriggers: [
      'Cualquiera de los anteriores con dificultad reducida',
      'Ser desafiado en su identidad fundamental',
    ],
  },
  {
    level: 8,
    name: 'El Umbral',
    description: 'El Wraith está en el borde del punto de no retorno. La Sombra y la Psique tienen casi el mismo peso. Hay momentos en que otros Wraiths se preguntan si están hablando con el Wraith o con la Sombra.',
    shadowPower: 'La Sombra puede en teoría tomar control completo durante períodos extendidos. Solo la Voluntad más fuerte del Wraith lo impide.',
    mechanical: 'Al inicio de cada sesión, el Wraith debe superar Voluntad dif. 7. Si falla, la Sombra tiene iniciativa en la primera situación de estrés de la sesión (puede causar una Catarsis automática en ese momento sin tirada). Los Arcanos del Wraith se comportan de manera errática (dificultad +1 en todos) porque la Sombra interfiere constantemente.',
    triggerDifficulty: 5,
    effects: ['impulse', 'damage', 'catharsis', 'harrowing', 'spectral-pull'],
    catharsisTriggers: [
      'Casi cualquier situación de estrés severo',
      'Cualquier pérdida significativa',
    ],
  },
  {
    level: 9,
    name: 'Posesión',
    description: 'La Sombra es la voz dominante ahora. La Psique es la intrusa. El Wraith actúa según los impulsos de la Sombra la mayor parte del tiempo y necesita esfuerzo consciente para actuar según sus propios valores.',
    shadowPower: 'La Sombra controla el Wraith la mayor parte del tiempo. Solo la Voluntad más feroz puede recuperar el control temporalmente.',
    mechanical: 'El Wraith debe superar Voluntad dif. 8 para actuar en contra de los impulsos de la Sombra en cualquier situación. La Sombra puede activar una Catarsis sin tirada en respuesta a cualquier esfuerzo de la Psique por hacer algo "bueno" o que contraiga la Oblivion. El Wraith está efectivamente bajo control de la Sombra la mayor parte del tiempo —el jugador y el Narrador comparten el manejo del personaje.',
    triggerDifficulty: 4,
    effects: ['impulse', 'damage', 'catharsis', 'harrowing', 'spectral-pull'],
    catharsisTriggers: ['Prácticamente cualquier situación que el Narrador considere relevante'],
  },
  {
    level: 10,
    name: 'Espectro',
    description: 'El punto de no retorno. La Psique ha sido consumida. El Wraith se ha convertido en un Espectro: un ser de pura Sombra sin la balanza de la Psique. No hay "el Wraith era" —hay solo un Espectro con los recuerdos del Wraith.',
    shadowPower: 'La Sombra es el ser completo. La Psique no existe ya como fuerza separada.',
    mechanical: 'El Wraith se convierte en Espectro (PNJ bajo control del Narrador). Si el Narrador y el jugador acuerdan que hay algo de Psique que lucha por sobrevivir, pueden jugarse escenas de "redención" —pero el camino de vuelta desde Angustia 10 es casi imposible y requiere intervención sobrenatural de otros Wraiths y el cumplimiento de sus Pasiones más profundas.',
    triggerDifficulty: 0,
    effects: ['spectral-pull'],
    catharsisTriggers: ['El proceso está completo —ya no hay Catarsis, solo Oblivion'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// RESULTADOS DE CATARSIS
// ─────────────────────────────────────────────────────────────────────────────

export const CATHARSIS_RESULTS: CatharsisResult[] = [
  {
    id: 'minor-lapse',
    name: 'Lapso Menor',
    severity: 'minor',
    description: 'La Sombra toma el control durante 1-3 turnos. Sus acciones son más crueles, más impulsivas o más orientadas a la Oblivion que las del Wraith.',
    mechanical: 'La Sombra controla el Wraith durante (3 - éxitos de Voluntad) turnos. Puede causar un daño menor, decir algo que destruya una relación o desperdiciar Pathos. El Wraith recuerda lo ocurrido con horror cuando recupera el control.',
    duration: '1-3 turnos',
    recoveryMethod: 'Voluntad dif. 6; recuperación automática después de los turnos de control.',
  },
  {
    id: 'harrowing',
    name: 'Descenso (Harrowing)',
    severity: 'moderate',
    description: 'La Psique es arrastrada a un combate interior dentro del propio ser del Wraith: un paisaje mental donde la Psique y la Sombra luchan por la supremacía.',
    mechanical: 'El Wraith cae inconsciente (para los observadores, su Corpus cae al suelo inerte). En el interior, se juega una escena de enfrentamiento Psique vs. Sombra. Si la Psique gana: recupera 1-3 puntos de Voluntad y la Sombra pierde 2 puntos temporales de Angustia. Si la Sombra gana: el Wraith pierde 1 punto permanente de Voluntad y la Sombra gana 1 punto de Angustia.',
    duration: 'Escena interior (5-15 minutos en tiempo real)',
    recoveryMethod: 'Resolución del combate interior. Los aliados del Wraith pueden "entrar" en el Descenso con poderes adecuados (Arcano: Patetismo 3+) para ayudar.',
  },
  {
    id: 'possession-scene',
    name: 'Posesión de Escena',
    severity: 'severe',
    description: 'La Sombra toma control completo durante una escena entera. Persigue sus objetivos propios: normalmente destruir Anclajes del Wraith, dañar a los aliados o generar Oblivion.',
    mechanical: 'La Sombra controla completamente el Wraith durante toda la escena. Puede usar todos los Arcanos. Los aliados del Wraith deben contenerle (Arcano Patetismo para identificarle, luego contención física o mágica). El Wraith recupera el control al final de la escena automáticamente.',
    duration: '1 escena completa',
    recoveryMethod: 'Fin de la escena; o un aliado puede usar Patetismo 4+ para "reconectar" al Wraith con sus Pasiones.',
  },
  {
    id: 'permanent-damage',
    name: 'Daño Permanente a la Psique',
    severity: 'severe',
    description: 'La Catarsis deja una cicatriz permanente: el Wraith pierde algo de sí mismo que no recupera fácilmente.',
    mechanical: 'El Wraith pierde 1 punto permanente de Voluntad. Si ya está a 1, pierde en su lugar 1 punto de un Anclaje. Si todos los Anclajes están a 1 punto, el Wraith está en peligro inminente de convertirse en Espectro.',
    duration: 'Permanente hasta recuperación activa',
    recoveryMethod: 'Fortalecer Anclajes o buscar ayuda de un Perdonador (gremio especializado en sanar Sombras).',
  },
  {
    id: 'spectral-transformation',
    name: 'Transformación Espectral Parcial',
    severity: 'terminal',
    description: 'La Sombra logra una victoria tan completa que el Wraith comienza a transformarse en Espectro. Este proceso puede ser revertido, pero requiere intervención inmediata.',
    mechanical: 'El Wraith gana 2 puntos permanentes de Angustia y sus poderes se vuelven imbuidos de energía de la Oblivion (causan Corpus dañado a objetos sagrados o purificados). Sus aliados tienen (Angustia del Wraith - 5) días antes de que la transformación sea irreversible.',
    duration: 'Permanente sin intervención',
    recoveryMethod: 'Ritual de Purificación de Sombra (requiere 3+ Wraiths cooperando, un Perdonador de nivel 4+ y el enfrentamiento del Wraith con sus Pasiones más profundas en una sesión de Descenso guiado).',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS DE PASIONES
// ─────────────────────────────────────────────────────────────────────────────

export const PASSION_TYPES: PassionType[] = [
  {
    id: 'amor',
    name: 'Amor',
    category: 'positive',
    description: 'El amor que el Wraith sentía —romántico, familiar, de amistad— que le une a los vivos. Es la Pasión más común y la que más Glamour genera cuando honramos o Hostigamos relacionados con ella.',
    angustiaGain: '2 puntos si la persona amada es dañada o muere',
    hauntingBonus: '+2 dados cuando Hostigamos en nombre del amor',
    examples: ['Amor romántico por la pareja viva', 'Amor paternal/maternal por un hijo', 'Amistad profunda de décadas'],
  },
  {
    id: 'culpa',
    name: 'Culpa',
    category: 'negative',
    description: 'La culpa que el Wraith lleva por algo que hizo o no hizo en vida. Es la Pasión más fácil de manipular por la Sombra: la culpa sin resolver alimenta la Angustia directamente.',
    angustiaGain: '1 punto por cada recordatorio del acto que genera culpa; 3 si el damnificado aparece',
    hauntingBonus: 'Ninguno —la culpa no beneficia al Hostigar, pero si se confronta puede reducir Angustia permanente',
    examples: ['Culpa por un accidente que causó la muerte de alguien', 'Culpa por haber abandonado a alguien', 'Culpa por una decisión que arruinó una vida'],
  },
  {
    id: 'ira',
    name: 'Ira',
    category: 'complex',
    description: 'La rabia que el Wraith lleva consigo —justa o no. Puede ser el motor de acciones protectoras o el combustible que la Sombra usa para desencadenar Catarsis.',
    angustiaGain: '1 punto si el objetivo de la ira actúa de forma que la justifica',
    hauntingBonus: '+1 dado cuando Hostigamos motivados por ira hacia un objetivo específico',
    examples: ['Ira hacia el asesino', 'Ira hacia quien arruinó su negocio', 'Ira hacia una institución o sistema'],
  },
  {
    id: 'nostalgia',
    name: 'Nostalgia',
    category: 'positive',
    description: 'El dolor dulce de lo que fue y ya no puede ser. La nostalgia es un Anclaje que puede sostener al Wraith o hundirle según cómo se gestione.',
    angustiaGain: '1 punto cuando el mundo que amaba cambia irrevocablemente',
    hauntingBonus: '+2 dados cuando Hostigamos a alguien que comparte los recuerdos del Wraith',
    examples: ['Nostalgia por la infancia', 'Nostalgia por un lugar que fue destruido', 'Nostalgia por una época de la historia'],
  },
  {
    id: 'miedo',
    name: 'Miedo',
    category: 'negative',
    description: 'El miedo que persiste después de la muerte. Para los Wraiths, el miedo es especialmente poderoso —la Sombra puede amplificarlo hasta convertirlo en parálisis.',
    angustiaGain: '1 punto cada vez que el objeto del miedo aparece; 3 si el Wraith se ve forzado a confrontarlo',
    hauntingBonus: 'Ninguno directo —pero el miedo de la Psique puede ser Pasión de la Sombra (+2 para ella cuando lo explota)',
    examples: ['Miedo a la Oblivion', 'Miedo a que los vivos olpiden al Wraith', 'Miedo a convertirse en Espectro'],
  },
  {
    id: 'orgullo',
    name: 'Orgullo',
    category: 'complex',
    description: 'El orgullo que el Wraith sentía en vida —logros, linaje, obra. Puede ser una fuente de fortaleza o una vulnerabilidad que la Sombra y otros Wraiths explotan.',
    angustiaGain: '2 puntos si el legado del Wraith es destruido, ignorado o ridiculizado',
    hauntingBonus: '+1 dado cuando Hostigamos para proteger o reivindicar el legado del Wraith',
    examples: ['Orgullo por una obra artística o intelectual', 'Orgullo por el linaje familiar', 'Orgullo por el rol en una comunidad'],
  },
  {
    id: 'deber',
    name: 'Deber',
    category: 'positive',
    description: 'La obligación que el Wraith siente que todavía no ha cumplido. El Deber como Pasión es la más cercana a un Anclaje: sostiene al Wraith en el Mundo Oscuro hasta que se complete.',
    angustiaGain: '1 punto por cada señal de que el deber no podrá cumplirse; 3 si se hace imposible',
    hauntingBonus: '+3 dados cuando Hostigamos directamente en nombre del cumplimiento del deber',
    examples: ['Deber de proteger a un familiar', 'Deber de completar una obra inacabada', 'Deber de revelar una verdad oculta'],
  },
  {
    id: 'envidia',
    name: 'Envidia',
    category: 'negative',
    description: 'La envidia de los vivos —de su calor, su futuro, su libertad. La Envidia es la Pasión más peligrosa porque la Sombra puede convertirla en impulso destructivo contra los propios Anclajes del Wraith.',
    angustiaGain: '1 punto por escena en que el Wraith observa la felicidad de los vivos sin poder participar',
    hauntingBonus: 'La Sombra gana +2 para activar impulsos de sabotaje cuando la Envidia está activa',
    examples: ['Envidia de los vivos por su vida', 'Envidia de Wraiths más poderosos', 'Envidia de quienes "lograron" ascender'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ESPECTROS (Spectres)
// ─────────────────────────────────────────────────────────────────────────────

export const SPECTRES: SpectreType[] = [
  {
    id: 'lemure',
    name: 'Lemur',
    tier: 1,
    description: 'Los Lemures son los Espectros más básicos: Wraiths que se convirtieron tan recientemente que todavía conservan algo de su forma reconocible, pero ya no tienen Psique. Son criaturas de impulso puro, guiadas por las últimas Pasiones que les quedaban cuando cayeron en la Oblivion.',
    origin: 'Wraiths cuyos últimos Anclajes se rompieron sin que ningún Perdonador ni aliado intervinieran.',
    attributes: { physical: 3, social: 1, mental: 2 },
    willpower: 3,
    corpus: 6,
    angustia: 10,
    powers: [
      'Materialización básica (Arcano: Manifestación 1)',
      'Toque agotador: contacto físico drena 1 Pathos del objetivo',
      'Grito del Vacío: todos en radio de 10m deben superar Voluntad dif. 6 o sentir terror momentáneo',
    ],
    weakness: 'Los Lemures son atraídos instintivamente hacia los Anclajes que tenían en vida —y pueden ser apaciguados temporalmente si alguien que conocían en vida les habla con su nombre verdadero.',
    shadowRating: 'Ninguna distinción Psique/Sombra. El Lemur ES su Sombra.',
  },
  {
    id: 'nihil-spawn',
    name: 'Engendro del Nihil',
    tier: 2,
    description: 'Los Engendros del Nihil emergen directamente de la Oblivion a través de brechas en el tejido del Umbra Oscuro. No fueron Wraiths —nacieron de la nada misma, con forma humanoidea pero vacíos de toda Psique que alguna vez existiera.',
    origin: 'Emergen de Nihils (brechas hacia la Oblivion pura) cuando la acumulación de Angustia en un área es suficientemente elevada.',
    attributes: { physical: 4, social: 2, mental: 3 },
    willpower: 5,
    corpus: 8,
    angustia: 10,
    powers: [
      'Toque disolvente: causa 1 nivel de daño agravado al Corpus de Wraiths (el contacto disuelve la sustancia espectral)',
      'Aura de Angustia: los Wraiths en radio de 5m ganan 1 punto de Angustia por turno de cercanía',
      'Resistencia a Arcanos: los efectos de Arcanos tienen dificultad +2 al afectar a un Engendro del Nihil',
    ],
    weakness: 'Los objetos de poder sagrado, la Quintaesencia M20 y la Quintaesencia C20 (Glamour) causan daño agravado al Engendro del Nihil en contacto directo.',
    shadowRating: 'Su mera presencia puede activar las Sombras de Wraiths cercanos (+1 Angustia temporal por turno de proximidad).',
  },
  {
    id: 'malfean',
    name: 'Malfeo',
    tier: 3,
    description: 'Los Malfeos son Espectros de poder considerable —antiguos Wraiths poderosos que cayeron a la Oblivion hace siglos o milenios y emergieron transformados en algo más coherente y estratégico que los Lemures. Tienen mentes complejas, planes a largo plazo y la capacidad de organizar a otros Espectros.',
    origin: 'Wraiths de poder excepcional (Elder Wraiths, líderes de gremios, héroes históricos) que perdieron la batalla contra su Sombra después de décadas o siglos.',
    attributes: { physical: 5, social: 4, mental: 5 },
    willpower: 8,
    corpus: 12,
    angustia: 10,
    powers: [
      'Señor de Espectros: puede comandar hasta (Voluntad) Espectros de tier 1-2 simultáneamente',
      'Arcanos Corrompidos: tiene acceso a 3 Arcanos de su existencia anterior, ahora con efectos adicionales de Oblivion',
      'Presencia de Oblivion: su presencia genera 1 Angustia por escena en todos los Wraiths en radio de 50m',
      'Forma Terror: puede adoptar una forma visualmente aterradora (Voluntad dif. 7 para no huir)',
    ],
    weakness: 'Los Malfeos conservan las Pasiones de su existencia como Wraiths, ahora invertidas como vulnerabilidades: lo que más amaron en vida es lo que más les daña en su forma espectral.',
    shadowRating: 'Pueden "hablar directamente" con las Sombras de Wraiths cercanos como si fueran viejos amigos, sin pasar por la Psique del Wraith.',
  },
  {
    id: 'oblivion-lord',
    name: 'Señor de la Oblivion',
    tier: 4,
    description: 'Los Señores de la Oblivion son entidades de un poder casi inconcebible: seres que se han disuelto y reconstituido en la Oblivion tantas veces que ya no son identificables como Wraiths. Son fuerzas cósmicas disfrazadas de personas, cuyo único objetivo es acelerar el retorno de toda existencia al vacío primordial.',
    origin: 'Malfeos que completaron el proceso de disolución y reconstitución en la Oblivion. Algunos podrían ser entidades que nunca fueron humanas.',
    attributes: { physical: 7, social: 6, mental: 7 },
    willpower: 10,
    corpus: 20,
    angustia: 10,
    powers: [
      'Presencia de Vacío: todos los Wraiths en radio de 200m sienten su presencia como un frío sobrenatural y ganan 2 Angustia automáticamente',
      'Oblivion Touch: el contacto con un Señor de la Oblivion causa 3 niveles de daño agravado al Corpus Y 2 puntos de Angustia permanente',
      'Nihil Command: puede abrir un Nihil a voluntad',
      'Harrowing Masivo: puede iniciar un Descenso en hasta 5 Wraiths simultáneamente con una mirada',
      'Forma Ilusoria: aparece como cualquier persona que el Wraith objetivo alguna vez amó',
    ],
    weakness: 'Un Señor de la Oblivion solo puede ser herido por Armas forjadas en Patetismo puro (el Arcano Patetismo 5+), por objetos de su propia existencia mortal original, o por grupos de Wraiths que actúan en perfecta unidad de Psique.',
    shadowRating: 'Su mera proximidad puede hacer que las Sombras de Wraiths tomen control temporal sin Catarsis previa (Voluntad dif. 9 para resistir).',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MECÁNICAS DE LA SOMBRA — Reglas del Jugador de la Sombra
// ─────────────────────────────────────────────────────────────────────────────

export interface ShadowPlayerRule {
  id: string
  title: string
  description: string
  mechanical: string
}

export const SHADOW_PLAYER_RULES: ShadowPlayerRule[] = [
  {
    id: 'shadow-player',
    title: 'El Jugador de la Sombra',
    description: 'En grupos grandes, puede asignarse a un segundo jugador el rol de "Jugador de la Sombra" para cada Wraith —una persona que representa los impulsos destructivos del personaje.',
    mechanical: 'El Jugador de la Sombra tiene (Angustia del Wraith) puntos de intervención por sesión. Puede gastarlos para añadir +1 a dificultades, activar Pasiones negativas, o intentar Catarsis. No puede actuar sin gastar puntos.',
  },
  {
    id: 'dark-passions',
    title: 'Pasiones Oscuras (Dark Passions)',
    description: 'La Sombra tiene sus propias Pasiones —versiones negativas de las Pasiones del Wraith— que la alimentan cuando son satisfechas.',
    mechanical: 'Cada Wraith tiene 1-3 Pasiones Oscuras asignadas al inicio (el Narrador las elige basándose en las Pasiones normales del personaje). Cuando una Pasión Oscura es "satisfecha" (el Wraith actúa de forma destructiva en esa área), la Sombra recupera 1 punto temporal de Angustia.',
  },
  {
    id: 'shadow-deals',
    title: 'Tratos con la Sombra',
    description: 'El Wraith puede negociar con su propia Sombra para obtener ventajas temporales a cambio de concesiones.',
    mechanical: 'El Wraith puede ofrecer a la Sombra: libertad de actuar durante 1 turno, un punto de Angustia adicional, o cumplir una Pasión Oscura. A cambio, la Sombra puede: proporcionar información que solo ella sabe, añadir +3 dados a una tirada específica, o reducir temporalmente la Angustia en 1. El trato siempre tiene un coste secundario que el Narrador determina.',
  },
  {
    id: 'catharsis-resolution',
    title: 'Resolución de Catarsis',
    description: 'Cuando la Sombra toma el control, no simplemente "actúa locamente" —tiene objetivos específicos que puede perseguir con inteligencia.',
    mechanical: 'Durante una Catarsis, la Sombra tiene 3 objetivos en orden de prioridad: (1) Destruir un Anclaje del Wraith. (2) Dañar a un aliado o amigo del Wraith. (3) Generar Oblivion (destruir algo de valor). Si puede hacer más de uno, intentará hacerlo. El Narrador juega la Sombra según estos objetivos.',
  },
]
