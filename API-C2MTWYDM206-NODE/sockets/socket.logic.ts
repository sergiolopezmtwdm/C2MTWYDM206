import { Socket } from "socket.io"

let usersList: any[] = [];
export default (mongo: any) => {

    return {
        listenSocketConnect: async (socket: Socket) => {
            await mongo.db.collection('sockets')
                .insertOne({
                    socketId: socket.id,
                    usuario: null
                })
                .then((result: any) => {
                    // console.log(result) 
                })
                .catch((error: any) => {
                    console.log(error)
                });
        },
        signIn: (io: any, socket: Socket) => {
            socket.on('signIn', async (payload: any) => {
                console.log("----------------------------> signIn");
                // Guardando en Base de Datos
                await mongo.db.collection('sockets')
                    .findOneAndUpdate(
                        { socketId: socket.id },
                        { $set: { usuario: payload.email } }
                    )
                    .then((result: any) => console.log(result))
                    .catch((error: any) => console.log(error));

                await mongo.db.collection('usuarios')
                    .findOneAndUpdate(
                        { correo: payload.email },
                        { $set: { socketId: socket.id } }
                    )
                    .then((result: any) => console.log(result))
                    .catch((error: any) => console.log(error));
                // await mongo.db.collection('usuarios')
                //     .findOneAndUpdate(
                //         { correo: payload.email }, // Filter or Find Criterio de Busqueda
                //         {
                //             $setOnInsert: {
                //                 isVerify: true
                //             },
                //             $set: {
                //                 nombreCompleto: payload.fullName,
                //                 fotoUrl: payload.photoUrl
                //             }
                //         },
                //         {
                //             upsert: true
                //         }
                //     )
                //     .then((result: any) => console.log(result))
                //     .catch((error: any) => console.log(error));

                // // Retransmitir la variable payload  a todos los clientes conectados
                // socketIO.emit('broadcast-message', payload);
                // socketIO.emit('broadcast-message', usersList);
                // usersList.push(payload);
                let userList = await mongo.db.collection('usuarios').find({ socketId: { $ne: null } }).toArray();
                console.log('mandando emit: broadcast-message', userList);
                io.emit('broadcast-message', userList);
            });
        },
        signUp: (io: any, socket: Socket) => {
            socket.on('signUp', async (payload: any) => {
                console.log("----------------------------> signUp");
                // Guardando en Base de Datos
                // await mongo.db.collection('sockets')
                //     .findOneAndUpdate(
                //         { socketId: socket.id },
                //         { $set: { usuario: payload.email } }
                //     )
                //     .then((result: any) => console.log(result))
                //     .catch((error: any) => console.log(error));

                console.log("registrando usuario");
                await mongo.db.collection('usuarios')
                    .findOneAndUpdate(
                        { correo: payload.email }, // Filter or Find Criterio de Busqueda
                        {
                            $setOnInsert: {
                                isVerify: true
                            },
                            $set: {
                                nombreCompleto: payload.fullName,
                                fotoUrl: payload.photoUrl
                            }
                        },
                        {
                            upsert: true
                        }
                    )
                    .then((result: any) => console.log(result))
                    .catch((error: any) => console.log(error));
                console.log("usuario registrado");
                // // Retransmitir la variable payload  a todos los clientes conectados
                // socketIO.emit('broadcast-message', payload);
                // socketIO.emit('broadcast-message', usersList);
                // usersList.push(payload)
                // io.emit('broadcast-message', usersList);
            });
        },
        logOut: (io: any, socket: Socket) => {
            socket.on('logOut', async (payload: any) => {
                console.log("----------------------------> logOut");
                console.log("eliminando socketId de usuario");
                await mongo.db.collection('usuarios')
                    .findOneAndUpdate(
                        { correo: payload.email },
                        { $set: { socketId: null } }
                    )
                    .then((result: any) => console.log(result))
                    .catch((error: any) => console.log(error));
                let userList = await mongo.db.collection('usuarios').find({ socketId: { $ne: null } }).toArray();
                console.log('mandando emit: broadcast-message', userList);
                io.emit('broadcast-message', userList);
            });
        },
        disconnect: (socket: Socket) => {
            socket.on('disconnect', async () => {
                console.log(`Desconexión del cliente con ID: ${socket.id}`);

                // Eliminar Socket Desconectado
                await mongo.db.collection('sockets')
                    .remove({ socketId: socket.id })
                    .then((result: any) => {
                        console.log(result)
                    })
                    .catch((error: any) => {
                        console.log(error)
                    });
                // TO DO: Guardar Log en Base de Datos
            });
        }
    }
}