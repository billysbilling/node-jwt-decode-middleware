import _ from 'lodash'
import jwt from 'jsonwebtoken'
import authHeaderExtractor from './token-extractors/auth-header-extractor'
import bodyExtractor from './token-extractors/body-extractor'
import queryStringExtractor from './token-extractors/query-string-extractor'

module.exports = function jwtDecodeMiddleware (options) {
  const tokenProperty = _.get(options, 'tokenProperty') || 'access_token'
  options = _.omit(options, ['tokenProperty'])
  const bearerExtractor = authHeaderExtractor('bearer')
  const bodyTokenExtractor = bodyExtractor(tokenProperty)
  const queryTokenExtractor = queryStringExtractor(tokenProperty)

  return (req, res, next) => {
    const token = bearerExtractor(req) || bodyTokenExtractor(req) || queryTokenExtractor(req)

    req.jwt = token ? jwt.decode(token, options) : null

    return next()
  }
}
