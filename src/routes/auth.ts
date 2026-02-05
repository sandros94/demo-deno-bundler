import { eventHandler, HTTPError, requireBasicAuth } from "h3";

const username = Deno.env.get("USERNAME");
const password = Deno.env.get("PASSWORD");

export default eventHandler(async (event) => {
  if (!username || !password) {
    console.warn("USERNAME or PASSWORD environment variables are not set.");
    throw new HTTPError({
      status: 500,
      statusText: "Server misconfiguration",
    });
  }
  await requireBasicAuth(event, { username, password });

  return `User ${event.context.basicAuth!.username} is authenticated.`;
});
