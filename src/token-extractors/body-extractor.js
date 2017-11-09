export default function BodyExtractor (tokenProperty) {
  tokenProperty = tokenProperty || 'access_token'

  return (req, res, next) => {
    if (req._jwt) return next()

    if (req.body && Object.prototype.hasOwnProperty.call(req.body, tokenProperty)) {
      req._jwt = req.body[tokenProperty]
    }

    next()
  }
}
