import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const DoodleMemeVideosRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return [{ hello: "world" }];
  }),
});
