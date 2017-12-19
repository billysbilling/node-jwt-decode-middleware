import url from 'url'

export default function QueryStringExtractor (tokenProperty) {
  tokenProperty = tokenProperty || 'access_token'

  return req => {
    const parsedUrl = url.parse(req.url || '', true)

    if (parsedUrl.query && Object.prototype.hasOwnProperty.call(parsedUrl.query, tokenProperty)) {
      return parsedUrl.query[tokenProperty]
    }
  }
}
