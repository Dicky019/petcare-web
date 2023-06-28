// import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { pemesananLayananRouter } from "./routers/pemesanan-layanan";
import { usersRouter } from "./routers/users";
import { jadwalLayananRouter } from "./routers/jadwal-layanan";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pemesananLayanan: pemesananLayananRouter,
  jadwalLayanan: jadwalLayananRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
