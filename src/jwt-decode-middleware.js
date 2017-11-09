import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { compose } from 'compose-middleware'
import AuthHeaderExtractor from './token-extractors/auth-header-extractor'
import BodyExtractor from './token-extractors/body-extractor'
import QueryStringExtractor from './token-extractors/query-string-extractor'

function JWTDecode (options) {
  return (req, res, next) => {
    if (!req._jwt) return next()

    req._jwtDecoded = jwt.decode(req._jwt, options)
    next()
  }
}

export default function JWTDecoderMiddleware (options) {
  const tokenProperty = _.get(options, 'tokenProperty') || 'access_token'
  options = _.omit(options, ['tokenProperty'])

  return compose([
    AuthHeaderExtractor(),
    BodyExtractor(tokenProperty),
    QueryStringExtractor(tokenProperty),
    JWTDecode(options)
  ])
}
