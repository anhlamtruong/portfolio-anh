import { baseProcedure, createTRPCRouter } from "@/app/creata/_trpc/init";

export const DoodleMemeVideosRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return [{ hello: "world" }];
  }),
});
