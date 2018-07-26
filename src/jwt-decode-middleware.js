import _ from 'lodash'
import jwt from 'jsonwebtoken'
import authHeaderExtractor from './token-extractors/auth-header-extractor'
import bodyExtractor from './token-extractors/body-extractor'
import queryStringExtractor from './token-extractors/query-string-extractor'

// Known errors in jsonwebtoken@8.1.0
const JWT_ERRORS = [
  'TokenExpiredError',
  'NotBeforeError',
  'JsonWebTokenError'
]

module.exports = function jwtDecodeMiddleware (options) {
  const tokenProperty = _.get(options, 'tokenProperty') || 'access_token'
  const secret = _.get(options, 'secret')
  const bearerExtractor = authHeaderExtractor('bearer')
  const bodyTokenExtractor = bodyExtractor(tokenProperty)
  const queryTokenExtractor = queryStringExtractor(tokenProperty)

  options = options || {}
  options.ignoreExpiration = options.ignoreExpiration !== undefined ? options.ignoreExpiration : false
  options.clockTolerance = options.clockTolerance !== undefined ? options.clockTolerance : 0
  options = _.omit(options, ['secret', 'tokenProperty'])

  return (req, res, next) => {
    const token =
      req.raw_jwt = bearerExtractor(req) || bodyTokenExtractor(req) || queryTokenExtractor(req)

    try {
      req.jwt = token && jwt.verify(token, secret, options)
    } catch (e) {
      if (!JWT_ERRORS.includes(e.name)) throw e
    }

    return next()
  }
}
