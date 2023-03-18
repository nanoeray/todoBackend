import {NextFunction, Request, Response} from "express";
import express from "express";
import http from "http";

require("dotenv").config();
import connection from "./config/config";

const app = express();
// Routers
import userRouter from "./routes/userRouter";
import todoRouter from "./routes/todoRouter";

const {PORT} = process.env;
import cors from 'cors';

// MIDDLEWARES
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use("/user", userRouter);
app.use("/todo", todoRouter);

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({message: "API Status OK!"});
});

connection
    .sync()
    .then(() => {
        console.log("Database successfully connected");
        const httpServer = http.createServer(app);
        httpServer.listen(PORT, () => {
            console.log(`HTTPS Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error", err);
    });

