import { URL } from 'url'

export default function QueryStringExtractor (tokenProperty) {
  tokenProperty = tokenProperty || 'access_token'

  return req => {
    if (req.query) {
      return req.query[tokenProperty]
    }

    // Fallback to parsing the url if query not parsed
    // 'http://local' is used to construct a valid URL
    const url = new URL(req.url, 'http://local')

    return url.searchParams.get(tokenProperty)
  }
}
