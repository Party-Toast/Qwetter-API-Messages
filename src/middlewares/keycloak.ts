import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

// Middleware function to verify the JWT token through Keycloak
export default async (request: Request, response: Response, next: NextFunction) => {
    const authorizationHeader = request.headers.authorization;
    // If no authorization header was provided, return 401
    if(!authorizationHeader) {
        response.status(401).send();
    }

    const headers = {
        "authorization": authorizationHeader
    }
    // Fetch user info 
    await axios.get(`${process.env.AUTH_URL}/realms/${process.env.AUTH_REALM}/protocol/openid-connect/userinfo`, { headers })
        // If fetch was successful, continue request
        .then(res => {
            next();
        })
        // Else, return 401
        .catch(err => {
            response.status(401).send();
        })
}