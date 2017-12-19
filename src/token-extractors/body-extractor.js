export default function BodyExtractor (tokenProperty) {
  tokenProperty = tokenProperty || 'access_token'

  return req => {
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, tokenProperty)) {
      return req.body[tokenProperty]
    }
  }
}
