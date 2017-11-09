# node-jwt-decode-middleware

JWT decode express middleware.

## Usage

### Express middleware

Decodes JWT from :

* `Authorization: Bearer JWT_TOKEN` Header,
* body field (configured by`tokenProperty` option),
* querystring parameter (configured by `tokenProperty` option)

into `req._jwtDecoded` property


```javascript
import express from 'express'
import JWTDecodeMiddleware from '\@billyfree/jwt-decode-middleware'

const jwtDecodeMiddleware = new JWTDecodeMiddleware(secret, {
	tokenProperty: 'access_token' // default 
})

const app = express()
app.use(jwtDecodeMiddleware, (req, res, next) => {
	console.log(req._jwtDecoded)
})
```
