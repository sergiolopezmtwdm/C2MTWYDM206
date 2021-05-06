import http from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression'
// import { Socket } from 'socket.io';
import ENV from './environments/env';


const app = express();
app.use(express.json());
app.use(compression());
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        msg: 'API Real-Time funcionando correctamente'
    });
})


app.listen(ENV.API.PORT, () => {
    console.log(`Servidor Express funcionando correctamente en puerto ${ENV.API.PORT}`);
});