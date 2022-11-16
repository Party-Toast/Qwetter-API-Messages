import express, { Express } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import keycloak from './middlewares/keycloak';

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
        this.app.use(keycloak);
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