import type { PowersIndex } from '@/types/powers'
import { V20_DISCIPLINES } from './v20Disciplines'
import { W20_GIFTS } from './w20Gifts'
import { M20_SPHERES } from './m20Spheres'
import { C20_ARTS } from './c20Arts'
import { WR20_ARCANOS } from './wr20Arcanos'

export const ALL_POWERS: PowersIndex = {
  V20:  V20_DISCIPLINES,
  W20:  W20_GIFTS,
  M20:  M20_SPHERES,
  C20:  C20_ARTS,
  Wr20: WR20_ARCANOS,
}

export { V20_DISCIPLINES, W20_GIFTS, M20_SPHERES, C20_ARTS, WR20_ARCANOS }
