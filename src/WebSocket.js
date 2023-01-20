const { Server } = require('socket.io')

class WebSocket {
    io
    users
    news
    notifications
    participants
    invoices
    payments

   

    addUser(userId, socketId) {
        !this.users.some((user) => user.userId === userId) && this.users.push({ userId, socketId })
    }

    removeUser(socketId) {
        this.users = this.users.filter((user) => user.socketId !== socketId)
    }

    getUser(userId) {
        const user = this.users.find((user) => user.userId === userId)
        return user
    }

    constructor(server) {
        this.io = new Server(server, {
            cors: { origin: '*' }
        })
        this.users = []
    }

    listen() {
        console.log('Socket io successfully connected')
        this.io.on('connection', (socket) => {

              //send and get message
            socket.on("sendMessage", ({ senderId, receiverId, text }) => {
                const user = this.getUser(receiverId);
          
                    this.io.emit("getMessage", {
                        senderId,
                        text,
                        receiverId,
                        });
                
               
            });

            socket.on('addUser', (userId) => {
                this.addUser(userId, socket.id)
                this.io.emit('getUsers', this.users)
            })

            socket.on('disconnect', () => {
                this.removeUser(socket.id);
                this.io.emit("getUsers", this.users);
            })

            socket.on('sendNews', (from, text, role) => {
            })

            socket.on('sendNofication', (payload, callback) => {
                if (typeof callback !== "function") {
                    return socket.disconnect();
                }

                const { receiverId, text, senderId } = payload
                if (!receiverId || !text || !senderId) {
                    return callback({
                        status: 'KO',
                        error: 'payload not fullfiled'
                    })
                }

                const user = this.getUser(receiverId)

                if(user){
                    this.io.to(user.socketId).emit('getNotifications', {
                        text, 
                        senderId,
                    })
                }
                

                callback({
                    status: 'OK',
                    to: user
                })
            })


            socket.on('updateCbtAnswer', (payload, callback) => {
                if (typeof callback !== "function") {
                    return socket.disconnect();
                }

                const { receiverId, answers, senderId } = payload
                if (!receiverId || !answers || !senderId) {
                    return callback({
                        status: 'KO',
                        error: 'payload not fullfiled'
                    })
                }
                const user = this.getUser(receiverId)

                if(user){
                    this.io.to(user.socketId).emit('getAnswers', {
                        senderId, 
                        answers
                    })
                }

                callback({
                    status: 'OK',
                    to: user,
                    answers: answers
                })
            })

        })
    }

  
}

module.exports = { Socket: WebSocket }