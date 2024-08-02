// types/custom.d.ts

import { JwtPayload } from '../../middleware/auth'

declare global {
  interface RequestWithUser extends Express.Request {
    user?: JwtPayload
  }
}

export {}
