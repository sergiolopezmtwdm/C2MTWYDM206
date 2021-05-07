import http from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression'
import { Socket } from 'socket.io';
import ENV from './environments/env';
import MongoHelper from "./helpers/mongo.helper";
import SocketLogic from './sockets/socket.logic';
import TokenHelper from "./helpers/token.helper";

const mongo = MongoHelper.getInstance(ENV.MONGODB);
const tokenHelper = TokenHelper(ENV, mongo);

(async () => {
    await mongo.connect(ENV.MONGODB.DATABASE);
    if (mongo.statusConnection.status == 'success') {
        console.log(`Conexión exitosa a MongoDB en el puerto ${ENV.MONGODB.PORT}`);
        const socketLogic = SocketLogic(mongo);

        const app = express();
        app.use(express.json());
        app.use(compression());

        app.use(cors({ origin: true, credentials: true }));
        // let whitelist = [
        //     'http://localhost:4200'
        // ];
        // app.use(cors({
        //     origin: (origin, callback) => {
        //         // allow requests with no origin
        //         if (!origin) return callback(null, true);
        //         if (whitelist.indexOf(origin) === -1) {
        //             var message = `The CORS policy for this origin doesn't allow access from the particular origin.`;
        //             return callback(new Error(message), false);
        //         }
        //         return callback(null, true);
        //     }
        // }));

        app.get('/', (req: Request, res: Response) => {
            res.status(200).json({
                ok: true,
                msg: 'API Real-Time funcionando correctamente'
            });
        })

        app.post('/loginOAuth2', async (req: Request, res: Response) => {
            const { correo, apiKey } = req.body

            const response: any = await mongo.db.collection('usuarios')
                .findOne(
                    { correo, isVerify: true },
                    { projection: { _id: 0, correo: 1, fotoURL: 1, nombreCompleto: 1 } }
                )
                .then((result: any) => {
                    if (!result) {
                        return {
                            ok: false,
                            code: 404,
                            msg: `Lo sentimos el usuario ${correo} no se ha registrado aún o bien no ha habilitado su acceso`
                        }
                    }
                    return {
                        ok: true,
                        code: 200,
                        msg: `Inicio de sesión realizado de forma exitosa para el usuario ${correo}`,
                        result
                    }
                })
                .catch((error: any) => {
                    return {
                        ok: false,
                        code: 500,
                        msg: `Ocurrió un error no contemplado al intentar iniciar sesión con el ususario ${correo}`,
                        error
                    }
                });

            if (!response.ok) {
                res.status(response.code).json({ response });
            } else {
                // Solciitar token para usuario
                const token: any = await tokenHelper.create(response.result, apiKey);
                res.status(response.code).json({ token });
            }
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
            // console.log(`Aquí se detecta una nueva conexión de un cliente y se guarda en base de datos con ID: ${socket.id}`);

            // socket.on('message', (payload: any) => {
            //     console.log(`Escuchando mensaje ${payload}`);
            //     // console.log('Escuchando mensaje', payload);
            //     socketIO.emit('broadcast-message', payload);
            // });
            // Socket connect
            socketLogic.listenSocketConnect(socket);
            // Logic SignUp
            socketLogic.signUp(socketIO, socket);
            // Logic Disconnect            
            socketLogic.disconnect(socket);
        });

        // app.listen(ENV.API.PORT, () => {
        httpServer.listen(ENV.API.PORT, () => {
            console.log(`Servidor Express funcionando correctamente en puerto ${ENV.API.PORT}`);
        });
    } else {
        console.log('No se pudo establecer conexión con la base de datos');
    }
})();

// Handle Error
process.on('unhandleRejection', (error: any, promise) => {
    console.log(`Ocurrió un error no controlado de tipo promise rejection`, promise);
    console.log(`La descripción de error es la siguiente`, error);
    // Close Mongo
    mongo.close();
    process.exit();
});

