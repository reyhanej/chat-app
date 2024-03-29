const express = require("express")
const app = express()

const socketIO = require("socket.io")
const http = require("http")
const path = require("path")

const server = http.createServer(app)

const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, "../public")

const io = socketIO(server)
io.on("connection", (socket) => {
    console.log("New User Connection!")


    socket.on("createMessage", (message) => {
        console.log("create new message", message)

        socket.emit("newMessage", {
            from: "admin",
            text: "Welcome to our Chat",
            createdAt: new Date().getTime()
        })
        socket.broadcast.emit("newMessage", {
            from: "admin",
            text: "new user joined the chat",
            createdAt: new Date().getTime()
        })

        io.emit("newMessage", {
                from: message.from,
                text: message.text,
                createdAt: new Date()
            })
            // socket.broadcast.emit("newMessage", {
            //     from: message.from,
            //     text: message.text,
            //     createdAt: new Date()
            // })
    })

    socket.on("disconect", () => {
        console.log("User was Disconnected")
    })
})
app.use(express.static(publicPath))

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})