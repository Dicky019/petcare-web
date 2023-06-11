// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type AppRouter } from "~/server/api/root"
// import { faker } from "@faker-js/faker"
// import {
//   JenisKelaminHewan,
//   PilihJamGrouming,
//   PilihJamKesehatanKonsultasi,
//   Status,
// } from "@prisma/client"
import { type inferRouterOutputs } from "@trpc/server"
// // import { z } from "zod"


type RouterOutput = inferRouterOutputs<AppRouter>
type allUserOutput = RouterOutput["users"]["getAll"]

export type IUsers = allUserOutput["allUsers"][number]
