import http from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression'
import { Socket } from 'socket.io';
import ENV from './environments/env';
import MongoHelper from "./helpers/mongo.helper";

const mongo = MongoHelper.getInstance(ENV.MONGODB);
// const tokenHelper = TokenHelper(ENV, mongo);

(async () => {
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


    // MANEJO DE SOCKTES
    const httpServer = http.createServer(app);
    const socketIO = require('socket.io')(httpServer);

    // Funcionalidad Real-Time        
    socketIO.on('connection', (socket: Socket) => {
        // TO DO: Lógica Real-Time
        console.log(`Nuevo cliente conectado con ID: ${socket.id}`);
        console.log(`Aquí se detecta una nueva conexión de un cliente y se guarda en base de datos con ID: ${socket.id}`);
    });

    // app.listen(ENV.API.PORT, () => {
    httpServer.listen(ENV.API.PORT, () => {
        console.log(`Servidor Express funcionando correctamente en puerto ${ENV.API.PORT}`);
    });
    
})();

// Handle Error
process.on('unhandleRejection', (error: any, promise) => {
    console.log(`Ocurrió un error no controlado de tipo promise rejection`, promise);
    console.log(`La descripción de error es la siguiente`, error);
    // Close Mongo
    mongo.close();
    process.exit();
});

