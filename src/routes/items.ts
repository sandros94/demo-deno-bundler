import { eventHandler, getValidatedRouterParams } from "h3";
import * as v from "valibot";

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    v.object({
      id: v.pipe(v.string(), v.nonEmpty(), v.transform(Number), v.integer()),
    }),
  );

  // do something with that `id`

  return {
    id,
  };
});
