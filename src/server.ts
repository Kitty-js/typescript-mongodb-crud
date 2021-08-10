import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import indexRoutes from "./routes/index.routes";
import postsRoutes from "./routes/posts.routes";
import usersRoutes from "./routes/user.routes";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    };

    config() {
        try { 
            const MONGO_URI = "mongodb://localhost/api-typescript-mongodb";
            mongoose.set("useFindAndModify", true);
            mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: true
            });
            console.log("Database is now connected");       
         } catch (error) {
             console.error(error);
         };
        //Settings
        this.app.set("port", process.env.PORT || 5000);
        // Middlewares
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    };

    routes() {
        this.app.use(indexRoutes);
        this.app.use("/api/posts", postsRoutes);
        this.app.use("/api/users", usersRoutes);
    }; 

    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server started on port", this.app.get("port"));
        });
    };
};

const server = new Server();
server.start();