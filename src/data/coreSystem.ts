import type { CoreRule } from '@/types/coreSystem'

export const CORE_RULES: CoreRule[] = [
  {
    id: 'dice-basics',
    module: 'dice-basics',
    eyebrow: 'DADOS & ÉXITOS',
    title: 'Sistema de Dados',
    summary: 'D10 contra dificultad. Cada dado que iguala o supera la dificultad = 1 éxito. Los "1" anulan éxitos.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'World of Darkness usa únicamente dados de 10 caras (d10). Para cada acción, el Narrador establece una Dificultad (generalmente 6) y un Reserva de Dados basada en Atributo + Habilidad relevantes.',
      },
      {
        type: 'table',
        caption: 'Niveles de Éxito',
        headers: ['Éxitos', 'Resultado'],
        rows: [
          ['1', 'Éxito marginal — logrado, pero con complicaciones'],
          ['2–3', 'Éxito estándar — resultado limpio'],
          ['4–5', 'Éxito sólido — impresionante'],
          ['6+', 'Éxito excepcional — perfecto o heroico'],
        ],
      },
      {
        type: 'list',
        title: 'Reglas de los Unos',
        items: [
          'Cada "1" en el dado cancela un éxito obtenido.',
          'Si los "1" cancelan TODOS los éxitos y quedan "1" sin cancelar → PIFIA.',
          'Una Pifia es el peor resultado posible: el personaje falla de la peor manera imaginable.',
          'Un solo éxito sobreviviente, aunque queden "1" sobrantes, es simplemente un éxito (no pifia).',
        ],
      },
    ],
  },

  {
    id: 'multiple-actions',
    module: 'multiple-actions',
    eyebrow: 'ACCIONES MÚLTIPLES',
    title: 'Acciones Múltiples',
    summary: 'Dividir la reserva de dados entre varias acciones. La primera acción pierde 1 dado; cada adicional resta 1 más de todas.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'Un personaje puede realizar múltiples acciones en un turno dividiendo su reserva de dados. Sin embargo, cada acción adicional penaliza todas las acciones del turno.',
      },
      {
        type: 'table',
        caption: 'Penalización por Acciones Múltiples',
        headers: ['Nº de Acciones', 'Dados retirados de CADA reserva'],
        rows: [
          ['1 (normal)', '0 dados retirados'],
          ['2 acciones', '1 dado retirado de cada una'],
          ['3 acciones', '2 dados retirados de cada una'],
          ['4 acciones', '3 dados retirados de cada una'],
        ],
      },
      {
        type: 'list',
        title: 'Excepciones por Juego',
        items: [
          'V20: La Celeridad permite acciones adicionales sin penalización de esta tabla.',
          'W20: La Rabia funciona como acciones adicionales dentro del marco de la Forma activa.',
          'M20: El tiempo mágico (Correspondencia + Tiempo) puede crear "bolsas" de acciones.',
        ],
      },
    ],
  },

  {
    id: 'energy-resources',
    module: 'energy-resources',
    eyebrow: 'RECURSOS DE ENERGÍA',
    title: 'Recursos de Energía por Juego',
    summary: 'Cada juego tiene un recurso de energía distinto. Lo que se puede hacer con él varía según la línea de juego.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'Cada línea de juego del ecosistema 20 Aniversario usa un recurso de energía distinto para alimentar sus poderes sobrenaturales. La siguiente tabla compara qué acciones son posibles con cada recurso.',
      },
      {
        type: 'comparison',
        caption: 'Tabla Comparativa de Recursos de Energía',
        rows: [
          {
            action: 'Recurso principal',
            v20: 'Sangre (Vitae)',
            w20: 'Gnosis + Rabia',
            m20: 'Quintaesencia',
            c20: 'Glamour',
            wr20: 'Pathos',
          },
          {
            action: 'Curar 1 nivel contuso',
            v20: '1 Sangre (acción)',
            w20: '1 Gnosis (escena)',
            m20: 'Vida 1 (efecto mágico)',
            c20: '1 Glamour + Arte',
            wr20: '1 Pathos',
          },
          {
            action: 'Activar poder sobrenatural',
            v20: 'Varía por Disciplina',
            w20: 'Varía por Don',
            m20: 'Reduce Paradoja',
            c20: 'Varía por Arte',
            wr20: 'Varía por Arcano',
          },
          {
            action: 'Aumentar Atributo (temporal)',
            v20: '1 Sangre por pto.',
            w20: '1 Rabia por pto.',
            m20: '1 Quint. (Fuerza)',
            c20: '1 Glamour (Arte)',
            wr20: '1 Pathos',
          },
          {
            action: 'Máximo por turno',
            v20: 'Sangre = Gen. div. 3',
            w20: 'Gnosis ilimitado',
            m20: 'Quintaesencia ilimitado',
            c20: 'Glamour = puntuación',
            wr20: 'Pathos = puntuación',
          },
          {
            action: 'Recarga / Recuperación',
            v20: 'Morder mortales',
            w20: 'Meditación, ritual, Luna',
            m20: 'Nodos, magia, descanso',
            c20: 'Arte mortal, creatividad',
            wr20: 'Emociones de los vivos',
          },
          {
            action: 'Consecuencia de agotamiento',
            v20: 'Hambre, frenesí',
            w20: 'Sin dones activos',
            m20: 'Sin magia activa',
            c20: 'Banalidad aumenta',
            wr20: 'Sombra crece',
          },
        ],
      },
    ],
  },

  {
    id: 'wound-levels',
    module: 'wound-levels',
    eyebrow: 'NIVELES DE HERIDA',
    title: 'Daño y Niveles de Herida',
    summary: 'Tres tipos de daño: Contuso (se recupera fácil), Letal (requiere tiempo) y Agravado (difícil de curar).',
    applicableTo: 'all',
    content: [
      {
        type: 'table',
        caption: 'Niveles de Salud y Penalización',
        headers: ['Estado', 'Penalización a Dados', 'Descripción'],
        rows: [
          ['Sano', 'Ninguna', 'Sin daño'],
          ['Contuso', '-1 dado', 'Golpes, magulladuras'],
          ['Herido', '-1 dado', 'Heridas superficiales'],
          ['Lesionado', '-2 dados', 'Heridas que dificultan'],
          ['Herido Grave', '-2 dados', 'Heridas graves'],
          ['Crítico', '-5 dados', 'Al límite'],
          ['Incapacitado', 'Sin acción', 'No puede actuar'],
        ],
      },
      {
        type: 'list',
        title: 'Tipos de Daño',
        items: [
          'Contuso: puños, caídas. Se recupera a 1 nivel por turno de descanso.',
          'Letal: cuchillos, balas. Requiere días de descanso o atención médica.',
          'Agravado: fuego, luz solar, garras sobrenaturales. Requiere semanas + recursos del juego.',
        ],
      },
    ],
  },

  {
    id: 'extended-actions',
    module: 'extended-actions',
    eyebrow: 'ACCIONES EXTENDIDAS',
    title: 'Acciones Extendidas',
    summary: 'Tirar repetidamente acumulando éxitos hasta alcanzar el umbral. Cada intento fallido puede tener consecuencias.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'Algunas tareas requieren tiempo y esfuerzo sostenido. El personaje tira la reserva de dados repetidamente, acumulando éxitos hasta alcanzar el umbral establecido por el Narrador.',
      },
      {
        type: 'table',
        caption: 'Ejemplos de Umbrales',
        headers: ['Umbral de Éxitos', 'Dificultad de la Tarea'],
        rows: [
          ['5 éxitos',  'Tarea simple: reparar un motor, aprender una canción'],
          ['10 éxitos', 'Tarea moderada: hackear un sistema, traducir un texto'],
          ['15 éxitos', 'Tarea compleja: fabricar un arma, escribir un libro'],
          ['20+ éxitos','Tarea épica: construir un santuario, fundar una organización'],
        ],
      },
    ],
  },

  {
    id: 'combat-initiative',
    module: 'combat-initiative',
    eyebrow: 'COMBATE — INICIATIVA',
    title: 'Iniciativa y Orden de Turno',
    summary: 'Al inicio de cada turno de combate, todos los participantes determinan su orden de acción mediante una tirada de iniciativa.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'Al comienzo de cada turno de combate todos los participantes tiran Destreza + Alerta (dificultad 4). El resultado más el Rasgo de Destreza determina el valor de iniciativa. El combatiente con la iniciativa más alta actúa primero; los empates se resuelven por Destreza (y luego por Astucia si persiste el empate).',
      },
      {
        type: 'table',
        caption: 'Fórmula de Iniciativa',
        headers: ['Elemento', 'Descripción'],
        rows: [
          ['Tirada base', 'Destreza + Alerta vs. dificultad 4'],
          ['Bonificador fijo', '+Destreza (no se tira, se suma al total)'],
          ['Modificadores', 'Heridas, sorpresa, poderes sobrenaturales'],
          ['Empate', 'Mayor Destreza, luego Astucia, luego Narrador decide'],
        ],
      },
      {
        type: 'list',
        title: 'Modificadores de Iniciativa por Juego',
        items: [
          'V20: Celeridad añade acciones adicionales al final del orden, no a la iniciativa base.',
          'W20: Rabia puede usarse para actuar inmediatamente fuera del orden normal, una vez por escena.',
          'M20: Correspondencia + Tiempo puede alterar el orden de iniciativa como efecto mágico.',
          'C20: Gastar 1 Glamour permite actuar primero una vez por combate.',
          'Wr20: Los Wraiths en Forma Espectral tienen iniciativa +2 contra mortales que no los perciban.',
        ],
      },
    ],
  },

  {
    id: 'combat-basics',
    module: 'combat-basics',
    eyebrow: 'COMBATE — MECÁNICAS',
    title: 'Mecánicas de Combate',
    summary: 'Atacar, defender, calcular daño. El combate en WoD es letal: Ataque vs. Defensa, los éxitos netos determinan el daño.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'El combate sigue tres pasos: el atacante tira su reserva de ataque, el defensor tira su reserva de defensa (o esquiva), y los éxitos netos (éxitos ataque – éxitos defensa) determinan el daño infligido.',
      },
      {
        type: 'table',
        caption: 'Reservas de Ataque Comunes',
        headers: ['Tipo de Ataque', 'Reserva de Dados', 'Dificultad'],
        rows: [
          ['Puñetazo / Patada', 'Destreza + Pelea', '6'],
          ['Arma cuerpo a cuerpo', 'Destreza + Melee', '6'],
          ['Arma de fuego', 'Destreza + Armas de Fuego', '6'],
          ['Ataque sobrenatural', 'Varía por poder', 'Varía'],
        ],
      },
      {
        type: 'table',
        caption: 'Tipos de Daño por Fuente',
        headers: ['Fuente', 'Tipo de Daño'],
        rows: [
          ['Puños, caídas', 'Contuso'],
          ['Cuchillos, balas', 'Letal'],
          ['Fuego, luz solar, garras sobrenaturales', 'Agravado'],
          ['Plata (contra Garou)', 'Agravado'],
        ],
      },
      {
        type: 'list',
        title: 'Esquiva y Defensa',
        items: [
          'Esquiva completa: usa toda la reserva para defenderse (Destreza + Atletismo dif. 6); no puede atacar ese turno.',
          'Parar (Melee): Destreza + Melee dif. 6 para bloquear ataques cuerpo a cuerpo.',
          'Los ataques de fuego a distancia solo pueden esquivarse, no pararse.',
        ],
      },
    ],
  },

  {
    id: 'virtues-morality',
    module: 'virtues-morality',
    eyebrow: 'VIRTUDES Y MORALIDAD',
    title: 'Virtudes, Humanidad y Moralidad',
    summary: 'La Humanidad (u equivalente) mide cuánto del ser original queda en el personaje. Bajarla tiene consecuencias mecánicas y narrativas graves.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'Cada juego del ecosistema WoD 20 usa un sistema de moralidad que mide la conexión del personaje con su naturaleza original y sus valores. Perder estos puntos no solo afecta las tiradas: cambia quién es el personaje.',
      },
      {
        type: 'comparison',
        caption: 'Equivalentes de Moralidad por Juego',
        rows: [
          {
            action: 'Rasgo de Moralidad',
            v20: 'Humanidad (o Camino)',
            w20: 'Gnosis + Renombre',
            m20: 'Afinidad / Humanidad',
            c20: 'Glamour vs. Banalidad',
            wr20: 'Pathos vs. Angst',
          },
          {
            action: 'Pérdida de puntos',
            v20: 'Actos que violan la Jerarquía de Pecados',
            w20: 'Fallar a Gaia, perder Renombre',
            m20: 'Paradoja, actos contrarios a la Afinidad',
            c20: 'Banalidad sube por actos mundanos',
            wr20: 'Angst sube, Pathos cae por trauma',
          },
          {
            action: 'Consecuencia a 0',
            v20: 'Bestia permanente (PNJ)',
            w20: 'Harano o muerte espiritual',
            m20: 'Magus perdido (PNJ)',
            c20: 'Changeling olvida su naturaleza feérica',
            wr20: 'Wraith se convierte en Espectro',
          },
        ],
      },
      {
        type: 'list',
        title: 'Recuperación de Moralidad',
        items: [
          'V20: Gastar 5 PX + narrativa justificada (arrepentimiento, actos de redención).',
          'W20: Rituales de purificación, hazañas heroicas en nombre de Gaia.',
          'M20: Meditación, actos de creación o descubrimiento auténtico, resolución de Paradoja.',
          'C20: Exposición a arte y creatividad genuina, aventuras feéricas.',
          'Wr20: Resolver el Lazo que ata al wraith, actos de empatía genuina.',
        ],
      },
    ],
  },

  {
    id: 'experience-advancement',
    module: 'experience-advancement',
    eyebrow: 'EXPERIENCIA Y AVANCE',
    title: 'Puntos de Experiencia y Avance',
    summary: 'Los PX se ganan al final de cada sesión. El coste de mejora varía según el Rasgo y si el personaje lo tiene como primario.',
    applicableTo: 'all',
    content: [
      {
        type: 'table',
        caption: 'Ganancia de PX por Sesión',
        headers: ['Criterio', 'PX'],
        rows: [
          ['Participación en la sesión', '1'],
          ['Aprendizaje / crecimiento personal', '1'],
          ['Logro de objetivo personal', '1'],
          ['Heroísmo o acción extraordinaria', '1'],
          ['Bonus a discreción del Narrador', '0–1'],
        ],
      },
      {
        type: 'table',
        caption: 'Coste de Mejora (Regla Base)',
        headers: ['Rasgo a Mejorar', 'Coste en PX'],
        rows: [
          ['Nuevo Atributo (nivel 1)', '5 PX'],
          ['Atributo existente', 'Nivel actual × 4'],
          ['Nueva Habilidad (nivel 1)', '3 PX'],
          ['Habilidad existente', 'Nivel actual × 2'],
          ['Habilidad de clan/tribu existente', 'Nivel actual'],
          ['Nuevo poder sobrenatural (nivel 1)', '10 PX (fuera de grupo: 15 PX)'],
          ['Poder sobrenatural siguiente nivel', 'Nivel nuevo × 7 (fuera: × 10)'],
          ['Humanidad / Moralidad', '5 PX por punto'],
          ['Fuerza de Voluntad', '1 PX por punto'],
        ],
      },
      {
        type: 'list',
        title: 'Notas por Juego',
        items: [
          'V20: Disciplinas fuera del clan cuestan un 50% más. Dominar Taumaturgia requiere mentor Tremere in-game.',
          'W20: Dones tribales: nivel × 3 PX; no tribales nivel × 5 PX.',
          'M20: Esferas primarias: nivel × 7 PX; no primarias nivel × 8 PX.',
          'C20: Artes del kith: nivel × 3 PX; otros Artes nivel × 4 PX. Reinos siempre nivel × 3 PX.',
          'Wr20: Arcanos del Gremio: nivel × 3 PX; otros nivel × 5 PX.',
        ],
      },
    ],
  },

  {
    id: 'backgrounds',
    module: 'backgrounds',
    eyebrow: 'TRASFONDOS',
    title: 'Trasfondos',
    summary: 'Los Trasfondos representan recursos, conexiones y ventajas externas. Se compran durante la creación o con PX en juego.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'Los Trasfondos son rasgos que representan lo que el personaje tiene o a quién conoce, no lo que es. Cada Trasfondo tiene una puntuación de 1 a 5. Los comunes a todos los juegos incluyen Aliados, Contactos, Recursos, Mentor e Influencia; cada línea añade los propios.',
      },
      {
        type: 'table',
        caption: 'Trasfondos Universales',
        headers: ['Trasfondo', 'Descripción'],
        rows: [
          ['Aliados', 'Personas que ayudarán activamente en situaciones peligrosas (1 = poco fiable; 5 = red leal y poderosa)'],
          ['Contactos', 'Fuentes de información sin compromiso de ayuda activa (1 = 1 contacto; 5 = red diversa de expertos)'],
          ['Recursos', 'Acceso a bienes materiales y riqueza (1 = subsistencia; 5 = riqueza casi ilimitada)'],
          ['Mentor', 'Ser más poderoso que guía al personaje (1 = consejero ocasional; 5 = maestro legendario)'],
          ['Influencia', 'Poder en una esfera de la sociedad humana (1 = local menor; 5 = control de instituciones nacionales)'],
        ],
      },
      {
        type: 'comparison',
        caption: 'Trasfondos Exclusivos por Juego',
        rows: [
          {
            action: 'Trasfondo de linaje/poder',
            v20: 'Generación (linaje vampírico)',
            w20: 'Totem (espíritu guardián)',
            m20: 'Nodo (fuente de Quintaesencia)',
            c20: 'Título (rango feérico)',
            wr20: 'Fetiche (reliquia espectral)',
          },
          {
            action: 'Trasfondo de red social',
            v20: 'Rebaño (fuente de sangre)',
            w20: 'Manada (compañeros Garou)',
            m20: 'Chantry (sede de Tradición)',
            c20: 'Freeholds (territorio feérico)',
            wr20: 'Contacts in Stygia (red umbral)',
          },
        ],
      },
    ],
  },

  // ── NUEVA COREULE: GUÍA DE DIFICULTADES ──────────────────────────────────────
  {
    id: 'difficulty-guide',
    module: 'difficulty-guide',
    eyebrow: 'DIFICULTADES',
    title: 'Guía de Dificultades Base',
    summary: 'La dificultad estándar es 6. El rango efectivo va de 3 (trivial) a 9 (casi imposible). La dificultad 10 solo se usa como penalización adicional.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'La dificultad de una tirada refleja cuán difícil es la tarea en condiciones normales. El Narrador ajusta la dificultad según el contexto: el entorno, la presión, las herramientas disponibles y el estado del personaje. La dificultad nunca puede ser menor de 2 (siempre hay alguna posibilidad de fallo) ni mayor de 10.',
      },
      {
        type: 'table',
        caption: 'Escala de Dificultades',
        headers: ['Dificultad', 'Descripción', 'Ejemplo'],
        rows: [
          ['3', 'Trivial — casi cualquiera lo lograría', 'Escalar una escalera; recordar tu propio nombre'],
          ['4', 'Fácil — un profesional lo haría sin pensar', 'Conducir en autopista tranquila; cocinar un plato básico'],
          ['5', 'Moderada-fácil — requiere atención', 'Negociar un precio justo; escalar una pared baja'],
          ['6', 'Estándar (por defecto)', 'La mayoría de acciones competentes en condiciones normales'],
          ['7', 'Difícil — requiere habilidad y concentración', 'Cirugía de urgencia; hackear un sistema con seguridad media'],
          ['8', 'Muy difícil — solo expertos tienen buenas posibilidades', 'Detectar una trampa muy bien oculta; engañar a un experto en mentiras'],
          ['9', 'Extremo — la élite mundial puede fallar', 'Escalar el Everest sin equipo; engañar a un Methuselah'],
          ['10', 'Solo como penalización adicional', 'Se usa sumando a otras penalizaciones, no como dificultad base'],
        ],
      },
      {
        type: 'list',
        title: 'Modificadores Comunes de Dificultad',
        items: [
          '-1 dificultad: Herramientas superiores, condiciones óptimas, preparación previa, ayuda de especialista',
          '-2 dificultad: Ventaja masiva (más de 10 aliados ayudando, tecnología muy superior)',
          '+1 dificultad: Condiciones adversas, tiempo limitado, distracción activa, herramientas inferiores',
          '+2 dificultad: Condiciones muy adversas, heridas graves, dos desventajas simultáneas',
          '+3 dificultad: Condiciones catastróficas — normalmente el Narrador puede simplemente declarar el fallo',
        ],
      },
    ],
  },

  // ── NUEVA COREULE: ÉXITOS AUTOMÁTICOS ────────────────────────────────────────
  {
    id: 'automatic-successes',
    module: 'automatic-successes',
    eyebrow: 'ESPECIALIZACIÓN',
    title: 'Éxitos Automáticos y Especialización',
    summary: 'Una especialización en una habilidad convierte todos los 10s en 2 éxitos. Los éxitos automáticos se conceden sin tirada cuando la tarea es muy por debajo de la competencia del personaje.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'El sistema World of Darkness tiene dos mecanismos para representar maestría: la Especialización y los Éxitos Automáticos. Ambos reducen la necesidad de tirar dados cuando un personaje es claramente superior a la tarea.',
      },
      {
        type: 'list',
        title: 'Especialización',
        items: [
          'Cada habilidad puede tener una Especialización: un área específica de enfoque (ej. Atletismo: Natación, Armas de Fuego: Pistolas).',
          'Cuando la especialización aplica directamente a la tarea: cada resultado de 10 en los dados cuenta como 2 éxitos en lugar de 1.',
          'Las especializaciones se compran durante la creación de personaje o con PX (normalmente 1 PX).',
          'Un personaje puede tener múltiples especializaciones en una misma habilidad (en diferentes sub-áreas).',
          'En niveles de habilidad 4 y 5, los personajes normalmente ya tienen especializaciones automáticas según la habilidad y el trasfondo del personaje.',
        ],
      },
      {
        type: 'list',
        title: 'Éxitos Automáticos',
        items: [
          'Para tareas rutinarias muy por debajo del nivel de la habilidad del personaje: el Narrador puede conceder 1 éxito automático sin tirada.',
          'Regla estricta (opcional): si el valor de Atributo + Habilidad supera la dificultad en 5 o más puntos, el Narrador puede conceder éxito automático con 1 éxito.',
          'Los éxitos automáticos se usan para fluir narrativamente sin interrumpir la ficción con tiradas innecesarias.',
          'Un personaje con Habilidad 5 (maestría máxima) puede realizar tareas de dificultad 6 o menos automáticamente según el Narrador.',
        ],
      },
      {
        type: 'table',
        caption: 'Cuándo Tirar vs Cuándo No',
        headers: ['Situación', 'Decisión', 'Nota'],
        rows: [
          ['Tarea trivial, sin presión, sin consecuencias por fallo', 'No tirar', 'El Narrador narra el éxito directamente'],
          ['Tarea moderada, el personaje tiene habilidad alta, sin presión', 'Opcional', 'Tirar solo si el fallo sería interesante narrativamente'],
          ['Tarea difícil, o hay consecuencias significativas por fallo', 'Siempre tirar', 'El fallo debe ser posible para que la tirada sea significativa'],
          ['Combate, magia activa, acciones opuestas', 'Siempre tirar', 'La oposición hace que el fallo siempre sea posible'],
        ],
      },
    ],
  },

  // ── NUEVA COREULE: DAÑO AGRAVADO ─────────────────────────────────────────────
  {
    id: 'aggravated-damage',
    module: 'aggravated-damage',
    eyebrow: 'DAÑO AGRAVADO',
    title: 'Daño Agravado: Heridas que No Cierran',
    summary: 'El daño agravado es el más severo del sistema WoD: no puede ser curado por medios sobrenaturales normales y tarda mucho más en sanar. Cada tipo de criatura tiene sus propias fuentes de daño agravado.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'El daño agravado representa heridas que afectan la esencia misma de la criatura sobrenatural, no solo su cuerpo físico. Para un vampiro, el fuego y la luz solar dañan su naturaleza muerta; para un Garou, la plata disrumpe su vínculo con Gaia. El daño agravado se registra con una cruz (✖) en la hoja de personaje, separado del daño letal (/) y contuso (X).',
      },
      {
        type: 'table',
        caption: 'Tipos de Daño por Sistema',
        headers: ['Tipo de Daño', 'V20 (Vampiro)', 'W20 (Garou)', 'M20 (Mago)', 'C20 (Changeling)', 'Wr20 (Wraith)'],
        rows: [
          ['Fuentes de daño agravado', 'Fuego, luz solar, garras de Garou', 'Plata, Gnosis canalizada como daño', 'Paradoja grave, armas especialmente forjadas', 'Hierro frío, Banalidad', 'Oblivion, ataques de Espectros'],
          ['Puede ser soakeado con', 'Fortitud (solo fuego; no luz solar)', 'Resistencia + rollo de soak normal', 'Solo con poderes específicos', 'Solo con Glamour activo en circunstancias especiales', 'Arcano: Patetismo en algunos casos'],
          ['Curación natural (inactivo)', '5 días por nivel', '3 días por nivel', '3 días por nivel', '2 días por nivel', 'No aplica (cuerpo espectral)'],
          ['Curación sobrenatural', 'No puede curarse con sangre', 'No puede curarse con Gnosis directamente', 'No puede curarse con Quintaesencia', 'Requiere Glamour especial de Nodo', 'Requiere Patetismo 4+'],
        ],
      },
      {
        type: 'list',
        title: 'Reglas Universales del Daño Agravado',
        items: [
          'El daño agravado siempre se coloca a la derecha de las casillas de herida, desplazando daño letal y contuso hacia la izquierda.',
          'Si un nivel de daño ya ocupado por daño contuso recibe daño agravado, el contuso se convierte en letal primero.',
          'Si un nivel de daño ya ocupado por daño letal recibe daño agravado, el letal simplemente se convierte en agravado.',
          'La muerte (o incapacitación en criaturas sobrenaturales) ocurre igual que con otros tipos de daño cuando todas las casillas están ocupadas.',
          'El daño agravado NO puede ser convertido en daño de menor grado por poderes sobrenaturales que "reducen" el daño recibido —esos poderes lo evitan o lo absorben, no lo convierten.',
        ],
      },
    ],
  },

  // ── NUEVA COREULE: RASGOS DE VIRTUD ──────────────────────────────────────────
  {
    id: 'virtue-traits',
    module: 'virtue-traits',
    eyebrow: 'VIRTUDES',
    title: 'Rasgos de Virtud: Consciencia, Autocontrol y Valor',
    summary: 'Las Virtudes representan la fortaleza moral y emocional del personaje. Se usan para resistir impulsos destructivos, el miedo y la pérdida de humanidad.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'Las Virtudes son rasgos que van de 1 a 5 y representan la estabilidad interior del personaje. Aunque sus nombres y aplicaciones varían ligeramente entre los juegos del Mundo de Oscuridad, su función es universal: actuar como ancla cuando el personaje está en riesgo de perder el control de sí mismo.',
      },
      {
        type: 'table',
        caption: 'Las Tres Virtudes por Sistema',
        headers: ['Virtud', 'V20', 'W20', 'M20', 'C20', 'Wr20'],
        rows: [
          ['Consciencia / Conciencia moral', 'Consciencia (Conscience) — resistir actos contrarios a la Humanidad', 'Honor (Honor) — actuar según el código tribal', 'Consciencia — resistir la corrupción de la Sombra', 'Glamour / ética feérica', 'Consciencia — resistir la Oblivion'],
          ['Autocontrol', 'Autocontrol (Self-Control) — resistir el frenesí vampírico', 'Autocontrol (Gnosis roll) — resistir la rabia animal', 'Autocontrol — resistir la compulsión a lanzar magia vulgar', 'Autocontrol — resistir impulsos Quiméricos', 'Autocontrol — resistir las Pasiones Oscuras'],
          ['Valor / Coraje', 'Valor (Courage) — actuar contra el miedo a la muerte o el daño', 'Gloria (Glory) — afrontar desafíos directos sin retroceder', 'Valor — afrontar lo desconocido y lo sobrenatural', 'Valor — afrontar lo Banal y lo aterrador', 'Valor — afrontar la Oblivion sin sucumbir'],
        ],
      },
      {
        type: 'list',
        title: 'Usos Comunes de las Virtudes',
        items: [
          'Consciencia: tirada cuando el personaje comete un acto contrario a su moral (mata inocentes, traiciona a aliados, toma decisiones crueles). Fallo = pérdida de puntuación en la virtud o en la escala de moralidad (Humanidad, Sendas, etc.).',
          'Autocontrol: tirada cuando el personaje está en riesgo de ceder a su naturaleza instintiva más oscura (frenesí vampírico, Catarsis del Wraith, rabia del Garou). Fallo = el personaje pierde el control momentáneamente.',
          'Valor: tirada cuando el personaje enfrenta algo que genera miedo real y debe actuar a pesar de él. Fallo = el personaje no puede actuar en esa dirección durante esa escena.',
          'Las tiradas de Virtud son siempre dificultad variable (5–9) según la gravedad de la situación.',
          'Perder puntos en Virtudes puede reducir también la puntuación de la escala moral asociada (Humanidad, Renombre, etc.). El Narrador determina cuándo aplica.',
        ],
      },
    ],
  },

  // ── NUEVA COREULE: RESONANCIA ─────────────────────────────────────────────────
  {
    id: 'resonance',
    module: 'resonance',
    eyebrow: 'RESONANCIA',
    title: 'Resonancia: La Huella del Poder Sobrenatural',
    summary: 'La magia, los poderes sobrenaturales y las entidades dejan una "resonancia" —una firma detectible por quienes saben buscarla. La resonancia refleja la naturaleza del poder usado y puede atraer o repeler a otras entidades.',
    applicableTo: 'all',
    content: [
      {
        type: 'text',
        content: 'La Resonancia es el concepto unificador de cómo los poderes sobrenaturales "huelen" para las entidades que pueden detectarlos. No es solo una mecánica de detección —es la afirmación de que la magia y los poderes sobrenaturales tienen carácter, intención e historia, y esas propiedades son detectibles por quienes saben buscarlas. En el Mundo de Oscuridad, nada sobrenatural es completamente invisible para todos.',
      },
      {
        type: 'table',
        caption: 'Resonancia por Sistema',
        headers: ['Sistema', 'Nombre de la Resonancia', 'Quién la detecta', 'Qué revela'],
        rows: [
          ['V20', 'Aura / Resonancia de Sangre', 'Auspex 1+ (Sentir el Aura), otros vampiros', 'Emoción dominante, si es vampiro/ghoul, Generación aproximada'],
          ['W20', 'Firma espiritual / Resonancia de Gnosis', 'Sexto Sentido, espíritus con Percepción', 'Auspicio del Garou, Tribu, actos de Wyrm/Wyld/Weaver recientes'],
          ['M20', 'Resonancia Mágica', 'Auspex M20, otros Magos, espíritus sensibles', 'Tradición/Paradigma, tipo de Esfera usada, si hay Paradoja acumulada'],
          ['C20', 'Glamour residual / Resonancia Quimérica', 'Kenning (percepción feérica), espíritus del Ensueño', 'Kith del lanzador, tipo de Arte, nivel de Banalidad del área'],
          ['Wr20', 'Resonancia de Pathos / Angustia', 'Percepción espiritual, Espectros, Perdonadores', 'Pasiones dominantes del Wraith, nivel de Angustia, si hay Espectros activos'],
        ],
      },
      {
        type: 'list',
        title: 'Principios Universales de la Resonancia',
        items: [
          'La resonancia persiste: los efectos sobrenaturales dejan huella durante horas o días según la potencia del poder (1 hora por nivel de poder aproximadamente).',
          'La resonancia se acumula: lugares donde se usa poder sobrenatural frecuentemente desarrollan una resonancia ambiental que afecta a las tiradas locales.',
          'La resonancia atrae: entidades que resuenan de forma similar se sienten atraídas entre sí (vampiros poderosos atraen ghouls, lugares de Gnosis alta atraen espíritus, Paradoja acumulada atrae espíritus de Paradoja).',
          'La resonancia puede ser enmascarada: algunos poderes (Sigilo de Obfuscate vampírico, magia coincidental, Contratos C20 de nivel alto) ocultan la resonancia específica aunque no puedan eliminarla completamente.',
          'La resonancia tiene historia: un Mago con Correspondencia 3+ puede "leer" la resonancia residual de un lugar para reconstruir qué tipos de poder sobrenatural fueron usados allí recientemente.',
        ],
      },
    ],
  },
]
