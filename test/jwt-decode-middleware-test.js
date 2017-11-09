import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import JWTDecodeMiddleware from '../src/jwt-decode-middleware'

describe('JWTDecodeMiddleware', () => {
  let req
  let token

  before((done) => {
    const options = {
      algorithm: 'HS256'
    }
    jwt.sign('Hello world', 'secret', options,
      (err, result) => {
        token = result
        done(err)
      })
  })

  it('decodes JWT token', (done) => {
    req = {
      headers: {
        authorization: `bearer ${token}`
      }
    }
    const middleware = new JWTDecodeMiddleware()
    const next = () => {
      expect(req._jwtDecoded).to.equal('Hello world')
      done()
    }
    middleware(req, {}, next)
  })

  it('decodes JWT token without secret', (done) => {
    req = {
      headers: {
        authorization: `bearer ${token}`
      }
    }
    const middleware = new JWTDecodeMiddleware()
    const next = () => {
      expect(req._jwtDecoded).to.equal('Hello world')
      done()
    }
    middleware(req, {}, next)
  })
})
