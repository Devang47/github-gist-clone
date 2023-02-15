import express from "express";
import cors from "cors";
import { ServerInterface } from "./app.interface";
import gistRouter from "../modules/gist/gistRouter";

class Server implements ServerInterface {
  // eslint-disable-line

  async server(): Promise<express.Application> {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(gistRouter.routes);

    app.use(cors());
    return app;
  }
}

export default new Server();
