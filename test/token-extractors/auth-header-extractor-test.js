import { expect } from 'chai'
import AuthHeaderExtractor from '../../src/token-extractors/auth-header-extractor'

describe('AuthHeaderExtractor', () => {
  const extractor = new AuthHeaderExtractor('bearer')

  it('parses Authorization header', (done) => {
    const req = {
      headers: {
        authorization: 'bearer helloworld'
      }
    }
    const next = () => {
      expect(req._jwt).to.equal('helloworld')
      done()
    }
    extractor(req, {}, next)
  })
})
