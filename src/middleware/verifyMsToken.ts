import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { createResponse } from '../utils/requests';
import { MicrosoftToken } from '../types/TokenData';

const client = jwksClient({
  jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

async function verifyMsToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json(createResponse(401, { message: 'Invalid Token' }));
    }

    /* TODO
     * - check token expiration
     * - check audience(aud) == clientId
     * - check issuer(iss) value. Is it just set to the tenent of the email used? e.g. all NCI ones with be the same but Outlook will be different?
     */
    jwt.verify(token, getKey, (err, decoded: MicrosoftToken) => {
      if (err) {
        return res.status(401).json(createResponse(401, { message: 'Invalid Token' }));
      }

      next();
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(createResponse(500, { message: 'Failed to read token data' }));
  }
}

export default verifyMsToken;
