import { expect } from 'chai'
import queryStringExtractor from '../../src/token-extractors/query-string-extractor'

describe('QueryStringExtractor', () => {
  const accessTokenQueryExtractor = queryStringExtractor('access_token')

  it('retrieves from parsed query obj', () => {
    const req = {
      query: {
        access_token: 'helloworld'
      }
    }

    expect(accessTokenQueryExtractor(req)).to.equal('helloworld')
  })

  it('parses url string if no query obj', () => {
    const req = {
      url: '/?access_token=helloworld'
    }

    expect(accessTokenQueryExtractor(req)).to.equal('helloworld')
  })
})
