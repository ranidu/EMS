import momentTz from "moment-timezone";
import config from "../config/local.json";
import routes from "./router";
import { App } from "./util/App";

momentTz.tz.setDefault(config.email.time.timezone); // set Timezone

async function bootstrap() {
    const app = new App(config);
    app.use("/v1", routes(config));
    await app.listen();
}

bootstrap()
.then(() => {
    console.log("Email App Started!");
})
.catch((err) => {
    console.log(err);
});
