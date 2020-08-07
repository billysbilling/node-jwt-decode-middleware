import { Secret, VerifyOptions } from 'jsonwebtoken'
import { RequestHandler } from 'express'

declare function JwtDecodeMiddleware (options: JwtDecodeMiddleware.JwtDecodeOptions): RequestHandler

declare namespace JwtDecodeMiddleware {
  export type JwtDecodeOptions = {
    tokenProperty: string;
    secret: Secret;
  } & VerifyOptions
}

export = JwtDecodeMiddleware
