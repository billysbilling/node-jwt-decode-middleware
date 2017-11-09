import url from 'url'

export default function QueryStringExtractor (tokenProperty) {
  tokenProperty = tokenProperty || 'access_token'

  return (req, res, next) => {
    if (req._jwt) return next()

    const parsedUrl = url.parse(req.url || '', true)
    if (parsedUrl.query && Object.prototype.hasOwnProperty.call(parsedUrl.query, tokenProperty)) {
      req._jwt = parsedUrl.query[tokenProperty]
    }

    next()
  }
}
