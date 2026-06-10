import type { GarouForm } from '@/types/powers'

// ─────────────────────────────────────────────────────────────────────────────
// W20 — FORMAS GAROU (5 Formas canónicas)
// Fuente: Werewolf: The Apocalypse 20th Anniversary Edition, pp. 285–290
// Modificadores exactos de Atributos y reglas de daño por forma
// ─────────────────────────────────────────────────────────────────────────────

export const W20_FORMS: GarouForm[] = [
  // ── HOMID ─────────────────────────────────────────────────────────────────
  {
    id: 'homid',
    name: 'Homid',
    nameEs: 'Homínido',
    description: 'La forma humana normal del Garou. Indistinguible de un mortal. Los Garou-Homínido y los Garou-Lupus pueden permanecer en esta forma sin coste ni esfuerzo. Es la forma de la diplomacia, la infiltración y la vida cotidiana en el mundo de los Velos.',
    attributeModifiers: [],    // Sin modificadores — estadísticas base del personaje
    naturalWeapons: {
      claws: undefined,
      bite: 'Daño Contuso (mordisco humano)',
      notes: 'Sin garras sobrenaturales. El daño se trata como combate desarmado humano estándar.',
    },
    delirium: false,
    difficultyToShift: 6,
    rageCostToShift: 0,
    movementNotes: 'Movimiento humano estándar.',
    socialRestrictions: 'Ninguna. Puede interactuar normalmente con mortales.',
    specialRules: [
      'Sin penalización a Manipulación ni a Apariencia.',
      'Puede usar todo tipo de herramientas, armas y equipamiento.',
      'Garou-Homínidos pueden permanecer en esta forma sin tirada ni coste de Rabia.',
      'Cambiar desde Homid a cualquier otra forma requiere una tirada de Stamina dif. 6 la primera vez del día; las siguientes transiciones son libres salvo indicación contraria.',
    ],
  },

  // ── GLABRO ────────────────────────────────────────────────────────────────
  {
    id: 'glabro',
    name: 'Glabro',
    nameEs: 'Glabro',
    description: 'La forma humanoide aumentada. El Garou crece en musculatura, la mandíbula se ensancha y el cuerpo adquiere una densidad aterradora. Puede pasar como humano en condiciones de poca luz, pero a plena exposición su naturaleza monstruosa es evidente. Es la forma de la intimidación discreta y el combate urbano.',
    attributeModifiers: [
      { attribute: 'Fuerza',        modifier: +2 },
      { attribute: 'Stamina',       modifier: +2, notes: 'Resistencia aumentada' },
      { attribute: 'Manipulación',  modifier: -1, notes: 'La ferocidad dificulta la sutileza social' },
      { attribute: 'Apariencia',    modifier: -1, notes: 'Rasgos endurecidos y bestiales' },
    ],
    naturalWeapons: {
      claws: 'Garras incipientes: Daño Letal (Fuerza + 1 dado Letal)',
      bite:  'Mordisco: Daño Letal (Fuerza + 1 dado Letal)',
      notes: 'Las garras en Glabro son más pequeñas que en Crinos; no son Agravadas.',
    },
    delirium: false,
    difficultyToShift: 6,
    rageCostToShift: 0,
    movementNotes: 'Velocidad ligeramente superior a la humana (+1 metro por turno en carrera).',
    socialRestrictions: 'Penalización de -1 a todas las tiradas sociales en situaciones donde la apariencia es importante. Los mortales perceptivos (Percepción dif. 8) notan algo "raro" en el individuo.',
    specialRules: [
      'Puede usar herramientas y armas diseñadas para humanos sin penalización.',
      'Las garras son Letales pero no Agravadas — esta distinción es importante contra vampiros y otras criaturas con Robustez.',
      'Doblar la Resistencia para cálculos de Stamina (absorber daño) si la forma es relevante.',
      'Puede permanecer en Glabro sin coste de Rabia. No requiere tirada para mantenerse.',
    ],
  },

  // ── CRINOS ────────────────────────────────────────────────────────────────
  {
    id: 'crinos',
    name: 'Crinos',
    nameEs: 'Crinos',
    description: 'La forma de guerra. La transformación más conocida del Garou y la más aterradora: un lobo-hombre de 2,5 metros, capaz de destrozar acero con las garras. Cada punto de daño que recibe el Garou en Crinos activa la posibilidad de Frenzy. Esta forma es el arma definitiva del Apocalipsis, pero su uso descuidado en presencia de mortales rompe la Vela.',
    attributeModifiers: [
      { attribute: 'Fuerza',        modifier: +4, notes: 'Fuerza máxima alcanzable en forma física' },
      { attribute: 'Destreza',      modifier: +1 },
      { attribute: 'Stamina',       modifier: +3 },
      { attribute: 'Manipulación',  modifier: -3, notes: 'La bestia domina; el lenguaje humano es difícil' },
      { attribute: 'Apariencia',    isSet: true, setValue: 0, notes: 'No hay Apariencia social posible en esta forma' },
    ],
    naturalWeapons: {
      claws: 'Garras: Daño AGRAVADO (Fuerza + 2 dados Agravados)',
      bite:  'Mordisco: Daño AGRAVADO (Fuerza + 1 dado Agravado)',
      notes: 'El daño Agravado de Crinos no puede ser absorbido por Robustez/Fortitud ordinaria. Afecta a vampiros, criaturas sobrenaturales y objetos encantados.',
    },
    delirium: true,
    difficultyToShift: 6,
    rageCostToShift: 0,
    movementNotes: 'Velocidad de carrera x2 respecto al humano. No puede operar maquinaria ni usar armas de fuego con destreza (penalización -2 a tiradas con equipo humano).',
    socialRestrictions: 'Apariencia fijada en 0. Todos los mortales que la vean deben tirar Valentía dif. (7 - Empatía del Garou) o sufrir Delirio. El Delirio puede causar pánico, huida, amnesia selectiva o colapso mental según los éxitos. Ver reglas de Vela, p. 261 W20.',
    specialRules: [
      'DELIRIO: Los mortales que vean a un Garou en Crinos sufren el Delirio. Vampiros, magos y otros seres sobrenaturales son inmunes o tienen tiradas modificadas según su tradición.',
      'Cualquier herida recibida requiere tirada de Rabia dif. 6; si se falla el Garou entra en Frenesí de Rabia automáticamente.',
      'No puede hablar lenguaje humano articulado — solo gruñidos y rugidos entendibles por otros Garou.',
      'Garras y mordisco ignoran Armadura convencional (reducción de dados de absorción a la mitad, redondeado hacia abajo).',
      'Dura hasta que el Garou elija cambiar, entre en Harano (apatía espiritual), o quede inconsciente.',
      'Los Garou-Lupus encuentran Crinos más fácil de mantener que los Garou-Homínido (diferencia narrativa, no mecánica en el core).',
    ],
  },

  // ── HISPO ─────────────────────────────────────────────────────────────────
  {
    id: 'hispo',
    name: 'Hispo',
    nameEs: 'Hispo',
    description: 'El lobo primigenio. Una forma de lobo sobrenatural del tamaño de un pony, con mandíbulas capaces de triturar huesos de vampiro y garras que desgarran el tejido espiritual. Es la forma de caza, rastreo y movimiento rápido en campo abierto. Más sutil que Crinos pero igual de letal en el momento justo.',
    attributeModifiers: [
      { attribute: 'Fuerza',        modifier: +3 },
      { attribute: 'Destreza',      modifier: +2, notes: 'Agilidad lupina aumentada' },
      { attribute: 'Stamina',       modifier: +3 },
      { attribute: 'Manipulación',  modifier: -3, notes: 'No puede articular lenguaje humano' },
      { attribute: 'Apariencia',    isSet: true, setValue: 0, notes: 'Forma animal — sin Apariencia social humana' },
    ],
    naturalWeapons: {
      claws: 'Garras vestigiales: Daño AGRAVADO (Fuerza + 1 dado Agravado)',
      bite:  'Mordisco enorme: Daño AGRAVADO (Fuerza + 2 dados Agravados)',
      notes: 'El mordisco de Hispo es el principal arma — mayor que en Crinos por la proporción del cráneo. Garras menores pero aún Agravadas.',
    },
    delirium: true,
    difficultyToShift: 6,
    rageCostToShift: 0,
    movementNotes: 'Velocidad de carrera x3 respecto al humano en campo abierto. Capacidad de rastreo olfativo sobresaliente (+3 dados a tiradas de rastreo por olfato). Puede seguir rastros de hasta 72 horas de antigüedad en condiciones normales.',
    socialRestrictions: 'Apariencia 0. Los mortales que la vean también pueden sufrir Delirio (dif. menor que Crinos — dif. 5 - Empatía del Garou — ya que no parece humano pero es menos instintivamente aterradora).',
    specialRules: [
      'No puede usar ningún tipo de equipamiento o herramienta diseñada para manos.',
      'Puede comunicarse con lobos ordinarios y tiene comprensión de su lenguaje corporal al nivel de Alpha.',
      'Movimiento silencioso: penalización de Alerta del oponente aumentada +2 cuando el Garou se mueve a velocidad reducida (sigilo).',
      'El Delirio en Hispo es de dificultad 5 para mortales (menos aterrador que Crinos pero aún sobrenatural).',
      'Puede nadar a velocidad doble de humano.',
    ],
  },

  // ── LUPUS ─────────────────────────────────────────────────────────────────
  {
    id: 'lupus',
    name: 'Lupus',
    nameEs: 'Lupus',
    description: 'La forma de lobo natural. Indistinguible de un lobo común (aunque significativamente más grande y con ojos que reflejan inteligencia sobrenatural). Es la forma de la infiltración en la naturaleza, del rastreo más preciso y de la comunicación con el mundo animal. Los Garou-Lupus y los espíritus lobo reconocen en esta forma un ser de Gaia.',
    attributeModifiers: [
      { attribute: 'Fuerza',        modifier: +1, notes: 'Fuerza de lobo, menor que formas híbridas' },
      { attribute: 'Destreza',      modifier: +2, notes: 'Agilidad natural del lobo' },
      { attribute: 'Stamina',       modifier: +2 },
      { attribute: 'Manipulación',  modifier: -3, notes: 'Sin lenguaje articulado; comunicación solo gestual/olfativa' },
      { attribute: 'Apariencia',    isSet: true, setValue: 0, notes: 'Forma animal — sin Apariencia social humana. Los Garou-Lupus tienen Apariencia en esta forma como atractivo animal, pero no en contexto social humano.' },
    ],
    naturalWeapons: {
      claws: 'Garras lupinas: Daño Letal (Fuerza + 1 dado Letal). NO son Agravadas.',
      bite:  'Mordisco: Daño Letal (Fuerza + 1 dado Letal). NO es Agravado en Lupus.',
      notes: 'En forma Lupus el daño es Letal, no Agravado. Si el Garou está bajo Frenesí de Rabia, el daño de mordisco puede ser tratado como Agravado (decisión del Narrador).',
    },
    delirium: false,
    difficultyToShift: 6,
    rageCostToShift: 0,
    movementNotes: 'Velocidad de carrera x2,5 respecto al humano. Rastreo olfativo: el mejor de todas las formas (+4 dados). Puede seguir rastros de hasta 5 días de antigüedad en terreno despejado.',
    socialRestrictions: 'Sin Apariencia en contexto humano. Mortales no sufren Delirio automático — un lobo grande no activa la respuesta del Wyrm en la psique humana. Sin embargo, su tamaño inusual puede llamar la atención.',
    specialRules: [
      'Sin Delirio automático para mortales. Los mortales pueden reconocerlo como un lobo muy grande pero no como monstruo sobrenatural.',
      'Garou-Lupus pueden permanecer en esta forma sin tirada ni coste. Es su forma "descanso" equivalente a Homid para los criados en ciudad.',
      'Puede comunicarse con lobos, coyotes y otros cánidos sin penalización. Es reconocido automáticamente como Garou por lobos ordinarios.',
      'El daño de garras y mordisco en Lupus es Letal, no Agravado — punto crítico de diferenciación frente a Crinos y Hispo.',
      'Puede moverse por entornos urbanos sin Delirio, pero arriesga ser capturado por control de animales.',
      'Los espíritus de Gaia (especialmente los lobos-espíritu) perciben inmediatamente la naturaleza Garou en forma Lupus.',
    ],
  },
]

// ─── Tabla comparativa rápida (útil para UI) ──────────────────────────────────
export const W20_FORMS_SUMMARY = [
  { id: 'homid',  nameEs: 'Homínido', str: '+0', dex: '+0', sta: '+0', man: '+0', app: 'normal',   delirio: '—',   dmg: 'Contuso'          },
  { id: 'glabro', nameEs: 'Glabro',   str: '+2', dex: '+0', sta: '+2', man: '-1', app: '-1',        delirio: '—',   dmg: 'Letal'            },
  { id: 'crinos', nameEs: 'Crinos',   str: '+4', dex: '+1', sta: '+3', man: '-3', app: '0 (fijo)',  delirio: 'Dif 7', dmg: 'Agravado'       },
  { id: 'hispo',  nameEs: 'Hispo',    str: '+3', dex: '+2', sta: '+3', man: '-3', app: '0 (fijo)',  delirio: 'Dif 5', dmg: 'Agravado'       },
  { id: 'lupus',  nameEs: 'Lupus',    str: '+1', dex: '+2', sta: '+2', man: '-3', app: '0 (animal)', delirio: '—',  dmg: 'Letal'            },
]
