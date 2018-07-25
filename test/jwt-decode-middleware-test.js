import { assert } from 'chai'
import jwt from 'jsonwebtoken'
import jwtDecodeMiddleware from '../src/jwt-decode-middleware'

const JWT_SECRET = 'some secret'

describe('JWTDecodeMiddleware', () => {
  let middleware = jwtDecodeMiddleware({
    algorithm: 'HS256',
    secret: JWT_SECRET
  })

  it('decodes valid JWT token', (done) => {
    const token = jwt.sign({ data: 'Hello world' }, JWT_SECRET, {
      algorithm: 'HS256'
    })
    let req = { headers: { authorization: `bearer ${token}` } }

    middleware(
      req,
      {},
      () => {
        assert.deepOwnInclude(req.jwt, { data: 'Hello world' })
        done()
      }
    )
  })

  it('does not decode wrongly signed JWT token', (done) => {
    const token = jwt.sign({ data: 'Hello world' }, 'wrong secret', {
      algorithm: 'HS256'
    })
    let req = { headers: { authorization: `bearer ${token}` } }

    middleware(
      req,
      {},
      () => {
        assert.isUndefined(req.jwt)
        done()
      }
    )
  })

  it('does not decode expired JWT token', (done) => {
    const token = jwt.sign({ data: 'Hello world' }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: -1
    })
    let req = { headers: { authorization: `bearer ${token}` } }

    middleware(
      req,
      {},
      () => {
        assert.isUndefined(req.jwt)
        done()
      }
    )
  })
})
