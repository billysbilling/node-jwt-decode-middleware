import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import jwtDecodeMiddleware from '../src/jwt-decode-middleware'

describe('JWTDecodeMiddleware', () => {
  let middleware = jwtDecodeMiddleware()
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
    const next = () => {
      expect(req.jwt).to.equal('Hello world')
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
    const next = () => {
      expect(req.jwt).to.equal('Hello world')
      done()
    }
    middleware(req, {}, next)
  })
})
