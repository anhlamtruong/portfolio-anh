import { HomePageRouter } from "../../_server/procedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  homepage: HomePageRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
