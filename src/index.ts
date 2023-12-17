import { server } from "./server/server";

const port = process.env.PORT;

server.get("/", (req, res) => {
    res.send("Hello");
})

server.listen(port, () => console.log("Server running at port " + port));

