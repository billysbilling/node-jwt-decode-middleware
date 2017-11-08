import http from 'http'
import events from 'events'
import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import httpMocks from 'node-mocks-http'
import JWTDecoderMiddleware from '../src/jwt-decode-middleware'

const request = data => httpMocks.createRequest({
  ...data,
  path: '/',
  logIn: http.IncomingMessage.prototype.logIn
})

describe('JWTDecoderMiddleware', () => {
  var token

  const middleware = new JWTDecoderMiddleware({
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
      algorithm: 'HS256'
    }
  })

  before(done => {
    jwt.sign('hello world', 'secret', { algorithm: 'HS256' },
      (err, res) => {
        if (err) {
          done(err)
          return
        }
        token = res
        done()
      })
  })

  it('decodes JWT in authorization header', done => {
    const req = request({
      headers: {
        Authorization: `bearer ${token}`
      }
    })
    const next = () => {
      expect(req._jwt).to.equal('hello world')
      done()
    }
    middleware(req, httpMocks.createResponse(), next)
  })

  it('decodes JWT in access_token body field', done => {
    const req = request({
      body: {
        access_token: `${token}`
      }
    })
    const next = () => {
      expect(req._jwt).to.equal('hello world')
      done()
    }
    middleware(req, httpMocks.createResponse(), next)
  })

  it('decodes JWT in access_token query parameter', done => {
    const req = request({
      url: `/?access_token=${token}`
    })
    const next = () => {
      expect(req._jwt).to.equal('hello world')
      done()
    }
    middleware(req, httpMocks.createResponse(), next)
  })

  describe('errors', () => {
    let invalidToken
    before(done => {
      jwt.sign('hello world', 'invalid secret', { algorithm: 'HS256' },
        (err, res) => {
          if (err) {
            done(err)
            return
          }
          invalidToken = res
          done()
        })
    })

    it('return 401', done => {
      const req = request({
        url: `/?access_token=${invalidToken}`
      })
      const res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter
      })
      res.on('end', () => {
        expect(res.statusCode).to.equal(401)
        done()
      })
      middleware(req, res)
    })
  })
})
