import bodyParser from "body-parser";
import express from "express";


export class App {
  private _app: any;
  private config: any;

  constructor(config: any) {
    this.config = config;
    this._app = express();
    this._app.use(bodyParser.json());
  }

  public use(...args: any) {
    return this._app.use(...args);
  }

  public listen(port: number = this.config.app.port) {
    return new Promise((resolve, reject) => {
      this._app.listen(port, (err: any) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(`server is listening on ${port}`);
        resolve(true);
      });
    });
  }

  public get app() {
    return this._app;
  }
}
