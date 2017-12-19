import { parse as parseHeader } from 'auth-header'

export default function AuthHeaderExtractor (authScheme) {
  authScheme = `${authScheme || 'bearer'}`.toLowerCase()

  return req => {
    const authParams = parseHeader(req.headers.authorization)

    if (authParams && authScheme === `${authParams.scheme}`.toLowerCase()) {
      return authParams.token
    }
  }
}
