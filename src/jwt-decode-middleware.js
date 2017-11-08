import _ from 'lodash'
import { Router } from 'express'
import passport from 'passport'
import {
  Strategy as JWTStrategy,
  ExtractJwt
} from 'passport-jwt'

export default function JWTDecodeMiddleware (options) {
  const requestProperty = options.requestProperty || '_jwt'
  const tokenProperty = options.tokenProperty || 'access_token'
  options = _.omit(options, ['requestProperty', 'tokenProperty'])

  const config = Object.assign(options, {
    ignoreExpiration: false,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      ExtractJwt.fromUrlQueryParameter(tokenProperty),
      ExtractJwt.fromBodyField(tokenProperty)
    ])
  })
  const authFn = (jwtPayload, callback) => callback(null, jwtPayload)

  const router = new Router()
  passport.use(new JWTStrategy(config, authFn))

  router.use(passport.initialize({ userProperty: requestProperty }))
  router.use(passport.authenticate('jwt', { session: false }))

  return router
}
