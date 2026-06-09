import type { GameSystemConfig } from '@/types/gameSystem'

// ─────────────────────────────────────────────────────────────────────────────
// GAME SYSTEM DATA — World of Darkness 20th Anniversary Edition
// ─────────────────────────────────────────────────────────────────────────────

export const GAME_SYSTEMS: Record<string, GameSystemConfig> = {

  // ── V20 — VAMPIRO: LA MASCARADA ──────────────────────────────────────────
  V20: {
    id: 'V20',
    fullName: 'Vampiro: La Mascarada 20º Aniversario',
    shortName: 'V20',
    accent: {
      primary: '#FF3333',
      dim:     'rgba(255,51,51,0.12)',
      border:  'rgba(255,51,51,0.35)',
    },
    nav: [
      { id: 'home',       label: 'Inicio',                   icon: 'home',        href: '/' },
      { id: 'system',     label: 'Sistema Básico',            icon: 'book',        href: '/sistema' },
      { id: 'attributes', label: 'Atributos y Habilidades',   icon: 'user-plus',   href: '/atributos' },
      { id: 'powers',     label: 'Disciplinas',               icon: 'sparkles',    href: '/disciplinas' },
      { id: 'combat',     label: 'Combate y Salud',           icon: 'shield',      href: '/combate' },
      { id: 'virtues',    label: 'Virtudes y Humanidad',      icon: 'heart',       href: '/virtudes' },
    ],
    hero: {
      eyebrow:      'BIENVENIDO AL ABISMO',
      title:        'Vademécum: La Mascarada',
      description:  'Un compendio digital diseñado para los vástagos de la Edad Oscura. Consulta las leyes de Caín, domina tus disciplinas y mantén tu Humanidad ante el acecho de la Bestia.',
      ctaPrimary:   'COMENZAR CRÓNICA',
      ctaSecondary: 'LEER REGLAMENTO',
    },
    attributeGroups: [
      { label: 'FÍSICOS',  color: '#FF3333', members: ['Fuerza', 'Destreza', 'Resistencia'] },
      { label: 'SOCIALES', color: '#C07800', members: ['Carisma', 'Manipulación', 'Apariencia'] },
      { label: 'MENTALES', color: '#1A6EFF', members: ['Percepción', 'Inteligencia', 'Astucia'] },
    ],
    powers: [
      { name: 'ANIMALISMO',  level: 3 },
      { name: 'CELERIDAD',   level: 4 },
      { name: 'DOMINACIÓN',  level: 2 },
      { name: 'POTENCIA',    level: 3 },
      { name: 'OFUSCACIÓN',  level: 1 },
    ],
    powersLabel: 'DISCIPLINAS',
    virtues: [
      { name: 'CONCIENCIA',  current: 7, max: 10 },
      { name: 'AUTOCONTROL', current: 4, max: 10 },
      { name: 'CORAJE',      current: 3, max: 10 },
    ],
    virtuesLabel: 'VIRTUDES',
    systemSummary: 'Reglas de tiradas, dificultades y éxito automático.',
    healthPips: 7,
    currentHealth: 3,
  },

  // ── W20 — HOMBRE LOBO: EL APOCALIPSIS ───────────────────────────────────
  W20: {
    id: 'W20',
    fullName: 'Hombre Lobo: El Apocalipsis 20º Aniversario',
    shortName: 'W20',
    accent: {
      primary: '#C07800',
      dim:     'rgba(192,120,0,0.12)',
      border:  'rgba(192,120,0,0.35)',
    },
    nav: [
      { id: 'home',       label: 'Inicio',               icon: 'home',      href: '/' },
      { id: 'system',     label: 'Sistema Básico',        icon: 'book',      href: '/sistema' },
      { id: 'attributes', label: 'Atributos y Habilidades',icon: 'user-plus',href: '/atributos' },
      { id: 'powers',     label: 'Dones',                 icon: 'zap',       href: '/dones' },
      { id: 'combat',     label: 'Combate y Rabia',       icon: 'shield',    href: '/combate' },
      { id: 'virtues',    label: 'Renombres y Ética',     icon: 'award',     href: '/renombres' },
    ],
    hero: {
      eyebrow:      'QUE COMIENCE EL APOCALIPSIS',
      title:        'Vademécum: El Apocalipsis',
      description:  'La Tierra agoniza. Los Garou portan la rabia de Gaia en sus venas. Aprende las Formas, domina los Dones y lidera a tu manada contra el Wyrm corrompido.',
      ctaPrimary:   'COMENZAR CRÓNICA',
      ctaSecondary: 'LEER REGLAMENTO',
    },
    attributeGroups: [
      { label: 'FÍSICOS',  color: '#C07800', members: ['Fuerza', 'Destreza', 'Resistencia'] },
      { label: 'SOCIALES', color: '#FF3333', members: ['Carisma', 'Manipulación', 'Apariencia'] },
      { label: 'MENTALES', color: '#1A6EFF', members: ['Percepción', 'Inteligencia', 'Astucia'] },
    ],
    powers: [
      { name: 'LUNA LLENA',  level: 3 },
      { name: 'LUNA NUEVA',  level: 2 },
      { name: 'LUNA CRECIENTE', level: 4 },
      { name: 'LUNA MENGUANTE', level: 1 },
    ],
    powersLabel: 'DONES',
    virtues: [
      { name: 'GLORIA',    current: 6, max: 10 },
      { name: 'HONOR',     current: 5, max: 10 },
      { name: 'SABIDURÍA', current: 4, max: 10 },
    ],
    virtuesLabel: 'RENOMBRES',
    systemSummary: 'Tiradas de dado, Gnosis, Rabia y Esencia.',
    healthPips: 7,
    currentHealth: 5,
  },

  // ── M20 — MAGO: LA ASCENSIÓN ─────────────────────────────────────────────
  M20: {
    id: 'M20',
    fullName: 'Mago: La Ascensión 20º Aniversario',
    shortName: 'M20',
    accent: {
      primary: '#1A6EFF',
      dim:     'rgba(26,110,255,0.12)',
      border:  'rgba(26,110,255,0.35)',
    },
    nav: [
      { id: 'home',       label: 'Inicio',               icon: 'home',      href: '/' },
      { id: 'system',     label: 'Sistema Básico',        icon: 'book',      href: '/sistema' },
      { id: 'attributes', label: 'Atributos y Habilidades',icon: 'user-plus',href: '/atributos' },
      { id: 'powers',     label: 'Esferas',               icon: 'layers',    href: '/esferas' },
      { id: 'combat',     label: 'Combate y Paradoja',    icon: 'shield',    href: '/combate' },
      { id: 'virtues',    label: 'Resonancia y Ética',    icon: 'compass',   href: '/resonancia' },
    ],
    hero: {
      eyebrow:      'LA REALIDAD ES UNA ILUSIÓN',
      title:        'Vademécum: La Ascensión',
      description:  'La realidad es consensual. Los Magos doblan las leyes de la existencia con su Voluntad. Domina las Esferas, esquiva la Paradoja y asciende más allá de lo mundano.',
      ctaPrimary:   'COMENZAR CRÓNICA',
      ctaSecondary: 'LEER REGLAMENTO',
    },
    attributeGroups: [
      { label: 'FÍSICOS',  color: '#1A6EFF', members: ['Fuerza', 'Destreza', 'Resistencia'] },
      { label: 'SOCIALES', color: '#9333EA', members: ['Carisma', 'Manipulación', 'Apariencia'] },
      { label: 'MENTALES', color: '#FF3333', members: ['Percepción', 'Inteligencia', 'Astucia'] },
    ],
    powers: [
      { name: 'CORRESPONDENCIA', level: 3 },
      { name: 'ENTROPÍA',        level: 2 },
      { name: 'FUERZA',          level: 4 },
      { name: 'VIDA',            level: 1 },
      { name: 'MENTE',           level: 3 },
    ],
    powersLabel: 'ESFERAS',
    virtues: [
      { name: 'DINAMISMO', current: 8, max: 10 },
      { name: 'PACIENCIA', current: 5, max: 10 },
      { name: 'BALANCE',   current: 6, max: 10 },
    ],
    virtuesLabel: 'RESONANCIA',
    systemSummary: 'Quintaesencia, Paradoja, Esferas y consenso.',
    healthPips: 7,
    currentHealth: 6,
  },

  // ── C20 — CHANGELING: EL ENSUEÑO ─────────────────────────────────────────
  C20: {
    id: 'C20',
    fullName: 'Changeling: El Ensueño 20º Aniversario',
    shortName: 'C20',
    accent: {
      primary: '#9333EA',
      dim:     'rgba(147,51,234,0.12)',
      border:  'rgba(147,51,234,0.35)',
    },
    nav: [
      { id: 'home',       label: 'Inicio',               icon: 'home',      href: '/' },
      { id: 'system',     label: 'Sistema Básico',        icon: 'book',      href: '/sistema' },
      { id: 'attributes', label: 'Atributos y Habilidades',icon: 'user-plus',href: '/atributos' },
      { id: 'powers',     label: 'Artes y Reinos',        icon: 'star',      href: '/artes' },
      { id: 'combat',     label: 'Combate y Glamour',     icon: 'shield',    href: '/combate' },
      { id: 'virtues',    label: 'Glamour y Banalidad',   icon: 'feather',   href: '/glamour' },
    ],
    hero: {
      eyebrow:      'EL ENSUEÑO TE LLAMA',
      title:        'Vademécum: El Ensueño',
      description:  'Los Changelings viven atrapados entre el mundo mortal y el reino feérico. Domina las Artes, preserva tu Glamour y lucha contra la Banalidad que todo lo consume.',
      ctaPrimary:   'COMENZAR CRÓNICA',
      ctaSecondary: 'LEER REGLAMENTO',
    },
    attributeGroups: [
      { label: 'FÍSICOS',  color: '#9333EA', members: ['Fuerza', 'Destreza', 'Resistencia'] },
      { label: 'SOCIALES', color: '#C07800', members: ['Carisma', 'Manipulación', 'Apariencia'] },
      { label: 'MENTALES', color: '#1A6EFF', members: ['Percepción', 'Inteligencia', 'Astucia'] },
    ],
    powers: [
      { name: 'CHICANERÍA', level: 3 },
      { name: 'METAMORFOSIS', level: 2 },
      { name: 'ONEIRISMO', level: 4 },
      { name: 'PYRETICS', level: 1 },
    ],
    powersLabel: 'ARTES',
    virtues: [
      { name: 'GLAMOUR',   current: 7, max: 10 },
      { name: 'BANALIDAD', current: 2, max: 10 },
      { name: 'DESEQUIL.', current: 4, max: 10 },
    ],
    virtuesLabel: 'GLAMOUR',
    systemSummary: 'Glamour, Banalidad, Ensueño y Artes feéricas.',
    healthPips: 7,
    currentHealth: 7,
  },

  // ── Wr20 — WRAITH: EL OLVIDO ─────────────────────────────────────────────
  Wr20: {
    id: 'Wr20',
    fullName: 'Wraith: El Olvido 20º Aniversario',
    shortName: 'Wr20',
    accent: {
      primary: '#6B7280',
      dim:     'rgba(107,114,128,0.12)',
      border:  'rgba(107,114,128,0.35)',
    },
    nav: [
      { id: 'home',       label: 'Inicio',               icon: 'home',      href: '/' },
      { id: 'system',     label: 'Sistema Básico',        icon: 'book',      href: '/sistema' },
      { id: 'attributes', label: 'Atributos y Habilidades',icon: 'user-plus',href: '/atributos' },
      { id: 'powers',     label: 'Arcanos',               icon: 'eye',       href: '/arcanos' },
      { id: 'combat',     label: 'Combate y Corpus',      icon: 'shield',    href: '/combate' },
      { id: 'virtues',    label: 'Pasión y Frío',         icon: 'wind',      href: '/pasion' },
    ],
    hero: {
      eyebrow:      'ENTRE EL OLVIDO Y LA LUZ',
      title:        'Vademécum: El Olvido',
      description:  'Los Wraiths deambulan en los Shadowlands, atados al mundo mortal por sus Pasiones y Marcas. Domina los Arcanos y evita que la Sombra te consuma.',
      ctaPrimary:   'COMENZAR CRÓNICA',
      ctaSecondary: 'LEER REGLAMENTO',
    },
    attributeGroups: [
      { label: 'FÍSICOS',  color: '#6B7280', members: ['Fuerza', 'Destreza', 'Resistencia'] },
      { label: 'SOCIALES', color: '#C07800', members: ['Carisma', 'Manipulación', 'Apariencia'] },
      { label: 'MENTALES', color: '#1A6EFF', members: ['Percepción', 'Inteligencia', 'Astucia'] },
    ],
    powers: [
      { name: 'EMBODY',    level: 3 },
      { name: 'FLUX',      level: 2 },
      { name: 'KEENING',   level: 4 },
      { name: 'MOLIATE',   level: 2 },
    ],
    powersLabel: 'ARCANOS',
    virtues: [
      { name: 'PASIÓN',    current: 5, max: 10 },
      { name: 'VACÍO',     current: 3, max: 10 },
      { name: 'CORPUS',    current: 6, max: 10 },
    ],
    virtuesLabel: 'ESENCIAS',
    systemSummary: 'Pathos, Corpus, Sombra y arcanos spectrales.',
    healthPips: 7,
    currentHealth: 4,
  },
}

export const GAME_SYSTEM_ORDER: GameSystemConfig['id'][] = ['V20', 'W20', 'M20', 'C20', 'Wr20']
