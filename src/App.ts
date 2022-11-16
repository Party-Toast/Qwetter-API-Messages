import express, { Express, Request, Response } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import axios from 'axios';

class App {
    public app: Express;
    public port: Number;

    // TODO: Create controller interface class to replace any
    constructor(controllers: Array<any>, port: Number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        // Keycloak authentication/authorization check
        this.app.use(async (request: Request, response: Response, next) => {
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
        });
        this.app.use(json());
        this.app.use(cors());
        // this.app.use(function(req,res,next){setTimeout(next,1000)}); // artificial latency

    }
    // TODO: Create controller interface class to replace any
    private initializeControllers(controllers: Array<any>) {
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`[server]: Listening on http://localhost:${this.port}`);
        });
    }
}

export default App;