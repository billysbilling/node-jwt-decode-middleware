# node-jwt-decode-middleware

Express middleware for deserializing JWT data into `req.jwt` from:

* Authorization header: `Authorization: Bearer <token_value>`,
* Request query parameters: `req.query: { access_token: <token_value> }`
* Request body: `req.body: { access_token: <token_value> }`

*Note that invalid tokens are being ignored.*

## Usage

```javascript
import express from 'express'
import jwtDecodeMiddleware from '\@billyfree/jwt-decode-middleware'

const jwtOptions = {
	secret: 'jwt signature secret',
	ignoreExpiration: false,
	clockTolerance: 0
	// aditional options: https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
}
const app = express()

app.use(jwtDecodeMiddleware(options))

app.use((req, res, next) => {
	console.log(req.raw_jwt) // token value
	console.log(req.jwt) // token data
})
```
