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
]
