import { expect } from 'chai'
import BodyExtractor from '../../src/token-extractors/body-extractor'

describe('BodyExtractor', () => {
  const extractor = new BodyExtractor()

  it('parses body field', (done) => {
    const req = {
      body: {
        access_token: 'helloworld'
      }
    }
    const next = () => {
      expect(req._jwt).to.equal('helloworld')
      done()
    }
    extractor(req, {}, next)
  })
})
