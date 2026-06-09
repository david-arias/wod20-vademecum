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
]
