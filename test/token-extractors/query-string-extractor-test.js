import { expect } from 'chai'
import queryStringExtractor from '../../src/token-extractors/query-string-extractor'

describe('QueryStringExtractor', () => {
  const accessTokenQueryExtractor = queryStringExtractor('access_token')

  it('parses query string parameter', () => {
    const req = {
      url: '/?access_token=helloworld'
    }

    expect(accessTokenQueryExtractor(req)).to.equal('helloworld')
  })
})
