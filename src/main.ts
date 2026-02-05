import { H3 } from "h3";

import homePage from "./public/index.html" with { type: "text" };
import denoSvg from "./public/deno.svg" with { type: "text" };

import onErrorMiddleware from "./middlewares/error.ts";
import authHandler from "./routes/auth.ts";
import itemsHandler from "./routes/items.ts";

const app = new H3();

app.get("/", (event) => {
  event.res.headers.set("Cache-Control", "public, max-age=3600");

  return new File([homePage], "index.html", { type: "text/html" });
});

app.get("/deno.svg", (event) => {
  event.res.headers.set("Content-Type", "image/svg+xml");
  event.res.headers.set("Cache-Control", "public, max-age=86400");

  return denoSvg;
});
app.get("/favicon.svg", () => app.request("/deno.svg"));

app.use(onErrorMiddleware);

app.post("/auth", authHandler);

app.get("/items/:id", itemsHandler);

Deno.serve(app.fetch);
