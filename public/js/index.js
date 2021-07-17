const socket = io()
socket.on("connect", () => {
    console.log("connected  to server")

    socket.emit("createMessage", {
        from: "reyhan",
        text: "I love you so much"
    })
    socket.on("newMessage", (message) => {
        console.log(" new message", message)
    })
    socket.on("disconnect", () => {
        console.log("disconnected from server")
    })
})