import { expect } from 'chai'
import bodyExtractor from '../../src/token-extractors/body-extractor'

describe('BodyExtractor', () => {
  const accessTokenBodyExtractor = bodyExtractor('access_token')

  it('parses body field', () => {
    const req = {
      body: {
        access_token: 'helloworld'
      }
    }

    expect(accessTokenBodyExtractor(req)).to.equal('helloworld')
  })
})
