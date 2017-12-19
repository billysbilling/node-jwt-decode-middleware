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
})
