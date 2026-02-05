import { defineMiddleware, onError } from "h3";

export default defineMiddleware(
  onError((error, event) => {
    console.error(`${error.message} on route: ${event.url.pathname}`);
  }),
);
