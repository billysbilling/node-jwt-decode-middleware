import { expect } from 'chai'
import QueryStringExtractor from '../../src/token-extractors/query-string-extractor'

describe('QueryStringExtractor', () => {
  const extractor = new QueryStringExtractor()

  it('parses query string parameter', (done) => {
    const req = {
      url: '/?access_token=helloworld'
    }
    const next = () => {
      expect(req._jwt).to.equal('helloworld')
      done()
    }
    extractor(req, {}, next)
  })
})
