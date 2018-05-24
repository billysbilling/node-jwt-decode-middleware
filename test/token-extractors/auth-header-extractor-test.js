import { expect } from 'chai'
import authHeaderExtractor from '../../src/token-extractors/auth-header-extractor'

describe('AuthHeaderExtractor', () => {
  const bearerExtractor = authHeaderExtractor('bearer')

  it('parses Authorization header', () => {
    const req = {
      headers: {
        authorization: 'bearer helloworld'
      }
    }

    expect(bearerExtractor(req)).to.equal('helloworld')
  })

  it('does not fail for missing scheme in Authorization header', () => {
    const req = {
      headers: {
        authorization: 'helloworld'
      }
    }

    expect(bearerExtractor.bind(bearerExtractor, req)).to.not.throw(TypeError)
  })
})
