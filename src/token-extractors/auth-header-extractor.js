import _ from 'lodash'
import { parse as parseHeader } from 'auth-header'

export default function AuthHeaderExtractor (authScheme) {
  authScheme = authScheme || 'bearer'
  return (req, res, next) => {
    if (req._jwt) return next()

    const authSchemeLower = authScheme.toLowerCase()
    const authHeader = _.get(req.headers, 'authorization')

    if (!authHeader) return next()

    const authParams = parseHeader(authHeader)
    if (authParams && authSchemeLower === authParams.scheme.toLowerCase()) {
      req._jwt = authParams.token
    }
    next()
  }
}
