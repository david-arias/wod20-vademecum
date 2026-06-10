// ─────────────────────────────────────────────────────────────────────────────
// M20 — FOCOS (Instruments & Foci)
// Un Foco es el instrumento que un Mago usa para canalizar su Voluntad y doblar
// la realidad. Sin su Foco, la tirada de magia tiene dificultad +2 (o +3 según
// el Narrador). Los Focos son a la vez herramientas prácticas y declaraciones
// filosóficas sobre cómo el Mago entiende la Magia.
// ─────────────────────────────────────────────────────────────────────────────

export interface MageFocus {
  id: string
  name: string
  tradition: string            // Nombre de la tradición
  traditionId: string          // ID slug de la tradición en factions/index.ts
  philosophy: string           // ¿Por qué ESTOS focos? La creencia subyacente
  primaryFoci: FocusItem[]     // Focos principales (1 por Esfera al inicio)
  alternativeFoci: FocusItem[] // Focos alternativos que algunos miembros usan
  eschewedFoci?: FocusItem[]   // Focos que esta tradición rechaza filosóficamente
  transcendenceNote: string    // Cómo esta tradición supera los focos (avance del personaje)
}

export interface FocusItem {
  sphere: string               // Esfera a la que aplica ('todas' si es general)
  instrument: string           // El foco en sí (varita, mantra, bisturí, etc.)
  description: string          // Por qué este foco para esta esfera
}

// ─────────────────────────────────────────────────────────────────────────────
// LAS 9 TRADICIONES — FOCOS
// ─────────────────────────────────────────────────────────────────────────────

export const M20_FOCI: MageFocus[] = [

  // ── HERMANDAD AKÁSICA ────────────────────────────────────────────────────────
  {
    id: 'focos-akashic',
    name: 'Focos Akásicos',
    tradition: 'Hermandad Akásica',
    traditionId: 'akashic',
    philosophy: 'La Hermandad cree que la perfección del movimiento y la mente es el acceso a la realidad última. El Registro Akásico —la memoria total del universo— se accede a través del Do (el Camino): la armonía perfecta entre mente, cuerpo y espíritu. Sus focos no son herramientas externas sino expresiones de disciplina interna.',
    primaryFoci: [
      {
        sphere: 'mente',
        instrument: 'Meditación y concentración interna',
        description: 'La Esfera de la Mente es la más natural para los Akásicos. No necesitan instrumentos externos: el silencio, la postura correcta y la respiración controlada son suficientes para acceder al Registro Akásico.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Kata de movimiento preciso',
        description: 'La secuencia de movimientos rituales del Do permite al Akásico comprender que la distancia es ilusión: cada paso es un salto entre puntos del registro cósmico.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Meditación sobre el karma y el ciclo',
        description: 'El tiempo como ciclo kármico se accede mediante contemplación profunda de las propias acciones pasadas y futuras en el Registro Akásico.',
      },
      {
        sphere: 'vida',
        instrument: 'Artes marciales y control corporal',
        description: 'El cuerpo perfeccionado es el templo de la vida. Los Akásicos acceden a la Esfera de Vida mediante el control total de su propio organismo durante el combate o el entrenamiento ritual.',
      },
      {
        sphere: 'materia',
        instrument: 'Calligrafía y escritura ritual',
        description: 'Los textos sagrados del Registro, escritos con precisión absoluta, permiten al Akásico acceder a las estructuras materiales del mundo.',
      },
      {
        sphere: 'fuerza',
        instrument: 'Chi y postura de combate',
        description: 'Las Fuerzas se canalizan a través del flujo interno de Chi, manifestado en técnicas de combate específicas que dirigen energía al mundo externo.',
      },
      {
        sphere: 'entropía',
        instrument: 'Contemplación de la impermanencia',
        description: 'La filosofía budista del no-apego y la impermanencia es el foco para comprender el declive y el cambio entrópico.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Rituales de danza y ofrenda',
        description: 'Los Akásicos se comunican con los espíritus a través de danzas rituales precisas que imitan los movimientos de entidades del Registro.',
      },
      {
        sphere: 'primordial',
        instrument: 'Práctica prolongada del Do',
        description: 'La Esfera más profunda requiere la práctica más sostenida: años de Do perfeccionado culminan en la capacidad de acceder al fuego primordial de la existencia.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Bastón de combate (bō)',
        description: 'Algunos Akásicos de la corriente marcial usan el bō como extensión del cuerpo, integrando todos los focos en el movimiento del arma.',
      },
      {
        sphere: 'todas',
        instrument: 'Mantra vocal',
        description: 'Ciertas escuelas Akásicas usan mantras específicos para cada Esfera, recitados en sánscrito o chino clásico.',
      },
    ],
    eschewedFoci: [
      {
        sphere: 'todas',
        instrument: 'Tecnología electrónica o digital',
        description: 'Los Akásicos rechazan la tecnología como foco: consideran que las máquinas interponen distancia entre el Mago y el Registro, debilitando la conexión directa.',
      },
    ],
    transcendenceNote: 'Los Akásicos avanzados aprenden que el Do mismo es el foco —y eventualmente que ni siquiera el Do es necesario, solo la Voluntad pura. Un Akásico que ha trascendido los focos actúa desde el silencio completo del Registro.',
  },

  // ── VERBENA ──────────────────────────────────────────────────────────────────
  {
    id: 'focos-verbena',
    name: 'Focos Verbena',
    tradition: 'Verbena',
    traditionId: 'verbena',
    philosophy: 'La Verbena cree que la magia fluye de la tierra, la sangre y el ciclo de las estaciones. Sus focos son orgánicos, vivientes o derivados de la vida: hierbas, sangre, el fuego de hoguera, el cuerpo desnudo bajo la luna. La Vida es el lenguaje universal, y la Verbena lo habla con cada parte de su ser.',
    primaryFoci: [
      {
        sphere: 'vida',
        instrument: 'Hierbas y plantas sagradas',
        description: 'El conocimiento profundo de la herboristería permite a la Verbena acceder directamente a la Esfera de Vida: cada planta es una ventana a los patrones que sostienen la existencia orgánica.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Rituales de círculo y hoguera',
        description: 'El círculo mágico alrededor de una hoguera crea un espacio entre mundos donde los espíritus pueden ser convocados y dialogados.',
      },
      {
        sphere: 'materia',
        instrument: 'Trabajo con arcilla, madera o piedra natural',
        description: 'La materia se trabaja con las manos, sin instrumentos metálicos cuando es posible. Esculpir o trabajar materiales naturales crea conexión directa con sus patrones.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Calendario lunar y observación de ciclos',
        description: 'El seguimiento riguroso de los ciclos lunares y estacionales permite a la Verbena moverse a través del tiempo con la misma naturalidad que la luna crece y mengua.',
      },
      {
        sphere: 'entropía',
        instrument: 'Sangre y sacrificio ritual',
        description: 'La entropía se comprende a través del sacrificio consciente: la sangre derramada en un ritual refleja la inevitabilidad de la muerte y el cambio en todos los seres vivos.',
      },
      {
        sphere: 'mente',
        instrument: 'Trance inducido por tambores o danza',
        description: 'Los estados alterados de conciencia inducidos por el ritmo o la danza extática abren la mente a realidades más profundas.',
      },
      {
        sphere: 'fuerza',
        instrument: 'Invocación vocal y tormenta',
        description: 'Las fuerzas naturales —viento, rayo, lluvia— se invocan mediante cantos y danzas al aire libre que imitan y amplifican sus patrones.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Creación de vínculos simpáticos (cabello, sangre, objetos)',
        description: 'La magia simpática tradicional —el "lo semejante afecta a lo semejante"— es el foco de Correspondencia para la Verbena.',
      },
      {
        sphere: 'primordial',
        instrument: 'Comunión directa con la Diosa / Dios Cornudo',
        description: 'La Esfera suprema se accede mediante rituales de posesión consentida o comunión mística con las deidades de la tradición.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Athame (daga ritual de doble filo)',
        description: 'Muchos practicantes Verbena usan el athame como foco general: representa la voluntad masculina que penetra el velo de la realidad.',
      },
      {
        sphere: 'todas',
        instrument: 'Caldero ritual',
        description: 'El caldero como símbolo de transformación y creación puede ser foco general para tradicionistas con influencia celta o nórdica.',
      },
    ],
    transcendenceNote: 'La Verbena que ha trascendido los focos comprende que el cuerpo mismo es el foco: el flujo de sangre, el latido del corazón, la respiración son suficientes para acceder a cualquier Esfera. Se convierte en ritual viviente.',
  },

  // ── ORDEN HERMÉTICA ──────────────────────────────────────────────────────────
  {
    id: 'focos-hermetic',
    name: 'Focos Herméticos',
    tradition: 'Orden de Hermes',
    traditionId: 'hermetic',
    philosophy: 'La Orden de Hermes cree que la magia es una ciencia precisa y codificable. El universo es un sistema matemático de correspondencias, y los focos herméticos son los instrumentos que demuestran esas correspondencias. Un mago hermético sin sus herramientas es como un cirujano sin bisturí: técnicamente capaz, pero innecesariamente limitado.',
    primaryFoci: [
      {
        sphere: 'fuerza',
        instrument: 'Varita (wand) o báculo rituales',
        description: 'La varita dirige la Voluntad como un conductor dirige la electricidad. Para las Fuerzas, canaliza y amplifica la energía hacia el mundo físico.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Pentáculo y círculo mágico grabado',
        description: 'El pentáculo con sus correspondencias astrológicas grabadas permite al hermético mapear el espacio y proyectar su influencia a distancia.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Sello y nombre verdadero del espíritu',
        description: 'Los herméticos invocan espíritus mediante sus sellos (las firmas geométricas que los definen) y sus nombres verdaderos, compelidos por la lógica de correspondencias.',
      },
      {
        sphere: 'materia',
        instrument: 'Tabla de correspondencias y materiales puros',
        description: 'La tabla herméticas de asociaciones (saturno = plomo = tierra = negro) permite trabajar materia con precisión matemática usando los materiales correctos.',
      },
      {
        sphere: 'mente',
        instrument: 'Libro de invocaciones y mantras en latín/griego',
        description: 'Las fórmulas precisas en lenguas sagradas estructuran la mente del hermético para acceder a estados de conciencia específicos.',
      },
      {
        sphere: 'entropía',
        instrument: 'Escudo y espada de banishing (destierro)',
        description: 'La entropía se controla mediante rituales precisos de banishing que "deshacen" patrones —simbolizados por el escudo que anula y la espada que corta.',
      },
      {
        sphere: 'vida',
        instrument: 'Copa (cáliz) y elixires alquímicos',
        description: 'La copa contiene el elixir —combinación precisa de ingredientes según la tabla alquímica— que sirve de foco para los patrones de la vida.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Instrumentos astronómicos y efemérides',
        description: 'El tiempo se domina mediante la astrología hermética: conocer la posición exacta de los planetas en el momento correcto es la llave del tiempo.',
      },
      {
        sphere: 'primordial',
        instrument: 'Nombre Verdadero del Mago (voz y glifo)',
        description: 'El Nombre Verdadero es la identidad más profunda del hermético: pronunciarlo con plena comprensión accede al núcleo de toda creación.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Grimorio personal (libro de hechizos)',
        description: 'El grimorio contiene las fórmulas del mago: es a la vez diario espiritual, manual técnico y extensión de su Voluntad codificada.',
      },
      {
        sphere: 'todas',
        instrument: 'Espada/daga de ceremonia (athame)',
        description: 'La espada ceremonial representa la Voluntad que separa el caos del orden. Puede ser foco general para trabajos de destierro y afirmación.',
      },
    ],
    transcendenceNote: 'El hermético que ha trascendido los focos ha internalizado el sistema de correspondencias completo. Para él, cada objeto cotidiano contiene sus correspondencias simbólicas: una moneda de metal puede ser a la vez varita, pentáculo y tabla alquímica.',
  },

  // ── CELESTIAL CHORUS ────────────────────────────────────────────────────────
  {
    id: 'focos-chorus',
    name: 'Focos del Coro Celestial',
    tradition: 'Coro Celestial',
    traditionId: 'chorus',
    philosophy: 'Para el Coro, toda magia es oración —el flujo de Voluntad divina a través del recipiente humano. Sus focos son siempre actos de devoción: la voz que alaba, el incienso que asciende, la luz de la vela que ilumina. El Mago del Coro no "hace" magia: la recibe y la dirige con fe.',
    primaryFoci: [
      {
        sphere: 'fuerza',
        instrument: 'Oración cantada (canto gregoriano o equivalente)',
        description: 'El canto sagrado convoca las fuerzas del mundo como expresión de la voluntad divina. La voz elevada en alabanza es el canal de las energías.',
      },
      {
        sphere: 'vida',
        instrument: 'Imposición de manos y agua bendita',
        description: 'La sanación es el don más natural del Coro. Las manos, bendecidas y orantes, canalizan la gracia divina hacia la vida.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Incienso, reliquias y nombre sagrado',
        description: 'Los espíritus son ángeles, santos o manifestaciones divinas para el Coro. Se invocan con incienso, reliquias y el nombre sagrado de la tradición específica.',
      },
      {
        sphere: 'mente',
        instrument: 'Escritura sagrada, lectura y meditación',
        description: 'La meditación profunda sobre textos sagrados (Biblia, Corán, Upanishads) abre la mente a influencias divinas.',
      },
      {
        sphere: 'entropía',
        instrument: 'Ritual de exorcismo y bendición',
        description: 'La entropía como fuerza que puede corromper o purificar se maneja a través de rituales específicos de exorcismo o consagración.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Oración con intención en nombre de otro',
        description: 'La intercesión —orar por alguien ausente— es el foco de Correspondencia del Coro: la fe crea el vínculo que la distancia no puede romper.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Profecía, revelación y el Libro',
        description: 'Las profecías registradas en los textos sagrados son ventanas al tiempo. El Coro accede al tiempo a través de la revelación y la interpretación inspirada.',
      },
      {
        sphere: 'materia',
        instrument: 'Consagración y bendición de objetos',
        description: 'La materia se transforma a través de la consagración ritual: el agua común se convierte en agua bendita, el pan en sacramento.',
      },
      {
        sphere: 'primordial',
        instrument: 'Comunión mística directa con la Divinidad',
        description: 'La Esfera suprema se accede en momentos de gracia mística —arrobamiento, visión, éxtasis espiritual— en los que el Mago se disuelve en la Voluntad divina.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Cruz, estrella de David, media luna u otros símbolos sagrados',
        description: 'Los símbolos de la fe de cada corriente interna del Coro sirven como focos generales cuando se portan con genuina devoción.',
      },
      {
        sphere: 'todas',
        instrument: 'Velas encendidas en patrón ritual',
        description: 'La luz como símbolo de lo divino: un patrón de velas puede ser el foco central para cualquier trabajo del Coro.',
      },
    ],
    transcendenceNote: 'El Cantor que trasciende los focos comprende que la fe pura —sin palabras, sin objetos, sin actos— es suficiente. Su magia se vuelve oración permanente: cada respiración es un acto de fe que dobla la realidad.',
  },

  // ── CUENTASUEÑOS (DREAMSPEAKERS) ─────────────────────────────────────────────
  {
    id: 'focos-dreamspeakers',
    name: 'Focos Cuentasueños',
    tradition: 'Cuentasueños',
    traditionId: 'dreamspeakers',
    philosophy: 'Los Cuentasueños son los chamanes de la Tradición: mediadores entre el mundo material y el espiritual. Su magia fluye de la relación con los espíritus y la tierra, no de sistemas filosóficos abstractos. Cada foco es un gesto de respeto hacia las fuerzas que ayudan, no un intento de controlarlas.',
    primaryFoci: [
      {
        sphere: 'espíritu',
        instrument: 'Tambor chamánico y canto de invocación',
        description: 'El sonido del tambor es el "latido del corazón del mundo" para los Cuentasueños. El ritmo del tambor abre el camino al mundo espiritual y llama a los espíritus de relación.',
      },
      {
        sphere: 'vida',
        instrument: 'Materiales naturales de animales y plantas sagrados',
        description: 'Plumas, garras, pieles y plantas de poder específicas actúan como focos de Vida, representando el espíritu animal o vegetal que el chamán convoca.',
      },
      {
        sphere: 'mente',
        instrument: 'Pipa sagrada, tabaco u otras plantas de poder',
        description: 'Las plantas de poder (tabaco sagrado, peyote, ayahuasca) son focos para alterar la conciencia y acceder a estados donde la mente puede moverse libremente.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Narrativa y cantos de los ancestros',
        description: 'El tiempo es un río de historias para los Cuentasueños. Los cantos que narran los hechos de los ancestros son la llave que abre las puertas del pasado y el futuro.',
      },
      {
        sphere: 'fuerza',
        instrument: 'Danza ritual y movimientos de animales-poder',
        description: 'Las danzas que imitan a los animales de poder —el vuelo del águila, la carga del búfalo— convocan y dirigen las fuerzas naturales.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Objetos vinculados (cabello, tierra del lugar, agua del río)',
        description: 'Los objetos tomados de un lugar o persona crean el vínculo simpático que los Cuentasueños usan para acceder a lugares distantes.',
      },
      {
        sphere: 'entropía',
        instrument: 'Huesos y cráneo de animales',
        description: 'Los huesos representan lo que queda después de la muerte —la estructura permanente bajo lo efímero. Son el foco natural de la entropía y el cambio inevitable.',
      },
      {
        sphere: 'materia',
        instrument: 'Trabajo con arcilla, piedra y materiales de la tierra',
        description: 'La materia se trabaja con respeto hacia los espíritus que habitan en ella. Esculpir o moldear con intención reverente accede a los patrones materiales del mundo.',
      },
      {
        sphere: 'primordial',
        instrument: 'Fusión completa con el espíritu guía',
        description: 'La Esfera más profunda se accede en un estado de posesión consentida o fusión mística con el espíritu guía principal del chamán.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Bastón del chamán',
        description: 'El bastón decorado con plumas, huesos y cuero es el símbolo de la autoridad chamánica y puede actuar como foco general.',
      },
      {
        sphere: 'todas',
        instrument: 'Sudadera o estufa de sudar (inipi)',
        description: 'Para los Cuentasueños de tradición lakota, el inipi (ceremonia del sudor) puede ser foco de cualquier trabajo espiritual importante.',
      },
    ],
    transcendenceNote: 'El Cuentasueños que trasciende los focos ha establecido relaciones tan profundas con los espíritus que ya no necesita instrumentos: los espíritus responden a la Voluntad pura del chamán como extensiones de su propio ser.',
  },

  // ── EUTANATOS ────────────────────────────────────────────────────────────────
  {
    id: 'focos-euthanatos',
    name: 'Focos Eutanatos',
    tradition: 'Eutanatos',
    traditionId: 'euthanatos',
    philosophy: 'Los Eutanatos son los magos de la muerte limpia —los que cortan los hilos kármicos enredados y liberan a las almas estancadas. Sus focos giran en torno a la muerte, el cambio y la transformación. Para ellos, la muerte no es el fin sino la vuelta de página más importante del karma.',
    primaryFoci: [
      {
        sphere: 'entropía',
        instrument: 'Calavera ritual y veneración de la muerte',
        description: 'La calavera es el símbolo más directo de la entropía: aquello que permanece cuando todo lo demás se desvanece. Los Eutanatos la veneran como maestra.',
      },
      {
        sphere: 'vida',
        instrument: 'Venenos, herbología oscura e instrumentos de muerte',
        description: 'Conocer los patrones de vida en su aspecto más vulnerable permite también cambiarlos. Los Eutanatos entienden la vida mejor que nadie precisamente porque conocen su fin.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Rituales de psicopompo y guía de almas',
        description: 'Los Eutanatos se especializan en guiar almas: sus focos son los instrumentos del paso entre mundos —el cuchillo que corta los lazos, el cantor que guía al otro lado.',
      },
      {
        sphere: 'mente',
        instrument: 'Contemplación de la propia muerte',
        description: 'La meditación regular sobre la propia impermanencia es el foco mental de los Eutanatos. "Memento mori" como práctica constante.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Lectura del karma pasado y futuro',
        description: 'Los Eutanatos son lectores del karma —pueden ver los hilos kármicos que vinculan pasado y futuro— usando sistemas de adivinación propios de su línea.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Sangre del objetivo o vínculo kármico',
        description: 'El vínculo kármico o de sangre es la forma más directa de conexión a distancia para los Eutanatos.',
      },
      {
        sphere: 'materia',
        instrument: 'Armas consagradas a la muerte y venenos puros',
        description: 'Las armas consagradas y los venenos son focos de Materia: representan la capacidad de la materia para transformar la vida en muerte.',
      },
      {
        sphere: 'fuerza',
        instrument: 'Invocación de Kali, Hécate o Anubis',
        description: 'Las deidades de la muerte y la transformación son invocadas como amplificadores de las fuerzas que el Eutanatos necesita liberar.',
      },
      {
        sphere: 'primordial',
        instrument: 'El Gran Ciclo de nacimiento-muerte-renacimiento',
        description: 'La comprensión absoluta del ciclo kármico completo —nacimiento, vida, muerte, renacimiento— es el acceso a la Esfera última.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Dakini (daga ritual de media luna)',
        description: 'La dakini, daga de hoja curva de origen hindú, es el foco general más común entre los Eutanatos de influencia india.',
      },
      {
        sphere: 'todas',
        instrument: 'Mala (rosario de 108 cuentas, algunas de hueso)',
        description: 'El mala usado en meditaciones de muerte puede actuar como foco general para los practicantes de influencia budista.',
      },
    ],
    transcendenceNote: 'El Eutanatos que trasciende los focos ha aceptado completamente su propia muerte —no como posibilidad futura sino como realidad presente. Vive en permanente "estado de muerte consciente" y su magia fluye de esa aceptación sin resistencia.',
  },

  // ── VIRTUALISTAS (VIRTUAL ADEPTS) ────────────────────────────────────────────
  {
    id: 'focos-virtual-adepts',
    name: 'Focos Virtualistas',
    tradition: 'Virtualistas',
    traditionId: 'virtual-adepts',
    philosophy: 'Para los Virtualistas, el universo es código ejecutable. La realidad es un sistema de información con errores que pueden ser parcheados. Sus focos son tecnológicos porque la tecnología es el lenguaje con que el universo puede ser reprogramado en el contexto moderno. Un virtualista sin su laptop es como un hermético sin su grimorio: limitado, no inútil.',
    primaryFoci: [
      {
        sphere: 'correspondencia',
        instrument: 'Red, internet, VPN y código de localización',
        description: 'La red es el foco natural de Correspondencia para el virtualista: las conexiones de internet son literalmente lo que describe esta Esfera, y hackearla es manipularla.',
      },
      {
        sphere: 'mente',
        instrument: 'Interfaz neural, código de IA y algoritmos de pensamiento',
        description: 'Los algoritmos que modelan la cognición, las interfaces que amplifican la mente, los sistemas de IA: todos son focos para acceder a la Esfera de la Mente.',
      },
      {
        sphere: 'fuerza',
        instrument: 'Dispositivos de energía y código electromagnético',
        description: 'Los generadores, capacitores, emisores y sistemas electromagnéticos son focos de Fuerza: la tecnología que maneja energía puede canalizarla también mágicamente.',
      },
      {
        sphere: 'materia',
        instrument: 'Impresora 3D, nanobots y código de materialización',
        description: 'La fabricación digital —desde la impresión 3D hasta los nanobots hipotéticos— es el foco de Materia del virtualista que "imprime" o "reprograma" estructuras físicas.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Criptografía temporal y análisis de datos históricos',
        description: 'El tiempo es una dimensión de datos: los virtualistas acceden a él mediante sistemas de análisis predictivo, registros digitales históricos o algoritmos de modelado temporal.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Interfaz con el Umbra digital (la Datasfera)',
        description: 'Los virtualistas descubrieron la Datasfera —la versión digital del Umbra— y acceden al mundo espiritual a través de sus terminales digitales.',
      },
      {
        sphere: 'entropía',
        instrument: 'Código malicioso, virus y algoritmos caóticos',
        description: 'Los virus, exploits y algoritmos caóticos son focos de Entropía: herramientas diseñadas para desestabilizar sistemas y hacer colapsar patrones.',
      },
      {
        sphere: 'vida',
        instrument: 'Código genético, biohacking y nanotecnología',
        description: 'La edición genética, el biohacking y la bioimpresión 3D son focos de Vida que permiten "reprogramar" organismos vivientes.',
      },
      {
        sphere: 'primordial',
        instrument: 'La Fuente del Código (el origen del universo-programa)',
        description: 'Los virtualistas más avanzados buscan el "código fuente del universo": el acceso a la Esfera última es la comprensión de las instrucciones que generaron la realidad.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Gafas de realidad aumentada o casco VR',
        description: 'La interfaz visual que superpone código sobre la realidad física es un foco general para los virtualistas de corriente cyberpunk.',
      },
      {
        sphere: 'todas',
        instrument: 'Smartphone con aplicaciones de magia',
        description: 'Algunos virtualistas han codificado sus rituales como apps: la interfaz táctil es suficientemente personal para actuar como foco.',
      },
    ],
    transcendenceNote: 'El virtualista que trasciende los focos ha comprendido que "la tecnología" era solo una metáfora para la estructura del universo. En ese punto puede acceder directamente al código sin necesidad de dispositivos —su mente es la interfaz.',
  },

  // ── SONS OF ETHER (HIJOS DEL ÉTER) ───────────────────────────────────────────
  {
    id: 'focos-sons-ether',
    name: 'Focos Hijos del Éter',
    tradition: 'Hijos del Éter',
    traditionId: 'sons-of-ether',
    philosophy: 'Los Hijos del Éter son los científicos locos del mundo sobrenatural. Operan con paradigmas científicos que la Tecnocracia abandonó hace décadas —éter luminífero, flogisto, corrientes vitales— pero que para ellos FUNCIONAN, precisamente porque creen en ellos con la fe absoluta que la ciencia estéril ha perdido. Sus focos son sus instrumentos científicos y sus máquinas imposibles.',
    primaryFoci: [
      {
        sphere: 'fuerza',
        instrument: 'Armas de éter y generadores de campo etérico',
        description: 'Los pistolones de éter, rayos de flogisto, cañones de iones etéricos: artefactos que canalizan las fuerzas fundamentales según los principios del éter luminífero.',
      },
      {
        sphere: 'materia',
        instrument: 'Laboratorio y alquimia científica',
        description: 'El laboratorio es el templo del Hijo del Éter. Los alambiques, retortas, centrífugas y espectrómetros (con lecturas que ningún físico convencional comprendería) son sus focos de Materia.',
      },
      {
        sphere: 'vida',
        instrument: 'Aparatos médicos extraños y sueros bioeléctricos',
        description: 'Los equipos médicos modificados que miden "la corriente vital", los sueros eléctricos y las máquinas de rayos bioetéricos son focos de Vida.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Teletransportador etérico o sistema de comunicación dimensional',
        description: 'Los dispositivos que "doblan el espacio etérico" son focos de Correspondencia: máquinas de teletransporte, receptores de señales de dimensiones paralelas.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Máquina del tiempo o analizador de flujo temporal',
        description: 'La máquina del tiempo clásica, el analizador de flujo temporal, el reloj de ondas etéricas: cualquier artefacto que "mida" el tiempo también puede doblarlo.',
      },
      {
        sphere: 'mente',
        instrument: 'Casco de amplificación cerebral etérico',
        description: 'Los cascos y dispositivos de amplificación de ondas cerebrales, construidos con bobinas etéricas y cristales resonadores, son los focos mentales del Hijo del Éter.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Detector etérico de dimensiones y receptor espectral',
        description: 'Los aparatos que "detectan frecuencias dimensionales" o "reciben transmisiones espectrales" son los focos para contactar el mundo espiritual.',
      },
      {
        sphere: 'entropía',
        instrument: 'Analizador de decaimiento y sistemas de caos controlado',
        description: 'Los instrumentos que miden el decaimiento, la entropía termodinámica o los sistemas caóticos son los focos de Entropía del ingeniero etérico.',
      },
      {
        sphere: 'primordial',
        instrument: 'El Gran Unificador Etérico (máquina que conecta todo)',
        description: 'La máquina suprema del Hijo del Éter —el unificador de todas las fuerzas en el éter primordial— es el foco para la Esfera última.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Traje de exploración etérica',
        description: 'El traje completo que regula "las presiones del éter ambiente" puede actuar como foco general para ingenieros etéricos en campo.',
      },
      {
        sphere: 'todas',
        instrument: 'Diario científico y fórmulas',
        description: 'El cuaderno de laboratorio con los cálculos y fórmulas del Hijo del Éter es tan esencial como cualquier instrumento — y puede actuar como foco general.',
      },
    ],
    transcendenceNote: 'El Hijo del Éter que trasciende los focos ha comprendido que la "ciencia" era su camino hacia la verdad, no la verdad misma. Sus máquinas se simplifican hasta desaparecer: la última "máquina" es su propia mente racional, que opera directamente sobre el código de la realidad.',
  },

  // ── CELESTIALES (CELESTIAL CHORUS — ya cubierto arriba) ──────────────────────
  // Ya incluido como 'focos-chorus'

  // ── SYNDICATE (TECNOCRACIA — incluida como convenciones en facciones) ──────────

  // ── DISPARATADOS (HOLLOW ONES) ────────────────────────────────────────────────
  {
    id: 'focos-hollow-ones',
    name: 'Focos Disparatados',
    tradition: 'Disparatados (Hollow Ones)',
    traditionId: 'hollow-ones',
    philosophy: 'Los Disparatados son los outsiders de las Tradiciones: jóvenes magos que no encajan en ningún paradigma formal y han construido el propio a partir de subcultura, arte oscuro y romanticismo morboso. Sus focos son eclécticos, personales y robados de tradiciones que admiran sin pertenecer a ellas. La coherencia interna de su creencia es lo único que importa.',
    primaryFoci: [
      {
        sphere: 'entropía',
        instrument: 'Arte gótico y estética de la muerte (tarot, cráneos, escritura oscura)',
        description: 'Los Disparatados se sienten más cómodos con la entropía que cualquier otra Esfera. Sus focos son la estética de la muerte: naipes de tarot, velas negras, escritura de tinta roja.',
      },
      {
        sphere: 'mente',
        instrument: 'Música alternativa, poesía y escritura automática',
        description: 'La música —especialmente el post-punk, metal o industrial— y la escritura automática son focos mentales que abren canales alterados de conciencia.',
      },
      {
        sphere: 'espíritu',
        instrument: 'Tabla Ouija, velas y objetos de muertos',
        description: 'Los Disparatados usan los métodos más accesibles para contactar espíritus: los mismos que los mortales usan por superstición, pero con fe genuina detrás.',
      },
      {
        sphere: 'vida',
        instrument: 'Tatuajes, piercings y modificaciones corporales rituales',
        description: 'El cuerpo modificado es el foco de vida: cada tatuaje y piercing hecho con intención mágica es una nota grabada en el "código" del organismo.',
      },
      {
        sphere: 'fuerza',
        instrument: 'Música a alto volumen y energía de la actuación en vivo',
        description: 'La energía de un concierto —el sonido como fuerza física, las luces, la intensidad— es el foco más natural de Fuerza para los Disparatados.',
      },
      {
        sphere: 'materia',
        instrument: 'Basura artística, objetos encontrados y arte de reciclaje',
        description: 'Los Disparatados trabajan con lo que encuentran: objetos descartados, encontrados o robados con significado personal son focos de Materia.',
      },
      {
        sphere: 'correspondencia',
        instrument: 'Fotografías, cartas y objetos personales',
        description: 'Los vínculos emocionales —fotos de personas amadas o detestadas, cartas, objetos con historia personal— son los focos de Correspondencia más naturales.',
      },
      {
        sphere: 'tiempo',
        instrument: 'Diarios personales, memorias y reliquias',
        description: 'El tiempo como memoria personal: los diarios, las fotos antiguas y las reliquias familiares son las herramientas con que los Disparatados tocan el pasado y el futuro.',
      },
      {
        sphere: 'primordial',
        instrument: 'La crisis existencial completa y superada',
        description: 'Los Disparatados acceden a la Esfera más profunda a través de experiencias límite —la "noche oscura del alma" superada, la crisis existencial convertida en iluminación.',
      },
    ],
    alternativeFoci: [
      {
        sphere: 'todas',
        instrument: 'Diario personal',
        description: 'El diario es el grimorio del Disparatado: caótico, personal y efectivo precisamente porque refleja su paradigma único.',
      },
      {
        sphere: 'todas',
        instrument: 'Instrumentos musicales',
        description: 'Para los Disparatados músicos, el instrumento (guitarra, teclado, batería) puede ser foco general de toda práctica mágica.',
      },
    ],
    transcendenceNote: 'El Disparatado que trasciende los focos ha encontrado finalmente su propio paradigma coherente. Ya no necesita pedir prestados focos de otras tradiciones: su visión personal del universo es suficientemente sólida para sostener magia directa.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ÍNDICE POR TRADICIÓN
// ─────────────────────────────────────────────────────────────────────────────

export const M20_FOCI_BY_TRADITION: Record<string, MageFocus> =
  M20_FOCI.reduce((acc, foci) => {
    acc[foci.traditionId] = foci
    return acc
  }, {} as Record<string, MageFocus>)

// ─────────────────────────────────────────────────────────────────────────────
// REGLAS DE FOCOS (M20 core)
// ─────────────────────────────────────────────────────────────────────────────

export interface FocusRule {
  id: string
  title: string
  description: string
  mechanical: string
}

export const M20_FOCUS_RULES: FocusRule[] = [
  {
    id: 'without-focus',
    title: 'Sin Foco',
    description: 'Un mago puede intentar lanzar magia sin su foco, pero hacerlo es mucho más difícil.',
    mechanical: 'Sin el foco apropiado para una Esfera, la dificultad de la tirada de magia aumenta en +2 (algunos Narradores aplican +3 para focos principales). Esto no es "magia vulgar" adicional —es simplemente que la Voluntad necesita más esfuerzo para alcanzar el resultado deseado sin el andamio del paradigma.',
  },
  {
    id: 'transcendence',
    title: 'Trascendencia del Foco',
    description: 'Los magos avanzados pueden aprender a operar sin focos en Esferas específicas.',
    mechanical: 'Cuando un personaje alcanza rango 4 o superior en una Esfera, puede intentar trascender el foco para esa Esfera específica. Requiere una escena narrativa de "breakthrough" (avance) y aprobación del Narrador. Un mago que trascende una Esfera no sufre penalización al usarla sin foco. Trascender todas las Esferas es el camino hacia la Iluminación.',
  },
  {
    id: 'losing-focus',
    title: 'Pérdida o Destrucción del Foco',
    description: 'Cuando un mago pierde o ve destruido su foco, sufre consecuencias concretas.',
    mechanical: 'Si el foco es destruido voluntariamente por un enemigo, el mago sufre un "bache paradigmático": dificultad +1 en TODAS las tiradas de magia durante la siguiente semana mientras "recalibra" su paradigma. Crear un nuevo foco equivalente requiere un ritual narrativo (al menos una sesión de juego de "reencuadre" del paradigma).',
  },
  {
    id: 'shared-foci',
    title: 'Focos Compartidos',
    description: 'Los focos son personales, pero miembros de la misma tradición pueden usar focos similares.',
    mechanical: 'Dos magos de la misma tradición pueden usar los focos del otro sin penalización siempre que ambos compartan el paradigma subyacente. Un hermético puede usar el grimorio de otro hermético. Sin embargo, un hermético que intente usar el tambor de un Cuentasueños sufre la penalización de +2 como si operara sin foco, porque el paradigma no es el suyo.',
  },
  {
    id: 'improvised-foci',
    title: 'Focos Improvisados',
    description: 'Un mago puede usar un objeto similar a su foco habitual como sustituto de emergencia.',
    mechanical: 'Un foco improvisado (similar al habitual pero no el específico entrenado) reduce la penalización de +2 por ausencia de foco a +1. Por ejemplo: un hermético que usa un bolígrafo como "varita de emergencia" tiene solo +1 dificultad en vez de +2.',
  },
]
