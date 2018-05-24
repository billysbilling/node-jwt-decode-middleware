import { parse as parseHeader } from 'auth-header'

export default function AuthHeaderExtractor (authScheme) {
  authScheme = `${authScheme || 'bearer'}`.toLowerCase()

  return req => {
    const authParams = req.headers.authorization &&
      `${req.headers.authorization}`.toLowerCase().startsWith(authScheme) &&
      parseHeader(req.headers.authorization)

    return authParams && authParams.token
  }
}
