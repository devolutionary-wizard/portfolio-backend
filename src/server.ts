import App from "./app";
import { healthcheckRoute } from "./routes";
import { printEndpoints } from "./utils/print-endpoint";

const app = new App([healthcheckRoute]);

app.listen();

(() => {
  setTimeout(() => {
    printEndpoints(app.getServer());
  }, 1000);
})();

