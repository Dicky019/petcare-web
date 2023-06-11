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

// //   namaHewan         String
// //   kategoriHewan     String
// //   umurHewan         String
// //   jenisKelaminHewan String
// //   keluhan           String
// //   noHP              String

type RouterOutput = inferRouterOutputs<AppRouter>
type allUserOutput = RouterOutput["pemesananLayanan"]["getAll"]

export type IPemesananLayanan = allUserOutput["allPemesananLayanan"][number]

// const animal = {
//   kucing: {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//     namaHewan: (faker.animal.cat()),
//     kategoriHewan: "Kucing",
//   },
//   anjing: { 
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//     namaHewan: faker.animal.dog(),
//     kategoriHewan: "Anjing",
//   },
//   burung: {
//      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//     namaHewan: faker.animal.bird(),
//     kategoriHewan: "Burung",
//   },
// }

// export const dummyRandomAnimal = () => {
//   return Array.from({ length: 40 }, (v, k) => {
//     let anim = animal.anjing
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//     const condition = faker.number.int({
//       min: 1,
//       max: 3,
//     })
//     if (condition === 1) {
//       anim = animal.kucing
//     } else if (condition === 2) {
//       anim = animal.burung
//     } else {
//       anim = animal.anjing
//     }
//     return randomAnimal(anim.namaHewan, anim.kategoriHewan)
//   })
// }
// const randomAnimal = (
//   namaHewan = faker.animal.cat(),
//   kategoriHewan = "Kucing"
// ) =>
//   ({
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     jenisKelaminHewan: faker.helpers.enumValue(JenisKelaminHewan),
//     keluhan: faker.lorem.lines({
//       min: 1,
//       max: 2,
//     }),
//     layananGrouming: {
//       pelanggan: faker.number.int({
//         min: 1,
//         max: 2,
//       }),
//       pilihJamGrouming: faker.helpers.enumValue(PilihJamGrouming),
//     },
//     LayananKesehatan: {
//       pelanggan: faker.number.int({
//         min: 1,
//         max: 2,
//       }),
//       pilihJamKesehatan: faker.helpers.enumValue(PilihJamKesehatanKonsultasi),
//     },
//     LayananKonsultasi: {
//       pelanggan: faker.number.int({
//         min: 1,
//         max: 2,
//       }),
//       pilihJamKesehatan: faker.helpers.enumValue(PilihJamKesehatanKonsultasi),
//     },
//     namaHewan: namaHewan,
//     noHP: faker.phone.number(),
//     status: faker.helpers.enumValue(Status),
//     umurHewan: faker.number
//       .int({
//         min: 1,
//         max: 20,
//       })
//       .toString(),
//     user: {
//       email: faker.internet.email(),
//       emailVerified: new Date(),
//       image: faker.internet.avatar(),
//       name: faker.person.fullName(),
//     },
//     kategoriHewan: kategoriHewan,
//   })
