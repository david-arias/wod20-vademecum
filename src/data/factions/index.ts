import type { FactionsIndex } from '@/types/factions'

// ─────────────────────────────────────────────────────────────────────────────
// V20 — CLANES (13 clanes canónicos)
// ─────────────────────────────────────────────────────────────────────────────
const V20_CLANS = [
  {
    id: 'brujah', name: 'Brujah', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Rebeldes',
    lore: 'Antiguamente filósofos-reyes de la legendaria Cartago, los Brujah son ahora los anarquistas y punks del mundo vampírico. Luchan por causas que siempre pierden con una pasión que el Abismo no ha podido extinguir.',
    nativePowerIds: ['celeridad', 'potencia', 'presencia'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Ira de la Bestia',
      description: 'La pasión de los Brujah se convierte fácilmente en furia incontrolable.',
      mechanical: 'Los Brujah restan 2 de todas las tiradas para resistir el Frenesí (mínimo 1 dado).',
    },
    notableMembers: ['Theo Bell', 'Smiling Jack', 'Patricia of Bollingbroke'],
  },
  {
    id: 'gangrel', name: 'Gangrel', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Salvajes',
    lore: 'Solitarios por naturaleza, los Gangrel son los más bestiales de los vampiros, más cómodos bajo las estrellas que en las intrigas de la Camará. Son los supervivientes definitivos del Mundo de Tinieblas.',
    nativePowerIds: ['animalismo', 'celeridad', 'fortitud'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'La Bestia Emerge',
      description: 'Cada vez que un Gangrel entra en Frenesí, gana un rasgo animal permanente.',
      mechanical: 'Por cada Frenesí, el Narrador añade un rasgo animal (orejas puntiagudas, pelaje, ojos felinos). Cinco rasgos = pérdida de un punto permanente de Humanidad.',
    },
    notableMembers: ['Beckett', 'Ox', 'Xaviar'],
  },
  {
    id: 'malkavian', name: 'Malkaviano', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Lunáticos',
    lore: 'Todos los Malkavianos están malditos con la locura de su fundador. Sin embargo, en su demencia ven verdades que los cuerdos jamás alcanzarán. Son los oráculos y los bufones del Sabbat y la Camará por igual.',
    nativePowerIds: ['auspex', 'dominacion', 'ofuscacion'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'La Maldición de Malkav',
      description: 'Todos los Malkavianos sufren un trastorno mental permanente que no puede curarse con Voluntad ni Humanidad.',
      mechanical: 'El personaje debe elegir un trastorno mental en la creación. Este defecto nunca puede comprarse.',
    },
    notableMembers: ['Anatole', 'Aisling Sturbridge', 'Klaus'],
  },
  {
    id: 'nosferatu', name: 'Nosferatu', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Espías',
    lore: 'Monstruosos en apariencia, los Nosferatu compensan su repulsiva figura con una red de información que rival a la de cualquier agencia de espionaje. Conocen cada secreto de cada ciudad porque nadie mira a los que viven en las alcantarillas.',
    nativePowerIds: ['animalismo', 'ofuscacion', 'potencia'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'La Maldición del Monstruo',
      description: 'El Abrazo desfigura horriblemente a los Nosferatu. Repelen a mortales y vampiros por igual.',
      mechanical: 'Apariencia permanente de 0. No pueden incrementar este Atributo. Todas las interacciones sociales con mortales requieren Ofuscación o tienen penalización automática de -3 dados.',
    },
    notableMembers: ['Calebros', 'Cock Robin', 'Mirembe'],
  },
  {
    id: 'toreador', name: 'Toreador', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Estetas',
    lore: 'Los Toreador son los artistas, los connoisseurs y los seductores de la Camará. Su amor por la belleza puede paralizarlos literalmente, pero nadie maneja mejor las intrigas sociales de la Elísea.',
    nativePowerIds: ['auspex', 'celeridad', 'presencia'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Éxtasis de la Belleza',
      description: 'Ante algo de extraordinaria belleza, los Toreador quedan literalmente paralizados.',
      mechanical: 'Ante arte o belleza excepcional, tira Autocontrol dif. 6. Fallo = el personaje queda en éxtasis (como paralizado) durante (fallos) turnos.',
    },
    notableMembers: ['Annabelle Triabelle', 'Michaela', 'Jan Pieterzoon'],
  },
  {
    id: 'tremere', name: 'Tremere', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Hechiceros',
    lore: 'Jóvenes en términos vampíricos, los Tremere construyeron su lugar entre los clanes a través del poder de la Taumaturgia. Son la facción más organizada y temida de la Camará, con una jerarquía casi militar.',
    nativePowerIds: ['auspex', 'dominacion', 'taumaturgia-sangre'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Sangre Atada',
      description: 'Todos los Tremere están vinculados a la pirámide del clan desde su creación.',
      mechanical: 'En la Iniciación, el nuevo Tremere bebe de la sangre de siete Ancianos del clan simultáneamente, creando un Vínculo de Sangre con el clan. Actos de traición son casi imposibles sin superar este vínculo.',
    },
    notableMembers: ['Karl Schrekt', 'Meerlinda', 'Goratrix'],
  },
  {
    id: 'ventrue', name: 'Ventrue', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Aristócratas',
    lore: 'Los Ventrue son los reyes del mundo vampírico: políticos, magnates y nobles que han gobernado la Camará desde su fundación. Su código de honor es tan férreo como su ambición.',
    nativePowerIds: ['dominacion', 'fortitud', 'presencia'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Paladar Refinado',
      description: 'Los Ventrue solo pueden alimentarse de un tipo muy específico de mortal.',
      mechanical: 'En la creación, elige una categoría muy específica de mortal de quien puede alimentarse (pelirroja, soldados, niños, hombres de negocios). Intentar beber de otro tipo requiere Voluntad dif. 8 o la Sangre es regurgitada.',
    },
    notableMembers: ['Hardestadt', 'Lucinde', 'Lodin'],
  },
  {
    id: 'lasombra', name: 'Lasombra', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Señores de la Oscuridad',
    lore: 'Líderes espirituales y políticos del Sabbat, los Lasombra abrazan la Bestia con orgullo. Su poder sobre las sombras refleja su naturaleza: la oscuridad es su elemento natural y su arma preferida.',
    nativePowerIds: ['dominacion', 'potencia', 'obtenebración'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Sin Reflejo',
      description: 'Los Lasombra no tienen reflejo en ninguna superficie: espejos, agua, cámaras.',
      mechanical: 'No aparecen en espejos, fotografías, cámaras de seguridad ni superficies reflectantes. -1 dado en tiradas de Apariencia cuando esto es relevante.',
    },
    notableMembers: ['Cardinal Polonia', 'Moncada', 'Gratiano de Veronesi'],
  },
  {
    id: 'tzimisce', name: 'Tzimisce', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Diablos Carnales',
    lore: 'Los Tzimisce son los maestros de la carne y el hueso. Sus conocimientos de Vicisitud les permiten remodelar cuerpos como arcilla, creando obras maestras de horror o belleza según su capricho.',
    nativePowerIds: ['animalismo', 'auspex', 'vicisitud'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Arraigo a la Tierra Natal',
      description: 'Los Tzimisce deben dormir sobre al menos dos puñados de tierra de su hogar nativo.',
      mechanical: 'Sin su tierra natal en el lecho de descanso, el Tzimisce pierde 1 punto de todos los Atributos al día. Los atributos se recuperan tras una noche de descanso sobre tierra propia.',
    },
    notableMembers: ['Lugoj', 'Sascha Vykos', 'Lambach Ruthven'],
  },
  {
    id: 'assamita', name: 'Assamita', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Asesinos',
    lore: 'Desde sus fortalezas en Oriente Medio, los Assamitas han servido como asesinos de élite para vampiros de todos los clanes durante milenios. Obedecen un código estricto y buscan la perfección a través de la Sangre de los Ancianos.',
    nativePowerIds: ['celeridad', 'ofuscacion', 'quietud'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Adicción a la Sangre de los Ancianos',
      description: 'Los Assamitas anhelan la Sangre de vampiros de generación más baja.',
      mechanical: 'Cuando consumen la sangre de un vampiro, deben tirar Autocontrol dif. (10 - generación de la víctima) o quedar adictos. La adicción los obliga a buscar esa sangre como si fuera una obsesión compulsiva.',
    },
    notableMembers: ['Al-Ashrad', 'Thetmes', 'Ur-Shulgi'],
  },
  {
    id: 'giovanni', name: 'Giovanni', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Necromantes',
    lore: 'Una familia de banqueros venecianos que secuestró el linaje de un Antediluviano y se convirtió en uno de los clanes más ricos y temidos. Su poder sobre los muertos es inigualable.',
    nativePowerIds: ['dominacion', 'potencia', 'nigromancia-sepulcro'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'El Abrazo Doloroso',
      description: 'El Abrazo de un Giovanni causa dolor insoportable, y alimentarse de ellos también.',
      mechanical: 'Cuando un Giovanni se alimenta de un mortal, este sufre el doble de daño por el Abrazo. Los mortales alimentados por Giovanni rara vez sobreviven y casi siempre tienen cicatrices permanentes.',
    },
    notableMembers: ['Augustus Giovanni', 'Isabel Giovanni', 'Claudius Giovanni'],
  },
  {
    id: 'ravnos', name: 'Ravnos', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Nómadas',
    lore: 'Viajeros eternos y ilusionistas maestros, los Ravnos son el clan más difícil de atrapar y el más difícil de creer. Sus ilusiones son tan perfectas que pueden hacer creer casi cualquier cosa.',
    // chimerismo pendiente de implementar en v20Disciplines.ts (disciplina única Ravnos)
    nativePowerIds: ['animalismo', 'celeridad', 'fortitud'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Vicio Compulsivo',
      description: 'Cada Ravnos tiene un vicio irresistible que debe practicar regularmente.',
      mechanical: 'Elige un vicio (robar, mentir, apostar, engañar). Cuando la oportunidad se presenta, el Ravnos debe tirar Autocontrol dif. 6 o ceder al vicio, sin importar las consecuencias.',
    },
    notableMembers: ['Durga Syn', 'Brahms', 'Kalinda'],
  },
  {
    id: 'setita', name: 'Setita (Seguidores de Set)', gameSystem: 'V20' as const, factionType: 'clan' as const,
    archetype: 'Tentadores',
    lore: 'Adoradores del dios serpiente Set, este clan busca corromper y debilitar a todos a su alrededor. Son los traficantes de adicciones, vicios y secretos del mundo vampírico.',
    nativePowerIds: ['ofuscacion', 'presencia', 'serpentis'],
    nativePowerLabel: 'Disciplinas de clan',
    weakness: {
      name: 'Vulnerabilidad a la Luz',
      description: 'Los Setitas son especialmente sensibles a la luz, tanto solar como artificial intensa.',
      mechanical: 'La luz solar causa daño agravado como a cualquier vampiro. Además, incluso la luz artificial brillante (focos, luces de estadio) causa -1 dado a todas las acciones mientras dure la exposición.',
    },
    notableMembers: ['Kemintiri', 'Nefertiti', 'Horus Bey'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// W20 — TRIBUS (sample 5 de 13)
// ─────────────────────────────────────────────────────────────────────────────
const W20_TRIBES = [
  {
    id: 'senores-sombra', name: 'Señores de la Sombra', gameSystem: 'W20' as const, factionType: 'tribe' as const,
    archetype: 'Dominadores',
    lore: 'La tribu que domina la política Garou con mano de hierro. Los Señores de la Sombra creen que el fin justifica los medios y que solo los más fuertes tienen derecho a liderar a Gaia.',
    nativePowerIds: ['dones-senores-sombra'],
    nativePowerLabel: 'Dones tribales',
    weakness: {
      name: 'La Maldición del Dominio',
      description: 'Los Señores de la Sombra nunca pueden rechazar un reto legítimo al liderazgo.',
      mechanical: 'Si son desafiados formalmente al liderazgo, deben aceptar o perder automáticamente 1 punto de Renombre de Honor.',
    },
    notableMembers: ['Albrecht', 'Margrave Konietzko'],
  },
  {
    id: 'vastagos-fenris', name: 'Vástagos de Fenris', gameSystem: 'W20' as const, factionType: 'tribe' as const,
    archetype: 'Guerreros',
    lore: 'Los guerreros más salvajes y feroces de todas las tribus. Honran a Fenris, el lobo devorador, y buscan la gloria en la batalla. Para ellos, la guerra es purificación.',
    nativePowerIds: ['dones-ahroun'],
    nativePowerLabel: 'Dones tribales',
    weakness: {
      name: 'Berserker',
      description: 'En batalla, los Vástagos tienen dificultad para distinguir amigo de enemigo.',
      mechanical: 'Cuando entran en Rabia activa en combate, tiran Autocontrol dif. 7 por turno o atacan al aliado más cercano.',
    },
    notableMembers: ['Arne Vigdisdottir', 'Gunther the Grim'],
  },
  {
    id: 'fianna', name: 'Fianna', gameSystem: 'W20' as const, factionType: 'tribe' as const,
    archetype: 'Bardos',
    lore: 'La tribu de los cantores, poetas y guerreros irlandeses. Los Fianna preservan la historia y la leyenda Garou con la misma pasión con que defienden a Gaia.',
    nativePowerIds: ['dones-theurge'],
    nativePowerLabel: 'Dones tribales',
    weakness: {
      name: 'Sed de Placer',
      description: 'Los Fianna se dejan llevar fácilmente por el placer, el vino y la fiesta.',
      mechanical: '+1 dificultad a todas las tiradas de Autocontrol cuando hay alcohol, fiesta o placeres disponibles.',
    },
    notableMembers: ['Rhiannon Morningkill', 'Liam'],
  },
  {
    id: 'contemplaestrellas', name: 'Contemplaestrellas', gameSystem: 'W20' as const, factionType: 'tribe' as const,
    archetype: 'Místicos',
    lore: 'Guardianes del conocimiento y los secretos espirituales, los Contemplaestrellas tienen acceso a poderes espirituales y conocimientos que otras tribus ni sospechan.',
    nativePowerIds: ['dones-theurge'],
    nativePowerLabel: 'Dones tribales',
    weakness: {
      name: 'Secretos Prohibidos',
      description: 'Los Contemplaestrellas no pueden compartir libremente su conocimiento.',
      mechanical: 'Si revelan un secreto sagrado sin permiso explícito de su tribu, pierden 1 punto de Renombre de Sabiduría.',
    },
    notableMembers: ['Evan Heals-the-Past', 'Crying Wind'],
  },
  {
    id: 'bone-gnawers', name: 'Bone Gnawers (Roedores de Huesos)', gameSystem: 'W20' as const, factionType: 'tribe' as const,
    archetype: 'Supervivientes',
    lore: 'Los parias de la sociedad Garou, los Bone Gnawers viven entre los más pobres y marginados de la humanidad. Son los mejores adaptados al mundo urbano y conocen cada callejón.',
    nativePowerIds: ['animalismo'],
    nativePowerLabel: 'Dones tribales',
    weakness: {
      name: 'Sin Recursos',
      description: 'Los Bone Gnawers raramente tienen acceso a equipamiento de calidad o financiación.',
      mechanical: 'No pueden tener más de 2 puntos en los Trasfondos de Recursos, Contactos o Aliados al inicio del juego.',
    },
    notableMembers: ['Alicia Vargas', 'Dog'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// M20 — TRADICIONES (9 tradiciones)
// ─────────────────────────────────────────────────────────────────────────────
const M20_TRADITIONS = [
  {
    id: 'akashic', name: 'Hermandad Akásica', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Guerreros-Filósofos',
    lore: 'Maestros del Do (el Camino), los Akásicos acceden a la Quintaesencia a través del movimiento perfecto, la meditación y las artes marciales. Conservan el registro akásico de toda experiencia humana.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Deuda Kármica',
      description: 'Los Akásicos son especialmente sensibles al equilibrio kármico de sus acciones.',
      mechanical: 'Actos de violencia gratuita reducen Quintaesencia máxima permanentemente en 1 hasta que sea "equilibrada" mediante actos de bondad equivalentes.',
    },
    notableMembers: ['Kahoku', 'Yang Tse'],
  },
  {
    id: 'verbena', name: 'Verbena', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Brujas',
    lore: 'Las Verbena son las brujas y hechiceras que trabajan con la magia de la sangre, la tierra y los ciclos naturales. Son las más cercanas a las antiguas tradiciones chamánicas pre-consenso.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Lazo Natural',
      description: 'Las Verbena necesitan material natural para su magia; la tecnología les dificulta el acceso a la Quintaesencia.',
      mechanical: '+1 dificultad a toda magia realizada en entornos completamente artificiales sin elementos naturales presentes.',
    },
    notableMembers: ['Nightshade', 'Jinx'],
  },
  {
    id: 'orden-hermes', name: 'Orden de Hermes', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Magos Ceremoniales',
    lore: 'La más formal de todas las tradiciones, el Orden practica una magia ritual altamente estructurada basada en el conocimiento acumulado de siglos de práctica hermética y alquímica.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Ritualismo Estricto',
      description: 'La magia hermética requiere preparación y ritual; la improvisación penaliza.',
      mechanical: '+2 dificultad a toda magia realizada sin al menos 10 minutos de preparación ritual.',
    },
    notableMembers: ['Porthos fitz Kantor', 'Bonisagus'],
  },
  {
    id: 'adeptos-virtuales', name: 'Adeptos Virtuales', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Hackers',
    lore: 'Los Adeptos Virtuales ven el mundo como código y la magia como programación avanzada. Son los miembros más jóvenes del Consejo y los más cómodos en el mundo digital.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Dependencia Digital',
      description: 'Sin tecnología o acceso a redes, los VA se sienten perdidos.',
      mechanical: '+1 dificultad a toda magia que no involucre tecnología en ningún aspecto.',
    },
    notableMembers: ['Angeline', 'Mage-42'],
  },
  {
    id: 'cult-ecstasy', name: 'Culto del Éxtasis', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Chamanes del Placer',
    lore: 'A través del placer extremo, el dolor, las drogas o la danza, los del Culto del Éxtasis alcanzan estados alterados que les dan acceso a verdades sobre el tiempo y la percepción que otros no pueden ver.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Adicción al Estado Alterado',
      description: 'Necesitan un estado alterado para alcanzar su máximo potencial mágico.',
      mechanical: 'Para lanzar efectos de dificultad 8+ sin el estado alterado, añadir +1 dificultad adicional.',
    },
    notableMembers: ['Ranomune', 'Romy'],
  },
  {
    id: 'eutanatos', name: 'Eutanatos', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Mercaderes de la Muerte',
    lore: 'Aquellos que caminan con la muerte como compañera. Los Eutanatos son los encargados de acelerar el fin natural de lo que debe morir, y de proteger el ciclo de vida y muerte.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Peso de la Muerte',
      description: 'Cada muerte a manos del Eutanatos deja una marca en su alma.',
      mechanical: 'Por cada muerte directa causada, tira Autocontrol dif. 6 o pierde 1 punto de Afinidad (Humanidad equivalente) hasta realizar un acto ritual de limpieza.',
    },
    notableMembers: ['Heylel Teomim', 'Kal-i-Kak'],
  },
  {
    id: 'coro-celestial', name: 'Coro Celestial', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Místicos Sagrados',
    lore: 'Monjes, sacerdotes y místicos de todas las tradiciones religiosas que canalizan la magia a través de la fe en una fuerza divina unificada que llaman el Único.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Fe Necesaria',
      description: 'Sin fe activa, la conexión con el Único se debilita.',
      mechanical: 'En periodos de duda espiritual (Narrador determina), el límite de Quintaesencia máxima se reduce en 2.',
    },
    notableMembers: ['Valoran', 'Matthias'],
  },
  {
    id: 'dreamers', name: 'Dreamers (Soñadores)', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Chamanes',
    lore: 'Los Dreamers son los chamanes y hombres-medicina de culturas indígenas y chamánicas de todo el mundo. Su magia es instintiva, conectada a la tierra y los espíritus ancestrales.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Lazo Espiritual',
      description: 'Los Dreamers dependen de la conexión con su tierra de origen y sus ancestros.',
      mechanical: 'Lejos de su tierra natal y sin objetos sagrados de sus ancestros, todas las tiradas de magia tienen dificultad +1.',
    },
    notableMembers: ['Akritkas', 'Moonbeam Brightly'],
  },
  {
    id: 'sons-of-ether', name: 'Hijos del Éter', gameSystem: 'M20' as const, factionType: 'tradition' as const,
    archetype: 'Científicos Locos',
    lore: 'Científicos que trabajan con una física alternativa que incluye el éter, los rayos theta y conceptos rechazados por la ciencia de consenso. Sus inventos hacen cosas imposibles... en teoría.',
    nativePowerIds: ['correspondencia', 'entropia'],
    nativePowerLabel: 'Esferas predominantes',
    weakness: {
      name: 'Paradigma Mecánico',
      description: 'Todo su poder mágico requiere dispositivos mecánicos y aparatos científicos.',
      mechanical: 'Sin su equipo y laboratorio, toda magia tiene dificultad +2 y solo los efectos coincidentales son posibles.',
    },
    notableMembers: ['Dr. Samuel Haight', 'Tesla'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// C20 — KITHS (5 muestra)
// ─────────────────────────────────────────────────────────────────────────────
const C20_KITHS = [
  {
    id: 'boggan', name: 'Boggan', gameSystem: 'C20' as const, factionType: 'kith' as const,
    archetype: 'Artesanos',
    lore: 'Los Boggan son los trabajadores, artesanos y hogareños del mundo feérico. Encuentran Glamour en el trabajo bien hecho y en el cuidado de los demás. Son los más discretos de los Changelings.',
    nativePowerIds: ['chicaneria'],
    nativePowerLabel: 'Artes preferidas',
    weakness: {
      name: 'Incapacidad para el Descanso',
      description: 'Los Boggan son incapaces de descansar si ven trabajo sin hacer.',
      mechanical: 'Si hay trabajo evidente que hacer, el Boggan debe tirar Autocontrol dif. 7 para ignorarlo y hacer otra cosa.',
    },
  },
  {
    id: 'sidhe', name: 'Sidhe', gameSystem: 'C20' as const, factionType: 'kith' as const,
    archetype: 'Nobles',
    lore: 'Los Sidhe son la nobleza feérica, dotados de una belleza sobrenatural que paraliza a mortales y Changelings por igual. Regresaron del Arcadia cuando el Glamour regresó al mundo.',
    nativePowerIds: ['chicaneria'],
    nativePowerLabel: 'Artes preferidas',
    weakness: {
      name: 'Noble Condescendencia',
      description: 'La belleza de los Sidhe hace que los cambios mundanos les sean muy difíciles.',
      mechanical: 'Todas las tiradas relacionadas con trabajo físico rutinario tienen dificultad +1.',
    },
  },
  {
    id: 'pooka', name: 'Pooka', gameSystem: 'C20' as const, factionType: 'kith' as const,
    archetype: 'Embusteros',
    lore: 'Espíritus animales que tomaron forma de Changelings, los Pooka son los más traviesos y los más queridos por su compañía. Son incapaces de decir la verdad directa... nunca.',
    nativePowerIds: ['metamorfosis'],
    nativePowerLabel: 'Artes preferidas',
    weakness: {
      name: 'Incapacidad para la Verdad Directa',
      description: 'Los Pooka literalmente no pueden decir la verdad sin envolverla en una mentira.',
      mechanical: 'Nunca pueden hacer una declaración directamente verdadera. Pueden dar información real, pero siempre en forma de mentira, metáfora o evasión.',
    },
  },
  {
    id: 'nocker', name: 'Nocker', gameSystem: 'C20' as const, factionType: 'kith' as const,
    archetype: 'Inventores',
    lore: 'Los Nocker son los ingenieros y artesanos mecánicos del mundo feérico. Sus creaciones son siempre extraordinarias... excepto por ese pequeño defecto que siempre, inevitablemente, aparece.',
    nativePowerIds: ['chicaneria'],
    nativePowerLabel: 'Artes preferidas',
    weakness: {
      name: 'El Defecto Inevitable',
      description: 'Nada creado por un Nocker funciona perfectamente.',
      mechanical: 'Todo objeto construido por un Nocker tiene un pequeño defecto (Narrador decide cuál). Nunca falla en el peor momento posible... o sí.',
    },
  },
  {
    id: 'eshu', name: 'Eshu', gameSystem: 'C20' as const, factionType: 'kith' as const,
    archetype: 'Viajeros',
    lore: 'Los Eshu son narradores y viajeros natos de origen africano y árabe. Para ellos, el viaje es sagrado y cada historia contada genera Glamour. Son los mejores narradores del mundo feérico.',
    nativePowerIds: ['chicaneria'],
    nativePowerLabel: 'Artes preferidas',
    weakness: {
      name: 'Incapacidad para Quedarse',
      description: 'Los Eshu tienen una compulsión irrefrenable de viajar.',
      mechanical: 'Después de (Glamour en semanas) en el mismo lugar, el Eshu debe superar Voluntad dif. 7 para no partir en busca de nuevas aventuras.',
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Wr20 — GREMIOS (5 muestra)
// ─────────────────────────────────────────────────────────────────────────────
const WR20_GUILDS = [
  {
    id: 'artificers', name: 'Artificers (Artífices)', gameSystem: 'Wr20' as const, factionType: 'guild' as const,
    archetype: 'Constructores',
    lore: 'Los Artífices crean los objetos Sombríos del Umbral, convirtiendo Pathos en materia tangible para los muertos. Sin ellos, la civilización Wraith colapsaría.',
    nativePowerIds: ['flux'],
    nativePowerLabel: 'Arcanos del Gremio',
    weakness: {
      name: 'Obsesión Creativa',
      description: 'Los Artífices son compulsivos creadores.',
      mechanical: 'Ante materiales susceptibles de ser trabajados, tiran Autocontrol dif. 7 o comienzan a trabajarlos automáticamente.',
    },
  },
  {
    id: 'monitors', name: 'Monitors (Monitores)', gameSystem: 'Wr20' as const, factionType: 'guild' as const,
    archetype: 'Vigilantes',
    lore: 'Los Monitores observan y registran el mundo de los vivos y los muertos. Son la agencia de inteligencia de las Estigias.',
    nativePowerIds: ['embodiment'],
    nativePowerLabel: 'Arcanos del Gremio',
    weakness: {
      name: 'Compulsión Registradora',
      description: 'Deben registrar todo evento significativo.',
      mechanical: 'Ante un evento histórico, deben tirar Autocontrol dif. 7 o detenerse a registrarlo antes de actuar.',
    },
  },
  {
    id: 'oracles', name: 'Oracles (Oráculos)', gameSystem: 'Wr20' as const, factionType: 'guild' as const,
    archetype: 'Profetas',
    lore: 'Los Oráculos ven hilos de Destino que otros no pueden percibir. Sus visiones son fragmentadas y a menudo incomprensibles hasta que los eventos se desarrollan.',
    nativePowerIds: ['flux'],
    nativePowerLabel: 'Arcanos del Gremio',
    weakness: {
      name: 'Carga de las Visiones',
      description: 'Las visiones proféticas llegan sin control.',
      mechanical: 'En momentos de decisión crítica, el Narrador puede imponer una visión que distrae al personaje, añadiendo +1 dificultad a la siguiente tirada.',
    },
  },
  {
    id: 'pardoners', name: 'Pardoners (Perdonadores)', gameSystem: 'Wr20' as const, factionType: 'guild' as const,
    archetype: 'Confesores',
    lore: 'Los Perdonadores luchan contra la Sombra de los Wraiths, aligerando la carga de culpa y oscuridad que arrastra cada muerto.',
    nativePowerIds: ['flux'],
    nativePowerLabel: 'Arcanos del Gremio',
    weakness: {
      name: 'Absorción de la Culpa',
      description: 'Al aliviar a otros de su Sombra, absorben parte de esa oscuridad.',
      mechanical: 'Por cada sesión de absolvición exitosa, la propia Sombra del Perdonador sube 1 punto temporalmente.',
    },
  },
  {
    id: 'proctors', name: 'Proctors (Rectores)', gameSystem: 'Wr20' as const, factionType: 'guild' as const,
    archetype: 'Guardias',
    lore: 'Los Rectores son los guardianes del orden en las ciudades de los muertos, protegiéndolas de Espectros y del caos del Tempestado.',
    nativePowerIds: ['embodiment'],
    nativePowerLabel: 'Arcanos del Gremio',
    weakness: {
      name: 'Deber Antes que Todo',
      description: 'El deber siempre supera el deseo personal.',
      mechanical: 'Ante una amenaza directa a su área de vigilancia, deben responder aunque ello les ponga en peligro personal.',
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT UNIFICADO
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_FACTIONS: FactionsIndex = {
  V20:  V20_CLANS,
  W20:  W20_TRIBES,
  M20:  M20_TRADITIONS,
  C20:  C20_KITHS,
  Wr20: WR20_GUILDS,
}

export { V20_CLANS, W20_TRIBES, M20_TRADITIONS, C20_KITHS, WR20_GUILDS }
