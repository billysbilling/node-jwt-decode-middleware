# node-jwt-decode-middleware

JSON Web Token decode express middleware

Decodes JWT from :

* `Authorization: Bearer JWT_TOKEN` Header
* body field (`tokenProperty`),
* querystring parameter (`tokenProperty`)

into configurable `req.<_jwt>` (`requestProperty`)

## Usage

```javascript
import * from 'express'
import JWTDecoderMiddleware  from '\@billyfree/jwt-decode-middleware'

const jwtDecoderMiddleware = new JWTDecoderMiddleware({
	requestProperty: '_jwt' // default
	tokenProperty: 'access_token' // default 

	/* JWTStrategy options */
	secretOrKey : 'secret' // required

	jsonWebTokenOptions: /* jsonwebtoken options */
	...

})

const app = express()
app.use(jwtDecoderMiddleware, (req, res, next) => {
	console.log(req._jwt)
})
```

[JWTStrategy](https://github.com/themikenicholson/passport-jwt)

[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
