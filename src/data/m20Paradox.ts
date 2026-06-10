// ─────────────────────────────────────────────────────────────────────────────
// M20 — PARADOJA (Paradox)
// La Paradoja es la reacción del consenso de la humanidad contra la magia
// vulgar: la realidad "corrige" las violaciones demasiado obvias de sus leyes.
// Se acumula como puntos y se descarga en forma de efectos que van de molestos
// a completamente devastadores.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export type ParadoxEffectType =
  | 'backlash'        // Retroceso inmediato de daño
  | 'anomaly'         // Anomalía localizada persistente
  | 'paradox-spirit'  // Espíritu de Paradoja invocado
  | 'branding'        // Marca o deformidad física permanente o semipermanente
  | 'realm-rip'       // Desgarro dimensional / bolsillo de realidad
  | 'quiet'           // Estado mental de "quietud" o psicosis
  | 'unraveling'      // Deshacimiento total del hechizo y del mago

export interface ParadoxEffect {
  id: string
  name: string
  effectType: ParadoxEffectType
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic'
  description: string          // Descripción narrativa
  mechanical: string           // Regla exacta
  duration: string             // Cuánto dura el efecto
  canBeResisted: boolean       // ¿Puede el mago resistirlo?
  resistanceMechanic?: string  // Si puede resistirse, ¿cómo?
}

export interface ParadoxLevel {
  level: number                // 1–10+
  name: string                 // Nombre del umbral
  threshold: number            // Puntos de Paradoja acumulados para llegar aquí
  description: string          // Qué siente / qué ocurre al llegar a este nivel
  effects: ParadoxEffect[]     // Efectos posibles en este nivel
  dischargeDice: string        // Dados de descarga automática (d10s)
  dischargeOnSuccess: string   // Qué pasa cuando la Paradoja se descarga
}

export interface ParadoxAccumulationRule {
  id: string
  situation: string
  pointsGained: string         // '1', '2', 'd10', etc.
  notes: string
}

export interface ParadoxReductionRule {
  id: string
  method: string
  pointsReduced: string
  requirements: string
  notes: string
}

// ─────────────────────────────────────────────────────────────────────────────
// REGLAS DE ACUMULACIÓN
// ─────────────────────────────────────────────────────────────────────────────

export const PARADOX_ACCUMULATION_RULES: ParadoxAccumulationRule[] = [
  {
    id: 'vulgar-magic',
    situation: 'Lanzar magia vulgar',
    pointsGained: '1 por dado de éxito en la tirada de magia',
    notes: 'Cada éxito en un efecto vulgar agrega 1 punto de Paradoja a la reserva del mago. Si nadie presencia el acto mágico, puede reducirse a 0 puntos a discreción del Narrador.',
  },
  {
    id: 'vulgar-with-witnesses',
    situation: 'Magia vulgar con testigos mortales',
    pointsGained: '+1 adicional por cada mortal testigo (máx. +3 extra)',
    notes: 'Los testigos mortales refuerzan el consenso que la magia viola. Cuantos más testigos, más fuerte la reacción del consenso.',
  },
  {
    id: 'coincidental-magic',
    situation: 'Magia coincidental',
    pointsGained: '0 (normalmente)',
    notes: 'La magia que parece natural no genera Paradoja salvo que el Narrador determine que el contexto específico la hace obviosamente sobrenatural (dificultad +1 a la tirada, y si se falla genera 1 punto).',
  },
  {
    id: 'paradox-flaw',
    situation: 'Fallo catastrófico (botch) en una tirada de magia',
    pointsGained: '1d10 puntos automáticos',
    notes: 'Un botch no solo cancela el hechizo: invita activamente a la Paradoja. Se lanzan 1d10 y ese número se añade a la reserva inmediatamente.',
  },
  {
    id: 'carrying-quintessence',
    situation: 'Portar Quintaesencia en exceso',
    pointsGained: '1 por cada punto sobre el máximo (Arete)',
    notes: 'Los magos que almacenan más Quintaesencia de la que pueden sostener (por encima de su valor de Arete) generan "filtraciones" que atraen Paradoja.',
  },
  {
    id: 'powerful-effects',
    situation: 'Efectos de múltiples Esferas simultáneas',
    pointsGained: '+1 adicional si el efecto combina 3+ Esferas en magia vulgar',
    notes: 'La complejidad amplifica la visibilidad del consenso roto.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// REGLAS DE REDUCCIÓN
// ─────────────────────────────────────────────────────────────────────────────

export const PARADOX_REDUCTION_RULES: ParadoxReductionRule[] = [
  {
    id: 'coincidental-resolution',
    method: 'Explicación coincidental post-hoc',
    pointsReduced: '1–2 según calidad de la explicación',
    requirements: 'El mago debe proporcionar una explicación mundana creíble del evento sobrenatural que testigos puedan aceptar',
    notes: 'Solo funciona si hay testigos que convencer. El Narrador juzga la calidad de la explicación.',
  },
  {
    id: 'seeking',
    method: 'Umbral (experiencia de revelación interior)',
    pointsReduced: 'Toda la Paradoja acumulada',
    requirements: 'El mago voluntariamente entra en un estado de trance en el Umbra y afronta sus contradicciones internas. Puede durar horas o días.',
    notes: 'Solo aplicable cuando el personaje alcanza un momento de verdadera ruptura paradigmática. Muy narrativo, poco frecuente.',
  },
  {
    id: 'quiet',
    method: 'La Quietud (Quiet)',
    pointsReduced: 'Toda la Paradoja, pero el mago entra en un estado psicótico',
    requirements: 'La Paradoja se descarga automáticamente mediante una crisis disociativa',
    notes: 'No es "reducción" elegida —es la Paradoja eligiendo la forma de descarga. El mago entra en Quietud hasta que resuelve su conflicto interior.',
  },
  {
    id: 'quintessence-burn',
    method: 'Quemar Quintaesencia para absorber Paradoja',
    pointsReduced: '1 punto de Paradoja por 1 punto de Quintaesencia quemada',
    requirements: 'Acción activa, declarada antes de que la Paradoja se descargue',
    notes: 'El mago "paga" la Paradoja con su reserva de Quintaesencia personal.',
  },
  {
    id: 'time-natural-decay',
    method: 'Decaimiento natural con el tiempo',
    pointsReduced: '1 punto por mes de práctica cuidadosa sin nueva Paradoja',
    requirements: 'El mago evita magia vulgar durante al menos 1 mes',
    notes: 'El consenso "olvida" gradualmente las violaciones antiguas si no son reforzadas.',
  },
  {
    id: 'rite-of-cleansing',
    method: 'Ritual de Purificación de Paradoja (grupal)',
    pointsReduced: '2–5 según éxito del ritual',
    requirements: 'Requiere al menos 3 magos cooperando, un Nodo o lugar de poder, y al menos una noche completa de ritual',
    notes: 'Los rituales grupales en lugares de poder pueden reducir la Paradoja acumulada significativamente.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TABLA DE NIVELES DE PARADOJA (1–10+)
// ─────────────────────────────────────────────────────────────────────────────

export const PARADOX_LEVELS: ParadoxLevel[] = [
  {
    level: 1,
    name: 'Eco',
    threshold: 1,
    description: 'La primera chispa de Paradoja. El mago siente un hormigueo incómodo, como electricidad estática. El mundo lo ha notado.',
    dischargeDice: '1d10',
    dischargeOnSuccess: 'La Paradoja desaparece con un leve efecto inoportuno: un aparato falla, cae una lluvia breve, alguien mira en el momento equivocado.',
    effects: [
      {
        id: 'echo-tingle',
        name: 'Hormigueo Estático',
        effectType: 'backlash',
        severity: 'minor',
        description: 'Una descarga leve de energía paradójica. El mago siente malestar durante unas horas.',
        mechanical: '1 nivel de daño contuso que no puede ser soaked.',
        duration: 'instantáneo',
        canBeResisted: false,
      },
      {
        id: 'echo-inconvenience',
        name: 'Pequeña Inconveniencia',
        effectType: 'anomaly',
        severity: 'minor',
        description: 'Un aparato electrónico falla. Una llave desaparece. Una llamada se corta en el peor momento.',
        mechanical: '+1 dificultad a la próxima tirada del mago que no implique magia.',
        duration: '1 escena',
        canBeResisted: false,
      },
    ],
  },
  {
    level: 2,
    name: 'Interferencia',
    threshold: 3,
    description: 'La Paradoja se ha afianzado. Los efectos mágicos del personaje empiezan a "interferir" con resultados inesperados y el entorno reacciona con pequeñas anomalías.',
    dischargeDice: '2d10',
    dischargeOnSuccess: 'Un efecto irónico: el propio hechizo del mago falla de una manera que subraya lo "ridícula" que era la idea (el fuego invocado aparece en el propio bolsillo del mago, etc.)',
    effects: [
      {
        id: 'interference-backlash',
        name: 'Retroceso Menor',
        effectType: 'backlash',
        severity: 'minor',
        description: 'La energía del hechizo rebota parcialmente en el lanzador.',
        mechanical: '2 niveles de daño contuso que no puede ser soaked.',
        duration: 'instantáneo',
        canBeResisted: false,
      },
      {
        id: 'interference-glitch',
        name: 'Fallo Técnico Extendido',
        effectType: 'anomaly',
        severity: 'minor',
        description: 'Los aparatos electrónicos en radio de 10 metros fallan intermitentemente durante una hora.',
        mechanical: 'Toda tecnología electrónica en radio 10m tiene 50% de probabilidad de fallar en el peor momento (al azar, Narrador decide).',
        duration: '1 hora',
        canBeResisted: false,
      },
    ],
  },
  {
    level: 3,
    name: 'Tensión',
    threshold: 5,
    description: 'La Paradoja es palpable. El mago empieza a sentir el peso del consenso en sus huesos. Los efectos mágicos se vuelven levemente impredecibles.',
    dischargeDice: '3d10',
    dischargeOnSuccess: 'Un espíritu de Paradoja menor (Gremlin, Paradox Wraith básico) aparece durante 1 escena para fastidiar al mago sin atacarle directamente.',
    effects: [
      {
        id: 'tension-damage',
        name: 'Descarga Dolorosa',
        effectType: 'backlash',
        severity: 'moderate',
        description: 'Un retroceso de energía paradójica golpea al mago con fuerza notable.',
        mechanical: '1d6 niveles de daño letal que no puede ser soaked.',
        duration: 'instantáneo',
        canBeResisted: false,
      },
      {
        id: 'tension-gremlin',
        name: 'Gremlin de Paradoja',
        effectType: 'paradox-spirit',
        severity: 'minor',
        description: 'Un pequeño espíritu de caos aparece para sabotear los esfuerzos del mago.',
        mechanical: 'Espíritu de Paradoja nivel básico (Atributos 2/2/2, Poder: Sabotaje). Actúa 1d6 turnos fastidiando al mago (hace fallar 1 tirada aleatoria) antes de desvanecerse.',
        duration: '1d6 turnos',
        canBeResisted: true,
        resistanceMechanic: 'El mago puede intentar banish al espíritu con Voluntad dif. 7. Si falla, el espíritu permanece.',
      },
    ],
  },
  {
    level: 4,
    name: 'Presión',
    threshold: 7,
    description: 'El consenso aprieta activamente. La Paradoja es visible a otros magos con Auspex o Sexto Sentido. Los mortales sensibles notan que "algo está mal" con este individuo.',
    dischargeDice: '4d10',
    dischargeOnSuccess: 'Una anomalía persistente que dura días: tiempo extraño alrededor del mago, objetos que se mueven solos, sombras que no cuadran.',
    effects: [
      {
        id: 'pressure-letal',
        name: 'Descarga Grave',
        effectType: 'backlash',
        severity: 'moderate',
        description: 'La descarga paradójica causa daño serio.',
        mechanical: '2d6 niveles de daño letal que no puede ser soaked.',
        duration: 'instantáneo',
        canBeResisted: false,
      },
      {
        id: 'pressure-anomaly',
        name: 'Anomalía Local Persistente',
        effectType: 'anomaly',
        severity: 'moderate',
        description: 'La zona alrededor del mago experimenta anomalías físicas inexplicables durante días.',
        mechanical: 'Área de 30 metros: temperatura oscila ±10°C aleatorios. Objetos se mueven solos (no dañino, pero perturbador). Dificultad +1 en todas las tiradas sociales del mago en el área.',
        duration: '1d3 días',
        canBeResisted: true,
        resistanceMechanic: 'Voluntad dif. 8 para suprimir la anomalía durante 1 hora.',
      },
    ],
  },
  {
    level: 5,
    name: 'Ruptura',
    threshold: 10,
    description: 'La primera ruptura seria. La Paradoja está a punto de descargar de forma dramática. El mago experimenta flashbacks paradójicos: visiones de realidades alternativas que "deberían" ser.',
    dischargeDice: '5d10',
    dischargeOnSuccess: 'Un espíritu de Paradoja de nivel medio aparece y ataca activamente al mago durante 1 escena completa.',
    effects: [
      {
        id: 'rupture-agravado',
        name: 'Daño Agravado Menor',
        effectType: 'backlash',
        severity: 'severe',
        description: 'La descarga paradójica causa daño que no puede ser curado normalmente.',
        mechanical: '1d3 niveles de daño agravado. No se puede soaked con dados adicionales.',
        duration: 'permanente hasta curación',
        canBeResisted: false,
      },
      {
        id: 'rupture-spirit',
        name: 'Espíritu de Paradoja Medio',
        effectType: 'paradox-spirit',
        severity: 'moderate',
        description: 'Un espíritu de Paradoja más poderoso que ataca con determinación.',
        mechanical: 'Espíritu Paradoja medio (Atributos 3/3/3, Fuerza de Voluntad 6, Poder: Manipulación de efectos mágicos). Ataca durante toda la escena. Puede intentar "revertir" un hechizo activo del mago en lugar de atacar físicamente.',
        duration: '1 escena',
        canBeResisted: true,
        resistanceMechanic: 'Banish con Voluntad + Ocultismo dif. 8.',
      },
      {
        id: 'rupture-quiet-minor',
        name: 'Quietud Menor',
        effectType: 'quiet',
        severity: 'moderate',
        description: 'El mago cae brevemente en un estado disociativo donde no puede distinguir bien la realidad de la ilusión.',
        mechanical: 'Durante 1 escena, el mago experimenta alucinaciones menores (dificultad +2 en Percepción). Puede actuar pero con reducción en claridad.',
        duration: '1 escena',
        canBeResisted: true,
        resistanceMechanic: 'Voluntad dif. 7.',
      },
    ],
  },
  {
    level: 6,
    name: 'Fractura',
    threshold: 13,
    description: 'La realidad alrededor del mago está claramente fracturada. Otros personajes pueden ver las líneas donde el consenso se ha roto. El Umbra en esta área refleja el caos interno del mago.',
    dischargeDice: '6d10',
    dischargeOnSuccess: 'Una marca paradójica física aparece en el cuerpo del mago: una deformidad sutil pero visible (ojo que brilla, venas negras, piel que se traduce ligeramente).',
    effects: [
      {
        id: 'fracture-branding',
        name: 'Marca de Paradoja',
        effectType: 'branding',
        severity: 'severe',
        description: 'La Paradoja graba su huella en el cuerpo del mago.',
        mechanical: 'Deformidad menor pero visible: ojos con pupila equivocada, venas oscuras en manos, temperatura corporal anormal, etc. Penalización social -1 dado en entornos mundanos. Permanente hasta reducir Paradoja a 0 y realizar un ritual de purificación.',
        duration: 'permanente (hasta ritual)',
        canBeResisted: false,
      },
      {
        id: 'fracture-agravado',
        name: 'Descarga Agravada',
        effectType: 'backlash',
        severity: 'severe',
        description: 'Daño agravado significativo.',
        mechanical: '1d6 niveles de daño agravado. Sin posibilidad de soak.',
        duration: 'permanente hasta curación',
        canBeResisted: false,
      },
    ],
  },
  {
    level: 7,
    name: 'Tormenta',
    threshold: 16,
    description: 'La Paradoja alcanza nivel de tormenta. El consenso ha decidido que este mago es una amenaza activa a la estabilidad de la realidad y responde con fuerza proporcional.',
    dischargeDice: '7d10',
    dischargeOnSuccess: 'Un espíritu de Paradoja poderoso (Paradox Wyrm) aparece y persigue al mago hasta que logra banisharlo o escapa. Puede durar varias sesiones.',
    effects: [
      {
        id: 'storm-wyrm',
        name: 'Paradox Wyrm',
        effectType: 'paradox-spirit',
        severity: 'severe',
        description: 'Una manifestación mayor de Paradoja: un espíritu wyrm que persigue activamente al mago.',
        mechanical: 'Paradox Wyrm (Atributos 4/4/4, FdV 8, Salud 10, Poderes: Anular magia, Dañar materialmente, Perseguir al objetivo). Activo hasta ser banished (Voluntad + Ocultismo dif. 9, tirada extendida 15 éxitos) o destruido.',
        duration: 'hasta banishment o destrucción',
        canBeResisted: true,
        resistanceMechanic: 'Tirada extendida de banishment: Voluntad + Ocultismo dif. 9, 15 éxitos acumulados.',
      },
      {
        id: 'storm-realm-crack',
        name: 'Grieta Dimensional',
        effectType: 'realm-rip',
        severity: 'severe',
        description: 'Se abre una pequeña grieta al Umbra o a una dimensión de Paradoja en la ubicación del mago.',
        mechanical: 'Grieta de 1 metro de diámetro que conecta el área con una zona del Umbra corrupta. La grieta permanece durante d6 días. Espíritus y criaturas del Umbra pueden atravesarla.',
        duration: 'd6 días',
        canBeResisted: true,
        resistanceMechanic: 'Un ritual de sellado (Espíritu 3+, 1 hora de trabajo) puede cerrar la grieta.',
      },
    ],
  },
  {
    level: 8,
    name: 'Caos',
    threshold: 20,
    description: 'La Paradoja ha alcanzado niveles de caos completo. La magia del mago funciona de forma completamente impredecible. El entorno físico inmediato se distorsiona visiblemente.',
    dischargeDice: '8d10',
    dischargeOnSuccess: 'El mago cae en Quietud (Quiet) completa: un estado psicótico disociativo del que solo puede salir mediante trabajo interior profundo.',
    effects: [
      {
        id: 'chaos-quiet',
        name: 'Quietud (Quiet)',
        effectType: 'quiet',
        severity: 'catastrophic',
        description: 'El mago cae en un estado psicótico profundo donde la realidad y la ilusión se funden completamente.',
        mechanical: 'El personaje entra en Quietud: no puede distinguir realidad de visiones paradójicas. Todas las tiradas sociales y de Percepción tienen dificultad 9. La magia que intenta lanzar tiene 50% de ir en la dirección opuesta a la deseada. Sale de la Quietud mediante el Umbral (una experiencia narrativa profunda que el Narrador orquesta, típicamente 1 sesión completa).',
        duration: 'hasta resolución del Umbral interior',
        canBeResisted: true,
        resistanceMechanic: 'Voluntad dif. 9 para mantener la cordura suficiente para actuar. No evita la Quietud, solo la hace manejable.',
      },
      {
        id: 'chaos-agravado-mayor',
        name: 'Descarga Catastrófica',
        effectType: 'backlash',
        severity: 'catastrophic',
        description: 'Un retroceso masivo de energía paradójica puede matar al mago.',
        mechanical: '2d10 niveles de daño agravado. Sin posibilidad de soak.',
        duration: 'permanente hasta curación',
        canBeResisted: false,
      },
    ],
  },
  {
    level: 9,
    name: 'Vórtice',
    threshold: 25,
    description: 'El mago se ha convertido en un vórtice de Paradoja. Su presencia distorsiona la realidad en un radio de metros. Otros magos en la zona sufren interferencia en su propia magia.',
    dischargeDice: '9d10',
    dischargeOnSuccess: 'El mago es parcialmente "consumido" por la Paradoja: una parte de él queda atrapada en una bolsa de realidad paradójica y debe ser "recuperada" mediante una misión al Umbra.',
    effects: [
      {
        id: 'vortex-realm-pocket',
        name: 'Bolsillo de Realidad',
        effectType: 'realm-rip',
        severity: 'catastrophic',
        description: 'La Paradoja crea una "burbuja" de realidad alternativa centrada en el mago que afecta a todo a su alrededor.',
        mechanical: 'Área de (Puntos de Paradoja × 2) metros. Dentro del área: las leyes físicas funcionan de forma levemente errónea (gravedad variable, tiempo percibido distorsionado, colores alterados). Todos en el área sufren -2 dados en tiradas que dependan de la física convencional. Dura d10 días.',
        duration: 'd10 días',
        canBeResisted: false,
      },
      {
        id: 'vortex-soul-fragment',
        name: 'Fragmentación Anímica',
        effectType: 'unraveling',
        severity: 'catastrophic',
        description: 'Una parte del alma del mago queda atrapada en el tejido de la Paradoja.',
        mechanical: 'El mago pierde permanentemente 1 punto de Voluntad y 1 punto de Arete hasta recuperar el fragmento. El fragmento puede ser recuperado mediante una misión al Umbra (requiere al menos 1 sesión de juego completa).',
        duration: 'permanente hasta recuperación',
        canBeResisted: false,
      },
    ],
  },
  {
    level: 10,
    name: 'Disolución',
    threshold: 30,
    description: 'El límite final. La Paradoja acumulada es tan masiva que amenaza con disolverse en la realidad, llevándose al mago consigo. En este punto, el Narrador debe considerar seriamente si el personaje puede sobrevivir.',
    dischargeDice: '10d10',
    dischargeOnSuccess: 'Disincorporación: el mago es expulsado de la realidad consensuada y queda atrapado en el Umbra indefinidamente, o muere según la naturaleza del efecto.',
    effects: [
      {
        id: 'dissolution-death',
        name: 'Disolución',
        effectType: 'unraveling',
        severity: 'catastrophic',
        description: 'La Paradoja devora al mago desde dentro, desintegrando su conexión con la realidad.',
        mechanical: 'El personaje muere mágicamente: su cuerpo queda intacto pero su esencia se dispersa en el tejido de la Paradoja. Puede ser recuperado por otros magos con Espíritu 5 y un ritual mayor (misión de campaña completa, al menos 3 sesiones). Sin recuperación: muerte permanente.',
        duration: 'permanente',
        canBeResisted: true,
        resistanceMechanic: 'Voluntad dif. 10: con éxitos, el mago queda incapacitado pero vivo durante 1 hora, tiempo en el que otros pueden actuar para salvarlo.',
      },
      {
        id: 'dissolution-ascension-paradox',
        name: 'Trascendencia Paradójica',
        effectType: 'unraveling',
        severity: 'catastrophic',
        description: 'Raramente, un mago en nivel 10 de Paradoja puede experimentar una "Ascensión Paradójica": la Paradoja le transforma en algo diferente en lugar de destruirle.',
        mechanical: 'Solo si el mago tiene Arete 9 o superior Y supera una tirada de Voluntad dif. 10 con 3+ éxitos: en lugar de morir, el mago es transformado radicalmente. Su paradigma se invierte o expande de forma que el Narrador determine. Nuevo tipo de ser (puede incluir: Arconte caído, entidad Primordial, Marauder poderoso, u otro). Efectivamente un nuevo personaje.',
        duration: 'permanente — transformación definitiva',
        canBeResisted: false,
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TABLA RESUMEN DE PARADOJA
// ─────────────────────────────────────────────────────────────────────────────

export interface ParadoxSummaryRow {
  level: number
  name: string
  threshold: string
  primaryEffect: string
  dischargeDice: string
}

export const PARADOX_SUMMARY_TABLE: ParadoxSummaryRow[] = PARADOX_LEVELS.map(lvl => ({
  level: lvl.level,
  name: lvl.name,
  threshold: `${lvl.threshold} puntos`,
  primaryEffect: lvl.effects[0]?.name ?? '—',
  dischargeDice: lvl.dischargeDice,
}))

// ─────────────────────────────────────────────────────────────────────────────
// ESPÍRITUS DE PARADOJA (Paradox Spirits / Gremlins / Wyrms)
// ─────────────────────────────────────────────────────────────────────────────

export interface ParadoxSpirit {
  id: string
  name: string
  tier: 1 | 2 | 3    // 1 = Gremlin, 2 = Paradox Spirit, 3 = Paradox Wyrm
  minimumParadoxLevel: number
  description: string
  attributes: { physical: number; social: number; mental: number }
  willpower: number
  health: number
  powers: string[]
  weakness: string
}

export const PARADOX_SPIRITS: ParadoxSpirit[] = [
  {
    id: 'gremlin',
    name: 'Gremlin',
    tier: 1,
    minimumParadoxLevel: 3,
    description: 'Los Gremlins son los espíritus de Paradoja más básicos. Son traviesos antes que maliciosos, y su objetivo es sabotear —no destruir. Aparecen como pequeñas criaturas mecánicas, estáticas vivientes o chispas caóticas.',
    attributes: { physical: 2, social: 1, mental: 2 },
    willpower: 4,
    health: 4,
    powers: [
      'Sabotaje: puede hacer fallar cualquier aparato tecnológico (tirada de 3d10 dif. 6)',
      'Interferencia mágica: puede añadir +1 dificultad a la siguiente tirada del mago objetivo',
      'Invisibilidad: los mortales no pueden percibirlo directamente',
    ],
    weakness: 'Los Gremlins se disuelven si el mago realiza una acción genuinamente orden (resolver un problema con lógica mundana en lugar de magia).',
  },
  {
    id: 'paradox-spirit',
    name: 'Espíritu de Paradoja',
    tier: 2,
    minimumParadoxLevel: 5,
    description: 'Los Espíritus de Paradoja propiamente dichos son manifestaciones más poderosas del consenso enojado. Pueden tomar formas variadas: un policía que "siempre estaba allí", una cámara de seguridad, un vecino que insiste en llamar a alguien.',
    attributes: { physical: 3, social: 3, mental: 3 },
    willpower: 6,
    health: 7,
    powers: [
      'Forma de Testigo: puede tomar la forma de cualquier mortal que "podría haber visto" la magia vulgar',
      'Anular Magia: puede intentar cancelar un hechizo activo (Fuerza de Voluntad dif. 7)',
      'Reportar Consenso: puede "informar" al consenso sobre el mago, añadiendo +1 punto de Paradoja automático por escena de presencia',
      'Resistencia: inmune a daño contuso mundano',
    ],
    weakness: 'El Espíritu de Paradoja no puede actuar si el mago pasa 1 hora completa sin lanzar ningún hechizo (ni intención de hacerlo).',
  },
  {
    id: 'paradox-wyrm',
    name: 'Paradox Wyrm',
    tier: 3,
    minimumParadoxLevel: 7,
    description: 'Los Wyrms de Paradoja son predadores del consenso: entidades masivas que buscan activamente devolver al mago al orden. Pueden tomar formas terroríficas o simplemente ser fuerzas invisibles que aplastan.',
    attributes: { physical: 5, social: 4, mental: 4 },
    willpower: 8,
    health: 12,
    powers: [
      'Daño Paradójico: sus ataques causan daño agravado (2d10) que no puede ser soaked',
      'Anulación Masiva: puede cancelar todos los hechizos activos del mago con una tirada de Fuerza de Voluntad dif. 6',
      'Persecución: puede rastrear al mago a través del Umbra y la realidad hasta ser destruido o banished',
      'Terror del Consenso: todos los que lo perciben deben superar Voluntad dif. 8 o huir',
      'Resistencia Sobrenatural: inmune a daño no-agravado',
    ],
    weakness: 'El Paradox Wyrm se debilita si el mago logra que 5+ mortales acepten voluntariamente que el evento sobrenatural que generó la Paradoja "realmente ocurrió" (romper el consenso deliberadamente en dirección opuesta).',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// QUIETUD (Quiet) — El estado psicótico de la Paradoja
// ─────────────────────────────────────────────────────────────────────────────

export interface QuietStage {
  stage: number
  name: string
  description: string
  mechanical: string
  resolution: string
}

export const QUIET_STAGES: QuietStage[] = [
  {
    stage: 1,
    name: 'Susurros',
    description: 'El mago empieza a escuchar voces que no existen o ver cosas que no están. Son sutiles, fáciles de racionalizar.',
    mechanical: '+1 dificultad en tiradas de Percepción. El mago puede actuar normalmente pero tiene dificultad para concentrarse.',
    resolution: 'Una noche de sueño sin magia o una conversación honesta con otro mago que reconozca el problema.',
  },
  {
    stage: 2,
    name: 'Visiones',
    description: 'Las visiones se vuelven intensas y difíciles de distinguir de la realidad. El mago actúa basándose en lo que "ve" aunque no sea real.',
    mechanical: '+2 dificultad en tiradas de Percepción y Autocontrol. El mago puede confundir aliados con enemigos (el Narrador hace tiradas secretas de Percepción). Los hechizos tienen 30% de afectar objetivos incorrectos.',
    resolution: 'Una sesión de trabajo interior con otro practicante (Mente 2+ puede ayudar) o un Umbral breve.',
  },
  {
    stage: 3,
    name: 'Inmersión',
    description: 'La línea entre la realidad y la visión ha colapsado completamente. El mago vive en su propio mundo paradójico.',
    mechanical: 'El mago está efectivamente en el Umbra o en una realidad paralela de su propia creación. No puede interactuar normalmente con el mundo físico sin superar Voluntad dif. 8 cada turno. La magia que lanza afecta a su "realidad" en lugar de la real.',
    resolution: 'Un Umbral completo: una experiencia narrativa profunda que el Narrador diseña específicamente. Típicamente una sesión entera.',
  },
]
