const express = require("express");
const logger = require("./data/middleware/logger");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
const port = 4000;

server.use(express.json());
server.use(logger("long"));

server.use("/users", userRouter);
server.use("/posts", postRouter);

server.get("/", (req, res) => {
    res.json({
        message: "Welcome, serer started successfully",
    });
});

server.use((req, res) => {
    res.status(404).json({
        message: "Route was not found",
    });
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Something went wrong",
    });
});

server.listen(4000, () => {
    console.log(`Server running at http://localhost:${port}`);
});
